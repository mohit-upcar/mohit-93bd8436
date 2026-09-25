import { BRAND } from "@/lib/brand";

/**
 * Editorial footer on the midnight ground. Bookends the page (midnight hero →
 * cream fleet → forest editorial → midnight footer) so the last thing a visitor
 * sees is the brand, not a template copyright strip. Wordmark + one-line
 * promise on the left, real columns on the right — no `#` placeholder links.
 */
export default function SiteFooter(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-midnight text-white/80">
      <div aria-hidden className="hairline-cream absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 pb-14 pt-20 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-16 md:pt-24">
        <div className="flex flex-col gap-5">
          <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {BRAND.name}.
          </p>
          <p className="max-w-[38ch] text-[15px] leading-[1.65] text-white/70">
            A small, deliberate car rental for {BRAND.launchLocation}. Handed to
            you where you already are — no counter, no upsell wall, no
            asterisks.
          </p>
          <p className="eyebrow inline-flex items-center gap-2 text-white/55">
            <span className="h-1.5 w-1.5 rounded-full bg-accent2" aria-hidden />
            {BRAND.launchTeaser}
          </p>
        </div>

        <FooterColumn label="Reach us">
          <FooterLink href={`mailto:${BRAND.contactEmail}`}>
            {BRAND.contactEmail}
          </FooterLink>
          <FooterMuted>Replies inside ten minutes, weekends included.</FooterMuted>
        </FooterColumn>

        <FooterColumn label="Elsewhere">
          <FooterLink href={BRAND.social.twitter} external>
            Twitter / X
          </FooterLink>
          <FooterLink href={BRAND.social.instagram} external>
            Instagram
          </FooterLink>
        </FooterColumn>
      </div>

      <div aria-hidden className="hairline-cream mx-auto max-w-6xl" />
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-start justify-between gap-3 px-6 py-6 text-[12px] text-white/50 sm:flex-row sm:items-center">
        <p>
          © {year} {BRAND.name}. All rights reserved.
        </p>
        <p className="font-display italic text-white/60">
          Built by Mohit, in {BRAND.launchLocation}.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow text-white/55">{label}</p>
      <div className="flex flex-col gap-2 text-[15px] leading-[1.55]">
        {children}
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}): JSX.Element {
  return (
    <a
      href={href}
      className="w-fit text-white/85 transition hover:text-white"
      {...(external ? { rel: "noreferrer", target: "_blank" } : {})}
    >
      {children}
    </a>
  );
}

function FooterMuted({ children }: { children: React.ReactNode }): JSX.Element {
  return <p className="text-white/55">{children}</p>;
}
