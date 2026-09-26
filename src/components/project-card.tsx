import Image from "next/image";
import Link from "next/link";

import { PROJECT_STATUSES } from "@/config/site";
import type { SampleProject } from "@/lib/sample-projects";

/** Builds the "4 BHK · 4,200 sqft" line, skipping whichever part is missing. */
function detailLine(project: SampleProject): string {
  return [project.configurations, project.area_range].filter(Boolean).join(" · ");
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: SampleProject;
  priority?: boolean;
}) {
  const cover = project.images.find((i) => i.is_cover) ?? project.images[0];
  const details = detailLine(project);

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="bg-muted relative mb-6 overflow-hidden">
        {cover ? (
          <Image
            src={cover.image_url}
            alt={cover.alt_text}
            width={800}
            height={1000}
            priority={priority}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        ) : null}

        {project.card_badge && (
          <span className="bg-emerald-deep text-cream absolute top-4 left-4 px-3 py-1 text-[9px] font-bold tracking-[0.25em] uppercase italic">
            {project.card_badge}
          </span>
        )}
        {PROJECT_STATUSES[project.status].showBadge && (
          <span className="bg-black/70 text-cream absolute top-4 right-4 px-3 py-1 text-[9px] font-bold tracking-[0.25em] uppercase">
            {PROJECT_STATUSES[project.status].label}
          </span>
        )}
      </div>

      <h3 className="font-heading text-emerald-deep group-hover:text-gold text-xl transition-colors">
        {project.name}
      </h3>
      <p className="text-emerald-deep/60 mt-2 text-[10px] font-semibold tracking-[0.25em] uppercase">
        {project.locality}
      </p>

      <div className="mt-4 flex items-end justify-between">
        <p className="font-heading text-gold text-lg">{project.price_band}</p>
        {details && (
          <p className="text-emerald-deep/50 text-[10px] tracking-[0.2em] uppercase">
            {details}
          </p>
        )}
      </div>
    </Link>
  );
}
