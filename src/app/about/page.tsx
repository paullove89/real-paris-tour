import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Real Paris Tours",
  description: "Learn how Real Paris Tours is building a more collaborative, guide-led model for tours in Paris.",
};

export default function AboutPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-[11px] uppercase text-zinc-500">About</p>
        <h1 className="mt-2 text-6xl uppercase leading-none text-zinc-900">About us</h1>
        <div className="mt-6 space-y-4 rounded-[2rem] border-2 border-zinc-300 bg-white/70 p-6 text-lg leading-7 text-zinc-700">
          <p>
            We are experienced guides who have worked for other tour companies in Paris and reached
            the same conclusion: too many businesses in this industry rely on opaque finances,
            top-down decisions, and exploitative models that leave guides carrying the experience
            without sharing fairly in how the business runs.
          </p>
          <p>
            Real Paris Tours is our answer to that. We work toward open accounting, a collaborative
            business model, and tours shaped by the people who actually guide them. We want the work
            to be sustainable, transparent, and worth doing well.
          </p>
          <p>
            We&apos;ve lived in Paris for a long time, and we know the city because we move through it
            constantly, on foot and by bike. That daily familiarity shows up in the routes, the pace,
            the recommendations, and the kind of stories you only get from people who actually live
            here.
          </p>
        </div>
      </div>
    </section>
  );
}
