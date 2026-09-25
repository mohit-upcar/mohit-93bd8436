// Postgres client for a GENERATED app.
// - int8 (OID 20) type-parser: BIGINT/BIGSERIAL come back as JS numbers, not strings.
// - DATABASE_URL is SERVER-ONLY. Never read this from a client component.
// - TLS is driven by the connection string (sslmode=require).
// - Degrade gracefully: the module IMPORTS even when DATABASE_URL is unset
//   (next build runs before it is injected). Throw is deferred to first query.
import "server-only";
import pg from "pg";

pg.types.setTypeParser(20, (v: string | null) => (v === null ? null : Number(v)));

let _pool: pg.Pool | null = null;

/** True when a DATABASE_URL is present — guard reads so the build can render. */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function pool(): pg.Pool {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set — refusing to query without a database");
  }
  if (!_pool) {
    _pool = new pg.Pool({ connectionString: url });
  }
  return _pool;
}

/** Parameterized query — ALWAYS use $1, $2, … placeholders, never string interp. */
export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<pg.QueryResult<T>> {
  return pool().query<T>(text, params as never);
}
