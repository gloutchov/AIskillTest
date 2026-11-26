import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { runtime } from "./helpers/runtime.mjs";
const plain = value => JSON.parse(JSON.stringify(value));
const blueprint = fs.readFileSync(new URL("../ASSESSMENT_BLUEPRINT.md",import.meta.url),"utf8");
const matrix = [...blueprint.matchAll(/^\| (C\d{2}) \| ([FUAH]) \| ([QDTE]) \| ([FUAH]\d{2}) \| ([BOS]) \| ([\w-]+) \|/gm)];
function complete(form="A",language="it") {
  const r = runtime(); r.context.form=form; r.context.lang=language;
  r.run(`state.language=lang;writeFormCycle(lang,'complete',{remaining:[form],last:null});state.selectedModeId='complete';startAssessment();globalThis.qs=questions;globalThis.good=Object.fromEntries(qs.map(q=>[q.id,choose(q)]));globalThis.report=(answers=good)=>core.evaluate(qs,answers,state.meta,'2026-11-26T12:00:00Z');`);
  return r;
}

test("full assessment implements every approved slot and area/evidence quota in all six forms", () => {
  assert.equal(matrix.length,50);
  for(const lang of ["it","en"]) for(const form of ["A","B","C"]) {
    const r=complete(form,lang), units=plain(r.run("qs"));
    assert.equal(units.length,50); assert.equal(new Set(units.map(q=>q.id)).size,50);
    const results=plain(r.run("report()"));
    for(const row of matrix) {
      const q=units.find(q=>q.slotId===row[1]); assert.ok(q,row[1]);
      const item=results.answers.find(item=>item.id===q.id);
      assert.deepEqual([item.primaryArea,item.evidenceType,item.objectiveId,item.taskLevel,item.questionKind],row.slice(2,7));
      assert.equal(item.slotId,row[1]); assert.equal(item.objectiveAlignment,"direct");
      if(q.originSourceId) assert.equal(item.originSourceId,q.originSourceId);
    }
    for(const [area,counts] of Object.entries({F:[11,1,0,0],U:[8,3,2,3],A:[9,1,0,2],H:[8,1,0,1]})) {
      assert.deepEqual(["Q","D","T","E"].map(k=>results.coverage.byArea[area].byEvidence[k].proposed),counts);
      assert.equal(results.results.knowledgeByArea[area].status,"reached"); assert.equal(results.results.knowledgeByArea[area].value,100);
    }
    assert.equal(results.answers.filter(q=>q.questionKind==="knowledge").length,6);
    assert.equal(results.answers.filter(q=>q.questionKind==="scenario").length,30);
    assert.equal(results.results.simulatedSummary.value,100); assert.equal(results.results.simulatedCases.length,2);
    assert.deepEqual(units.slice(44).map(q=>q.sourceId),plain(r.run("LOCAL_LAB.IDS")));
    assert.equal(results.meta.assessmentVersion,"3.5.2"); assert.equal(results.meta.formVersion,"1.8");
    assert.equal(results.meta.questionBankVersion,"2026.11-m22"); assert.equal(results.meta.scoringVersion,"3.1.0");
    assert.equal(results.meta.reportSchemaVersion,4); assert.equal(r.run("core.reportKind(report())"),"evidence");
  }
  const r=runtime(); assert.throws(()=>r.run("questionsForMode(buildQuestionForm('A').filter(q=>q.sourceId!=='MA01'),getModeById('complete'))"),/Incomplete full-test coverage/);
});

test("correct, partial and incorrect quiz choices and exercise outcomes remain independent", () => {
  for(const lang of ["it","en"]) for(const form of ["A","B","C"]) {
    const r=complete(form,lang);
    const cases=r.run(`(() => {
      const low=Object.fromEntries(qs.map(q=>[q.id,choose(q,false)]));
      const partial={...good};qs.filter(q=>core.classify(q).evidenceType==='Q').forEach(q=>partial[q.id]=q.options.findIndex(o=>o.score===3));
      const critical={...good,[form+'_LAB_K2_SOURCE']:'export'};
      const qHighEWeak={...low};qs.filter(q=>core.classify(q).evidenceType==='Q').forEach(q=>qHighEWeak[q.id]=good[q.id]);
      const highDeclared={...low};qs.filter(q=>q.type==='likert').forEach(q=>highDeclared[q.id]=5);
      return {partial:report(partial),critical:report(critical),weak:report(qHighEWeak),declared:report(highDeclared)};
    })()`);
    for(const area of ["F","U","A","H"]) {
      assert.equal(cases.partial.results.knowledgeByArea[area].value,50);
      assert.equal(cases.weak.results.knowledgeByArea[area].value,100);
      assert.equal(cases.declared.results.knowledgeByArea[area].value,0);
    }
    assert.equal(cases.critical.results.simulatedSummary.band,"critical");
    assert.equal(cases.weak.results.simulatedSummary.band,"critical");
    assert.equal(cases.declared.results.declaredContrasts.length,6);
    r.context.saved=cases.critical;r.run("renderDashboard(saved)");
    const html=r.node("dashboard").innerHTML;
    assert.ok(html.indexOf(lang==="it"?"Criticità nelle azioni simulate":"Critical simulated actions")<html.indexOf('grid-4 evidence-counts'));
    assert.doesNotMatch(html,/Champion|Expert|92\/100/);
  }
});

