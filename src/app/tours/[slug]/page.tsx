import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SafeImage } from "@/components/SafeImage";
import { getBookingUrl } from "@/data/booking";
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

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">{tour.neighborhood}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">{tour.title}</h1>
        <p className="mt-4 text-zinc-700">{tour.description}</p>

        {tour.coverImage ? (
          <SafeImage
            src={tour.coverImage}
            alt={tour.title}
            className="mt-6 h-72 w-full rounded-xl object-cover sm:h-96"
            fallbackSrc="/images/placeholder-tour.svg"
          />
        ) : null}

        <div className="mt-6 grid gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-3">
          <p className="text-sm text-zinc-700">
            <span className="font-semibold">Duration:</span> {tour.duration}
          </p>
          <p className="text-sm text-zinc-700">
            <span className="font-semibold">Price:</span> €{tour.priceEur}
          </p>
          <p className="text-sm text-zinc-700">{tour.groupSize}</p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold text-zinc-900">Highlights</h2>
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
                className="h-56 w-full rounded-xl object-cover"
                fallbackSrc="/images/placeholder-tour.svg"
              />
            ))}
          </div>
        ) : null}

        <Link
          href={getBookingUrl(tour.slug)}
          className="mt-8 inline-flex rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Book This Tour
        </Link>
      </div>
    </section>
  );
}
