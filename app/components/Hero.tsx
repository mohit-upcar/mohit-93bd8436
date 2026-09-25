import CaptureForm from "@/app/components/CaptureForm";
import Countdown from "@/app/components/Countdown";
import FeaturedCarCard from "@/app/components/FeaturedCarCard";
import { BRAND } from "@/lib/brand";

/**
 * Cinematic full-bleed hero: a large photograph behind everything, a dark
 * gradient overlay so the headline stays legible, and an editorial featured
 * car card floating over the right on desktop. Stacks on small screens.
 */
export default function Hero({
  initialError,
}: {
  initialError?: string;
}): JSX.Element {
  return (
    <section className="relative isolate overflow-hidden bg-midnight text-white">
      {/* Full-bleed hero photograph. Plain <img loading> so we don't need a
          next/image remotePatterns config for the CDN. */}
      <img
        src={BRAND.heroBackdrop.photoUrl}
        alt={BRAND.heroBackdrop.photoAlt}
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden className="hero-overlay pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pb-24 pt-20 sm:pt-28 md:pb-32 md:pt-32 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16 lg:pb-40 lg:pt-40">
        {/* Left column - the message and the ask */}
        <div className="flex min-w-0 flex-col items-start gap-9">
          <span className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/85 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2" aria-hidden />
            {BRAND.launchTeaser}
          </span>

          <h1 className="animate-fade-in-up-delay font-display font-semibold text-white text-display max-w-[15ch]">
            {BRAND.tagline}.
          </h1>

          <p className="animate-fade-in-up-delay max-w-[46ch] text-[17px] leading-[1.65] text-white/80 sm:text-lg">
            A small, curated fleet. Honest pricing. Airport delivery. Reserve
            a car in under a minute - no counter queue, no upsell wall. Leave
            your email and we&apos;ll write the moment the first cars are open
            to book.
          </p>

          <Countdown />

          <div className="animate-fade-in-up-delay-2 w-full">
            <CaptureForm initialError={initialError} onDark />
          </div>

          <ul className="animate-fade-in-up-delay-3 grid w-full grid-cols-1 gap-x-10 gap-y-3 pt-2 text-sm text-white/75 sm:grid-cols-3">
            <Bullet>Curated fleet, no catalogue</Bullet>
            <Bullet>All-in pricing, no surprises</Bullet>
            <Bullet>Delivered ready, keys in hand</Bullet>
          </ul>
        </div>

        {/* Right column - editorial featured-car card, floating over the hero
            photograph. Stacks below the copy on small screens. */}
        <div className="animate-fade-in-up-delay-2 flex min-w-0 justify-center lg:justify-end">
          <FeaturedCarCard />
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <li className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent2"
      />
      <span>{children}</span>
    </li>
  );
}