test("missing Q, absent objectives, incomplete cases and actual zeros never compensate each other", () => {
  const r=complete();const result=r.run(`(() => {
    const absent={...good};delete absent.A_C10;delete absent.A_C11;
    const incomplete={...good};delete incomplete.A_LAB_K2_RESUME;
    const zero={...good};qs.filter(q=>core.classify(q).evidenceType==='Q'&&core.classify(q).primaryArea==='A').forEach(q=>zero[q.id]=choose(q,false));
    return {absent:report(absent),incomplete:report(incomplete),zero:report(zero)};
  })()`);
  assert.equal(result.absent.results.knowledgeByArea.F.status,"partial"); assert.equal(result.absent.results.knowledgeByArea.F.band,null);
  assert.deepEqual(plain(result.absent.coverage.byArea.F.missingObjectives),["F06"]);
  assert.equal(result.incomplete.results.simulatedSummary.value,null); assert.equal(result.incomplete.coverage.byEvidence.E.missing,1);
  assert.equal(result.incomplete.results.knowledgeByArea.H.value,100);
  assert.equal(result.zero.results.knowledgeByArea.A.value,0); assert.equal(result.zero.results.simulatedSummary.value,100);
});

test("complete navigation retains all 50 units when swapping K1 and reconfirms delivery after edits", () => {
  for(const lang of ["it","en"]) {
    const r=complete("A",lang);
    r.run("state.answers={...good};state.index=44;renderQuestion()");
    assert.match(r.node("progressText").textContent,/45.*50/);
    assert.doesNotMatch(r.node("options").innerHTML,/2\/2|Credito|Credit/);
    r.node("labOrder").events.click();
    assert.equal(r.run("questions.length"),50); assert.equal(r.run("state.index"),44);
    assert.equal(r.run("questions[44].sourceId"),"LAB_K1_CORRECT"); assert.equal(r.run("answeredCount()"),50);
    assert.equal(r.run("readLabDraft().status"),"compatible");
    r.run("labCommit(questions[44],{operation:'sum',total:301})");
    assert.equal(r.run("state.answers.A_LAB_K1_RELEASE"),undefined);
    assert.equal(r.run("answeredCount()"),49); r.run("state.index=46;renderQuestion()");
    r.node("labApply").events.click(); // Uses preview controls; real confirmation is still required.
    r.run("state.answers={...good};state.index=49;renderQuestion()");
    assert.match(r.node("progressText").textContent,/50.*50/);
    assert.equal(r.node("finishBtn").textContent,lang==="it"?"Mostra quadro delle evidenze":"Show evidence overview");
    r.run("goPrev();goNext();finishAssessment()");
    assert.equal(r.run("state.latestReport.answers.length"),50);
    assert.equal(r.run("readLabDraft().status"),"absent");
  }
});

test("complete draft resumes exact form, language, question order, partial text and actions without profile or rotation", () => {
  for(const lang of ["it","en"]) for(const form of ["A","B","C"]) {
    const r=complete(form,lang);r.node("nameInput").value="Private name";
    r.run("state.meta.name='Private name';state.answers={...good};state.index=questions.findIndex(q=>q.type==='text');renderQuestion()");
    const textId=r.run("questions[state.index].id");r.node(textId+"_text").events.input({target:{value:"Partial text"}});
    const raw=r.storage.get("aiSkillAssessmentDraft"), d=JSON.parse(raw).draft;
    assert.equal(d.draftSchemaVersion,2);assert.equal(d.modeId,"complete");assert.equal(d.choices[textId],"Partial text");
    assert.ok(!raw.includes("Private name"));assert.ok(!raw.includes("selfAssessment"));
    const cycle=JSON.stringify(r.run("readFormCycles()"));
    r.run("state.language=lang==='it'?'en':'it';state.answers={};questions=[];state.meta={};resumeLabDraft()");
    assert.equal(r.run("currentLanguage()"),lang);assert.equal(r.run("state.formId"),form);
    assert.equal(r.run("state.meta.testMode.id"),"complete");assert.equal(r.run("state.meta.name"),"");
    assert.deepEqual(plain(r.run("questions.map(q=>q.id)")),d.questionIds);
    assert.equal(r.run(`state.answers[${JSON.stringify(textId)}]`),"Partial text");
    assert.equal(JSON.stringify(r.run("readFormCycles()")),cycle);
    assert.equal(r.run("readLabDraft().status"),"compatible");
  }
});

