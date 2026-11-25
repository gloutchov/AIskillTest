// Optional documentation generator; the static app has no build requirement.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = vm.createContext({});
for (const name of ["questions", "i18n", "harness", "assessment"]) {
  vm.runInContext(fs.readFileSync(path.join(root, `assets/${name}.js`), "utf8"), context);
}
const { harness, objectives } = vm.runInContext("({harness: HARNESS_ASSESSMENT, objectives: ASSESSMENT_V3.OBJECTIVES})", context);
const cell = value => String(value).replaceAll("|", "\\|").replaceAll("\n", "<br>");
const lines = [
  "# Revisione editoriale — Harness (milestone 20)", "",
  "Stato: approvata dal maintainer il `2026-11-25`, release `v3.3.0`. App `3.3.0`, banca `2026.11-m20`, forme `1.6`; scoring `3.0.0`, schema `3`, blueprint `1.0.0` invariati.", "",
  `Fonti ricontrollate il **${harness.REVIEW_DATE}**. Documento generato con \`node scripts/build-harness-review.mjs\` dai dati locali. È facoltativo e non serve per eseguire l'app.`, "",
  "## Matrice, criteri e limiti", "",
  "Ogni forma A/B/C in IT/EN propone HR01–HR10: H01, H02×2, H03×2, H04×2, H05×2, H06. Tutti sono Q diretti di livello S, che descrive la complessità del compito e non una qualifica personale. La selezione è vincolata; ordine delle domande e alternative varia. Le 30 varianti sono originali e progettate sulla stessa matrice, senza equivalenza psicometrica dimostrata.", "",
  "Il percorso esplora il sistema di esecuzione dell'agente: modello, prompt, ciclo agentico, harness e valutatore; fonti, contesto, compattazione, memoria e consegne; API, MCP, skill e AGENTS.md; contratti e permessi effettivi; checkpoint e ripresa; artefatti, tracce, metriche e regressioni. I termini sono definiti nel contesto o nel feedback e non richiedono memoria di prodotti o API.", "",
  "Le tracce sono dati sintetici da interpretare. Non sono installazioni, connessioni, credenziali raccolte o strumenti eseguiti. I nomi di operazioni, gli ID, i tempi e i contratti valgono solo nel caso. Si valuta comprensione e giudizio, non capacità osservata di costruire o amministrare un harness; nessun E o flag critico di simulazione viene introdotto.", "",
  "Per ciascun caso: score editoriale 5 → credito 1; 3 → 0,5; 1 → 0. Un'alternativa è piena, una parziale, due errate. La scelta parziale soddisfa solo parte della richiesta; non autorizza azioni incompatibili. Le risposte corrette non richiedono sempre più controlli, più testo o uno stop: nei casi con mandato e prove sufficienti si procede entro il perimetro.", "",
  "Con dieci risposte valide il percorso può raggiungere la copertura prevista di H; F/U/A restano non esplorate. I sei obiettivi pesano uguale: nove risposte corrette e una errata in H01 producono 83,33; un solo errore in uno dei due H02 produce 91,67. Tutte le risposte parziali producono 50. Una risposta mancante impedisce fascia e copertura raggiunta. I valori sono editoriali, non soglie psicometriche.", "",
  "Motivazioni, contesto completo, fonti e suggerimenti per obiettivi con almeno una scelta valida non piena sono salvati nella lingua della sessione e negli export. I suggerimenti sono deduplicati e non sono prove svolte. Aprire un report non ricalcola o ritraduce questi testi. Tutti i 135 item precedenti, il completo, Agents, AI moderne e Primi passi conservano contenuti e composizioni; integrazione del completo nella M22.", "",
  "Criterio di validazione: revisione di copertura, tracce, alternative e traduzioni; completamento di forme IT/EN con casi corretti, parziali ed errati e verifica di comprensibilità, recupero senza duplicazioni, permessi rispetto a istruzioni, navigazione, copertura H, suggerimenti, storico, export e bibliografia. Il maintainer ha approvato la milestone il `2026-11-25` e autorizzato commit, merge, tag, push e rimozione del branch; gli esiti dettagliati della checklist manuale non sono stati riportati nella conversazione. Limiti della verifica dell'agente senza browser reale in [SCORING.md](SCORING.md).", "",
  "| Slot | Obiettivo | Livello | Fonti |", "| --- | --- | --- | --- |",
  ...harness.SLOTS.map(slot => `| ${slot.id} | ${slot.objectiveId} — ${cell(objectives[slot.objectiveId][0])} | S | ${slot.sourceRefs.join(", ")} |`), "",
  "## Fonti primarie e ambito", "",
  "Le fonti sostengono i principi; crediti, soglie e contratti degli scenari sono editoriali. I collegamenti restano facoltativi e aperti soltanto su click.", "",
  ...harness.SOURCES.map(source => `- **${source.id}** — [${source.title}](${source.url}): ${source.note[0]} / ${source.note[1]}`), "",
  "M20-S01/S03 sono articoli tecnici storici del 2025: si usano principi di contesto e continuità, senza imporre modelli o SDK dell'epoca. M20-S02 descrive anche formati di compattazione opachi: i riassunti testuali dei casi sono caratteristiche delle app ipotetiche, non una descrizione universale di quella API. M20-S04 rimanda alla documentazione MCP `2026-07-28`. M20-S05/S06 definiscono formati e convenzioni: gerarchia e caricamento sono dichiarati dal singolo caso, non assunti uguali in tutti i prodotti. M20-S07 distingue superfici locali e remote. M20-S08/S09 sostengono contratti e verifiche ripetibili; il test non chiama API né valutatori esterni. Ricontrollare le fonti nelle revisioni future.", ""
];
for (const form of ["A", "B", "C"]) {
  lines.push(`## Forma ${form}`, "");
  harness.SLOTS.forEach((slot, index) => {
    const data = harness.FORMS[form][index];
    lines.push(`### ${form}-${slot.id} — ${slot.objectiveId} / S`, "", `Fonti: ${slot.sourceRefs.join(", ")}.`, "");
    for (const [label, lang] of [["Italiano", 0], ["English", 1]]) {
      lines.push(`**${label}**`, "", data.context[lang], "", `**${data.prompt[lang]}**`, "",
        "| Credito | Alternativa | Motivazione dopo il test |", "| --- | --- | --- |",
        ...data.options.map(option => `| ${lang ? String((option.score - 1) / 4) : String((option.score - 1) / 4).replace(".", ",")} | ${cell(option.label[lang])} | ${cell(option.rationale[lang])} |`),
        "", `Feedback: ${data.feedback[lang]}`, "", `Suggerimento / Next step: ${harness.NEXT_STEPS[slot.objectiveId][lang]}`, "");
    }
  });
}
fs.writeFileSync(path.join(root, "docs/HARNESS_REVIEW.md"), `${lines.join("\n").trimEnd()}\n`, "utf8");
console.log("Updated docs/HARNESS_REVIEW.md (30 bilingual scenarios).");
