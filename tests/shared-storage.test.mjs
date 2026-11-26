import test from "node:test";
import assert from "node:assert/strict";
import { runtime } from "./helpers/runtime.mjs";

const draftKey = "aiSkillAssessmentDraft";
const historyKey = "aiSkillAssessmentHistory";

function browserTabs() {
  const storage = new Map();
  let pending = Promise.resolve();
  const locks = {
    request(name, action) {
      assert.equal(name, "aiSkillAssessmentStorage");
      const result = pending.then(action);
      pending = result.catch(() => {});
      return result;
    }
  };
  return { storage, tab: () => runtime({ storage, locks }), settled: () => pending };
}

function start(tab, mode) {
  tab.context.mode = mode;
  return tab.run("state.selectedModeId=mode;startAssessment()");
}

function answerAll(tab) {
  tab.run("state.answers=Object.fromEntries(questions.map(q=>[q.id,choose(q)]))");
}

test("resuming claims a revision and blocks stale edits, saving and removal across tabs", async () => {
  const { storage, tab } = browserTabs();
  const original = tab(), resumed = tab();
  original.start();
  await start(original, "complete");
  await original.run("state.answers[questions[0].id]=choose(questions[0]);saveLabDraft()");
  const before = JSON.parse(storage.get(draftKey));
  await resumed.run("resumeLabDraft()");
  const claimed = JSON.parse(storage.get(draftKey));
  assert.equal(claimed.sessionId, before.sessionId);
  assert.equal(claimed.revision, before.revision + 1);
  assert.equal(resumed.run("answeredCount()"), 1);

  // Edits in both tabs can be submitted before either lock callback runs.
  const first = original.run("state.answers[questions[1].id]=choose(questions[1]);saveLabDraft()");
  const second = resumed.run("state.answers[questions[2].id]=choose(questions[2]);saveLabDraft()");
  await Promise.all([first, second]);
  const current = storage.get(draftKey);
  assert.equal(Object.keys(JSON.parse(current).draft.choices).length, 2);
  assert.ok(JSON.parse(current).draft.choices[resumed.run("questions[2].id")] !== undefined);
  assert.match(original.node("labStorageStatus").textContent, /Un’altra scheda/);
  answerAll(original);
  await original.run("finishAssessment()");
  assert.equal(storage.has(historyKey), false);
  assert.equal(storage.get(draftKey), current);
  assert.equal(original.run("state.reportSaveConflict"), "draft-changed");
  assert.ok(original.run("state.unsavedReport"));

  answerAll(resumed);
  await resumed.run("finishAssessment()");
  assert.equal(storage.get(draftKey), "null");
  assert.equal(JSON.parse(storage.get(historyKey)).length, 1);
  await original.run("saveLabDraft()");
  assert.equal(storage.get(draftKey), "null");
});

test("a previously rendered resume action restores the latest revision of the same session", async () => {
  const { storage, tab, settled } = browserTabs();
  const active = tab(), home = tab();
  await start(active, "complete");
  home.run("renderLabDraftNotice()");
  const resumeDisplayedDraft = home.node("resumeLabBtn").events.click;
  await active.run("state.answers[questions[0].id]=choose(questions[0]);saveLabDraft()");
  const latest = JSON.parse(storage.get(draftKey));
  resumeDisplayedDraft();
  await settled();
  assert.equal(home.run("answeredCount()"), 1);
  assert.equal(JSON.parse(storage.get(draftKey)).revision, latest.revision + 1);
});

