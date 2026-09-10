import Image from "next/image";
import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedProjects } from "@/lib/projects";

/**
 * PLACEHOLDER FIGURES — carried over from the reference prototype so the
 * layout matches. They are not verified claims. Replace with real numbers or
 * remove before launch. See docs/reference-site-audit.md item 3.
 */
const HERO_STATS = [
  { value: "15+", label: "Years" },
  { value: "500+", label: "Premium Units" },
  { value: "₹12B", label: "Transacted" },
];

const LEGACY_STATS = [
  { value: "15+", label: "Years experience" },
  { value: "500+", label: "Premium units" },
  { value: "120+", label: "NRI clients" },
  { value: "3", label: "Continents served" },
];

/**
 * PLACEHOLDER TESTIMONIALS — carried over from the reference prototype so the
 * layout matches. These are not real, named clients. They must be replaced
 * with genuine, permissioned quotes or removed before launch.
 * See docs/reference-site-audit.md item 2.
 */
const TESTIMONIALS = [
  {
    quote:
      "Placeholder quote. Replace with a real client testimonial before this site goes live.",
    name: "Client name",
    detail: "Buyer, locality",
  },
  {
    quote:
      "Placeholder quote. Replace with a real client testimonial before this site goes live.",
    name: "Client name",
    detail: "Investor",
  },
  {
    quote:
      "Placeholder quote. Replace with a real client testimonial before this site goes live.",
    name: "Client name",
    detail: "Buyer, locality",
  },
];

const SERVICES = [
  {
    title: "RERA Compliant",
    body: "Every listing is verified under UP RERA before introduction.",
  },
  {
    title: "Off-Market Access",
    body: "Quiet listings sourced through years of developer relationships.",
  },
  {
    title: "NRI Desk",
    body: "End-to-end concierge for Dubai, London and Singapore clients.",
  },
  {
    title: "Title & Diligence",
    body: "In-house legal team handles title search, encumbrance and registration.",
  },
];

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="relative flex h-[88vh] min-h-[640px] items-center justify-center overflow-hidden">
          <Image
            src="/images/hero-mansion.jpg"
            alt="Aerial view of a luxury Lucknow mansion at sunset"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="bg-emerald-deep/55 absolute inset-0" />
          <div className="from-emerald-deep/30 to-emerald-deep/40 absolute inset-0 bg-gradient-to-b via-transparent" />

          <div className="text-cream relative z-10 mx-auto max-w-4xl px-6 text-center">
            <p className="text-gold mb-6 text-[10px] font-bold tracking-[0.4em] uppercase">
              Lucknow · Est. Pixel Globalinfra
            </p>

            <h1 className="font-heading text-cream text-5xl leading-[1.05] text-balance md:text-7xl">
              Curating the Finest <br />
              <span className="italic">Addresses in Lucknow</span>
            </h1>

            <p className="text-cream/80 mx-auto mt-8 max-w-xl text-base leading-relaxed">
              A discreet portfolio of penthouses, heritage villas and Grade-A
              commercial residences — handpicked across the city&apos;s most
              distinguished quarters.
            </p>

            {/* A plain GET form, so search works without JavaScript. */}
            <form
              action="/projects"
              method="get"
              className="border-cream/20 bg-cream/10 mx-auto mt-12 flex w-full max-w-2xl flex-wrap items-stretch gap-2 border p-2 backdrop-blur-xl md:flex-nowrap"
            >
              <label htmlFor="hero-search" className="sr-only">
                Area, budget or property type
              </label>
              <input
                id="hero-search"
                name="q"
                type="text"
                placeholder="Area, budget, or property type…"
                className="bg-cream text-emerald-deep placeholder:text-emerald-deep/40 min-w-0 flex-grow px-6 py-4 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-deep text-cream hover:bg-gold px-8 py-4 text-[11px] font-bold tracking-[0.25em] uppercase transition-colors"
              >
                Search Portfolio
              </button>
            </form>

            <dl className="text-cream mx-auto mt-16 grid max-w-md grid-cols-3 gap-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-heading text-gold text-2xl md:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="text-cream/60 mt-1 text-[10px] tracking-[0.25em] uppercase">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= PREMIER RESIDENCES ================= */}
        <section className="mx-auto max-w-[1850px] px-6 py-24 lg:px-12 lg:py-32">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-gold mb-4 text-[10px] font-bold tracking-[0.3em] uppercase">
                Exclusive Collection
              </p>
              <h2 className="font-heading text-emerald-deep text-4xl md:text-5xl">
                Premier Residences
              </h2>
            </div>
            <Link
              href="/projects"
              className="border-gold text-emerald-deep hover:text-gold border-b-2 pb-1 text-[11px] font-bold tracking-[0.25em] uppercase"
            >
              View All Properties
            </Link>
          </div>

          <div className="grid gap-x-10 gap-y-16 md:grid-cols-3 lg:gap-x-16">
            {featuredProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                priority={i === 0}
              />
            ))}
          </div>
        </section>

        {/* ================= LEGACY OF EXCELLENCE ================= */}
        <section className="bg-emerald-deep text-cream flex flex-col md:flex-row">
          <div className="p-12 md:w-1/2 md:p-24">
            <p className="text-gold mb-8 text-[10px] font-bold tracking-[0.3em] uppercase">
              Legacy of Excellence
            </p>
            <h2 className="font-heading text-cream text-4xl leading-tight md:text-5xl">
              Global standards meets local <span className="italic">expertise.</span>
            </h2>
            <p className="text-cream/75 mt-8 max-w-md leading-relaxed">
              {/* Positioning copy mirrors the reference prototype. See audit
                  item 15 — this reads ultra-luxury only and needs widening. */}
              Pixel Globalinfra is Lucknow&apos;s premier consultancy,
              specialising in ultra-high-net-worth real estate. We bridge the
              gap between discerning NRI investors and the city&apos;s most
              prestigious developments.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8">
              {LEGACY_STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-gold text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-cream/50 mt-1 text-[10px] tracking-[0.25em] uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="border-cream/30 text-cream hover:border-gold hover:text-gold mt-12 inline-block border px-6 py-3 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors"
            >
              Our story
            </Link>
          </div>

          <div className="relative min-h-[400px] md:w-1/2">
            <Image
              src="/images/about-desk.jpg"
              alt="Architectural blueprints and a gold pen on a dark walnut desk"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="bg-cream px-6 py-24 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-gold mb-4 text-center text-[10px] font-bold tracking-[0.3em] uppercase">
              The Clientele
            </p>
            <h2 className="font-heading text-emerald-deep mb-16 text-center text-4xl md:text-5xl">
              What our clients say
            </h2>

            <div className="grid gap-10 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <figure
                  key={i}
                  className="border-emerald-deep/15 border-t pt-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-gold text-5xl"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="text-emerald-deep/85 mt-2 text-base leading-relaxed italic">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8">
                    <div className="text-emerald-deep text-sm font-semibold">
                      {t.name}
                    </div>
                    <div className="text-emerald-deep/50 text-[10px] tracking-[0.25em] uppercase">
                      {t.detail}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERVICE BADGES ================= */}
        <section className="border-emerald-deep/10 bg-cream border-t px-6 py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title}>
                <h3 className="font-heading text-emerald-deep text-xl">
                  {s.title}
                </h3>
                <p className="text-emerald-deep/70 mt-3 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
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
