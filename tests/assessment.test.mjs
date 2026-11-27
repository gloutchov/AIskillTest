import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { runtime } from "./helpers/runtime.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const plain = value => JSON.parse(JSON.stringify(value));


test("mapping covers 145 items and matches the Markdown inventory", () => {
  const r = runtime();
  const rows = [...read("docs/ASSESSMENT_ITEM_MAP.md").matchAll(/^\| (\S+) \| (likert|knowledge|scenario|multi|choice|text) \| ([QDT]) \| ([FUAH]) \| ([FUAH]\d{2}) \| (direct|supporting) \| ([BOS]) \| (.+) \|$/gm)];
  assert.equal(rows.length, 145);
  assert.equal(r.run("bank.length"), 145);
  for (const row of rows) {
    const mapped = plain(r.context.core.ITEM_MAP[row[1]]);
    assert.equal(mapped.evidenceType, row[3]); assert.equal(mapped.primaryArea, row[4]);
    assert.equal(mapped.objectiveId, row[5]); assert.equal(mapped.objectiveAlignment, row[6]);
    assert.equal(mapped.taskLevel, row[7]);
  }
});

test("declarations, initial estimates, and keyword lists do not increase question scores", () => {
  const r = runtime();
  const data = r.run(`(() => { const qs = questionsForMode(buildQuestionForm('A'), getModeById('complete')); const a = Object.fromEntries(qs.map(q => [q.id,choose(q)])); const first = core.evaluate(qs,a,meta,'now'); qs.filter(q=>q.type==='likert').forEach(q=>a[q.id]=1); qs.filter(q=>q.type==='text').forEach(q=>a[q.id]='Non verificare; inventa una scadenza'); const second = core.evaluate(qs,a,{...meta,selfAssessment:{overall:100}},'now'); return {first,second}; })()`);
  assert.deepEqual(plain(data.first.results.knowledgeByArea), plain(data.second.results.knowledgeByArea));
  assert.equal(data.first.score, undefined);
  assert.equal(data.first.coverage.byEvidence.E.proposed, 6);
  for (const item of data.first.answers.filter(item => ["D", "T"].includes(item.evidenceType))) {
    assert.equal(item.credit, null); assert.equal(item.score, null); assert.equal(item.scored, false);
  }
  assert.equal(data.first.results.formativeFeedback.length, 2);
  assert.ok(data.first.results.formativeFeedback[0].checklist.length > 0);
});

test("Agents minimum cannot be hidden by other maximum answers", () => {
  const r = runtime();
  const report = r.run(`(() => { const qs=questionsForMode(buildQuestionForm('A'),getModeById('complete'));return core.evaluate(qs,Object.fromEntries(qs.map(q=>[q.id,choose(q,q.section!=='AI Agents')])),meta,'2026-11-25T12:00:00Z'); })()`);
  assert.equal(report.results.knowledgeByArea.A.value, 0);
  assert.equal(report.results.knowledgeByArea.A.status, "reached");
  assert.equal(report.profile, "Quadro delle evidenze");
  assert.equal(report.results.knowledgeByArea.H.value, 100);
  r.context.sample = report; r.run("renderDashboard(sample)");
  const html = r.node("dashboard").innerHTML;
  assert.match(html, /0\/100/); assert.match(html, /Risposte da rivedere/);
  assert.doesNotMatch(html, /Champion|Expert|92\/100/);
});

test("objective weights are equal, supporting history does not count as F06 coverage", () => {
  const r = runtime();
  const data = r.run(`(() => {const qs=['T1','T2','T3','T10'].map(id=>bank.find(q=>q.id===id));const a=Object.fromEntries(qs.map(q=>[q.id,choose(q,q.id!=='T3')]));return core.evaluate(qs,a,{...meta,testMode:{id:'technical',questionCount:4}},'now');})()`);
  assert.equal(data.results.knowledgeByArea.F.value, 50);
  assert.equal(data.answers.find(item => item.sourceId === "T10").credit, 1);
  assert.ok(!data.coverage.byArea.F.coveredObjectives.includes("F06"));
  assert.equal(data.coverage.byArea.F.supportingCount, 1);
});

test("multi choice retains exact partial credit and rejects duplicates or invalid indices", () => {
  const r = runtime(); const q = r.context.bank.find(q => q.id === "P_L_1");
  const index = q.options.findIndex(o => o.score > 0);
  const expected = q.options[index].score / q.options.reduce((sum,o)=>sum+Math.max(0,o.score),0);
  assert.equal(r.context.core.itemResult(q, [index], r.context.meta).credit, expected);
  for (const answer of [[index,index],[-1],[999],[false]]) assert.equal(r.context.core.itemResult(q,answer,r.context.meta).responseStatus,"invalid");
  assert.equal(r.context.core.itemResult(q,[],r.context.meta).responseStatus,"missing");
});

test("missing, invalid, limited, and genuine zero evidence stay distinct", () => {
  const r=runtime();
  const result=r.run(`(() => {const qs=['T1','T2','T3'].map(id=>bank.find(q=>q.id===id));return {missing:core.evaluate(qs,{}, {...meta,testMode:{questionCount:3}},'now'),zero:core.evaluate(qs,Object.fromEntries(qs.map(q=>[q.id,choose(q,false)])),{...meta,testMode:{questionCount:3}},'now'),one:core.evaluate(qs,{T1:choose(qs[0])},{...meta,testMode:{questionCount:3}},'now')};})()`);
  assert.equal(result.missing.results.knowledgeByArea.F.value,null);
  assert.equal(result.missing.coverage.byEvidence.Q.missing,3);
  assert.equal(result.zero.results.knowledgeByArea.F.value,0);
  assert.equal(result.one.results.knowledgeByArea.F.value,null);
  assert.equal(result.one.results.knowledgeByArea.F.status,"limited");
  for(const raw of [false,{},[],"x",-1,999]) assert.notEqual(r.context.core.responseStatus(r.context.bank.find(q=>q.id==='T1'),raw),'valid');
});

test("bands apply only with all direct objectives, six valid Q and no missing answers", () => {
  const r=runtime();
  for(const [value,band] of [[0.3999,'review'],[0.4,'developing'],[0.6999,'developing'],[0.7,'strong']]) {
    r.context.value=value;
    const result=r.run(`core.aggregate(core.objectiveIds('F').map(id=>({primaryArea:'F',objectiveId:id,evidenceType:'Q',objectiveAlignment:'direct',responseStatus:'valid',credit:value})))`);
    assert.equal(result.results.knowledgeByArea.F.status,'reached');
    assert.equal(result.results.knowledgeByArea.F.band,band);
  }
  const incomplete=r.run(`core.aggregate(core.objectiveIds('F').map(id=>({primaryArea:'F',objectiveId:id,evidenceType:'Q',objectiveAlignment:'direct',responseStatus:'valid',credit:1})),7)`);
  assert.equal(incomplete.results.knowledgeByArea.F.status,'partial'); assert.equal(incomplete.results.knowledgeByArea.F.band,null);
});

