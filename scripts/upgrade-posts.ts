/**
 * 기존 글 품질 업그레이드 스크립트
 * 조회수 낮은 순으로 N개씩 재생성 (content + meta_description 업데이트)
 * 사용법: npx tsx scripts/upgrade-posts.ts          (기본 5개)
 *         npx tsx scripts/upgrade-posts.ts 10       (10개)
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pool } from "pg";
import { allTopics, Topic } from "./topics";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY가 설정되어 있지 않습니다.");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const CATEGORY_QUERIES: Record<string, string[]> = {
  foundation: ["artificial intelligence business technology people", "technology innovation digital future"],
  tools: ["technology computer software people working", "developer coding laptop workspace"],
  marketing: ["digital marketing business strategy people", "social media content creator laptop"],
  transform: ["business transformation team meeting office", "business strategy planning whiteboard"],
  business: ["entrepreneur freelancer laptop working cafe", "small business owner professional"],
  cases: ["business success team collaboration office", "case study presentation boardroom"],
};

interface UnsplashResult { url: string; attribution: string; }

const CATEGORY_INSTRUCTIONS: Record<string, string> = {
  foundation: `[카테고리 지침: AI 입문]
- 전문 용어를 쓸 때마다 괄호 안에 쉬운 설명을 덧붙일 것
- 실생활 비유를 최소 2개 이상 사용하여 개념을 설명
- "이것만 기억하세요" 핵심 요약 박스를 중간에 blockquote로 삽입`,
  tools: `[카테고리 지침: 도구 실전]
- 실제 도구 이름과 구체적 사용 단계(Step 1, 2, 3...)를 포함
- 무료/유료 요금제를 표로 비교
- "바로 따라하기" 실습 예시를 반드시 1개 이상 포함`,
  marketing: `[카테고리 지침: AI 마케팅]
- 구체적인 마케팅 수치(전환율, ROI, CTR 등)를 예시로 제시
- Before/After 비교를 표로 보여줄 것
- 실제 적용 가능한 프롬프트 템플릿을 blockquote로 2개 이상 포함`,
  transform: `[카테고리 지침: 전환 전략]
- 단계별 로드맵(3개월/6개월/12개월)을 표로 제시
- 실패 사례와 성공 사례를 대비시켜 설명
- 의사결정자가 경영진에게 보고할 수 있는 수준의 데이터 포함`,
  business: `[카테고리 지침: 1인기업]
- 혼자서도 바로 적용 가능한 실용적 방법에 집중
- 월 비용 절감/시간 절약 효과를 구체적 숫자로 제시
- "이번 주 해볼 일" 액션 아이템을 리스트로 마무리`,
  cases: `[카테고리 지침: 사례 분석]
- 실제 기업명 또는 업종을 구체적으로 언급 (예: "국내 중견 물류기업 A사")
- 도입 전/후 성과를 수치로 비교하는 표 필수
- 해당 사례에서 배울 수 있는 교훈 3가지를 정리`,
};

const STRUCTURE_TEMPLATES = [
  { name: "standard", instruction: `[글 구조]\n- 후킹 도입부 → 핵심 개념 설명(h2) → 세부 내용(h3) → 실전 적용법(h2) → 💡 AI 도구 활용 팁(h2) → 마무리\n- 표와 목록을 적극 활용` },
  { name: "comparison", instruction: `[글 구조: 비교분석형]\n- 후킹 도입부 → "한눈에 비교" 요약 표(h2) → 항목별 상세 비교(h2/h3) → 상황별 추천(h2) → 💡 AI 도구 활용 팁(h2) → 결론\n- 비교표를 최소 2개 포함` },
  { name: "checklist", instruction: `[글 구조: 체크리스트형]\n- 후킹 도입부 → 체크리스트 전체 미리보기(ol) → 각 항목 상세 설명(h2마다 1개) → 💡 AI 도구 활용 팁(h2) → "오늘의 액션플랜" 마무리\n- 각 h2 제목에 번호를 붙여 진행감을 줄 것` },
  { name: "story", instruction: `[글 구조: 사례 스토리형]\n- 후킹 도입부(문제 상황 묘사) → 배경 설명(h2) → 해결 과정 스토리(h2) → 결과와 교훈(h2, 성과 표 포함) → 💡 AI 도구 활용 팁(h2) → 마무리\n- "~했습니다", "~였습니다" 서술형으로 이야기를 풀어갈 것` },
  { name: "qna", instruction: `[글 구조: Q&A형]\n- 후킹 도입부 → 자주 묻는 질문 5~7개를 h2로 배치(질문 형태 제목) → 각 질문에 명확한 답변 → 💡 AI 도구 활용 팁(h2) → 핵심 정리 마무리\n- 질문은 실무자가 실제로 궁금해할 내용으로 구성` },
];

function buildPrompt(topic: Topic): string {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AI전환연구소";
  const currentDate = new Date().toISOString().slice(0, 10);
  const catInstruction = CATEGORY_INSTRUCTIONS[topic.category] || "";
  const structure = STRUCTURE_TEMPLATES[Math.floor(Math.random() * STRUCTURE_TEMPLATES.length)];

  return `당신은 "${siteName}" 블로그의 전문 작가입니다.
30여년 경력의 웹·IT 전문가 시점에서, 기업의 AI 전환을 돕는 실용적인 글을 작성합니다.
작성 기준일은 ${currentDate}입니다.

아래 주제로 블로그 글을 작성해주세요.

주제: ${topic.title}
난이도: ${topic.level}
카테고리: ${topic.category}

[작성 규칙]
1. 누구나 이해할 수 있는 쉽고 친근한 말투로 작성
2. 반드시 존댓말만 사용. 반말 절대 금지
3. "여러분", "독자님" 등 호칭 사용 금지
4. 첫 문장은 강한 후킹으로 시작 (인사말 금지). 충격적 통계, 의외의 사실, 공감되는 문제 제시 중 택 1
5. 3500자 내외, 표와 목록을 최대한 활용
6. 숫자로 설명 가능한 내용은 반드시 표로 제시
7. 글 마지막에 "💡 AI 도구 활용 팁" 섹션 포함
8. 각 섹션 끝에 핵심을 한 줄로 요약하는 <strong> 태그 사용

[신뢰성 규칙 — 반드시 준수]
- 확인할 수 없는 구체적 통계(예: "OO 조사에 따르면 87%...")를 지어내지 말 것
- 통계를 인용할 때는 일반적으로 알려진 사실만 사용하고, 정확한 수치보다 "약 절반", "상당수" 등 범위형 표현 사용
- 특정 기업의 실제 매출/성과 수치를 임의로 만들지 말 것. 가상의 사례는 "A사", "B사"로 표기하고 "가상 사례"임을 명시
- "~할 수 있습니다", "~가 기대됩니다" 등 가능성 표현 사용. "반드시 ~됩니다" 같은 단정 금지
- 과장된 수익 약속 금지 (예: "월 1천만원 보장" → "수익 구조를 만들 수 있습니다")
- 공식 자료가 입력으로 제공되지 않았으므로 제품의 정확한 가격, 요금제 금액, 모델 버전,
  출시·접근 상태를 단정하지 말 것
- 변경 가능성이 큰 정보는 구체적 숫자 대신 비교 기준을 설명하고
  "공식 사이트에서 최신 정보를 확인해야 합니다"라고 안내할 것
- 존재하지 않는 보고서, 조사기관, 링크, 출처를 만들지 말 것
- "최신", "현재", "최근 출시"라는 표현은 검증할 수 없으면 사용하지 말 것

${catInstruction}

${structure.instruction}

[출력 형식]
- 순수 HTML만 출력 (마크다운 기호 절대 사용 금지)
- 사용 가능한 태그: <h2> <h3> <p> <ul> <ol> <li> <table> <thead> <tbody> <tr> <th> <td> <strong> <blockquote>
- <h1> 태그 사용 금지

[AI 도구 활용 팁 HTML 형식]
<h2>💡 AI 도구 활용 팁</h2>
<p>...</p>
<ul><li>...</li></ul>
<blockquote>프롬프트 예시: "..."</blockquote>

[마지막에 반드시 추가]
글 전체 내용을 150자 이내로 요약한 문장을 <!-- meta: 요약 내용 --> 형태로 HTML 맨 마지막에 삽입해주세요. 검색엔진 노출용 설명문입니다.`;
}

function cleanHtml(raw: string): { html: string; metaDesc: string | null } {
  let cleaned = raw
    .replace(/```html\s*/gi, "")
    .replace(/```\s*/g, "")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^#{1,6}\s+(.+)$/gm, "<p>$1</p>")
    .replace(/<i\b[^>]*class="[^"]*(?:material-icons|fa|fas|far|fab)[^"]*"[^>]*>.*?<\/i>/gi, "")
    .replace(/<span\b[^>]*class="[^"]*(?:material-icons|material-symbols)[^"]*"[^>]*>.*?<\/span>/gi, "")
    .replace(/<i\b[^>]*>([a-z_]{3,30})<\/i>/gi, "")
    .trim();

  let metaDesc: string | null = null;
  const metaMatch = cleaned.match(/<!--\s*meta:\s*(.+?)\s*-->/);
  if (metaMatch) {
    metaDesc = metaMatch[1].trim().slice(0, 160);
    cleaned = cleaned.replace(/<!--\s*meta:\s*.+?\s*-->/g, "").trim();
  }

  return { html: cleaned, metaDesc };
}

async function getUsedImageIds(): Promise<Set<string>> {
  const { rows } = await pool.query(
    "SELECT thumbnail_url, content FROM posts WHERE status = 'published'"
  );
  const ids = new Set<string>();
  const inlineRegex = /src="(https:\/\/images\.unsplash\.com\/[^"?]+)/g;
  for (const row of rows) {
    if (row.thumbnail_url) ids.add((row.thumbnail_url as string).split("?")[0]);
    let match;
    while ((match = inlineRegex.exec(row.content as string)) !== null) ids.add(match[1]);
    inlineRegex.lastIndex = 0;
  }
  return ids;
}

async function fetchUnsplashImages(category: string, count: number, usedIds: Set<string>): Promise<UnsplashResult[]> {
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!unsplashKey) return [];
  const queries = CATEGORY_QUERIES[category] ?? ["business technology people office"];
  const results: UnsplashResult[] = [];
  for (const query of queries) {
    if (results.length >= count) break;
    try {
      let page = 1;
      while (results.length < count && page <= 3) {
        const url = new URL("https://api.unsplash.com/search/photos");
        url.searchParams.set("query", query);
        url.searchParams.set("per_page", "10");
        url.searchParams.set("orientation", "landscape");
        url.searchParams.set("page", String(page));
        const res = await fetch(url.toString(), { headers: { Authorization: `Client-ID ${unsplashKey}` } });
        if (!res.ok) break;
        const data = await res.json() as { results: Array<{ id: string; urls: { regular: string }; user: { name: string }; links: { html: string } }> };
        if (!data.results?.length) break;
        for (const photo of data.results) {
          const baseUrl = photo.urls.regular.split("?")[0];
          if (usedIds.has(baseUrl)) continue;
          usedIds.add(baseUrl);
          results.push({
            url: photo.urls.regular,
            attribution: `<a href="${photo.links.html}?utm_source=my_blog&utm_medium=referral" rel="noopener noreferrer" style="color:rgba(255,255,255,0.9);">${photo.user.name}</a> / Unsplash`,
          });
          if (results.length >= count) break;
        }
        page++;
      }
    } catch { /* skip */ }
  }
  return results;
}

function injectImagesIntoContent(html: string, images: UnsplashResult[], topicTitle: string): string {
  if (!images.length) return html;
  const DELIMITER = "</h2>";
  const parts = html.split(DELIMITER);
  const targets: Array<[number, number]> = [[1, 0], [3, 1]];
  for (const [partIdx, imgIdx] of targets) {
    if (partIdx >= parts.length || !images[imgIdx]) continue;
    const img = images[imgIdx];
    const altText = `${topicTitle} 관련 이미지 ${imgIdx + 1}`;
    const figure = `<figure style="margin:1.75em 0;position:relative;display:block;"><img src="${img.url}" alt="${altText}" loading="lazy" style="width:100%;max-height:400px;object-fit:cover;border-radius:10px;border:1px solid var(--border);display:block;" /><figcaption style="position:absolute;bottom:8px;right:10px;font-size:0.65rem;color:rgba(255,255,255,0.85);background:rgba(0,0,0,0.45);padding:2px 7px;border-radius:4px;line-height:1.5;white-space:nowrap;">${img.attribution}</figcaption></figure>`;
    parts[partIdx] = figure + parts[partIdx];
  }
  return parts.join(DELIMITER);
}

function writeLog(message: string): void {
  const logPath = path.resolve(process.cwd(), "scripts/upgrade.log");
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`, "utf-8");
  console.log(message);
}

