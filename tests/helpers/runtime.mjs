import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { webcrypto } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');

export function runtime({ assetReader = read, storage = new Map(), locks = { request: (_name, action) => Promise.resolve(action()) } } = {}) {
  const nodes = new Map();
  const timers = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, { innerHTML: "", textContent: "", value: "", style: {}, dataset: {}, events: {},
      addEventListener(type, callback) { this.events[type] = callback; }, focus() { this.focused = true; }, setAttribute() {}, querySelectorAll() { return []; }, classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } } });
    return nodes.get(id);
  };
  const window = { scrollTo() {}, print() {}, confirm() { return true; }, setTimeout(fn) { timers.set(timers.size + 1, fn); return timers.size; }, clearTimeout(id) { timers.delete(id); }, setInterval() { return 1; }, clearInterval() {},
    events: new Map(), addEventListener(type, fn) { this.events.set(type, fn); }, removeEventListener(type) { this.events.delete(type); } };
  const context = vm.createContext({ console: { warn() {} }, window, crypto: webcrypto, navigator: { language: "it", languages: ["it"], locks },
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    document: { getElementById: node, querySelector() { return null; }, querySelectorAll(selector) {
      const historyContainer = /^#(dashboard|introHistory) \[data-history-index\]$/.exec(selector)?.[1];
      if (!historyContainer) return [];
      const prefix = historyContainer === "dashboard" ? "history" : "intro-history";
      return [...node(historyContainer).innerHTML.matchAll(/data-history-index="(\d+)"/g)].map(match => {
        const button = node(`${prefix}-${match[1]}`); button.dataset.historyIndex = match[1]; return button;
      });
    }, documentElement: {} } });
  const scripts = [...assetReader("ai_skill_test.html").matchAll(/<script src="(assets\/[^?]+)\?[^\"]+"><\/script>/g)].map(match => match[1]);
  for (const name of scripts.filter(name => name !== "assets/app.js")) vm.runInContext(assetReader(name), context, { filename: name });
  const app = assetReader("assets/app.js");
  const init = app.lastIndexOf("\n    bindLanguageSwitcher();");
  assert.ok(init > 0);
  vm.runInContext(app.slice(0, init), context, { filename: "app.js (without browser startup)" });
  const run = code => vm.runInContext(code, context);
  run(`globalThis.core = ASSESSMENT_V3; globalThis.bank = baseQuestions; globalThis.appState = state;
    globalThis.meta = { assessmentVersion: APP_VERSION, language: 'it', formId: 'A', formVersion: FORM_VERSION, questionBankVersion: QUESTION_BANK_VERSION, testMode: { id: 'complete', type: 'complete', questionCount: 50 }, selfAssessment: {} };
    globalThis.choose = (q, high = true) => q.type === 'simulation' ? ({LAB_K1_VERIFY: high?'all-rows':'trust-draft', LAB_K1_CORRECT: {operation:high?'sum':'draft',total:high?LOCAL_LAB.variant(q.formId,'it').total:0}, LAB_K1_RELEASE:{action:'release',reference:high,keepClaim:!high}, LAB_K2_SOURCE:high?'use-data':'export', LAB_K2_SCOPE:high?'draft-only':'external', LAB_K2_RESUME:high?'continue':'repeat-update'})[q.sourceId] : q.type === 'likert' ? (high ? 5 : 1) : q.type === 'text' ? q.rubric.criteria.map(c => c.keywords[0]).join(' ') : q.type === 'multi' ? q.options.map((o,i) => ({o,i})).filter(x => high ? x.o.score > 0 : x.o.score < 0).map(x => x.i) : q.options.reduce((best,o,i) => (high ? o.score > q.options[best].score : o.score < q.options[best].score) ? i : best, 0);
    globalThis.full = (high = true) => { const qs = questionsForMode(buildQuestionForm('A'), getModeById('complete')); const answers = Object.fromEntries(qs.map(q => [q.id,choose(q, high)])); return core.evaluate(qs, answers, meta, '2026-11-25T12:00:00Z'); };
  `);
  return { context, run, storage, node, timers, start: () => vm.runInContext(app.slice(init), context) };
}
