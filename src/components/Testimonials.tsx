const testimonials = [
  {
    quote:
      "Our guide made the Latin Quarter come alive. It felt like walking through a novel.",
    name: "Amelia, London",
  },
  {
    quote: "Perfect pacing, great food stops, and fantastic recommendations for the rest of our trip.",
    name: "Marco, Milan",
  },
  {
    quote: "Small group, local insights, and unforgettable moments we would have missed alone.",
    name: "Jasmine, Toronto",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[linear-gradient(180deg,_#ffffff_0%,_#fff4f2_100%)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">What Guests Say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-zinc-200 bg-white/95 p-5 shadow-[0_8px_20px_rgba(239,65,53,0.18)]"
            >
              <p className="text-sm leading-relaxed text-zinc-700">“{item.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-zinc-900">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
