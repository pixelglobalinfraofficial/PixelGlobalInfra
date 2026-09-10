"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { parsePriceCr } from "@/lib/price";
import type { SampleProject } from "@/lib/sample-projects";

/**
 * Area tag for the "Area" filter — the part of `locality` before the first
 * comma, e.g. "Gomti Nagar, Lucknow" → "Gomti Nagar". Derived from the field
 * itself rather than a fixed per-project lookup, so it keeps working once
 * listings come from the database instead of the sample set.
 */
function areaTag(project: SampleProject): string {
  return project.locality.split(",")[0].trim();
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
] as const;

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "priceAsc", label: "Price: low to high" },
  { value: "priceDesc", label: "Price: high to low" },
] as const;

type Category = (typeof CATEGORIES)[number]["value"];
type Area = "all" | (string & {});
type Sort = (typeof SORTS)[number]["value"];

const SELECT_CLASS =
  "border-emerald-deep/20 border-b bg-transparent py-2 text-sm focus:border-gold focus:outline-none";

function matchesCategory(project: SampleProject, category: Category): boolean {
  if (category === "all") return true;
  if (category === "commercial") return project.property_type === "Commercial";
  return project.property_type !== "Commercial";
}

function matchesArea(project: SampleProject, area: Area): boolean {
  if (area === "all") return true;
  return areaTag(project) === area;
}

function bySort(sort: Sort) {
  return (a: SampleProject, b: SampleProject) => {
    if (sort === "featured") return a.sort_order - b.sort_order;

    const priceA = parsePriceCr(a.price_band);
    const priceB = parsePriceCr(b.price_band);
    if (priceA === null) return 1;
    if (priceB === null) return -1;
    return sort === "priceAsc" ? priceA - priceB : priceB - priceA;
  };
}

export function ProjectsExplorer({ projects }: { projects: SampleProject[] }) {
  const [category, setCategory] = useState<Category>("all");
  const [area, setArea] = useState<Area>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const areas = useMemo(() => {
    const unique = Array.from(new Set(projects.map(areaTag))).sort();
    return [
      { value: "all" as Area, label: "All Lucknow" },
      ...unique.map((value) => ({ value, label: value })),
    ];
  }, [projects]);

  const visible = useMemo(
    () =>
      projects
        .filter((p) => matchesCategory(p, category) && matchesArea(p, area))
        .sort(bySort(sort)),
    [projects, category, area, sort],
  );

  return (
    <>
      <section className="border-emerald-deep/10 bg-cream border-b px-6 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end gap-6">
          <label className="flex flex-col gap-1">
            <span className="text-emerald-deep/60 text-[10px] font-bold tracking-[0.25em] uppercase">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={SELECT_CLASS}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-emerald-deep/60 text-[10px] font-bold tracking-[0.25em] uppercase">
              Area
            </span>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value as Area)}
              className={SELECT_CLASS}
            >
              {areas.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-emerald-deep/60 text-[10px] font-bold tracking-[0.25em] uppercase">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className={SELECT_CLASS}
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <div className="text-emerald-deep/60 ml-auto text-[10px] tracking-[0.25em] uppercase">
            {visible.length} {visible.length === 1 ? "property" : "properties"}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {visible.length > 0 ? (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  priority={i === 0}
                />
              ))}
            </div>
          ) : (
            <p className="text-emerald-deep/60 py-20 text-center text-sm">
              No properties match those filters right now — try widening your
              search.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
