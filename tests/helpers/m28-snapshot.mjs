import { createHash } from "node:crypto";

export function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function snapshotForms(runtime, { bankVersion } = {}) {
  runtime.context.snapshotBankVersion = bankVersion;
  return runtime.run(`(() => {
    const forms = {};
    for (const language of ['it', 'en']) for (const form of FORM_IDS) {
      state.language = language;
      const modes = {};
      for (const mode of TEST_MODES) {
        let seed = 28;
        Math.random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
        state.selectedModeId = mode.id;
        writeFormCycle(language, mode.id, { remaining: [form], last: null });
        startAssessment();
        if (snapshotBankVersion && mode.type !== 'learning') state.meta.questionBankVersion = snapshotBankVersion;
        state.answers = Object.fromEntries(questions.map((question, index) =>
          [question.id, choose(question, index % 3 !== 1)]));
        const report = calculateResults();
        // Compare fixed report content across app versions and successive sessions.
        for (const key of ['assessmentVersion', 'sessionId', 'startedAt', 'completedAt']) delete report.meta[key];
        modes[mode.id] = { questions, report, csvRows: core.csvRows(report) };
      }
      const bank = language === 'en' ? buildEnglishQuestionForm(form) : buildQuestionForm(form);
      forms[language + ':' + form] = {
        bank: bank.map(question => [question, core.ITEM_MAP[question.sourceId]]),
        ...modes
      };
    }
    return forms;
  })()`);
}

export function scoringSignatures(runtime) {
  const rules = question => [question.id, question.type, question.proceedChars,
    question.options?.map(option => [option.score, option.correct, option.value]), question.rubric];
  return Object.fromEntries(Object.entries(snapshotForms(runtime)).map(([form, { bank, ...modes }]) => [form, digest({
    bank: bank.map(([question, classification]) => [rules(question), classification]),
    modes: Object.entries(modes).map(([mode, { questions, report }]) => [mode, questions.map(rules),
      report.answers.map(answer => [answer.id, answer.credit, answer.score, answer.correct, answer.declaredValue]),
      report.correctCount, report.recommendedUnitIds, report.results?.knowledgeByArea,
      report.results?.declaredContrasts, report.results?.simulatedSummary, report.coverage])
  })]));
}
