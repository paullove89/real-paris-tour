import Link from "next/link";

export function BookingCTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] border-2 border-zinc-300 bg-[linear-gradient(120deg,_#27482d_0%,_#446640_52%,_#b79cc8_100%)] px-6 py-10 text-center shadow-[0_18px_38px_rgba(36,71,44,0.22)] sm:px-10">
        <p className="font-label text-[11px] uppercase text-white/70">Plan your route</p>
        <h2 className="mt-2 text-4xl uppercase leading-none text-white sm:text-5xl">
          Choose your version of paris
        </h2>
        <p className="mt-3 text-lg text-white/90">
          Explore both tours, then message us for current availability, timing, and recommendations.
        </p>
        <Link
          href="/contact"
          className="font-label mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm uppercase text-zinc-900 transition hover:bg-zinc-100"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
