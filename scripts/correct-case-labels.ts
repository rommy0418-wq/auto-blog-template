import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config({ path: ".env.local", quiet: true });
const changes = [
  { slug: "cases-017", title: "[가상 시나리오] 직원 10명 제조기업의 AI 첫 도입 설계", meta: "가상의 부품 제조기업을 통해 AI 도입 과정을 설명합니다. 본문의 수치와 결과는 실제 고객 성과가 아니며, 적용 가능성과 검토 항목을 구분해 읽는 학습용 예시입니다." },
  { slug: "cases-018", title: "[가상 시나리오] 고객센터 AI 도입과 상담 품질 검토", meta: "가상의 쇼핑몰 고객센터를 통해 AI 상담 도입 구조를 설명합니다. 비교표의 시간·해결률은 검증된 통계나 실제 성과가 아닌 설명용 가정입니다." },
  { slug: "cases-019", title: "건설회사 AI 문서 자동화 — 보고서 초안 시험 운영 가이드", meta: "실제 고객 사례가 아닌 문서 자동화 설계 예시. 현장 메모 입력 양식, 보고서 초안 프롬프트, 원문 대조 기준과 자동화 중단 조건을 제공합니다." },
];
async function main() {
  if (!process.argv.includes("--historical-migration-do-not-use")) {
    throw new Error("Retired: all case articles were rewritten. Do not restore the earlier labels.");
  }
  if (!process.env.ADMIN_API_KEY) throw new Error("Cache refresh credential missing");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  const updates: { id: number; meta: string }[] = [];
  try {
    await client.query("BEGIN");
    const { rows } = await client.query("SELECT * FROM posts WHERE slug = ANY($1) AND status = 'published' FOR UPDATE", [changes.map(x => x.slug)]);
    if (rows.length !== 3) throw new Error("Target count changed");
    const backup = join(mkdtempSync(join(tmpdir(), "blog-case-corrections-")), "originals.json");
    writeFileSync(backup, JSON.stringify(rows, null, 2), { mode: 0o600 });
    for (const change of changes) {
      const old = rows.find(x => x.slug === change.slug);
      if (old.content.includes("2026년 9월 16일 수정")) throw new Error("Already corrected");
      const content = change.slug === "cases-019" ? readFileSync("scripts/editorial/cases-019-revised.html", "utf8") :
        '<p><strong>가상 시나리오 안내 — 2026년 9월 16일 수정.</strong> 이 글은 실제 기업을 취재하거나 도입 성과를 측정한 사례가 아닙니다. 본문의 회사·성과·시간·해결률 등은 설명용 가정이며 검증된 통계가 아닙니다. 효과를 예측하는 근거로 사용하지 마세요.</p>\n' + old.content;
      await client.query("UPDATE posts SET title=$1, meta_description=$2, content=$3, upgraded_at=NOW(), updated_at=NOW() WHERE id=$4", [change.title, change.meta, content, old.id]);
      updates.push({ id: old.id, meta: change.meta });
    }
    await client.query("COMMIT");
    console.log(JSON.stringify({ corrected: changes.map(x => x.slug), backup }));
  } catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { client.release(); await pool.end(); }
  for (const update of updates) {
    const response = await fetch(`https://aitrans-lab.com/api/posts/${update.id}`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.ADMIN_API_KEY}` }, body: JSON.stringify({ meta_description: update.meta }) });
    if (!response.ok) throw new Error(`Content saved but cache refresh failed: ${response.status}`);
  }
  console.log("All article caches refreshed");
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
