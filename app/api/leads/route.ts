import { NextResponse } from "next/server";
import { hasDatabase, query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Same validation semantics as the client-side check, plus a hard length cap.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= 254 &&
    EMAIL_RE.test(value)
  );
}

async function readEmail(req: Request): Promise<string | null> {
  const ct = req.headers.get("content-type") ?? "";
  try {
    if (ct.includes("application/json")) {
      const body = (await req.json()) as { email?: unknown };
      return typeof body.email === "string" ? body.email.trim().toLowerCase() : null;
    }
    if (
      ct.includes("application/x-www-form-urlencoded") ||
      ct.includes("multipart/form-data")
    ) {
      const form = await req.formData();
      const raw = form.get("email");
      return typeof raw === "string" ? raw.trim().toLowerCase() : null;
    }
  } catch {
    return null;
  }
  return null;
}

// Progressive-enhancement redirect helpers. Relative Location — the browser
// resolves it against the PUBLIC origin (never the internal localhost:PORT
// bind the reverse proxy fronts).
function redirect(path: string, status = 303): NextResponse {
  return new NextResponse(null, { status, headers: { Location: path } });
}

export async function POST(req: Request): Promise<NextResponse> {
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  const email = await readEmail(req);

  if (!isValidEmail(email)) {
    return wantsJson
      ? NextResponse.json(
          { ok: false, error: "That doesn't look like a valid email address." },
          { status: 400 },
        )
      : redirect("/?error=invalid_email");
  }

  if (!hasDatabase()) {
    // Degrade gracefully — say so plainly instead of 500-ing the page.
    console.warn("[leads] DATABASE_URL not set; skipping insert for", email);
    return wantsJson
      ? NextResponse.json(
          { ok: false, error: "The signup list isn't wired up yet. Please try later." },
          { status: 503 },
        )
      : redirect("/?error=server");
  }

  try {
    await query(
      `INSERT INTO leads (email, source)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING`,
      [email, "coming_soon"],
    );
    return wantsJson
      ? NextResponse.json({ ok: true }, { status: 200 })
      : redirect("/thank-you");
  } catch (err) {
    console.error("[leads] insert failed", err);
    return wantsJson
      ? NextResponse.json(
          { ok: false, error: "Something went wrong on our side. Please retry." },
          { status: 500 },
        )
      : redirect("/?error=server");
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: true, endpoint: "leads", method: "POST" });
}
