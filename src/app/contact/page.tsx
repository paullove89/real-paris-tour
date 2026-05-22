import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Real Paris Tours",
  description: "Contact Real Paris Tours for private tours, custom requests, and support.",
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Contact</h1>
        <p className="mt-3 text-zinc-600">Questions or private tour requests? Send us a message.</p>
        <p className="mt-2 text-zinc-700">
          Prefer email? Reach us at{" "}
          <a className="font-semibold text-zinc-900 underline decoration-amber-300 underline-offset-4" href="mailto:info@realparis.tours">
            info@realparis.tours
          </a>
          .
        </p>
        <form className="mt-8 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6">
          <label className="grid gap-1 text-sm text-zinc-700">
            Name
            <input
              type="text"
              className="rounded-lg border border-zinc-300 px-3 py-2 outline-none ring-amber-300 focus:ring"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-1 text-sm text-zinc-700">
            Email
            <input
              type="email"
              className="rounded-lg border border-zinc-300 px-3 py-2 outline-none ring-amber-300 focus:ring"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-1 text-sm text-zinc-700">
            Message
            <textarea
              rows={5}
              className="rounded-lg border border-zinc-300 px-3 py-2 outline-none ring-amber-300 focus:ring"
              placeholder="How can we help?"
            />
          </label>
          <button
            type="button"
            className="w-fit rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
