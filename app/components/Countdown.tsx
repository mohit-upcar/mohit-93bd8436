"use client";

import { useEffect, useState } from "react";

// Portland launch: Oct 1, 2026 · midnight Pacific (still DST → UTC-7).
const TARGET_MS = Date.UTC(2026, 9, 1, 7, 0, 0);

function diff(nowMs: number): { d: number; h: number; m: number; s: number; done: boolean } {
  const delta = Math.max(0, TARGET_MS - nowMs);
  const s = Math.floor(delta / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: delta === 0,
  };
}

export default function Countdown(): JSX.Element {
  // Render zeros on the server so SSR + first client paint match; the real
  // numbers appear on the next tick. Avoids a hydration warning without a
  // dynamic import boundary.
  const [t, setT] = useState(() => diff(TARGET_MS));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff(Date.now()));
    const id = setInterval(() => setT(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const cells: Array<[number, string]> = [
    [t.d, "Days"],
    [t.h, "Hours"],
    [t.m, "Minutes"],
    [t.s, "Seconds"],
  ];

  return (
    <div
      aria-label="Time until launch"
      className="animate-fade-in-up-delay-2 flex w-full max-w-md items-stretch gap-2 sm:gap-3"
    >
      {cells.map(([value, label], i) => (
        <div
          key={label}
          className="flex flex-1 flex-col items-center rounded-lg border border-white/15 bg-white/[0.04] px-2 py-3 backdrop-blur"
        >
          <span
            suppressHydrationWarning
            className="font-display text-3xl font-semibold tabular-nums text-white sm:text-4xl"
          >
            {mounted ? String(value).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent2 sm:text-[11px]">
            {label}
          </span>
          {i < cells.length - 1 && null}
        </div>
      ))}
    </div>
  );
}
