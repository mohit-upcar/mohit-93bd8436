import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function ConfirmationPanel(): JSX.Element {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-start gap-8 px-6 pb-24 pt-20 sm:pt-28 md:pb-32 md:pt-32">
        <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-textMuted">
          <CheckMark />
          Confirmed
        </span>

        <h1 className="animate-fade-in-up-delay font-display text-4xl font-semibold leading-[1.1] tracking-tight text-text sm:text-5xl">
          You're on the list.
        </h1>

        <p className="animate-fade-in-up-delay max-w-prose text-[17px] leading-[1.6] text-textMuted">
          Thank you. We'll reach out the moment {BRAND.name} launches — and
          nowhere in between. If you'd like to say hello in the meantime, our
          door is at{" "}
          <a
            className="text-text underline decoration-border underline-offset-4 transition hover:decoration-accent"
            href={`mailto:${BRAND.contactEmail}`}
          >
            {BRAND.contactEmail}
          </a>
          .
        </p>

        <div className="animate-fade-in-up-delay-2 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text transition hover:bg-surface2"
          >
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
              <path d="M19 12H5" />
              <path d="M11 18l-6-6 6-6" />
            </svg>
            Back to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

function CheckMark(): JSX.Element {
  return (
    <span
      aria-hidden
      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accentFg"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}
