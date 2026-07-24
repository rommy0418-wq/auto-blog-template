import { Pool } from "pg";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const reviewedPosts = [
  {
    slug: "tools-016",
    metaDescription:
      "2026년 7월 공식 자료를 기준으로 Runway와 HeyGen의 활용 차이, 변경된 요금 체계, 현재 이용 가능한 AI 영상 제작 방식을 정리합니다.",
    content: `
<p>AI 영상 도구는 변화 속도가 매우 빨라 몇 달 전 비교표도 그대로 믿기 어렵습니다. 이 글은 <strong>2026년 7월 24일 공식 자료를 기준</strong>으로 기업 실무자가 확인해야 할 선택 기준을 다시 정리했습니다.</p>

<h2>먼저 바로잡아야 할 정보</h2>
<p>기존 글은 OpenAI Sora를 제한 공개 단계의 미래 도구로 설명했지만, OpenAI 공식 페이지는 해당 Sora 제품이 2026년 4월 26일부터 더 이상 제공되지 않는다고 안내합니다. 따라서 현재 기업 도입 후보를 고를 때는 Sora를 즉시 사용할 수 있는 서비스처럼 평가해서는 안 됩니다.</p>
<blockquote>검수 기준: 제품 이름보다 실제 이용 가능 여부, 상업적 사용 조건, 데이터 처리 정책을 먼저 확인해야 합니다.</blockquote>

<h2>2026년 기준 한눈에 비교</h2>
<table>
  <thead>
    <tr><th>도구</th><th>현재 판단</th><th>강점</th><th>추천 용도</th></tr>
  </thead>
  <tbody>
    <tr><td>Runway</td><td>상용 서비스 운영</td><td>영상 생성과 편집을 한 환경에서 처리</td><td>광고 시안, 콘셉트 영상, 크리에이티브 제작</td></tr>
    <tr><td>HeyGen</td><td>상용 서비스 운영</td><td>아바타·다국어·교육 영상 제작</td><td>교육, 제품 설명, 사내 안내, 글로벌 현지화</td></tr>
    <tr><td>OpenAI Sora</td><td>기존 제품 제공 종료 안내</td><td>영상 생성 기술의 연구·제품 방향을 보여준 사례</td><td>도입 후보가 아니라 공식 후속 제품 확인 대상</td></tr>
  </tbody>
</table>

<h2>Runway를 선택할 때 확인할 점</h2>
<p>Runway는 생성과 편집을 함께 다뤄야 하는 마케팅·콘텐츠 팀에 적합합니다. 다만 2026년에는 고사용량 요금제가 Unlimited에서 Max 중심으로 전환되고 있어 과거 가격표를 그대로 적용하면 안 됩니다. 프로젝트를 시작하기 전 최신 가격, 월별 크레딧, 사용 가능한 모델, 상업적 사용 조건을 공식 요금 페이지에서 다시 확인해야 합니다.</p>
<ul>
  <li>짧은 광고 시안과 콘셉트 영상을 반복 제작하는지 확인합니다.</li>
  <li>한 편의 영상에 필요한 재생성 횟수를 포함해 크레딧을 계산합니다.</li>
  <li>납기 업무라면 생성 대기 시간과 동시 작업 제한도 비교합니다.</li>
</ul>
<strong>핵심 요약: Runway는 창작·편집 범위가 넓지만 요금제 이름과 크레딧 구조가 바뀔 수 있습니다.</strong>

<h2>HeyGen을 선택할 때 확인할 점</h2>
<p>HeyGen은 사람이 직접 촬영하지 않고 발표형 영상을 반복 생산할 때 효율적입니다. 공식 도움말에 따르면 2026년에는 유료 플랜이 크레딧 중심으로 운영되며, Creator·Pro·Business가 서로 다른 월별 크레딧과 협업 기능을 제공합니다.</p>
<ul>
  <li>아바타 영상의 월간 제작 분량을 먼저 계산합니다.</li>
  <li>한국어 음성 품질과 고유명사 발음을 시험합니다.</li>
  <li>얼굴·음성 복제는 당사자 동의와 내부 승인 절차를 둡니다.</li>
  <li>팀 작업이라면 SSO, 공동 편집, 브랜드 관리 기능을 확인합니다.</li>
</ul>
<strong>핵심 요약: HeyGen은 설명·교육 영상에 강하지만 크레딧과 개인정보 관리가 핵심입니다.</strong>

<h2>기업 도입은 작은 시험부터 시작하세요</h2>
<ol>
  <li><strong>1주차:</strong> 실제 업무용 30초 영상 한 편을 두 도구로 각각 제작합니다.</li>
  <li><strong>2주차:</strong> 제작 시간, 재생성 횟수, 수정 편의성, 한국어 품질을 기록합니다.</li>
  <li><strong>3주차:</strong> 브랜드·저작권·개인정보 검토 절차를 확정합니다.</li>
  <li><strong>4주차:</strong> 월간 예상 제작량을 기준으로 요금제를 선택합니다.</li>
</ol>

<h2>공식 자료</h2>
<ul>
  <li><a href="https://openai.com/index/sora-is-here/" target="_blank" rel="noopener noreferrer">OpenAI — Sora 제품 상태 안내</a></li>
  <li><a href="https://help.runwayml.com/hc/en-us/articles/21664961171475-Which-plan-is-right-for-me" target="_blank" rel="noopener noreferrer">Runway — 요금제 선택 공식 도움말</a></li>
  <li><a href="https://help.runwayml.com/hc/en-us/articles/52068047744019-Unlimited-plan-is-switching-to-Max" target="_blank" rel="noopener noreferrer">Runway — Unlimited에서 Max 전환 안내</a></li>
  <li><a href="https://help.heygen.com/en/articles/15125761-heygen-credit-based-pricing-plans-explained" target="_blank" rel="noopener noreferrer">HeyGen — 크레딧 기반 요금제 공식 안내</a></li>
</ul>
<p><strong>최종 검수일: 2026년 7월 24일</strong></p>`,
  },
  {
    slug: "foundation-003",
    metaDescription:
      "2026년 7월 공식 자료를 바탕으로 ChatGPT·Claude·Gemini를 기업 보안, 업무 연동, 문서 작업, 도입 목적별로 비교합니다.",
    content: `
<p>ChatGPT, Claude, Gemini 중 무엇이 무조건 최고라고 말하기는 어렵습니다. 기업 도입에서는 모델 점수보다 <strong>어떤 업무에 연결할지, 회사 데이터가 어떻게 처리되는지, 관리자가 통제할 수 있는지</strong>가 더 중요합니다. 이 글은 2026년 7월 24일 공식 자료를 기준으로 선택 기준을 정리했습니다.</p>

<h2>한눈에 보는 선택 기준</h2>
<table>
  <thead><tr><th>우선 과제</th><th>먼저 검토할 서비스</th><th>이유</th></tr></thead>
  <tbody>
    <tr><td>범용 업무·분석·도구 연결</td><td>ChatGPT</td><td>문서, 분석, 코딩, 외부 업무 도구 연결을 폭넓게 검토하기 좋습니다.</td></tr>
    <tr><td>긴 문서 검토·정교한 글쓰기</td><td>Claude</td><td>문서 중심 업무와 지침을 따르는 장문 작업에서 비교 가치가 높습니다.</td></tr>
    <tr><td>Gmail·Docs·Sheets 중심 업무</td><td>Gemini</td><td>Google Workspace를 이미 사용하는 조직에서 연동 이점을 검토하기 좋습니다.</td></tr>
  </tbody>
</table>
<p>이 표는 절대적인 성능 순위가 아닙니다. 같은 프롬프트와 같은 실제 문서로 시험해야 정확한 결론을 낼 수 있습니다.</p>

<h2>ChatGPT가 적합한 경우</h2>
<p>다양한 부서가 하나의 AI 환경에서 문서 작성, 데이터 분석, 코딩, 리서치와 업무 도구 연결을 함께 사용하려는 경우 우선 검토할 수 있습니다. 기업 도입 시에는 개인용 플랜과 조직용 플랜의 데이터 처리·관리 기능이 다르므로 반드시 구분해야 합니다.</p>
<ul>
  <li>여러 종류의 업무를 한 서비스에서 시험하려는 조직</li>
  <li>관리자 기능, SSO, 사용량 관리가 필요한 팀</li>
  <li>Microsoft 365, Google Drive, Slack 등 외부 도구 연결을 검토하는 조직</li>
</ul>

<h2>Claude가 적합한 경우</h2>
<p>보고서, 제안서, 계약서 초안처럼 긴 문맥을 유지하며 읽고 쓰는 작업에서 비교할 가치가 있습니다. 다만 모델 이름과 이용 한도는 자주 바뀌므로 특정 버전명만 보고 장기 도입을 결정하면 안 됩니다.</p>
<ul>
  <li>문서 검토와 요약 비중이 높은 조직</li>
  <li>정해진 작성 지침과 문체를 지속적으로 적용해야 하는 팀</li>
  <li>API 기반 문서 자동화를 검토하는 개발 조직</li>
</ul>

<h2>Gemini가 적합한 경우</h2>
<p>Google Workspace를 업무 기반으로 사용하는 기업이라면 Gmail, Docs, Sheets 등과의 결합을 중심으로 검토할 수 있습니다. 개인 Google 계정용 Gemini와 회사 계정용 Workspace·Enterprise 환경은 데이터 보호와 관리 방식이 다를 수 있습니다.</p>
<ul>
  <li>Google Workspace가 이미 표준 업무 환경인 조직</li>
  <li>메일·문서·스프레드시트 흐름 안에서 AI를 사용하려는 팀</li>
  <li>관리자가 사용자별 접근과 데이터 보호 수준을 통제해야 하는 조직</li>
</ul>

<h2>회사에서 직접 비교하는 방법</h2>
<ol>
  <li>민감정보를 제거한 실제 업무 문서 3개를 준비합니다.</li>
  <li>세 서비스에 동일한 지시문과 평가 기준을 사용합니다.</li>
  <li>정확성, 수정 횟수, 작업 시간, 보안·관리 기능을 기록합니다.</li>
  <li>무료 체험 결과만 보지 말고 실제 조직용 계약 조건을 확인합니다.</li>
</ol>
<blockquote>추천 평가 질문: “결과가 그럴듯한가?”가 아니라 “직원이 검토하는 시간을 실제로 줄였는가?”를 측정하세요.</blockquote>

<h2>공식 자료</h2>
<ul>
  <li><a href="https://openai.com/business/pricing/" target="_blank" rel="noopener noreferrer">OpenAI — ChatGPT Business 공식 안내</a></li>
  <li><a href="https://www.anthropic.com/pricing" target="_blank" rel="noopener noreferrer">Anthropic — Claude 공식 요금 안내</a></li>
  <li><a href="https://support.google.com/gemini/answer/14620100" target="_blank" rel="noopener noreferrer">Google — 업무용 Gemini 사용 안내</a></li>
</ul>
<p><strong>최종 검수일: 2026년 7월 24일</strong></p>`,
  },
];

async function main() {
  for (const post of reviewedPosts) {
    const result = await pool.query(
      `UPDATE posts
       SET content = $1, meta_description = $2, upgraded_at = NOW()
       WHERE slug = $3 AND status = 'published'
       RETURNING id, title, slug`,
      [post.content.trim(), post.metaDescription, post.slug]
    );

    if (!result.rowCount) {
      throw new Error(`게시글을 찾을 수 없습니다: ${post.slug}`);
    }

    console.log(`[검수 반영] ${result.rows[0].slug} — ${result.rows[0].title}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
