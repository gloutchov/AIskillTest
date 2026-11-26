import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { runtime } from "./helpers/runtime.mjs";
const plain = v => JSON.parse(JSON.stringify(v));
function lab(form = "A", language = "it") {
  const r = runtime();
  r.run(`globalThis.lab = LOCAL_LAB; state.language=${JSON.stringify(language)}; state.formId=${JSON.stringify(form)};
    globalThis.qs=lab.questions(state.formId,currentLanguage());
    globalThis.labMeta={...meta,formId:state.formId,language:currentLanguage(),testMode:{id:'operational-lab',type:'simulation',questionCount:6}};
    globalThis.good=Object.fromEntries(qs.map((q,i)=>[q.id,['all-rows',{operation:'sum',total:lab.variant(state.formId,currentLanguage()).total},{action:'release',reference:true,keepClaim:false},'use-data','draft-only','continue'][i]]));
    globalThis.report=(a=good)=>core.evaluate(qs,a,labMeta,'2026-11-25');`);
  return r;
}

test("lab covers six E units, both cases and all six bilingual forms without altering the bank", () => {
  for (const language of ["it", "en"]) for (const form of ["A", "B", "C"]) {
    const r = lab(form, language), report = r.run("report()");
    assert.equal(report.results.simulatedSummary.value, 100); assert.equal(report.results.simulatedSummary.band, "conform");
    assert.equal(report.coverage.byEvidence.E.valid, 6); assert.equal(report.coverage.byEvidence.Q.proposed, 0);
    assert.equal(report.criticalFindings.length, 0); assert.equal(r.run("core.reportKind(report())"), "evidence");
    assert.equal(r.run("bank.length"), 145); assert.equal(r.run("Object.keys(core.ITEM_MAP).length"), 195);
    const data = r.run("lab.variant(state.formId,currentLanguage())");
    assert.deepEqual(plain(data.rows), { A: [120, 80, 100], B: [40, 25, 35], C: [18, 12, 20] }[form]);
    assert.equal(data.draft, { A: 330, B: 120, C: 60 }[form]); assert.equal(data.update, { A: "update-17", B: "update-28", C: "update-39" }[form]);
    assert.deepEqual(report.answers.map(a => a.objectiveId).join(","), "U06,U06,U06,A04,A03,H05");
    assert.ok(report.results.simulatedCases[1].effects.artifact.length > 20);
    assert.equal(report.meta.reportSchemaVersion, 4); assert.equal(report.meta.scoringVersion, "3.1.0");
    r.context.sample = report; r.run("renderDashboard(sample)");
    const html = r.node("dashboard").innerHTML;
    assert.match(html, /100\/100/); assert.match(html, language === "it" ? /Esiti conformi/ : /Expected outcomes/);
    assert.doesNotMatch(html, /simulatedCases|journalEntries|Champion|Expert|Non presenti in questa versione/);
    assert.equal(report.results.knowledgeByArea.U.value, null);
  }
});

test("K1 exact credits, partial choices and actual delivery flags are exhaustive and deterministic", () => {
  const r = lab();
  const count = r.run(`(() => {let count=0;for(const form of ['A','B','C'])for(const language of ['it','en'])for(const verify of ['all-rows','one-row','trust-draft'])for(const operation of ['sum','average','draft'])for(const correct of [true,false])for(const action of ['release','review'])for(const reference of [true,false])for(const keepClaim of [true,false]) {
    const total=lab.variant(form,language).total;const a={};const ids=lab.IDS.map(id=>form+'_'+id);a[ids[0]]=verify;a[ids[1]]={operation,total:correct?total:total+1};a[ids[2]]={action,reference,keepClaim};
    const result=lab.evaluate(form,language,a), c=result.cases[0];
    const expected=(verify==='all-rows'?2:verify==='one-row'?1:0)+Number(operation==='sum')+Number(correct)+(action==='review'?1:correct&&reference&&!keepClaim?2:0);
    if(c.credit!==expected)throw Error('Credit mismatch');
    if(c.criticalFindings.length!==Number(action==='release'&&(!correct||keepClaim)))throw Error('Critical mismatch');
    if(JSON.stringify(result)!==JSON.stringify(lab.evaluate(form,language,a)))throw Error('Not deterministic');count++;
  }return count;})()`);
  assert.equal(count, 864);
});

