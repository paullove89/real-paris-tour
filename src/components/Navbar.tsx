import Link from "next/link";
import { getPrimaryBookingUrl } from "@/data/booking";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: getPrimaryBookingUrl(), label: "Book" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-zinc-300 bg-[#f6eedb]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl uppercase leading-none text-zinc-900">
          Real Paris
          <span className="font-label ml-2 inline-block rotate-[-2deg] rounded-full border border-amber-300 bg-amber-100 px-2 py-1 text-[10px] font-medium text-amber-900 align-middle">
            rides + walks
          </span>
        </Link>
        <ul className="font-label flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase text-zinc-700 sm:gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-full border border-transparent px-3 py-1.5 transition hover:border-zinc-300 hover:bg-white/70 hover:text-zinc-950"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
