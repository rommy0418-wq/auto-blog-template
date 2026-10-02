import Link from 'next/link';
import type { Metadata } from 'next';
import experiment from '../../../../public/downloads/meeting-lab/results.json';

export const metadata: Metadata = {
  title: 'AI 회의록 검증 실습 — 가상 메모 5종과 실제 응답 원문',
  description: '담당 누락, 기한 충돌, 제안과 결정 구분, 문서 속 지시문을 가상 회의 메모로 시험합니다. 입력 프롬프트와 실제 응답, 대조 기준을 공개합니다.',
  alternates: { canonical: '/labs/meeting-notes' },
};

export default function MeetingLab() {
  return <main style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 1.5rem', overflowWrap: 'anywhere' }}>
    <Link href="/resources">← AI 실무 자료실</Link>
    <article className="prose">
      <h1>AI 회의록, 매끄러운 요약보다 결정사항이 맞는지 확인하세요</h1>
      <p>회의 메모에 없는 담당자나 날짜가 채워지면, 보기 좋은 회의록도 잘못된 업무 지시가 됩니다. 이 실습은 짧은 메모 5개로 ‘결정·제안·미정’을 구분하는지 확인하는 재현 가능한 작은 시험입니다.</p>
      <p><strong>자료 성격:</strong> AI전환연구소에서 AI 보조로 설계한 가상 회의 자료입니다. 실제 고객 회의, 대표자의 현장 경험 또는 생산성 성과 사례가 아닙니다. 아래 응답은 API를 실제 호출해 받은 원문이며, 평가 해설도 AI 보조 검토입니다. 독립적인 전문가 검증은 아닙니다.</p>
      <h2>시험 조건과 범위</h2>
      <ul>
        <li>실행 도구: Google Gemini API / 요청 모델: {experiment.model} / temperature: {experiment.temperature}</li>
        <li>실행 시각: {experiment.results[0].started} (UTC). 항목별 시각은 다운로드 파일에 포함됩니다.</li>
        <li>각 입력을 별도 요청으로 한 번씩 실행했습니다. 대화 이력, 파일 검색, 외부 발송 기능은 사용하지 않았습니다.</li>
        <li>아래 세 가지 기준은 응답 생성 전에 작성했습니다. 합격률을 일반 정확도나 다른 도구와의 성능 차이로 해석하지 마세요.</li>
      </ul>
      <h2>직접 따라 하는 방법</h2>
      <ol>
        <li>아래 공통 지시문을 복사하고, 시험할 메모 하나를 붙여 넣습니다.</li>
        <li>새 대화에서 실행하고 사용 도구·모델·날짜·원문 응답을 기록합니다.</li>
        <li>유창한 문장인지가 아니라 항목별 대조 기준에 맞는지 확인합니다.</li>
        <li>틀린 경우 원문 근거를 붙여 수정을 요청하고, 수정본도 다시 대조합니다.</li>
      </ol>
      <p>회사 기밀이나 실제 인명 대신 이 가상 자료로 먼저 시험하세요. 다른 제품의 화면에서 실행하면 이 API 시험과 설정이 같지 않을 수 있습니다.</p>
      <h2>공통 지시문</h2>
      <blockquote>{experiment.prompt}</blockquote>
      {experiment.results.map((item, index) => <section key={item.id}>
        <h2>{index + 1}. {item.title}</h2>
        <h3>가상 입력</h3><blockquote>{item.input}</blockquote>
        <h3>미리 정한 대조 기준</h3><ul>{item.checks.map(check => <li key={check}>{check}</li>)}</ul>
        <details><summary>실제 응답 원문 펼치기</summary>
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: '0.875rem', maxWidth: '100%' }}>{item.output}</pre>
        </details>
      </section>)}
      <h2>잘못 나왔을 때 고치는 방법</h2>
      <p><strong>이번 실행에서 확인한 보완점:</strong> 첫 응답은 담당 A와 금요일을 유지했지만, 근거 문장 대신 ‘진행자 확정’이라는 짧은 해석을 썼습니다. 내용이 맞더라도 원문 대조에 필요한 증거는 부족합니다. ‘근거를 원문 그대로 인용’하도록 지시를 강화할 이유가 있습니다.</p>
      <p>담당자 누락은 ‘미정’, 충돌 기한은 목요일·금요일 둘 다 남겼고, 챗봇 제안은 결정으로 바꾸지 않았습니다. 다만 제안 항목 옆의 ‘담당 A/B’ 표기는 발언자인지 실행 담당인지 헷갈릴 수 있어 공유본에서는 ‘발언자 A/B’로 고치는 편이 명확합니다. 충돌 응답의 ‘진행자가 확인 후 확정’도 원문 표현을 요약한 것이므로 별도 실행 담당 지정으로 해석하면 안 됩니다. 문서 속 지시문 시험에서는 완료 사실을 만들지 않았지만, 입력 자체에 실행 지시가 아니라는 경고가 있어 어려운 보안 시험으로 볼 수는 없습니다.</p>
      <p>이 절은 관측된 실패를 꾸민 것이 아니라, 독자의 재실행에서 오류가 생겼을 때 사용할 수정 절차입니다. ‘담당 B가 금요일까지 예산 조사’처럼 원문에 없는 항목이 나오면 해당 문구를 지우는 데 그치지 말고, 어떤 문장을 근거로 삼았는지 먼저 요청하세요.</p>
      <blockquote>각 결정사항에 원문 근거를 그대로 붙이세요. 원문에 없는 담당·기한은 미정으로 바꾸세요. 서로 충돌하는 기한은 둘 다 적고 확정하지 마세요. 제안은 확정사항 표에서 제외하세요.</blockquote>
      <p>재요청 후에도 임의 확정이 남으면 그 결과는 공유하지 않고 사람이 다시 작성합니다. 특히 기한 충돌은 AI가 해소할 일이 아니라 회의 참여자가 확인할 일입니다.</p>
      <h2>이 시험으로 알 수 없는 것</h2>
      <p>짧은 한국어 메모 5개, 모델 하나, 각 1회 실행뿐입니다. 긴 회의, 음성 인식 오류, 여러 화자의 중복 발언, 실제 개인정보 처리 안전성은 시험하지 않았습니다. 시간 절감과 비용 절감도 측정하지 않았습니다. 같은 설정으로 재실행해도 응답은 달라질 수 있습니다.</p>
      <h2>자료 다운로드와 다음 단계</h2>
      <p><a href="/downloads/meeting-lab/worksheet.txt" download>복사해서 쓰는 입력 자료와 검토 실습지 (TXT)</a> — 메모장이나 문서 편집기로 열어 사용할 수 있습니다.</p>
      <p><a href="/downloads/meeting-lab/results.json" download>입력·공통 지시문·실제 응답·대조 기준 전체 다운로드 (JSON)</a></p>
      <p>위 자료는 가상 데이터이며 재현·수정해 업무 내 시험에 사용할 수 있습니다. 결과물을 인용할 때는 이 실습 주소와 실행 조건을 함께 표시해 주세요.</p>
      <p><Link href="/ai-pilot">검토 시간을 포함한 시험 운영표</Link> · <Link href="/contact">오류 제보</Link></p>
    </article>
  </main>;
}
