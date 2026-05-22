import { guidePortraits } from "@/data/gallery";
import { SafeImage } from "@/components/SafeImage";

export function GuideSpotlight() {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Your Guide</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">Meet The Face of Real Paris Tours</h2>
          <p className="mt-4 text-zinc-700">
            Friendly, knowledgeable, and local. Your guide blends history with personal stories and practical city insight, so each walk feels authentic rather than scripted.
          </p>
          <p className="mt-3 text-zinc-700">
            We keep groups small and routes flexible to match the vibe of the day and the interests of your group.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SafeImage
            src={guidePortraits[0].src}
            alt={guidePortraits[0].alt}
            className="col-span-2 h-72 w-full rounded-xl object-cover sm:h-80"
            loading="lazy"
            fallbackSrc="/images/placeholder-guide.svg"
          />
          <SafeImage
            src={guidePortraits[1].src}
            alt={guidePortraits[1].alt}
            className="h-48 w-full rounded-xl object-cover sm:h-56"
            loading="lazy"
            fallbackSrc="/images/placeholder-guide.svg"
          />
          <SafeImage
            src={guidePortraits[2].src}
            alt={guidePortraits[2].alt}
            className="h-48 w-full rounded-xl object-cover sm:h-56"
            loading="lazy"
            fallbackSrc="/images/placeholder-guide.svg"
          />
        </div>
      </div>
    </section>
  );
}
