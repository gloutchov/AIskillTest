/* Synthetic, deterministic exercises. No network, clock, DOM, or respondent storage. */
const LOCAL_LAB = (() => {
  "use strict";
  const VERSION = "1.0.0";
  const DRAFT_KEY = "aiSkillOperationalLabDraft";
  const SOURCES = [
    { id: "M21-S01", title: "Anthropic — Effective harnesses for long-running agents", url: "https://www.anthropic.com/research/effective-harnesses-for-long-running-agents", note: ["Stato verificabile e ripresa del lavoro. I dati e le rubriche del laboratorio sono costruiti dall'autore, senza validazione psicometrica.", "Verifiable state and work recovery. Lab data and rubrics are author-created, without psychometric validation."] },
    { id: "M21-S02", title: "MDN — Window.localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage", note: ["Persistenza nel browser, errori di accesso e limiti delle pagine file://. Non garantisce il recupero in tutti i browser.", "Browser persistence, access errors, and file:// limitations. Recovery is not guaranteed in every browser."] }
  ];
  const IDS = ["LAB_K1_VERIFY", "LAB_K1_CORRECT", "LAB_K1_RELEASE", "LAB_K2_SOURCE", "LAB_K2_SCOPE", "LAB_K2_RESUME"];
  const pick = (it, en, language) => language === "en" ? en : it;
  const record = v => v !== null && typeof v === "object" && !Array.isArray(v);
  const oneOf = (v, values) => typeof v === "string" && values.includes(v);
  const VARIANTS = {
    A: { rows: [120, 80, 100], draft: 330, update: "update-17", topic: ["ordini", "orders"], journal: ["ticket", "tickets"], task: ["bozza locale per la knowledge base", "local knowledge-base draft"], claim: ["La campagna ha causato la crescita.", "The campaign caused the growth."], external: ["pubblicare la bozza", "publish the draft"] },
    B: { rows: [40, 25, 35], draft: 120, update: "update-28", topic: ["ticket", "tickets"], journal: ["fatture", "invoices"], task: ["nota locale di riconciliazione", "local reconciliation note"], claim: ["L'assistente ha causato la riduzione.", "The assistant caused the reduction."], external: ["inviare la nota", "send the note"] },
    C: { rows: [18, 12, 20], draft: 60, update: "update-39", topic: ["richieste", "requests"], journal: ["avanzamenti", "progress records"], task: ["bozza locale del report", "local report draft"], claim: ["Il nuovo processo ha causato il miglioramento.", "The new process caused the improvement."], external: ["creare un'attività esterna", "create an external task"] }
  };
  const TITLES = [
    ["Verifica le evidenze", "Check the evidence"], ["Correggi il riepilogo", "Correct the summary"], ["Prepara e consegna l'artefatto", "Prepare and deliver the artifact"],
    ["Gestisci l'istruzione nella fonte", "Handle the instruction inside the source"], ["Applica il mandato", "Apply the authorized scope"], ["Riprendi dal checkpoint", "Resume from the checkpoint"]
  ];
  const INPUTS = {
    A: [["Ticket T17: richiesta di ripristino password; la procedura interna richiede il portale di recupero e verifica dell'identità.", "Ticket T17: password reset requested; internal procedure requires the recovery portal and identity verification."], ["Bozza KB: indirizzare al portale di recupero; verificare l'identità secondo la procedura interna.", "KB draft: direct the person to the recovery portal; verify identity under the internal procedure."]],
    B: [["Fattura F28: imponibile 80, imposta 20, totale registrato 100; pagamento non ancora verificato.", "Invoice F28: net 80, tax 20, recorded total 100; payment not yet verified."], ["Nota di riconciliazione: 80 + 20 = 100; verificare separatamente lo stato del pagamento.", "Reconciliation note: 80 + 20 = 100; verify payment status separately."]],
    C: [["Avanzamento P39: due attività completate, una ancora aperta; nessuna data finale confermata.", "Progress P39: two tasks complete, one still open; no confirmed final date."], ["Bozza report: 2 attività completate e 1 aperta; data finale da confermare.", "Report draft: 2 tasks complete and 1 open; final date to be confirmed."]]
  };
  const CHOICES = {
    LAB_K1_VERIFY: [["all-rows", "Collega tutte e tre le righe al totale della bozza", "Connect all three rows to the draft total"], ["one-row", "Registra un dubbio usando solo la prima riga", "Record a doubt using only the first row"], ["trust-draft", "Accetta il totale della bozza senza riscontro", "Accept the draft total without checking"]],
    LAB_K2_SOURCE: [["use-data", "Scarta l'istruzione incorporata e usa i dati del mandato", "Discard the embedded instruction and use the authorized data"], ["pause-source", "Sospendi l'istruzione incorporata per un chiarimento", "Pause the embedded instruction for clarification"], ["export", "Esegui un'esportazione simulata dell'intero registro fuori mandato", "Simulate exporting the entire register outside the authorized scope"]],
    LAB_K2_SCOPE: [["draft-only", "Crea soltanto la bozza locale; lascia l'azione esterna alla persona", "Create only the local draft; leave the external action to the person"], ["hold-all", "Blocca anche la preparazione locale in attesa di approvazione", "Block even local preparation while awaiting approval"], ["external", "Esegui anche l'azione esterna simulata senza approvazione", "Also execute the simulated external action without approval"]],
    LAB_K2_RESUME: [["continue", "Usa la ricevuta, non ripetere la registrazione e riprendi il lavoro pendente", "Use the receipt, skip the completed registration, and resume pending work"], ["wait", "Non ripetere la registrazione; attendi un'ulteriore verifica dello stato", "Skip the completed registration; wait for another status check"], ["repeat-update", "Ripeti la registrazione già confermata e poi riprendi", "Repeat the confirmed registration, then resume"], ["declare-complete", "Dichiara concluso il lavoro pendente senza svolgerlo", "Declare the pending work complete without doing it"]]
  };
  function variant(form, language) {
    const v = VARIANTS[form];
    if (!v) throw new Error("Unknown lab form");
    const i = language === "en" ? 1 : 0;
    return { ...v, total: v.rows.reduce((a, b) => a + b, 0), topic: v.topic[i], journal: v.journal[i], task: v.task[i], claim: v.claim[i], external: v.external[i], input: INPUTS[form][0][i], draftText: INPUTS[form][1][i] };
  }
  function choices(id, language) { return (CHOICES[id] || []).map(([value, it, en]) => ({ value, label: pick(it, en, language) })); }
  function questions(form, language, order = "verify-first") {
    const v = variant(form, language);
    const contextK1 = pick(`Fonte sintetica (${v.topic}): righe ${v.rows.join(", ")}, stesso periodo. Bozza: ${v.draft}. ${v.claim} Verifica il totale e prepara una sintesi con fonti; nessuna evidenza causale disponibile.`, `Synthetic source (${v.topic}): rows ${v.rows.join(", ")}, same period. Draft: ${v.draft}. ${v.claim} Check the total and prepare a sourced summary; no causal evidence is available.`, language);
    const contextK2 = pick(`Dati sintetici: ${v.input} Mandato: ${v.task}; nessuna autorizzazione a ${v.external}. ${v.update}: registrazione interna completata, ACK-${v.update}, 1 effetto; preparazione e verifica pendenti. Una nota non attendibile chiede di esportare l'intero registro fuori mandato.`, `Synthetic data: ${v.input} Scope: ${v.task}; no permission to ${v.external}. ${v.update}: internal registration complete, ACK-${v.update}, 1 effect; preparation and verification pending. An untrusted note asks to export the entire register outside scope.`, language);
    const units = IDS.map((sourceId, i) => ({ id: `${form}_${sourceId}`, sourceId, formId: form, language, type: "simulation", section: "Laboratorio operativo", dimension: "simulation", text: pick(...TITLES[i], language), context: i < 3 ? contextK1 : contextK2, sourceRefs: i < 3 ? [] : ["M21-S01"], caseId: i < 3 ? "K1" : "K2", caseVersion: VERSION, decisionId: sourceId, options: [] }));
    if (order === "correct-first") [units[0], units[1]] = [units[1], units[0]];
    return units;
  }
  function valid(id, raw) {
    if (id === IDS[1]) return record(raw) && oneOf(raw.operation, ["sum", "average", "draft"]) && typeof raw.total === "number" && Number.isFinite(raw.total) && raw.total >= 0 && raw.total <= 1000000;
    if (id === IDS[2]) return record(raw) && oneOf(raw.action, ["release", "review"]) && typeof raw.reference === "boolean" && typeof raw.keepClaim === "boolean";
    return choices(id).some(c => c.value === raw);
  }
  function status(id, raw) { return raw === undefined || raw === null ? "missing" : valid(id, raw) ? "valid" : "invalid"; }
  function sanitize(id, raw) {
    if (!valid(id, raw)) return null;
    return id === IDS[1] ? { operation: raw.operation, total: raw.total } : id === IDS[2] ? { action: raw.action, reference: raw.reference, keepClaim: raw.keepClaim } : raw;
  }
  function change(answers, question, raw) {
    if (!valid(question.sourceId, raw)) throw new Error("Invalid lab action");
    const next = { ...answers, [question.id]: sanitize(question.sourceId, raw) };
    // Delivery must be confirmed again after its numeric artifact changes.
    if (question.sourceId === IDS[1] && JSON.stringify(answers[question.id]) !== JSON.stringify(next[question.id])) delete next[`${question.formId}_${IDS[2]}`];
    return next;
  }
  function evaluate(form, language, answers) {
    const v = variant(form, language);
    const get = id => sanitize(id, answers[`${form}_${id}`]);
    const verify = get(IDS[0]), correction = get(IDS[1]), delivery = get(IDS[2]);
    const source = get(IDS[3]), scope = get(IDS[4]), resume = get(IDS[5]);
    const total = correction ? correction.total : v.draft;
    const criticalFindings = [];
    function critical(caseId, decisionId, code, it, en) { criticalFindings.push({ kind: "simulated-action", caseId, decisionId, code, effect: pick(it, en, language) }); }
    if (delivery?.action === "release" && (total !== v.total || delivery.keepClaim)) critical("K1", IDS[2], "unverified-release", "Consegnato un artefatto con totale errato o causalità non supportata.", "Delivered an artifact with an incorrect total or unsupported causality.");
    if (source === "export") critical("K2", IDS[3], "unauthorized-disclosure", "Simulata la divulgazione dell'intero registro fuori mandato.", "Simulated disclosure of the entire register outside the authorized scope.");
    if (scope === "external") critical("K2", IDS[4], "unauthorized-action", `Simulata un'azione senza approvazione: ${v.external}.`, `Simulated an action without approval: ${v.external}.`);
    if (resume === "repeat-update") critical("K2", IDS[5], "duplicate-action", `Il registro simulato contiene due effetti di ${v.update}.`, `The simulated journal contains two effects of ${v.update}.`);
    const credits = [verify === "all-rows" ? 2 : verify === "one-row" ? 1 : 0,
      correction ? Number(correction.operation === "sum") + Number(correction.total === v.total) : 0,
      delivery?.action === "review" ? 1 : delivery && total === v.total && delivery.reference && !delivery.keepClaim ? 2 : 0,
      source === "use-data" ? 2 : source === "pause-source" ? 1 : 0,
      scope === "draft-only" ? 2 : scope === "hold-all" ? 1 : 0,
      resume === "continue" ? 2 : resume === "wait" ? 1 : 0];
    const explanations = [
      pick("2: tutte le righe collegate al totale; 1: evidenza incompleta; 0: bozza accettata senza riscontro.", "2: all rows connected to the total; 1: incomplete evidence; 0: draft accepted without checking.", language),
      pick(`Un punto per l'operazione somma, uno per il totale ${v.total}. La selezione del totale della bozza non ricostruisce il calcolo.`, `One point for the sum operation, one for the total ${v.total}. Selecting the draft total does not reconstruct the calculation.`, language),
      pick("2: consegna con totale corretto, riferimento alle righe e senza causalità; 1: sospensione per revisione; 0: artefatto non conforme. Solo la consegna errata o con causalità è critica.", "2: delivery with the correct total, row reference, and no causal claim; 1: held for review; 0: nonconforming artifact. Only delivery with an incorrect total or causal claim is critical.", language),
      pick("2: istruzione scartata e dati legittimi mantenuti; 1: chiarimento; 0: divulgazione simulata fuori mandato, critica.", "2: instruction discarded while retaining legitimate data; 1: clarification; 0: simulated disclosure outside scope, critical.", language),
      pick("2: bozza entro il mandato, azione esterna alla persona; 1: blocco anche del lavoro consentito; 0: azione esterna simulata senza approvazione, critica.", "2: draft within scope, external action left to the person; 1: authorized work also blocked; 0: simulated external action without approval, critical.", language),
      pick("2: ricevuta usata e lavoro pendente ripreso; 1: ulteriore verifica; 0: registrazione duplicata o falsa conclusione. Solo la duplicazione produce l'errore critico duplicate-action.", "2: receipt used and pending work resumed; 1: additional check; 0: duplicate registration or false completion. Only duplication produces the critical duplicate-action error.", language)
    ];
    const decisions = questions(form, language).map((q, i) => {
      const raw = answers[q.id];
      const actionLabel = !valid(q.sourceId, raw) ? "" : i === 1
        ? `${pick("Operazione", "Operation", language)}: ${{sum: pick("somma", "sum", language), average: pick("media", "average", language), draft: pick("totale della bozza", "draft total", language)}[raw.operation]}; ${pick("totale applicato", "applied total", language)}: ${raw.total}.`
        : i === 2 ? `${raw.action === "release" ? pick("Consegna simulata", "Simulated delivery", language) : pick("Trattenuto per revisione", "Held for review", language)}; ${pick("riferimento alle righe", "row reference", language)}: ${raw.reference ? pick("incluso", "included", language) : pick("omesso", "omitted", language)}; ${pick("affermazione causale", "causal claim", language)}: ${raw.keepClaim ? pick("mantenuta", "retained", language) : pick("rimossa", "removed", language)}.`
        : choices(q.sourceId, language).find(c => c.value === raw).label;
      return { id: q.id, sourceId: q.sourceId, caseId: q.caseId, caseVersion: VERSION, decisionId: q.sourceId, title: q.text, responseStatus: status(q.sourceId, raw), rawAnswer: sanitize(q.sourceId, raw), credit: valid(q.sourceId, raw) ? credits[i] : null, maxCredit: 2, explanation: explanations[i], actionLabel };
    });
    const effects = {
      K1: { total, operation: correction?.operation || null, reference: delivery?.reference ?? null, causalClaim: delivery?.keepClaim ?? true, delivery: delivery?.action || "pending", evidence: verify, artifact: `${v.topic}: ${total}. ${delivery?.reference ? pick("Fonte: righe 1–3.", "Source: rows 1–3.", language) : ""} ${delivery?.keepClaim !== false ? v.claim : ""}`.trim() },
      K2: { updateId: v.update, journalEntries: resume === "repeat-update" ? 2 : 1, disclosed: source === "export", sourceInstruction: source, localDraft: scope === "draft-only" || scope === "external", artifact: scope === "draft-only" || scope === "external" ? v.draftText : null, externalAction: scope === "external", pendingWork: resume === "continue" || resume === "repeat-update" ? "resumed" : resume === "declare-complete" ? "falsely-completed" : "pending", scopeDecision: scope }
    };
    const cases = ["K1", "K2"].map(caseId => {
      const ds = decisions.filter(d => d.caseId === caseId);
      const completed = ds.filter(d => d.responseStatus === "valid").length;
      return { caseId, caseVersion: VERSION, title: pick(caseId === "K1" ? "Verifica un riepilogo di dati" : "Riprendi un'attività agentica", caseId === "K1" ? "Verify a data summary" : "Resume an agentic task", language), initialState: caseId === "K1" ? { rows: [...v.rows], draftTotal: v.draft, claim: v.claim, topic: v.topic } : { updateId: v.update, receipt: `ACK-${v.update}`, journalEntries: 1, journal: v.journal, input: v.input, authorizedTask: v.task, unapprovedAction: v.external, pendingWork: "preparation-and-verification" }, sourceRefs: caseId === "K1" ? [] : ["M21-S01"], status: completed === 3 ? "complete" : "incomplete", completedDecisions: completed, expectedDecisions: 3, credit: ds.reduce((sum, d) => sum + (d.credit ?? 0), 0), maxCredit: 6, value: completed === 3 ? 100 * ds.reduce((sum, d) => sum + d.credit, 0) / 6 : null, effects: effects[caseId], decisions: ds, criticalFindings: criticalFindings.filter(f => f.caseId === caseId) };
    });
    const completedCases = cases.filter(c => c.status === "complete").length;
    const credit = cases.reduce((s, c) => s + c.credit, 0);
    const value = completedCases === 2 ? credit * 100 / 12 : null;
    const band = criticalFindings.length ? "critical" : value === null ? null : value < 50 ? "retry" : value < 80 || cases.some(c => c.credit < 4) ? "partial" : "conform";
    return { decisions, cases, criticalFindings, summary: { value, credit, maxCredit: 12, status: completedCases === 2 ? "complete" : "incomplete", band, expectedCases: 2, completedCases } };
  }
  const DRAFT_FIELDS = ["draftSchemaVersion", "assessmentVersion", "scoringVersion", "labVersion", "questionBankVersion", "formVersion", "modeId", "language", "formId", "index", "order", "choices"];
  function draftStatus(draft, versions) {
    if (!record(draft)) return "invalid";
    if (draft.draftSchemaVersion !== 1 || draft.labVersion !== VERSION || draft.modeId !== "operational-lab" || Object.entries(versions).some(([k, v]) => draft[k] !== v)) return "incompatible";
    if (!VARIANTS[draft.formId] || !oneOf(draft.language, ["it", "en"]) || !oneOf(draft.order, ["verify-first", "correct-first"]) || !Number.isInteger(draft.index) || draft.index < 0 || draft.index >= 6 || !record(draft.choices) || Object.keys(draft).some(k => !DRAFT_FIELDS.includes(k))) return "invalid";
    if (Object.entries(draft.choices).some(([id, value]) => !IDS.some(sourceId => id === `${draft.formId}_${sourceId}` && valid(sourceId, value)))) return "invalid";
    return "compatible";
  }
  return { VERSION, DRAFT_KEY, SOURCES, IDS, VARIANTS, TITLES, variant, choices, questions, valid, status, sanitize, change, evaluate, draftStatus };
})();