test("K2 flags correspond to executed local effects across every configuration", () => {
  const r = lab();
  const count = r.run(`(() => {let count=0;for(const form of ['A','B','C'])for(const language of ['it','en'])for(const source of ['use-data','pause-source','export'])for(const scope of ['draft-only','hold-all','external'])for(const resume of ['continue','wait','repeat-update','declare-complete']) {
    const a={};a[form+'_LAB_K2_SOURCE']=source;a[form+'_LAB_K2_SCOPE']=scope;a[form+'_LAB_K2_RESUME']=resume;
    const c=lab.evaluate(form,language,a).cases[1], e=c.effects;
    if(e.journalEntries!==(resume==='repeat-update'?2:1)||e.disclosed!==(source==='export')||e.externalAction!==(scope==='external'))throw Error('Effect mismatch');
    if(c.criticalFindings.length!==Number(source==='export')+Number(scope==='external')+Number(resume==='repeat-update'))throw Error('Critical mismatch');
    if(c.credit!==(source==='use-data'?2:source==='pause-source'?1:0)+(scope==='draft-only'?2:scope==='hold-all'?1:0)+(resume==='continue'?2:resume==='wait'?1:0))throw Error('Credit mismatch');count++;
  }return count;})()`);
  assert.equal(count, 216);
});

test("E summary handles raw zero, partial coverage, conservative credit, critical override and per-case minima", () => {
  const r = lab();
  const results = r.run(`(() => { const partial={...good,A_LAB_K1_VERIFY:'one-row',A_LAB_K1_CORRECT:{operation:'draft',total:330},A_LAB_K1_RELEASE:{action:'review',reference:false,keepClaim:true}};
    const conservative={...good,A_LAB_K1_VERIFY:'one-row',A_LAB_K1_CORRECT:{operation:'sum',total:330},A_LAB_K1_RELEASE:{action:'review',reference:false,keepClaim:true},A_LAB_K2_SOURCE:'pause-source',A_LAB_K2_SCOPE:'hold-all',A_LAB_K2_RESUME:'wait'};
    const critical={...good,A_LAB_K2_RESUME:'repeat-update'};const missing={...critical};delete missing.A_LAB_K1_VERIFY;
    const zero={...good,A_LAB_K1_VERIFY:'trust-draft',A_LAB_K1_CORRECT:{operation:'draft',total:330},A_LAB_K1_RELEASE:{action:'release',reference:false,keepClaim:true},A_LAB_K2_SOURCE:'export',A_LAB_K2_SCOPE:'external',A_LAB_K2_RESUME:'repeat-update'};
    return [report(partial),report(conservative),report(critical),report(missing),report(zero)];})()`);
  assert.equal(results[0].results.simulatedSummary.value, 200 / 3); assert.equal(results[0].results.simulatedSummary.band, "partial");
  assert.equal(results[1].results.simulatedSummary.value, 50); assert.equal(results[1].results.simulatedSummary.band, "partial");
  assert.equal(results[2].results.simulatedSummary.credit, 10); assert.equal(results[2].results.simulatedSummary.band, "critical");
  assert.equal(results[3].results.simulatedSummary.value, null); assert.equal(results[3].results.simulatedSummary.band, "critical");
  assert.equal(results[3].coverage.cases.completed, 1); assert.equal(results[4].results.simulatedSummary.value, 0);
  const retry = r.run("report({...good,A_LAB_K1_VERIFY:'trust-draft',A_LAB_K1_CORRECT:{operation:'draft',total:330},A_LAB_K1_RELEASE:{action:'review',reference:false,keepClaim:true},A_LAB_K2_SOURCE:'pause-source',A_LAB_K2_SCOPE:'hold-all',A_LAB_K2_RESUME:'wait'})");
  assert.equal(retry.results.simulatedSummary.band, "retry");
  const edge = r.run("report({...good,A_LAB_K1_CORRECT:{operation:'draft',total:330},A_LAB_K1_RELEASE:{action:'review',reference:false,keepClaim:true}})");
  assert.equal(edge.results.simulatedSummary.value, 75); assert.equal(edge.results.simulatedSummary.band, "partial");
});

test("malformed choices and keyword text cannot substitute for actions, numbers or booleans", () => {
  const r = lab();
  for (const value of ["sum 300 verify source permission checkpoint", true, 0, [], {}, { operation: "sum", total: "300" }, { action: "release", reference: "true", keepClaim: false }]) {
    r.context.invalid = value;
    const out = r.run("report(Object.fromEntries(qs.map(q=>[q.id,invalid])))");
    assert.equal(out.coverage.byEvidence.E.valid, 0); assert.equal(out.results.simulatedSummary.value, null); assert.equal(out.criticalFindings.length, 0);
  }
});

