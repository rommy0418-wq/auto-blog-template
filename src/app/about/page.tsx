import Link from "next/link";

export const metadata = {
  title: "블로그 소개",
  description: "30여년 현장 경험 기반, 기업 AI 전환 전략과 실전 가이드 — AI전환연구소",
};

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AI전환연구소";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* 헤더 */}
      <header style={{ background: "var(--header-bg)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0.875rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, color: "var(--header-text)", textDecoration: "none" }}>
            {siteName}
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <Link href="/contact" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              문의
            </Link>
            <Link href="/contents" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              전체 목차
            </Link>
            <Link href="/" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              ← 홈으로
            </Link>
          </nav>
        </div>
      </header>

    <main style={{ maxWidth: "56rem", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* 타이틀 */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "0.75rem",
        }}>
          ABOUT
        </div>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 800,
          color: "var(--ink)",
          lineHeight: 1.2,
          marginBottom: "1rem",
        }}>
          AI전환연구소
        </h1>
        <p style={{ fontSize: "1.0625rem", color: "var(--ink-mid)", lineHeight: 1.8 }}>
          30여년 현장 경험을 바탕으로 한 기업 AI 전환 전략과 실전 가이드
        </p>
      </div>

      {/* 구분선 */}
      <div style={{ height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

      {/* 이 블로그는 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: "1rem",
        }}>
          이 블로그는
        </h2>
        <p style={{ lineHeight: 1.9, color: "var(--ink-mid)", marginBottom: "1rem" }}>
          <strong style={{ color: "var(--ink)" }}>AI전환연구소</strong>는 30여년간 웹 에이전시를 운영해 온 현장 전문가의 시각으로,
          기업과 1인 사업자가 AI를 실제 비즈니스에 적용하는 방법을 다룹니다.
        </p>
        <p style={{ lineHeight: 1.9, color: "var(--ink-mid)" }}>
          이론이 아닌 실전, 개념이 아닌 적용 — 현장에서 직접 부딪히며 검증한 AI 활용법과
          기업 AI 전환 전략을 솔직하게 공유합니다.
        </p>
      </section>

      {/* 다루는 주제 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: "1.25rem",
        }}>
          다루는 주제
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))", gap: "0.875rem" }}>
          {[
            { emoji: "🏢", title: "기업 AI 전환 전략", desc: "단계별 로드맵과 실행 가이드" },
            { emoji: "🛠", title: "AI 도구 실전 활용", desc: "ChatGPT·Claude·Gemini 업무 적용법" },
            { emoji: "📣", title: "AI 마케팅·광고", desc: "30여년 광고 기획 경험 + AI" },
            { emoji: "💼", title: "1인 기업·수익화", desc: "혼자서 10명 몫 하는 AI 모델" },
            { emoji: "📊", title: "업종별 도입 사례", desc: "실제 기업의 AI 적용 사례 분석" },
            { emoji: "🔰", title: "AI 입문·트렌드", desc: "비전문가도 이해하는 AI 기초" },
          ].map(({ emoji, title, desc }) => (
            <div key={title} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "1.125rem 1.25rem",
            }}>
              <div style={{ fontSize: "1.375rem", marginBottom: "0.5rem" }}>{emoji}</div>
              <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>{title}</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--ink-muted)" }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 운영자 소개 */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: "1rem",
        }}>
          운영자 소개
        </h2>
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "1.75rem",
        }}>
          <p style={{ lineHeight: 1.9, color: "var(--ink-mid)", marginBottom: "1rem" }}>
            웹 에이전시 <strong style={{ color: "var(--ink)" }}>아이피그룹(IPGroup)</strong> 대표로,
            30여년간 기업 웹 구축, 브랜드 마케팅, 광고 기획 등 다양한 프로젝트를 이끌어 왔습니다.
            이 경험을 토대로 기업이 AI를 실무에 도입하고 비즈니스를 전환하는 전략을 제시합니다.
          </p>
          <p style={{ lineHeight: 1.9, color: "var(--ink-mid)", marginBottom: "1.25rem" }}>
            현재 기업 AI 전환 컨설팅과 AI 기반 비즈니스 모델 설계를 중심으로 활동하며,
            현장에서 검증한 노하우와 인사이트를 이 블로그를 통해 공유하고 있습니다.
          </p>
          <a
            href="http://www.ipgroup.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontSize: "0.8125rem",
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            www.ipgroup.co.kr →
          </a>
        </div>
      </section>

      {/* 구분선 */}
      <div style={{ height: "1px", background: "var(--border)", marginBottom: "2.5rem" }} />

      {/* 컨설팅 문의 CTA */}
      <section style={{ textAlign: "center" }}>
        <p style={{ color: "var(--ink-muted)", fontSize: "0.9375rem", marginBottom: "1rem" }}>
          기업 AI 전환 컨설팅이 필요하시거나 문의사항이 있으신 분들은
        </p>
        <a href="/contact" className="btn btn-lg btn-primary">
          문의하기
        </a>
      </section>

    </main>
    </div>
  );
}
