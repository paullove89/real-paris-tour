import type { Metadata } from "next";
import { getBookingUrl } from "@/data/booking";

export const metadata: Metadata = {
  title: "Booking | Real Paris Tours",
  description: "Book your Real Paris Tours experience on our external booking site.",
};

export default function BookingPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Booking</h1>
        <p className="mt-3 text-zinc-600">
          Booking now happens on our external site so the checkout experience stays simple and fast.
        </p>
        <a
          href={getBookingUrl()}
          className="mt-8 inline-flex rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Continue to Booking
        </a>
      </div>
    </section>
  );
}

