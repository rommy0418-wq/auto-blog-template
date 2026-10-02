import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 2,
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 10000,
  // Respect the connection URL's verified TLS configuration; never disable verification.
});

export default pool;
