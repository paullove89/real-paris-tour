import Link from "next/link";
import { SafeImage } from "@/components/SafeImage";
import type { Tour } from "@/data/tours";

type TourCardProps = {
  tour: Tour;
};

export function TourCard({ tour }: TourCardProps) {
  return (
    <article className="relative flex h-full flex-col rounded-[2rem] border-2 border-zinc-300 bg-[rgba(255,250,239,0.92)] p-5 shadow-[0_12px_30px_rgba(84,73,34,0.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(84,73,34,0.18)]">
      {tour.comingSoon && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] bg-black/50 backdrop-blur-sm">
          <span className="font-label rounded-full bg-amber-600 px-4 py-2 text-sm uppercase text-white">Coming Soon</span>
        </div>
      )}
      {tour.coverImage ? (
        <SafeImage
          src={tour.coverImage}
          alt={tour.title}
          className="mb-4 h-44 w-full rounded-[1.5rem] border border-zinc-300 object-cover"
          loading="lazy"
          fallbackSrc="/images/placeholder-tour.svg"
        />
      ) : null}
      <p className="font-label inline-flex w-fit rotate-[-2deg] rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[10px] uppercase text-amber-900">
        {tour.neighborhood}
      </p>
      <h3 className="font-display mt-4 text-3xl uppercase leading-none text-zinc-900">{tour.title}</h3>
      <p className="mt-3 text-base leading-6 text-zinc-700">{tour.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-zinc-700">
        <p className="rounded-2xl border border-zinc-200 bg-white/65 p-3">
          <span className="font-label block text-[10px] uppercase text-zinc-500">Duration</span>
          <span className="mt-1 block font-semibold text-zinc-900">{tour.duration}</span>
        </p>
        <p className="rounded-2xl border border-zinc-200 bg-white/65 p-3">
          <span className="font-label block text-[10px] uppercase text-zinc-500">Price</span>
          <span className="mt-1 block font-semibold text-zinc-900">€{tour.priceEur}</span>
        </p>
      </div>
      <p className="font-label mt-4 text-[11px] uppercase text-zinc-600">{tour.groupSize}</p>
      <Link
        href={`/tours/${tour.slug}`}
        className="font-label mt-5 inline-flex w-fit rounded-full bg-zinc-900 px-4 py-2.5 text-sm uppercase text-white transition hover:bg-zinc-700"
      >
        View details
      </Link>
    </article>
  );
}
