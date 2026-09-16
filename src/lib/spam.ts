import pool from "@/lib/db";
import { createHmac } from "node:crypto";

const positive = (value: string | undefined, fallback: number) => {
  const n = Number(value);
  return Number.isSafeInteger(n) && n > 0 && n <= 86400 ? n : fallback;
};
const RATE_LIMIT = positive(process.env.COMMENT_RATE_LIMIT, 3);
export const RATE_WINDOW = positive(process.env.RATE_LIMIT_WINDOW, 60);

export function checkHoneypot(body: Record<string, unknown>): boolean {
  return Boolean(body.website);
}

// Fits existing VARCHAR(45) columns. Never store new raw addresses here.
function securityIdentifier(ip: string): string {
  const secret = process.env.ADMIN_API_KEY;
  if (!secret) throw new Error("Security identifier key is unavailable");
  return createHmac("sha256", secret).update(ip).digest("hex").slice(0, 40);
}

export async function logSpam(ip: string, trigger: "honeypot" | "rate_limit" | "captcha_fail"): Promise<void> {
  try {
    await pool.query("INSERT INTO spam_logs (ip_address, trigger_type, request_data) VALUES ($1, $2, NULL)", [securityIdentifier(ip), trigger]);
  } catch {
    // Never log request data or bypass the limiter on failure.
  }
}

export async function checkRateLimit(ip: string, endpoint: string): Promise<{ limited: boolean; unavailable?: boolean }> {
  try {
    const { rows } = await pool.query(
      `INSERT INTO rate_limits (ip_address, endpoint, hit_count, window_start)
       VALUES ($1, $2, 1, NOW())
       ON CONFLICT (ip_address, endpoint) DO UPDATE SET
         hit_count = CASE WHEN rate_limits.window_start <= NOW() - ($3 * INTERVAL '1 second')
           THEN 1 ELSE LEAST(rate_limits.hit_count + 1, $4 + 1) END,
         window_start = CASE WHEN rate_limits.window_start <= NOW() - ($3 * INTERVAL '1 second')
           THEN NOW() ELSE rate_limits.window_start END
       RETURNING hit_count`,
      [securityIdentifier(ip), endpoint, RATE_WINDOW, RATE_LIMIT]
    );
    return { limited: Number(rows[0].hit_count) > RATE_LIMIT };
  } catch {
    return { limited: true, unavailable: true };
  }
}
