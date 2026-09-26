import type { Project, ProjectImage } from "@/lib/supabase/types";

/**
 * Fallback content shown only when Supabase isn't configured yet, or a query
 * fails — see src/lib/projects.ts. Once the `projects` table has rows, those
 * are what the site actually renders.
 */
export type SampleProject = Project & {
  images: ProjectImage[];
};

const now = new Date().toISOString();

function cover(project_id: string, image_url: string, alt_text: string): ProjectImage {
  return {
    id: `${project_id}-img-0`,
    project_id,
    image_url,
    alt_text,
    is_cover: true,
    sort_order: 0,
    created_at: now,
  };
}

export const sampleProjects: SampleProject[] = [
  {
    id: "sample-4",
    slug: "ekana-mall",
    name: "Ekana Mall",
    tagline: "A bouquet of leisure and retail experiences at Ekana Sportz City",
    display_type: "Retail Mall",
    description:
      "<p>Lucknow's flagship shopping and entertainment destination at Ekana Sportz City — a 137-acre, state-government-backed development anchored by the Ekana International Cricket Stadium. The mall spans hyper retail and anchor stores, a multiplex cinema, gaming arcade, a Venetian-style indoor gondola ride, a gold souk, food court, rooftop resto-bar and multiple floors of Grade-A commercial office space.</p>",
    locality: "Gomti Nagar Extension, Lucknow",
    property_type: "Commercial",
    configurations: "Retail, F&B, Office & Anchor Spaces",
    area_range: "472 – 7,150 sqft (per unit)",
    possession_status: "",
    possession_date: null,
    builder_name: "Ekana Sportz City Pvt. Ltd.",
    rera_number: "UPRERAPRJ407529",
    price_band: null,
    map_embed_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1780!2d80.99!3d26.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
    status: "active",
    sort_order: 1,
    created_at: now,
    updated_at: now,
    card_badge: "Commercial",
    amenities: [
      "Multiplex cinema with recliner screens",
      "Venetian-style indoor gondola ride",
      "Gold souk",
      "Gaming arcade & kids' playzone",
      "Rooftop resto-bar with skyline views",
      "Food court & opulent diners",
      "Hyper stores & anchor retail",
      "Grade-A commercial office floors",
      "Multi-level secured parking",
    ],
    landmarks: [
      { name: "Ekana International Cricket Stadium", distance: "Adjacent" },
      { name: "Shaheed Path", distance: "On arterial road" },
      { name: "Hazratganj", distance: "10 km" },
      { name: "Charbagh Railway Station", distance: "12 km" },
      { name: "Amausi International Airport", distance: "15 km" },
    ],
    images: [],
  },
];

const coverPhotos: Record<string, string> = {
  "ekana-mall":
    "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1400&q=80",
};

for (const p of sampleProjects) {
  p.images = [cover(p.id, coverPhotos[p.slug], `${p.name} — ${p.locality}`)];
}

export function getSampleProject(slug: string) {
  return sampleProjects.find((p) => p.slug === slug);
}
