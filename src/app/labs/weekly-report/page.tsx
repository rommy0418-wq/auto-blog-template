import Link from 'next/link';
import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import result from '../../../../public/downloads/report-lab/result.json';
import failed from '../../../../public/downloads/report-lab/failed-1790945385133.json';

export const metadata: Metadata = { title: 'AI 주간 보고서 검토 실습 — 숫자·완료 상태·누락 대조', description: '가상 업무자료와 정답 기준으로 AI 보고서 초안을 검토합니다. 신규·이월, 작성·검수·공개, 집행·승인 대기를 구분하는 실습입니다.', alternates: { canonical: '/labs/weekly-report' } };
const dir = path.join(process.cwd(), 'public/downloads/report-lab');
const source = readFileSync(path.join(dir, 'source.txt'), 'utf8');
const prompt = readFileSync(path.join(dir, 'prompt.txt'), 'utf8');
const checklist = readFileSync(path.join(dir, 'checklist.txt'), 'utf8');

export default function ReportLab() {
  return <main style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 1.5rem', overflowWrap: 'anywhere' }}><Link href="/resources">← AI 실무 자료실</Link><article className="prose">
    <h1>AI 주간 보고서, ‘완료’와 숫자의 분모부터 검토하세요</h1>
    <p>보고서는 짧게 만드는 것만큼 서로 다른 상태를 합치지 않는 것이 중요합니다. 신규 접수와 이월, 작성 완료와 공개 완료, 지출과 승인 대기를 섞으면 문장은 매끄러워도 판단을 잘못하게 됩니다.</p>
    <p><strong>자료 성격:</strong> AI전환연구소가 AI 보조로 설계한 가상 업무자료입니다. 실제 회사 실적이나 대표자의 현장 사례가 아닙니다. 아래 검토 기준은 원자료의 숫자와 상태를 대조하기 위한 것이며 독립적인 전문가 검증은 아닙니다.</p>
    <h2>1. 원자료를 먼저 확인하세요</h2>
    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>{source}</pre>
    <h2>2. 초안 작성 지시문</h2><pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>{prompt}</pre>
    <p>새 대화에서 지시문 뒤에 원자료 전체를 붙여 넣고, 사용 도구·모델·실행 날짜를 기록하세요. 처음 나온 응답은 수정하지 않고 별도로 보존합니다. 회사 기밀이나 고객 정보 대신 제공한 가상 자료를 사용하세요.</p>
    <h2>실제 실행 기록과 원문</h2>
    <p>Google Gemini API / 요청 모델 {result.model} / temperature {result.temperature}. 실행 시각: {result.started} (UTC). 첫 시도({failed.started})는 HTTP {failed.status}로 실패했고, 간격을 둔 두 번째 시도에서 아래 응답을 확보했습니다. 총 2회 요청 중 보존된 초안은 1개입니다. 조회·발송 기능이나 대화 이력은 연결하지 않았습니다.</p>
    <details><summary>실제 AI 보고서 초안 원문 펼치기</summary><pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>{result.output}</pre></details>
    <h3>대조 결과: 숫자가 맞아도 평가는 근거가 필요합니다</h3>
    <p>초안은 신규 해결률 28/40=70%, 이월 대기 3건과 신규 대기 12건, 외부 공개 0개, 승인 대기 90,000원을 구분했습니다. 구매 수·매출과 확정 일정을 만들지 않았으며 자료 취합 담당·기한도 미정으로 남겼습니다.</p>
    <p>하지만 요약에 ‘높은 처리율’이라는 평가를 덧붙였습니다. 원자료에는 목표나 이전 주 실적이 없으므로 높다고 판단할 근거가 없습니다. ‘신규 접수 40건 중 28건 해결(70%)’로 고치는 것이 정확합니다.</p>
    <p>전체 대상 48건·해결 33건·68.75%와 현재 미집행 한도 320,000원은 초안에 없었습니다. 이는 허위 계산이 아니라 검토표 기준의 누락입니다. 보고 목적에 필요하다면 계산식과 함께 보충합니다. 초안의 검수 비율 4/7≈57.1%는 ‘작성 완료 건 대비’라고 분모를 밝혔으므로 틀린 계산으로 처리하지 않습니다. 전체 목표 대비 진행률 4/10=40%와 구분해 읽어야 합니다.</p>
    <h2>3. 먼저 계산해 둔 대조 기준</h2>
    <p>신규 건 해결률은 28÷40=70%입니다. 이월까지 포함한 대상은 48건이고 해결은 33건이므로 68.75%입니다. 둘은 분모가 다릅니다. 33÷40=82.5%를 신규 해결률로 쓰면 이월 해결을 섞은 잘못된 계산입니다.</p>
    <p>도움말은 작성 7개, 검수 4개, 공개 0개입니다. ‘도움말 개편 70% 완료’만 쓰면 무엇의 완료율인지 모호합니다. ‘초안 작성 7/10, 외부 공개 0/10’처럼 상태를 분리하세요.</p>
    <p>현재 미집행 한도는 500,000−180,000=320,000원입니다. 승인 대기 요청까지 고려한 230,000원은 조건부 계산이며, 절감 성과가 아닙니다. 클릭 120회만으로 구매 전환율이나 매출을 만들 수 없습니다.</p>
    <details><summary>전체 8개 검토 기준 펼치기</summary><pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.875rem' }}>{checklist}</pre></details>
    <h2>4. 수정 문장을 만드는 방법</h2>
    <p>아래는 실제 모델 오류를 인용한 것이 아니라 검토 방법을 보여 주기 위한 편집 예시입니다.</p>
    <ul>
      <li>‘도움말 7개 공개 완료’ → ‘초안 7개 작성, 이 중 4개 검수 완료. 외부 공개는 0개.’ [S2]</li>
      <li>‘9월 30일 공개 확정’ → ‘기존 목표 9월 28일에서 9월 30일로 연기 제안됨. 최종 확정 전.’ [S5]</li>
      <li>‘전환율 개선’ → ‘클릭 120회. 구매 수와 매출 자료가 없어 전환율 및 개선 여부 확인 불가.’ [S3, S6]</li>
    </ul>
    <p>숫자만 고치고 끝내지 말고, 그 숫자를 요약한 첫 문장과 결론도 다시 읽으세요. 본문의 공개 건수는 0인데 요약에 ‘개편 완료’가 남는 식의 불일치가 생길 수 있습니다.</p>
    <h2>5. 검토 후에도 남는 한계</h2><p>이 실습은 원자료 자체가 맞다는 전제에서 보고서로 옮기는 과정을 검사합니다. 실제 업무에서는 입력 데이터의 정확성부터 확인해야 합니다. 짧은 가상 자료 한 묶음으로 다른 보고서의 정확도나 업무 시간 절감을 보장할 수 없습니다.</p>
    <h2 id="downloads">자료 다운로드</h2><ul>{[['source.txt','가상 주간 업무 원자료'],['prompt.txt','초안 작성 지시문'],['checklist.txt','정답 기준과 검토표']].map(([file,label]) => <li key={file}><a href={`/downloads/report-lab/${file}`} download>{label} (TXT)</a></li>)}</ul>
    <p><a href="/downloads/report-lab/result.json" download>실제 초안·입력·실행 조건 (JSON)</a> · <a href="/downloads/report-lab/failed-1790945385133.json" download>첫 요청 실패 기록 (JSON)</a> · <a href="/downloads/report-lab/edited-report.txt" download>원자료 대조 후 편집 제안 (TXT)</a></p>
    <p>편집 제안은 추가 모델 실행 결과나 사람 전문가의 승인본이 아닌, 이 실습에서 원자료와 대조해 작성한 AI 보조 수정안입니다.</p>
    <p>복사·수정해 내부 연습에 사용할 수 있습니다. 인용 시 이 실습 주소를 함께 표시해 주세요.</p>
    <p><Link href="/labs/customer-support">고객 답변 실습</Link> · <Link href="/labs/meeting-notes">회의록 실습</Link> · <Link href="/contact">오류 제보</Link></p>
  </article></main>;
}
