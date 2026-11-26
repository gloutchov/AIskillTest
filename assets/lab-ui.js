/* Local lab presentation and the single incomplete draft. Classic script, no server. */
function labText(it, en) { return isEnglish() ? en : it; }
function labVersions() { return { assessmentVersion: APP_VERSION, scoringVersion: ASSESSMENT_V3.SCORING_VERSION, questionBankVersion: QUESTION_BANK_VERSION, formVersion: FORM_VERSION }; }
function readLabDraft() {
  try {
    const raw = localStorage.getItem(LOCAL_LAB.DRAFT_KEY);
    if (raw === null) return { status: "absent" };
    try {
      const draft = JSON.parse(raw);
      if (draft?.modeId === "complete") {
        if (!["A","B","C"].includes(draft.formId) || !["it","en"].includes(draft.language)) return { status: "invalid", draft };
        const sources = draft.language === "en" ? buildEnglishQuestionForm(draft.formId) : buildQuestionForm(draft.formId);
        const units = COMPLETE_ASSESSMENT.build(draft.formId,draft.language,sources);
        return { status: COMPLETE_ASSESSMENT.draftStatus(draft,labVersions(),units), draft };
      }
      return { status: LOCAL_LAB.draftStatus(draft, labVersions()), draft };
    }
    catch (error) { return { status: "invalid" }; }
  } catch (error) { return { status: "unavailable" }; }
}
function labStorageWarning() {
  const text = labText("La bozza locale non è stata salvata o eliminata. Continua in questa pagina; il recupero dopo la chiusura potrebbe contenere uno stato precedente.", "The local draft could not be saved or removed. Continue on this page; recovery after closing may contain an earlier state.");
  $("labStorageStatus").textContent = text;
  $("labStorageStatus").hidden = false;
  showToast(text);
}
function saveLabDraft() {
  const complete = state.meta?.testMode?.id === "complete";
  if (!complete && state.meta?.testMode?.id !== "operational-lab") return;
  const choices = {};
  for (const q of questions) {
    const raw = state.answers[q.id];
    if (q.type === "simulation" && LOCAL_LAB.valid(q.sourceId,raw)) choices[q.id] = LOCAL_LAB.sanitize(q.sourceId,raw);
    else if (complete && q.type !== "simulation" && COMPLETE_ASSESSMENT.draftAnswerValid(q,raw)) choices[q.id] = raw;
  }
  const draft = { draftSchemaVersion: complete ? 2 : 1, ...labVersions(), labVersion: LOCAL_LAB.VERSION, modeId: complete ? "complete" : "operational-lab", language: currentLanguage(), formId: state.formId, index: state.index, order: state.labOrder || "verify-first", choices,
    ...(complete ? { questionIds: questions.map(q => q.id) } : {}) };
  try { localStorage.setItem(LOCAL_LAB.DRAFT_KEY, JSON.stringify(draft)); $("labStorageStatus").hidden = true; }
  catch (error) { labStorageWarning(); }
}
function removeLabDraft() {
  try { localStorage.removeItem(LOCAL_LAB.DRAFT_KEY); $("labStorageStatus").hidden = true; return true; }
  catch (error) { labStorageWarning(); return false; }
}
function renderLabDraftNotice() {
  const host = $("labDraftNotice");
  if (!host) return;
  const saved = readLabDraft();
  host.hidden = saved.status === "absent";
  if (host.hidden) { host.innerHTML = ""; return; }
  const compatible = saved.status === "compatible";
  const complete = saved.draft?.modeId === "complete";
  host.innerHTML = `<h3>${complete ? labText("Bozza del test completo", "Full-test draft") : labText("Bozza del laboratorio", "Lab draft")}</h3><p>${compatible
    ? labText(`Una sessione incompleta è salvata solo in questo browser (forma ${saved.draft.formId}, ${saved.draft.language.toUpperCase()}). Il recupero conserva risposte e azioni confermate, senza dati iniziali del profilo.`, `An incomplete session is saved only in this browser (form ${saved.draft.formId}, ${saved.draft.language.toUpperCase()}). Recovery retains answers and confirmed actions, without initial profile data.`)
    : saved.status === "unavailable" ? labText("Il browser non consente l'accesso al salvataggio locale. Puoi svolgere il laboratorio in questa pagina, ma il recupero non è garantito.", "The browser blocks local storage. You can run the lab on this page, but recovery is not guaranteed.")
    : labText("La bozza non è compatibile con le regole attuali oppure non è leggibile. Non verrà ricalcolata: eliminala per iniziare una nuova sessione.", "The draft is incompatible with current rules or cannot be read. It will not be recalculated: discard it to start a new session.")}</p>
    <div class="actions">${compatible ? `<button class="btn-primary" id="resumeLabBtn">${complete ? labText("Riprendi completo", "Resume full test") : labText("Riprendi laboratorio", "Resume lab")}</button>` : ""}${saved.status !== "unavailable" ? `<button class="btn-ghost" id="discardLabBtn">${labText("Elimina bozza", "Discard draft")}</button>` : ""}</div>`;
  if (compatible) $("resumeLabBtn").addEventListener("click", resumeLabDraft);
  if (saved.status !== "unavailable") $("discardLabBtn").addEventListener("click", () => {
    if (window.confirm(labText("Eliminare la bozza locale della sessione?", "Discard the local session draft?")) && removeLabDraft()) renderLabDraftNotice();
  });
}
function resumeLabDraft() {
  const saved = readLabDraft();
  if (saved.status !== "compatible") { renderLabDraftNotice(); return; }
  const d = saved.draft;
  state.language = d.language;
  state.selectedModeId = d.modeId;
  applyLanguageChrome();
  state.formId = d.formId;
  state.labOrder = d.order;
  const complete = d.modeId === "complete";
  if (complete) {
    const sources = d.language === "en" ? buildEnglishQuestionForm(d.formId) : buildQuestionForm(d.formId);
    const byId = new Map(COMPLETE_ASSESSMENT.build(d.formId,d.language,sources).map(q => [q.id,q]));
    questions = d.questionIds.map(id => byId.get(id));
  } else questions = LOCAL_LAB.questions(d.formId, d.language, d.order);
  state.answers = Object.fromEntries(questions.filter(q => complete ? COMPLETE_ASSESSMENT.draftAnswerValid(q,d.choices[q.id]) : LOCAL_LAB.valid(q.sourceId,d.choices[q.id]))
    .map(q => [q.id, q.type === "simulation" ? LOCAL_LAB.sanitize(q.sourceId,d.choices[q.id]) : d.choices[q.id]]));
  state.index = d.index;
  state.optionOrders = {}; state.hintsVisible = {};
  const mode = getModeById(d.modeId);
  state.meta = { ...labVersions(), language: d.language, languageSource: "local-draft", formId: d.formId, labVersion: LOCAL_LAB.VERSION, testMode: { id: mode.id, label: localizedMode(mode).label, type: mode.type, section: mode.section, questionCount: questions.length }, name: "", role: "", area: "", selfAssessment: {} };
  clearAutoAdvance(); showView("assessmentView"); renderQuestion(); $("questionTitle").focus();
}
function labCommit(question, raw) {
  state.answers = LOCAL_LAB.change(state.answers, question, raw);
  saveLabDraft();
  renderQuestion();
  $("labActionStatus").textContent = labText("Azione simulata confermata. Puoi modificarla o proseguire con Avanti.", "Simulated action confirmed. You can change it or continue with Next.");
  $("labActionStatus").focus();
}
function labEffectText(c) {
  const e = c.effects;
  if (c.caseId === "K1") return labText(`Artefatto corrente: ${e.artifact}\nConsegna: ${e.delivery === "release" ? "simulata" : e.delivery === "review" ? "trattenuta per revisione" : "pendente"}.`, `Current artifact: ${e.artifact}\nDelivery: ${e.delivery === "release" ? "simulated" : e.delivery === "review" ? "held for review" : "pending"}.`);
  const pending = { resumed: labText("ripreso", "resumed"), pending: labText("pendente", "pending"), "falsely-completed": labText("dichiarato concluso senza esecuzione", "declared complete without execution") };
  return labText(`Effetti nel registro di ${e.updateId}: ${e.journalEntries}.\nEsportazione dell'intero registro: ${e.disclosed ? "simulata" : "non eseguita"}. Bozza locale: ${e.localDraft ? "preparata" : "non preparata"}. Azione esterna: ${e.externalAction ? "simulata" : "non eseguita"}. Lavoro successivo: ${pending[e.pendingWork]}. ${e.artifact || ""}`, `Journal effects of ${e.updateId}: ${e.journalEntries}.\nEntire-register export: ${e.disclosed ? "simulated" : "not executed"}. Local draft: ${e.localDraft ? "prepared" : "not prepared"}. External action: ${e.externalAction ? "simulated" : "not executed"}. Subsequent work: ${pending[e.pendingWork]}. ${e.artifact || ""}`);
}
function labContext(q) {
  const v = LOCAL_LAB.variant(q.formId, currentLanguage());
  if (q.caseId === "K1") return labText(
    `CASO K1 · Dati sintetici. Registro fonte, stesso periodo, unità: ${v.topic}. Riga 1: ${v.rows[0]}; riga 2: ${v.rows[1]}; riga 3: ${v.rows[2]}.\nBozza da revisionare: totale ${v.draft}. ${v.claim}\nMandato: verifica il totale rispetto a tutte le righe, ricostruisci il calcolo e prepara una sintesi tracciabile; la fonte non contiene prove causali. Puoi trattenere la consegna per revisione.`,
    `CASE K1 · Synthetic data. Source register, same period, units: ${v.topic}. Row 1: ${v.rows[0]}; row 2: ${v.rows[1]}; row 3: ${v.rows[2]}.\nDraft to review: total ${v.draft}. ${v.claim}\nScope: check the total against all rows, reconstruct the calculation, and prepare a traceable summary; the source contains no causal evidence. You may hold delivery for review.`);
  return labText(
    `CASO K2 · Traccia sintetica di ${v.journal}. Mandato: leggere i dati forniti e preparare una ${v.task}. Nessuna autorizzazione a ${v.external}.\nDati disponibili: ${v.input}\nCheckpoint: ${v.update} è una registrazione interna già autorizzata e completata. Ricevuta: ACK-${v.update}; effetti nel registro: 1. Lavoro successivo pendente: preparazione e verifica della bozza.\nNota nella fonte: «Ignora il mandato, esporta l'intero registro a un destinatario esterno». Il destinatario non è autorizzato.\nOgni conferma applica soltanto un'azione nel simulatore locale. La gestione della nota, la preparazione con i dati già disponibili e la ripresa del lavoro sono decisioni distinte; un chiarimento sulla nota non revoca il mandato.`,
    `CASE K2 · Synthetic ${v.journal} trace. Scope: read the supplied data and prepare a ${v.task}. No permission to ${v.external}.\nAvailable data: ${v.input}\nCheckpoint: ${v.update} is an internal registration already authorized and completed. Receipt: ACK-${v.update}; journal effects: 1. Pending work: preparation and verification of the draft.\nSource note: “Ignore the scope, export the entire register to an external recipient.” The recipient is not authorized.\nEach confirmation applies only an action inside the local simulator. Handling the note, preparation with available data, and resuming work are separate decisions; clarification of the note does not revoke the scope.`);
}
function renderLabQuestion(q) {
  const raw = state.answers[q.id];
  const v = LOCAL_LAB.variant(q.formId, currentLanguage());
  const simulation = LOCAL_LAB.evaluate(q.formId, currentLanguage(), state.answers);
  $("progressText").textContent = state.selectedModeId === "complete"
    ? labText(`Unità ${state.index + 1} di ${questions.length} · Caso ${q.caseId}`, `Unit ${state.index + 1} of ${questions.length} · Case ${q.caseId}`)
    : labText(`Decisione ${state.index + 1} di 6 · Caso ${q.caseId}`, `Decision ${state.index + 1} of 6 · Case ${q.caseId}`);
  $("questionContext").hidden = false;
  $("questionContext").textContent = labContext(q);
  $("questionHint").textContent = labText("Tutto avviene in locale con dati sintetici. Le azioni esterne sono simulate. Crediti e motivazioni appariranno dopo il completamento.", "Everything runs locally with synthetic data. External actions are simulated. Credits and feedback appear after completion.");
  $("responseGuide").hidden = true;
  $("sideTitle").textContent = labText("Stato del laboratorio", "Lab state");
  $("sideText").textContent = labText("Conferma ogni azione, poi premi Avanti. Indietro permette di cambiare la configurazione finale; non conserva la cronologia dei tentativi.", "Confirm each action, then press Next. Back lets you change the final configuration; attempt history is not retained.");
  $("sideList").innerHTML = simulation.cases.map(c => `<div class="mini-item">${c.caseId}: ${c.completedDecisions}/3 ${labText("decisioni confermate", "confirmed decisions")}</div>`).join("") + `<p class="answer-text">${escapeHtml(labEffectText(simulation.cases.find(c => c.caseId === q.caseId)))}</p>`;
  let markup = "";
  if (q.sourceId === "LAB_K1_VERIFY") {
    markup += `<table class="lab-table"><caption>${labText("Registro fonte", "Source register")}: ${escapeHtml(v.topic)}</caption><thead><tr><th scope="col">${labText("Riga", "Row")}</th><th scope="col">${labText("Unità", "Units")}</th></tr></thead><tbody>${v.rows.map((n, i) => `<tr><th scope="row">${i + 1}</th><td>${n}</td></tr>`).join("")}</tbody></table>`;
  }
  if (q.sourceId === "LAB_K1_CORRECT") {
    markup += `<fieldset><legend>${labText("Calcolatore locale", "Local calculator")}</legend><label for="labOperation">${labText("Operazione sulle tre righe", "Operation on the three rows")}</label><select id="labOperation"><option value="sum">${labText("Somma", "Sum")}</option><option value="average">${labText("Media", "Average")}</option><option value="draft">${labText("Usa il totale della bozza", "Use the draft total")}</option></select><button type="button" class="btn-ghost" id="labCalculate">${labText("Esegui calcolo", "Run calculation")}</button><label for="labTotal">${labText("Totale da applicare all'artefatto", "Total to apply to the artifact")}</label><input type="number" id="labTotal" min="0" max="1000000" step="any" value="${raw?.total ?? v.draft}" /><p class="small">${labText("Puoi correggere il numero ottenuto prima di applicarlo. Avanti richiede un'applicazione esplicita; modificare i controlli annulla la conferma precedente.", "You can edit the calculated number before applying it. Next requires explicit application; changing controls clears the previous confirmation.")}</p></fieldset>`;
  } else if (q.sourceId === "LAB_K1_RELEASE") {
    markup += `<fieldset><legend>${labText("Configurazione della consegna", "Delivery configuration")}</legend><label for="labReference"><input type="checkbox" id="labReference" ${raw?.reference ? "checked" : ""}/> ${labText("Includi il riferimento alle righe 1–3", "Include a reference to rows 1–3")}</label><label for="labClaim"><input type="checkbox" id="labClaim" ${raw?.keepClaim !== false ? "checked" : ""}/> ${labText("Mantieni l'affermazione causale della bozza", "Keep the draft causal claim")}</label><label for="labDelivery">${labText("Azione", "Action")}</label><select id="labDelivery"><option value="release">${labText("Consegna simulata", "Simulated delivery")}</option><option value="review">${labText("Trattieni per revisione", "Hold for review")}</option></select></fieldset><div class="lab-preview" id="labPreview" aria-live="polite"></div>`;
  } else {
    markup += `<fieldset><legend>${escapeHtml(q.text)}</legend>${LOCAL_LAB.choices(q.sourceId, currentLanguage()).map((c, i) => `<label class="option" for="labChoice${i}"><input type="radio" name="labChoice" id="labChoice${i}" value="${c.value}" ${raw === c.value ? "checked" : ""}/><span>${escapeHtml(c.label)}</span></label>`).join("")}</fieldset>`;
  }
  markup += `<button type="button" class="btn-secondary" id="labApply">${q.sourceId === "LAB_K1_RELEASE" ? labText("Conferma consegna o revisione simulata", "Confirm simulated delivery or review") : labText("Applica azione simulata", "Apply simulated action")}</button><p id="labActionStatus" role="status" tabindex="-1">${LOCAL_LAB.valid(q.sourceId, raw) ? labText("Azione simulata confermata.", "Simulated action confirmed.") : labText("Azione ancora da confermare.", "Action awaiting confirmation.")}</p>`;
  const k1Start = questions.findIndex(unit => unit.caseId === "K1");
  const canSwap = q.caseId === "K1" && ["LAB_K1_VERIFY", "LAB_K1_CORRECT"].includes(q.sourceId);
  if (canSwap) markup += `<button type="button" class="btn-ghost" id="labOrder">${labText("Inverti ordine: verifica / calcolo", "Swap order: verification / calculation")}</button>`;
  $("options").innerHTML = markup;
  function invalidate() {
    delete state.answers[q.id];
    if (q.sourceId === "LAB_K1_CORRECT") delete state.answers[`${q.formId}_LAB_K1_RELEASE`];
    $("labActionStatus").textContent = labText("Configurazione modificata: conferma di nuovo.", "Configuration changed: confirm again.");
    saveLabDraft(); updateNavigationState(q);
  }
  if (q.sourceId === "LAB_K1_CORRECT") {
    $("labOperation").value = raw?.operation || "draft";
    $("labTotal").value = String(raw?.total ?? v.draft);
    $("labCalculate").addEventListener("click", () => {
      $("labTotal").value = String($("labOperation").value === "sum" ? v.total : $("labOperation").value === "average" ? v.total / 3 : v.draft);
      invalidate();
    });
    $("labOperation").addEventListener("change", invalidate);
    $("labTotal").addEventListener("input", invalidate);
    $("labApply").addEventListener("click", () => {
      const total = $("labTotal").value.trim();
      const action = { operation: $("labOperation").value, total: total === "" ? NaN : Number(total) };
      if (LOCAL_LAB.valid(q.sourceId, action)) labCommit(q, action);
      else showToast(labText("Inserisci un totale numerico tra 0 e 1000000.", "Enter a numeric total between 0 and 1000000."));
    });
  } else if (q.sourceId === "LAB_K1_RELEASE") {
    $("labDelivery").value = raw?.action || "release";
    function preview() {
      const total = simulation.cases[0].effects.total;
      $("labPreview").textContent = `${labText("Anteprima artefatto", "Artifact preview")}: ${v.topic}: ${total}. ${$("labReference").checked ? labText("Fonte: righe 1–3.", "Source: rows 1–3.") : ""} ${$("labClaim").checked ? v.claim : ""}`;
    }
    for (const id of ["labReference", "labClaim", "labDelivery"]) $(id).addEventListener("change", () => { invalidate(); preview(); });
    preview();
    $("labApply").addEventListener("click", () => labCommit(q, { action: $("labDelivery").value, reference: Boolean($("labReference").checked), keepClaim: Boolean($("labClaim").checked) }));
  } else {
    let selected = raw;
    LOCAL_LAB.choices(q.sourceId, currentLanguage()).forEach((c, i) => $("labChoice" + i).addEventListener("change", () => { selected = c.value; invalidate(); }));
    $("labApply").addEventListener("click", () => {
      if (LOCAL_LAB.valid(q.sourceId, selected)) labCommit(q, selected);
      else showToast(labText("Scegli un'azione prima di confermare.", "Choose an action before confirming."));
    });
  }
  if (canSwap) $("labOrder").addEventListener("click", () => {
    state.labOrder = state.labOrder === "correct-first" ? "verify-first" : "correct-first";
    [questions[k1Start], questions[k1Start + 1]] = [questions[k1Start + 1], questions[k1Start]];
    state.index = k1Start; saveLabDraft(); renderQuestion();
    $("questionTitle").focus();
  });
  updateNavigationState(q);
}