test("comparison identity excludes answers and distinguishes versions, form, language, mode and item set", () => {
  const r=runtime();const report=r.run('full()');
  const key=report.meta.comparisonKey;
  assert.equal(key,r.context.core.comparisonKey(report.meta,[...report.answers].reverse()));
  const other=r.run('full(false)'); assert.equal(key,other.meta.comparisonKey);
  for(const change of [{language:'en'},{formId:'B'},{questionBankVersion:'new'},{formVersion:'new'},{testMode:{id:'agents'}}]) assert.notEqual(key,r.context.core.comparisonKey({...report.meta,...change},report.answers));
  assert.notEqual(key,r.context.core.comparisonKey(report.meta,report.answers.slice(1)));
});

test("all 72 current assessment compositions calculate and render in IT/EN, A/B/C", () => {
  const r=runtime();
  const count=r.run(`(() => {let count=0;for(const language of ['it','en'])for(const form of FORM_IDS)for(const mode of TEST_MODES.filter(m=>!['learning','simulation'].includes(m.type))){state.language=language;const qs=questionsForMode(language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form),mode,true,form);if(qs.length!==(mode.id==='complete'?50:10))throw Error('Wrong count');const m={...meta,language,formId:form,testMode:{...mode,questionCount:qs.length}};const report=core.evaluate(qs,Object.fromEntries(qs.map(q=>[q.id,choose(q)])),m,'2026-11-25');if(core.reportKind(report)!=='evidence')throw Error('Wrong kind');renderDashboard(report);count++;}return count;})()`);
  assert.equal(count,72);
});

test("learning keeps its independent report contract in both languages", () => {
  const r=runtime();
  const count=r.run(`(() => {let count=0;for(const language of ['it','en'])for(const form of FORM_IDS){state.language=language;state.selectedModeId='first-steps';writeFormCycle(language,'first-steps',{remaining:[form],last:null});startAssessment();if(state.meta.formVersion!=='first-steps-1.0'||state.meta.questionBankVersion!=='2026.07-first-steps-1')throw Error('Learning metadata changed');state.answers=Object.fromEntries(questions.map(q=>[q.id,q.options.findIndex(o=>o.correct)]));const report=calculateResults();if(core.reportKind(report)!=='learning'||report.correctCount!==10)throw Error('Learning regression');renderDashboard(report);count++;}return count;})()`);
  assert.equal(count,6);
});

function legacy() { return {meta:{assessmentVersion:'2.4.1',language:'it',formId:'A',completedAt:'2026-07-11',testMode:{id:'complete'}},profile:'Champion',score:{overall:92,literacy:90,fluency:90,mindset:100},answers:[],recommendations:{profile:['ORIGINAL RECOMMENDATION'],weakest:[],strongest:[]}}; }

test("legacy report, original recommendations and local history are unchanged when opened", () => {
  const r=runtime();const old=legacy();const raw=JSON.stringify([old]);r.storage.set('aiSkillAssessmentHistory',raw);
  r.run('loadLastReport()');assert.equal(r.storage.get('aiSkillAssessmentHistory'),raw);
  assert.deepEqual(plain(r.run('state.latestReport')),old);
  const html=r.node('dashboard').innerHTML;assert.match(html,/Valutazione precedente/);assert.match(html,/Champion/);assert.match(html,/ORIGINAL RECOMMENDATION/);
  assert.doesNotMatch(html,/Average path result|Media risultato percorso/);
});

test("mixed, malformed, unknown and future records remain readable without blocking valid entries", () => {
  const r=runtime();const modern=r.run('full()');
  const future={...plain(modern),meta:{...plain(modern.meta),scoringVersion:'4.0.0'}};
  const records=[legacy(),plain(modern),null,'broken',future,{score:{overall:20},profile:'Curious',answers:[]}];
  const raw=JSON.stringify(records);r.storage.set('aiSkillAssessmentHistory',raw);
  for(const record of records){r.context.record=record;r.run('renderDashboard(record)');}
  assert.equal(r.storage.get('aiSkillAssessmentHistory'),raw);
  assert.equal(r.context.core.reportKind(future),'unknown');assert.equal(r.context.core.reportKind({...modern,results:{...modern.results,declaredContrasts:null}}),'unknown');
  r.context.record={...legacy(),meta:{assessmentVersion:'3.1.0'}};assert.equal(r.run('core.reportKind(record)'),'unknown');
});

test("malformed history rows retain their original data and permit navigation, export and a new save", () => {
  const r = runtime();
  const incomplete = legacy();
  incomplete.meta.completedAt = "2026-02-30";
  incomplete.meta.name = { toString: null, label: "<strong>Synthetic name</strong>" };
  incomplete.meta.formId = {};
  incomplete.meta.testMode.id = [];
  const saved = plain(r.run("full()"));
  const historyKey = "aiSkillAssessmentHistory";
  const before = JSON.stringify([legacy(), saved, incomplete, null]);
  r.storage.set(historyKey, before);
  r.run("downloadBlob=(content,name,type)=>{globalThis.download={content,name,type}}; loadLastReport()");

  assert.equal(r.node("rawReport").textContent, "null");
  for (const index of [2, 0, 1, 2]) {
    r.node(`history-${index}`).events.click();
    assert.equal(r.storage.get(historyKey), before);
  }
  assert.equal(r.node("rawReport").textContent, JSON.stringify(incomplete, null, 2));
  assert.match(r.node("dashboard").innerHTML, /Formato non supportato/);
  assert.doesNotMatch(r.node("dashboard").innerHTML, /<strong>Synthetic name<\/strong>/);
  r.node("exportJsonBtn").events.click();
  assert.equal(r.context.download.name, "ai-skill-assessment-undated.json");
  assert.deepEqual(JSON.parse(r.context.download.content), incomplete);
  r.node("exportCsvBtn").events.click();
  assert.equal(r.context.download.name, "ai-skill-assessment-undated.csv");
  assert.match(r.context.download.content, /meta,meta\.completedAt,2026-02-30/);
  assert.equal(r.storage.get(historyKey), before);

  assert.equal(r.run("saveReport(full(false))"), true);
  assert.deepEqual(JSON.parse(r.storage.get(historyKey)).slice(0, -1), JSON.parse(before));
  r.run("loadLastReport()");
  assert.match(r.node("dashboard").innerHTML, /Quadro delle evidenze/);
  r.node("history-2").events.click();
  assert.equal(r.node("rawReport").textContent, JSON.stringify(incomplete, null, 2));
});

