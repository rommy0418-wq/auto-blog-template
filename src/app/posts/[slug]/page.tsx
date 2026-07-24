import { notFound } from "next/navigation";
import type { Metadata } from "next";
import pool from "@/lib/db";
import { Post } from "@/types";
import JsonLd from "@/components/JsonLd";
import CommentSection from "@/components/CommentSection";
import LikeButton from "@/components/LikeButton";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";
import { sanitizePostHtml } from "@/lib/sanitize";

export const revalidate = 3600;

function buildToc(html: string): { tocItems: { id: string; text: string }[]; contentHtml: string } {
  let idx = 0;
  const tocItems: { id: string; text: string }[] = [];
  const contentHtml = html.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_, attrs: string, inner: string) => {
      const id = `toc-${idx++}`;
      const text = inner.replace(/<[^>]+>/g, "").trim();
      tocItems.push({ id, text });
      return `<h2${attrs} id="${id}">${inner}</h2>`;
    }
  );
  return { tocItems, contentHtml };
}

type Props = { params: Promise<{ slug: string }> };

async function getPost(slug: string): Promise<Post | null> {
  const { rows } = await pool.query(
    "SELECT * FROM posts WHERE slug = $1 AND status = 'published'",
    [slug]
  );
  return (rows[0] as Post) || null;
}

async function getRelatedPosts(postId: number, category: string) {
  const { rows } = await pool.query(
    `SELECT id, title, slug, category, level, thumbnail_url, published_at
     FROM posts
     WHERE status = 'published' AND id != $1 AND category = $2
     ORDER BY published_at DESC LIMIT 4`,
    [postId, category]
  );
  return rows;
}

async function getLikeCount(postId: number): Promise<number> {
  const { rows } = await pool.query(
    "SELECT COUNT(*) as count FROM likes WHERE post_id = $1",
    [postId]
  );
  return Number(rows[0]?.count) || 0;
}

