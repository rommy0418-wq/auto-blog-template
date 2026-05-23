import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { generateSlug, verifyAdminKey } from "@/lib/seo";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 10));
    const category = searchParams.get("category") || null;
    const offset = (page - 1) * limit;

    let countQuery = "SELECT COUNT(*) as total FROM posts WHERE status = 'published'";
    let dataQuery = `
      SELECT id, title, slug, category, thumbnail_url, meta_description,
             published_at, created_at, view_count
      FROM posts
      WHERE status = 'published'
    `;
    const params: (string | number)[] = [];
    const countParams: (string | number)[] = [];

    if (category) {
      countQuery += ` AND category = $1`;
      dataQuery += ` AND category = $1`;
      params.push(category);
      countParams.push(category);
    }

    const limitIdx = params.length + 1;
    const offsetIdx = params.length + 2;
    dataQuery += ` ORDER BY published_at DESC LIMIT $${limitIdx} OFFSET $${offsetIdx}`;
    params.push(limit, offset);

    const countResult = await pool.query(countQuery, countParams);
    const total = Number(countResult.rows[0].total);
    const { rows: posts } = await pool.query(dataQuery, params);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, slug, category, thumbnail_url, meta_description, keywords, status, published_at } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "title and content are required" }, { status: 400 });
    }

    const finalSlug = slug || generateSlug(title);

    const result = await pool.query(
      `INSERT INTO posts (title, content, slug, category, thumbnail_url, meta_description, keywords, status, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        title,
        content,
        finalSlug,
        category || "general",
        thumbnail_url || null,
        meta_description || null,
        keywords || null,
        status || "draft",
        published_at || null,
      ]
    );

    revalidatePath("/");
    if (status === "published") {
      revalidatePath(`/posts/${finalSlug}`);
    }

    return NextResponse.json({ id: result.rows[0].id, slug: finalSlug }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && (error as NodeJS.ErrnoException).code === "23505") {
      return NextResponse.json({ error: "slug already exists" }, { status: 409 });
    }
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
