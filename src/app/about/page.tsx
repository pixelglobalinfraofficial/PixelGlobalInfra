import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CeoSection } from "@/components/ceo-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { getCeoPhotos } from "@/lib/ceo";

export const metadata: Metadata = {
  title: "About",
  description: `The story, values and leadership behind ${siteConfig.name}.`,
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    number: "01",
    title: "Discretion",
    body: "Every enquiry, every viewing and every negotiation is handled in confidence.",
  },
  {
    number: "02",
    title: "Curation",
    body: "We list what we would put our own name behind — nothing added for volume's sake.",
  },
  {
    number: "03",
    title: "Diligence",
    body: "Title, RERA status and documentation are verified before a listing ever reaches a client.",
  },
  {
    number: "04",
    title: "Service",
    body: "One point of contact from first enquiry through to registration and beyond.",
  },
];

export default function AboutPage() {
  const ceoPhotos = getCeoPhotos();

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ================= PAGE HEADER ================= */}
        <section className="border-emerald-deep/10 bg-cream border-b px-6 pt-24 pb-16 lg:px-12 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-gold mb-6 text-[10px] font-bold tracking-[0.4em] uppercase">
              About Us
            </p>
            <h1 className="font-heading text-emerald-deep text-5xl leading-[1.05] md:text-6xl">
              A house built <span className="italic">on trust.</span>
            </h1>
            <p className="text-emerald-deep/75 mx-auto mt-6 max-w-xl">
              {siteConfig.name} was founded on a simple conviction: that
              buyers, investors and NRI families deserve to be introduced to
              the city&apos;s finest residences with honesty and care.
            </p>
          </div>
        </section>

        {/* ================= OUR STORY ================= */}
        <section>
          <div className="relative h-[360px] w-full md:h-[440px]">
            <Image
              src="/images/about-desk.jpg"
              alt="Architectural blueprints and a gold pen on a dark walnut desk"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-12">
            <p className="text-gold mb-4 text-[10px] font-bold tracking-[0.3em] uppercase">
              Our Story
            </p>
            <h2 className="font-heading text-emerald-deep text-3xl md:text-4xl">
              Rooted in Lucknow
            </h2>
            <p className="text-emerald-deep/75 mt-6 leading-relaxed">
              We work with a small number of developers and private sellers
              across Lucknow, representing residences we have personally
              inspected and verified. Our clients span local families,
              domestic investors and NRI buyers across three continents —
              each looked after by the same point of contact from first
              enquiry to registration.
            </p>
          </div>
        </section>

        {/* ================= MISSION & VISION ================= */}
        <section className="bg-cream border-emerald-deep/10 border-t px-6 py-20 lg:px-12">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            <div className="border-gold border-t-2 pt-8">
              <p className="text-gold mb-4 text-[10px] font-bold tracking-[0.3em] uppercase">
                Mission
              </p>
              <p className="font-heading text-emerald-deep text-2xl leading-snug md:text-3xl">
                To make the acquisition of a great Lucknow address feel as
                considered and effortless as the residence itself.
              </p>
            </div>
            <div className="border-gold border-t-2 pt-8">
              <p className="text-gold mb-4 text-[10px] font-bold tracking-[0.3em] uppercase">
                Vision
              </p>
              <p className="font-heading text-emerald-deep text-2xl leading-snug md:text-3xl">
                To become the most trusted name in premium Indian real
                estate, one relationship at a time.
              </p>
            </div>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="border-emerald-deep/10 border-t px-6 py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <p className="text-gold mb-16 text-center text-[10px] font-bold tracking-[0.3em] uppercase">
              What We Stand For
            </p>
            <div className="grid gap-10 md:grid-cols-4">
              {VALUES.map((value) => (
                <div key={value.number}>
                  <span className="font-heading text-gold/50 text-4xl">
                    {value.number}
                  </span>
                  <h3 className="font-heading text-emerald-deep mt-4 text-xl">
                    {value.title}
                  </h3>
                  <p className="text-emerald-deep/70 mt-3 text-sm leading-relaxed">
                    {value.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FOUNDER / CEO ================= */}
        <section className="border-emerald-deep/10 border-t">
          <CeoSection photos={ceoPhotos} />
        </section>

        {/* ================= CLOSING CTA ================= */}
        <section className="bg-emerald-deep text-cream px-6 py-24 text-center lg:px-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-cream text-4xl md:text-5xl">
              Find your next address.
            </h2>
            <p className="text-cream/75 mt-6">
              Speak with our concierge for a private consultation. Lucknow ·
              London · Dubai.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gold text-emerald-deep hover:bg-cream px-8 py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-colors"
              >
                Begin a conversation
              </Link>
              <Link
                href="/projects"
                className="border-cream/30 text-cream hover:border-gold hover:text-gold border px-8 py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-colors"
              >
                Browse the portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
