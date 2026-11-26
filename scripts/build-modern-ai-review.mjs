// Optional documentation generator; the static app requires no build step.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = vm.createContext({});
for (const name of ["questions", "i18n", "modern-ai", "operational-lab", "complete-assessment", "assessment"]) {
  vm.runInContext(fs.readFileSync(path.join(root, `assets/${name}.js`), "utf8"), context);
}
const { modern, objectives } = vm.runInContext("({modern: MODERN_AI, objectives: ASSESSMENT_V3.OBJECTIVES})", context);
const cell = value => String(value).replaceAll("|", "\\|").replaceAll("\n", "<br>");
const lines = [
  "# Revisione editoriale — AI moderne (milestone 18)", "",
  "Stato: approvata dal maintainer il `2026-11-25`, release `v3.1.0`. App `3.1.0`, banca `2026.11-m18`, forme `1.4`; scoring `3.0.0`, schema `3`, blueprint `1.0.0` invariati.", "",
  `Revisione delle fonti: **${modern.REVIEW_DATE}**. Questo documento è generato dai dati locali con \`node scripts/build-modern-ai-review.mjs\`; non è necessario per eseguire l'app.`, "",
  "## Criteri e limiti", "",
  "Le 30 varianti originali sono disponibili in italiano e inglese. Ogni sessione propone i dieci slot della stessa forma, con ordine di domande e opzioni rimescolato. La matrice di obiettivi è fissa, senza estrazione casuale da un pool più ampio. Il completo e i nove tematici preesistenti conservano le proprie composizioni; Primi passi resta indipendente.", "",
  "Sono scenari Q a scelta singola, di livello operativo O. Valutano una decisione sui dati forniti, non l'esecuzione pratica di strumenti. Le configurazioni e le misure riportate sono sintetiche: non descrivono prodotti, listini, garanzie di precisione o regole generali di trattamento dei dati.", "",
  "Per ciascun caso: score editoriale 5 → credito 1, score 3 → credito 0,5, score 1 → credito 0. Le motivazioni sono visibili dopo il test per la scelta effettuata. Il credito parziale indica un elemento pertinente ma insufficiente rispetto ai vincoli; non autorizza una scelta incompatibile. I pesi e le fasce sono editoriali. Le forme hanno la stessa matrice per progetto: non è dimostrata un'equivalenza psicometrica di difficoltà.", "",
  "Criterio di validazione: revisione di tutte le varianti, traduzioni e crediti; completamento di almeno una forma IT e una EN, con verifica di chiarezza, utilità operativa, Indietro, risultati, storico, export e bibliografia. Il maintainer ha approvato la milestone il `2026-11-25` e autorizzato commit e release; gli esiti dettagliati della checklist manuale non sono stati riportati nella conversazione. Il limite della verifica dell'agente senza browser reale è documentato in [SCORING.md](SCORING.md).", "",
  "## Matrice comune", "",
  "| Slot | Obiettivo | Livello | Fonti |", "| --- | --- | --- | --- |",
  ...modern.SLOTS.map(slot => `| ${slot.id} | ${slot.objectiveId} — ${cell(objectives[slot.objectiveId][0])} | O | ${slot.sourceRefs.join(", ")} |`), "",
  "U01 e U02 hanno due quesiti; U03–U08 uno ciascuno. La percentuale U mantiene peso uguale per obiettivo, non per domanda. Tutte le altre aree restano non esplorate in questo percorso. Una copertura raggiunta descrive gli obiettivi dei quesiti, non un'abilità osservata nell'esecuzione.", "",
  "## Fonti primarie", "",
  "Le fonti sostengono le distinzioni concettuali; non prescrivono i crediti degli scenari. I servizi evolvono: ricontrollare disponibilità, limiti e policy prima di una revisione futura. Nessuna fonte è caricata automaticamente dal test; i collegamenti richiedono un click.", "",
  ...modern.SOURCES.map(source => `- **${source.id}** — [${source.title}](${source.url}): ${source.note[0]} / ${source.note[1]}`), "",
  "Il riferimento S12 del blueprint approvato (OpenAI Video generation) è conservato come storico: la pagina consultata segnala la chiusura di Sora 2 / Videos API il 24 settembre 2026. Per la distinzione attuale fra comprensione e generazione video questa milestone usa M18-S04 e M18-S05. Non assume la disponibilità delle precedenti API o di specifiche versioni dei modelli.", ""
];
for (const form of ["A", "B", "C"]) {
  lines.push(`## Forma ${form}`, "");
  modern.SLOTS.forEach((slot, index) => {
    const data = modern.FORMS[form][index];
    lines.push(`### ${form}-${slot.id} — ${slot.objectiveId}`, "", `Fonti: ${slot.sourceRefs.join(", ")}.`, "");
    for (const [language, lang] of [["Italiano", 0], ["English", 1]]) {
      lines.push(`**${language}**`, "", data.context[lang], "", `**${data.prompt[lang]}**`, "",
        "| Credito | Alternativa | Motivazione dopo il test |", "| --- | --- | --- |",
        ...data.options.map(option => `| ${lang ? String((option.score - 1) / 4) : String((option.score - 1) / 4).replace(".", ",")} | ${cell(option.label[lang])} | ${cell(option.rationale[lang])} |`),
        "", `Feedback: ${data.feedback[lang]}`, "");
    }
  });
}
fs.writeFileSync(path.join(root, "docs/MODERN_AI_REVIEW.md"), `${lines.join("\n").trimEnd()}\n`, "utf8");
console.log("Updated docs/MODERN_AI_REVIEW.md (30 bilingual scenarios).");