test("clearing local data blocks an open session from restoring drafts or reports", async () => {
  const { storage, tab, settled } = browserTabs();
  const active = tab(), other = tab();
  active.start();
  await start(active, "operational-lab");
  const oldDraft = JSON.parse(storage.get(draftKey)).draft;
  await start(other, "first-steps");
  answerAll(other);
  await other.run("finishAssessment()");
  other.node("clearHistoryBtn").events.click();
  await settled();
  assert.equal(storage.has(historyKey), false);
  assert.equal(storage.get(draftKey), "null");
  active.run("window.events.get('storage')({key:LOCAL_LAB.DRAFT_KEY})");
  assert.equal(active.run("state.draftOwner.conflict"), true);
  answerAll(active);
  await active.run("saveLabDraft()");
  await active.run("finishAssessment()");
  assert.equal(storage.has(historyKey), false);
  assert.equal(storage.get(draftKey), "null");
  assert.equal(active.run("state.reportSaveConflict"), "cleared");
  assert.ok(active.run("state.unsavedReport"));
  assert.doesNotMatch(active.node("pendingReportNotice").innerHTML, /retrySaveReportBtn/);

  storage.set("aiSkillOperationalLabDraft", JSON.stringify(oldDraft));
  assert.equal(other.run("readLabDraft().status"), "absent");
});

test("a replacement draft cannot be removed by a pending report retry or an old confirmation", async () => {
  const { storage, tab, settled } = browserTabs();
  const original = tab(), replacement = tab(), home = tab();
  await start(original, "complete");
  answerAll(original);
  original.run(`globalThis.originalSet=localStorage.setItem;
    localStorage.setItem=(key,value)=>{if(key==='aiSkillAssessmentHistory')throw Error('quota');originalSet(key,value)}`);
  await original.run("finishAssessment()");
  assert.ok(original.run("state.unsavedReport"));
  home.run("renderLabDraftNotice()");
  const oldDiscard = home.node("discardLabBtn").events.click;
  await start(replacement, "operational-lab");
  const current = storage.get(draftKey);
  oldDiscard();
  await settled();
  assert.equal(storage.get(draftKey), current);
  original.run("localStorage.setItem=originalSet");
  await original.run("retryUnsavedReport()");
  assert.equal(storage.get(draftKey), current);
  assert.equal(storage.has(historyKey), false);
  assert.equal(original.run("state.reportSaveConflict"), "draft-changed");
});

test("history additions from two tabs serialize without overwriting or duplicating a session", async () => {
  const { storage, tab } = browserTabs();
  const a = tab(), b = tab();
  await Promise.all([start(a, "first-steps"), start(b, "first-steps")]);
  answerAll(a); answerAll(b);
  await Promise.all([a.run("finishAssessment()"), b.run("finishAssessment()"), b.run("finishAssessment()")]);
  const records = JSON.parse(storage.get(historyKey));
  assert.equal(records.length, 2);
  assert.equal(new Set(records.map(report => report.meta.sessionId)).size, 2);
});

test("without Web Locks the assessment stays usable and the result is exportable in memory", async () => {
  const r = runtime({ locks: null });
  await start(r, "complete");
  assert.equal(r.run("questions.length"), 50);
  assert.match(r.node("labStorageStatus").textContent, /coordinare il salvataggio/);
  answerAll(r);
  await r.run("finishAssessment()");
  assert.equal(r.storage.size, 0);
  assert.ok(r.run("state.unsavedReport"));
  assert.match(r.node("dashboard").innerHTML, /Esporta JSON/);
});

test("a draft resumed without a lock remains read-only when locks become available", async () => {
  const { storage, tab } = browserTabs();
  const owner = tab(), readOnly = tab();
  await start(owner, "complete");
  const draft = storage.get(draftKey);
  readOnly.run("globalThis.availableLocks=navigator.locks;navigator.locks=null;resumeLabDraft()");
  assert.equal(readOnly.run("questions.length"), 50);
  readOnly.run("navigator.locks=availableLocks");
  answerAll(readOnly);
  await readOnly.run("saveLabDraft()");
  await readOnly.run("finishAssessment()");
  assert.equal(storage.get(draftKey), draft);
  assert.equal(storage.has(historyKey), false);
  assert.equal(readOnly.run("state.reportSaveConflict"), "draft-read-only");
  assert.ok(readOnly.run("state.unsavedReport"));
});
