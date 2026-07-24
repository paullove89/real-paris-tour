import { walkGallery } from "@/data/gallery";
import { SafeImage } from "@/components/SafeImage";

export function PhotoGallery() {
  return (
    <section className="border-y-2 border-zinc-300 bg-[linear-gradient(180deg,_#f3ead3_0%,_#efe5c8_100%)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-[11px] uppercase text-zinc-500">Field notes</p>
        <h2 className="mt-2 text-5xl uppercase leading-none text-zinc-900">From the route</h2>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Real moments from our rides and walks through canal edges, park cut-throughs, and the city streets worth slowing down for.
        </p>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {walkGallery.map((photo) => (
            <figure
              key={photo.src}
              className="mb-4 overflow-hidden rounded-[1.75rem] border-2 border-zinc-300 bg-white/90 shadow-[0_12px_26px_rgba(84,73,34,0.12)]"
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
