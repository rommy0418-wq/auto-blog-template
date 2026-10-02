import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('published meeting experiment contains five complete independent records', () => {
  const data = JSON.parse(readFileSync('public/downloads/meeting-lab/results.json', 'utf8'));
  assert.equal(data.synthetic, true);
  assert.equal(data.results.length, 5);
  assert.equal(new Set(data.results.map((r: { id: string }) => r.id)).size, 5);
  for (const row of data.results) {
    assert.ok(row.input.length > 20);
    assert.ok(row.output.length > 20);
    assert.ok(Number.isFinite(Date.parse(row.started)));
    assert.equal(row.checks.length, 3);
  }
});
test('lab and resources are linked and discoverable', () => {
  for (const file of ['src/app/page.tsx', 'src/components/Footer.tsx', 'src/app/sitemap.ts']) {
    assert.match(readFileSync(file, 'utf8'), /\/resources/);
  }
  assert.match(readFileSync('src/app/sitemap.ts', 'utf8'), /\/labs\/meeting-notes/);
  assert.match(readFileSync('src/app/labs/meeting-notes/page.tsx', 'utf8'), /독립적인 전문가 검증은 아닙니다/);
});
