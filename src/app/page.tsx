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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label text-[11px] uppercase text-zinc-500">Current program</p>
              <h2 className="mt-2 text-5xl uppercase leading-none text-zinc-900">Two tours. Distinct moods.</h2>
            </div>
            <p className="max-w-xl text-lg text-zinc-700">
              Pick the version of Paris you want: wide-angle by bike or more intimate on foot.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
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
