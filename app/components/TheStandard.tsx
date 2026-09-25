import { BRAND } from "@/lib/brand";

/**
 * Third editorial section below the fleet strip. Deep-forest accent
 * ground, cream type, a large serif pull-quote and a founder note on
 * the left, a concrete "what's included" list on the right. Real
 * point of view + real substance is the one thing a starter template
 * cannot fake, so this is where the page stops reading as one.
 */
export default function TheStandard(): JSX.Element {
  const { standard } = BRAND;

  return (
    <section className="dark-grain relative isolate text-[color:var(--accent-fg)]">
      <div aria-hidden className="hairline-cream absolute inset-x-0 top-0" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20 lg:py-32">
        {/* Left: manifesto pull-quote + founder note */}
        <div className="flex min-w-0 flex-col gap-8">
          <span className="eyebrow inline-flex items-center gap-2 text-[color:var(--accent-fg)]/70">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent2" />
            {standard.eyebrow}
          </span>

          <h2 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-[color:var(--accent-fg)] sm:text-5xl">
            {standard.heading}
          </h2>

          <figure className="relative border-l-2 border-accent2/70 pl-6">
            <span
              aria-hidden
              className="absolute -left-1.5 top-0 font-display text-[64px] leading-none text-accent2/80"
            >
              &ldquo;
            </span>
            <blockquote className="font-display text-2xl font-medium italic leading-[1.28] text-[color:var(--accent-fg)]/95 sm:text-[26px]">
              {standard.quote}
            </blockquote>
          </figure>

          <p className="max-w-[52ch] text-[16px] leading-[1.7] text-[color:var(--accent-fg)]/80 sm:text-[17px]">
            {standard.letter}
          </p>

          <p className="font-display text-sm italic text-[color:var(--accent-fg)]/70">
            {standard.signature}
          </p>
        </div>

        {/* Right: included list */}
        <div className="min-w-0">
          <div className="rounded-3xl border border-[color:var(--accent-fg)]/15 bg-[color:var(--accent-fg)]/[0.03] p-7 backdrop-blur-sm sm:p-9">
            <div className="mb-7 flex items-baseline justify-between gap-4">
              <p className="eyebrow text-[color:var(--accent-fg)]/70">
                Every rental includes
              </p>
              <p className="eyebrow text-accent2">Launch · Fall 2026</p>
            </div>

            <ul className="flex flex-col divide-y divide-[color:var(--accent-fg)]/10">
              {standard.included.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent2/50 bg-accent2/10 text-accent2"
                  >
                    <Check />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[17px] font-semibold tracking-tight text-[color:var(--accent-fg)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[14.5px] leading-[1.6] text-[color:var(--accent-fg)]/75">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check(): JSX.Element {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <path
        d="M4.5 10.5l3.2 3.2 7.8-7.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
