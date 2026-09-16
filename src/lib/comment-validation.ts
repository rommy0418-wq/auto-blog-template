export function validComment(body: unknown): body is { postId: number; nickname: string; password: string; content: string; website?: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const b = body as Record<string, unknown>;
  return Number.isSafeInteger(b.postId) && Number(b.postId) > 0
    && typeof b.nickname === "string" && b.nickname.trim().length > 0 && b.nickname.length <= 30
    && typeof b.password === "string" && b.password.length >= 4 && Buffer.byteLength(b.password, "utf8") <= 72
    && typeof b.content === "string" && b.content.trim().length > 0 && b.content.length <= 2000;
}
