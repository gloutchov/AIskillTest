// Optional review documentation; no runtime build or external dependency.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = vm.createContext({});
for (const name of ["questions", "i18n", "agentic-workflows", "operational-lab", "complete-assessment", "assessment"]) {
  vm.runInContext(fs.readFileSync(path.join(root, `assets/${name}.js`), "utf8"), context);
}
const { agents, objectives } = vm.runInContext("({agents: AGENTIC_WORKFLOWS, objectives: ASSESSMENT_V3.OBJECTIVES})", context);
const cell = value => String(value).replaceAll("|", "\\|").replaceAll("\n", "<br>");
const lines = [
  "# Revisione editoriale — AI Agents (milestone 19)", "",
  "Stato: approvata dal maintainer il `2026-11-25`, release `v3.2.0`. App `3.2.0`, banca `2026.11-m19`, forme `1.5`; scoring `3.0.0`, schema `3`, blueprint `1.0.0` invariati.", "",
  `Fonti ricontrollate il **${agents.REVIEW_DATE}**. Documento generato con \`node scripts/build-agentic-review.mjs\` dagli scenari locali; il comando è facoltativo e non serve per eseguire l'app.`, "",
  "## Matrice, criteri e limiti", "",
  "Ogni forma propone sempre AW01–AW10: due Q diretti per ciascuno degli obiettivi A01–A05, con due compiti O e otto S. Domande e alternative sono rimescolate, mentre la copertura è vincolata. I livelli descrivono la complessità del compito e non la qualifica della persona. Le 30 varianti sono originali e bilingui; stessa matrice e carico progettato non dimostrano equivalenza psicometrica.", "",
  "La M19 ha sostituito il campionamento da AG1–AG15 con la matrice AW01–AW10. AG1–AG4 sono rimasti nel completo fino alla M22. Gli altri percorsi e Primi passi hanno conservato i contenuti. Dalla M28 i quindici quesiti originali si consultano nell’[archivio](archive/agents-original.json).", "",
  "Tutti i tool, domini, credenziali, trace ID e dati sono ipotetici. Le tracce sono testo da interpretare; non sono eseguite né usate per collegare servizi. Un ordine riportato in un documento resta contenuto del caso. Una risposta Q valuta il giudizio descritto, senza raccogliere evidenza E di esecuzione pratica.", "",
  "Ogni caso ha un'alternativa da credito 1 (score 5), una da 0,5 (score 3) e due da 0 (score 1). La scelta parziale riconosce un aspetto pertinente ma non soddisfa il compito; non autorizza una violazione. Le opzioni non premiano sempre più conferme, più cautele, più agenti o lo stop immediato: valgono mandato, prove e requisiti forniti. I crediti e le fasce sono editoriali, non validati.", "",
  "Con dieci risposte valide il percorso può raggiungere la copertura prevista di A; F/U/H restano non esplorate. Cinque obiettivi hanno peso uguale: una scelta errata e nove corrette producono A=90; tutte le scelte parziali producono A=50. Una risposta mancante impedisce fascia e copertura raggiunta. Non si produce un indice globale, un profilo operativo o un flag critico di simulazione.", "",
  "Motivazione della scelta e fonti compaiono dopo il test. Per gli obiettivi con almeno una scelta valida non piena, il report conserva un suggerimento locale di approfondimento, deduplicato per obiettivo. I suggerimenti sono attività da provare, non prove già svolte. Testi, motivazioni e suggerimenti sono registrati nel report ed esportabili senza ricalcolo all'apertura dello storico.", "",
  "Criterio di validazione: revisione di tutte le tracce, alternative, crediti e traduzioni; completamento di casi corretti, parziali ed errati in IT/EN, con controllo di chiarezza dei contratti, utilità operativa, auto-advance/Indietro, copertura, suggerimenti, storico, export e bibliografia. Il maintainer ha approvato la milestone il `2026-11-25` e autorizzato commit e release; gli esiti dettagliati della checklist manuale non sono stati riportati nella conversazione. Checklist tecnica e limiti della verifica dell'agente senza browser reale in [SCORING.md](SCORING.md).", "",
  "| Slot | Obiettivo | Livello | Fonti |", "| --- | --- | --- | --- |",
  ...agents.SLOTS.map(slot => `| ${slot.id} | ${slot.objectiveId} — ${cell(objectives[slot.objectiveId][0])} | ${slot.taskLevel} | ${slot.sourceRefs.join(", ")} |`), "",
  "## Fonti primarie e revisione", "",
  "Le fonti sostengono i principi, senza dettare crediti o prestazioni dei casi sintetici. Ogni scenario fornisce il proprio mandato; nessuna domanda richiede nomi di modelli, API, prezzi o norme a memoria. I link sono facoltativi e aperti solo su click.", "",
  ...agents.SOURCES.map(source => `- **${source.id}** — [${source.title}](${source.url}): ${source.note[0]} / ${source.note[1]}`), "",
  "M19-S01 è un articolo storico del 2024 che segnala l'evoluzione degli strumenti: qui si usano le distinzioni fra workflow e agenti. M19-S02 è un caso di ricerca del 2025: i suoi risultati non sono trasferiti al test come garanzie o percentuali di prestazione. M19-S05 appartiene alla documentazione legacy di Agent Builder, che alla consultazione segnala una dismissione prevista per il 30 novembre 2026: usato solo per prompt injection e divulgazione, con controlli correnti integrati da M19-S04/S07. M19-S06 rimanda alla documentazione MCP `2026-07-28`; non si valutano dettagli del protocollo. I riferimenti possono evolvere e vanno ricontrollati nelle revisioni future.", ""
];
for (const form of ["A", "B", "C"]) {
  lines.push(`## Forma ${form}`, "");
  agents.SLOTS.forEach((slot, index) => {
    const data = agents.FORMS[form][index];
    lines.push(`### ${form}-${slot.id} — ${slot.objectiveId} / ${slot.taskLevel}`, "", `Fonti: ${slot.sourceRefs.join(", ")}.`, "");
    for (const [label, lang] of [["Italiano", 0], ["English", 1]]) {
      lines.push(`**${label}**`, "", data.context[lang], "", `**${data.prompt[lang]}**`, "",
        "| Credito | Alternativa | Motivazione dopo il test |", "| --- | --- | --- |",
        ...data.options.map(option => `| ${lang ? String((option.score - 1) / 4) : String((option.score - 1) / 4).replace(".", ",")} | ${cell(option.label[lang])} | ${cell(option.rationale[lang])} |`),
        "", `Feedback: ${data.feedback[lang]}`, "", `Suggerimento / Next step: ${agents.NEXT_STEPS[slot.objectiveId][lang]}`, "");
    }
  });
}
fs.writeFileSync(path.join(root, "docs/AGENTIC_WORKFLOWS_REVIEW.md"), `${lines.join("\n").trimEnd()}\n`, "utf8");
console.log("Updated docs/AGENTIC_WORKFLOWS_REVIEW.md (30 bilingual traces).");
