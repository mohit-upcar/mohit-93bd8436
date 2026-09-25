import Link from "next/link";
import { BRAND } from "@/lib/brand";

export default function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-text"
        >
          <BrandMark />
          <span className="lowercase">{BRAND.name}</span>
        </Link>
        <span className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-textMuted sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent2" aria-hidden />
          {BRAND.launchTeaser}
        </span>
      </div>
    </header>
  );
}

/**
 * carho mark — a stylized open arc that reads as both the letter "c" and a
 * wheel, with a horizontal motion line cutting through the opening. Set in a
 * rounded-square accent tile so it reads as a modern automotive badge instead
 * of a generic car pictogram.
 */
function BrandMark(): JSX.Element {
  return (
    <span
      aria-hidden
      className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accentFg shadow-sm ring-1 ring-black/5"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {/* Open arc — the "c" and the wheel */}
        <path d="M18 6.2A8 8 0 1 0 18 17.8" />
        {/* Motion / road line piercing the opening */}
        <path d="M10.5 12h10.5" />
      </svg>
    </span>
  );
}
