// Deploy-time, append-only, transactional, data-preserving schema migration.
// - Runs from `prestart` on the deploy host, NEVER per-request.
// - Ledger: _schema_migrations (id PK, checksum, applied_at).
// - Advisory lock so two boots cannot race.
// - Never drops/truncates/deletes; adds only.
import pg from "pg";
import { createHash } from "node:crypto";

const url = process.env.DATABASE_URL;
if (!url) {
  console.warn("[migrate] DATABASE_URL unset — skipping");
  process.exit(0);
}

// APPEND ONLY. Never edit / rename / reorder an already-shipped entry.
const MIGRATIONS = [
  {
    id: "0001_initial_schema",
    statements: [
      `CREATE EXTENSION IF NOT EXISTS pgcrypto`,
      `CREATE TABLE IF NOT EXISTS leads (
         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
         email TEXT UNIQUE NOT NULL,
         source TEXT NOT NULL DEFAULT 'coming_soon',
         created_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,
      `CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC)`,
    ],
  },
];

const pool = new pg.Pool({ connectionString: url });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TRANSIENT_MSG =
  /ECONNREFUSED|ETIMEDOUT|timeout|terminating connection|endpoint has been disabled|Connection terminated/i;
const TRANSIENT_CODES = new Set([
  "08000", "08003", "08006", "53300", "57P01", "57P02", "57P03", "42501",
]);
const isTransient = (e) => TRANSIENT_CODES.has(e?.code) || TRANSIENT_MSG.test(e?.message || "");

async function withRetry(label, fn) {
  for (let i = 1; i <= 10; i++) {
    try {
      return await fn();
    } catch (err) {
      if (!isTransient(err) || i === 10) throw err;
      console.warn(`[migrate] ${label} attempt ${i}/10 failed (transient ${err?.code || "?"}) — retrying`);
      await sleep(Math.min(3000, 300 * i));
    }
  }
}

const connectWithRetry = () => withRetry("connect", () => pool.query("SELECT 1"));

function assertSafeMigration(m) {
  if (!m || typeof m.id !== "string" || !/^[a-z0-9_]+$/i.test(m.id)) {
    throw new Error("migration ids must be non-empty alphanumeric/underscore strings");
  }
  if (!Array.isArray(m.statements) || m.statements.length === 0) {
    throw new Error(`migration ${m.id} has no statements`);
  }
  const destructive = /\b(DROP\s+(TABLE|COLUMN|SCHEMA|DATABASE)|TRUNCATE|DELETE\s+FROM|CASCADE)\b/i;
  for (const s of m.statements) {
    if (typeof s !== "string" || destructive.test(s)) {
      throw new Error(`migration ${m.id} contains destructive SQL`);
    }
  }
}

function checksum(m) {
  return createHash("sha256").update(JSON.stringify(m.statements)).digest("hex");
}

try {
  await connectWithRetry();
  await withRetry("schema", async () => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("SELECT pg_advisory_xact_lock(72494611)");
      await client.query(
        `CREATE TABLE IF NOT EXISTS _schema_migrations (
           id TEXT PRIMARY KEY,
           checksum TEXT NOT NULL,
           applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`,
      );
      const appliedRes = await client.query("SELECT id, checksum FROM _schema_migrations");
      const applied = new Map(appliedRes.rows.map((r) => [r.id, r.checksum]));
      const seen = new Set();
      for (const m of MIGRATIONS) {
        assertSafeMigration(m);
        if (seen.has(m.id)) throw new Error(`duplicate migration id: ${m.id}`);
        seen.add(m.id);
        const digest = checksum(m);
        if (applied.has(m.id)) {
          if (applied.get(m.id) !== digest) {
            throw new Error(`applied migration ${m.id} was edited; append a new migration instead`);
          }
          continue;
        }
        for (const s of m.statements) await client.query(s);
        await client.query("INSERT INTO _schema_migrations (id, checksum) VALUES ($1, $2)", [m.id, digest]);
        console.log(`[migrate] applied ${m.id}`);
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK").catch(() => undefined);
      throw err;
    } finally {
      client.release();
    }
  });
} catch (err) {
  console.error("[migrate] FAILED", err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