async function main() {
  const batchSize = Number(process.argv[2]) || 5;

  writeLog(`=== 기존 글 업그레이드 시작 (${batchSize}개) ===`);

  // 조회수 낮은 순으로 아직 업그레이드하지 않은 글 선택
  const { rows: targets } = await pool.query(
    `SELECT id, slug, view_count FROM posts
     WHERE status = 'published'
       AND (upgraded_at IS NULL OR upgraded_at < '2026-05-25')
     ORDER BY view_count ASC
     LIMIT $1`,
    [batchSize]
  );

  if (!targets.length) {
    writeLog("모든 글이 이미 업그레이드되었습니다!");
    await pool.end();
    return;
  }

  writeLog(`대상: ${targets.map((t) => `${t.slug}(조회${t.view_count})`).join(", ")}`);

  const usedIds = await getUsedImageIds();
  let successCount = 0;

  for (const target of targets) {
    const topic = allTopics.find((t) => t.slug === target.slug);
    if (!topic) {
      writeLog(`[SKIP] ${target.slug} — topics.ts에 없음`);
      continue;
    }

    try {
      writeLog(`[${successCount + 1}/${targets.length}] ${topic.title} (조회 ${target.view_count})`);

      const prompt = buildPrompt(topic);
      const result = await model.generateContent(prompt);
      const rawContent = result.response.text();
      const { html: content, metaDesc } = cleanHtml(rawContent);
      writeLog(`  생성 완료 (${content.length}자)`);

      const inlineImages = await fetchUnsplashImages(topic.category, 2, usedIds);
      const contentWithImages = injectImagesIntoContent(content, inlineImages, topic.title);

      const finalMeta = metaDesc || topic.meta_description;
      await pool.query(
        `UPDATE posts SET content = $1, meta_description = $2, upgraded_at = NOW(), updated_at = NOW() WHERE slug = $3`,
        [contentWithImages, finalMeta, target.slug]
      );

      successCount++;
      writeLog(`  DB 업데이트 완료`);

      // API 부하 방지 (3초 대기)
      if (successCount < targets.length) await new Promise((r) => setTimeout(r, 3000));

    } catch (err) {
      writeLog(`  [ERROR] ${target.slug}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  writeLog(`=== 완료: ${successCount}/${targets.length}개 업그레이드 ===\n`);
  await pool.end();
}

main().catch((err) => {
  console.error("오류:", err);
  process.exit(1);
});