test("complete drafts reject corruption and version changes and respect replacement, cancellation and storage failures", () => {
  const r=complete();const original=JSON.parse(r.storage.get("aiSkillAssessmentDraft"));
  for(const change of [{index:50},{questionIds:[]},{choices:{A_C01:999}},{choices:{A_C01:false}},{name:"unexpected"},{questionIds:[...original.draft.questionIds.slice(0,49),original.draft.questionIds[0]]}]) {
    const raw=JSON.stringify({...original,draft:{...original.draft,...change}});r.storage.set("aiSkillAssessmentDraft",raw);
    assert.equal(r.run("readLabDraft().status"),"invalid");r.run("resumeLabDraft()");assert.equal(r.storage.get("aiSkillAssessmentDraft"),raw);
  }
  r.storage.set("aiSkillAssessmentDraft",JSON.stringify({...original,draft:{...original.draft,questionBankVersion:"old"}}));assert.equal(r.run("readLabDraft().status"),"incompatible");
  r.storage.set("aiSkillAssessmentDraft",JSON.stringify(original));
  r.run("window.confirm=()=>false;state.selectedModeId='operational-lab';startAssessment()");assert.equal(r.run("state.meta.testMode.id"),"complete");
  r.run("interruptAssessment()");assert.equal(r.run("readLabDraft().status"),"compatible");
  r.run("window.confirm=()=>true;globalThis.setDraft=localStorage.setItem;localStorage.setItem=(key,value)=>{if(value==='null')throw Error('denied');setDraft(key,value)};interruptAssessment()");assert.equal(r.run("readLabDraft().status"),"compatible");
  assert.equal(r.run("state.meta.testMode"),undefined);
  assert.equal(r.node("labStorageStatus").hidden,false);
  assert.match(r.node("labStorageStatus").textContent,/Test interrotto/);
  r.run("resumeLabDraft()");
  r.run("localStorage.setItem=()=>{throw Error('quota')};saveLabDraft()");assert.equal(r.node("labStorageStatus").hidden,false);
});

test("failed history writes retain answers and allow retrying the original report once", () => {
  for (const mode of ["complete", "operational-lab"]) {
    const r = runtime();
    r.context.mode = mode;
    r.run(`state.selectedModeId=mode; startAssessment(); state.answers=Object.fromEntries(questions.map(q=>[q.id,choose(q)])); saveLabDraft();`);
    const original = JSON.stringify([plain(r.run("full()"))]);
    r.storage.set("aiSkillAssessmentHistory", original);
    r.run(`globalThis.setItem=localStorage.setItem; localStorage.setItem=(key,value)=>{if(key==='aiSkillAssessmentHistory')throw Error('quota');setItem(key,value)}; finishAssessment();`);
    assert.equal(r.storage.get("aiSkillAssessmentHistory"), original);
    assert.ok(r.storage.has("aiSkillAssessmentDraft"));
    assert.equal(r.run("state.unsavedReport===state.latestReport"), true);
    assert.match(r.node("pendingReportNotice").innerHTML, /Riprova a salvare/);

    const refreshed = runtime();
    refreshed.storage.set("aiSkillAssessmentDraft", r.storage.get("aiSkillAssessmentDraft"));
    refreshed.run("resumeLabDraft()");
    assert.equal(refreshed.run("answeredCount()"), mode === "complete" ? 50 : 6);

    r.run("window.confirm=()=>false");r.node("restartBtn").events.click();
    assert.equal(r.run("state.unsavedReport===state.latestReport"), true);
    r.run("loadLastReport()");
    assert.match(r.node("pendingReportNotice").innerHTML, /Torna al report da salvare/);
    r.node("openUnsavedReportBtn").events.click();
    const unsaved = plain(r.run("state.latestReport"));
    r.node("retrySaveReportBtn").events.click();
    assert.equal(r.storage.get("aiSkillAssessmentHistory"), original);
    assert.equal(r.run("state.unsavedReport===state.latestReport"), true);
    r.run("localStorage.setItem=setItem");
    const retry = r.node("retrySaveReportBtn").events.click;
    retry();retry();
    assert.deepEqual(JSON.parse(r.storage.get("aiSkillAssessmentHistory")), [...JSON.parse(original), unsaved]);
    assert.equal(r.run("readLabDraft().status"), "absent");
    assert.equal(r.run("window.events.has('beforeunload')"), false);
    assert.equal(r.node("pendingReportNotice").hidden, true);
  }
});

