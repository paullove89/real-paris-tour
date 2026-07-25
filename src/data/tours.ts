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

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}
