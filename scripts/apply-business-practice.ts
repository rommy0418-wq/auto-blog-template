// Targeted editorial update. Back up the original and reject concurrent edits.
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local", quiet: true });
async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const { rows } = await pool.query("SELECT * FROM posts WHERE id = 144 AND slug = 'business-017' AND status = 'published'");
    const post = rows[0];
    if (!post) throw new Error("Target post not found");
    if (post.content.includes('id="practical-assistant-kit"')) throw new Error("Already applied");
    const appendix = readFileSync("scripts/editorial/business-017-practice.html", "utf8");
    const backup = join(mkdtempSync(join(tmpdir(), "blog-editorial-")), "business-017.json");
    writeFileSync(backup, JSON.stringify(post, null, 2), { mode: 0o600 });
    const content = post.content.replace("AI는 피드백을 통해 학습하고 개선될 수 있습니다.", "대화 안에서 피드백을 반영해 결과를 수정할 수 있지만, 이것이 모델의 영구 학습을 뜻하지는 않습니다.") + "\n" + appendix;
    const result = await pool.query("UPDATE posts SET content = $1, meta_description = $2, updated_at = NOW(), upgraded_at = NOW() WHERE id = $3 AND content = $4", [content, "1인기업 AI 비서를 일정·메일·자료조사에 적용하는 방법. 복사해서 쓰는 프롬프트 3종, 발송 전 검토표와 7일 시간 측정 양식으로 시작하세요.", post.id, post.content]);
    if (result.rowCount !== 1) throw new Error("Concurrent edit detected; not updated");
    console.log(JSON.stringify({ updated: post.slug, backup }));
    if (!process.env.ADMIN_API_KEY) throw new Error("Updated; cache refresh needs ADMIN_API_KEY");
    const response = await fetch("https://aitrans-lab.com/api/posts/144", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${process.env.ADMIN_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ meta_description: "1인기업 AI 비서를 일정·메일·자료조사에 적용하는 방법. 복사해서 쓰는 프롬프트 3종, 발송 전 검토표와 7일 시간 측정 양식으로 시작하세요." }),
    });
    if (!response.ok) throw new Error(`Updated; cache refresh failed: ${response.status}`);
    console.log("Cache refreshed");
  } finally { await pool.end(); }
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
