import { getSampleProject, sampleProjects, type SampleProject } from "@/lib/sample-projects";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectImage } from "@/lib/supabase/types";

const PROJECT_SELECT = "*, project_images(*)";

type ProjectRow = Project & { project_images: ProjectImage[] };

function toSampleShape(row: ProjectRow): SampleProject {
  const { project_images, ...project } = row;
  return { ...project, images: project_images };
}

/**
 * Live listings from Supabase, ordered the way the site presents them.
 * Falls back to the sample set whenever Supabase isn't configured yet, or a
 * query fails, so the site never shows a broken page for a database hiccup.
 */
export async function getProjects(): Promise<SampleProject[]> {
  if (!isSupabaseConfigured) return sampleProjects;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("getProjects: falling back to sample data", error);
    return sampleProjects;
  }

  return (data as ProjectRow[]).map(toSampleShape);
}

/** The first `limit` listings, for the homepage's featured section. */
export async function getFeaturedProjects(limit = 3): Promise<SampleProject[]> {
  const projects = await getProjects();
  return projects.slice(0, limit);
}

export async function getProjectBySlug(
  slug: string,
): Promise<SampleProject | undefined> {
  if (!isSupabaseConfigured) return getSampleProject(slug);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("getProjectBySlug: falling back to sample data", error);
    return getSampleProject(slug);
  }

  return toSampleShape(data as ProjectRow);
}
