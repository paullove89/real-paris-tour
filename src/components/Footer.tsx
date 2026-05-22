export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-zinc-600 sm:px-6 lg:px-8">
        <p className="font-medium text-zinc-800">Real Paris Tours</p>
        <p>Small-group experiences led by passionate local guides.</p>
        <p>
          <a className="font-medium text-zinc-800 underline decoration-amber-300 underline-offset-4" href="mailto:info@realparis.tours">
            info@realparis.tours
          </a>
        </p>
        <p>© {new Date().getFullYear()} Real Paris Tours. All rights reserved.</p>
      </div>
    </footer>
  );
}
