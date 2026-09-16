import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "AI전환연구소 개인정보처리방침 — 개인정보 수집·이용·보관·파기 안내",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AI전환연구소";

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
            <Link href="/contact" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              문의
            </Link>
            <Link href="/" style={{ fontSize: "0.75rem", color: "var(--header-muted)", textDecoration: "none" }}>
              ← 홈으로
            </Link>
          </nav>
        </div>
      </header>

      {/* 본문 */}
      <main style={{ maxWidth: "52rem", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 800,
          color: "var(--ink)",
          marginBottom: "0.5rem",
          lineHeight: 1.3,
        }}>
          개인정보처리방침
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--ink-faint)", marginBottom: "3rem" }}>
          최종 수정: 2026년 9월 16일
        </p>

        <div className="prose" style={{ fontSize: "0.9375rem", lineHeight: 1.85 }}>

          <p>
            <strong>{siteName}</strong>(이하 &ldquo;본 사이트&rdquo;)는 이용자의 개인정보를 중요시하며,
            개인정보 보호를 위한 조치를 운영합니다. 본 방침은 본 사이트가
            어떠한 개인정보를 수집하고, 어떻게 이용·보호하는지 안내합니다.
          </p>

          <h2>1. 수집하는 개인정보 항목</h2>
          <p>본 사이트는 서비스 제공을 위해 아래와 같은 정보를 수집합니다.</p>
          <ul>
            <li>
              <strong>댓글 작성 시:</strong> 닉네임, 댓글 내용, 작성 시각, 삭제용 비밀번호의 bcrypt 해시, IP 주소의 해시를 저장합니다. 비밀번호 원문은 저장하지 않습니다. 승인된 닉네임과 댓글은 공개됩니다.
            </li>
            <li>
              <strong>좋아요 기능 이용 시:</strong> IP 주소와 브라우저 정보(User-Agent)를 조합한 해시, 글 번호, 시각을 중복 확인에 사용합니다.
            </li>
            <li>
              <strong>접속·보안 정보:</strong> 호스팅 서비스가 접속 IP, 브라우저, 요청 URL 등을 처리할 수 있습니다. 사이트의 신규 요청 제한·스팸 기록에는 원본 IP 대신 비밀키 기반 식별값과 시각·요청 횟수 또는 탐지 유형을 저장합니다. 과거 보안 기록에는 원본 IP가 남아 있을 수 있습니다. 해시 처리는 완전한 익명화를 뜻하지 않습니다.
            </li>
          </ul>
          <p>
            민감정보(건강정보, 금융정보 등)나 타인의 개인정보·기밀을 댓글에 입력하지 마세요.
            회원가입 없이 대부분의 서비스를 이용할 수 있습니다.
          </p>

          <h2>2. 개인정보의 수집 목적 및 이용</h2>
          <ul>
            <li>댓글·좋아요 등 서비스 제공 및 운영</li>
            <li>불법 이용 행위 방지 및 스팸 댓글 차단</li>
            <li>Google Analytics를 통한 방문·이용 통계 분석</li>
          </ul>

          <h2>3. 개인정보의 보유 및 이용 기간</h2>
          <p>
            댓글과 좋아요 기록은 해당 기능을 제공하는 동안 보관하며 삭제 요청 또는 해당 기록 삭제 시 처리합니다.
            종전의 ‘IP 해시 1년 후 자동 파기’, ‘서버 로그 3개월’ 안내는 실제 자동 처리와 일치하지 않아 정정했습니다.
          </p>
          <ul>
            <li>댓글: 삭제용 비밀번호로 직접 삭제하거나 문의 경로로 삭제를 요청할 수 있습니다. 삭제 시 댓글 행의 비밀번호·IP 해시도 함께 삭제됩니다.</li>
            <li>좋아요: 같은 브라우저·접속 조건에서 다시 누르면 취소할 수 있습니다. 접속 조건이 바뀌면 문의해 주세요.</li>
            <li>사이트 보안 기록: 자동 보관 만료 기능은 현재 없으며, 보안 목적과 삭제 요청에 따라 운영자가 검토합니다.</li>
            <li>호스팅 로그·서비스 백업과 Google 통계: 각 서비스의 설정과 정책에 따라 보관됩니다. 본 사이트의 기록 삭제와 외부 서비스 백업 삭제 시점이 같다고 보장하지 않습니다.</li>
          </ul>

          <h2>4. 제3자 제공 및 위탁</h2>
          <p>서비스 운영을 위해 다음 외부 서비스를 이용합니다. 접속·저장·분석 과정에서 해외 처리가 발생할 수 있습니다.</p>
          <ul>
            <li>Vercel: 웹사이트 호스팅과 접속 처리. <a href="https://vercel.com/legal/privacy-notice" rel="noopener noreferrer" target="_blank">개인정보 안내</a></li>
            <li>Neon PostgreSQL: 글·댓글·좋아요·보안 기록 저장. 현재 데이터베이스 지역은 미국 동부입니다. <a href="https://neon.com/privacy-policy" rel="noopener noreferrer" target="_blank">개인정보 안내</a></li>
            <li>Google: Analytics 방문 분석과 AdSense 광고 관련 처리. <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">개인정보처리방침</a></li>
            <li>Unsplash: 외부 이미지가 브라우저에 표시될 때 이미지 요청 정보가 해당 서비스로 전달될 수 있습니다.</li>
          </ul>
          <p>현재 댓글 보안은 요청 횟수 제한 방식이며 hCaptcha 위젯을 불러오지 않습니다. 문의 이메일을 보내면 발신 주소와 문의 내용이 이메일 서비스에서 처리됩니다. 서비스별 상세 처리·보관 조건 또는 삭제에 관한 문의는 아래 연락 경로를 이용해 주세요.</p>

          <h2>5. 구글 애드센스 및 쿠키</h2>
          <p>
            본 사이트에는 <strong>Google Analytics</strong> 방문 분석과 <strong>Google AdSense</strong> 관련 코드가 포함되어 있습니다.
            코드 설치는 광고 승인이나 실제 광고 노출을 의미하지 않습니다. Google 서비스는 이용·기기 정보와 쿠키 등을 처리할 수 있으며, 광고가 제공되는 경우 설정과 동의 상태에 따라 맞춤 광고가 표시될 수 있습니다.
          </p>
          <ul>
            <li>구글의 광고 쿠키 사용은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">구글 개인정보처리방침</a>에 따릅니다.</li>
            <li>이용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">구글 광고 설정</a>에서 맞춤 광고를 비활성화할 수 있습니다.</li>
            <li>브라우저 설정을 통해 쿠키 수집을 거부할 수 있으나, 일부 서비스 이용에 제한이 생길 수 있습니다.</li>
          </ul>

          <h2>6. 이용자의 권리</h2>
          <p>이용자는 언제든지 자신의 개인정보에 대해 아래 권리를 행사할 수 있습니다.</p>
          <ul>
            <li>개인정보 열람 요청</li>
            <li>오류 정정 요청</li>
            <li>삭제 요청</li>
            <li>처리 정지 요청</li>
          </ul>
          <p>
            권리 행사는 <Link href="/contact" style={{ color: "var(--accent)" }}>Contact 페이지</Link>를 통해 요청하실 수 있으며,
            본 사이트는 요청 내용과 본인 확인에 필요한 범위를 검토하여 처리 결과를 안내합니다.
          </p>

          <h2>7. 개인정보 보호책임자</h2>
          <ul>
            <li><strong>운영자:</strong> 블로그 운영자</li>
            <li><strong>연락처:</strong> <Link href="/contact" style={{ color: "var(--accent)" }}>Contact 페이지</Link> 참조</li>
          </ul>

          <h2>8. 개인정보처리방침 변경</h2>
          <p>
            본 방침은 법령·정책의 변경 또는 서비스 변화에 따라 수정될 수 있습니다.
            변경 시 본 페이지에 공지하며, 중요한 변경 사항은 홈페이지 공지를 통해 안내합니다.
          </p>

        </div>
      </main>
    </div>
  );
}
