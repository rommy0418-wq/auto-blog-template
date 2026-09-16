/** Read-only database/content/public-page audit. Never prints credentials or visitor records. */
import { readFileSync } from 'node:fs';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import assert from 'node:assert/strict';
dotenv.config({ path: '.env.local', quiet: true });
const base = process.argv.find(a => a.startsWith('--base='))?.slice(7) || 'https://aitrans-lab.com';
const snapshotPath = process.argv.find(a => a.startsWith('--snapshot='))?.slice(11);
const privateName = process.env.AUDIT_PRIVATE_NAME;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const errors: string[] = [];
const checked = new Map<string, number>();
const internal = new Set<string>();
const external = new Set<string>();
const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
async function batches<T>(items: T[], fn: (item: T) => Promise<void>) {
  for (let i = 0; i < items.length; i += 5) await Promise.all(items.slice(i, i + 5).map(fn));
}
async function main() {
  const { rows } = await pool.query("SELECT * FROM posts WHERE status='published' ORDER BY slug");
  assert.equal(rows.length, 139, 'Published set changed; review new rows before claiming full coverage');
  const manifests = ['foundation', 'business', 'marketing', 'tools', 'transform'].flatMap(category => JSON.parse(readFileSync(`scripts/editorial/reviewed-${category}/manifest.json`, 'utf8')));
  let equal = 0;
  for (const post of rows) {
    const entry = manifests.find(e => e.slug === post.slug);
    const file = entry?.file || `scripts/editorial/${post.slug}-revised.html`;
    assert.equal(post.content.trim(), readFileSync(file, 'utf8').trim(), `${post.slug} body differs`);
    if (entry) {
      assert.equal(post.title, entry.title, `${post.slug} title differs`);
      assert.equal(post.meta_description, entry.meta, `${post.slug} description differs`);
    }
    if (privateName) assert.ok(!post.content.includes(privateName), 'Public real-name leakage');
    equal++;
  }
  if (snapshotPath) {
    const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'));
    const originals = Array.isArray(snapshot) ? snapshot : snapshot.posts;
    for (const post of rows) {
      const original = originals.find((p: {slug: string}) => p.slug === post.slug);
      assert.ok(original, `${post.slug} missing from snapshot`);
      assert.equal(post.id, original.id);
      assert.equal(new Date(post.published_at).toISOString(), new Date(original.published_at).toISOString());
    }
  }
  console.log(JSON.stringify({ dbBodiesMatch: equal, publishedDatesAndUrls: snapshotPath ? 'preserved' : 'not compared' }));
  const paths = ['/', '/?view=card', '/about', '/contact', '/contents', '/privacy', '/terms', '/ai-pilot', ...rows.map(p => `/posts/${p.slug}`)];
  await batches(paths, async path => {
    try {
      const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
      checked.set(path, response.status);
      if (response.status !== 200) { errors.push(`${path}: ${response.status}`); return; }
      const html = await response.text();
      if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) errors.push(`${path}: expected one h1`);
      if (!html.includes('rel="canonical"')) errors.push(`${path}: missing canonical`);
      if (privateName && html.includes(privateName)) errors.push(`${path}: public real-name leakage`);
      if (path.startsWith('/posts/')) {
        const post = rows.find(p => path === `/posts/${p.slug}`)!;
        if (!decode(html).includes(post.title)) errors.push(`${path}: title not deployed`);
        if (!html.includes('편집 정정') && !html.includes('2026년 9월 16일 수정')) errors.push(`${path}: correction not deployed`);
        const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
        if (!ld || JSON.parse(ld[1]).headline !== post.title) errors.push(`${path}: JSON-LD mismatch`);
      }
      for (const match of html.matchAll(/href="([^"]+)"/g)) {
        const href = decode(match[1]);
        if (href.startsWith('#')) {
          if (!html.includes(`id="${href.slice(1)}"`)) errors.push(`${path}: missing anchor ${href}`);
        } else if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/_next/')) internal.add(href);
        else if (/^https?:/.test(href)) external.add(href);
      }
    } catch (e) { errors.push(`${path}: ${String(e)}`); }
  });
  await batches([...internal].filter(p => !checked.has(p)), async path => {
    try {
      const r = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
      checked.set(path, r.status);
      if (r.status !== 200) errors.push(`link ${path}: ${r.status}`);
    } catch (e) { errors.push(`link ${path}: ${String(e)}`); }
  });
  for (const [path, expected] of [['/sitemap.xml', 200], ['/robots.txt', 200], ['/feed.xml', 200], ['/ads.txt', 200], ['/downloads/ai-pilot-log.csv', 200], ['/posts/audit-not-a-real-post', 404], ['/?page=-1', 404], ['/api/posts?page=-1', 400], ['/api/posts/0', 400]] as const) {
    const r = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
    if (r.status !== expected) errors.push(`${path}: expected ${expected}, got ${r.status}`);
    if (path === '/sitemap.xml') assert.equal(((await r.text()).match(/<loc>[^<]*\/posts\//g) || []).length, 139);
  }
  console.log(JSON.stringify({ base, checkedPagesAndInternalLinks: checked.size, externalLinksFound: external.size, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
}
main().catch(e => { console.error(e.message); process.exitCode = 1; }).finally(() => pool.end());
