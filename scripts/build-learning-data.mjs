import fs from "node:fs";

const md = fs.readFileSync(new URL("../LEARNING_PATH.md", import.meta.url), "utf8");

function questionBlock(sectionTitle, endTitle, language) {
  const section = md.split(sectionTitle)[1].split(endTitle)[0];
  const parts = section.split(/^#### `/m).slice(1);
  return parts.map(part => {
    const lines = part.split("\n");
    const head = lines.shift().match(/^([^`]+)` - `([^`]+)` - ([CS])/);
    if (!head) throw new Error(`Intestazione domanda non riconosciuta: ${part.split("\n")[0]}`);
    const [, id, objectiveId, typeCode] = head;
    const promptPrefix = language === "it" ? "**Domanda:** " : "**Question:** ";
    const text = lines.find(line => line.startsWith(promptPrefix)).slice(promptPrefix.length);
    const optionLines = lines.filter(line => /^- [A-D]\. /.test(line));
    const options = optionLines.map(line => ({
      title: line.replace(/^- [A-D]\. /, "").replace(/ \*\*\[(corretta|correct)\]\*\*$/, ""),
      correct: /\*\*\[(corretta|correct)\]\*\*$/.test(line)
    }));
    return { id, formId: id.split("_")[1], objectiveId, learningUnitId: `U-${objectiveId}`, type: typeCode === "C" ? "knowledge" : "scenario", language, text, options };
  });
}

const italian = questionBlock("## 5. Banca domande italiana", "## 6. English question bank", "it");
const english = questionBlock("## 6. English question bank", "## 7. Unita' didattiche riutilizzabili", "en");

const unitSection = md.split("## 7. Unita' didattiche riutilizzabili")[1].split("## 8. Logica del tutorial personalizzato")[0];
const units = unitSection.split(/^### `/m).slice(1).map(part => {
  const lines = part.split("\n");
  const heading = lines.shift();
  const id = heading.match(/^([^`]+)`/)[1];
  const titleIt = heading.replace(/^[^`]+` - /, "").trim();
  const field = prefix => (lines.find(line => line.startsWith(prefix)) || "").slice(prefix.length).trim();
  return {
    id,
    objectiveId: field("- Obiettivo: ").replaceAll("`", ""),
    title: { it: titleIt, en: field("- Principle EN: ").split(";")[0] || titleIt },
    principle: { it: field("- Principio IT: "), en: field("- Principle EN: ") },
    misconception: field("- Equivoco tipico: "),
    example: field("- Esempio: "),
    action: field("- Micro-azione: "),
    reinforcement: field("- Rinforzo corretto: "),
    sources: field("- Fonti: ").split(",").map(value => value.trim().replaceAll("`", "")).filter(Boolean)
  };
});

const questionMap = { it: italian, en: english };
const output = `// Generato da LEARNING_PATH.md con scripts/build-learning-data.mjs.\nconst FIRST_STEPS_QUESTIONS = ${JSON.stringify(questionMap, null, 2)};\nconst FIRST_STEPS_UNITS = ${JSON.stringify(units, null, 2)};\n`;
fs.writeFileSync(new URL("../assets/learning.js", import.meta.url), output);
