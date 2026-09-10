import Link from "next/link";

import { MobileNav } from "@/components/mobile-nav";

export const NAV_LINKS = [
  { href: "/projects", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-heading text-emerald-deep text-2xl font-bold tracking-tight ${className}`}
    >
      Pixel<span className="text-gold">Globalinfra</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="border-emerald-deep/5 bg-cream/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden gap-10 text-[11px] font-semibold tracking-[0.2em] uppercase md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-emerald-deep/80 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="border-emerald-deep text-emerald-deep hover:bg-emerald-deep hover:text-cream hidden border px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all md:inline-block"
        >
          Inquire Now
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
