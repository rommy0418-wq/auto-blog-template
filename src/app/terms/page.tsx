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
          최종 수정: 2026년 9월 16일
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
            본 사이트가 직접 작성·편집한 콘텐츠의 이용 문의는 운영자에게 연락해 주세요. 제3자 자료·이미지·상표의 권리는 각 권리자에게 있으며, AI 산출물 전체에 대한 독점적 저작권을 주장하지 않습니다.
          </p>
          <ul>
            <li>게시글 링크 공유를 환영합니다. 본문 전체의 재게시나 상업적 재사용은 먼저 문의해 주세요.</li>
            <li>법령상 허용되는 인용 등의 이용은 해당 요건에 따릅니다.</li>
            <li>외부 이미지와 자료를 재사용할 때에는 원출처의 이용 조건을 별도로 확인해야 합니다.</li>
          </ul>

          <h2>4. AI 생성 콘텐츠 면책</h2>
          <p>
            본 사이트의 일부 콘텐츠는 AI(인공지능) 기술을 활용하여 생성됩니다.
            AI 생성 콘텐츠에 대해 다음 사항을 안내드립니다.
          </p>
          <ul>
            <li>AI가 생성·편집한 내용은 참고 자료이며, 가상 예시는 실제 고객 성과나 운영자의 수행 실적이 아닙니다.</li>
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
            <li>서비스는 점검이나 장애로 일시 중단될 수 있습니다. 운영자는 확인된 오류와 장애를 수정하기 위해 노력합니다.</li>
            <li>콘텐츠는 개별 상황에 대한 법률·세무·투자 등 전문 자문을 대신하지 않습니다.</li>
            <li>외부 사이트는 해당 운영자의 정책에 따릅니다. 본 안내가 관련 법령상 배제할 수 없는 책임이나 이용자의 권리를 제한하지는 않습니다.</li>
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
