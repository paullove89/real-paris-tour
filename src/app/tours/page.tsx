import type { Metadata } from "next";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Tours | Real Paris Tours",
  description: "Browse our current Paris experiences, from a bike highlights tour to a walking tour of the city's north-east.",
};

export default function ToursPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-[11px] uppercase text-zinc-500">Tours</p>
        <h1 className="mt-2 text-6xl uppercase leading-none text-zinc-900">Current tours</h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          We currently offer a small-group bike highlights tour of Paris and a walking tour of the
          city&apos;s north-east, both designed for curious travelers.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
