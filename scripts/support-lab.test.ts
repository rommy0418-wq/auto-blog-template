import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path: string) => readFileSync(path, 'utf8');
const original = JSON.parse(read('public/downloads/support-lab/results.json'));
const retry = JSON.parse(read('public/downloads/support-lab/retries.json'));
test('support lab preserves failed attempts and consistent retry inputs', () => {
  assert.equal(original.synthetic, true);
  assert.equal(original.results.length, 5);
  assert.equal(new Set(original.results.map((r: {id: string}) => r.id)).size, 5);
  assert.equal(retry.results.length, 3);
  assert.equal(original.prompt, retry.prompt);
  assert.equal(original.policy, retry.policy);
  for (const row of retry.results) {
    const prior = original.results.find((r: {id: string}) => r.id === row.id);
    assert.equal(prior.status, 'error');
    assert.equal(prior.input, row.input);
    assert.deepEqual(prior.checks, row.checks);
    assert.ok(Date.parse(row.started) > Date.parse(prior.started));
  }
  const latest = original.results.map((r: {id: string}) => retry.results.find((x: {id: string}) => x.id === r.id) ?? r);
  assert.equal(latest.filter((r: {status: string}) => r.status === 'response').length, 3);
});
test('support page discloses missing results and links actual downloadable evidence', () => {
  const page = read('src/app/labs/customer-support/page.tsx');
  assert.match(page, /HTTP 503/);
  assert.match(page, /HTTP 429/);
  assert.match(page, /응답 원문을 확보한 것은 3종/);
  assert.match(page, /독립적인 전문가 검증은 아닙니다/);
  for (const match of page.matchAll(/href="(\/downloads\/[^" ]+)"/g)) assert.ok(read(`public${match[1]}`).length > 50);
  assert.match(read('src/app/resources/page.tsx'), /\/labs\/customer-support/);
  assert.match(read('src/app/sitemap.ts'), /\/labs\/customer-support/);
});
