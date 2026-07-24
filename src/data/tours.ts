export type Tour = {
  slug: string;
  title: string;
  duration: string;
  priceEur: number;
  groupSize: string;
  neighborhood: string;
  description: string;
  highlights: string[];
  coverImage?: string;
  galleryImages?: string[];
  comingSoon?: boolean;
};

export const tours: Tour[] = [
  {
    slug: "bike-highlights-paris",
    title: "Bike Highlights Tour of Paris",
    duration: "3 hours",
    priceEur: 59,
    groupSize: "Max 10 guests",
    neighborhood: "Paris Center",
    description:
      "Cover the city's signature landmarks by bike with a local guide, moving at an easy pace through the most iconic streets and viewpoints.",
    highlights: [
      "Seine riverbanks, historic bridges, and classic boulevards",
      "The Louvre, Tuileries, and the Eiffel Tower exterior",
      "A relaxed ride with plenty of photo opportunities",
    ],
    coverImage: "/images/tours/notre-dame.jpg",
  },
  {
    slug: "the-real-paris-tour",
    title: "The Real Paris Tour",
    duration: "3.5 hours",
    priceEur: 49,
    groupSize: "Max 12 guests",
    neighborhood: "North East Paris",
    description:
      "Explore the creative north-east of Paris on foot through canal-side streets, local cafés, and green spaces far from the usual tourist circuit.",
    highlights: [
      "Canal de l'Ourcq and neighborhood stories",
      "Parc de la Villette, street art, and local hangouts",
      "Buttes-Chaumont viewpoints and off-the-beaten-path stops",
    ],
    coverImage: "/images/tours/ourcq-bridge.jpg",
    galleryImages: [
      "/images/tours/ourcq-track.jpg",
      "/images/tours/ourcq-flowers.jpg",
      "/images/tours/ourcq-walk.jpg",
      "/images/tours/ourcq-sunset.jpg",
    ],
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}
