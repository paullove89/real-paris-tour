export type BookingProvider = "bokun" | "viator" | "tripadvisor";

export type BookingLink = {
  provider: BookingProvider;
  label: string;
  description: string;
  url: string;
  priority: number;
};

const DEFAULT_BOKUN_BOOKING_URL = "https://book.realparis.tours";

const providerLabels: Record<BookingProvider, string> = {
  bokun: "Book direct",
  viator: "Book on Viator",
  tripadvisor: "Book on Tripadvisor",
};

const providerDescriptions: Record<BookingProvider, string> = {
  bokun: "Direct checkout with Real Paris Tours via Bokun.",
  viator: "Reserve through Viator if you prefer booking through their marketplace.",
  tripadvisor: "Reserve through Tripadvisor for added review and marketplace context.",
};

const providerPriority: Record<BookingProvider, number> = {
  bokun: 0,
  viator: 1,
  tripadvisor: 2,
};

const tourProviderEnvMap: Record<string, Partial<Record<BookingProvider, string>>> = {
  "bike-highlights-paris": {
    bokun: "NEXT_PUBLIC_BOKUN_BIKE_HIGHLIGHTS_URL",
    viator: "NEXT_PUBLIC_VIATOR_BIKE_HIGHLIGHTS_URL",
    tripadvisor: "NEXT_PUBLIC_TRIPADVISOR_BIKE_HIGHLIGHTS_URL",
  },
  "the-real-paris-tour": {
    bokun: "NEXT_PUBLIC_BOKUN_REAL_PARIS_URL",
    viator: "NEXT_PUBLIC_VIATOR_REAL_PARIS_URL",
    tripadvisor: "NEXT_PUBLIC_TRIPADVISOR_REAL_PARIS_URL",
  },
};

function readEnv(name: string | undefined) {
  return name ? process.env[name] : undefined;
}

function getProviderUrl(provider: BookingProvider, tourSlug?: string) {
  if (tourSlug) {
    const scopedEnvName = tourProviderEnvMap[tourSlug]?.[provider];
    const scopedUrl = readEnv(scopedEnvName);

    if (scopedUrl) {
      return scopedUrl;
    }
  }

  if (provider === "bokun") {
    return process.env.NEXT_PUBLIC_BOKUN_BOOKING_URL || DEFAULT_BOKUN_BOOKING_URL;
  }

  if (provider === "viator") {
    return process.env.NEXT_PUBLIC_VIATOR_BOOKING_URL;
  }

  return process.env.NEXT_PUBLIC_TRIPADVISOR_BOOKING_URL;
}

export function getBookingLinks(tourSlug?: string): BookingLink[] {
  return (["bokun", "viator", "tripadvisor"] as BookingProvider[])
    .map((provider) => {
      const url = getProviderUrl(provider, tourSlug);

      if (!url) {
        return null;
      }

      return {
        provider,
        label: providerLabels[provider],
        description: providerDescriptions[provider],
        url,
        priority: providerPriority[provider],
      } satisfies BookingLink;
    })
    .filter((link): link is BookingLink => Boolean(link))
    .sort((left, right) => left.priority - right.priority);
}

export function getPrimaryBookingUrl(tourSlug?: string) {
  const [primaryLink] = getBookingLinks(tourSlug);

  if (primaryLink) {
    return primaryLink.url;
  }

  return process.env.NEXT_PUBLIC_BOKUN_BOOKING_URL || DEFAULT_BOKUN_BOOKING_URL;
}