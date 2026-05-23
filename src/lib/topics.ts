/**
 * 블로그 주제 목록
 * 니치: 기업 AI 전환 실전 가이드 (25년 웹·광고 기획 전문가 관점)
 */

export interface Topic {
  index: number;
  slug: string;
  level: "기초편" | "중급편" | "고급편";
  category: "foundation" | "tools" | "marketing" | "transform" | "business" | "cases";
  title: string;
  keywords: string;
  meta_description: string;
}

export const allTopics: Topic[] = [

  // ── 기초편 / foundation (AI 입문·트렌드) ──────────────────────────
  {
    index: 1, slug: "foundation-001", level: "기초편", category: "foundation",
    title: "AI 트랜스포메이션이란? 중소기업 대표가 꼭 알아야 할 기본 개념",
    keywords: "AI트랜스포메이션,중소기업AI,AI전환입문",
    meta_description: "AI 트랜스포메이션의 정의부터 중소기업 적용 방법까지 현장 경험을 바탕으로 쉽게 설명합니다.",
  },
  {
    index: 2, slug: "foundation-002", level: "기초편", category: "foundation",
    title: "생성형 AI 완전 초보 가이드 — 사장님도 5분이면 이해한다",
    keywords: "생성형AI,ChatGPT입문,AI기초",
    meta_description: "생성형 AI가 무엇인지, 어떻게 비즈니스에 쓸 수 있는지 비전문가도 이해할 수 있게 설명합니다.",
  },
  {
    index: 3, slug: "foundation-003", level: "기초편", category: "foundation",
    title: "ChatGPT vs Claude vs Gemini 비교 — 우리 회사에 맞는 AI는?",
    keywords: "ChatGPT비교,Claude,Gemini,AI도구비교",
    meta_description: "ChatGPT·Claude·Gemini의 차이점을 업무 목적별로 비교하고 우리 회사에 맞는 AI를 선택하는 법을 알아봅니다.",
  },
  {
    index: 4, slug: "foundation-004", level: "기초편", category: "foundation",
    title: "AI 도입 전 반드시 확인해야 할 체크리스트 10가지",
    keywords: "AI도입체크리스트,AI준비사항,AI전환준비",
    meta_description: "AI를 도입하기 전에 조직이 준비됐는지 확인하는 10가지 체크리스트를 공유합니다.",
  },
  {
    index: 5, slug: "foundation-005", level: "기초편", category: "foundation",
    title: "직원 5명 소규모 회사의 AI 도입 입문 가이드",
    keywords: "소규모회사AI,소기업AI도입,AI입문",
    meta_description: "규모가 작아도 AI를 충분히 활용할 수 있습니다. 직원 5명 이하 소규모 회사를 위한 AI 도입 첫걸음 가이드입니다.",
  },
  {
    index: 6, slug: "foundation-006", level: "기초편", category: "foundation",
    title: "AI가 대체하는 직무 vs 살아남는 직무 — 2025년 현실적 전망",
    keywords: "AI직무대체,AI시대직업,살아남는직업",
    meta_description: "AI로 대체될 직무와 오히려 강해지는 직무를 분석하고 우리 팀 인력 운용 전략을 세우는 법을 알아봅니다.",
  },
  {
    index: 7, slug: "foundation-007", level: "기초편", category: "foundation",
    title: "무료 AI 도구 총정리 — 돈 한 푼 안 쓰고 시작하는 법",
    keywords: "무료AI도구,AI무료사용,ChatGPT무료",
    meta_description: "비용 부담 없이 쓸 수 있는 무료 AI 도구를 업무 유형별로 총정리했습니다.",
  },
  {
    index: 8, slug: "foundation-008", level: "기초편", category: "foundation",
    title: "AI 도입 비용 현실 — 중소기업 예산으로 정말 가능한가",
    keywords: "AI도입비용,AI투자비용,중소기업AI예산",
    meta_description: "AI 도입에 실제로 얼마나 드는지, 중소기업 예산 범위에서 어디까지 가능한지 현실적으로 분석합니다.",
  },
  {
    index: 9, slug: "foundation-009", level: "기초편", category: "foundation",
    title: "중소기업 AI 도입 실패 사례 5가지 — 이것만 피하면 된다",
    keywords: "AI도입실패,AI전환실패,AI도입주의사항",
    meta_description: "실제 중소기업의 AI 도입 실패 사례 5가지를 분석하고 같은 실수를 피하는 법을 알아봅니다.",
  },
  {
    index: 10, slug: "foundation-010", level: "기초편", category: "foundation",
    title: "AI 리터러시란? 사장님이 갖춰야 할 최소한의 AI 지식",
    keywords: "AI리터러시,AI기본지식,사장AI교육",
    meta_description: "AI 시대에 경영자가 반드시 알아야 할 최소한의 AI 지식과 AI 리터러시를 키우는 방법을 소개합니다.",
  },
  {
    index: 11, slug: "foundation-011", level: "기초편", category: "foundation",
    title: "프롬프트란 무엇인가 — AI와 대화하는 법 완전 입문",
    keywords: "프롬프트,프롬프트작성법,AI대화법",
    meta_description: "프롬프트의 개념부터 업무에 바로 쓸 수 있는 기본 프롬프트 작성법까지 초보자를 위해 설명합니다.",
  },
  {
    index: 12, slug: "foundation-012", level: "기초편", category: "foundation",
    title: "AI 도구 보안 주의사항 — 회사 기밀 유출 막는 법",
    keywords: "AI보안,ChatGPT보안,AI기밀유출",
    meta_description: "ChatGPT 등 AI 도구 사용 시 회사 기밀이 유출될 수 있는 상황과 이를 방지하는 실전 보안 가이드입니다.",
  },
  {
    index: 13, slug: "foundation-013", level: "기초편", category: "foundation",
    title: "2025년 AI 트렌드 — 기업이 주목해야 할 5가지 변화",
    keywords: "AI트렌드2025,AI전망,기업AI변화",
    meta_description: "2025년 기업 경영에 가장 큰 영향을 미칠 AI 트렌드 5가지를 정리하고 대응 전략을 제시합니다.",
  },
  {
    index: 14, slug: "foundation-014", level: "기초편", category: "foundation",
    title: "AI 자동화와 디지털 전환의 차이 — 정확히 알고 시작하자",
    keywords: "AI자동화,디지털전환,DX차이",
    meta_description: "혼용되는 AI 자동화와 디지털 전환의 개념 차이를 명확히 하고 우리 회사에 맞는 방향을 설정하는 법을 알아봅니다.",
  },
  {
    index: 15, slug: "foundation-015", level: "기초편", category: "foundation",
    title: "AI 도입 성공한 중소기업의 공통점 3가지",
    keywords: "AI도입성공,중소기업AI성공사례,AI전환성공",
    meta_description: "AI 전환에 성공한 중소기업들이 공통으로 갖고 있는 3가지 특징을 분석합니다.",
  },

  // ── 기초편 / tools (AI 도구 기초) ────────────────────────────────
  {
    index: 16, slug: "tools-001", level: "기초편", category: "tools",
    title: "ChatGPT 업무 활용 완전 초보 가이드 — 오늘부터 바로 써먹기",
    keywords: "ChatGPT업무활용,ChatGPT사용법,ChatGPT초보",
    meta_description: "ChatGPT를 업무에 처음 적용하는 분들을 위한 완전 초보 가이드입니다. 바로 써먹을 수 있는 예시 프롬프트 포함.",
  },
  {
    index: 17, slug: "tools-002", level: "기초편", category: "tools",
    title: "Claude AI 활용법 — ChatGPT와 다른 점과 업무에서 잘 쓰는 법",
    keywords: "Claude활용법,Claude사용법,ClaudeAI",
    meta_description: "Claude AI의 특징과 ChatGPT와의 차이점을 비교하고 업무에서 Claude를 효과적으로 활용하는 방법을 소개합니다.",
  },
  {
    index: 18, slug: "tools-003", level: "기초편", category: "tools",
    title: "노션 AI 실전 활용 — 업무 보고서 5분 만에 완성하기",
    keywords: "노션AI,Notion AI,업무보고서AI",
    meta_description: "노션 AI 기능을 활용해 회의록·보고서·기획서를 5분 만에 완성하는 실전 방법을 알아봅니다.",
  },
  {
    index: 19, slug: "tools-004", level: "기초편", category: "tools",
    title: "MS Copilot 업무 도입 가이드 — 오피스 사용자 필독",
    keywords: "MS Copilot,마이크로소프트코파일럿,오피스AI",
    meta_description: "Microsoft 365 Copilot을 Word·Excel·PowerPoint·Teams에 적용하는 실전 업무 도입 가이드입니다.",
  },
  {
    index: 20, slug: "tools-005", level: "기초편", category: "tools",
    title: "Canva AI로 디자인 외주비 90% 줄이는 법",
    keywords: "Canva AI,디자인AI,AI디자인도구",
    meta_description: "Canva AI 기능을 활용해 디자인 전문가 없이도 고품질 콘텐츠를 제작하고 외주 비용을 대폭 줄이는 법을 소개합니다.",
  },
  {
    index: 21, slug: "tools-006", level: "기초편", category: "tools",
    title: "AI 회의록 자동화 — Clova Note·Fireflies 비교 완전 가이드",
    keywords: "AI회의록,Clova Note,Fireflies,회의자동화",
    meta_description: "AI 회의록 자동화 도구 Clova Note와 Fireflies를 비교하고 우리 팀에 맞는 도구를 선택하는 기준을 제시합니다.",
  },
  {
    index: 22, slug: "tools-007", level: "기초편", category: "tools",
    title: "AI 번역 도구 실전 비교 — DeepL·Papago·ChatGPT 어떤 게 나을까",
    keywords: "AI번역,DeepL,Papago번역,ChatGPT번역",
    meta_description: "DeepL·Papago·ChatGPT 번역 품질과 용도를 비교하고 업무 목적에 맞는 AI 번역 도구를 선택하는 법을 알아봅니다.",
  },
  {
    index: 23, slug: "tools-008", level: "기초편", category: "tools",
    title: "AI로 엑셀 자동화하는 법 — 비전문가도 데이터 분석 가능",
    keywords: "AI엑셀,엑셀자동화,AI데이터분석",
    meta_description: "AI 도구를 활용해 복잡한 엑셀 작업을 자동화하고 데이터를 빠르게 분석하는 방법을 비전문가 눈높이에서 설명합니다.",
  },
  {
    index: 24, slug: "tools-009", level: "기초편", category: "tools",
    title: "AI 도구 선택 기준 총정리 — 업종별 추천 도구 맵",
    keywords: "AI도구추천,업종별AI,AI도구선택",
    meta_description: "업종과 업무 목적에 따라 어떤 AI 도구를 선택해야 하는지 추천 도구 맵으로 한눈에 정리했습니다.",
  },
  {
    index: 25, slug: "tools-010", level: "기초편", category: "tools",
    title: "구글 워크스페이스 AI 기능 총정리 — Gmail·Docs·Sheets 활용",
    keywords: "구글워크스페이스AI,Google AI,Gmail AI",
    meta_description: "Google Workspace에 내장된 AI 기능을 Gmail·문서·스프레드시트·슬라이드에서 활용하는 방법을 총정리합니다.",
  },

  // ── 기초편 / marketing (AI 마케팅 기초) ──────────────────────────
  {
    index: 26, slug: "marketing-001", level: "기초편", category: "marketing",
    title: "AI로 블로그 글 쓰는 법 — 마케터를 위한 입문 가이드",
    keywords: "AI블로그,AI글쓰기,블로그AI",
    meta_description: "AI를 활용해 블로그 글을 빠르고 퀄리티 있게 작성하는 방법을 마케터와 사업주를 위해 설명합니다.",
  },
  {
    index: 27, slug: "marketing-002", level: "기초편", category: "marketing",
    title: "ChatGPT로 광고 카피 만드는 법 — 10분 만에 완성",
    keywords: "AI광고카피,ChatGPT카피,광고문구AI",
    meta_description: "광고 기획 경험 없이도 ChatGPT로 효과적인 광고 카피를 10분 만에 완성하는 실전 방법을 공유합니다.",
  },
  {
    index: 28, slug: "marketing-003", level: "기초편", category: "marketing",
    title: "AI 콘텐츠 마케팅이란? 중소기업 맞춤 입문 가이드",
    keywords: "AI콘텐츠마케팅,AI마케팅입문,중소기업마케팅",
    meta_description: "AI 콘텐츠 마케팅의 개념부터 중소기업이 바로 실행할 수 있는 시작점까지 실전 가이드를 제공합니다.",
  },
  {
    index: 29, slug: "marketing-004", level: "기초편", category: "marketing",
    title: "SNS 콘텐츠 AI 자동화 — 하루 1시간으로 한 달치 콘텐츠 준비",
    keywords: "SNS자동화,소셜미디어AI,콘텐츠자동화",
    meta_description: "하루 1시간 투자로 AI를 활용해 한 달치 SNS 콘텐츠를 미리 준비하는 자동화 워크플로우를 소개합니다.",
  },
  {
    index: 30, slug: "marketing-005", level: "기초편", category: "marketing",
    title: "AI로 상세페이지 작성하는 법 — 쇼핑몰 사장님 필독",
    keywords: "AI상세페이지,상품설명AI,쇼핑몰AI",
    meta_description: "AI로 전환율 높은 쇼핑몰 상세페이지 카피를 빠르게 작성하는 방법을 쇼핑몰 운영자 관점에서 설명합니다.",
  },
  {
    index: 31, slug: "marketing-006", level: "기초편", category: "marketing",
    title: "AI 키워드 리서치 — 검색 상위 노출을 위한 SEO 기초",
    keywords: "AI키워드,SEO키워드리서치,AI검색최적화",
    meta_description: "AI 도구를 활용해 검색 상위 노출을 위한 핵심 키워드를 발굴하는 SEO 기초 방법을 알아봅니다.",
  },
  {
    index: 32, slug: "marketing-007", level: "기초편", category: "marketing",
    title: "AI로 유튜브 스크립트 쓰는 법 — 기획부터 원고까지",
    keywords: "유튜브스크립트AI,AI유튜브,유튜브콘텐츠AI",
    meta_description: "AI를 활용해 유튜브 영상 기획부터 스크립트 작성까지 빠르게 완성하는 실전 방법을 공유합니다.",
  },
  {
    index: 33, slug: "marketing-008", level: "기초편", category: "marketing",
    title: "네이버 블로그 AI 최적화 전략 — 상위 노출 기초",
    keywords: "네이버블로그AI,네이버SEO,블로그최적화",
    meta_description: "네이버 블로그 상위 노출을 위한 AI 활용 최적화 전략을 기초부터 단계별로 설명합니다.",
  },
  {
    index: 34, slug: "marketing-009", level: "기초편", category: "marketing",
    title: "AI 이메일 마케팅 — 개인화 자동화 기초 가이드",
    keywords: "AI이메일마케팅,이메일자동화,뉴스레터AI",
    meta_description: "AI로 이메일 마케팅을 개인화하고 자동화하는 기초 방법을 단계별로 알아봅니다.",
  },
  {
    index: 35, slug: "marketing-010", level: "기초편", category: "marketing",
    title: "AI로 카드뉴스 만드는 법 — 무료 도구로 시작하기",
    keywords: "AI카드뉴스,카드뉴스제작AI,콘텐츠디자인AI",
    meta_description: "무료 AI 도구를 활용해 눈에 띄는 카드뉴스를 쉽게 제작하는 방법을 실전 예시와 함께 소개합니다.",
  },

  // ── 기초편 / business (1인기업·소규모 사업 기초) ─────────────────
  {
    index: 36, slug: "business-001", level: "기초편", category: "business",
    title: "AI 시대 1인 기업 모델이란? — 혼자서 10명 몫 하는 법",
    keywords: "1인기업AI,AI1인기업,솔로프리너",
    meta_description: "AI를 활용해 혼자서도 팀 규모의 성과를 낼 수 있는 1인 기업 모델의 개념과 실행 방법을 알아봅니다.",
  },
  {
    index: 37, slug: "business-002", level: "기초편", category: "business",
    title: "프리랜서·1인 대표를 위한 AI 도구 필수 세팅 가이드",
    keywords: "프리랜서AI,1인대표AI,AI업무세팅",
    meta_description: "프리랜서와 1인 대표가 업무 효율을 극대화하기 위해 갖춰야 할 AI 도구 세팅 방법을 총정리합니다.",
  },
  {
    index: 38, slug: "business-003", level: "기초편", category: "business",
    title: "AI로 제안서 만들기 — 1인이 대기업급 제안서 완성하는 법",
    keywords: "AI제안서,제안서AI,영업제안서AI",
    meta_description: "AI를 활용해 대기업 수준의 제안서를 1인이 빠르게 완성하는 실전 방법과 프롬프트를 공유합니다.",
  },
  {
    index: 39, slug: "business-004", level: "기초편", category: "business",
    title: "AI 비서 세팅 — 반복 업무 자동화 첫걸음",
    keywords: "AI비서,업무자동화,AI어시스턴트",
    meta_description: "AI 비서를 세팅해 매일 반복되는 업무를 자동화하는 방법을 초보자도 쉽게 따라 할 수 있게 설명합니다.",
  },
  {
    index: 40, slug: "business-005", level: "기초편", category: "business",
    title: "AI로 견적서·계약서 초안 만드는 법 — 외주비 절약",
    keywords: "AI견적서,AI계약서,업무문서AI",
    meta_description: "AI를 활용해 견적서와 계약서 초안을 빠르게 작성하고 법률 검토 비용을 줄이는 방법을 소개합니다.",
  },

  // ── 중급편 / transform (기업 AI 전환 전략) ────────────────────────
  {
    index: 41, slug: "transform-001", level: "중급편", category: "transform",
    title: "기업 AI 전환 로드맵 — 단계별 실행 가이드",
    keywords: "AI전환로드맵,기업AI로드맵,AI도입단계",
    meta_description: "기업 AI 전환을 성공적으로 이끄는 단계별 로드맵을 현장 경험을 바탕으로 제시합니다.",
  },
  {
    index: 42, slug: "transform-002", level: "중급편", category: "transform",
    title: "AI 도입 우선순위 설정법 — 어디서부터 시작할까",
    keywords: "AI도입우선순위,AI전환시작,AI도입계획",
    meta_description: "한정된 자원으로 AI 도입 효과를 극대화하기 위한 우선순위 설정 방법을 실전 프레임워크와 함께 설명합니다.",
  },
  {
    index: 43, slug: "transform-003", level: "중급편", category: "transform",
    title: "중소기업 AI 거버넌스 — 도입 전 조직 준비사항",
    keywords: "AI거버넌스,AI조직준비,기업AI관리",
    meta_description: "AI를 조직에 도입하기 전에 갖춰야 할 거버넌스 체계와 내부 규정 마련 방법을 알아봅니다.",
  },
  {
    index: 44, slug: "transform-004", level: "중급편", category: "transform",
    title: "직원 AI 교육 프로그램 설계 — 저항 없이 시작하는 법",
    keywords: "직원AI교육,AI사내교육,AI역량강화",
    meta_description: "직원들의 저항 없이 AI 교육 프로그램을 설계하고 전사적 AI 역량을 빠르게 높이는 방법을 소개합니다.",
  },
  {
    index: 45, slug: "transform-005", level: "중급편", category: "transform",
    title: "AI 도입 ROI 계산법 — 투자 대비 효과를 숫자로 증명하는 법",
    keywords: "AI ROI,AI투자효과,AI비용절감",
    meta_description: "AI 도입 후 투자 대비 효과를 측정하고 경영진에게 수치로 보고하는 ROI 계산 방법을 설명합니다.",
  },
  {
    index: 46, slug: "transform-006", level: "중급편", category: "transform",
    title: "업무 프로세스 AI 전환 맵 만드는 법",
    keywords: "AI프로세스맵,업무AI전환,프로세스자동화",
    meta_description: "현재 업무 프로세스를 분석하고 AI로 전환 가능한 영역을 시각화하는 AI 전환 맵을 만드는 방법을 알아봅니다.",
  },
  {
    index: 47, slug: "transform-007", level: "중급편", category: "transform",
    title: "AI 도입 저항 극복 — 직원 설득 전략 실전 가이드",
    keywords: "AI도입저항,직원설득,AI변화관리",
    meta_description: "AI 도입을 반대하는 직원들을 설득하고 조직 변화를 성공적으로 이끄는 실전 전략을 공유합니다.",
  },
  {
    index: 48, slug: "transform-008", level: "중급편", category: "transform",
    title: "AI 파일럿 프로젝트 설계법 — 소규모로 리스크 없이 시작하기",
    keywords: "AI파일럿,AI시범프로젝트,AI테스트",
    meta_description: "AI 전사 도입 전에 소규모 파일럿 프로젝트로 리스크를 최소화하면서 효과를 검증하는 설계 방법입니다.",
  },
  {
    index: 49, slug: "transform-009", level: "중급편", category: "transform",
    title: "중소기업 AI 도입 예산 편성 가이드",
    keywords: "AI예산편성,AI도입예산,중소기업AI비용",
    meta_description: "중소기업 재무 상황에 맞는 AI 도입 예산을 편성하고 효율적으로 집행하는 방법을 안내합니다.",
  },
  {
    index: 50, slug: "transform-010", level: "중급편", category: "transform",
    title: "AI 전환 후 조직 재설계 — 인력 배치는 어떻게 달라지나",
    keywords: "AI조직재설계,AI인력관리,AI시대조직",
    meta_description: "AI 도입 이후 조직 구조와 인력 배치를 어떻게 재설계해야 하는지 실전 사례와 함께 설명합니다.",
  },
  {
    index: 51, slug: "transform-011", level: "중급편", category: "transform",
    title: "AI 공급업체 선정 기준 — 속지 않고 올바르게 선택하는 법",
    keywords: "AI공급업체,AI벤더선정,AI솔루션선택",
    meta_description: "넘쳐나는 AI 솔루션 공급업체 중 신뢰할 수 있는 업체를 선정하는 체크리스트와 기준을 공유합니다.",
  },
  {
    index: 52, slug: "transform-012", level: "중급편", category: "transform",
    title: "데이터 기반 의사결정 전환 — AI 분석 도입 실전",
    keywords: "데이터기반의사결정,AI분석,비즈니스인텔리전스",
    meta_description: "직관 대신 데이터와 AI 분석으로 의사결정 방식을 전환하는 실전 방법을 단계별로 안내합니다.",
  },
  {
    index: 53, slug: "transform-013", level: "중급편", category: "transform",
    title: "외부 AI 컨설턴트 vs 내부 AI 담당자 — 어떤 선택이 맞나",
    keywords: "AI컨설턴트,내부AI담당자,AI조직운영",
    meta_description: "AI 도입 시 외부 컨설턴트를 쓸지 내부 담당자를 키울지 판단하는 기준과 각각의 장단점을 분석합니다.",
  },
  {
    index: 54, slug: "transform-014", level: "중급편", category: "transform",
    title: "AI 도입 계약서·NDA 주의사항 — 법률 리스크 최소화",
    keywords: "AI계약서,AI NDA,AI법률리스크",
    meta_description: "AI 솔루션 도입 계약 시 반드시 확인해야 할 조항과 데이터 보호를 위한 NDA 작성 시 주의사항을 알아봅니다.",
  },
  {
    index: 55, slug: "transform-015", level: "중급편", category: "transform",
    title: "기업 AI 윤리 가이드라인 만드는 법",
    keywords: "AI윤리,AI가이드라인,기업AI정책",
    meta_description: "AI 사용에 관한 기업 내부 윤리 가이드라인을 실용적으로 만드는 방법을 예시와 함께 제시합니다.",
  },

  // ── 중급편 / tools (AI 도구 심화) ────────────────────────────────
  {
    index: 56, slug: "tools-011", level: "중급편", category: "tools",
    title: "프롬프트 엔지니어링 중급 — 업무 결과물 품질 10배 올리기",
    keywords: "프롬프트엔지니어링,고급프롬프트,AI품질향상",
    meta_description: "기초 프롬프트를 넘어 업무 결과물의 품질을 극적으로 높이는 중급 프롬프트 엔지니어링 기법을 공유합니다.",
  },
  {
    index: 57, slug: "tools-012", level: "중급편", category: "tools",
    title: "ChatGPT API 활용 — 코딩 없이 자동화 파이프라인 만들기",
    keywords: "ChatGPT API,AI자동화파이프라인,노코드AI",
    meta_description: "코딩 지식 없이도 ChatGPT API를 활용해 업무 자동화 파이프라인을 구축하는 방법을 단계별로 설명합니다.",
  },
  {
    index: 58, slug: "tools-013", level: "중급편", category: "tools",
    title: "AI 에이전트란? — n8n·Make·Zapier로 업무 자동화 구축하기",
    keywords: "AI에이전트,n8n,Make자동화,Zapier",
    meta_description: "AI 에이전트의 개념과 n8n·Make·Zapier 같은 자동화 도구를 활용해 복잡한 업무를 자동화하는 방법을 알아봅니다.",
  },
  {
    index: 59, slug: "tools-014", level: "중급편", category: "tools",
    title: "RAG 실전 — 회사 문서로 나만의 AI 어시스턴트 만들기",
    keywords: "RAG,검색증강생성,회사AI,맞춤AI",
    meta_description: "RAG(검색 증강 생성) 기술을 활용해 회사 내부 문서 기반의 맞춤형 AI 어시스턴트를 구축하는 방법을 소개합니다.",
  },
  {
    index: 60, slug: "tools-015", level: "중급편", category: "tools",
    title: "AI 이미지 생성 실전 — Midjourney·DALL-E·Stable Diffusion 비교",
    keywords: "AI이미지생성,Midjourney,DALL-E,StableDiffusion",
    meta_description: "Midjourney·DALL-E·Stable Diffusion의 특징을 비교하고 마케팅·콘텐츠 제작에 바로 쓸 수 있는 실전 팁을 공유합니다.",
  },
  {
    index: 61, slug: "tools-016", level: "중급편", category: "tools",
    title: "AI 영상 제작 도구 비교 — Sora·Runway·HeyGen 실전 활용",
    keywords: "AI영상제작,Sora,Runway,HeyGen",
    meta_description: "AI 영상 생성 도구 Sora·Runway·HeyGen을 비교하고 마케팅 영상 제작에 활용하는 실전 방법을 알아봅니다.",
  },
  {
    index: 62, slug: "tools-017", level: "중급편", category: "tools",
    title: "AI 음성 합성 실전 — 나레이션·고객 응대 자동화",
    keywords: "AI음성합성,TTS,AI나레이션,음성자동화",
    meta_description: "AI 음성 합성 기술로 영상 나레이션과 고객 응대 음성을 자동화하는 실전 방법과 추천 도구를 소개합니다.",
  },
  {
    index: 63, slug: "tools-018", level: "중급편", category: "tools",
    title: "AI 코딩 도구 활용 — 비개발자가 Cursor·Copilot 쓰는 법",
    keywords: "CursorAI,GitHub Copilot,비개발자AI코딩",
    meta_description: "개발 경험이 없어도 AI 코딩 도구 Cursor와 GitHub Copilot으로 간단한 자동화 코드를 만드는 방법을 알아봅니다.",
  },
  {
    index: 64, slug: "tools-019", level: "중급편", category: "tools",
    title: "AI로 데이터 분석하기 — Excel·Python 없이 인사이트 뽑기",
    keywords: "AI데이터분석,ChatGPT분석,AI인사이트",
    meta_description: "Excel 함수나 Python 없이 AI만으로 사업 데이터를 분석하고 유의미한 인사이트를 추출하는 방법을 설명합니다.",
  },
  {
    index: 65, slug: "tools-020", level: "중급편", category: "tools",
    title: "AI 문서 요약 자동화 — 계약서·보고서 처리 속도 10배 올리기",
    keywords: "AI문서요약,계약서요약AI,문서처리자동화",
    meta_description: "AI를 활용해 긴 계약서와 보고서를 빠르게 요약하고 핵심 내용을 추출하는 자동화 방법을 소개합니다.",
  },
  {
    index: 66, slug: "tools-021", level: "중급편", category: "tools",
    title: "AI 챗봇 구축 실전 — 코딩 없이 고객센터 자동화 완성",
    keywords: "AI챗봇구축,고객센터자동화,챗봇만들기",
    meta_description: "코딩 없이 AI 챗봇을 구축해 고객 문의 응대를 자동화하는 실전 방법과 추천 플랫폼을 안내합니다.",
  },
  {
    index: 67, slug: "tools-022", level: "중급편", category: "tools",
    title: "AI 검색 도구 활용 — Perplexity로 시장 조사 10배 빠르게",
    keywords: "Perplexity AI,AI시장조사,AI검색",
    meta_description: "Perplexity AI를 활용해 경쟁사 분석·시장 트렌드·고객 인사이트 조사를 기존 대비 10배 빠르게 하는 방법을 공유합니다.",
  },
  {
    index: 68, slug: "tools-023", level: "중급편", category: "tools",
    title: "노코드 AI 앱 만들기 — Bubble·Glide 활용 입문",
    keywords: "노코드AI,Bubble,Glide,AI앱개발",
    meta_description: "개발자 없이 노코드 플랫폼 Bubble·Glide로 AI 기반 웹앱을 만드는 방법을 단계별로 설명합니다.",
  },
  {
    index: 69, slug: "tools-024", level: "중급편", category: "tools",
    title: "AI 워크플로우 자동화 심화 — n8n 실전 구축 가이드",
    keywords: "n8n자동화,AI워크플로우,n8n가이드",
    meta_description: "n8n으로 복잡한 AI 업무 워크플로우를 구축하는 심화 가이드입니다. 실제 비즈니스 자동화 사례를 포함합니다.",
  },
  {
    index: 70, slug: "tools-025", level: "중급편", category: "tools",
    title: "AI 번역·현지화 자동화 — 해외 시장 진출을 위한 AI 활용",
    keywords: "AI현지화,AI번역자동화,해외진출AI",
    meta_description: "AI를 활용해 콘텐츠·문서·웹사이트를 빠르게 번역하고 현지화해 해외 시장에 진출하는 방법을 소개합니다.",
  },

  // ── 중급편 / marketing (AI 마케팅 심화) ──────────────────────────
  {
    index: 71, slug: "marketing-011", level: "중급편", category: "marketing",
    title: "AI 기반 콘텐츠 전략 수립 — 6개월 캘린더 자동화",
    keywords: "AI콘텐츠전략,콘텐츠캘린더,마케팅자동화",
    meta_description: "AI로 6개월치 콘텐츠 전략과 발행 캘린더를 자동으로 수립하는 방법을 마케팅 실무 관점에서 설명합니다.",
  },
  {
    index: 72, slug: "marketing-012", level: "중급편", category: "marketing",
    title: "AI SEO 전략 심화 — 구글·네이버 검색 상위 노출 공략법",
    keywords: "AI SEO,검색상위노출,AI검색최적화심화",
    meta_description: "AI 도구를 적극 활용해 구글과 네이버 검색 상위 노출을 달성하는 심화 SEO 전략을 공유합니다.",
  },
  {
    index: 73, slug: "marketing-013", level: "중급편", category: "marketing",
    title: "AI 퍼포먼스 마케팅 — 광고 카피 A/B 테스트 자동화",
    keywords: "AI퍼포먼스마케팅,광고AB테스트,AI광고최적화",
    meta_description: "AI를 활용해 광고 카피 A/B 테스트를 자동화하고 전환율을 높이는 퍼포먼스 마케팅 전략을 소개합니다.",
  },
  {
    index: 74, slug: "marketing-014", level: "중급편", category: "marketing",
    title: "AI 브랜드 보이스 설정 — 일관된 콘텐츠 생산 시스템 구축",
    keywords: "AI브랜드보이스,콘텐츠일관성,브랜드AI",
    meta_description: "AI로 브랜드 고유의 목소리와 톤을 설정하고 모든 채널에서 일관된 콘텐츠를 생산하는 시스템을 구축하는 법을 알아봅니다.",
  },
  {
    index: 75, slug: "marketing-015", level: "중급편", category: "marketing",
    title: "AI 영상 마케팅 실전 — 유튜브 쇼츠 자동 제작 시스템",
    keywords: "AI유튜브쇼츠,영상마케팅AI,숏폼AI제작",
    meta_description: "AI로 유튜브 쇼츠를 자동으로 기획·제작하는 시스템을 구축해 영상 마케팅 효과를 극대화하는 방법입니다.",
  },
  {
    index: 76, slug: "marketing-016", level: "중급편", category: "marketing",
    title: "AI CRM 활용 — 고객 데이터 기반 개인화 마케팅",
    keywords: "AI CRM,고객데이터AI,개인화마케팅",
    meta_description: "AI와 CRM을 연동해 고객 데이터를 분석하고 개인화된 마케팅 메시지를 자동으로 발송하는 방법을 설명합니다.",
  },
  {
    index: 77, slug: "marketing-017", level: "중급편", category: "marketing",
    title: "AI 고객 인사이트 분석 — 리뷰·댓글 감성 분석 자동화",
    keywords: "AI감성분석,고객리뷰분석,고객인사이트AI",
    meta_description: "AI를 활용해 고객 리뷰와 SNS 댓글을 자동으로 분석하고 마케팅 전략에 반영하는 방법을 소개합니다.",
  },
  {
    index: 78, slug: "marketing-018", level: "중급편", category: "marketing",
    title: "B2B 마케팅 AI 활용 — 리드 생성 자동화 전략",
    keywords: "B2B마케팅AI,리드생성자동화,B2B영업AI",
    meta_description: "B2B 기업을 위한 AI 기반 리드 생성과 영업 자동화 전략을 실전 사례와 함께 설명합니다.",
  },
  {
    index: 79, slug: "marketing-019", level: "중급편", category: "marketing",
    title: "AI 마케팅 대행사 없이 인하우스로 전환하는 법",
    keywords: "AI인하우스마케팅,마케팅자동화,AI대행사대체",
    meta_description: "외부 마케팅 대행사 의존도를 낮추고 AI로 인하우스 마케팅 팀의 역량을 끌어올리는 전환 전략을 공유합니다.",
  },
  {
    index: 80, slug: "marketing-020", level: "중급편", category: "marketing",
    title: "AI 인플루언서 마케팅 분석 — 효과 측정 자동화",
    keywords: "AI인플루언서,인플루언서분석AI,마케팅효과측정",
    meta_description: "AI로 인플루언서 마케팅 효과를 자동으로 측정하고 ROI를 분석해 최적의 인플루언서를 선정하는 방법을 알아봅니다.",
  },

  // ── 중급편 / cases (업종별 사례) ─────────────────────────────────
  {
    index: 81, slug: "cases-001", level: "중급편", category: "cases",
    title: "제조업 AI 도입 사례 — 소규모 제조사의 실전 경험",
    keywords: "제조업AI,중소제조업AI,제조AI사례",
    meta_description: "소규모 제조업체가 AI를 도입해 생산성을 높이고 비용을 줄인 실전 사례를 분석합니다.",
  },
  {
    index: 82, slug: "cases-002", level: "중급편", category: "cases",
    title: "소매업·유통 AI 활용 사례 — 재고·발주 자동화 실전",
    keywords: "소매업AI,유통AI,재고관리AI",
    meta_description: "소매업과 유통 업계에서 AI로 재고 관리와 발주를 자동화한 실제 사례와 적용 방법을 소개합니다.",
  },
  {
    index: 83, slug: "cases-003", level: "중급편", category: "cases",
    title: "음식점·프랜차이즈 AI 도입 — 메뉴 기획·마케팅 자동화",
    keywords: "음식점AI,프랜차이즈AI,요식업AI",
    meta_description: "음식점과 프랜차이즈에서 AI를 활용해 메뉴 기획과 마케팅을 자동화한 사례를 실전 관점에서 분석합니다.",
  },
  {
    index: 84, slug: "cases-004", level: "중급편", category: "cases",
    title: "병원·의원 AI 활용 — 예약·차트·마케팅 자동화 사례",
    keywords: "병원AI,의원AI,의료AI마케팅",
    meta_description: "병원과 의원에서 AI를 도입해 예약 관리·진료 차트 작성·환자 마케팅을 자동화한 사례를 소개합니다.",
  },
  {
    index: 85, slug: "cases-005", level: "중급편", category: "cases",
    title: "광고·마케팅 에이전시의 AI 전환 실전 사례",
    keywords: "에이전시AI전환,마케팅에이전시AI,광고대행사AI",
    meta_description: "광고·마케팅 에이전시가 AI를 도입해 업무 방식을 혁신하고 경쟁력을 높인 실전 사례를 분석합니다.",
  },
  {
    index: 86, slug: "cases-006", level: "중급편", category: "cases",
    title: "교육 서비스 AI 전환 — 학원·코칭 비즈니스 사례",
    keywords: "학원AI,교육AI,코칭AI",
    meta_description: "학원과 코칭 비즈니스에서 AI를 활용해 맞춤형 교육 서비스를 제공하고 운영 효율을 높인 사례를 소개합니다.",
  },
  {
    index: 87, slug: "cases-007", level: "중급편", category: "cases",
    title: "쇼핑몰·이커머스 AI 자동화 사례 — 운영비 절반으로 줄인 법",
    keywords: "쇼핑몰AI,이커머스AI,온라인쇼핑AI",
    meta_description: "이커머스 운영에 AI를 적용해 상품 등록·CS·마케팅을 자동화하고 운영비를 절반으로 줄인 사례를 분석합니다.",
  },
  {
    index: 88, slug: "cases-008", level: "중급편", category: "cases",
    title: "IT·개발 회사가 AI 도입으로 생산성 3배 높인 사례",
    keywords: "IT기업AI,개발회사AI,소프트웨어AI",
    meta_description: "IT·개발 회사에서 AI를 적극 도입해 개발 생산성을 3배 높이고 납기를 단축한 실전 사례를 소개합니다.",
  },
  {
    index: 89, slug: "cases-009", level: "중급편", category: "cases",
    title: "컨설팅·서비스업 AI 도입 사례 — 1인이 10명 몫 하는 법",
    keywords: "컨설팅AI,서비스업AI,1인컨설팅AI",
    meta_description: "컨설팅과 서비스업에서 AI로 혼자서도 대형 프로젝트를 수행할 수 있게 된 사례를 실전 관점에서 분석합니다.",
  },
  {
    index: 90, slug: "cases-010", level: "중급편", category: "cases",
    title: "부동산·건설 AI 도입 사례 — 매물 분석부터 계약까지",
    keywords: "부동산AI,건설AI,AI부동산분석",
    meta_description: "부동산·건설 업계에서 AI를 활용해 매물 분석·고객 응대·계약 프로세스를 자동화한 사례를 소개합니다.",
  },

  // ── 고급편 / transform (AI 컨설팅·전략 고급) ──────────────────────
  {
    index: 91, slug: "transform-016", level: "고급편", category: "transform",
    title: "AI 컨설팅 비즈니스 모델 — 전문가가 수익화하는 4가지 방법",
    keywords: "AI컨설팅비즈니스,AI컨설팅수익화,AI전문가사업",
    meta_description: "AI 전환 전문가가 컨설팅 사업을 수익화하는 4가지 비즈니스 모델과 각각의 실행 전략을 공유합니다.",
  },
  {
    index: 92, slug: "transform-017", level: "고급편", category: "transform",
    title: "기업 AI 성숙도 진단 프레임워크 — 어디에 있는지 측정하는 법",
    keywords: "AI성숙도,AI진단프레임워크,기업AI수준",
    meta_description: "기업의 AI 도입 성숙도를 객관적으로 진단하는 프레임워크를 제시하고 수준별 다음 단계 전략을 안내합니다.",
  },
  {
    index: 93, slug: "transform-018", level: "고급편", category: "transform",
    title: "AI 전략 제안서 작성법 — 임원진을 설득하는 구조",
    keywords: "AI전략제안서,임원AI설득,AI보고서",
    meta_description: "경영진과 임원진을 설득할 수 있는 AI 전략 제안서 구조와 핵심 메시지 작성법을 실전 템플릿과 함께 제공합니다.",
  },
  {
    index: 94, slug: "transform-019", level: "고급편", category: "transform",
    title: "AI 도입 후 KPI 재설계 — AI 시대에 맞는 측정 기준",
    keywords: "AI KPI,AI성과측정,AI시대KPI",
    meta_description: "AI 도입 후 기존 KPI가 더 이상 유효하지 않을 때 AI 시대에 맞게 성과 측정 기준을 재설계하는 방법입니다.",
  },
  {
    index: 95, slug: "transform-020", level: "고급편", category: "transform",
    title: "AI 시대 조직문화 설계 — 실험하는 조직 만드는 법",
    keywords: "AI조직문화,실험문화,AI시대조직설계",
    meta_description: "AI를 적극 활용하는 실험적이고 민첩한 조직문화를 설계하고 정착시키는 방법을 리더십 관점에서 설명합니다.",
  },
  {
    index: 96, slug: "transform-021", level: "고급편", category: "transform",
    title: "AI 전환 실패 기업 심층 분석 — 성공 기업과 무엇이 달랐나",
    keywords: "AI전환실패분석,AI도입실패원인,AI전환성공요인",
    meta_description: "AI 전환에 실패한 기업의 사례를 심층 분석하고 성공 기업과의 결정적 차이점을 도출합니다.",
  },
  {
    index: 97, slug: "transform-022", level: "고급편", category: "transform",
    title: "기업 맞춤 LLM 파인튜닝 — 비기술자가 이해하는 실전 가이드",
    keywords: "LLM파인튜닝,맞춤AI모델,기업전용AI",
    meta_description: "기술적 배경 없이도 이해할 수 있는 LLM 파인튜닝 개념과 기업 맞춤 AI 모델 구축 프로세스를 설명합니다.",
  },
  {
    index: 98, slug: "transform-023", level: "고급편", category: "transform",
    title: "AI 보안·컴플라이언스 전략 — 개인정보법·GDPR 대응",
    keywords: "AI보안전략,AI컴플라이언스,개인정보AI",
    meta_description: "AI 도입 시 발생하는 개인정보보호법·GDPR 이슈를 사전에 파악하고 컴플라이언스 체계를 갖추는 전략을 안내합니다.",
  },
  {
    index: 99, slug: "transform-024", level: "고급편", category: "transform",
    title: "산업별 AI 규제 동향 — 2025년 이후 기업 대응 전략",
    keywords: "AI규제,AI법규,산업별AI규제",
    meta_description: "국내외 산업별 AI 규제 동향을 정리하고 기업이 선제적으로 대응하는 전략을 제시합니다.",
  },
  {
    index: 100, slug: "transform-025", level: "고급편", category: "transform",
    title: "AI 시대 지식재산권 전략 — 콘텐츠·특허 보호 방법",
    keywords: "AI지식재산권,AI저작권,AI콘텐츠보호",
    meta_description: "AI가 생성한 콘텐츠의 저작권 귀속 문제와 AI 시대 기업의 지식재산권 보호 전략을 법률 관점에서 설명합니다.",
  },

  // ── 고급편 / business (1인기업·전문가 사업화 고급) ────────────────
  {
    index: 101, slug: "business-006", level: "고급편", category: "business",
    title: "AI 기반 1인 컨설팅 사업 구조 — 월 1천만원 수익 모델",
    keywords: "AI컨설팅1인사업,1인컨설팅수익,AI전문가수익",
    meta_description: "AI를 핵심 역량으로 삼아 1인 컨설팅 사업을 월 1천만원 수준으로 키우는 수익 구조와 실행 전략을 공유합니다.",
  },
  {
    index: 102, slug: "business-007", level: "고급편", category: "business",
    title: "AI로 콘텐츠 사업 자동화 — 블로그·유튜브 동시 운영 시스템",
    keywords: "AI콘텐츠사업,블로그유튜브동시운영,AI콘텐츠자동화",
    meta_description: "AI를 활용해 블로그와 유튜브를 동시에 운영하며 콘텐츠를 자동화하는 수익형 시스템 구축 방법을 소개합니다.",
  },
  {
    index: 103, slug: "business-008", level: "고급편", category: "business",
    title: "AI 강의·교육 사업 론칭 — 온라인 코스 자동 제작 시스템",
    keywords: "AI온라인강의,AI교육사업,강의자동화",
    meta_description: "AI를 활용해 온라인 강의 콘텐츠를 기획·제작·유통하는 교육 사업을 빠르게 론칭하는 방법을 알아봅니다.",
  },
  {
    index: 104, slug: "business-009", level: "고급편", category: "business",
    title: "AI 기반 구독 서비스 설계 — 안정적 월 수익 모델",
    keywords: "AI구독서비스,구독모델AI,AI정기수익",
    meta_description: "AI를 핵심으로 한 구독형 서비스를 설계하고 안정적인 월간 반복 수익을 만드는 비즈니스 모델을 소개합니다.",
  },
  {
    index: 105, slug: "business-010", level: "고급편", category: "business",
    title: "퍼스널 브랜딩 AI 전략 — 전문가로 포지셔닝 자동화",
    keywords: "퍼스널브랜딩AI,AI전문가포지셔닝,AI브랜딩",
    meta_description: "AI를 활용해 전문가로서의 퍼스널 브랜드를 구축하고 지속적으로 콘텐츠를 생산해 포지셔닝하는 전략을 공유합니다.",
  },
  {
    index: 106, slug: "business-011", level: "고급편", category: "business",
    title: "AI로 책 쓰기 — 전자책·종이책 출판 전략 완전 가이드",
    keywords: "AI책쓰기,AI전자책,AI출판",
    meta_description: "AI를 활용해 전자책과 종이책을 기획·집필·출판하는 전 과정을 현업 전문가 관점에서 안내합니다.",
  },
  {
    index: 107, slug: "business-012", level: "고급편", category: "business",
    title: "AI 기반 코칭·멘토링 사업 설계 — 고수익 1대1 서비스",
    keywords: "AI코칭사업,AI멘토링,1인코칭비즈니스",
    meta_description: "AI로 코칭 프로그램 설계와 운영을 자동화하고 고수익 1대1 멘토링 서비스를 구축하는 방법을 설명합니다.",
  },
  {
    index: 108, slug: "business-013", level: "고급편", category: "business",
    title: "AI로 글로벌 시장 진출 — 해외 고객 확보 전략",
    keywords: "AI글로벌진출,해외고객AI,AI해외마케팅",
    meta_description: "AI를 활용해 언어 장벽을 극복하고 해외 고객을 유치하며 글로벌 시장에 진출하는 실전 전략을 소개합니다.",
  },
  {
    index: 109, slug: "business-014", level: "고급편", category: "business",
    title: "AI 1인 에이전시 운영 — 팀 없이 대형 프로젝트 수주하는 법",
    keywords: "AI1인에이전시,AI에이전시운영,1인에이전시",
    meta_description: "AI를 핵심 역량으로 삼아 1인이 대형 에이전시급 프로젝트를 수주하고 납기를 맞추는 운영 방법을 공유합니다.",
  },
  {
    index: 110, slug: "business-015", level: "고급편", category: "business",
    title: "AI SaaS 아이디어 발굴 — 1인 개발자 없이 만드는 법",
    keywords: "AI SaaS,노코드SaaS,AI소프트웨어사업",
    meta_description: "개발자 없이 AI와 노코드 도구로 SaaS 제품을 기획·개발·출시하는 방법을 스타트업 관점에서 설명합니다.",
  },

  // ── 고급편 / tools (AI 기술 고급) ────────────────────────────────
  {
    index: 111, slug: "tools-026", level: "고급편", category: "tools",
    title: "LLM 선택 가이드 고급 — 비즈니스 목적별 최적 모델 비교",
    keywords: "LLM비교,AI모델선택,GPT4Claude비교",
    meta_description: "GPT-4·Claude·Gemini·Llama 등 주요 LLM을 비즈니스 목적별로 심층 비교하고 최적 모델을 선택하는 기준을 제시합니다.",
  },
  {
    index: 112, slug: "tools-027", level: "고급편", category: "tools",
    title: "AI 에이전트 설계 고급 — 멀티 에이전트 시스템 구축",
    keywords: "멀티에이전트,AI에이전트설계,고급AI자동화",
    meta_description: "여러 AI 에이전트가 협력하는 멀티 에이전트 시스템을 설계하고 구축하는 고급 자동화 방법을 소개합니다.",
  },
  {
    index: 113, slug: "tools-028", level: "고급편", category: "tools",
    title: "기업용 AI 파이프라인 구축 — 엔지니어 없이 만드는 법",
    keywords: "AI파이프라인,기업AI구축,노코드AI파이프라인",
    meta_description: "전문 엔지니어 없이도 기업 업무에 적합한 AI 데이터 파이프라인을 구축하는 방법을 실전 예시와 함께 설명합니다.",
  },
  {
    index: 114, slug: "tools-029", level: "고급편", category: "tools",
    title: "AI 아바타 활용 — 유튜브·광고 영상 자동화 고급",
    keywords: "AI아바타,AI영상자동화,버추얼아바타",
    meta_description: "AI 아바타를 활용해 유튜브 채널과 광고 영상을 자동으로 제작하는 고급 워크플로우를 소개합니다.",
  },
  {
    index: 115, slug: "tools-030", level: "고급편", category: "tools",
    title: "AI 기반 비즈니스 인텔리전스 구축 — 대시보드 자동화",
    keywords: "AI비즈니스인텔리전스,AI대시보드,BI자동화",
    meta_description: "AI로 실시간 경영 데이터를 수집·분석·시각화하는 비즈니스 인텔리전스 대시보드를 구축하는 방법을 설명합니다.",
  },
  {
    index: 116, slug: "tools-031", level: "고급편", category: "tools",
    title: "멀티모달 AI 활용 — 이미지·텍스트·음성 통합 워크플로우",
    keywords: "멀티모달AI,AI이미지텍스트,통합AI워크플로우",
    meta_description: "이미지·텍스트·음성을 통합 처리하는 멀티모달 AI 워크플로우를 구축해 업무 자동화 수준을 한 단계 높이는 방법입니다.",
  },
  {
    index: 117, slug: "tools-032", level: "고급편", category: "tools",
    title: "AI 검색 최적화(AISO) — AI 시대의 새로운 검색 전략",
    keywords: "AISO,AI검색최적화,AI시대SEO",
    meta_description: "ChatGPT·Perplexity 등 AI 검색 엔진에 콘텐츠가 잘 노출되도록 최적화하는 AISO 전략을 처음으로 소개합니다.",
  },
  {
    index: 118, slug: "tools-033", level: "고급편", category: "tools",
    title: "AI 기반 예측 분석 — 수요·매출 예측 자동화",
    keywords: "AI예측분석,매출예측AI,수요예측AI",
    meta_description: "AI로 사업 데이터를 분석하고 수요·매출·트렌드를 예측해 경영 의사결정의 정확도를 높이는 방법을 설명합니다.",
  },

  // ── 고급편 / marketing (AI 마케팅 고급) ──────────────────────────
  {
    index: 119, slug: "marketing-021", level: "고급편", category: "marketing",
    title: "AI 기반 성장 해킹 — 마케팅 비용 없이 고객을 늘리는 법",
    keywords: "AI그로스해킹,성장해킹AI,AI바이럴마케팅",
    meta_description: "AI를 활용한 그로스 해킹 전략으로 마케팅 예산을 최소화하면서 폭발적인 고객 성장을 달성하는 방법을 소개합니다.",
  },
  {
    index: 120, slug: "marketing-022", level: "고급편", category: "marketing",
    title: "AI 광고 크리에이티브 자동화 — 수백 개 소재 자동 생성",
    keywords: "AI광고크리에이티브,광고소재자동화,AI광고생성",
    meta_description: "AI로 수백 개의 광고 크리에이티브를 자동 생성하고 성과 기반으로 최적 소재를 선별하는 자동화 시스템을 구축하는 방법입니다.",
  },

  // ── 고급편 / cases (심층 분석 사례) ──────────────────────────────
  {
    index: 121, slug: "cases-011", level: "고급편", category: "cases",
    title: "글로벌 AI 트랜스포메이션 트렌드 — 한국 기업 시사점",
    keywords: "글로벌AI트렌드,AI트랜스포메이션해외사례,한국기업AI",
    meta_description: "글로벌 선도 기업의 AI 트랜스포메이션 전략을 분석하고 한국 중소기업이 참고할 수 있는 시사점을 도출합니다.",
  },
  {
    index: 122, slug: "cases-012", level: "고급편", category: "cases",
    title: "AI 컨설턴트가 되는 법 — 자격·역량·수익화 완전 가이드",
    keywords: "AI컨설턴트되는법,AI전문가자격,AI컨설팅수익",
    meta_description: "AI 컨설턴트로 커리어를 전환하거나 사이드 비즈니스를 시작하기 위한 필요 역량·자격·수익화 전략을 안내합니다.",
  },
  {
    index: 123, slug: "cases-013", level: "고급편", category: "cases",
    title: "25년 에이전시 대표가 본 AI 전환의 본질 — 현장 인사이트",
    keywords: "에이전시AI전환,웹에이전시AI,AI전환인사이트",
    meta_description: "25년간 웹·광고 에이전시를 운영하며 체득한 경험을 바탕으로 AI 전환의 본질과 실전 인사이트를 공유합니다.",
  },
  {
    index: 124, slug: "cases-014", level: "고급편", category: "cases",
    title: "AI 시대 M&A·투자 전략 — AI 역량 기업 가치 평가법",
    keywords: "AI기업인수,AI투자전략,AI기업가치",
    meta_description: "AI 역량이 기업 가치에 미치는 영향을 분석하고 AI 시대에 맞는 M&A와 투자 전략을 제시합니다.",
  },
  {
    index: 125, slug: "cases-015", level: "고급편", category: "cases",
    title: "AI 컨설턴트의 실제 AI 스택 공개 — 도구와 워크플로우 전체",
    keywords: "AI컨설턴트도구,AI스택공개,AI워크플로우공개",
    meta_description: "현업 AI 컨설턴트가 실제로 사용하는 AI 도구 스택과 하루 업무 워크플로우를 투명하게 공개합니다.",
  },

  // ── 보너스 / foundation+business (추가 5개) ───────────────────────
  {
    index: 126, slug: "foundation-016", level: "기초편", category: "foundation",
    title: "AI 시대 사장님이 지금 당장 해야 할 3가지",
    keywords: "AI시대경영,사장AI대응,AI즉시실행",
    meta_description: "AI 변화의 물결에서 뒤처지지 않기 위해 사업주가 지금 당장 실행해야 할 3가지 구체적인 행동을 제안합니다.",
  },
  {
    index: 127, slug: "business-016", level: "기초편", category: "business",
    title: "AI로 나만의 온라인 강의 만드는 법 — 경험을 돈으로 바꾸기",
    keywords: "AI온라인강의만들기,경험수익화,AI강의제작",
    meta_description: "보유한 전문 경험과 지식을 AI의 도움을 받아 온라인 강의로 빠르게 제작하고 수익화하는 방법을 안내합니다.",
  },
  {
    index: 128, slug: "marketing-023", level: "중급편", category: "marketing",
    title: "AI로 웹사이트 전환율 올리는 법 — UX 카피 자동 최적화",
    keywords: "AI웹사이트최적화,전환율최적화AI,AI UX카피",
    meta_description: "AI로 웹사이트 랜딩페이지 카피를 분석하고 전환율을 높이는 UX 카피로 자동 최적화하는 방법을 소개합니다.",
  },
  {
    index: 129, slug: "transform-026", level: "중급편", category: "transform",
    title: "AI 시대 웹에이전시의 생존 전략 — 서비스 모델 전환",
    keywords: "웹에이전시AI,에이전시생존,AI시대에이전시",
    meta_description: "전통 웹에이전시가 AI 시대에 살아남기 위한 서비스 모델 전환 전략과 새로운 수익원 발굴 방법을 제시합니다.",
  },
  {
    index: 130, slug: "cases-016", level: "고급편", category: "cases",
    title: "AI 전환 1년 후 — 실제로 무엇이 달라졌는가",
    keywords: "AI전환1년,AI도입결과,AI전환후기",
    meta_description: "AI 전환을 결정하고 1년이 지난 시점에서 실제 비즈니스에 어떤 변화가 생겼는지 솔직하게 돌아봅니다.",
  },
];
