import type { Metadata } from "next";
import Link from "next/link";
import pool from "@/lib/db";
import { allTopics } from "@/lib/topics";

export const metadata: Metadata = {
  title: "전체 커리큘럼",
  description: "130개 주제로 배우는 기업 AI 전환 실전 가이드",
};

export const revalidate = 3600;

const catLabels: Record<string, string> = {
  foundation: "AI 입문",
  tools:      "도구 실전",
  marketing:  "AI 마케팅",
  transform:  "전환 전략",
  business:   "1인기업",
  cases:      "사례 분석",
};

const levelColors: Record<string, string> = {
  "기초편": "var(--cat-before-c)",
  "중급편": "var(--cat-bidding-c)",
  "고급편": "var(--cat-ai-c)",
};

const LEVELS = ["기초편", "중급편", "고급편"] as const;
const CAT_ORDER = ["foundation", "tools", "marketing", "transform", "business", "cases"] as const;

export default async function ContentsPage() {
  const { rows } = await pool.query(
    "SELECT slug FROM posts WHERE status = 'published'"
  );
  const publishedSlugs = new Set(rows.map((r) => r.slug as string));

  const totalCount = allTopics.length;
  const publishedCount = allTopics.filter((t) => publishedSlugs.has(t.slug)).length;
  const progressPct = Math.round((publishedCount / totalCount) * 100);

  // 레벨 → 카테고리 → 주제 그룹화
  type GroupedTopics = Record<string, Record<string, typeof allTopics>>;
  const grouped: GroupedTopics = {};
  for (const level of LEVELS) {
    grouped[level] = {};
    for (const cat of CAT_ORDER) grouped[level][cat] = [];
  }
  for (const topic of allTopics) {
    grouped[topic.level][topic.category].push(topic);
  }

  const levelCounts: Record<string, { total: number; published: number }> = {};
  for (const level of LEVELS) {
    const topics = allTopics.filter((t) => t.level === level);
    levelCounts[level] = {
      total: topics.length,
      published: topics.filter((t) => publishedSlugs.has(t.slug)).length,
    };
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* 헤더 */}
      <header style={{ background: "var(--header-bg)", borderBottom: "1px solid #2a2a28" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0.875rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, color: "var(--header-text)", textDecoration: "none" }}>
            {process.env.NEXT_PUBLIC_SITE_NAME || "AI전환연구소"}
          </Link>
          <Link href="/" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
            ← 홈으로
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: "56rem", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        {/* 타이틀 & 진행률 */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "var(--ink)", marginBottom: "0.5rem" }}>
            전체 커리큘럼
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "1.25rem" }}>
            130개 주제로 배우는 기업 AI 전환 실전 가이드
          </p>

          {/* 진행률 바 */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--ink)" }}>
                발행 진행률
              </span>
              <span style={{ fontSize: "0.8125rem", color: "var(--ink-muted)" }}>
                <strong style={{ color: "var(--accent)", fontSize: "1rem" }}>{publishedCount}</strong>
                {" "}/ {totalCount}편
              </span>
            </div>
            <div style={{ height: "8px", background: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPct}%`, background: "var(--accent)", borderRadius: "4px", transition: "width 0.3s" }} />
            </div>
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.875rem", flexWrap: "wrap" }}>
              {LEVELS.map((level) => (
                <div key={level} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: levelColors[level] }} />
                  <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
                    {level} {levelCounts[level].published}/{levelCounts[level].total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 레벨별 섹션 */}
        {LEVELS.map((level) => (
          <section key={level} style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ width: "4px", height: "1.5rem", background: levelColors[level], borderRadius: "2px" }} />
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                {level}
              </h2>
              <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
                {levelCounts[level].published}/{levelCounts[level].total}편 발행
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {CAT_ORDER.map((cat) => {
                const topics = grouped[level][cat];
                if (!topics.length) return null;
                const catPublished = topics.filter((t) => publishedSlugs.has(t.slug)).length;

                return (
                  <div key={cat} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden" }}>
                    {/* 카테고리 헤더 */}
                    <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.15)" }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--ink)" }}>
                        {catLabels[cat]}
                      </span>
                      <span style={{ fontSize: "0.6875rem", color: "var(--ink-faint)" }}>
                        {catPublished}/{topics.length}
                      </span>
                    </div>

                    {/* 주제 목록 */}
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {topics.map((topic, i) => {
                        const isPublished = publishedSlugs.has(topic.slug);
                        return (
                          <li
                            key={topic.slug}
                            style={{
                              borderBottom: i < topics.length - 1 ? "1px solid var(--border-light)" : "none",
                            }}
                          >
                            {isPublished ? (
                              <Link
                                href={`/posts/${topic.slug}`}
                                style={{
                                  display: "flex", alignItems: "flex-start", gap: "0.75rem",
                                  padding: "0.75rem 1.25rem", textDecoration: "none",
                                  transition: "background 0.15s",
                                }}
                                className="contents-item"
                              >
                                <span style={{ fontSize: "0.6875rem", color: "var(--accent)", fontWeight: 700, minWidth: "1.75rem", paddingTop: "0.1rem" }}>
                                  {topic.index}
                                </span>
                                <span style={{ flex: 1, fontSize: "0.875rem", color: "var(--ink)", lineHeight: 1.5 }}>
                                  {topic.title}
                                </span>
                                <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--accent)", background: "rgba(var(--accent-rgb),0.12)", padding: "0.2rem 0.5rem", borderRadius: "4px", whiteSpace: "nowrap", alignSelf: "center" }}>
                                  발행
                                </span>
                              </Link>
                            ) : (
                              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.75rem 1.25rem", opacity: 0.45 }}>
                                <span style={{ fontSize: "0.6875rem", color: "var(--ink-faint)", fontWeight: 700, minWidth: "1.75rem", paddingTop: "0.1rem" }}>
                                  {topic.index}
                                </span>
                                <span style={{ flex: 1, fontSize: "0.875rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                                  {topic.title}
                                </span>
                                <span style={{ fontSize: "0.625rem", color: "var(--ink-faint)", whiteSpace: "nowrap", alignSelf: "center" }}>
                                  준비중
                                </span>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
