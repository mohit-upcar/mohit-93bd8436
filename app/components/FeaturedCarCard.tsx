import { BRAND } from "@/lib/brand";

/**
 * An editorial featured-car card. Real photograph on top, a tier chip
 * floating over it, model + range + price below, and an inert "booking
 * opens" strip. Sits on the right of the hero photo on desktop, stacks
 * below the copy on small screens.
 */
export default function FeaturedCarCard(): JSX.Element {
  const car = BRAND.featuredCar;
  return (
    <article className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/95 shadow-cardLift ring-1 ring-black/5 backdrop-blur">
      {/* Photograph - external CDN, plain <img>. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-midnightMuted">
        <img
          src={car.photoUrl}
          alt={car.photoAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-midnight/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
          <span className="h-1 w-1 rounded-full bg-accent2" aria-hidden />
          Featured at launch
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-text">
          {car.tier}
        </span>
      </div>

      {/* Model + price row */}
      <div className="flex items-baseline justify-between gap-4 px-6 pt-5">
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-semibold tracking-tight text-text">
            {car.model}
          </p>
          <p className="mt-1 text-[13px] leading-[1.55] text-textMuted">
            {car.range}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-2xl font-semibold tracking-tight text-text">
            ${car.pricePerDay}
            <span className="ml-1 text-xs font-normal text-textMuted">
              /day
            </span>
          </p>
        </div>
      </div>

      {/* Inert booking row - deliberately not a live CTA on coming-soon. */}
      <div className="m-6 mt-5 flex items-center justify-between rounded-2xl border border-dashed border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-textMuted">
            Booking opens
          </p>
          <p className="mt-0.5 text-sm font-semibold text-text">
            {BRAND.launchTeaser}
          </p>
        </div>
        <span
          aria-hidden
          className="inline-flex items-center gap-1.5 rounded-full bg-accent2/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
          Early
        </span>
      </div>
    </article>
  );
}
