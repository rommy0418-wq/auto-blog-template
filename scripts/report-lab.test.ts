import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p: string) => readFileSync(p, 'utf8');
const base = 'public/downloads/report-lab/';
test('report evidence exactly preserves published input and prompt', () => {
  const data = JSON.parse(read(base + 'result.json'));
  assert.equal(data.source, read(base + 'source.txt'));
  assert.equal(data.prompt, read(base + 'prompt.txt'));
  assert.equal(data.synthetic, true);
  assert.match(data.output, /높은 처리율/);
  const failure = JSON.parse(read(base + 'failed-1790945385133.json'));
  assert.equal(failure.status, 429);
  assert.ok(Date.parse(failure.started) < Date.parse(data.started));
});
test('report review arithmetic and evidence links are consistent', () => {
  assert.equal(28 / 40 * 100, 70);
  assert.equal((28 + 5) / (40 + 8) * 100, 68.75);
  assert.equal(40 + 8 - 28 - 5, 15);
  const checklist = read(base + 'checklist.txt');
  for (const n of ['68.75%', '320,000', '230,000']) assert.ok(checklist.includes(n));
  for (const file of ['source.txt', 'prompt.txt', 'checklist.txt', 'edited-report.txt']) assert.ok(read(base + file).length > 100);
  const page = read('src/app/labs/weekly-report/page.tsx');
  for (const link of page.matchAll(/href="(\/downloads\/[^" ]+)"/g)) assert.ok(read('public' + link[1]).length > 10);
  assert.match(read('src/app/resources/page.tsx'), /\/labs\/weekly-report/);
  assert.match(read('src/app/sitemap.ts'), /\/labs\/weekly-report/);
});
