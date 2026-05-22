import { BookingCTA } from "@/components/BookingCTA";
import { GuideSpotlight } from "@/components/GuideSpotlight";
import { Hero } from "@/components/Hero";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Testimonials } from "@/components/Testimonials";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/data/tours";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Featured Tours</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>
      <PhotoGallery />
      <GuideSpotlight />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