test("drafts from 3.5.0 migrate with matching contents and future UI-only versions remain readable", () => {
  for (const mode of ["complete", "operational-lab"]) {
    const r = runtime();
    r.context.mode = mode;
    r.run("state.selectedModeId=mode;startAssessment();state.answers[questions[0].id]=choose(questions[0]);saveLabDraft()");
    const draft = JSON.parse(r.storage.get("aiSkillAssessmentDraft")).draft;
    r.storage.delete("aiSkillAssessmentDraft");
    r.storage.set("aiSkillOperationalLabDraft",JSON.stringify({...draft,assessmentVersion:"3.5.0",formVersion:"old"}));
    assert.equal(r.run("readLabDraft().status"),"incompatible");
    r.storage.set("aiSkillOperationalLabDraft",JSON.stringify({...draft,assessmentVersion:"3.5.0"}));
    r.run("resumeLabDraft()");
    assert.equal(r.run("answeredCount()"),1);
    assert.equal(r.run("state.meta.assessmentVersion"),"3.5.2");
    assert.equal(r.storage.has("aiSkillOperationalLabDraft"),false);
    const record = JSON.parse(r.storage.get("aiSkillAssessmentDraft"));
    record.draft.assessmentVersion = "3.5.3";
    r.storage.set("aiSkillAssessmentDraft", JSON.stringify(record));
    assert.equal(r.run("readLabDraft().status"), "compatible");
  }
});

test("thematic content, six learning forms, lab rules and original reports match the approved 3.4.0 release", () => {
  const baseline=JSON.parse(fs.readFileSync(new URL("./fixtures/m21-regression.json",import.meta.url),"utf8"));
  const current=runtime();
  for(const lang of ["it","en"]) for(const form of ["A","B","C"]) {
    current.context.lang=lang;current.context.form=form;
    const code=`(() => {state.language=lang;const bank=lang==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form);return {bank,paths:TEST_MODES.filter(m=>m.id!=='complete'&&m.type!=='learning').map(m=>({id:m.id,qs:questionsForMode(bank,m,false,form)})),learning:FIRST_STEPS_QUESTIONS[lang].filter(q=>q.formId===form),lab:LOCAL_LAB.evaluate(form,lang,{})};})()`;
    assert.equal(createHash("sha256").update(JSON.stringify(current.run(code))).digest("hex"),baseline.hashes[`${lang}:${form}`]);
  }
  const saved=baseline.report; const raw=JSON.stringify([saved]);current.storage.set("aiSkillAssessmentHistory",raw);
  current.run("loadLastReport()");assert.equal(current.storage.get("aiSkillAssessmentHistory"),raw);
  assert.equal(current.run("core.reportKind(state.latestReport)"),"evidence");assert.deepEqual(plain(current.run("state.latestReport")),saved);
});

test("complete reports freeze bilingual decisions, slots, recommendations and exports independently of the current bank", () => {
  const r=complete("B","en");r.run("state.answers={...good,B_C10:choose(qs.find(q=>q.sourceId==='C10'),false)};finishAssessment()");
  const report=plain(r.run("state.latestReport")), snapshot=JSON.stringify(report);r.context.saved=report;
  assert.equal(report.results.nextSteps.filter(s=>s.objectiveId==="F06").length,1);
  r.run("state.language='it';COMPLETE_ASSESSMENT.FOUNDATION[0].prompt[1]='CHANGED';renderDashboard(saved)");
  assert.equal(JSON.stringify(report),snapshot);assert.doesNotMatch(r.node("dashboard").innerHTML,/CHANGED/);
  assert.equal(r.run("readLabDraft().status"),"absent");
  r.run("downloadBlob=(content,name,type)=>{globalThis.download={content,name,type}};exportJson(saved)");assert.deepEqual(JSON.parse(r.context.download.content),report);
  const rows=plain(r.context.core.csvRows(report));
  for(const field of ["answers.0.slotId","results.simulatedCases.1.decisions.2.rawAnswer","meta.labVersion"])assert.ok(rows.some(row=>row[1]===field),field);
  r.run("exportCsv(saved)");assert.ok(r.context.download.content.includes("answers.0.slotId"));
});
