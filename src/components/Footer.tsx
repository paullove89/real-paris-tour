export function Footer() {
  return (
    <footer className="border-t-2 border-zinc-300 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-zinc-600 sm:px-6 lg:px-8">
        <p className="font-display text-2xl uppercase text-zinc-800">Real Paris Tours</p>
        <p className="max-w-xl text-base">Small-group bike rides and walking tours with a local point of view.</p>
        <p>
          <a className="font-medium text-zinc-800 underline decoration-amber-300 underline-offset-4" href="mailto:info@realparis.tours">
            info@realparis.tours
          </a>
        </p>
        <p className="font-label text-[11px] uppercase">© {new Date().getFullYear()} Real Paris Tours</p>
      </div>
    </footer>
  );
}
