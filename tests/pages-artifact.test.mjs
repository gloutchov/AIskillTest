import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const entryPoints = ["index.html", "ai_skill_test.html"];

test("Pages stages exactly the entry points, their runtime resources, and the license", t => {
  const staging = mkdtempSync(join(tmpdir(), "aiskilltest-pages-test-"));
  t.after(() => rmSync(staging, { recursive: true, force: true }));
  const artifact = execFileSync(process.execPath, ["scripts/build-pages-artifact.mjs"], {
    cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, TMPDIR: staging, TEMP: staging, TMP: staging }
  }).trim();

  const expected = new Set([...entryPoints, "LICENSE"]);
  for (const page of entryPoints) {
    const html = readFileSync(join(root, page), "utf8");
    for (const [, url] of html.matchAll(/<(?:script|link)\b[^>]*\b(?:src|href)="([^"]+)"/gi)) {
      assert.match(url, /^(?:assets\/[a-z0-9-]+\.(?:js|css)|aiskilltest_icon\.png)\?v=\d+\.\d+\.\d+$/);
      expected.add(url.split("?")[0]);
    }
  }
  const entries = readdirSync(artifact, { recursive: true, withFileTypes: true });
  assert.deepEqual(entries.filter(entry => entry.isDirectory()).map(entry => entry.name), ["assets"]);
  const files = entries.filter(entry => !entry.isDirectory()).map(entry => {
    assert.ok(entry.isFile(), `Expected a regular file: ${entry.name}`);
    return entry.parentPath === artifact ? entry.name : `assets/${entry.name}`;
  }).sort();
  assert.deepEqual(files, [...expected].sort());
  for (const file of files) assert.deepEqual(readFileSync(join(artifact, file)), readFileSync(join(root, file)), file);
});

test("Pages refuses an assets directory symlink that leaves the source tree", t => {
  const fixture = mkdtempSync(join(tmpdir(), "aiskilltest-pages-fixture-"));
  t.after(() => rmSync(fixture, { recursive: true, force: true }));
  const scripts = join(fixture, "source", "scripts");
  const external = join(fixture, "external-assets");
  mkdirSync(scripts, { recursive: true });
  mkdirSync(external);
  symlinkSync(external, join(scripts, "..", "assets"), "junction");
  const builder = join(scripts, "build-pages-artifact.mjs");
  copyFileSync(join(root, "scripts", "build-pages-artifact.mjs"), builder);

  const result = spawnSync(process.execPath, [builder], { encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /The Pages assets directory must be a real directory/);
  assert.equal(result.stdout, "");
});

test("both Pages entry points deliver their strict policy before resources", () => {
  for (const page of entryPoints) {
    const html = readFileSync(join(root, page), "utf8");
    const match = /<meta http-equiv="Content-Security-Policy" content="([^"]+)"/.exec(html);
    assert.ok(match && match.index < html.search(/<(?:link|script)\b/), page);
    const common = {
      "default-src": "'none'", "style-src": "'self'", "img-src": "'self'",
      "base-uri": "'none'", "form-action": "'none'"
    };
    const required = page === "ai_skill_test.html" ? {
      ...common, "script-src": "'self'", "connect-src": "'none'", "worker-src": "'none'",
      "style-src-attr": "'unsafe-inline'"
    } : common;
    const directives = match[1].split(";").map(part => part.trim().split(/\s+/)).map(([key, ...values]) => [key, values.join(" ")]);
    assert.deepEqual(Object.fromEntries(directives), required);
    assert.doesNotMatch(html, /<style\b/i);
    for (const [, attributes, text] of html.matchAll(/<script\b([^>]*)>([^<]*)<\/script>/gi)) {
      assert.match(attributes, /\bsrc="assets\//);
      assert.equal(text.trim(), "");
    }
  }
});
