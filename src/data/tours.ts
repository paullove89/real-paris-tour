import generatedTours from "@/data/tours.generated.json";

export type Tour = {
  slug: string;
  title: string;
  duration: string;
  priceEur: number;
  groupSize: string;
  neighborhood: string;
  description: string;
  descriptionHtml?: string;
  summary?: string;
  highlights: string[];
  coverImage?: string;
  galleryImages?: string[];
  comingSoon?: boolean;
};

export const tours: Tour[] = generatedTours as Tour[];

export function getBokunTourCount(): number {
  return tours.length;
}

export function formatTourCountLabel(count: number): string {
  const normalized = Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
  return normalized === 1 ? "1 tour only" : `${normalized} tours only`;
}

export function formatTourPriceEur(priceEur: number): string {
  if (!Number.isFinite(priceEur) || priceEur <= 0) {
    return "Contact for price";
  }

  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(priceEur);
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}
