import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config({ path: '.env.local', quiet: true });
const digest = (row: Record<string, unknown>) => createHash('sha256').update(JSON.stringify([row.title, row.content, row.meta_description, row.keywords, row.status])).digest('hex');
async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    if (process.argv.includes('--snapshot')) {
      const { rows } = await pool.query("SELECT * FROM posts WHERE status='published' ORDER BY slug");
      const dir = mkdtempSync(join(tmpdir(), 'blog-full-review-'));
      writeFileSync(join(dir, 'originals.json'), JSON.stringify(rows.map(r => ({ ...r, reviewHash: digest(r) })), null, 2), { mode: 0o600 });
      console.log(JSON.stringify({ snapshot: join(dir, 'originals.json'), total: rows.length }));
      return;
    }
    const source = process.argv.find(a => a.startsWith('--snapshot='))?.split('=').slice(1).join('=');
    const manifest = process.argv.find(a => a.startsWith('--manifest='))?.split('=').slice(1).join('=');
    assert.ok(source && manifest, 'Snapshot and reviewed manifest required');
    const originals = JSON.parse(readFileSync(source, 'utf8'));
    const changes = JSON.parse(readFileSync(manifest, 'utf8')).map((r: { slug: string; title: string; meta: string; keywords: string; file: string }) => ({ ...r, content: readFileSync(r.file, 'utf8').trim() }));
    assert.equal(new Set(changes.map((r: {slug: string}) => r.slug)).size, changes.length);
    for (const c of changes) {
      assert.ok(originals.some((o: {slug: string}) => o.slug === c.slug));
      assert.ok(c.title.length > 10 && c.meta.length > 30 && c.content.length > 1800, `Incomplete ${c.slug}`);
      assert.ok(c.content.includes('편집 정정') && c.content.includes('https://'), `Missing provenance ${c.slug}`);
      assert.ok(!/<script|<iframe|onerror\s*=|javascript:/i.test(c.content));
    }
    if (!process.argv.includes('--apply')) { console.log(JSON.stringify({ validated: changes.map((c: {slug: string}) => c.slug) })); return; }
    assert.ok(process.env.ADMIN_API_KEY);
    const client = await pool.connect();
    const refreshed: {id: number; meta: string}[] = [];
    try {
      await client.query('BEGIN');
      const { rows } = await client.query("SELECT * FROM posts WHERE slug=ANY($1) FOR UPDATE", [changes.map((c: {slug: string}) => c.slug)]);
      assert.equal(rows.length, changes.length);
      const pending = changes.filter((c: {slug: string; title: string; content: string; meta: string; keywords: string}) => {
        const row = rows.find(r => r.slug === c.slug);
        if (row.title === c.title && row.content === c.content && row.meta_description === c.meta && row.keywords === c.keywords) { refreshed.push({id: row.id, meta: c.meta}); return false; }
        assert.equal(digest(row), originals.find((r: {slug: string}) => r.slug === c.slug).reviewHash, `Concurrent edit: ${c.slug}`);
        return true;
      });
      const backup = join(mkdtempSync(join(tmpdir(), 'blog-review-apply-')), 'originals.json');
      writeFileSync(backup, JSON.stringify(rows, null, 2), { mode: 0o600 });
      for (const c of pending) {
        const row = rows.find(r => r.slug === c.slug);
        await client.query('UPDATE posts SET title=$1, content=$2, meta_description=$3, keywords=$4, upgraded_at=NOW(), updated_at=NOW() WHERE id=$5', [c.title, c.content, c.meta, c.keywords, row.id]);
        refreshed.push({ id: row.id, meta: c.meta });
      }
      await client.query('COMMIT');
      console.log(JSON.stringify({ applied: pending.length, unchanged: changes.length - pending.length, backup }));
    } catch (e) { await client.query('ROLLBACK'); throw e; } finally { client.release(); }
    for (const r of refreshed) {
      const response = await fetch(`https://aitrans-lab.com/api/posts/${r.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.ADMIN_API_KEY}` }, body: JSON.stringify({ meta_description: r.meta }) });
      assert.ok(response.ok, `Saved; cache refresh failed: ${r.id} ${response.status}`);
    }
    console.log(`Verified cache refreshes: ${refreshed.length}`);
  } finally { await pool.end(); }
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
