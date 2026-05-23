/**
 * 썸네일이 없는 글에 이미지를 채우는 보정 스크립트
 * 사용: npx tsx scripts/fix-missing-thumbs.ts
 */
import { Pool } from "pg";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// transform 카테고리용 대체 쿼리 (다양하게 확장)
const FALLBACK_QUERIES = [
  "business strategy planning whiteboard",
  "team collaboration technology office",
  "digital innovation startup modern",
  "leadership meeting boardroom professionals",
  "technology future workspace laptop",
];

async function fetchUnsplashImage(query: string, usedIds: Set<string>): Promise<{ url: string; attribution: string } | null> {
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!unsplashKey) return null;

  for (let page = 1; page <= 3; page++) {
    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", query);
    url.searchParams.set("per_page", "15");
    url.searchParams.set("orientation", "landscape");
    url.searchParams.set("page", String(page));

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${unsplashKey}` },
    });
    if (!res.ok) break;

    const data = await res.json() as {
      results: Array<{
        urls: { regular: string };
        user: { name: string };
        links: { html: string };
      }>;
    };

    for (const photo of data.results ?? []) {
      const baseUrl = photo.urls.regular.split("?")[0];
      if (usedIds.has(baseUrl)) continue;
      usedIds.add(baseUrl);
      return {
        url: photo.urls.regular,
        attribution: `<a href="${photo.links.html}?utm_source=my_blog&utm_medium=referral" rel="noopener noreferrer" style="color:rgba(255,255,255,0.9);">${photo.user.name}</a> / Unsplash`,
      };
    }
  }
  return null;
}

async function main() {
  console.log("=== 썸네일 누락 글 보정 시작 ===");

  // 이미 사용된 이미지 URL 수집
  const { rows: allPosts } = await pool.query(
    "SELECT thumbnail_url, content FROM posts WHERE status = 'published'"
  );
  const usedIds = new Set<string>();
  const inlineRegex = /src="(https:\/\/images\.unsplash\.com\/[^"?]+)/g;
  for (const row of allPosts) {
    if (row.thumbnail_url) usedIds.add((row.thumbnail_url as string).split("?")[0]);
    let m;
    while ((m = inlineRegex.exec(row.content as string)) !== null) usedIds.add(m[1]);
    inlineRegex.lastIndex = 0;
  }
  console.log(`기존 사용 이미지 ${usedIds.size}개 확인`);

  // 썸네일 없는 글 조회
  const { rows: noThumbPosts } = await pool.query(
    "SELECT id, slug, category FROM posts WHERE status = 'published' AND thumbnail_url IS NULL"
  );
  console.log(`썸네일 없는 글: ${noThumbPosts.length}개\n`);

  for (const post of noThumbPosts) {
    console.log(`처리 중: ${post.slug} (${post.category})`);

    let image: { url: string; attribution: string } | null = null;

    // 카테고리별 기본 쿼리 → fallback 쿼리 순서로 시도
    for (const query of FALLBACK_QUERIES) {
      image = await fetchUnsplashImage(query, usedIds);
      if (image) break;
    }

    if (!image) {
      console.log(`  ⚠️  이미지를 찾지 못함 — 건너뜀`);
      continue;
    }

    await pool.query(
      "UPDATE posts SET thumbnail_url = $1 WHERE id = $2",
      [image.url, post.id]
    );
    console.log(`  ✅ 썸네일 업데이트: ${image.url.slice(0, 60)}...`);
  }

  console.log("\n=== 완료 ===");
  await pool.end();
}

main().catch((e) => {
  console.error("❌ 오류:", e.message);
  process.exit(1);
});
