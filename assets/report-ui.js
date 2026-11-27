/* Rendering for the evidence report; stored reports are never recalculated here. */
function reportText(it, en) { return isEnglish() ? en : it; }
function evidenceLabel(type) {
  return reportText({ Q: "Conoscenze e scenari", D: "Pratiche dichiarate", T: "Testi con feedback", E: "Esercizi simulati" }[type],
    { Q: "Knowledge and scenarios", D: "Self-reported practices", T: "Text with feedback", E: "Simulated exercises" }[type]);
}
function objectiveLabel(id) {
  return Object.hasOwn(ASSESSMENT_V3.OBJECTIVES, id) ? ASSESSMENT_V3.label(ASSESSMENT_V3.OBJECTIVES[id], currentLanguage()) : id;
}
function coverageLabel(status) {
  return reportText({ "not-assessed": "Non esplorata", limited: "Evidenza limitata", partial: "Copertura parziale", reached: "Copertura prevista raggiunta" }[status] || "Formato non riconosciuto",
    { "not-assessed": "Not assessed", limited: "Limited evidence", partial: "Partial coverage", reached: "Planned coverage reached" }[status] || "Unrecognized format");
}
function reportActions() {
  return `<div class="actions report-actions"><button class="btn-primary" id="restartBtn">${reportText("Nuovo assessment", "New assessment")}</button>
    <button class="btn-ghost" id="exportJsonBtn">${reportText("Esporta JSON", "Export JSON")}</button><button class="btn-ghost" id="exportCsvBtn">${reportText("Esporta CSV", "Export CSV")}</button>
    <button class="btn-ghost" id="printBtn">${reportText("Stampa / salva PDF", "Print / save PDF")}</button><button class="btn-ghost" id="bibliographyBtn">${reportText("Bibliografia", "Bibliography")}</button>
    <button class="btn-danger" id="clearHistoryBtn">${reportText("Cancella dati locali", "Clear local data")}</button></div>`;
}
function reportItem(item) {
  const status = item.responseStatus === "missing" ? reportText("Risposta mancante", "Missing answer") : reportText("Risposta non valida", "Invalid answer");
  const credit = typeof item.credit === "number" ? `${reportText("Credito", "Credit")}: ${item.credit.toLocaleString(currentLanguage(), { maximumFractionDigits: 4 })}/1` : status;
  const selection = item.selectionReview;
  return `<article class="analysis-item"><h4>${escapeHtml(item.question || item.sourceId)}</h4>
    <p class="muted small">${escapeHtml(objectiveLabel(item.objectiveId))} · ${escapeHtml(credit)}</p>
    <p>${escapeHtml(item.answer || status)}</p>${item.answerText ? `<p class="answer-text">${escapeHtml(item.answerText)}</p>` : ""}
    ${item.objectiveAlignment === "supporting" ? `<p class="evidence-note">${reportText("Quesito di supporto: il credito individuale non entra nella percentuale o nella copertura dell'area.", "Supporting question: its individual credit does not enter the area percentage or coverage.")}</p>` : ""}
    ${item.feedback ? `<p>${escapeHtml(item.feedback)}</p>` : ""}
    ${(item.selectedRationales ?? []).map(reason => `<p><strong>${reportText("La tua scelta", "Your choice")}:</strong> ${escapeHtml(reason)}</p>`).join("")}
    ${item.sourceRefs ? `<p class="small">${item.sourceRefs.map(id => {
      const source = [...MODERN_AI.SOURCES, ...AGENTIC_WORKFLOWS.SOURCES, ...HARNESS_ASSESSMENT.SOURCES, ...COMPLETE_ASSESSMENT.SOURCES].find(source => source.id === id);
      return source ? `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a>` : escapeHtml(id);
    }).join(" · ")}</p>` : ""}
    ${selection?.omitted?.length ? `<p><strong>${reportText("Azioni utili non selezionate", "Useful actions not selected")}:</strong> ${escapeHtml(selection.omitted.join("; "))}</p>` : ""}
    ${selection?.incompatible?.length ? `<p><strong>${reportText("Scelte incompatibili", "Incompatible choices")}:</strong> ${escapeHtml(selection.incompatible.join("; "))}</p>` : ""}</article>`;
}
function renderEvidenceDashboard(report) {
  const { results, coverage, meta } = report;
  const areas = Object.keys(ASSESSMENT_V3.AREA_LABELS);
  const activeAreas = areas.filter(area => ["Q", "D", "T"].some(type => coverage.byArea[area].byEvidence[type].proposed));
  const absentAreas = areas.filter(area => !activeAreas.includes(area));
  const areaCards = activeAreas.map(area => {
    const result = results.knowledgeByArea[area];
    const areaCoverage = coverage.byArea[area];
    const areaItems = report.answers.filter(item => item.primaryArea === area && item.evidenceType === "Q");
    const bands = { review: reportText("Da riprendere", "Review foundations"), developing: reportText("In consolidamento", "Developing"), strong: reportText("Buon esito nei quesiti", "Strong question results") };
    const weak = result.objectives.filter(objective => objective.credit !== null && objective.credit < 0.4);
    return `<article class="card evidence-area ${weak.length ? "has-review" : ""}"><h3>${escapeHtml(ASSESSMENT_V3.label(ASSESSMENT_V3.AREA_LABELS[area], currentLanguage()))}</h3>
      <p class="evidence-value">${typeof result.value === "number" ? `${Math.round(result.value)}/100` : "—"}</p>
      <p><strong>${escapeHtml(coverageLabel(result.status))}</strong>${result.band ? ` · ${escapeHtml(bands[result.band])}` : ""}</p>
      <p>${result.validCount} ${reportText("quiz/scenari validi", "valid questions/scenarios")} · ${areaCoverage.coveredObjectives.length}/${ASSESSMENT_V3.objectiveIds(area).length} ${reportText("obiettivi esplorati", "objectives explored")}</p>
      ${result.missingCount ? `<p class="evidence-note">${result.missingCount} ${reportText("risposte mancanti o non valide, escluse dal calcolo.", "missing or invalid answers, excluded from scoring.")}</p>` : ""}
      ${weak.length ? `<p class="evidence-note"><strong>${reportText("Risposte da rivedere", "Answers to review")}:</strong> ${escapeHtml(weak.map(objective => objectiveLabel(objective.id)).join("; "))}.</p>` : ""}
      ${areaCoverage.missingObjectives.length ? `<details><summary>${reportText("Obiettivi non esplorati", "Objectives not assessed")} (${areaCoverage.missingObjectives.length})</summary><ul>${areaCoverage.missingObjectives.map(id => `<li>${escapeHtml(objectiveLabel(id))}</li>`).join("")}</ul></details>` : ""}
      ${areaItems.length ? `<details><summary>${reportText("Risposte e motivazioni", "Answers and feedback")} (${areaItems.length})</summary>${areaItems.map(reportItem).join("")}</details>` : `<p>${reportText("Quest'area contiene solo dichiarazioni o testo formativo: nessuna percentuale sui quesiti.", "This area contains only self-reports or formative text: no question percentage.")}</p>`}</article>`;
  }).join("");
  const declarations = results.declaredPractices.map(item => `<article class="analysis-item"><h4>${escapeHtml(item.question)}</h4><p>${item.declaredValue === null ? reportText("Risposta mancante o non valida", "Missing or invalid answer") : `${item.declaredValue}/5 · ${escapeHtml(item.answer)}`}</p>${item.answerText ? `<p>${escapeHtml(item.answerText)}</p>` : ""}</article>`).join("");
  const texts = results.formativeFeedback.map(item => `<article class="card formative-item"><h3>${escapeHtml(item.question)}</h3>
    <p class="answer-text">${escapeHtml(item.answerText || reportText("Nessun testo valido disponibile.", "No valid text available."))}</p>
    <p><strong>${reportText("Spunti per rileggere il testo", "Prompts for reviewing your text")}</strong></p>
    <ul>${(item.checklist || []).map(label => `<li>${escapeHtml(label)}</li>`).join("")}</ul>
    <p>${escapeHtml(item.feedback)}</p><p class="muted small">${reportText("Checklist formativa: questi requisiti non sono verificati automaticamente. La presenza di parole chiave non dimostra la qualità della risposta.", "Formative checklist: these requirements are not automatically verified. The presence of keywords does not demonstrate answer quality.")}</p></article>`).join("");
  const self = meta.selfAssessment || {};
  const selfLabels = { overall: reportText("Stima complessiva", "Overall estimate"), literacy: "Literacy", fluency: "Fluency", mindset: "Mindset" };
  const selfEntries = Object.entries(selfLabels).filter(([key]) => typeof self[key] === "number" && Number.isFinite(self[key]));
  const nextSteps = results.nextSteps ?? [];
  const counts = ["Q", "D", "T", "E"].map(type => `<article class="metric-card"><span>${evidenceLabel(type)}</span><strong>${coverage.byEvidence[type].proposed}</strong><span>${coverage.byEvidence[type].valid} ${reportText("risposte valide", "valid responses")}</span></article>`).join("");
  $("dashboard").innerHTML = `${reportActions()}<section class="card evidence-intro"><p class="kicker">${reportText("Risultati dell'assessment", "Assessment results")}</p>
    <h2>${reportText("Quadro delle evidenze", "Evidence overview")}</h2>
    <p>${reportText("I quiz e gli scenari esplorano conoscenze e giudizio su situazioni ipotetiche. Dichiarazioni e testi formativi sono separati. Questo risultato non certifica capacità operative o prestazioni sul lavoro.", "Questions and scenarios explore knowledge and judgment on hypothetical situations. Self-reports and formative text are separate. This result does not certify operational capabilities or workplace performance.")}</p>
    <p class="muted small">${escapeHtml([meta.name, meta.role, meta.area].filter(Boolean).join(" · "))} · ${escapeHtml(formatDate(meta.completedAt))} · ${escapeHtml(meta.testMode?.label || "")} · ${reportText("Forma", "Form")} ${escapeHtml(meta.formId || "—")}</p>
    <p class="evidence-note">${reportText("I report 2.x usano un modello diverso: nessun confronto diretto o media con questi risultati.", "Reports from 2.x use a different model: no direct comparison or averaging with these results.")}</p></section>
    ${report.criticalFindings.length ? `<p class="evidence-note" role="status"><strong>${reportText("Criticità nelle azioni simulate", "Critical simulated actions")}:</strong> ${escapeHtml(report.criticalFindings.map(f => f.effect).join(" "))} ${reportText("I risultati dei quiz non compensano questi esiti. Consulta i due casi nella sezione Esercizi simulati.", "Question results do not compensate for these outcomes. Review both cases in Simulated exercises.")}</p>` : ""}
    <div class="grid-4 evidence-counts">${counts}</div>
    ${coverage.unproposedCount ? `<p class="evidence-note">${coverage.unproposedCount} ${reportText("domande previste non sono presenti nel report: copertura incompleta.", "planned questions are absent from the report: incomplete coverage.")}</p>` : ""}
    <section class="evidence-section"><h2>${evidenceLabel("Q")}</h2><p>${reportText("Percentuali solo con almeno 3 quesiti e 2 obiettivi. Ogni obiettivo pesa uguale nella propria area; gli item di solo supporto sono esclusi. Le scelte editoriali di copertura non sono soglie psicometriche.", "Percentages require at least 3 questions and 2 objectives. Objectives carry equal weight within each area; supporting items are excluded. Editorial coverage choices are not psychometric thresholds.")}</p>
      <div class="grid-2 evidence-areas">${areaCards}</div>
      ${absentAreas.length ? `<p class="evidence-note"><strong>${reportText("Aree non esplorate con quesiti Q/D/T", "Areas not assessed with Q/D/T items")}:</strong> ${escapeHtml(absentAreas.map(area => ASSESSMENT_V3.label(ASSESSMENT_V3.AREA_LABELS[area], currentLanguage())).join("; "))}. ${reportText("L'assenza non equivale a un punteggio zero.", "Absence does not mean a zero score.")}</p>` : ""}</section>
    ${nextSteps.length ? `<section class="card evidence-section"><h2>${reportText("Per approfondire le scelte", "Develop your decisions")}</h2><p>${reportText("Spunti sugli obiettivi con almeno una scelta parziale o da rivedere. Sono attività suggerite, non prove già svolte.", "Suggestions for objectives with at least one partial or incorrect choice. These are suggested activities, not completed exercises.")}</p><ul>${nextSteps.map(step => `<li><strong>${escapeHtml(objectiveLabel(step.objectiveId))}:</strong> ${escapeHtml(step.text)}</li>`).join("")}</ul></section>` : ""}
    <section class="card evidence-section"><h2>${evidenceLabel("D")}</h2><p>${reportText("Descrivono ciò che dichiari di fare; non aumentano il risultato dei quiz e non dimostrano un'esecuzione. Una dichiarazione alta o bassa non è un voto di merito.", "These describe what you report doing; they do not increase question results or demonstrate execution. A high or low self-report is not a performance grade.")}</p>
      ${results.declaredContrasts.length ? `<p class="evidence-note">${reportText("Hai dichiarato un metodo stabile su obiettivi in cui alcune risposte ai quesiti sono da rivedere. Prova un esercizio guidato su:", "You reported a stable method on objectives where some question answers need review. Try a guided exercise on:")} ${escapeHtml(results.declaredContrasts.map(objectiveLabel).join("; "))}.</p>` : ""}
      ${declarations ? `<details><summary>${reportText("Leggi le dichiarazioni", "Read self-reports")} (${results.declaredPractices.length})</summary>${declarations}</details>` : `<p>${reportText("Nessun item dichiarativo in questo percorso.", "No self-report items in this path.")}</p>`}
      ${selfEntries.length ? `<h3>${reportText("Stime iniziali facoltative", "Optional initial estimates")}</h3><ul>${selfEntries.map(([key, label]) => `<li>${escapeHtml(label)}: ${self[key]}/100</li>`).join("")}</ul><p>${reportText("Sono aspettative personali, conservate senza sottrarle ai risultati o ricavare un gap di competenza.", "These are personal expectations, stored without subtracting them from results or producing a competence gap.")}</p>` : ""}</section>
    <section class="evidence-section"><h2>${evidenceLabel("T")}</h2><p>${reportText("Rileggi il testo con la checklist. Non viene assegnato un punteggio automatico di qualità.", "Review your text using the checklist. No automatic quality score is assigned.")}</p>${texts || `<p>${reportText("Nessun testo formativo in questo percorso.", "No formative text in this path.")}</p>`}</section>
    <section class="card evidence-section"><h2>${evidenceLabel("E")}</h2>${renderLabResults(report)}</section>
    <details class="card evidence-section"><summary>${reportText("Come leggere copertura e versioni", "Understanding coverage and versions")}</summary><p>${reportText("La copertura prevista richiede almeno 6 quesiti validi e tutti gli obiettivi dell'area. Solo in questo caso si usano le fasce editoriali: meno di 40 da riprendere, 40–69 in consolidamento, da 70 buon esito nei quesiti. Coperture parziali non qualificano l'intera area.", "Planned coverage requires at least 6 valid questions and all area objectives. Only then are editorial bands used: below 40 review foundations, 40–69 developing, 70 or above strong question results. Partial coverage does not qualify the whole area.")}</p><p>App ${escapeHtml(meta.assessmentVersion)} · Scoring ${escapeHtml(meta.scoringVersion)} · Blueprint ${escapeHtml(meta.blueprintVersion)} · ${reportText("Banca", "Bank")} ${escapeHtml(meta.questionBankVersion)} · ${reportText("Versione forma", "Form version")} ${escapeHtml(meta.formVersion)}</p></details>
    ${historyBlock()}<p class="footer-note">${reportText("Risposte e report restano nel browser. Export solo su richiesta. Il test non è psicometricamente validato; fonti e limiti sono consultabili nella Bibliografia.", "Responses and reports stay in the browser. Export only on request. The test is not psychometrically validated; sources and limitations are available in the Bibliography.")}</p>`;
  $("progressFill").style.width = "100%";
  bindDashboardEvents();
  showView("dashboardView");
}

function renderUnknownDashboard(report) {
  $("dashboard").innerHTML = `${reportActions()}<section class="card"><h2>${reportText("Formato del report non supportato", "Unsupported report format")}</h2>
    <p>${reportText("Questo record è incompleto, non riconosciuto o usa una versione diversa. I dati originali restano disponibili senza ricalcolo: puoi consultarli ed esportarli.", "This record is incomplete, unrecognized, or uses a different version. Original data remains available without recalculation: you can inspect and export it.")}</p>
    <details><summary>${reportText("Dati originali", "Original data")}</summary><pre class="raw-report" id="rawReport"></pre></details></section>${historyBlock()}`;
  $("rawReport").textContent = JSON.stringify(report, null, 2);
  $("progressFill").style.width = "100%";
  bindDashboardEvents();
  showView("dashboardView");
}
