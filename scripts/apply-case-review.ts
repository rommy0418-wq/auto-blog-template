import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config({ path: ".env.local", quiet: true });

const identityClaims = process.argv.includes("--identity-claims");
const educationHealth = process.argv.includes("--education-health");
assert.ok(!(identityClaims && educationHealth), "Select only one review batch");
const changes = (educationHealth ? [
  { slug: "cases-004", expectedTitle: "병원·의원 AI 활용 — 예약·차트·마케팅 자동화 사례", title: "의료기관 AI 첫 시험 — 환자정보 없는 공개 안내문 검수", meta: "가상 병원 성과 대신 공개 행정 안내문 초안을 시험하는 방법을 정리했습니다. 환자정보·임상 판단을 제외하고 문서 승인, 실패 질문, 담당자 검수를 구분합니다." },
  { slug: "cases-006", expectedTitle: "교육 서비스 AI 전환 — 학원·코칭 비즈니스 사례", title: "교육용 AI 자료 검수 — 정답·풀이·학습 효과를 구분하는 법", meta: "확인되지 않은 교육 서비스 성과 수치를 삭제하고 교사용 검수 절차로 개편했습니다. 분수 문제 예시, 오류 판정, 배포 승인과 학습 효과 측정의 한계를 설명합니다." },
] : identityClaims ? [
  { slug: "cases-013", expectedTitle: "30여년 에이전시 대표가 본 AI 전환의 본질 — 현장 인사이트", title: "AI 전환의 업무 설계 — 책임자·승인·예외 처리 정하기", meta: "개인의 현장 경험이 아닌 AI 업무 설계 가이드. 제안서 초안 예시로 입력 책임자, 검수와 승인, 예외 처리, 확대 여부를 판단할 기록을 정리합니다." },
  { slug: "cases-014", expectedTitle: "AI 시대 M&A·투자 전략 — AI 역량 기업 가치 평가법", title: "AI 기업 검토 시 요청할 기술 자료 — 주장과 증거를 구분하는 법", meta: "실제 인수 자문 사례가 아닌 기술 검토 자료 요청 가이드. 자체 개발 범위, 성능 시험, 외부 의존성, 미확인 사항을 기록하며 투자 판단과 구분합니다." },
  { slug: "cases-015", expectedTitle: "AI 컨설턴트의 실제 AI 스택 공개 — 도구와 워크플로우 전체", title: "문서 요약 AI 워크플로우 설계 — 구성요소·권한·실패 시험", meta: "실제 사용 도구 공개가 아닌 문서 요약 자동화 설계안. 입력·추출·초안·검수 역할, 최소 권한, 중복 요청과 오류 처리 시험을 안내합니다." },
] : [
  { slug: "cases-017", expectedTitle: "[가상 시나리오] 직원 10명 제조기업의 AI 첫 도입 설계", title: "소규모 제조기업의 AI 외관 검사 — 구매 전 시험 설계", meta: "가상 성과 수치 대신 외관 검사 AI의 시험 방법을 정리했습니다. 자료 분리, 불량 누락·과검출 측정, 촬영 조건 기록과 구매 전 확인할 결과물을 제안합니다." },
  { slug: "cases-018", expectedTitle: "[가상 시나리오] 고객센터 AI 도입과 상담 품질 검토", title: "고객센터 AI 도입 전 검수 — 답변 근거와 상담원 이관 시험", meta: "실제 성과 사례가 아닌 고객 응대 AI 시험 가이드. 승인 문서 구성, 상담원 검토용 지시문, 실패 질문, 근거 확인과 이관·중단 기준을 제공합니다." },
]).map(change => ({ ...change, content: readFileSync(`scripts/editorial/${change.slug}-revised.html`, "utf8").trim() }));

async function main() {
  for (const change of changes) {
    assert.ok(change.content.includes("편집 정정"));
    assert.ok(change.content.includes("https://") && /nist.gov|genai.owasp.org|who.int|unesco.org/.test(change.content));
    assert.ok(change.content.length > 2000);
    assert.ok(!/<script|<iframe|onerror=/i.test(change.content));
    assert.ok(!/75% 감소|50% 증가|약 98%|투자 이상의 효과/.test(change.content));
  }
  if (!process.argv.includes("--apply")) {
    console.log(JSON.stringify({ mode: "validation-only", posts: changes.map(x => ({ slug: x.slug, title: x.title, characters: x.content.length })) }));
    return;
  }
  assert.ok(process.env.ADMIN_API_KEY, "Cache refresh credential missing");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const updates: { id: number; meta: string }[] = [];
  try {
    await client.query("BEGIN");
    const { rows } = await client.query("SELECT * FROM posts WHERE slug=ANY($1) AND status='published' FOR UPDATE", [changes.map(x => x.slug)]);
    assert.equal(rows.length, changes.length, "Target count changed");
    for (const change of changes) {
      const old = rows.find(x => x.slug === change.slug);
      assert.equal(old.title, change.expectedTitle, "Target changed or already reviewed");
      if (!identityClaims && !educationHealth) assert.ok(old.content.includes("가상 시나리오 안내 — 2026년 9월 16일 수정"), "Expected prior review marker missing");
    }
    const backup = join(mkdtempSync(join(tmpdir(), "blog-case-review-")), "originals.json");
    writeFileSync(backup, JSON.stringify(rows, null, 2), { mode: 0o600 });
    for (const change of changes) {
      const old = rows.find(x => x.slug === change.slug);
      await client.query("UPDATE posts SET title=$1, meta_description=$2, content=$3, upgraded_at=NOW(), updated_at=NOW() WHERE id=$4", [change.title, change.meta, change.content, old.id]);
      updates.push({ id: old.id, meta: change.meta });
    }
    await client.query("COMMIT");
    console.log(JSON.stringify({ corrected: changes.map(x => x.slug), backup }));
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
  for (const update of updates) {
    const response = await fetch(`https://aitrans-lab.com/api/posts/${update.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.ADMIN_API_KEY}` },
      body: JSON.stringify({ meta_description: update.meta }),
    });
    if (!response.ok) throw new Error(`Saved but cache refresh failed for ${update.id}: ${response.status}`);
  }
  console.log("Article and home caches refreshed");
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