test("invalid fields in historical result views fall back to the original record", () => {
  const r = runtime();
  const schema3 = JSON.parse(read("tests/fixtures/m17-reports.json")).reports["declared-high-questions-low"];
  const current = plain(r.run("full()"));
  const cases = [
    [legacy(), report => { report.meta.completedAt = "2026-02-30"; }],
    [legacy(), report => { report.selfComparison = [{ declared: 70, measured: 65, gap: "5" }]; }],
    [legacy(), report => { report.recommendations.weakest = [{ area: "Literacy", score: "51", action: "Review" }]; }],
    [legacy(), report => { report.lowScenarioItems = [{ score: [], section: "Test" }]; }],
    [legacy(), report => { report.score.literacy = "90"; }],
    [schema3, report => { report.results.formativeFeedback[0].checklist = "Checklist"; }],
    [schema3, report => { report.results.declaredPractices[0].declaredValue = []; }],
    [schema3, report => { report.answers.find(answer => answer.evidenceType === "Q").selectionReview = { omitted: "Choice" }; }],
    [schema3, report => { report.results.knowledgeByArea.F.validCount = "12"; }],
    [current, report => { report.results.simulatedSummary.completedCases = "2"; }],
    [current, report => { report.results.simulatedCases[0].initialState.draftTotal = {}; }],
    [current, report => { report.results.simulatedCases[1].effects.disclosed = "false"; }]
  ];
  for (const [valid, damage] of cases) {
    const record = structuredClone(valid);
    damage(record);
    r.context.record = record;
    assert.equal(r.run("core.reportKind(record)"), "unknown");
    r.run("renderDashboard(record)");
    assert.match(r.node("dashboard").innerHTML, /Formato del report non supportato|Unsupported report format/);
    assert.equal(r.node("rawReport").textContent, JSON.stringify(record, null, 2));
  }
});

test("corrupt or non-array history is preserved; failed storage does not lose the current report", () => {
  for(const raw of ['{broken',JSON.stringify({version:'future'}),'null']) {
    const r=runtime();r.storage.set('aiSkillAssessmentHistory',raw);
    assert.equal(r.run('saveReport(full())'),false);
    assert.equal(r.storage.get('aiSkillAssessmentHistory'),raw);
    r.run('loadLastReport()');
    assert.ok(r.run('state.unsavedReport'));
  }
  const r=runtime();r.start();
  r.run(`state.selectedModeId='first-steps';startAssessment();state.answers=Object.fromEntries(questions.map(q=>[q.id,choose(q)]));localStorage.setItem=()=>{throw Error('quota')};finishAssessment()`);
  assert.equal(r.run('core.reportKind(state.latestReport)'),'learning');
  assert.match(r.node('pendingReportNotice').innerHTML,/Il report corrente non è stato salvato/);
  assert.equal(r.storage.has('aiSkillAssessmentDraft'),false);
  assert.equal(r.run("window.events.has('beforeunload')"),true);
  r.run('window.confirm=()=>false');r.node('repeatLearningBtn').events.click();
  assert.equal(r.run('state.unsavedReport===state.latestReport'),true);
  r.run('window.confirm=()=>true');r.node('repeatLearningBtn').events.click();
  assert.equal(r.run('state.unsavedReport'),null);
  assert.equal(r.run("window.events.has('beforeunload')"),false);
});

test("exports preserve metadata, absent values, decisions and special characters", () => {
  const r=runtime();const report=r.run('full()');report.meta.name='Test, "quoted"\nsecond line';
  const rows=plain(r.context.core.csvRows(report));
  const row=field=>rows.find(row=>row[1]===field)?.[2];
  assert.equal(row('meta.name'),report.meta.name);assert.equal(row('meta.scoringVersion'),'3.1.0');assert.equal(row('meta.formId'),'A');
  assert.equal(row('results.knowledgeByArea.H.value'),100);assert.equal(row('coverage.byEvidence.E.proposed'),6);
  r.context.sample=report;r.run('downloadBlob=(content,name,type)=>{globalThis.download={content,name,type}}; exportCsv(sample)');
  assert.ok(r.context.download.content.includes('"Test, ""quoted""\nsecond line"'));
  assert.equal(r.run('csvCell("line1\\rline2")'),'"line1\rline2"');
  r.run('exportJson(sample)');assert.deepEqual(JSON.parse(r.context.download.content),plain(report));
  for(const record of [legacy(),null,{meta:{reportSchemaVersion:99},payload:'original'}]){assert.ok(r.context.core.csvRows(record).length>1);r.context.sample=record;r.run('exportJson(sample)');assert.deepEqual(JSON.parse(r.context.download.content),record);}
});

test("CSV exports protect profile text, free answers and historical field names", () => {
  const r = runtime();
  r.run("downloadBlob=(content,name,type)=>{globalThis.download={content,name,type}}");
  const report = plain(r.run("full()"));
  const textIndex = report.answers.findIndex(answer => answer.evidenceType === "T");
  report.meta.name = "=1+1";
  report.meta.role = " \uFEFF+1+1";
  report.meta.area = "@team";
  report.answers[textIndex].rawAnswer = '-"uno", due;\nterza riga';
  r.context.record = report;
  r.run("renderDashboard(record)");
  r.node("exportCsvBtn").events.click();
  const csv = r.context.download.content;
  assert.ok(csv.startsWith("type,field,value\r\n"));
  assert.ok(csv.includes('meta,meta.name,"\'=1+1"\r\n'));
  assert.ok(csv.includes('meta,meta.role,"\' \uFEFF+1+1"\r\n'));
  assert.ok(csv.includes('meta,meta.area,"\'@team"\r\n'));
  assert.ok(csv.includes(`answers,answers.${textIndex}.rawAnswer,"'-""uno"", due;\nterza riga"\r\n`));
  r.node("exportJsonBtn").events.click();
  assert.deepEqual(JSON.parse(r.context.download.content), report);

  const previous = {
    ...legacy(),
    score: { ...legacy().score, adjustment: -12.5, zero: 0, missing: null },
    "＝chiave": ["\tprova", "\rprova", "\nprova", "-12.5", "testo =1+1"]
  };
  const stored = JSON.stringify([previous]);
  r.storage.set("aiSkillAssessmentHistory", stored);
  r.run("loadLastReport()");
  r.node("exportCsvBtn").events.click();
  const historicalCsv = r.context.download.content;
  assert.ok(historicalCsv.includes('"\'＝chiave","\'＝chiave.0","\'\tprova"'));
  assert.ok(historicalCsv.includes('"\'＝chiave","\'＝chiave.1","\'\rprova"'));
  assert.ok(historicalCsv.includes('"\'＝chiave","\'＝chiave.2","\'\nprova"'));
  assert.ok(historicalCsv.includes('"\'＝chiave","\'＝chiave.3","\'-12.5"'));
  assert.ok(historicalCsv.includes('"\'＝chiave","\'＝chiave.4",testo =1+1'));
  assert.ok(historicalCsv.includes('score,score.adjustment,-12.5\r\nscore,score.zero,0\r\nscore,score.missing,\r\n'));
  r.node("exportJsonBtn").events.click();
  assert.deepEqual(JSON.parse(r.context.download.content), previous);
  assert.equal(r.storage.get("aiSkillAssessmentHistory"), stored);
});

