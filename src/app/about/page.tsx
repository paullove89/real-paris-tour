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

        <h1 className="mt-2 text-6xl uppercase leading-none text-zinc-900">
          About us
        </h1>

        <div className="mt-6 space-y-4 rounded-[2rem] border-2 border-zinc-300 bg-white/70 p-6 text-lg leading-7 text-zinc-700">
          <p>
            Real Paris Tours was created by experienced guides who love this city
            and believe the best tours are shaped by the people who actually lead
            them.
          </p>

          <p>
            We are building a collaborative, guide-led company where good ideas
            are shared, decisions are made together, and the people creating the
            experience have a real stake in its success. That gives us the freedom
            to keep improving our tours rather than simply repeating a script.
          </p>

          <p>
            We live in Paris and move through it every day, on foot and by bike.
            We know the famous landmarks, but we also know the quiet streets,
            strange details, local habits, and overlooked stories that make Paris
            feel like a living city rather than a museum.
          </p>

          <p>
            Our tours combine history, humour, conversation, and practical local
            knowledge. We want you to see the Paris you came for—and leave feeling
            that you discovered something more.
          </p>
        </div>
      </div>
    </section>
  );
}