export async function generateStaticParams() {
  const { rows } = await pool.query(
    "SELECT slug FROM posts WHERE status = 'published'"
  );
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  if (!post) return { title: "글을 찾을 수 없습니다" };
  return {
    title: post.title,
    description: post.meta_description || post.title,
    keywords: post.keywords || undefined,
    openGraph: {
      title: post.title,
      description: post.meta_description || post.title,
      url: `${siteUrl}/posts/${post.slug}`,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      ...(post.thumbnail_url && { images: [{ url: post.thumbnail_url }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description || post.title,
      ...(post.thumbnail_url && { images: [post.thumbnail_url] }),
    },
  };
}

const catLabels: Record<string, string> = {
  foundation: "AI 입문",
  tools:      "도구 실전",
  marketing:  "AI 마케팅",
  transform:  "전환 전략",
  business:   "1인기업",
  cases:      "사례 분석",
};
const catBadgeClass: Record<string, string> = {
  foundation: "badge badge-before",
  tools:      "badge badge-bidding",
  marketing:  "badge badge-after",
  transform:  "badge badge-tax",
  business:   "badge badge-law",
  cases:      "badge badge-ai",
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  await pool.query("UPDATE posts SET view_count = view_count + 1 WHERE id = $1", [post.id]);
  const [likeCount, relatedPosts] = await Promise.all([
    getLikeCount(post.id),
    getRelatedPosts(post.id, post.category),
  ]);

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("ko-KR", {
        year: "numeric", month: "long", day: "numeric",
      })
    : null;

  const levelLabel = post.level === "기초편" ? "기초"
    : post.level === "중급편" ? "중급"
    : post.level === "고급편" ? "고급"
    : null;
  const levelCls = levelLabel === "기초" ? "badge badge-basic"
    : levelLabel === "중급" ? "badge badge-mid"
    : "badge badge-adv";

  const safeContent = sanitizePostHtml(post.content);
  const { tocItems, contentHtml } = buildToc(safeContent);
  const plainText = post.content.replace(/<[^>]+>/g, "");
  const readingMinutes = Math.max(1, Math.round(plainText.length / 800));

  return (
    <>
      <JsonLd post={post} />
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ── 상단 내비 ─────────────────────────── */}
        <header style={{
          background: "var(--header-bg)",
          borderBottom: "1px solid var(--border)",
        }}>
          <div style={{
            maxWidth: "52rem", margin: "0 auto",
            padding: "0.875rem 1.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Link href="/" style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--header-text)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}>
              {process.env.NEXT_PUBLIC_SITE_NAME || "AI전환연구소"}
            </Link>
            <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
              <Link href="/about" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
                소개
              </Link>
              <Link href="/contact" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
                문의
              </Link>
              <Link href="/contents" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
                전체 목차
              </Link>
              <Link href="/" style={{
                fontSize: "0.75rem",
                color: "var(--header-muted)",
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.3rem",
              }}>
                ← 목록
              </Link>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* ── 아티클 ─────────────────────────── */}
          <article style={{
            background: "var(--bg-card)",
            borderRadius: "0 0 16px 16px",
            border: "1px solid var(--border)",
            borderTop: "none",
            padding: "2.5rem 2.5rem 3rem",
            marginBottom: "2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>

            {/* 메타 */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              marginBottom: "1.25rem", flexWrap: "wrap",
            }}>
              <span className={catBadgeClass[post.category] || "badge"}>
                {catLabels[post.category] || post.category}
              </span>
              {levelLabel && (
                <span className={levelCls}>{levelLabel}</span>
              )}
              {publishedDate && (
                <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)", marginLeft: "0.25rem" }}>
                  {publishedDate}
                </span>
              )}
              <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>
                · {readingMinutes}분 읽기
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)" }}>
                · 조회 {post.view_count.toLocaleString()}
              </span>
            </div>

            {/* 제목 */}
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
              fontWeight: 800,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              marginBottom: "2rem",
            }}>
              {post.title}
            </h1>

            {/* 구분선 */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "2rem",
            }}>
              <div style={{ width: "2.5rem", height: "3px", background: "var(--accent)", borderRadius: "2px" }} />
              <span style={{ fontSize: "0.75rem", color: "var(--ink-faint)", fontWeight: 600, letterSpacing: "0.05em" }}>
                {process.env.NEXT_PUBLIC_SITE_NAME || "운영자"}
              </span>
            </div>

            {/* 썸네일 */}
            {post.thumbnail_url && (
              <div style={{
                marginBottom: "2.5rem", borderRadius: "10px", overflow: "hidden",
                border: "1px solid var(--border)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  style={{ width: "100%", height: "auto", maxHeight: "24rem", objectFit: "cover", display: "block" }}
                />
              </div>
            )}

            {/* 목차 */}
            {tocItems.length >= 2 && (
              <nav style={{
                background: "var(--border-light)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "1rem 1.25rem",
                marginBottom: "2rem",
              }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--ink-muted)", margin: "0 0 0.6rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  목차
                </p>
                <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {tocItems.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        style={{
                          display: "flex", alignItems: "baseline", gap: "0.5rem",
                          fontSize: "0.8125rem", color: "var(--ink-muted)", textDecoration: "none",
                          lineHeight: 1.5,
                        }}
                        className="toc-link"
                      >
                        <span style={{ fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 700, minWidth: "1.25rem" }}>
                          {i + 1}.
                        </span>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* 본문 */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <aside className="content-disclosure" aria-label="콘텐츠 작성 안내">
              <strong>콘텐츠 작성 안내</strong>
              <p>
                이 글은 AI를 활용해 생성·편집된 정보성 콘텐츠입니다.
                제품 기능과 요금 등은 변경될 수 있으므로 중요한 의사결정 전
                공식 자료를 함께 확인해 주세요.
              </p>
            </aside>

            {/* 좋아요 & 공유 */}
            <div style={{
              marginTop: "var(--space-xl)",
              paddingTop: "var(--space-lg)",
              borderTop: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: "var(--space-sm)",
            }}>
              <LikeButton postId={post.id} initialCount={likeCount} />
              <ShareButton title={post.title} />
            </div>
          </article>

          {/* ── 관련 글 추천 ──────────────────── */}
          {relatedPosts.length > 0 && (
            <section style={{
              background: "var(--bg-card)",
              borderRadius: "12px",
              border: "1px solid var(--border)",
              padding: "1.5rem",
              marginBottom: "2rem",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <h3 style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--ink-muted)",
                letterSpacing: "0.05em",
                marginBottom: "1rem",
              }}>
                관련 글 추천
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1rem",
              }}>
                {relatedPosts.map((rp: { id: number; title: string; slug: string; category: string; level: string; thumbnail_url: string | null; published_at: string }) => (
                  <Link
                    key={rp.id}
                    href={`/posts/${rp.slug}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                      overflow: "hidden",
                      transition: "box-shadow 0.2s",
                    }}
                    className="related-card"
                  >
                    {rp.thumbnail_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={rp.thumbnail_url}
                        alt={rp.title}
                        style={{ width: "100%", height: "120px", objectFit: "cover", display: "block" }}
                      />
                    )}
                    <div style={{ padding: "0.75rem" }}>
                      <span className={catBadgeClass[rp.category] || "badge"} style={{ fontSize: "0.625rem", marginBottom: "0.4rem", display: "inline-block" }}>
                        {catLabels[rp.category] || rp.category}
                      </span>
                      <p style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>
                        {rp.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── 댓글 ────────────────────────────── */}
          <CommentSection postId={post.id} />
          <div style={{ height: "var(--space-2xl)" }} />
        </main>
      </div>
    </>
  );
}
