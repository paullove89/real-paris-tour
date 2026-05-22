import { walkGallery } from "@/data/gallery";
import { SafeImage } from "@/components/SafeImage";

export function PhotoGallery() {
  return (
    <section className="bg-[linear-gradient(180deg,_#edf4ff_0%,_#ffffff_100%)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">From Our Walks</h2>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Real moments from our routes through Canal de l&apos;Ourcq, parks, and iconic Paris neighborhoods.
        </p>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {walkGallery.map((photo) => (
            <figure
              key={photo.src}
              className="mb-4 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_10px_24px_rgba(0,85,164,0.16)]"
            >
              <SafeImage
                src={photo.src}
                alt={photo.alt}
                className="h-auto w-full object-cover"
                loading="lazy"
                fallbackSrc="/images/placeholder-tour.svg"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
