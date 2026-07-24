import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관",
  description: "AI전환연구소 이용약관 — 서비스 이용 조건, 콘텐츠 저작권, 면책사항 안내",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AI전환연구소";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ybkim@ipgroup.co.kr";
  const today = new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      <header style={{ background: "var(--header-bg)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0.875rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 700, color: "var(--header-text)", textDecoration: "none" }}>
            {siteName}
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <Link href="/about" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              소개
            </Link>
            <Link href="/contact" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              문의
            </Link>
            <Link href="/" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              ← 홈으로
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: "52rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 800,
          color: "var(--ink)",
          marginBottom: "0.5rem",
          lineHeight: 1.3,
        }}>
          이용약관
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--ink-faint)", marginBottom: "3rem" }}>
          시행일: 2026년 1월 1일 &nbsp;|&nbsp; 최종 수정: {today}
        </p>

        <div className="prose" style={{ fontSize: "0.9375rem", lineHeight: 1.85 }}>

          <h2>1. 목적</h2>
          <p>
            본 약관은 <strong>{siteName}</strong>(이하 &ldquo;본 사이트&rdquo;)가 제공하는 웹사이트 서비스의
            이용 조건 및 절차, 이용자와 본 사이트의 권리·의무를 규정함을 목적으로 합니다.
          </p>

          <h2>2. 서비스 내용</h2>
          <p>본 사이트는 기업의 AI 전환을 돕기 위한 정보성 콘텐츠를 제공하며, 주요 서비스는 다음과 같습니다.</p>
          <ul>
            <li>AI 전환 관련 블로그 글 제공</li>
            <li>댓글 및 좋아요 기능을 통한 이용자 참여</li>
            <li>AI 컨설팅 문의 안내</li>
          </ul>

          <h2>3. 콘텐츠 저작권</h2>
          <p>
            본 사이트에 게시된 글, 이미지, 디자인 등 모든 콘텐츠의 저작권은 {siteName}에 있습니다.
          </p>
          <ul>
            <li>콘텐츠의 무단 복제, 배포, 전송, 2차 가공은 금지됩니다.</li>
            <li>비상업적 목적의 공유는 출처를 명시하는 조건으로 허용됩니다.</li>
            <li>이미지는 Unsplash 라이선스에 따라 사용되며, 각 이미지에 출처가 표기되어 있습니다.</li>
          </ul>

          <h2>4. AI 생성 콘텐츠 면책</h2>
          <p>
            본 사이트의 일부 콘텐츠는 AI(인공지능) 기술을 활용하여 생성됩니다.
            AI 생성 콘텐츠에 대해 다음 사항을 안내드립니다.
          </p>
          <ul>
            <li>AI가 생성한 내용은 참고 자료로만 활용하시기 바라며, 전문적인 의사결정에 대한 책임은 이용자 본인에게 있습니다.</li>
            <li>AI의 특성상 부정확하거나 오래된 정보가 포함될 수 있습니다. 중요한 사안은 반드시 전문가와 상담하시기 바랍니다.</li>
            <li>본 사이트는 AI 생성 콘텐츠의 정확성, 완전성, 적시성을 보장하지 않습니다.</li>
            <li>콘텐츠에서 언급되는 특정 도구, 서비스, 기업 정보는 작성 시점 기준이며 변경되었을 수 있습니다.</li>
          </ul>

          <h2>5. 이용자의 의무</h2>
          <ul>
            <li>타인의 명예를 손상시키거나 불이익을 주는 행위를 해서는 안 됩니다.</li>
            <li>본 사이트의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.</li>
            <li>댓글에 욕설, 비방, 광고, 스팸 등을 게시할 경우 사전 통보 없이 삭제될 수 있습니다.</li>
          </ul>

          <h2>6. 면책 조항</h2>
          <ul>
            <li>본 사이트는 천재지변, 서버 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</li>
            <li>이용자가 본 사이트의 콘텐츠를 기반으로 내린 결정에 대해 본 사이트는 책임을 지지 않습니다.</li>
            <li>외부 링크를 통해 이동한 사이트의 콘텐츠 및 서비스에 대해 본 사이트는 책임을 지지 않습니다.</li>
          </ul>

          <h2>7. 광고 게재</h2>
          <p>
            본 사이트는 운영 비용 충당을 위해 구글 애드센스(Google AdSense) 등의 광고를 게재할 수 있습니다.
            광고 내용은 본 사이트의 입장과 무관하며, 광고주의 제품·서비스에 대한 책임은 해당 광고주에게 있습니다.
          </p>

          <h2>8. 약관의 변경</h2>
          <p>
            본 약관은 관련 법령 변경, 서비스 변경 등의 사유로 수정될 수 있습니다.
            변경 시 본 페이지에 공지하며, 변경된 약관은 공지한 시점부터 효력이 발생합니다.
          </p>

          <h2>9. 문의</h2>
          <p>
            본 약관에 대한 문의사항은{" "}
            <a href={`mailto:${contactEmail}`} style={{ color: "var(--accent)" }}>{contactEmail}</a> 또는{" "}
            <Link href="/contact" style={{ color: "var(--accent)" }}>문의하기 페이지</Link>를 통해 연락해주시기 바랍니다.
          </p>

        </div>
      </main>
    </div>
  );
}