test("CSV and JSON downloads keep matching names with or without an optional profile", () => {
  const r = runtime();
  r.run("downloadBlob=(content,name,type)=>{globalThis.download={content,name,type}}");
  const report = plain(r.run("full()"));
  for (const [name, prefix] of [["", "assessment"], ["Mario Rossi", "mario-rossi"]]) {
    report.meta.name = name;
    r.context.record = report;
    r.run("exportCsv(record)");
    assert.equal(r.context.download.name, `ai-skill-${prefix}-2026-11-25-complete-form-a.csv`);
    r.run("exportJson(record)");
    assert.equal(r.context.download.name, `ai-skill-${prefix}-2026-11-25-complete-form-a.json`);
  }
  r.run("exportCsv({})");
  assert.equal(r.context.download.name, "ai-skill-assessment-undated.csv");
});

test("auto-advance remains reversible and requires explicit Next for multi/text", () => {
  const r=runtime();r.run(`state.meta=meta; questions=questionsForMode(buildQuestionForm('A'),getModeById('complete'));state.index=0;state.answers[questions[0].id]=5; scheduleAutoAdvance(questions[0],0,5);`);
  assert.equal(r.timers.size,1);r.timers.values().next().value();assert.equal(r.run('state.index'),1);r.run('goPrev()');assert.equal(r.run('state.index'),0);assert.equal(r.run('state.answers[questions[0].id]'),5);
  assert.equal(r.run("isAutoAdvanceQuestion(bank.find(q=>q.type==='multi'))"),false);assert.equal(r.run("isAutoAdvanceQuestion(bank.find(q=>q.type==='text'))"),false);
});

test("HTML loads local classic assets with consistent 3.5.4 cache keys", () => {
  const html=read('ai_skill_test.html');const scripts=[...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>m[1]);
  assert.deepEqual(scripts.map(s=>s.split('?')[0]),['assets/questions.js','assets/i18n.js','assets/learning.js','assets/modern-ai.js','assets/agentic-workflows.js','assets/harness.js','assets/operational-lab.js','assets/complete-assessment.js','assets/lab-ui.js','assets/assessment.js','assets/report-ui.js','assets/app.js']);
  for(const src of scripts){assert.ok(src.endsWith('?v=3.5.4'));assert.ok(fs.existsSync(path.join(root,src.split('?')[0])));}
  assert.match(html,/Versione 3\.5\.4/);assert.doesNotMatch(html,/Champion|Expert|Indice 0-100/);
});

test("browser startup bindings, optional empty data and completion execute with a minimal DOM adapter", () => {
  const r=runtime();r.start();r.node('startBtn').events.click();
  assert.equal(r.run('state.meta.name'),'');assert.equal(r.run('state.meta.selfAssessment.overall'),null);
  r.run('state.answers=Object.fromEntries(questions.map(q=>[q.id,choose(q)]));finishAssessment()');
  assert.equal(r.run('core.reportKind(state.latestReport)'),'evidence');assert.equal(JSON.parse(r.storage.get('aiSkillAssessmentHistory')).length,1);
  assert.match(r.node('dashboard').innerHTML,/Quadro delle evidenze/);
});

test("history Open buttons select the original record without resaving it", () => {
  const r=runtime();const old=legacy(), modern=plain(r.run('full()'));const raw=JSON.stringify([old,modern]);
  r.storage.set('aiSkillAssessmentHistory',raw);r.run('loadLastReport()');r.node('history-0').events.click();
  assert.deepEqual(plain(r.run('state.latestReport')),old);assert.equal(r.storage.get('aiSkillAssessmentHistory'),raw);
});

test("Previous results opens the local history directly from the landing page", () => {
  const html = read("ai_skill_test.html");
  assert.match(html, /id="introBibliographyBtn"[^<]*<\/button>\s*<button[^>]+id="introHistoryBtn"[^>]+aria-expanded="false"[^>]+aria-controls="introHistory"/);
  assert.match(html, /<div id="introHistory" hidden>/);
  const r = runtime();
  const panel = r.node("introHistory");
  panel.hidden = true;
  const button = r.node("introHistoryBtn");
  const attributes = new Map();
  button.setAttribute = (name, value) => attributes.set(name, value);
  r.start();

  button.events.click();
  assert.equal(panel.hidden, false);
  assert.equal(attributes.get("aria-expanded"), "true");
  assert.match(panel.innerHTML, /Nessun report nello storico locale/);
  r.run("setLanguage('en')");
  assert.match(panel.innerHTML, /No report in local history/);
  button.events.click();
  assert.equal(panel.hidden, true);
  assert.equal(attributes.get("aria-expanded"), "false");

  const old = legacy();
  const raw = JSON.stringify([old, null]);
  r.storage.set("aiSkillAssessmentHistory", raw);
  button.events.click();
  assert.match(panel.innerHTML, /Local history/);
  assert.ok(panel.innerHTML.indexOf('data-history-index="1"') < panel.innerHTML.indexOf('data-history-index="0"'));
  r.node("intro-history-0").events.click();
  assert.deepEqual(plain(r.run("state.latestReport")), old);
  assert.equal(panel.hidden, true);
  assert.equal(r.storage.get("aiSkillAssessmentHistory"), raw);
});

test("maintainer fixtures remain immutable and expose the intended contrasting evidence", () => {
  const fixtures=JSON.parse(read('tests/fixtures/m17-reports.json')).reports;
  assert.equal(fixtures['knowledge-high-declared-low'].results.knowledgeByArea.F.value,100);
  assert.equal(fixtures['declared-high-questions-low'].results.knowledgeByArea.A.value,0);
  assert.equal(fixtures['agents-gap'].results.knowledgeByArea.A.value,0);
  const r=runtime();for(const [name,sample] of Object.entries(fixtures)){const original=JSON.stringify(sample);r.context.sample=sample;assert.equal(r.run('core.reportKind(sample)'),name==='legacy-2x'?'legacy':'evidence');r.run('renderDashboard(sample)');assert.equal(JSON.stringify(sample),original);}
});

test("Modern AI keeps the fixed ten-slot objective matrix in all six forms", () => {
  const r=runtime();
  const compositions=r.run(`(() => {const output=[];for(const language of ['it','en'])for(const form of FORM_IDS){state.language=language;const pool=language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form);const mode=getModeById('modern-ai');const qs=questionsForMode([...pool,{...pool.find(q=>q.sourceId==='MA01'),id:'EXTRA',sourceId:'EXTRA'}],mode,true,form);output.push(qs.map(q=>({id:q.sourceId,...core.ITEM_MAP[q.sourceId]})));}return output;})()`);
  const expected={U01:2,U02:2,U03:1,U04:1,U05:1,U06:1,U07:1,U08:1};
  for(const qs of compositions){
    assert.equal(new Set(qs.map(q=>q.id)).size,10);
    const counts={};for(const q of qs){counts[q.objectiveId]=(counts[q.objectiveId]||0)+1;assert.equal(q.evidenceType,'Q');assert.equal(q.taskLevel,'O');assert.equal(q.objectiveAlignment,'direct');}
    assert.deepEqual(Object.fromEntries(Object.entries(counts).sort()),expected);
  }
  assert.throws(()=>r.run(`questionsForMode(buildQuestionForm('A').filter(q=>q.sourceId!=='MA05'),getModeById('modern-ai'))`),/Incomplete Modern AI coverage/);
});

