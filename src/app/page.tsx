import { Suspense } from "react";
import Link from "next/link";
import pool from "@/lib/db";
import PostList from "@/components/PostList";
import PostCard from "@/components/PostCard";
import ViewToggle from "@/components/ViewToggle";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

const LIMIT = 10;

const categories: { key: string | null; label: string }[] = [
  { key: null,           label: "전체" },
  { key: "foundation",   label: "AI 입문" },
  { key: "tools",        label: "도구 실전" },
  { key: "marketing",    label: "AI 마케팅" },
  { key: "transform",    label: "전환 전략" },
  { key: "business",     label: "1인기업" },
  { key: "cases",        label: "사례 분석" },
];

type SearchParams = Promise<{
  view?: string;
  page?: string;
  category?: string;
}>;

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const { view = "list", page = "1", category } = await searchParams;

  const currentView = view === "card" ? "card" : "list";
  const currentPage = Math.max(1, Number(page) || 1);
  const offset = (currentPage - 1) * LIMIT;

  const whereCategory = category ? " AND category = $1" : "";
  const countParams = category ? [category] : [];
  const queryParams: (string | number)[] = category
    ? [category, LIMIT, offset]
    : [LIMIT, offset];
  const limitIdx = category ? 2 : 1;
  const offsetIdx = category ? 3 : 2;

  const countResult = await pool.query(
    `SELECT COUNT(*) as total FROM posts WHERE status = 'published'${whereCategory}`,
    countParams
  );
  const total = Number(countResult.rows[0].total);

  const { rows: posts } = await pool.query(
    `SELECT id, title, slug, category, level, thumbnail_url, meta_description, content, published_at, view_count
     FROM posts WHERE status = 'published'${whereCategory}
     ORDER BY published_at DESC LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
    queryParams
  );

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── 헤더 ──────────────────────────────────── */}
      <header style={{ background: "var(--header-bg)" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "2rem 1.5rem 1.75rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "0.5rem",
              }}>
                AI TRANSFORMATION
              </div>
              <h1 style={{ margin: 0 }}>
                <Link href="/" style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  color: "var(--header-text)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  display: "block",
                }}>
                  {process.env.NEXT_PUBLIC_SITE_NAME || "내 블로그"}
                </Link>
              </h1>
              <p style={{
                fontSize: "0.8125rem",
                color: "var(--header-muted)",
                marginTop: "0.5rem",
                letterSpacing: "0.02em",
              }}>
                25년 웹 전문가의 기업 AI 전환 실전 가이드
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
              <SearchBar />
              <Link href="/contents" style={{
                fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em",
                color: "var(--accent)", textDecoration: "none", textTransform: "uppercase",
                border: "1px solid var(--accent)", borderRadius: "4px",
                padding: "0.2rem 0.5rem", opacity: 0.85,
              }}>
                전체 목차
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── 카테고리 탭 ───────────────────────────── */}
      <div style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 40,
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            className="scrollbar-hide"
            style={{ display: "flex", overflowX: "auto" }}
          >
            {categories.map(({ key, label }) => {
              const isActive = (!key && !category) || key === category;
              const href = key
                ? `/?view=${currentView}&category=${key}`
                : `/?view=${currentView}`;
              return (
                <a
                  key={key ?? "all"}
                  href={href}
                  className={`cat-tab${isActive ? " active" : ""}`}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 메인 콘텐츠 ───────────────────────────── */}
      <main style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* 뷰 토글 + 글 수 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 0",
        }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--ink-muted)" }}>
            총{" "}
            <strong style={{ color: "var(--ink)", fontWeight: 700 }}>{total}</strong>
            개의 글
          </span>
          <Suspense>
            <ViewToggle currentView={currentView} />
          </Suspense>
        </div>

        {/* 글 목록 */}
        <div style={{
          background: "var(--bg-card)",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          overflow: "hidden",
          marginBottom: "1.5rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
          {currentView === "card" ? (
            <div style={{ padding: "1.25rem" }}>
              <PostCard posts={posts as unknown as Partial<import("@/types").Post>[]} />
            </div>
          ) : (
            <PostList posts={posts as unknown as Partial<import("@/types").Post>[]} />
          )}
        </div>

        {/* 페이지네이션 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          view={currentView}
          category={category}
        />
        <div style={{ height: "3rem" }} />
      </main>
    </div>
  );
}
