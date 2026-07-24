import Link from "next/link";
import { getPrimaryBookingUrl } from "@/data/booking";

export function Hero() {
  return (
    <section className="overflow-hidden border-b-2 border-zinc-300 bg-[linear-gradient(145deg,_#f7efdb_0%,_#efe4c4_54%,_#d7c4e0_100%)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <p className="font-label inline-flex rotate-[-2deg] rounded-full border border-zinc-300 bg-white/70 px-3 py-1 text-[11px] uppercase text-zinc-700">
            alt bike energy, local paris knowledge
          </p>
          <h1 className="font-display mt-6 max-w-4xl text-6xl uppercase leading-[0.92] text-zinc-900 sm:text-7xl lg:text-8xl">
            Ride the classics.
            <span className="block text-[#6a4e7c]">Walk the real paris.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-7 text-zinc-700 sm:text-xl">
            Two small-group tours, no filler. One by bike for the city&apos;s big hits, one on foot for
            the north-east neighborhoods where Paris loosens up.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tours"
              className="font-label inline-flex rounded-full bg-zinc-900 px-5 py-3 text-sm uppercase text-white shadow-[0_10px_24px_rgba(48,81,53,0.24)] transition hover:bg-zinc-700"
            >
              See the lineup
            </Link>
            <Link
              href={getPrimaryBookingUrl()}
              className="font-label inline-flex rounded-full border-2 border-amber-300 bg-white/75 px-5 py-3 text-sm uppercase text-amber-900 transition hover:bg-amber-50"
            >
              Book a spot
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border-2 border-zinc-300 bg-white/65 p-4">
              <p className="font-label text-[10px] uppercase text-zinc-500">Format</p>
              <p className="font-display mt-2 text-2xl uppercase text-zinc-900">2 tours only</p>
            </div>
            <div className="rounded-[1.5rem] border-2 border-zinc-300 bg-white/65 p-4">
              <p className="font-label text-[10px] uppercase text-zinc-500">Groups</p>
              <p className="font-display mt-2 text-2xl uppercase text-zinc-900">Small + social</p>
            </div>
            <div className="rounded-[1.5rem] border-2 border-zinc-300 bg-white/65 p-4">
              <p className="font-label text-[10px] uppercase text-zinc-500">Style</p>
              <p className="font-display mt-2 text-2xl uppercase text-zinc-900">Paris, not packaged</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] border-2 border-zinc-300 bg-[#23472c] p-6 text-white shadow-[0_18px_40px_rgba(36,71,44,0.28)]">
            <p className="font-label text-[11px] uppercase text-white/70">Current drops</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.5rem] border border-white/20 bg-[#f4edda] p-4 text-zinc-900">
                <p className="font-label text-[10px] uppercase text-zinc-500">Bike</p>
                <h2 className="font-display mt-2 text-3xl uppercase leading-none">Highlights Tour of Paris</h2>
                <p className="mt-3 text-base text-zinc-700">Fast landmarks, easy pace, strong route.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/20 bg-[#d9c5e3] p-4 text-zinc-900">
                <p className="font-label text-[10px] uppercase text-zinc-600">Walk</p>
                <h2 className="font-display mt-2 text-3xl uppercase leading-none">The Real Paris Tour</h2>
                <p className="mt-3 text-base text-zinc-700">Canal edges, local cafés, and north-east character.</p>
              </div>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/20 bg-black/10 px-4 py-3">
              <p className="font-label text-[10px] uppercase text-white/70">Real Paris note</p>
              <p className="mt-2 text-sm leading-6 text-white/90">
                Built for travelers who like good routes, local conversation, and a slightly less polished version of the city.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
