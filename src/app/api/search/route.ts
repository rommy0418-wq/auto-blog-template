import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ posts: [], total: 0 });
  }

  const searchTerm = `%${q}%`;
  const { rows } = await pool.query(
    `SELECT id, title, slug, category, level, thumbnail_url, meta_description, published_at, view_count
     FROM posts
     WHERE status = 'published'
       AND (title ILIKE $1 OR meta_description ILIKE $1 OR keywords ILIKE $1)
     ORDER BY
       CASE WHEN title ILIKE $1 THEN 0 ELSE 1 END,
       published_at DESC
     LIMIT 20`,
    [searchTerm]
  );

  return NextResponse.json({ posts: rows, total: rows.length });
}
