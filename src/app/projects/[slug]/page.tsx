import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectGallery } from "@/components/project-gallery";
import { ProjectInquiryForm } from "@/components/project-inquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppMessageOverride } from "@/components/whatsapp-context";
import { PROJECT_STATUSES } from "@/config/site";
import { formatPriceBand } from "@/lib/price";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { buildWhatsAppUrl, projectWhatsAppMessage } from "@/lib/whatsapp";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.name,
      description: project.tagline,
      type: "website",
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const cover = project.images.find((i) => i.is_cover) ?? project.images[0];
  const galleryImages = cover
    ? [cover, ...project.images.filter((i) => i.id !== cover.id)]
    : project.images;
  const sourcePage = `/projects/${project.slug}`;
  const whatsappMessage = projectWhatsAppMessage(project.name, project.locality);

  const stats = [
    { label: "Price", value: formatPriceBand(project.price_band), accent: true },
    { label: "Type", value: project.display_type },
    { label: "Configuration", value: project.configurations },
    { label: "Area", value: project.area_range },
  ].filter((stat) => stat.value.trim().length > 0);

  const allProjects = await getProjects();
  const related = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <>
      <WhatsAppMessageOverride message={whatsappMessage} />
      <SiteHeader />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="relative">
          <ProjectGallery images={galleryImages} />
          <div className="from-emerald-deep/80 via-emerald-deep/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="text-cream pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-12 lg:px-12 lg:pb-16">
            <div className="mx-auto max-w-7xl">
              <p className="text-gold mb-3 text-[10px] font-bold tracking-[0.3em] uppercase">
                {project.locality}
              </p>
              <h1 className="font-heading text-cream text-4xl md:text-6xl">
                {project.name}
                {PROJECT_STATUSES[project.status].showBadge && (
                  <span className="bg-black/50 text-cream ml-4 align-middle text-xs font-bold tracking-[0.25em] uppercase px-3 py-1">
                    {PROJECT_STATUSES[project.status].label}
                  </span>
                )}
              </h1>
              <p className="text-cream/80 mt-3 max-w-2xl">{project.tagline}</p>
            </div>
          </div>
        </section>

        {/* ================= OVERVIEW + FORM ================= */}
        <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[2fr_1fr] lg:px-12">
          <div>
            <dl className="border-emerald-deep/10 grid grid-cols-2 gap-6 border-y py-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-emerald-deep/50 text-[10px] font-bold tracking-[0.25em] uppercase">
                    {stat.label}
                  </dt>
                  <dd
                    className={`font-heading mt-2 ${
                      stat.accent
                        ? "text-gold text-2xl"
                        : "text-emerald-deep text-lg"
                    }`}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12">
              <h2 className="font-heading text-emerald-deep text-3xl">
                Overview
              </h2>
              {/* Description is authored HTML from our own data, not user
                  input — sanitise before rendering once /admin accepts it. */}
              <div
                className="text-emerald-deep/80 mt-6 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>

            {project.amenities.length > 0 && (
              <div className="mt-16">
                <h2 className="font-heading text-emerald-deep text-3xl">
                  Amenities
                </h2>
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="text-emerald-deep/80 flex items-start gap-3 text-sm"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-gold mt-1 inline-block h-1.5 w-1.5 shrink-0"
                      />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-16">
              <h2 className="font-heading text-emerald-deep text-3xl">
                Location
              </h2>
              <p className="text-emerald-deep/70 mt-4 text-sm">
                {project.locality}
              </p>

              <div className="border-emerald-deep/10 mt-6 overflow-hidden border">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(project.locality)}&output=embed`}
                  width="100%"
                  height={380}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${project.locality}`}
                  className="block"
                />
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.locality)}`}
                target="_blank"
                rel="noreferrer"
                className="text-gold mt-4 inline-block text-[11px] font-bold tracking-[0.25em] uppercase hover:underline"
              >
                Open in Google Maps →
              </a>

              {project.landmarks.length > 0 && (
                <>
                  <h3 className="font-heading text-emerald-deep mt-12 text-2xl">
                    Nearby
                  </h3>
                  <ul className="divide-emerald-deep/10 border-emerald-deep/10 mt-4 divide-y border-y">
                    {project.landmarks.map((landmark) => (
                      <li
                        key={landmark.name}
                        className="flex justify-between py-3 text-sm"
                      >
                        <span className="text-emerald-deep/80">
                          {landmark.name}
                        </span>
                        <span className="text-emerald-deep/50">
                          {landmark.distance}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-emerald-deep/10 bg-card shadow-emerald-deep/5 border p-8 shadow-xl">
              <p className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
                Private Inquiry
              </p>
              <h2 className="font-heading text-emerald-deep mt-2 text-2xl">
                Schedule a viewing
              </h2>
              <p className="text-emerald-deep/70 mt-3 text-sm">
                Our concierge will respond within 24 hours.
              </p>

              <div className="mt-6">
                <ProjectInquiryForm
                  projectName={project.name}
                  sourcePage={sourcePage}
                  whatsappMessage={whatsappMessage}
                />
              </div>
            </div>

            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-deep/70 hover:text-gold mt-6 block text-center text-[11px] font-bold tracking-[0.25em] uppercase"
            >
              Or WhatsApp the concierge
            </a>
          </aside>
        </section>

        {/* ================= RELATED ================= */}
        {related.length > 0 && (
          <section className="border-emerald-deep/10 bg-cream border-t px-6 py-24 lg:px-12">
            <div className="mx-auto max-w-7xl">
              <h2 className="font-heading text-emerald-deep mb-12 text-3xl">
                More from the portfolio
              </h2>
              <div className="grid gap-12 md:grid-cols-2">
                {related.map((p) => {
                  const relatedCover =
                    p.images.find((i) => i.is_cover) ?? p.images[0];
                  return (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="group block"
                    >
                      {relatedCover ? (
                        <Image
                          src={relatedCover.image_url}
                          alt={relatedCover.alt_text}
                          width={800}
                          height={500}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : null}
                      <h3 className="font-heading text-emerald-deep group-hover:text-gold mt-6 text-2xl transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-emerald-deep/60 mt-1 text-[10px] tracking-[0.25em] uppercase">
                        {p.locality}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
