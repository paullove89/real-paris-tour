const tourBokunEnvMap: Record<string, string> = {
  "bike-highlights-paris": "NEXT_PUBLIC_BOKUN_BIKE_HIGHLIGHTS_URL",
  "the-real-paris-tour": "NEXT_PUBLIC_BOKUN_REAL_PARIS_URL",
};

function readEnv(name: string | undefined) {
  return name ? process.env[name] : undefined;
}

export function getPrimaryBookingUrl(tourSlug?: string) {
  if (tourSlug) {
    const scopedEnvName = tourBokunEnvMap[tourSlug];
    const scopedUrl = readEnv(scopedEnvName);

    if (scopedUrl) {
      return scopedUrl;
    }
  }

  return process.env.NEXT_PUBLIC_BOKUN_BOOKING_URL || "/contact";
}