import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'AI 실무 자료실 — 시작하기, 직접 해보기, 자료 다운로드', description: '가상 자료로 재현하는 AI 회의록 실습과 업무 도입 시험 운영표. 입력·응답·검토 기준을 함께 확인하세요.', alternates: { canonical: '/resources' } };
export default function Resources() {
  return <main style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 1.5rem' }}><Link href="/">← AI전환연구소</Link><article className="prose">
    <h1>AI 실무 자료실</h1><p>설명을 읽는 데서 끝내지 않고, 공개 가능한 자료로 직접 실행하고 결과를 대조하는 공간입니다. 실습 입력은 가상 자료이며 실제 기업 성과를 의미하지 않습니다.</p>
    <h2>1. 처음 시작하기</h2><p><Link href="/ai-pilot">AI 도입 시험 운영표</Link> — 어떤 업무를 맡길지, 검토자는 누구인지, 언제 중단할지 먼저 정합니다.</p>
    <h2>2. 직접 해보기</h2><p><Link href="/labs/meeting-notes">AI 회의록 검증 실습</Link> — 담당자 누락부터 기한 충돌까지 5개 입력과 실제 모델 응답을 대조합니다.</p>
    <p><Link href="/labs/customer-support">AI 고객 문의 답변 검증 실습</Link> — 반품·배송·보상 등 5개 문의에서 정책 밖 약속과 처리 완료 표현을 검토합니다.</p>
    <h2>3. 자료 다운로드</h2><ul><li><a href="/downloads/meeting-lab/results.json" download>회의록 실험 원자료 (JSON)</a> — 입력, 프롬프트, 결과, 검토 기준.</li><li><a href="/downloads/ai-pilot-log.csv" download>시험 운영 기록표 (CSV)</a> — 실제 업무에서 시간과 오류를 직접 기록하는 빈 양식.</li></ul>
    <p><a href="/downloads/meeting-lab/worksheet.txt" download>회의록 입력 자료와 검토 실습지 (TXT)</a> — 메모장에서 열어 복사해 쓰는 실습 자료입니다.</p>
    <p><a href="/downloads/support-lab/worksheet.txt" download>고객 문의 정책·입력·검토 실습지 (TXT)</a> · <a href="/downloads/support-lab/results.json" download>고객 답변 실험 원자료 (JSON)</a></p>
    <h2>실험 공개 원칙</h2><p>실제로 실행한 응답과 설명용 예시를 구분합니다. 좋은 결과만 보여 주지 않고 입력·조건·한계를 공개합니다. 실험 건수를 일반적인 정확도나 수익 보장으로 해석하지 않습니다. 실명이나 고객 자료를 공개할 필요 없이 가상 자료로 시작할 수 있습니다.</p>
  </article></main>;
}
