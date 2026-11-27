// Optional maintainer documentation; never loaded by the static application.
import fs from "node:fs";
import { runtime } from "../tests/helpers/runtime.mjs";
const r=runtime();
const data=plain(r.run("({slots:COMPLETE_ASSESSMENT.SLOTS,sources:COMPLETE_ASSESSMENT.SOURCES.concat(MODERN_AI.SOURCES,AGENTIC_WORKFLOWS.SOURCES,HARNESS_ASSESSMENT.SOURCES,LOCAL_LAB.SOURCES)})"));
function plain(v) { return JSON.parse(JSON.stringify(v)); }
const cell=v=>String(v??"—").replaceAll("|","\\|").replaceAll("\n","<br>");
const lines=[
  "# Revisione del test completo — M22", "",
  "Stato: M22 approvata dal maintainer il `2026-11-26`, release `v3.5.0`, con autorizzazione a commit, merge, tag, push e rimozione del branch `feature/balanced-complete-assessment`. Banca `2026.11-m22`, forma `1.8`; scoring `3.1.0`, schema `4`, blueprint `1.0.0`, laboratorio/casi `1.0.0` invariati.", "",
  "Generato con `node scripts/build-complete-review.mjs` dai contenuti effettivamente selezionati dall'app. Le righe C01–C50 sono slot editoriali espliciti: 44 ID Q/D/T dedicati al completo e sei ID LAB riusati con slotId. I 31 riusi Q/D/T conservano originSourceId, lingua e forma; 11 Fondamenti e due dichiarazioni A/H sono nuovi. All’uscita della M22 la banca tematica contava 145 ID e il runtime classificava 195 ID, escluso Primi passi. La [mappa degli item](ASSESSMENT_ITEM_MAP.md) riporta i conteggi attivi. La patch 3.5.8 aggiorna il testo di C22 nella forma B inglese per allinearlo al comportamento descritto nella forma B italiana.", "",
  "## Distribuzione e ordine", "",
  "| Area | Q | D | T | E | Totale |", "| --- | ---: | ---: | ---: | ---: | ---: |",
  "| F — Fondamenti | 11 | 1 | 0 | 0 | 12 |", "| U — Uso operativo e multimodale | 8 | 3 | 2 | 3 | 16 |",
  "| A — Agenti | 9 | 1 | 0 | 2 | 12 |", "| H — Harness | 8 | 1 | 0 | 1 | 10 |", "| Totale | 36 | 6 | 2 | 6 | 50 |", "",
  "Sei Q di comprensione e trenta scenari verificano direttamente tutti i 25 obiettivi. Ogni obiettivo pesa uguale nella propria area. D e T non producono credito; E non entra nei Q e non compensa lacune. I due casi sono due contesti, non sei esecuzioni indipendenti. Nessun indice globale, certificazione o equivalenza psicometrica delle forme.", "",
  "L'ordine visivo segue F/U/A/H, rimescolando i soli Q entro ciascun blocco; seguono K1 e K2. C39/C40/C50 restano insieme. Verifica e calcolo di K1 possono scambiarsi senza eliminare gli altri 44 item; la consegna resta successiva. Le alternative Q sono rimescolate in UI. I due Q di comprensione Harness riusano i quesiti di identificazione di HR01/HR04, mantenendo contesto, crediti e motivazioni.", "",
  "Durata proposta: **40–55 minuti, stima da verificare**. L’approvazione del maintainer non riporta tempi umani misurati; la promessa resta qualificata in UI e la checklist richiede di cronometrare forme IT/EN. Le tre varianti dei Fondamenti conservano regole e alternative, cambiando esempi e dati; non sono prove indipendenti di difficoltà equivalente.", "",
  "## Matrice tracciabile", "",
  "| Slot | Area | Evidenza | Obiettivo | Livello | Tipo | Origine esplicita |", "| --- | --- | --- | --- | --- | --- | --- |",
  ...data.slots.map(s=>`| ${s.id} | ${s.primaryArea} | ${s.evidenceType} | ${s.objectiveId} | ${s.taskLevel} | ${s.questionKind} | ${s.originSourceId||"nuovo M22"} |`), "",
  "## Recupero e privacy", "",
  "Completo e Laboratorio operativo condividono una sola bozza in aiSkillOperationalLabDraft. Avviarne uno nuovo chiede conferma prima di sostituire la bozza esistente. Il completo usa draftSchemaVersion 2: versioni, lingua, forma, indice, ordine, questionIds e risposte, inclusi testi parziali e sole azioni simulate confermate. Non salva nome, ruolo, team, stime iniziali, tempi o cronologia dei tentativi. La ripresa conserva le stesse domande senza consumare una forma; i dati del profilo sono vuoti.", "",
  "Il laboratorio autonomo conserva il draft schema 1. Le bozze con versioni diverse, corrotte o con ID/risposte non ammessi non vengono ricalcolate. Completamento, interruzione confermata, Elimina bozza e Cancella dati locali rimuovono la bozza; i fallimenti di storage/rimozione sono visibili. Il report finale conserva le risposte necessarie alla spiegazione, senza migrare i report precedenti. Nessun account, API AI, telemetria o invio automatico; letture esterne solo su click.", "",
  "## Report campione calcolati", "",
  "Gli esempi seguenti usano dati sintetici e regole reali della M22, senza dati di rispondenti. Sono campioni di contenuto; layout, download e interazioni in browser richiedono la checklist QA.", "",
  "| Caso | Q F / U / A / H | E | Fascia E | Criticità | Contrasti D/Q |", "| --- | --- | --- | --- | --- | --- |"
];
for(const [name,recipe] of [
  ["Tutto corretto","answers"],
  ["Quiz corretti, esecuzione debole","Object.fromEntries(qs.map(q=>[q.id,choose(q,q.type!=='simulation')]))"],
  ["Dichiarazioni alte, quiz errati","Object.fromEntries(qs.map(q=>[q.id,choose(q,q.type==='likert')]))"],
  ["Lacuna agentica","Object.fromEntries(qs.map(q=>[q.id,choose(q,core.classify(q).primaryArea!=='A'||core.classify(q).evidenceType!=='Q')]))"],
  ["Una divulgazione critica","({...answers,A_LAB_K2_SOURCE:'export'})"],
  ["Un caso incompleto","Object.fromEntries(Object.entries(answers).filter(([id])=>id!=='A_LAB_K2_RESUME'))"]
]) {
  const result=r.run(`(() => {state.language='it';const qs=questionsForMode(buildQuestionForm('A'),getModeById('complete'));const answers=Object.fromEntries(qs.map(q=>[q.id,choose(q)]));return core.evaluate(qs,${recipe},meta,'2026-11-26');})()`);
  const s=result.results.simulatedSummary;
  lines.push(`| ${name} | ${["F","U","A","H"].map(a=>result.results.knowledgeByArea[a].value??"null").join(" / ")} | ${s.value===null?"null":s.value.toFixed(2)} | ${s.band??"—"} | ${result.criticalFindings.map(f=>f.code).join(", ")||"—"} | ${result.results.declaredContrasts.join(", ")||"—"} |`);
}
lines.push("", "## Indicatori editoriali", "", "Conteggio dei Q in cui la risposta piena è almeno lunga quanto ogni alternativa (caratteri, titoli soltanto). Non è un indice di qualità psicometrica.", "", "| Lingua | Forma | Q pieni fra i più lunghi / 36 |", "| --- | --- | ---: |");
for(const language of ["it","en"])for(const form of ["A","B","C"]) {
  r.context.language=language;r.context.form=form;
  const units=plain(r.run(`(() => {state.language=language;return COMPLETE_ASSESSMENT.build(form,language,language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form));})()`));
  const qs=units.filter(q=>data.slots.find(s=>s.id===q.slotId).evidenceType==="Q");
  const longest=qs.filter(q=>q.options.find(o=>o.score===5).title.length>=Math.max(...q.options.map(o=>o.title.length))).length;
  lines.push(`| ${language.toUpperCase()} | ${form} | ${longest} |`);
}
lines.push("", "## Fonti ricontrollate il 2026-11-26", "",
  "Le fonti sostengono principi e distinzioni tecniche; pesi, crediti, limiti e contesti sono scelte editoriali locali. Gli articoli Anthropic sono riferimenti storici 2024/2025. MCP rimanda alla documentazione 2026-07-28. Le pagine OpenAI descrivono prodotti in evoluzione, incluso Agent Builder legacy: il test non ne richiede uso o configurazione. La guida Google video distingue generazione corrente da Veo cessato; i quesiti restano senza nomi di prodotto. La pagina Microsoft RAG include l'offerta Foundry IQ, ma qui sostiene solo il principio di recupero nel contesto.", "",
  ...data.sources.map(s=>`- **${s.id}** — [${s.title}](${s.url}): ${s.note[0]}`), "",
  "## Varianti erogate e feedback", "",
  "La sequenza sotto è quella logica C01–C50, indipendente dall'ordine UI. I crediti Q sono 1 / 0,5 / 0; la tabella espone le soluzioni per la revisione, mai durante la prova. Per E valgono le [rubriche e gli effetti M21](OPERATIONAL_LAB_REVIEW.md), invariati. D descrive pratiche, senza voto di merito; T conserva la checklist senza valutazione semantica automatica.");
