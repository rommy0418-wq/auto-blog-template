import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { sha256 } from "@/lib/hash";
import { getClientIp } from "@/lib/seo";
import { checkHoneypot, checkRateLimit, logSpam, RATE_WINDOW } from "@/lib/spam";
import { validComment } from "@/lib/comment-validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = Number(searchParams.get("postId"));

    if (!Number.isSafeInteger(postId) || postId < 1) {
      return NextResponse.json({ error: "postId is required" }, { status: 400 });
    }

    const { rows: comments } = await pool.query(
      `SELECT id, post_id, nickname, content, created_at
       FROM comments
       WHERE post_id = $1 AND is_approved = TRUE
         AND EXISTS (SELECT 1 FROM posts WHERE posts.id = comments.post_id AND posts.status = 'published')
       ORDER BY created_at ASC`,
      [postId]
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/comments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!validComment(body)) return NextResponse.json(
      { error: "닉네임·댓글을 확인하고 비밀번호는 4자 이상, 72바이트 이내로 입력해 주세요." }, { status: 400 }
    );
    const ip = getClientIp(request);

    if (checkHoneypot(body)) {
      await logSpam(ip, "honeypot");
      return NextResponse.json({ id: 0, success: true });
    }

    const { limited, unavailable } = await checkRateLimit(ip, "comment");
    if (limited) {
      return NextResponse.json({ error: unavailable ? "보안 확인이 일시적으로 불가능합니다. 잠시 후 다시 시도해 주세요." : `요청이 많습니다. ${RATE_WINDOW}초 후 다시 시도해 주세요.` },
        { status: unavailable ? 503 : 429, headers: { "Retry-After": String(RATE_WINDOW) } });
    }

    const { postId, nickname, password, content } = body;

    if (!postId || !nickname || !password || !content) {
      return NextResponse.json(
        { error: "postId, nickname, password, content are required" },
        { status: 400 }
      );
    }

    if (nickname.length > 30) {
      return NextResponse.json({ error: "nickname too long" }, { status: 400 });
    }

    if (content.length > 2000) {
      return NextResponse.json({ error: "content too long" }, { status: 400 });
    }

    const { rows: postRows } = await pool.query("SELECT id FROM posts WHERE id = $1 AND status = 'published'", [postId]);
    if (!postRows[0]) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const ipHash = sha256(ip);

    const result = await pool.query(
      `INSERT INTO comments (post_id, nickname, password, content, ip_hash, is_approved)
       VALUES ($1, $2, $3, $4, $5, FALSE)
       RETURNING id`,
      [postId, nickname.trim(), passwordHash, content.trim(), ipHash]
    );

    return NextResponse.json(
      { id: result.rows[0].id, success: true, pendingApproval: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