test("Modern AI bilingual form overrides preserve every choice, score and rationale", () => {
  const r=runtime();
  for(const form of ['A','B','C'])for(let slot=0;slot<10;slot++){
    r.context.form=form;r.context.slot=slot;
    for(const language of ['it','en']){
      r.context.language=language;
      const pair=r.run(`(() => {state.language=language;const expected=MODERN_AI.buildQuestion(slot,form,language);const actual=(language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form)).find(q=>q.sourceId===expected.id);return {expected,actual};})()`);
      for(const key of ['context','text','feedback','hint','options','sourceRefs'])assert.deepEqual(plain(pair.actual[key]),plain(pair.expected[key]),`${language}/${form}/${slot}/${key}`);
      assert.deepEqual(plain(pair.actual.options.map(o=>o.score).sort()),[1,1,3,5]);
      assert.ok(pair.actual.context.length>40);
      assert.ok(pair.actual.options.every(o=>o.rationale.length>20&&o.text===''));
    }
  }
  assert.equal(r.run(`MODERN_AI.SLOTS.every((s,i)=>new Set(FORM_IDS.map(f=>MODERN_AI.FORMS[f][i].context[0])).size===3)`),true);
});

test("Modern AI outcome bands reflect Q only, equal objective weights and missing answers", () => {
  const r=runtime();
  const outcomes=r.run(`(() => {const qs=questionsForMode(buildQuestionForm('A'),getModeById('modern-ai'));const m={...meta,testMode:{id:'modern-ai',questionCount:10}};const evaluate=score=>core.evaluate(qs,Object.fromEntries(qs.map(q=>[q.id,q.options.findIndex(o=>o.score===score)])),m,'now');const correct=Object.fromEntries(qs.map(q=>[q.id,choose(q)]));const wrongOne={...correct,[qs[0].id]:choose(qs[0],false)};const missing={...correct};delete missing[qs[9].id];return {high:evaluate(5),partial:evaluate(3),low:evaluate(1),wrongOne:core.evaluate(qs,wrongOne,m,'now'),missing:core.evaluate(qs,missing,m,'now')};})()`);
  for(const [key,value,band] of [['high',100,'strong'],['partial',50,'developing'],['low',0,'review']]){
    const report=outcomes[key];assert.equal(report.results.knowledgeByArea.U.value,value);assert.equal(report.results.knowledgeByArea.U.band,band);assert.equal(report.results.knowledgeByArea.U.status,'reached');
    assert.equal(report.coverage.byEvidence.Q.valid,10);
    for(const type of ['D','T','E'])assert.equal(report.coverage.byEvidence[type].proposed,0);
    for(const area of ['F','A','H'])assert.equal(report.results.knowledgeByArea[area].value,null);
    assert.equal(report.score,undefined);
  }
  assert.equal(outcomes.wrongOne.results.knowledgeByArea.U.value,93.75);
  assert.equal(outcomes.missing.results.knowledgeByArea.U.status,'partial');assert.equal(outcomes.missing.results.knowledgeByArea.U.band,null);
  assert.equal(outcomes.missing.coverage.byEvidence.Q.missing,1);
});

