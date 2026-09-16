import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Respect the connection URL's verified TLS configuration; never disable verification.
});

export default pool;
