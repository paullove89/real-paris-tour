import type { Metadata } from "next";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Tours | Real Paris Tours",
  description: "Browse all guided walking tours in Paris and find your perfect itinerary.",
};

export default function ToursPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">All Tours</h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Choose from history walks, food journeys, and neighborhood deep dives curated for curious
          travelers.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