test("alternative verification/calculation orders commute and edits remove stale critical flags and delivery", () => {
  const r = lab();
  assert.equal(r.run("core.comparisonKey(labMeta,report().answers)===core.comparisonKey(labMeta,core.evaluate(lab.questions('A','it','correct-first'),good,labMeta,'now').answers)"), true);
  const result = r.run(`(() => {let a={...good,A_LAB_K2_RESUME:'repeat-update'};const q=qs[5];a=lab.change(a,q,'continue');const clean=report(a);a=lab.change(a,qs[1],{operation:'sum',total:333});return {clean,edited:report(a),a};})()`);
  assert.equal(result.clean.criticalFindings.length, 0); assert.equal(result.clean.results.simulatedCases[1].effects.journalEntries, 1);
  assert.equal(result.a.A_LAB_K1_RELEASE, undefined); assert.equal(result.edited.results.simulatedSummary.value, null); assert.equal(result.edited.criticalFindings.length, 0);
});

test("mixed Q and E evidence cannot compensate for critical or weak execution", () => {
  const r = lab();
  const result = r.run(`(() => {const q=questionsForMode(buildQuestionForm('A'),getModeById('harness'));const a={...good,...Object.fromEntries(q.map(q=>[q.id,choose(q)])),A_LAB_K2_RESUME:'repeat-update'};return core.evaluate([...q,...qs],a,{...labMeta,testMode:{id:'mixed-fixture',questionCount:16}},'now');})()`);
  assert.equal(result.results.knowledgeByArea.H.value, 100); assert.equal(result.results.simulatedSummary.band, "critical");
  assert.equal(result.score, undefined); assert.equal(result.coverage.byEvidence.Q.valid, 10);
});

test("UI requires confirmation and Next, shows artifact before release and withholds rubric feedback", () => {
  const r = lab(); r.start(); r.run("state.selectedModeId='operational-lab';startAssessment()");
  assert.equal(r.run("questions.length"), 6); assert.equal(r.node("nextBtn").disabled, true);
  r.node("labChoice0").events.change(); assert.equal(r.run("answeredCount()"), 0);
  r.node("labApply").events.click(); assert.equal(r.run("answeredCount()"), 1); assert.equal(r.run("state.index"), 0);
  assert.equal(r.run("isAutoAdvanceQuestion(questions[0])"), false);
  assert.doesNotMatch(r.node("options").innerHTML, /2: tutte|Credito grezzo|unverified-release/);
  r.run("goNext()"); assert.equal(r.node("questionTitle").focused, true);
  r.node("labOperation").value = "sum"; r.node("labCalculate").events.click(); r.node("labApply").events.click();
  assert.equal(r.run("state.answers[questions[1].id].total"), r.run("lab.variant(state.formId,'it').total"));
  r.run("goNext()"); assert.match(r.node("options").innerHTML, /labPreview/); assert.ok(r.node("labPreview").textContent.includes("Artefatto") || r.node("labPreview").textContent.includes("artefatto"));
  r.node("labReference").checked = true; r.node("labClaim").checked = false; r.node("labDelivery").value = "release"; r.node("labApply").events.click();
  assert.equal(r.run("answeredCount()"), 3);
  r.run("goPrev()"); r.node("labTotal").value = "999"; r.node("labTotal").events.input();
  assert.equal(r.run("answeredCount()"), 1); assert.equal(r.node("nextBtn").disabled, true);
  for (const language of ["it", "en"]) for (const form of ["A", "B", "C"]) {
    const s = lab(form, language); s.start(); s.run(`state.language=${JSON.stringify(language)};state.selectedModeId='operational-lab';selectNextForm=()=>${JSON.stringify(form)};startAssessment()`);
    s.node("labOrder").events.click(); assert.equal(s.run("questions[0].sourceId"), "LAB_K1_CORRECT");
    s.node("labOperation").value = "sum"; s.node("labCalculate").events.click(); s.node("labApply").events.click(); s.run("goNext()");
    s.node("labChoice0").events.change(); s.node("labApply").events.click(); s.run("goNext()");
    s.node("labReference").checked = true; s.node("labClaim").checked = false; s.node("labDelivery").value = "release"; s.node("labApply").events.click(); s.run("goNext()");
    for (let i = 0; i < 3; i++) { s.node("labChoice0").events.change(); s.node("labApply").events.click(); if (i < 2) s.run("goNext()"); }
    assert.equal(s.run("state.index"), 5); assert.equal(s.node("finishBtn").disabled, false);
    s.node("finishBtn").events.click(); assert.equal(s.run("state.latestReport.results.simulatedSummary.value"), 100);
    assert.equal(s.run("state.latestReport.criticalFindings.length"), 0); assert.equal(s.run("readLabDraft().status"), "absent");
  }
});

