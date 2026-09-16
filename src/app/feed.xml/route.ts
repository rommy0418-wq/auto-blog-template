import pool from "@/lib/db";
import { xmlText } from "@/lib/serialization";

export async function GET() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aitrans-lab.com").replace(/\/+$/, "");
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AI전환연구소";

  const { rows } = await pool.query(
    `SELECT title, slug, meta_description, published_at
     FROM posts WHERE status = 'published'
     ORDER BY published_at DESC LIMIT 50`
  );

  const items = rows
    .map(
      (post) => `    <item>
      <title>${xmlText(post.title)}</title>
      <link>${xmlText(`${siteUrl}/posts/${post.slug}`)}</link>
      <guid>${xmlText(`${siteUrl}/posts/${post.slug}`)}</guid>
      <description>${xmlText(post.meta_description)}</description>
      ${post.published_at ? `<pubDate>${new Date(post.published_at).toUTCString()}</pubDate>` : ""}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlText(siteName)}</title>
    <link>${xmlText(siteUrl)}</link>
    <description>비즈니스 AI 전환을 위한 전략, 사례, 실무 가이드</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${xmlText(siteUrl)}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
