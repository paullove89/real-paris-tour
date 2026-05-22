import Link from "next/link";
import { getBookingUrl } from "@/data/booking";

export function Hero() {
  return (
    <section className="bg-[linear-gradient(135deg,_#eaf2ff_0%,_#ffffff_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="mb-4 inline-flex rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold tracking-wide text-amber-900">
          Authentic Paris Experiences
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Discover Paris on Foot, One Story at a Time
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-600 sm:text-lg">
          Join expertly guided neighborhood walks through the city&apos;s iconic streets,
          hidden passages, and best local food spots.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/tours"
            className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,85,164,0.35)] transition hover:bg-zinc-700"
          >
            Explore Tours
          </Link>
          <Link
            href={getBookingUrl()}
            className="rounded-lg border border-amber-300 bg-white px-5 py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-50"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
