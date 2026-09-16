import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { spawnSync } from "node:child_process";
import { NextRequest } from "next/server";
import pool from "../src/lib/db";
import { GET } from "../src/app/api/posts/[id]/route";

test("post API keeps drafts private and admin previews out of view counts", async () => {
  const originalQuery = pool.query;
  const originalKey = process.env.ADMIN_API_KEY;
  process.env.ADMIN_API_KEY = "local-test-only";
  const queries: string[] = [];
  let postStatus = "draft";
  pool.query = (async (sql: string) => {
    queries.push(sql);
    if (sql.startsWith("UPDATE")) return { rows: [] };
    if (sql.includes("status = 'published'") && postStatus !== "published") return { rows: [] };
    return { rows: [{ id: 123, status: postStatus, content: "private-test-content" }] };
  }) as typeof pool.query;
  const request = (token?: string) => new NextRequest("https://example.test/api/posts/123", {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
  const params = { params: Promise.resolve({ id: "123" }) };
  try {
    for (const token of [undefined, "wrong-token"]) {
      queries.length = 0;
      const response = await GET(request(token), params);
      assert.equal(response.status, 404);
      assert.equal((await response.text()).includes("private-test-content"), false);
      assert.equal(queries.length, 1);
    }
    queries.length = 0;
    const preview = await GET(request("local-test-only"), params);
    assert.equal(preview.status, 200);
    assert.equal(preview.headers.get("cache-control"), "private, no-store");
    assert.equal((await preview.json()).status, "draft");
    assert.equal(queries.length, 1);
    postStatus = "published";
    queries.length = 0;
    const publicPost = await GET(request(), params);
    assert.equal(publicPost.status, 200);
    assert.equal(queries.length, 2);
    assert.match(queries[1], /^UPDATE posts SET view_count/);
  } finally {
    pool.query = originalQuery;
    if (originalKey === undefined) delete process.env.ADMIN_API_KEY;
    else process.env.ADMIN_API_KEY = originalKey;
  }
});

test("generator saves unpublished drafts and skips all existing slugs", () => {
  const source = readFileSync("scripts/generate-post.ts", "utf8");
  assert.match(source, /VALUES \(\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8, 'draft', NULL\)/);
  assert.match(source, /SELECT slug FROM posts"/);
  assert.doesNotMatch(source, /'published', NOW\(\)/);
});

test("automatic public rewriting stays paused", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "scripts/upgrade-posts.ts", "5"], {
    encoding: "utf8",
    env: { PATH: process.env.PATH },
  });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /공개 글 자동 재작성을 중지/);
  assert.doesNotMatch(result.stdout, /업그레이드 시작/);
});
