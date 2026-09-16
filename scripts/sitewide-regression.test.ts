import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { NextRequest } from 'next/server';
import { jsonForHtml, xmlText } from '../src/lib/serialization';
import { sanitizePostHtml } from '../src/lib/sanitize';
import { validComment } from '../src/lib/comment-validation';
import { validPostInput } from '../src/lib/post-validation';
import { checkRateLimit } from '../src/lib/spam';
import pool from '../src/lib/db';
import { GET as listPosts } from '../src/app/api/posts/route';
import { POST as comment } from '../src/app/api/comments/route';

test('JSON-LD and RSS escape hostile delimiters without corrupting content', () => {
  const value = { title: '</script><script>alert(1)</script> & "제목"' };
  assert.ok(!jsonForHtml(value).includes('<'));
  assert.deepEqual(JSON.parse(jsonForHtml(value)), value);
  assert.equal(xmlText(`<a & "b" 'c'>`), '&lt;a &amp; &quot;b&quot; &apos;c&apos;&gt;');
  assert.equal(xmlText(null), '');
});
test('article sanitizer removes executable content and retains useful list numbering', () => {
  const html = sanitizePostHtml('<script>alert(1)</script><img src="https://example.test/a" onerror="alert(1)"><a href="javascript:alert(1)" target="_blank">x</a><ol start="11"><li>항목</li></ol>');
  assert.doesNotMatch(html, /<script|onerror|javascript:/);
  assert.match(html, /start="11"/);
  assert.match(html, /noopener noreferrer/);
});
test('comment validation rejects malformed fields and bcrypt truncation', () => {
  const base = { postId: 1, nickname: '검수', password: 'test-pass', content: '정상 입력' };
  assert.equal(validComment(base), true);
  for (const bad of [null, [], {}, { ...base, postId: 1.1 }, { ...base, nickname: ' ' }, { ...base, content: 123 }, { ...base, password: '가'.repeat(25) }]) assert.equal(validComment(bad), false);
});
test('post fields reject invalid status, path separators, empty content and unsafe thumbnails', () => {
  assert.equal(validPostInput({ title: '제목', content: '<p>본문</p>' }), true);
  assert.equal(validPostInput({ meta_description: '설명' }, true), true);
  for (const body of [{ title: ' ', content: '본문' }, { title: 't', content: [] }, { slug: '../oops' }, { status: 'unknown' }, { thumbnail_url: 'javascript:alert(1)' }, { published_at: 'not-a-date' }]) assert.equal(validPostInput(body, true), false);
});
test('rate limiter is atomic, pseudonymous and closed on database failure', async () => {
  const previous = pool.query;
  const oldKey = process.env.ADMIN_API_KEY;
  process.env.ADMIN_API_KEY = 'local-test-only';
  let hits = 1;
  try {
    pool.query = (async (sql: string, values: unknown[]) => {
      assert.match(sql, /ON CONFLICT/);
      assert.notEqual(values[0], '192.0.2.1');
      assert.match(String(values[0]), /^[a-f0-9]{40}$/);
      return { rows: [{ hit_count: hits }] };
    }) as typeof pool.query;
    assert.equal((await checkRateLimit('192.0.2.1', 'comment')).limited, false);
    hits = 4;
    assert.equal((await checkRateLimit('192.0.2.1', 'comment')).limited, true);
    pool.query = (async () => { throw new Error('test outage'); }) as typeof pool.query;
    assert.deepEqual(await checkRateLimit('192.0.2.1', 'comment'), { limited: true, unavailable: true });
  } finally {
    pool.query = previous;
    if (oldKey === undefined) delete process.env.ADMIN_API_KEY; else process.env.ADMIN_API_KEY = oldKey;
  }
});
test('invalid pagination and comments are rejected before any database work', async () => {
  for (const query of ['page=-1', 'page=1.5', 'limit=999', 'page=NaN']) {
    assert.equal((await listPosts(new NextRequest(`https://example.test/api/posts?${query}`))).status, 400);
  }
  assert.equal((await comment(new NextRequest('https://example.test/api/comments', { method: 'POST', body: 'null' }))).status, 400);
});
test('rendering no longer increments historical view counts and captcha bypass is removed', () => {
  assert.doesNotMatch(readFileSync('src/app/posts/[slug]/page.tsx', 'utf8'), /UPDATE posts SET view_count/);
  assert.doesNotMatch(readFileSync('src/components/CommentForm.tsx', 'utf8'), /dev-test-token|data-callback/);
  assert.doesNotMatch(readFileSync('src/lib/db.ts', 'utf8'), /rejectUnauthorized:\s*false/);
});
