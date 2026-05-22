import Link from "next/link";
import { getBookingUrl } from "@/data/booking";

export function BookingCTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-amber-300 bg-[linear-gradient(120deg,_#ef4135_0%,_#0055a4_100%)] px-6 py-10 text-center shadow-[0_14px_30px_rgba(0,85,164,0.24)] sm:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Ready to Explore Paris with Us?
        </h2>
        <p className="mt-3 text-white/90">
          Reserve your spot now and receive an instant confirmation with meeting point details.
        </p>
        <Link
          href={getBookingUrl()}
          className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0055a4] transition hover:bg-zinc-100"
        >
          Start Booking
        </Link>
      </div>
    </section>
  );
}
