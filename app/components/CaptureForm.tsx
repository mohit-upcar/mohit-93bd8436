"use client";

import { useState, type FormEvent } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

export default function CaptureForm({
  initialError,
  onDark = false,
}: {
  initialError?: string;
  /** Style the shell for placement over a dark hero photograph. */
  onDark?: boolean;
}): JSX.Element {
  const [status, setStatus] = useState<Status>(
    initialError ? { kind: "error", message: initialError } : { kind: "idle" },
  );
  const [email, setEmail] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setStatus({ kind: "error", message: "Enter a valid email address." });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        window.location.href = "/thank-you";
        return;
      }
      setStatus({
        kind: "error",
        message: data.error ?? "Something went wrong. Try again in a moment.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Couldn't reach the server. Check your connection and retry.",
      });
    }
  }

  const submitting = status.kind === "submitting";
  const errorMessage = status.kind === "error" ? status.message : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full max-w-xl"
      aria-describedby={errorMessage ? "capture-form-error" : undefined}
    >
      <div
        className={
          onDark
            ? "flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-cardLift backdrop-blur-md sm:flex-row sm:items-center sm:p-1.5"
            : "flex flex-col gap-3 rounded-2xl border border-border bg-surface p-2 shadow-sm sm:flex-row sm:items-center sm:p-1.5"
        }
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          className={
            onDark
              ? "min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-[15px] text-white placeholder:text-white/55 focus:outline-none"
              : "min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-[15px] text-text placeholder:text-textMuted focus:outline-none"
          }
        />
        <button
          type="submit"
          disabled={submitting}
          className={
            onDark
              ? "inline-flex items-center justify-center gap-2 rounded-xl bg-accent2 px-6 py-3 text-sm font-semibold tracking-tight text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:cursor-not-allowed disabled:opacity-70"
              : "inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-accentFg transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-70"
          }
        >
          {submitting ? "Adding you…" : "Reserve early access"}
          {!submitting && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
      </div>
      <p
        id="capture-form-error"
        role={errorMessage ? "alert" : undefined}
        className={
          "mt-3 min-h-[1.25rem] text-sm " +
          (errorMessage
            ? onDark
              ? "text-red-300"
              : "text-red-700"
            : onDark
              ? "text-white/70"
              : "text-textMuted")
        }
      >
        {errorMessage ??
          "No spam. One email when we launch, then occasional updates."}
      </p>
    </form>
  );
}

function isValidEmail(value: string): boolean {
  // Deliberately lenient - server does the authoritative check.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}
