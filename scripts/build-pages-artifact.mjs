import { copyFileSync, lstatSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("../", import.meta.url));
const files = [
  "index.html",
  "ai_skill_test.html",
  "aiskilltest_icon.png",
  "LICENSE",
  "assets/redirect.css",
  "assets/styles.css",
  "assets/questions.js",
  "assets/i18n.js",
  "assets/learning.js",
  "assets/modern-ai.js",
  "assets/agentic-workflows.js",
  "assets/harness.js",
  "assets/operational-lab.js",
  "assets/complete-assessment.js",
  "assets/lab-ui.js",
  "assets/assessment.js",
  "assets/report-ui.js",
  "assets/app.js"
];

if (!lstatSync(join(source, "assets")).isDirectory()) {
  throw new Error("The Pages assets directory must be a real directory.");
}
for (const file of files) {
  if (!lstatSync(join(source, file)).isFile()) {
    throw new Error(`Pages source is not a regular file: ${file}`);
  }
}

const output = mkdtempSync(join(tmpdir(), "aiskilltest-pages-"));
try {
  mkdirSync(join(output, "assets"));
  for (const file of files) copyFileSync(join(source, file), join(output, file));
} catch (error) {
  rmSync(output, { recursive: true, force: true });
  throw error;
}

console.error(`Pages artifact (${files.length} files):\n${files.join("\n")}`);
console.log(output);
