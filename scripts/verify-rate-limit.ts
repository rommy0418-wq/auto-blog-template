// Integration test against an isolated temporary table; transaction is always rolled back.
import dotenv from 'dotenv';
import assert from 'node:assert/strict';
dotenv.config({ path: '.env.local', quiet: true });
async function main() {
  const { default: pool } = await import('../src/lib/db');
  const { checkRateLimit } = await import('../src/lib/spam');
  const client = await pool.connect();
  const query = pool.query;
  try {
    await client.query('BEGIN');
    await client.query('CREATE TEMP TABLE rate_limits (LIKE public.rate_limits INCLUDING ALL) ON COMMIT DROP');
    pool.query = client.query.bind(client) as typeof pool.query;
    const limit = Number(process.env.COMMENT_RATE_LIMIT) || 3;
    const results = await Promise.all(Array.from({ length: limit + 2 }, () => checkRateLimit('192.0.2.123', 'audit-temporary')));
    assert.equal(results.filter(r => !r.limited).length, limit);
    assert.equal(results.some(r => r.unavailable), false);
    await client.query("UPDATE rate_limits SET window_start = NOW() - INTERVAL '2 days'");
    assert.equal((await checkRateLimit('192.0.2.123', 'audit-temporary')).limited, false);
    const { rows } = await client.query('SELECT ip_address FROM rate_limits');
    assert.match(rows[0].ip_address, /^[a-f0-9]{40}$/);
    console.log('Rate limit integration passed: threshold, window reset, pseudonymous key; temporary data rolled back.');
  } finally {
    pool.query = query;
    await client.query('ROLLBACK');
    client.release();
    await pool.end();
  }
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