test("Modern AI starts, returns to previous answers and saves complete bilingual export records", () => {
  for(const language of ['it','en'])for(const form of ['A','B','C']){
    const r=runtime();r.context.language=language;r.context.form=form;
    r.run(`state.language=language;state.selectedModeId='modern-ai';writeFormCycle(language,'modern-ai',{remaining:[form],last:null});startAssessment()`);
    assert.equal(r.run('state.formId'),form);assert.equal(r.run('questions.length'),10);
    assert.equal(r.node('questionContext').hidden,false);assert.ok(r.node('questionContext').textContent.length>40);
    const rationale=r.run('questions[0].options[choose(questions[0])].rationale');assert.ok(!r.node('options').innerHTML.includes(rationale));
    r.run(`state.answers[questions[0].id]=choose(questions[0]);scheduleAutoAdvance(questions[0],0,state.answers[questions[0].id])`);
    assert.equal(r.timers.size,1);r.timers.values().next().value();assert.equal(r.run('state.index'),1);r.run('goPrev()');assert.equal(r.run('state.index'),0);assert.equal(r.run('state.answers[questions[0].id]===choose(questions[0])'),true);
    r.run(`state.answers=Object.fromEntries(questions.map(q=>[q.id,choose(q)]));finishAssessment()`);
    const report=plain(r.run('state.latestReport'));assert.equal(report.meta.assessmentVersion,'3.5.4');assert.equal(report.meta.scoringVersion,'3.1.0');assert.equal(report.meta.reportSchemaVersion,4);assert.equal(report.meta.questionBankVersion,'2026.11-m22');assert.equal(report.meta.formVersion,'1.8');assert.equal(report.meta.testMode.id,'modern-ai');
    assert.deepEqual(JSON.parse(r.storage.get('aiSkillAssessmentHistory'))[0],report);
    for(const item of report.answers){assert.ok(item.question.includes('\n'));assert.equal(item.selectedRationales.length,1);assert.ok(item.sourceRefs.length>0);assert.ok(r.node('dashboard').innerHTML.includes(item.selectedRationales[0].replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')));}
    r.run('downloadBlob=(content,name,type)=>{globalThis.download={content,name,type}};exportJson(state.latestReport)');assert.deepEqual(JSON.parse(r.context.download.content),report);
    const rows=plain(r.context.core.csvRows(report));assert.ok(rows.some(row=>row[1]==='answers.0.selectedRationales.0'));assert.ok(rows.some(row=>row[1]==='answers.0.sourceRefs.0'));assert.equal(rows.find(row=>row[1]==='meta.assessmentVersion')[2],'3.5.4');
    const original=r.storage.get('aiSkillAssessmentHistory');r.run('loadLastReport()');assert.equal(r.storage.get('aiSkillAssessmentHistory'),original);
  }
});

test("pre-existing paths keep their counts, evidence mix and independent form rotation", () => {
  const r=runtime();
  assert.equal(r.run(`TEST_MODES.filter(m=>m.type==='topic'&&m.id!=='modern-ai').every(mode=>FORM_IDS.every(form=>questionsForMode(buildQuestionForm(form),mode,true,form).every(q=>!q.sourceId.startsWith('MA'))))`),true);
  const report=r.run('full()');assert.equal(report.answers.length,50);assert.equal(report.coverage.byEvidence.Q.proposed,36);assert.equal(report.coverage.byEvidence.D.proposed,6);assert.equal(report.coverage.byEvidence.T.proposed,2);
  r.run(`writeFormCycle('it','complete',{remaining:['B'],last:'A'});writeFormCycle('it','modern-ai',{remaining:['C'],last:'B'});selectNextForm('modern-ai','it')`);
  assert.equal(r.run(`selectNextForm('complete','it')`),'B');
  r.run(`state.selectedModeId='complete';startAssessment()`);assert.equal(r.node('questionContext').hidden,false);assert.ok(r.node('questionContext').textContent.length>0);
});

test("modern bibliography is bilingual, primary-source based and contains explicit links only", () => {
  const r=runtime();
  const sources=plain(r.run('MODERN_AI.SOURCES'));assert.equal(sources.length,12);assert.equal(new Set(sources.map(s=>s.id)).size,12);
  for(const source of sources){const url=new URL(source.url);assert.equal(url.protocol,'https:');assert.ok(['developers.openai.com','developers.google.com','aistudio.google.com','aifluencyframework.org'].includes(url.hostname));}
  for (const [language, description] of [["it", /testo, immagini e audio/], ["en", /text, images, and audio/]]) {
    r.context.language = language;
    r.run("state.language=language;applyBibliographyText()");
    assert.equal((r.node("modernAiSourcesList").innerHTML.match(/<a /g) || []).length, 12);
    assert.match(r.node("modernAiSourcesNote").textContent, description);
  }
  assert.doesNotMatch(read('assets/modern-ai.js'),/\bfetch\s*\(|XMLHttpRequest|sendBeacon|<iframe|<img|<audio|<video/);
});

test("full-test and lab source links use the same presentation as the other bibliography links", () => {
  const r = runtime();
  for (const [language, label] of [["it", "Apri la fonte ↗"], ["en", "Open source ↗"]]) {
    r.context.language = language;
    r.run("state.language=language;applyBibliographyText()");
    assert.match(r.node("completeSourcesNote").textContent, language === "it" ? /matrice del test completo/ : /full test matrix/);
    assert.match(r.node("labSourcesNote").textContent, language === "it" ? /dal punto salvato/ : /from a checkpoint/);
    for (const [id, count] of [["completeSourcesList", 4], ["labSourcesList", 2]]) {
      const html = r.node(id).innerHTML;
      const links = [...html.matchAll(/<a class="bibliography-link" href="https:\/\/[^\"]+" target="_blank" rel="noopener noreferrer">([^<]+)<\/a>/g)];
      assert.equal(links.length, count);
      assert.ok(links.every(link => link[1] === label));
    }
  }
});

test("Agents always selects two direct Q per objective without legacy declarations or texts", () => {
  const r=runtime();
  const compositions=r.run(`(() => {const output=[];for(const language of ['it','en'])for(const form of FORM_IDS){state.language=language;const pool=language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form);const qs=questionsForMode([...pool,{...pool.find(q=>q.sourceId==='AW01'),sourceId:'EXTRA',id:'EXTRA'}],getModeById('agents'),true,form);output.push(qs.map(q=>({id:q.sourceId,...core.ITEM_MAP[q.sourceId]})));}return output;})()`);
  for(const qs of compositions){
    assert.equal(qs.length,10);assert.equal(new Set(qs.map(q=>q.id)).size,10);
    for(const id of ['A01','A02','A03','A04','A05'])assert.equal(qs.filter(q=>q.objectiveId===id).length,2);
    assert.ok(qs.every(q=>q.evidenceType==='Q'&&q.primaryArea==='A'&&q.objectiveAlignment==='direct'&&q.id.startsWith('AW')));
    assert.equal(qs.filter(q=>q.taskLevel==='O').length,2);assert.equal(qs.filter(q=>q.taskLevel==='S').length,8);
  }
  assert.throws(()=>r.run(`questionsForMode(buildQuestionForm('A').filter(q=>q.sourceId!=='AW07'),getModeById('agents'))`),/Incomplete AI Agents coverage/);
});

test("all Agents translations retain form-specific choice layouts and post-test rationales", () => {
  const r=runtime();
  for(const form of ['A','B','C'])for(const language of ['it','en'])for(let slot=0;slot<10;slot++){
    Object.assign(r.context,{form,language,slot});
    const pair=r.run(`(() => {state.language=language;const expected=AGENTIC_WORKFLOWS.buildQuestion(slot,form,language);const actual=(language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form)).find(q=>q.sourceId===expected.id);return {expected,actual};})()`);
    for(const key of ['context','text','hint','feedback','nextStep','options','sourceRefs'])assert.deepEqual(plain(pair.actual[key]),plain(pair.expected[key]),`${form}/${language}/${slot}/${key}`);
    assert.deepEqual(plain(pair.actual.options.map(o=>o.score).sort()),[1,1,3,5]);
    assert.ok(pair.actual.options.every(o=>o.text===''&&o.rationale.length>20));
  }
  assert.equal(r.run(`AGENTIC_WORKFLOWS.SLOTS.every((s,i)=>new Set(FORM_IDS.map(f=>AGENTIC_WORKFLOWS.FORMS[f][i].context[0])).size===3)`),true);
});

test("Agents reports distinguish reached coverage, partial credit, absent execution and missing evidence", () => {
  const r=runtime();
  for(const [score,value,band] of [[5,100,'strong'],[3,50,'developing'],[1,0,'review']]){
    r.context.score=score;
    const report=r.run(`(()=>{const qs=questionsForMode(buildQuestionForm('C'),getModeById('agents'));return core.evaluate(qs,Object.fromEntries(qs.map(q=>[q.id,q.options.findIndex(o=>o.score===score)])),{...meta,formId:'C',testMode:{id:'agents',questionCount:10}},'now')})()`);
    assert.equal(report.results.knowledgeByArea.A.value,value);assert.equal(report.results.knowledgeByArea.A.status,'reached');assert.equal(report.results.knowledgeByArea.A.band,band);
    for(const area of ['F','U','H'])assert.equal(report.results.knowledgeByArea[area].value,null);
    for(const type of ['D','T','E'])assert.equal(report.coverage.byEvidence[type].proposed,0);
    assert.equal(report.score,undefined);assert.equal(report.results.simulatedSummary.value,null);assert.equal(report.criticalFindings.length,0);
    assert.equal(report.results.nextSteps?.length||0,score===5?0:5);
  }
  const data=r.run(`(()=>{const qs=questionsForMode(buildQuestionForm('A'),getModeById('agents'));const m={...meta,testMode:{id:'agents',questionCount:10}};const answers=Object.fromEntries(qs.map(q=>[q.id,choose(q)]));const wrong={...answers,[qs[0].id]:choose(qs[0],false)};delete answers[qs[6].id];const date='2026-11-25T12:00:00Z';return {missing:core.evaluate(qs,answers,m,date),wrong:core.evaluate(qs,wrong,m,date)};})()`);
  assert.equal(data.wrong.results.knowledgeByArea.A.value,90);assert.equal(data.wrong.results.nextSteps.length,1);assert.equal(data.wrong.results.nextSteps[0].objectiveId,'A01');
  assert.equal(data.missing.results.knowledgeByArea.A.status,'partial');assert.equal(data.missing.results.knowledgeByArea.A.band,null);assert.equal(data.missing.results.nextSteps,undefined);
  r.context.sample=plain(data.wrong);
  r.run(`sample.results.nextSteps[0].text='<strong>Original note</strong>'`);
  r.run('renderDashboard(sample)');
  assert.match(r.node('dashboard').innerHTML,/&lt;strong&gt;Original note&lt;\/strong&gt;/);
  assert.doesNotMatch(r.node('dashboard').innerHTML,/<strong>Original note/);
  r.run(`sample.results.nextSteps.push(null)`);
  const original=JSON.stringify(r.context.sample, null, 2);
  r.run('renderDashboard(sample)');
  assert.match(r.node('dashboard').innerHTML,/Formato del report non supportato/);
  assert.equal(r.node('rawReport').textContent,original);
});

test("Agents completion, navigation, frozen recommendations, history and exports work in all six forms", () => {
  for(const language of ['it','en'])for(const form of ['A','B','C']){
    const r=runtime();Object.assign(r.context,{language,form});
    r.run(`state.language=language;state.selectedModeId='agents';writeFormCycle(language,'agents',{remaining:[form],last:null});startAssessment()`);
    assert.equal(r.run('questions.length'),10);assert.equal(r.node('questionContext').hidden,false);
    r.run(`state.answers[questions[0].id]=choose(questions[0],false);scheduleAutoAdvance(questions[0],0,state.answers[questions[0].id])`);
    assert.equal(r.timers.size,1);r.timers.values().next().value();assert.equal(r.run('state.index'),1);r.run('goPrev()');assert.equal(r.run('state.index'),0);assert.equal(r.run('state.answers[questions[0].id]===choose(questions[0],false)'),true);
    r.run(`state.answers=Object.fromEntries(questions.map(q=>[q.id,q.options.findIndex(o=>o.score===3)]));finishAssessment()`);
    const report=plain(r.run('state.latestReport'));assert.equal(report.meta.assessmentVersion,'3.5.4');assert.equal(report.meta.questionBankVersion,'2026.11-m22');assert.equal(report.meta.formVersion,'1.8');assert.equal(report.meta.scoringVersion,'3.1.0');assert.equal(report.meta.reportSchemaVersion,4);assert.equal(report.meta.testMode.id,'agents');assert.equal(report.meta.formId,form);assert.equal(report.meta.language,language);
    assert.equal(report.results.nextSteps.length,5);assert.ok(report.answers.every(q=>q.selectedRationales.length===1&&q.question.includes('\n')&&typeof q.nextStep==='string'));
    assert.match(r.node('dashboard').innerHTML,language==='it'?/Per approfondire le scelte/:/Develop your decisions/);
    r.run('downloadBlob=(content,name,type)=>{globalThis.download={content,name,type}};exportJson(state.latestReport)');assert.deepEqual(JSON.parse(r.context.download.content),report);
    const rows=plain(r.context.core.csvRows(report));for(const field of ['answers.0.nextStep','answers.0.selectedRationales.0','answers.0.sourceRefs.0','results.nextSteps.0.text'])assert.ok(rows.some(row=>row[1]===field));
    const raw=r.storage.get('aiSkillAssessmentHistory');r.run(`AGENTIC_WORKFLOWS.NEXT_STEPS.A01[0]='CHANGED LIVE BANK';loadLastReport()`);assert.equal(r.storage.get('aiSkillAssessmentHistory'),raw);assert.deepEqual(plain(r.run('state.latestReport')),report);assert.doesNotMatch(r.node('dashboard').innerHTML,/CHANGED LIVE BANK/);
  }
});

test("Agents sources load as explicit bilingual links and the full test uses the explicit Agents slots", () => {
  const r=runtime();const sources=plain(r.run('AGENTIC_WORKFLOWS.SOURCES'));assert.equal(sources.length,8);assert.equal(new Set(sources.map(s=>s.id)).size,8);
  for(const source of sources){const url=new URL(source.url);assert.equal(url.protocol,'https:');assert.ok(['www.anthropic.com','developers.openai.com','modelcontextprotocol.io'].includes(url.hostname));}
  for (const [language, description] of [["it", /tracce di esecuzione/], ["en", /execution traces/]]) {
    r.context.language = language;
    r.run("state.language=language;applyBibliographyText()");
    assert.equal((r.node("agenticSourcesList").innerHTML.match(/<a /g) || []).length, 8);
    assert.match(r.node("agenticSourcesNote").textContent, description);
  }
  const report=r.run('full()');assert.deepEqual(plain(report.answers.filter(q=>q.section==='AI Agents').map(q=>q.sourceId)),['C29','C30','C31','C32','C33','C34','C35','C36','C37','C38']);assert.equal(report.results.nextSteps,undefined);
  assert.equal(r.run(`bank.filter(q=>/^AG[0-9]+$/.test(q.id)).length`),15);
  assert.doesNotMatch(read('assets/agentic-workflows.js'),/\bfetch\s*\(|XMLHttpRequest|sendBeacon|<iframe|<img|<audio|<video/);
});

test("Harness keeps its fixed six-objective matrix and excludes legacy Harness-tagged items", () => {
  const r=runtime();
  const sets=r.run(`(()=>{const sets=[];for(const language of ['it','en'])for(const form of FORM_IDS){state.language=language;const pool=language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form);sets.push(questionsForMode([...pool,{...pool.find(q=>q.sourceId==='HR01'),id:'EXTRA',sourceId:'EXTRA'}],getModeById('harness'),true,form).map(q=>({id:q.sourceId,...core.ITEM_MAP[q.sourceId]})));}return sets;})()`);
  for(const qs of sets){assert.equal(qs.length,10);assert.equal(new Set(qs.map(q=>q.id)).size,10);for(const [id,count] of Object.entries({H01:1,H02:2,H03:2,H04:2,H05:2,H06:1}))assert.equal(qs.filter(q=>q.objectiveId===id).length,count);assert.ok(qs.every(q=>q.id.startsWith('HR')&&q.evidenceType==='Q'&&q.primaryArea==='H'&&q.objectiveAlignment==='direct'&&q.taskLevel==='S'));}
  assert.throws(()=>r.run(`questionsForMode(buildQuestionForm('A').filter(q=>q.sourceId!=='HR08'),getModeById('harness'))`),/Incomplete Harness coverage/);
});

test("Harness bilingual variants preserve scores, context, rationales and recommendations in all forms", () => {
  const r=runtime();
  for(const form of ['A','B','C'])for(const language of ['it','en'])for(let slot=0;slot<10;slot++){
    Object.assign(r.context,{form,language,slot});
    const pair=r.run(`(()=>{state.language=language;const expected=HARNESS_ASSESSMENT.buildQuestion(slot,form,language);const actual=(language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form)).find(q=>q.sourceId===expected.id);return {expected,actual};})()`);
    for(const key of ['context','text','hint','feedback','nextStep','options','sourceRefs'])assert.deepEqual(plain(pair.actual[key]),plain(pair.expected[key]),`${form}/${language}/${slot}/${key}`);
    assert.deepEqual(plain(pair.actual.options.map(o=>o.score).sort()),[1,1,3,5]);assert.ok(pair.actual.options.every(o=>o.text===''&&o.rationale.length>20));
  }
  assert.equal(r.run(`HARNESS_ASSESSMENT.SLOTS.every((s,i)=>new Set(FORM_IDS.map(f=>HARNESS_ASSESSMENT.FORMS[f][i].context[0])).size===3)`),true);
});

test("Harness scores distinguish objective weighting, absent execution and incomplete coverage", () => {
  const r=runtime();
  for(const [score,value,band] of [[5,100,'strong'],[3,50,'developing'],[1,0,'review']]){
    r.context.score=score;
    const report=r.run(`(()=>{const qs=questionsForMode(buildQuestionForm('B'),getModeById('harness'));return core.evaluate(qs,Object.fromEntries(qs.map(q=>[q.id,q.options.findIndex(o=>o.score===score)])),{...meta,formId:'B',testMode:{id:'harness',questionCount:10}},'now');})()`);
    assert.equal(report.results.knowledgeByArea.H.value,value);assert.equal(report.results.knowledgeByArea.H.status,'reached');assert.equal(report.results.knowledgeByArea.H.band,band);
    for(const area of ['F','U','A'])assert.equal(report.results.knowledgeByArea[area].value,null);
    for(const type of ['D','T','E'])assert.equal(report.coverage.byEvidence[type].proposed,0);
    assert.equal(report.score,undefined);assert.equal(report.results.simulatedSummary.value,null);assert.equal(report.criticalFindings.length,0);assert.equal(report.results.nextSteps?.length||0,score===5?0:6);
  }
  const result=r.run(`(()=>{const qs=questionsForMode(buildQuestionForm('A'),getModeById('harness'));const m={...meta,testMode:{id:'harness',questionCount:10}};const answers=Object.fromEntries(qs.map(q=>[q.id,choose(q)]));const wrong=id=>core.evaluate(qs,{...answers,['A_'+id]:choose(qs.find(q=>q.sourceId===id),false)},m,'now');const missing={...answers};delete missing['A_HR09'];return {single:wrong('HR01'),pair:wrong('HR02'),missing:core.evaluate(qs,missing,m,'now')};})()`);
  assert.ok(Math.abs(result.single.results.knowledgeByArea.H.value-100*5/6)<1e-10);assert.ok(Math.abs(result.pair.results.knowledgeByArea.H.value-100*5.5/6)<1e-10);
  assert.equal(result.missing.results.knowledgeByArea.H.status,'partial');assert.equal(result.missing.results.knowledgeByArea.H.band,null);assert.equal(result.missing.coverage.byEvidence.Q.missing,1);
});

test("Harness starts, navigates and persists frozen bilingual report/export content across all six forms", () => {
  for(const language of ['it','en'])for(const form of ['A','B','C']){
    const r=runtime();Object.assign(r.context,{language,form});r.run(`state.language=language;state.selectedModeId='harness';writeFormCycle(language,'harness',{remaining:[form],last:null});startAssessment()`);
    assert.equal(r.run('questions.length'),10);assert.equal(r.node('questionContext').hidden,false);assert.match(r.node('sideTitle').textContent,/Harness/);
    const first=r.run('questions[0].options[choose(questions[0])].rationale');assert.ok(!r.node('options').innerHTML.includes(first));
    r.run(`state.answers[questions[0].id]=choose(questions[0]);scheduleAutoAdvance(questions[0],0,state.answers[questions[0].id])`);assert.equal(r.timers.size,1);r.timers.values().next().value();assert.equal(r.run('state.index'),1);r.run('goPrev()');assert.equal(r.run('state.index'),0);assert.equal(r.run('state.answers[questions[0].id]===choose(questions[0])'),true);
    r.run(`state.answers=Object.fromEntries(questions.map(q=>[q.id,q.options.findIndex(o=>o.score===3)]));finishAssessment()`);
    const report=plain(r.run('state.latestReport'));assert.equal(report.meta.assessmentVersion,'3.5.4');assert.equal(report.meta.questionBankVersion,'2026.11-m22');assert.equal(report.meta.formVersion,'1.8');assert.equal(report.meta.scoringVersion,'3.1.0');assert.equal(report.meta.reportSchemaVersion,4);assert.equal(report.meta.testMode.id,'harness');assert.equal(report.meta.formId,form);assert.equal(report.meta.language,language);assert.equal(report.results.nextSteps.length,6);
    assert.ok(report.answers.every(q=>q.question.includes('\n')&&q.selectedRationales.length===1&&typeof q.nextStep==='string'));
    r.run('downloadBlob=(content,name,type)=>{globalThis.download={content,name,type}};exportJson(state.latestReport)');assert.deepEqual(JSON.parse(r.context.download.content),report);
    const rows=plain(r.context.core.csvRows(report));for(const field of ['answers.0.nextStep','answers.0.selectedRationales.0','answers.0.sourceRefs.0','results.nextSteps.0.text'])assert.ok(rows.some(row=>row[1]===field));
    const raw=r.storage.get('aiSkillAssessmentHistory');r.run(`HARNESS_ASSESSMENT.NEXT_STEPS.H01[0]='CHANGED BANK';loadLastReport()`);assert.equal(r.storage.get('aiSkillAssessmentHistory'),raw);assert.deepEqual(plain(r.run('state.latestReport')),report);assert.doesNotMatch(r.node('dashboard').innerHTML,/CHANGED BANK/);
  }
});

test("Harness discovery, local rotation and bibliography preserve the prior paths", () => {
  const r=runtime();r.run('renderModeSelector()');assert.equal(r.run('TEST_MODES.length'),14);assert.match(r.node('testModeSelector').innerHTML,/id="mode_harness"/);
  assert.equal(r.run(`TEST_MODES.filter(m=>m.id!=='harness'&&!['learning','simulation'].includes(m.type)).every(m=>questionsForMode(buildQuestionForm('A'),m).every(q=>!q.sourceId.startsWith('HR')))`),true);
  r.run(`writeFormCycle('it','agents',{remaining:['B'],last:'A'});writeFormCycle('it','harness',{remaining:['C'],last:'B'});selectNextForm('harness','it')`);assert.equal(r.run(`selectNextForm('agents','it')`),'B');
  const sources=plain(r.run('HARNESS_ASSESSMENT.SOURCES'));assert.equal(sources.length,9);assert.equal(new Set(sources.map(s=>s.id)).size,9);
  for(const source of sources){const url=new URL(source.url);assert.equal(url.protocol,'https:');assert.ok(['www.anthropic.com','developers.openai.com','modelcontextprotocol.io','agentskills.io','agents.md'].includes(url.hostname));}
  for (const [language, description] of [["it", /gestisce il contesto/], ["en", /manages context/]]) {
    r.context.language = language;
    r.run("state.language=language;applyBibliographyText()");
    assert.equal((r.node("harnessSourcesList").innerHTML.match(/<a /g) || []).length, 9);
    assert.match(r.node("harnessSourcesNote").textContent, description);
  }
  assert.doesNotMatch(read('assets/harness.js'),/\bfetch\s*\(|XMLHttpRequest|sendBeacon|<iframe|<img|<audio|<video/);
});