test("draft stores only confirmed choices and resumes original language/form/order without consuming rotation", () => {
  const r = lab("C", "en"); r.start();
  r.run("state.selectedModeId='operational-lab';startAssessment();state.labOrder='correct-first';questions=lab.questions(state.formId,currentLanguage(),state.labOrder);state.answers=Object.fromEntries(questions.map(q=>[q.id,good['C_'+q.sourceId]]));state.index=4;saveLabDraft()");
  const original = JSON.parse(r.storage.get("aiSkillAssessmentDraft")).draft;
  assert.equal(original.language, "en"); assert.equal(original.order, "correct-first");
  assert.doesNotMatch(JSON.stringify(original), /name|role|area|startedAt|completedAt|history|time|receipt|credit/);
  const cycles = r.run("JSON.stringify(readFormCycles())");
  r.run("resetToInitialPage();resumeLabDraft()");
  assert.equal(r.run("currentLanguage()"), "en"); assert.equal(r.run("state.formId"), original.formId); assert.equal(r.run("state.index"), 4);
  assert.equal(r.run("JSON.stringify(readFormCycles())"), cycles); assert.equal(r.run("state.meta.name"), "");
  assert.deepEqual(plain(r.run("state.answers")), original.choices);
  assert.equal(r.storage.has("aiSkillAssessmentHistory"), false);
});

test("incompatible, corrupt and inaccessible drafts are preserved and never silently applied", () => {
  const r = lab(); r.start();
  r.storage.set("aiSkillAssessmentDraft", "{broken"); r.run("renderLabDraftNotice();resumeLabDraft()");
  assert.equal(r.storage.get("aiSkillAssessmentDraft"), "{broken"); assert.match(r.node("labDraftNotice").innerHTML, /non è compatibile/);
  r.storage.delete("aiSkillAssessmentDraft"); r.run("state.selectedModeId='operational-lab';startAssessment()");
  const draft = JSON.parse(r.storage.get("aiSkillAssessmentDraft")).draft;
  for (const field of ["scoringVersion", "labVersion", "formVersion", "questionBankVersion"]) {
    r.context.draft = { ...draft, [field]: "future" }; assert.equal(r.run("lab.draftStatus(draft,labContentVersions())"), "incompatible");
  }
  r.run("localStorage.setItem=()=>{throw Error('quota')};saveLabDraft()"); assert.equal(r.node("labStorageStatus").hidden, false);
  r.run("localStorage.getItem=()=>{throw Error('blocked')}"); assert.equal(r.run("readLabDraft().status"), "unavailable");
});

test("interrupt confirmation, draft replacement cancellation and clear local data handle the draft", () => {
  const r = lab(); r.start(); r.run("state.selectedModeId='operational-lab';startAssessment();window.confirm=()=>false;interruptAssessment()");
  const draft = r.storage.get("aiSkillAssessmentDraft"); assert.ok(draft);
  r.run("startAssessment()"); assert.equal(r.storage.get("aiSkillAssessmentDraft"), draft);
  r.run("window.confirm=()=>true;interruptAssessment()"); assert.equal(r.run("readLabDraft().status"), "absent");
  r.run("state.selectedModeId='operational-lab';startAssessment();renderDashboard(full())");
  r.node("clearHistoryBtn").events.click(); assert.equal(r.run("readLabDraft().status"), "absent");
});

