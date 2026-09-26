"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { PROJECT_STATUSES, PROPERTY_TYPES, type ProjectStatus, type PropertyType } from "@/config/site";
import { paragraphsToHtml, parseLandmarks, parseLines, type ProjectFormState } from "@/lib/admin/fields";
import { createClient } from "@/lib/supabase/server";
import { extractStoragePath, PROJECT_IMAGES_BUCKET } from "@/lib/supabase/storage";

function field(data: FormData, name: string, max = 2000): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

/** Creates a project when the form has no "id" field, otherwise updates it. */
export async function saveProject(
  _prev: ProjectFormState,
  data: FormData,
): Promise<ProjectFormState> {
  const id = field(data, "id");
  const name = field(data, "name", 255);
  const locality = field(data, "locality", 255);

  if (!name || !locality) {
    return { status: "error", message: "Name and locality are required." };
  }

  const rawPropertyType = field(data, "property_type");
  const property_type = (PROPERTY_TYPES as readonly string[]).includes(rawPropertyType)
    ? (rawPropertyType as PropertyType)
    : PROPERTY_TYPES[0];

  const rawStatus = field(data, "status");
  const status = (Object.keys(PROJECT_STATUSES) as string[]).includes(rawStatus)
    ? (rawStatus as ProjectStatus)
    : "active";

  const slug = slugify(field(data, "slug", 200) || name);
  if (!slug) {
    return {
      status: "error",
      message: "Could not derive a URL slug from that name — please set one manually.",
    };
  }

  const row = {
    slug,
    name,
    tagline: field(data, "tagline", 500),
    display_type: field(data, "display_type", 100),
    description: paragraphsToHtml(field(data, "description", 20000)),
    locality,
    property_type,
    configurations: field(data, "configurations", 255),
    area_range: field(data, "area_range", 255),
    possession_status: field(data, "possession_status", 255),
    possession_date: field(data, "possession_date", 100) || null,
    builder_name: field(data, "builder_name", 255),
    rera_number: field(data, "rera_number", 100) || null,
    price_band: field(data, "price_band", 255) || null,
    map_embed_url: field(data, "map_embed_url", 2000) || null,
    card_badge: field(data, "card_badge", 100) || null,
    amenities: parseLines(field(data, "amenities", 5000)),
    landmarks: parseLandmarks(field(data, "landmarks", 5000)),
    status,
    sort_order: Number(field(data, "sort_order", 10)) || 0,
  };

  const supabase = await createClient();

  if (id) {
    const { error } = await supabase.from("projects").update(row).eq("id", id);

    if (error) {
      const message =
        error.code === "23505"
          ? "A project with that URL slug already exists — please choose a different one."
          : `Could not save changes: ${error.message}`;
      return { status: "error", message };
    }

    revalidatePath("/admin");
    revalidatePath(`/admin/projects/${id}/edit`);
    revalidatePath(`/projects/${slug}`);
    revalidatePath("/");
    return { status: "success", message: "Changes saved." };
  }

  const { data: created, error } = await supabase
    .from("projects")
    .insert(row)
    .select("id")
    .single();

  if (error || !created) {
    const message =
      error?.code === "23505"
        ? "A project with that URL slug already exists — please choose a different name or slug."
        : `Could not create the project: ${error?.message ?? "unknown error"}`;
    return { status: "error", message };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect(`/admin/projects/${created.id}/edit`);
}

export async function deleteProject(
  id: string,
): Promise<{ status: "error"; message: string } | undefined> {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("project_images")
    .select("image_url")
    .eq("project_id", id);

  const paths = (images ?? [])
    .map((image) => extractStoragePath(image.image_url))
    .filter((path): path is string => Boolean(path));

  if (paths.length > 0) {
    await supabase.storage.from(PROJECT_IMAGES_BUCKET).remove(paths);
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    return { status: "error", message: `Could not delete: ${error.message}` };
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
