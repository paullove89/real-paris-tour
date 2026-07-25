import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BokunWidgetButton } from "@/components/BokunWidgetButton";
import { SafeImage } from "@/components/SafeImage";
import { getPrimaryBookingUrl } from "@/data/booking";
import { getTourBySlug, tours } from "@/data/tours";

type TourDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found | Real Paris Tours",
    };
  }

  return {
    title: `${tour.title} | Real Paris Tours`,
    description: tour.description,
  };
}

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const showBikeBokunWidget = slug === "bike-highlights-paris" || /bike/i.test(tour.title);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-[11px] uppercase text-amber-700">{tour.neighborhood}</p>
        <h1 className="mt-2 text-6xl uppercase leading-none text-zinc-900">{tour.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-7 text-zinc-700">{tour.description}</p>

        {tour.coverImage ? (
          <SafeImage
            src={tour.coverImage}
            alt={tour.title}
            className="mt-6 h-72 w-full rounded-[2rem] border-2 border-zinc-300 object-cover sm:h-96"
            fallbackSrc="/images/placeholder-tour.svg"
          />
        ) : null}

        <div className="mt-6 grid gap-3 rounded-[2rem] border-2 border-zinc-300 bg-zinc-50 p-4 sm:grid-cols-3">
          <p className="rounded-2xl border border-zinc-200 bg-white/70 p-3 text-sm text-zinc-700">
            <span className="font-label block text-[10px] uppercase text-zinc-500">Duration</span>
            <span className="mt-1 block font-semibold">{tour.duration}</span>
          </p>
          <p className="rounded-2xl border border-zinc-200 bg-white/70 p-3 text-sm text-zinc-700">
            <span className="font-label block text-[10px] uppercase text-zinc-500">Price</span>
            <span className="mt-1 block font-semibold">€{tour.priceEur}</span>
          </p>
          <p className="rounded-2xl border border-zinc-200 bg-white/70 p-3 text-sm text-zinc-700">
            <span className="font-label block text-[10px] uppercase text-zinc-500">Group</span>
            <span className="mt-1 block font-semibold">{tour.groupSize}</span>
          </p>
        </div>

        <h2 className="mt-8 text-4xl uppercase leading-none text-zinc-900">Highlights</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700">
          {tour.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        {tour.galleryImages?.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tour.galleryImages.map((image) => (
              <SafeImage
                key={image}
                src={image}
                alt={tour.title}
                className="h-56 w-full rounded-[1.75rem] border-2 border-zinc-300 object-cover"
                fallbackSrc="/images/placeholder-tour.svg"
              />
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {showBikeBokunWidget ? (
            <BokunWidgetButton
              buttonId="bokun_8ad497bb_0fc7_411e_93c7_925c523d4b8c"
              loaderSrc="https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=342c86a7-f520-4217-b278-8b7f02a00354"
              dataSrc="https://widgets.bokun.io/online-sales/342c86a7-f520-4217-b278-8b7f02a00354/experience/1259056?partialView=1"
              label="Book now"
            />
          ) : (
            <Link
              href={getPrimaryBookingUrl(tour.slug)}
              className="font-label inline-flex rounded-full bg-zinc-900 px-5 py-3 text-sm uppercase text-white transition hover:bg-zinc-700"
            >
              Book this tour
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
