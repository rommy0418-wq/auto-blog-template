import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { getClientIp, verifyAdminKey } from "@/lib/seo";
import { checkRateLimit, RATE_WINDOW } from "@/lib/spam";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const commentId = Number(id);

    if (!Number.isSafeInteger(commentId) || commentId < 1) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const admin = verifyAdminKey(request);
    if (!admin) {
      const { limited, unavailable } = await checkRateLimit(getClientIp(request), "comment-delete");
      if (limited) return NextResponse.json({ error: "잠시 후 다시 시도해 주세요." },
        { status: unavailable ? 503 : 429, headers: { "Retry-After": String(RATE_WINDOW) } });
    }
    const { rows } = await pool.query(
      "SELECT id, password FROM comments WHERE id = $1",
      [commentId]
    );
    const comment = rows[0];

    if (!comment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (admin) {
      await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);
      return NextResponse.json({ success: true });
    }

    const body = await request.json().catch(() => ({}));
    const password = body?.password;

    // Existing comments may have short passwords; retain deletion access.
    if (typeof password !== "string" || !password || Buffer.byteLength(password, "utf8") > 72) {
      return NextResponse.json({ error: "Password required" }, { status: 401 });
    }

    const passwordOk = await bcrypt.compare(password, comment.password);
    if (!passwordOk) {
      return NextResponse.json({ error: "Wrong password" }, { status: 403 });
    }

    await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/comments/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