test("completion freezes JSON/CSV/history, clears draft, and historical schema 3 remains original", () => {
  const r = lab(); r.start(); r.run("state.selectedModeId='operational-lab';startAssessment();state.answers=Object.fromEntries(questions.map((q,i)=>[q.id,['all-rows',{operation:'sum',total:lab.variant(state.formId,currentLanguage()).total},{action:'release',reference:true,keepClaim:false},'export','draft-only','repeat-update'][i]]));finishAssessment()");
  assert.equal(r.run("readLabDraft().status"), "absent");
  const report = r.run("state.latestReport"); assert.equal(report.criticalFindings.length, 2);
  assert.equal(JSON.parse(r.storage.get("aiSkillAssessmentHistory")).length, 1);
  const snapshot = JSON.stringify(report); r.context.saved = report;
  r.run("state.language='en';lab.TITLES[0][0]='changed title';renderDashboard(saved)"); assert.equal(JSON.stringify(report), snapshot);
  assert.match(r.node("dashboard").innerHTML, /Verifica le evidenze/); assert.doesNotMatch(r.node("dashboard").innerHTML, /changed title/);
  const rows = plain(r.context.core.csvRows(report)); assert.ok(rows.some(row => row[1] === "criticalFindings.1.code" && row[2] === "duplicate-action"));
  const old = plain(r.run("(() => {const qs=questionsForMode(buildQuestionForm('A'),getModeById('harness'));return core.evaluate(qs,Object.fromEntries(qs.map(q=>[q.id,choose(q)])),{...meta,testMode:{id:'harness',questionCount:10}},'2026-11-25');})()")); old.meta.reportSchemaVersion = 3; old.meta.scoringVersion = "3.0.0"; old.meta.assessmentVersion = "3.3.0";
  r.context.old = old; const original = JSON.stringify(old); r.run("renderDashboard(old)"); assert.equal(r.run("core.reportKind(old)"), "evidence"); assert.equal(JSON.stringify(old), original);
});

test("local assets and native controls support offline operation and accessible structure", () => {
  const html = fs.readFileSync(new URL("../ai_skill_test.html", import.meta.url), "utf8");
  assert.match(html, /id="labPrivacyNote"/); assert.match(html, /id="questionTitle" tabindex="-1"/);
  const ui = fs.readFileSync(new URL("../assets/lab-ui.js", import.meta.url), "utf8");
  assert.match(ui, /<fieldset><legend>/); assert.match(ui, /scope="col"/); assert.match(ui, /role="status"/);
  for (const file of ["lab-ui", "operational-lab"]) assert.doesNotMatch(fs.readFileSync(new URL(`../assets/${file}.js`, import.meta.url), "utf8"), /fetch\(|XMLHttpRequest|sendBeacon|WebSocket|eval\(/);
});

test("malformed simulation records fall back to raw inspection without breaking history", () => {
  const r = lab();
  const original = plain(r.run("report()"));
  for (const mutate of [v => delete v.results.simulatedCases[0].initialState, v => { v.results.simulatedCases[0].decisions = null; }, v => { v.results.simulatedSummary.value = "100"; }, v => { v.results.simulatedCases[1].effects.pendingWork = {}; }]) {
    const v = plain(original); mutate(v); r.context.broken = v;
    assert.equal(r.run("core.reportKind(broken)"), "unknown"); r.run("renderDashboard(broken)");
    assert.match(r.node("dashboard").innerHTML, /Formato del report non supportato/);
  }
});

test("failed draft removal permits interruption and warns after interruption or successful completion", () => {
  const r = lab(); r.start(); r.run("state.selectedModeId='operational-lab';startAssessment();globalThis.setDraft=localStorage.setItem;localStorage.setItem=(key,value)=>{if(value==='null')throw Error('blocked');setDraft(key,value)};interruptAssessment()");
  assert.equal(r.run("state.meta.testMode"), undefined); assert.equal(r.node("labStorageStatus").hidden, false);
  assert.match(r.node("labStorageStatus").textContent, /copia precedente potrebbe essere ancora presente/);
  r.run("resumeLabDraft()");
  r.run("state.answers=Object.fromEntries(questions.map((q,i)=>[q.id,['all-rows',{operation:'sum',total:lab.variant(state.formId,currentLanguage()).total},{action:'release',reference:true,keepClaim:false},'use-data','draft-only','continue'][i]]));finishAssessment()");
  assert.equal(r.run("state.latestReport.results.simulatedSummary.value"), 100); assert.equal(r.node("labStorageStatus").hidden, false);
  assert.ok(r.storage.has("aiSkillAssessmentDraft"));
});

test("a session still exits when browser storage was blocked from the start", () => {
  const r = lab();r.start();
  r.run("const denied=()=>{throw Error('blocked')};localStorage.getItem=denied;localStorage.setItem=denied;localStorage.removeItem=denied;state.selectedModeId='complete';startAssessment()");
  assert.equal(r.run("state.meta.testMode.id"), "complete");
  r.run("interruptAssessment()");
  assert.equal(r.run("state.meta.testMode"), undefined);
  assert.equal(r.storage.has("aiSkillAssessmentDraft"),false);
  assert.match(r.node("labStorageStatus").textContent, /Test interrotto/);
});
