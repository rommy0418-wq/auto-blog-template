export function validPostInput(body: unknown, partial = false): body is Record<string, unknown> {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const b = body as Record<string, unknown>;
  const textFields: Record<string, number> = { title: 255, content: 1000000, slug: 255, category: 50, meta_description: 300, keywords: 500, thumbnail_url: 500 };
  if (!partial && (!b.title || !b.content)) return false;
  for (const [field, max] of Object.entries(textFields)) {
    if (!(field in b)) continue;
    const value = b[field];
    if (value === null && ["thumbnail_url", "meta_description", "keywords"].includes(field)) continue;
    if (typeof value !== "string" || value.length > max) return false;
    if (["title", "content", "slug", "category"].includes(field) && !value.trim()) return false;
  }
  if (typeof b.slug === "string" && !/^[a-zA-Z0-9가-힣_-]+$/.test(b.slug)) return false;
  if (b.thumbnail_url) {
    try { if (new URL(String(b.thumbnail_url)).protocol !== "https:") return false; } catch { return false; }
  }
  if ("status" in b && !["draft", "published", "scheduled"].includes(String(b.status))) return false;
  if ("published_at" in b && b.published_at !== null &&
      (typeof b.published_at !== "string" || !Number.isFinite(Date.parse(b.published_at)))) return false;
  return true;
}
