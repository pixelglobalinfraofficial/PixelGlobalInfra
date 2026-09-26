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
  /** One-line descriptor shown under the project name. */
  tagline: string;
  /**
   * "Type" wording shown on the detail page, e.g. "Penthouse" or
   * "Commercial Suite". Kept separate from `property_type`, which drives
   * the site's filters and must stay one of the four PROPERTY_TYPES.
   */
  display_type: string;
  /** Badge shown on the card, e.g. "Featured" or "Commercial". */
  card_badge: string | null;
  amenities: string[];
  landmarks: { name: string; distance: string }[];
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
        Relationships: [];
      };
      project_images: {
        Row: ProjectImage;
        Insert: Partial<ProjectImage> & Pick<ProjectImage, "project_id" | "image_url">;
        Update: Partial<ProjectImage>;
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      enquiries: {
        Row: Enquiry;
        Insert: Pick<Enquiry, "name" | "phone"> & Partial<Enquiry>;
        Update: Partial<Enquiry>;
        Relationships: [];
      };
      admins: {
        Row: { user_id: string; email: string | null; created_at: string };
        Insert: { user_id: string; email?: string | null };
        Update: { email?: string | null };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
  };
};
