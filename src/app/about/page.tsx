import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Real Paris Tours",
  description: "Meet the team behind Real Paris Tours and our approach to guiding.",
};

export default function AboutPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">About Us</h1>
        <div className="mt-6 space-y-4 text-zinc-700">
          <p>
            We are a team of bilingual local guides who believe the best way to experience Paris is
            on foot. Our tours combine storytelling, neighborhood culture, and practical travel tips.
          </p>
          <p>
            Every route is crafted for small groups, meaningful interaction, and unforgettable moments
            beyond the standard tourist track.
          </p>
        </div>
      </div>
    </section>
  );
}
