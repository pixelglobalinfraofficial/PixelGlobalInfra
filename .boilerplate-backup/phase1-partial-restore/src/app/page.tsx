import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";

/**
 * Phase 1 placeholder. Replaced in Phase 2 by the real homepage — hero,
 * project grid and filters.
 */
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="bg-nav text-nav-foreground">
        <div className="container-page flex items-center justify-between py-5">
          <span className="font-heading text-nav-foreground text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <span className="text-nav-foreground/60 hidden text-sm sm:block">
            Lucknow
          </span>
        </div>
      </header>

      <section className="container-page flex flex-1 flex-col justify-center py-20 sm:py-28">
        <p className="text-muted-foreground mb-5 text-xs tracking-[0.18em] uppercase">
          Property Consultants · Lucknow
        </p>

        <h1 className="text-heading max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {siteConfig.tagline}
        </h1>

        <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
          Our new portfolio site is being built. In the meantime, message us on
          WhatsApp and we&apos;ll send you what we&apos;re currently dealing
          with.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <WhatsAppButton
            href={buildWhatsAppUrl(generalWhatsAppMessage())}
            size="lg"
          >
            Chat on WhatsApp
          </WhatsAppButton>

          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="border-border text-foreground hover:bg-secondary inline-flex items-center rounded-lg border px-6 py-3.5 text-base font-medium transition-colors"
          >
            Call us
          </a>
        </div>
      </section>

      <footer className="bg-nav text-nav-foreground mt-auto">
        <div className="container-page space-y-4 py-12">
          <p className="font-heading text-nav-foreground text-base font-semibold">
            {siteConfig.name}
          </p>
          <p className="text-nav-foreground/70 max-w-md text-sm leading-relaxed">
            {siteConfig.contact.address}
          </p>
          <p className="text-nav-foreground/50 max-w-3xl border-t border-white/10 pt-6 text-xs leading-relaxed">
            {siteConfig.disclaimer}
          </p>
        </div>
      </footer>
    </main>
  );
}
