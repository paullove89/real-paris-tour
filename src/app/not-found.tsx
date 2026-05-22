import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Page Not Found</h1>
        <p className="mt-3 text-zinc-600">The page you’re looking for does not exist.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
