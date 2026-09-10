import type { ProjectStatus, PropertyType } from "@/config/site";

export type Project = {
  id: string;
  slug: string;
  name: string;
  /** Rich text stored as HTML. Always sanitise before rendering. */
  description: string;
  locality: string;
  property_type: PropertyType;
  configurations: string;
  area_range: string;
  possession_status: string;
  possession_date: string | null;
  builder_name: string;
  rera_number: string | null;
  /** Null or empty means the site shows "Price on request". */
  price_band: string | null;
  map_embed_url: string | null;
  status: ProjectStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string;
  is_cover: boolean;
  sort_order: number;
  created_at: string;
};

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  project_id: string | null;
  source_page: string;
  created_at: string;
};

/** A project joined with its images — what the detail page renders. */
export type ProjectWithImages = Project & {
  project_images: ProjectImage[];
};

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Partial<Project> & Pick<Project, "slug" | "name" | "locality" | "property_type">;
        Update: Partial<Project>;
      };
      project_images: {
        Row: ProjectImage;
        Insert: Partial<ProjectImage> & Pick<ProjectImage, "project_id" | "image_url">;
        Update: Partial<ProjectImage>;
      };
      enquiries: {
        Row: Enquiry;
        Insert: Pick<Enquiry, "name" | "phone"> & Partial<Enquiry>;
        Update: Partial<Enquiry>;
      };
      admins: {
        Row: { user_id: string; email: string | null; created_at: string };
        Insert: { user_id: string; email?: string | null };
        Update: { email?: string | null };
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
  };
};
