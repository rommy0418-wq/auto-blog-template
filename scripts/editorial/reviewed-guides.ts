export type Guide = { slug: string; title: string; meta: string; body: string; sources: [string, string][] };
export const governance: [string, string] = ['NIST AI RMF — 위험 관리의 역할과 범위', 'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/'];
export const agency: [string, string] = ['OWASP — AI에 과도한 실행 권한을 주는 위험', 'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/'];
export function renderGuide(g: Guide) {
  return `<p><strong>편집 정정 · 2026년 9월 16일</strong> — 이전 글의 확인되지 않은 경험·성과 표현을 정리했습니다. 아래 절차와 예시는 AI 보조 편집으로 작성한 업무 설계 제안이며, 운영자의 실제 고객 사례나 효과 측정 결과가 아닙니다.</p>\n${g.body}\n<h2>참고 범위와 다음 단계</h2><p>아래 공식 자료는 관련 개념과 확인 항목을 읽기 위한 자료입니다. 이 글의 예시·양식이나 도입 효과를 해당 기관이 검증했다는 의미는 아닙니다. 제품의 현재 제공 조건은 사용 계정과 공식 안내에서 다시 확인하세요.</p><ul>${g.sources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`).join('')}</ul><p><a href="/ai-pilot">시험 운영표에 입력 조건·실패·검수 시간을 기록하기</a> · <a href="/contents">다른 주제 찾아보기</a></p>`;
}
