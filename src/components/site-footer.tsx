import Link from "next/link";

import { Wordmark } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";

const EXPLORE_LINKS = [
  { href: "/projects", label: "All Properties" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Concierge" },
];

export function SiteFooter() {
  return (
    <footer className="border-emerald-deep/10 bg-cream border-t">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4 lg:px-12">
        <div className="md:col-span-2">
          <Wordmark />
          <p className="text-emerald-deep/70 mt-6 max-w-sm text-sm leading-relaxed">
            Lucknow&apos;s premier luxury real estate consultancy. Discreet,
            professional and tailored to your lifestyle.
          </p>
          <p className="text-emerald-deep/50 mt-6 text-xs tracking-[0.2em] uppercase">
            {siteConfig.contact.address}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
            Explore
          </h3>
          <ul className="text-emerald-deep/80 space-y-2 text-sm">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
            Connect
          </h3>
          <ul className="text-emerald-deep/80 space-y-2 text-sm">
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="hover:text-gold"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-gold"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl(generalWhatsAppMessage())}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Required on every page — we broker these projects, we do not build
          them. Not present on the reference prototype; see
          docs/reference-site-audit.md item 4. */}
      <div className="border-emerald-deep/10 border-t">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
          <p className="text-emerald-deep/45 text-[11px] leading-relaxed">
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>

      <div className="border-emerald-deep/10 border-t">
        <div className="text-emerald-deep/50 mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-[10px] tracking-[0.25em] uppercase md:flex-row lg:px-12">
          <span>
            © {new Date().getFullYear()} {siteConfig.name} Pvt Ltd
          </span>
          <span className="italic">
            Defined by trust, distinguished by design
          </span>
        </div>
      </div>
    </footer>
  );
}

/** Floating WhatsApp bubble, present on every page. */
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl(generalWhatsAppMessage())}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      className="bg-emerald-deep text-cream shadow-emerald-deep/30 ring-gold/40 hover:bg-gold focus-visible:ring-gold fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl ring-1 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.633.633 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.564-1.232.157-.27.243-.557.243-.86 0-.428-1.448-.95-1.62-1.018zM16.137 25.13c-2.18 0-4.273-.66-6.04-1.892l-4.215 1.347 1.376-4.058a10.467 10.467 0 0 1-2.06-6.245c0-5.81 4.726-10.536 10.536-10.536S26.27 8.472 26.27 14.282c0 5.81-4.725 10.535-10.535 10.535zm0-23.135c-6.96 0-12.6 5.642-12.6 12.6 0 2.378.66 4.708 1.92 6.737L3 28.93l6.79-1.31a12.498 12.498 0 0 0 6.347 1.72c6.95 0 12.604-5.65 12.604-12.605C28.74 7.78 23.087 2 16.137 2z" />
      </svg>
    </a>
  );
}
