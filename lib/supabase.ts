// Supabase client stub. Reads connection details from the environment so the
// app works the moment its database env vars are wired (Zavi provisions a
// Postgres/Supabase resource per company and injects these). Everything here is
// lazy + null-tolerant: a fresh deploy with NO env set still builds and serves a
// page — `getSupabase()` simply returns null until the keys arrive.
//
// Env contract (set by the provisioner / Render dashboard):
//   NEXT_PUBLIC_SUPABASE_URL       e.g. https://<project>.supabase.co  (browser-safe)
//   NEXT_PUBLIC_SUPABASE_ANON_KEY  RLS-respecting anon key             (browser-safe)
//   DATABASE_URL                   server-side Postgres connection string (NEVER
//                                  exposed to the browser — read in server code only)
//
// NOTE: never read DATABASE_URL or a service-role key from client components.
// Only the two NEXT_PUBLIC_* values are safe in the browser.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True once the browser-safe Supabase env vars are present. */
export function hasSupabaseConfig(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/** Server-side Postgres URL, if provisioned. Use in server code only. */
export function databaseUrl(): string | null {
  return process.env.DATABASE_URL || null;
}

let cached: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client, or null if the env isn't configured yet.
 * Callers should null-check rather than assume a client exists, so the app
 * degrades gracefully before the database resource is wired.
 */
export function getSupabase(): SupabaseClient | null {
  if (!hasSupabaseConfig()) return null;
  if (!cached) {
    cached = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return cached;
}
