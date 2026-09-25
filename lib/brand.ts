/**
 * Brand constants for the coming-soon site. Owner: edit these one strings and
 * the whole site — hero, meta tags, footer — updates.
 */
export const BRAND = {
  name: "carho",
  tagline: "Drive something worth remembering",
  description:
    "carho is a small, deliberate car rental for Portland. A hand-picked fleet, honest all-in pricing, and a booking flow that fits in a coffee break. Leave your email and we'll write you the moment the first keys change hands.",
  launchLocation: "Portland",
  launchWindow: "Fall 2026",
  launchTeaser: "Portland · Fall 2026",
  contactEmail: "hello@carho.co",
  social: {
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
  },
  /**
   * The featured car in the hero. `photoUrl` is loaded as a plain <img> so
   * we don't need next.config remotePatterns. Pre-verified 200 in the sandbox.
   */
  featuredCar: {
    model: "Volvo XC40 Recharge",
    tier: "Signature",
    pricePerDay: 89,
    range: "260 mi range, full charge included",
    photoUrl:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1600&q=80&auto=format&fit=crop",
    photoAlt: "A Volvo XC40 Recharge in a three-quarter front view",
  },
  /**
   * Full-bleed backdrop behind the hero. Loaded as an eager <img> tucked
   * behind a heavy gradient so the copy stays readable.
   */
  heroBackdrop: {
    photoUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&q=80&auto=format&fit=crop",
    photoAlt: "",
  },
  /**
   * Editorial third section under the fleet strip: a manifesto pull-quote,
   * a short founder note, and a concrete list of what's included in every
   * rental. Real point of view + real substance is the one thing a starter
   * template cannot ship.
   */
  standard: {
    eyebrow: "The plain part",
    heading: "Every rental, without asterisks.",
    quote:
      "The rental counter is the last place you want to be at 8am on a Saturday. So we removed it.",
    letter:
      "I built carho because renting a car in this city had turned into a maze of add-ons, security deposits, and a walk to a distant lot. carho is the shape I wanted instead: a fleet small enough to know by name, one price that includes the things every driver actually uses, and a car handed to you where you already are. If we get this right, you'll spend a minute booking it and the rest of the weekend actually going somewhere.",
    signature: "— Mohit, founder",
    included: [
      {
        title: "One all-in price",
        body: "Insurance, roadside, and unlimited miles are in the number you see. No surprises at drop-off.",
      },
      {
        title: "Delivered to you",
        body: "Free delivery across Portland and PDX. Keys handed over at your door in under a minute.",
      },
      {
        title: "Second driver free",
        body: "Add your partner or a friend at booking. No extra fee, no counter visit, no verification hold.",
      },
      {
        title: "Full tank, clean car",
        body: "Every rental starts full and detailed. Return it the same way, or pay a flat refill — never a markup.",
      },
      {
        title: "24-hour cancellation",
        body: "Cancel or reschedule up to a day out and we refund the whole thing. Weather happens.",
      },
      {
        title: "Real people on text",
        body: "One number reaches a human on the carho team, weekends included. Replies inside ten minutes.",
      },
    ],
  },

  /**
   * Three fleet tiers below the hero. Real names, real starting prices,
   * a real photo per tier. Prices are illustrative, but sized like the
   * shape the launch fleet will land at.
   */
  fleetPreview: [
    {
      key: "weekender",
      name: "Weekender",
      subtitle: "Efficient compacts for a Portland weekend",
      priceFrom: 49,
      photoUrl:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=80&auto=format&fit=crop",
      photoAlt: "A compact hatchback on a city street",
    },
    {
      key: "signature",
      name: "Signature",
      subtitle: "Roomy SUVs and EVs for the coast road",
      priceFrom: 89,
      photoUrl:
        "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=900&q=80&auto=format&fit=crop",
      photoAlt: "A modern SUV on an open highway",
    },
    {
      key: "marquee",
      name: "Marquee",
      subtitle: "Something quietly extraordinary for the weekend",
      priceFrom: 159,
      photoUrl:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80&auto=format&fit=crop",
      photoAlt: "A premium sports coupe in profile",
    },
  ],
} as const;
