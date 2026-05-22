import Link from "next/link";
import { getBookingUrl } from "@/data/booking";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: getBookingUrl(), label: "Book" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
          Real Paris Tours
        </Link>
        <ul className="flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-700 sm:gap-5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition hover:text-zinc-950">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
