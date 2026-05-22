import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import type { Tour } from "@/data/tours";

type TourCardProps = {
  tour: Tour;
};

export function TourCard({ tour }: TourCardProps) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {tour.comingSoon && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm">
          <span className="rounded-lg bg-amber-600 px-4 py-2 text-lg font-semibold text-white">Coming Soon</span>
        </div>
      )}
      {tour.coverImage ? (
        <SafeImage
          src={tour.coverImage}
          alt={tour.title}
          className="mb-4 h-44 w-full rounded-lg object-cover"
          loading="lazy"
          fallbackSrc="/images/placeholder-tour.svg"
        />
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{tour.neighborhood}</p>
      <h3 className="mt-2 text-xl font-semibold text-zinc-900">{tour.title}</h3>
      <p className="mt-3 text-sm text-zinc-600">{tour.description}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-700">
        <p>
          <span className="font-semibold">Duration:</span> {tour.duration}
        </p>
        <p>
          <span className="font-semibold">Price:</span> €{tour.priceEur}
        </p>
      </div>
      <p className="mt-1 text-sm text-zinc-700">{tour.groupSize}</p>
      <Link
        href={`/tours/${tour.slug}`}
        className="mt-5 inline-flex w-fit rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
      >
        View Details
      </Link>
    </article>
  );
}
