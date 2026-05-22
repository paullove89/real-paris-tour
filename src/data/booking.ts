const BOOKING_BASE_URL = "https://book.realparis.tours";

export function getBookingUrl(tourSlug?: string) {
  if (!tourSlug) {
    return BOOKING_BASE_URL;
  }

  const url = new URL(BOOKING_BASE_URL);
  url.searchParams.set("tour", tourSlug);

  return url.toString();
}