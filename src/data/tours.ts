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
    slug: "latin-quarter-hidden-passages",
    title: "Latin Quarter Hidden Passages",
    duration: "2.5 hours",
    priceEur: 39,
    groupSize: "Max 12 guests",
    neighborhood: "Latin Quarter",
    description:
      "Wander cobblestone lanes, medieval courtyards, and little-known galleries with a local storyteller.",
    highlights: [
      "Roman ruins and secret alleyways",
      "Historic cafés and literary landmarks",
      "Photo stops at hidden architectural gems",
    ],
    coverImage: "/images/tours/notre-dame.jpg",
  },
  {
    slug: "montmartre-tour",
    title: "Montmartre Tour",
    duration: "2 hours",
    priceEur: 35,
    groupSize: "Max 10 guests",
    neighborhood: "Montmartre",
    description:
      "Stroll through Montmartre's artist corners, village streets, and hilltop viewpoints with a local guide.",
    highlights: [
      "Panoramic views from Sacré-Cœur",
      "Stories of painters and performers",
      "Fresh bakery tasting included",
    ],
    coverImage: "/images/tours/city-skyline-dusk.jpg",
  },
  {
    slug: "real-paris-ourcq-lavillette-buttes-chaumont",
    title: "The Real Paris: Canal de l'Ourcq, La Villette & Buttes-Chaumont",
    duration: "3.5 hours",
    priceEur: 49,
    groupSize: "Max 12 guests",
    neighborhood: "Canal de l'Ourcq & Northeast Paris",
    description:
      "Explore the city's creative northeast through canal-side promenades, parks, and local hangouts far from tourist crowds.",
    highlights: [
      "Canal de l'Ourcq stories and street art stops",
      "Parc de la Villette and modern cultural landmarks",
      "Buttes-Chaumont viewpoints and neighborhood tips",
    ],
    coverImage: "/images/tours/ourcq-bridge.jpg",
    galleryImages: [
      "/images/tours/ourcq-track.jpg",
      "/images/tours/ourcq-flowers.jpg",
      "/images/tours/ourcq-walk.jpg",
      "/images/tours/ourcq-sunset.jpg",
    ],
  },
  {
    slug: "paris-highlights-tour",
    title: "Paris Highlights Tour",
    duration: "3 hours",
    priceEur: 49,
    groupSize: "Max 15 guests",
    neighborhood: "City Center & Icons",
    description:
      "Hit the essential Paris sights from Notre-Dame to the Eiffel Tower, with insider stories about the city's most iconic landmarks.",
    highlights: [
      "Notre-Dame Cathedral and Île de la Cité",
      "Arc de Triomphe and Champs-Élysées",
      "Eiffel Tower exterior and Trocadéro viewpoint",
    ],
    coverImage: "/images/tours/notre-dame.jpg",
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}
