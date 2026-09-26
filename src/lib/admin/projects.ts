import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectImage } from "@/lib/supabase/types";

const PROJECT_SELECT = "*, project_images(*)";

type ProjectRow = Project & { project_images: ProjectImage[] };

export type AdminProject = Project & { images: ProjectImage[] };

function toAdminShape(row: ProjectRow): AdminProject {
  const { project_images, ...project } = row;
  return { ...project, images: project_images };
}

/**
 * Every project regardless of status, for the admin dashboard. Unlike
 * src/lib/projects.ts, this never falls back to sample data — the admin
 * panel is only reachable once Supabase is configured and the user is
 * signed in, so a query failure should surface as an error, not a silent
 * substitution.
 */
export async function getAllProjectsForAdmin(): Promise<AdminProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("getAllProjectsForAdmin", error);
    return [];
  }

  return (data as ProjectRow[]).map(toAdminShape);
}

export async function getProjectByIdForAdmin(id: string): Promise<AdminProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  return toAdminShape(data as ProjectRow);
}