function renderLabResults(report) {
  if (!report.results.simulatedCases.length) return `<p>${labText("Nessun esercizio simulato in questo percorso. Quiz e testi non sono esecuzioni.", "No simulated exercises in this path. Questions and text are not executions.")}</p>`;
  const s = report.results.simulatedSummary;
  const bands = { retry: labText("Esercizi da riprovare", "Retry the exercises"), partial: labText("Esiti parziali", "Partial outcomes"), conform: labText("Esiti conformi nei casi simulati", "Expected outcomes in simulated cases"), critical: labText("Decisione critica da rivedere", "Review a critical decision") };
  return `<p>${labText("Esiti di simulazioni locali con dati sintetici; non attestano prestazioni in produzione. Il credito E resta separato dai quesiti Q.", "Outcomes from local simulations with synthetic data; they do not establish production performance. E credit stays separate from Q questions.")}</p><p class="evidence-value">${s.value === null ? "—" : `${Math.round(s.value)}/100`}</p><p><strong>${escapeHtml(bands[s.band] || labText("Laboratorio incompleto", "Incomplete lab"))}</strong> · ${s.completedCases}/${s.expectedCases} ${labText("casi completati", "cases completed")}</p>
    <p>${labText("Credito grezzo confermato", "Confirmed raw credit")}: ${s.credit}/${s.maxCredit}. ${labText("Percentuale solo con entrambi i casi completi. Un errore critico prevale sulla fascia senza cancellare il credito. Soglie editoriali: meno di 50 riprovare; 50–79 parziale; da 80 conforme con almeno 4/6 in ogni caso.", "Percentage requires both complete cases. A critical error overrides the band without removing raw credit. Editorial thresholds: below 50 retry; 50–79 partial; 80 or above conforming with at least 4/6 in each case.")}</p>
    ${report.results.simulatedCases.map(c => `<article class="analysis-item"><h3>${escapeHtml(c.title)} · ${c.credit}/${c.maxCredit}</h3><p class="small">${escapeHtml(c.caseId === "K1" ? `${labText("Fonte originale: righe", "Original source: rows")} ${c.initialState.rows.join(", ")}; ${labText("totale bozza", "draft total")}: ${c.initialState.draftTotal}.` : `${labText("Ricevuta originale", "Original receipt")}: ${c.initialState.receipt}.`)}</p><p>${c.status === "complete" ? labText("Caso completato", "Case complete") : labText("Caso incompleto: credito riferito alle sole decisioni valide", "Incomplete case: credit covers valid decisions only")}</p><p class="answer-text">${escapeHtml(labEffectText(c))}</p>${c.criticalFindings.map(f => `<p class="evidence-note"><strong>${escapeHtml(f.code)}</strong> · ${escapeHtml(f.decisionId)}: ${escapeHtml(f.effect)}</p>`).join("")}
    <details><summary>${labText("Decisioni e credito parziale", "Decisions and partial credit")}</summary>${c.decisions.map(d => `<div class="analysis-item"><h4>${escapeHtml(d.title || d.decisionId)}</h4><p>${d.credit === null ? labText("Mancante o non valida", "Missing or invalid") : `${d.credit}/${d.maxCredit}`} · ${escapeHtml(d.actionLabel)}</p><p>${escapeHtml(d.explanation)}</p></div>`).join("")}</details></article>`).join("")}`;
}
