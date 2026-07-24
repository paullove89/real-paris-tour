const testimonials = [
  {
    quote: "The bike route hit the landmarks without ever feeling like a checklist. It felt loose, local, and very Paris.",
    name: "Amelia, London",
  },
  {
    quote: "The Real Paris Tour gave us the neighborhoods we would never have found alone, plus a list of places we actually used later.",
    name: "Marco, Milan",
  },
  {
    quote: "Small group, good energy, no tourist-script voice. More like seeing the city with someone plugged into it.",
    name: "Jasmine, Toronto",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[linear-gradient(180deg,_#f3ead4_0%,_#d7c4e0_100%)] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-[11px] uppercase text-zinc-500">Proof of life</p>
        <h2 className="mt-2 text-5xl uppercase leading-none text-zinc-900">What guests say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[1.75rem] border-2 border-zinc-300 bg-[rgba(255,250,239,0.92)] p-5 shadow-[0_10px_24px_rgba(84,73,34,0.12)]"
            >
              <p className="text-base leading-7 text-zinc-700">“{item.quote}”</p>
              <p className="font-label mt-4 text-[11px] uppercase text-zinc-900">{item.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
