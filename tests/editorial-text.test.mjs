import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { scoringSignatures } from "./helpers/m28-snapshot.mjs";
import { runtime } from "./helpers/runtime.mjs";

test("editorial changes preserve answer keys, rubrics and observed scoring across all 84 paths", () => {
  const published = JSON.parse(fs.readFileSync(new URL("./fixtures/editorial-scoring.json", import.meta.url), "utf8"));
  assert.deepEqual(scoringSignatures(runtime()), published.hashes);
});

test("scored choices show neutral instructions while declarations retain their details", () => {
  for (const language of ["it", "en"]) {
    const r = runtime();
    r.context.language = language;
    r.run(`state.language=language;
      const editorialForm = language === 'it' ? buildQuestionForm('A') : buildEnglishQuestionForm('A');
      for(const id of ['T1','P_L_1','L6']) {
        questions=[editorialForm.find(q=>q.sourceId===id)];state.index=0;
        state.hintsVisible[questions[0].id]=true;renderQuestion();
        if (/optionHintToggle|option-detail/.test($('options').innerHTML)) throw Error(id);
      }`);
    assert.match(r.node("questionHint").textContent, language === "it" ? /Scegli una risposta/ : /Choose one answer/);
    r.run("questions=[editorialForm.find(q=>q.sourceId==='M4')];state.hintsVisible[questions[0].id]=true;renderQuestion()");
    assert.match(r.node("options").innerHTML, /aria-expanded="true"/);
    assert.match(r.node("options").innerHTML, /option-detail/);
    r.run("meta.language=language;renderDashboard(full())");
    assert.match(r.node("dashboard").innerHTML, language === "it" ? /Motivo del risultato/ : /Why this answer received that credit/);
  }
});

test("First Steps explains the saved answer in either language without reinterpreting older reports", () => {
  for (const language of ["it", "en"]) {
    const r = runtime();
    r.context.language = language;
    r.run(`state.language=language;state.selectedModeId='first-steps';startAssessment();
      state.answers=Object.fromEntries(questions.map((q,i)=>[q.id,q.options.findIndex(o=>o.correct===(i>0))]));
      globalThis.saved=calculateResults();renderDashboard(saved);`);
    const report = JSON.parse(JSON.stringify(r.context.saved));
    assert.equal(report.correctCount, 9);
    assert.ok(report.answers.every(item => item.expectedAnswer && item.feedback));
    const missed = report.answers.find(item => !item.correct);
    assert.notEqual(missed.answer, missed.expectedAnswer);
    const html = r.node("dashboard").innerHTML;
    assert.match(html, language === "it" ? /9 risposte corrette su 10/ : /9 correct answers out of 10/);
    assert.match(html, language === "it" ? /Risposta attesa/ : /Expected answer/);
    r.run("downloadBlob=(content)=>{globalThis.download=content};exportJson(saved)");
    assert.deepEqual(JSON.parse(r.context.download), report);
    report.meta.assessmentVersion = "3.5.7";
    report.meta.questionBankVersion = "2026.07-first-steps-1";
    for (const item of report.answers) {
      delete item.expectedAnswer;
      delete item.feedback;
    }
    const history = JSON.stringify([report]);
    r.storage.set("aiSkillAssessmentHistory", history);
    r.run("loadLastReport()");
    assert.equal(r.storage.get("aiSkillAssessmentHistory"), history);
    assert.doesNotMatch(r.node("dashboard").innerHTML, /Risposta attesa|Expected answer/);
  }
});

test("resuming a saved draft reopens only the revised answer and keeps the rest", () => {
  const r = runtime();
  r.run(`state.language='en';state.selectedModeId='complete';writeFormCycle('en','complete',{remaining:['B'],last:null});startAssessment();
    globalThis.oldDraft={...snapshotLabDraft(),assessmentVersion:'3.5.7',questionBankVersion:'2026.11-m22'};`);
  const draft = JSON.parse(JSON.stringify(r.context.oldDraft));
  const key = "aiSkillAssessmentDraft";
  const record = JSON.parse(r.storage.get(key));
  record.draft = draft;
  assert.match(r.run("questions.find(q=>q.id==='B_C22').text"), /inputs, sources, revisions, and final decision/);
  r.storage.set(key, JSON.stringify(record));
  assert.equal(r.run("readLabDraft().status"), "compatible");
  assert.equal(r.run("readLabDraft().revisedQuestionId"), null);
  const unchanged = draft.questionIds[0];
  draft.choices[unchanged] = 0;
  draft.choices.B_C22 = 5;
  const original = JSON.stringify(record);
  r.storage.set(key, original);
  assert.equal(r.run("readLabDraft().revisedQuestionId"), "B_C22");
  assert.equal(r.storage.get(key), original);
  r.run("resumeLabDraft()");
  assert.equal(r.run("questions[state.index].id"), "B_C22");
  assert.deepEqual(JSON.parse(r.storage.get(key)).draft.choices, { [unchanged]: 0 });
  assert.equal(r.run("readLabDraft().revisedQuestionId"), null);
});

test("the standalone lab report leads with the decision that caused the critical outcome", () => {
  const r = runtime();
  r.run(`state.selectedModeId='operational-lab';startAssessment();
    state.answers=Object.fromEntries(questions.map(q=>[q.id,choose(q,q.sourceId!=='LAB_K2_RESUME')]));
    globalThis.outcome=calculateResults();renderDashboard(outcome);`);
  const html = r.node("dashboard").innerHTML;
  assert.match(html, /Esito del laboratorio operativo/);
  assert.match(html, /Da rivedere per prima.*Riprendi dal checkpoint/);
  assert.doesNotMatch(html, /Aree non esplorate|Nessun item dichiarativo/);
  assert.equal(r.context.outcome.criticalFindings[0].code, "duplicate-action");
});
