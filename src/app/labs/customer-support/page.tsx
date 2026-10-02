import Link from 'next/link';
import type { Metadata } from 'next';
import experiment from '../../../../public/downloads/support-lab/results.json';
import retries from '../../../../public/downloads/support-lab/retries.json';
const records = experiment.results.map(item => ({ original: item, current: retries.results.find(retry => retry.id === item.id) ?? item }));

export const metadata: Metadata = {
  title: 'AI 고객 답변 검증 — 가상 문의 5종과 정책 대조 실습',
  description: '반품·파손·배송·보상·문서 속 지시문을 가상 문의로 시험합니다. 제공 정책과 실제 AI 응답을 비교하고 발송 전 검토 기준을 확인하세요.',
  alternates: { canonical: '/labs/customer-support' },
};
export default function SupportLab() {
  return <main style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 1.5rem', overflowWrap: 'anywhere' }}>
    <Link href="/resources">← AI 실무 자료실</Link>
    <article className="prose">
      <h1>AI 고객 답변, 친절한 문장보다 약속의 근거를 확인하세요</h1>
      <p>답변이 자연스럽더라도 ‘내일 도착합니다’, ‘환불이 완료됐습니다’처럼 확인하지 않은 약속이 들어가면 초안으로 사용할 수 없습니다. 이 실습은 가상 상점 정책을 제공하고, 문의 내용과 정책 사이의 차이를 AI가 어떻게 처리하는지 살펴봅니다.</p>
      <p><strong>자료 성격:</strong> AI전환연구소가 AI 보조로 설계한 가상 상점·문의입니다. 실제 고객 정보나 상담 이력이 아닙니다. 정책의 기간·금액은 실험용 설정이며 실제 약관, 소비자 권리 또는 법률 안내가 아닙니다. 실제 업무에는 해당 사업자의 검토된 정책을 사용해야 합니다.</p>
      <h2>무엇을 실제로 실행했나요?</h2>
      <p><strong>공개 결과:</strong> 문의 5종 중 응답 원문을 확보한 것은 3종입니다. 반품 조건 문의는 추가 요청에서 HTTP 503, 배송 문의는 HTTP 429로 응답을 확보하지 못했습니다. 두 항목은 연습 입력과 검토 기준만 제공하며, 모델의 정책 준수 여부는 판정하지 않습니다.</p>
      <ul>
        <li>Google Gemini API, 요청 모델 {experiment.model}, temperature {experiment.temperature}.</li>
        <li>첫 실행: {experiment.results[0].started} (UTC). 항목별 시각은 원자료에 기록했습니다.</li>
        <li>공개된 기록은 5개 문의를 각각 새 요청으로 한 번씩 실행한 재실행 묶음입니다. 첫 시도는 마지막 요청 오류로 중단되어 응답 원문을 보존하지 못했습니다. 그 뒤 실패도 기록하도록 실행기를 고쳐 전체를 다시 실행했습니다. 모든 요청에 같은 정책과 지시문을 넣었습니다.</li>
        <li>이 묶음에서 응답을 확보하지 못한 3건만 추가로 한 번씩 요청했습니다. 원래 실패 기록과 추가 요청 기록을 모두 다운로드로 제공합니다. 아래에는 가장 최근 요청의 결과를 보여 줍니다.</li>
        <li>주문 조회·상담 접수·환불·발송 기능은 연결하지 않았습니다. AI가 생성한 것은 텍스트뿐입니다.</li>
        <li>대조 기준은 실행 전에 정했습니다. 해설은 AI 보조 검토이며 독립적인 전문가 검증은 아닙니다.</li>
      </ul>
      <h2>먼저 제공한 정책을 읽어 보세요</h2>
      <p>질문만 주면 모델이 아는 일반적인 관행으로 빈칸을 채울 수 있습니다. 여기서는 사실의 기준을 아래 가상 정책으로 한정합니다. 정책 번호는 내부 대조용이고, 고객에게 그대로 보낼 문구가 아닙니다.</p>
      <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: '0.875rem' }}>{experiment.policy}</pre>
      <h2>복사해서 쓰는 공통 지시문</h2>
      <blockquote>{experiment.prompt}</blockquote>
      <h2>실습 순서</h2>
      <ol>
        <li>공통 지시문과 정책을 붙여 넣고, 아래 문의 하나만 추가합니다.</li>
        <li>응답을 수정하지 않은 상태로 저장하고 도구·모델·날짜를 기록합니다.</li>
        <li>고객용 초안과 내부 검토 메모를 따로 확인합니다. 내부 메모가 맞아도 고객용 약속이 잘못되면 수정해야 합니다.</li>
        <li>담당자가 원문 정책 및 실제 주문 정보를 확인하기 전에는 외부로 발송하지 않습니다.</li>
      </ol>
      {records.map(({ original, current: item }, i) => <section key={item.id}>
        <h2>{i + 1}. {item.title}</h2>
        <blockquote>{item.input}</blockquote>
        <h3>실행 전에 정한 대조 기준</h3>
        <ul>{item.checks.map(check => <li key={check}>{check}</li>)}</ul>
        <p>응답 상태: {item.status === 'response' ? '응답 확보' : '응답 미확보 — 정책 준수 여부 판정 불가'}</p>
        {original.status !== 'response' && <p>앞선 요청에서 오류가 발생해 추가 요청한 항목입니다. 최신 요청 시각: {item.started} (UTC).</p>}
        <details><summary>{item.status === 'response' ? '실제 응답 원문 펼치기' : '실패 기록 펼치기'}</summary><pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: '0.875rem' }}>{item.output}</pre></details>
      </section>)}
      <h2>실제로 발견한 문제: 할 수 없는 후속 안내 약속</h2>
      <p>파손 문의에서는 사진과 주문번호를 확인한 후 담당자가 판단해야 한다고 답했고, 즉시 환불 완료를 선언하지 않았습니다. 다만 첫 사과 문장은 파손 사실을 확인한 듯 읽힐 수 있어 ‘파손되었다는 말씀에’처럼 고객 진술임을 드러내는 수정이 가능합니다.</p>
      <p>보상 요구에 대한 응답은 ‘담당자가 해당 내용을 검토 후 다시 안내해 드릴 예정입니다’라고 썼습니다. 이 실험에는 접수나 이관 기능이 없으므로 실제 담당자의 후속 행동을 확약할 근거가 없습니다. 내부 메모에서 확인이 필요하다고 적었어도 고객용 문장의 약속은 별도로 수정해야 합니다.</p>
      <p>같은 응답은 고객이 말했다는 사용 상태와 경과 기간을 단정적으로 반복했습니다. 고객 진술임을 표시하고, 예외 가능 여부와 이전 쿠폰 약속은 담당자가 확인해야 한다고 남기는 편이 정확합니다.</p>
      <h3>편집 제안 — AI 재실행 결과가 아닌 수정 예시</h3>
      <blockquote>말씀하신 사용 상태와 수령 후 경과 기간을 기준으로 보면, 안내된 일반 단순 변심 반품 조건과 다릅니다. 예외 적용 여부와 이전 쿠폰 약속은 담당자의 확인이 필요합니다. 이 답변은 반품 승인이나 상담 접수 완료를 의미하지 않습니다.</blockquote>
      <p>민감정보 문의 응답은 해당 정보를 요청하지 않았지만 ‘보내지 마세요’라는 명시적 경고는 없었습니다. 발송본에는 이 문장을 보강하고, 주문번호를 받을 검증된 비공개 문의 경로는 사람이 확인해 넣어야 합니다. 없는 주소를 AI가 만들어 넣게 해서는 안 됩니다.</p>
      <h2>발송 전 확인할 세 가지</h2>
      <ol>
        <li><strong>조건과 승인:</strong> ‘접수 가능 조건에 해당할 수 있음’과 ‘반품이 승인됨’은 다릅니다. 고객의 미사용 주장도 아직 확인한 사실은 아닙니다.</li>
        <li><strong>계획과 완료:</strong> 담당자 확인이 필요하다는 말은 가능하지만, 연결된 기능 없이 접수·전달을 마쳤다고 하면 안 됩니다.</li>
        <li><strong>내부 메모와 고객 답변:</strong> 정책 번호, 확인할 쟁점은 내부에 남기고 고객에게 보낼 내용만 분리합니다. 실제 연락 경로가 없다면 URL을 만들어 넣지 않습니다.</li>
      </ol>
      <h2>재실행에서 오류가 발견되면</h2>
      <p>다음은 독자가 사용할 수정 지시 예시입니다. 이 지시로 추가 실행한 결과가 아니라 편집용 제안입니다.</p>
      <blockquote>초안의 문장마다 정책 근거와 확인된 주문 정보가 있는지 점검하세요. 확인하지 않은 처리 완료·혜택·도착 보장은 삭제하세요. 고객 진술은 조건부로 표현하세요. 내부 메모와 고객용 문장을 분리하고, 담당자가 확인해야 하는 내용을 남기세요.</blockquote>
      <p>금액·기간·승인·완료 여부 중 하나라도 근거가 없으면 발송을 멈추고 사람이 수정합니다. 단순히 더 공손하게 바꾸는 것은 사실 오류의 해결이 아닙니다.</p>
      <h2>해석의 한계</h2>
      <p>짧은 문의 5개, 모델 하나로 실행했고 오류 항목만 추가 요청했습니다. 성공 응답만으로 전체 요청의 성공률을 계산하면 안 됩니다. 여러 차례 대화, 악의적 입력 전반, 실제 주문 시스템과 연결된 행동은 검증하지 않았습니다. 고객 만족도·시간 절감·일반 정확도도 측정하지 않았습니다. 가상 정책을 충실히 따랐다는 사실이 실제 법적 적합성을 뜻하지 않습니다.</p>
      <h2>자료와 다음 단계</h2>
      <p><a href="/downloads/support-lab/worksheet.txt" download>정책·문의·검토 실습지 (TXT)</a> · <a href="/downloads/support-lab/results.json" download>실제 응답을 포함한 전체 원자료 (JSON)</a></p>
      <p><a href="/downloads/support-lab/retries.json" download>응답 미확보 3건의 추가 요청 기록 (JSON)</a></p>
      <p>가상 자료는 복사·수정하여 내부 시험에 사용할 수 있습니다. 결과를 인용할 때는 이 페이지 주소와 실행 조건을 함께 적어 주세요.</p>
      <p><Link href="/labs/meeting-notes">회의록 검증 실습</Link> · <Link href="/ai-pilot">시간·오류 기록을 위한 시험 운영표</Link> · <Link href="/contact">오류 제보</Link></p>
    </article>
  </main>;
}
