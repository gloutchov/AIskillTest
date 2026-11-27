import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { digest, snapshotForms } from "./helpers/m28-snapshot.mjs";
import { runtime } from "./helpers/runtime.mjs";

const read = path => fs.readFileSync(new URL(path, import.meta.url), "utf8");
const baseline = JSON.parse(read("./fixtures/m28-baseline.json"));

test("the active bank and all 84 paths retain their 3.5.5 questions, results and CSV fields", () => {
  const forms = snapshotForms(runtime());
  assert.deepEqual(Object.keys(forms), Object.keys(baseline.hashes));
  for (const [form, snapshots] of Object.entries(forms)) {
    assert.deepEqual(Object.keys(snapshots), Object.keys(baseline.hashes[form]), form);
    for (const [mode, snapshot] of Object.entries(snapshots)) {
      assert.equal(digest(snapshot), baseline.hashes[form][mode], `${form} ${mode}`);
    }
  }
});

test("AG1–AG15 retain their original content only in the archive", () => {
  const archive = JSON.parse(read("../docs/archive/agents-original.json"));
  assert.deepEqual(archive.source, baseline.source);
  assert.deepEqual(archive.items.map(item => item.question.id), Array.from({ length: 15 }, (_, index) => `AG${index + 1}`));
  assert.equal(digest(archive.items), baseline.archivedItems);

  const html = read("../ai_skill_test.html");
  assert.doesNotMatch(html, /agents-original\.json/);
  for (const [, script] of html.matchAll(/<script src="([^?"]+)/g)) {
    assert.doesNotMatch(read(`../${script}`), /\bAG\d+\b|agents-original\.json/, script);
  }
});
