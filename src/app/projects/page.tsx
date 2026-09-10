import type { Metadata } from "next";

import { ProjectsExplorer } from "@/components/projects-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Properties",
  description: `Every residence listed by ${siteConfig.name} has been personally inspected, legally verified and curated for our private client list.`,
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* ================= PAGE HEADER ================= */}
        <section className="border-emerald-deep/10 bg-cream border-b px-6 pt-24 pb-12 lg:px-12 lg:pt-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-gold mb-4 text-[10px] font-bold tracking-[0.3em] uppercase">
              The Portfolio
            </p>
            <h1 className="font-heading text-emerald-deep text-5xl md:text-6xl">
              All properties
            </h1>
            <p className="text-emerald-deep/70 mt-6 max-w-2xl">
              Every residence below has been personally inspected, legally
              verified and curated for our private client list.
            </p>
          </div>
        </section>

        {/* ================= FILTERS + GRID ================= */}
        <ProjectsExplorer projects={projects} />
      </main>

      <SiteFooter />
    </>
  );
}