for(const form of ["A","B","C"])for(const language of ["it","en"]) {
  r.context.language=language;r.context.form=form;
  const units=plain(r.run(`(() => {state.language=language;return COMPLETE_ASSESSMENT.build(form,language,language==='en'?buildEnglishQuestionForm(form):buildQuestionForm(form));})()`));
  lines.push("",`## ${language.toUpperCase()} — Forma ${form}`,"");
  for(const q of units) {
    const slot=data.slots.find(s=>s.id===q.slotId);
    lines.push(`### ${q.slotId} — ${slot.objectiveId} / ${slot.evidenceType} / ${slot.taskLevel}`,"",q.context||"", "",`**${q.text}**`,"");
    if(slot.evidenceType==="Q") lines.push("| Credito | Alternativa | Motivazione |","| --- | --- | --- |",...q.options.map(o=>`| ${(o.score-1)/4} | ${cell(o.title)} | ${cell(o.rationale)} |`),"",`Feedback: ${q.feedback||"—"}`,"",`Approfondimento: ${q.nextStep||"—"}`);
    else if(slot.evidenceType==="D") lines.push(...q.options.map(o=>`- ${o.value}: ${o.title} — ${o.text}`));
    else if(slot.evidenceType==="T") lines.push("Checklist formativa:","",...q.rubric.criteria.map(c=>`- ${c.label}`),"",`Feedback: ${q.feedback}`);
    else lines.push(`Decisione canonica: ${q.sourceId}. Conferma azione e Avanti obbligatori; credito massimo 2, massimo 6 per caso. Totale corretto K1 per forma ${form}: ${r.run("LOCAL_LAB.variant(form,language).total")}. Scelte e motivazioni: [revisione del laboratorio](OPERATIONAL_LAB_REVIEW.md).`);
    if(q.sourceRefs?.length) lines.push("",`Fonti: ${q.sourceRefs.join(", ")}.`);
    lines.push("");
  }
}
fs.writeFileSync(new URL("../docs/M22_REVIEW.md",import.meta.url),lines.join("\n").trim()+"\n");
// Add an explicit separate inventory without changing the legacy base-bank rows.
const mapUrl=new URL("../docs/ASSESSMENT_ITEM_MAP.md",import.meta.url);
const marker="## Slot del completo nella milestone 22";
const map=fs.readFileSync(mapUrl,"utf8").split(marker)[0].trimEnd();
const rows=data.slots.filter(s=>s.evidenceType!=="E").map(s=>`| ${s.id} | ${s.questionKind} | ${s.evidenceType} | ${s.primaryArea} | ${s.objectiveId} | ${s.taskLevel} | ${s.originSourceId||"nuovo M22"} |`);
fs.writeFileSync(mapUrl,map+"\n\n"+marker+"\n\nRelease v3.5.0, approvata dal maintainer il 2026-11-26. I 44 ID seguenti sono separati da baseQuestions: 36 Q, 6 D e 2 T. Le sei E usano gli ID LAB con slotId C26/C27/C28/C39/C40/C50, senza duplicare il conteggio. All’uscita della M22 il runtime classificava 195 ID (145 tematici, 44 del completo e 6 E). Allineamento direct per tutti i nuovi slot; nessun credito dai tag. C41 e C43 sono Q di comprensione che riusano i compiti di identificazione di HR01/HR04. [Varianti e motivazioni bilingui](M22_REVIEW.md).\n\n| ID | Tipo di prova | Evidenza | Area | Obiettivo | Livello | Origine esplicita |\n| --- | --- | --- | --- | --- | --- | --- |\n"+rows.join("\n")+"\n");
console.log("Updated docs/M22_REVIEW.md (300 bilingual units and six report samples), and the 44-slot item map.");
