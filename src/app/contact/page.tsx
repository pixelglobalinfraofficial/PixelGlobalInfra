import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Speak with the ${siteConfig.name} concierge. Call, WhatsApp, email or visit our Lucknow office.`,
  alternates: { canonical: "/contact" },
};

const { phone, email, address } = siteConfig.contact;

/** tel: links must carry no spaces, or iOS dials the wrong number. */
const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Google's embed endpoint needs no API key when given a plain address query. */
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

/** The four channels, in the order the design puts them. */
const CHANNELS = [
  { label: "Visit", value: address, href: null },
  { label: "Call", value: phone, href: telHref },
  { label: "Email", value: email, href: `mailto:${email}` },
  {
    label: "WhatsApp",
    value: "Quickest response, 9am – 9pm IST",
    href: buildWhatsAppUrl(generalWhatsAppMessage()),
    external: true,
  },
] as const;

function Channel({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-emerald-deep/15 border-t pt-6">
      <p className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
        {label}
      </p>
      <p className="text-emerald-deep/85 mt-2">{value}</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ================= PAGE HEADER ================= */}
        <section className="border-emerald-deep/10 bg-cream border-b px-6 pt-24 pb-12 lg:px-12 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-gold mb-6 text-[10px] font-bold tracking-[0.4em] uppercase">
              Contact
            </p>
            <h1 className="font-heading text-emerald-deep text-5xl md:text-6xl">
              Personal <span className="italic">concierge</span>
            </h1>
            <p className="text-emerald-deep/75 mx-auto mt-6 max-w-xl">
              Discreet, professional and tailored to your lifestyle. Reach us
              through any channel below — we typically respond within a few
              hours.
            </p>
          </div>
        </section>

        {/* ================= CHANNELS + FORM ================= */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-12">
          <div className="space-y-8">
            {CHANNELS.map((channel) =>
              channel.href ? (
                <a
                  key={channel.label}
                  href={channel.href}
                  {...("external" in channel
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="[&_p]:transition-colors hover:[&_p]:text-gold block"
                >
                  <Channel label={channel.label} value={channel.value} />
                </a>
              ) : (
                <Channel
                  key={channel.label}
                  label={channel.label}
                  value={channel.value}
                />
              ),
            )}

            <div className="border-emerald-deep/10 mt-12 overflow-hidden border">
              <iframe
                src={mapSrc}
                width="100%"
                height={320}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Lucknow office on Google Maps"
                className="block"
              />
            </div>
          </div>

          <div className="border-emerald-deep/10 bg-card shadow-emerald-deep/5 mt-16 border p-10 shadow-xl lg:mt-0">
            <p className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
              Send a message
            </p>
            <h2 className="font-heading text-emerald-deep mt-2 text-3xl">
              We&apos;re listening
            </h2>

            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}