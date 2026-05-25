import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의하기",
  description: "AI전환연구소 — AI 컨설팅 의뢰, 강의·교육, 협업 문의",
};

export default function ContactPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AI전환연구소";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ybkim@ipgroup.co.kr";

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* 헤더 */}
      <header style={{ background: "var(--header-bg)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0.875rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, color: "var(--header-text)", textDecoration: "none" }}>
            {siteName}
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <Link href="/about" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              소개
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

      {/* 본문 */}
      <main style={{ maxWidth: "40rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        <div style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "0.75rem",
        }}>
          CONTACT
        </div>

        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 800,
          color: "var(--ink)",
          marginBottom: "0.75rem",
          lineHeight: 1.3,
        }}>
          문의하기
        </h1>
        <p style={{
          fontSize: "0.9375rem",
          color: "var(--ink-muted)",
          marginBottom: "2.5rem",
          lineHeight: 1.8,
        }}>
          AI 전환 컨설팅 의뢰, 강의·교육 요청, 협업 제안 등<br />
          아래 이메일로 연락 주시면 빠르게 답변드립니다.
        </p>

        {/* 이메일 카드 */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}>
          <div style={{
            background: "var(--header-bg)",
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <span style={{ fontSize: "1.25rem" }}>✉️</span>
            <span style={{ fontWeight: 700, color: "var(--header-text)", fontSize: "0.9375rem" }}>
              이메일 문의
            </span>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <a
              href={`mailto:${contactEmail}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              {contactEmail}
            </a>
            <p style={{
              fontSize: "0.8125rem",
              color: "var(--ink-muted)",
              marginTop: "0.75rem",
              lineHeight: 1.6,
            }}>
              영업일 기준 1~2일 내 답변드립니다.<br />
              문의 시 회사명·업종·규모를 함께 남겨주시면 더 빠른 상담이 가능합니다.
            </p>
          </div>
        </div>

        {/* 웹사이트 링크 */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "2rem",
        }}>
          <div style={{
            background: "var(--header-bg)",
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <span style={{ fontSize: "1.25rem" }}>🌐</span>
            <span style={{ fontWeight: 700, color: "var(--header-text)", fontSize: "0.9375rem" }}>
              운영사 바로가기
            </span>
          </div>
          <div style={{ padding: "1.5rem" }}>
            <a
              href="http://www.ipgroup.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              www.ipgroup.co.kr →
            </a>
            <p style={{
              fontSize: "0.8125rem",
              color: "var(--ink-muted)",
              marginTop: "0.75rem",
              lineHeight: 1.6,
            }}>
              30년 웹 전문 에이전시 아이피그룹 공식 홈페이지입니다.
            </p>
          </div>
        </div>

        {/* 문의 유형 안내 */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: "1.125rem",
          }}>
            문의 유형별 안내
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              {
                icon: "🏢",
                title: "AI 컨설팅 의뢰",
                desc: "기업 AI 전환 전략 수립, AI 도입 컨설팅, 임직원 교육 프로그램 설계를 의뢰하실 수 있습니다.",
              },
              {
                icon: "🎤",
                title: "강의·강연 요청",
                desc: "기업 특강, 세미나, AI 전환 워크숍 강연 요청을 받습니다.",
              },
              {
                icon: "🤝",
                title: "협업·제휴 문의",
                desc: "콘텐츠 협업, 공동 프로젝트, 파트너십 관련 제안을 환영합니다.",
              },
              {
                icon: "📝",
                title: "콘텐츠 오류 신고",
                desc: "글의 내용 중 오류나 업데이트가 필요한 부분을 알려주시면 바로 수정합니다.",
              },
              {
                icon: "🔒",
                title: "개인정보 요청",
                desc: "수집된 개인정보의 열람·정정·삭제를 요청하실 수 있습니다.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.125rem", flexShrink: 0, marginTop: "0.1rem" }}>
                  {icon}
                </span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--ink)", marginBottom: "0.25rem" }}>
                    {title}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "var(--ink-muted)", lineHeight: 1.6, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: "0.8125rem", color: "var(--ink-faint)", textAlign: "center", lineHeight: 1.6 }}>
          개인정보처리방침은{" "}
          <Link href="/privacy" style={{ color: "var(--accent)", textDecoration: "underline" }}>
            이 페이지
          </Link>
          에서 확인하실 수 있습니다.
        </p>

      </main>
    </div>
  );
}
