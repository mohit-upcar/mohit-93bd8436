import { BRAND } from "@/lib/brand";

/**
 * First-look strip: three real product cards, one per fleet tier. Real
 * photograph on top, tier marker, tier name + one-line differentiator,
 * and starting price. Sits on the paper-grain body section below the
 * cinematic hero.
 */
export default function FleetPeek(): JSX.Element {
  return (
    <section className="paper-grain relative">
      <div aria-hidden className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 sm:py-28">
        <header className="flex flex-col gap-3 sm:max-w-2xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-accent2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2" aria-hidden />
            A first look at the fleet
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-text sm:text-5xl">
            Three tiers, chosen carefully.
          </h2>
          <p className="max-w-prose text-[16px] leading-[1.65] text-textMuted sm:text-[17px]">
            No 400-car catalogues to scroll. A small, deliberate lineup -
            the right vehicle for the way you&apos;ll actually spend the day.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {BRAND.fleetPreview.map((tier, index) => (
            <li
              key={tier.key}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-cardLift"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface2">
                <img
                  src={tier.photoUrl}
                  alt={tier.photoAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-midnight/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
                  Tier {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-2xl font-semibold tracking-tight text-text">
                    {tier.name}
                  </p>
                  <p className="shrink-0 text-right font-display text-xl font-semibold tracking-tight text-text">
                    ${tier.priceFrom}
                    <span className="ml-1 text-xs font-normal text-textMuted">
                      /day
                    </span>
                  </p>
                </div>
                <p className="text-[15px] leading-[1.6] text-textMuted">
                  {tier.subtitle}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-3 text-[12px] font-medium uppercase tracking-[0.18em] text-accent2">
                  <span className="h-px w-8 bg-accent2/60" aria-hidden />
                  Starting price &middot; launch pricing
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
