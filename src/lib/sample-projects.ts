import type { Project, ProjectImage } from "@/lib/supabase/types";

/**
 * Projects mirroring the reference prototype, so the rebuilt UI can be
 * compared against it directly.
 *
 * These are placeholder listings, not real inventory. They get replaced by
 * real projects entered through /admin once the admin panel exists.
 * See docs/reference-site-audit.md items 1 and 15 for the price-display and
 * positioning changes still owed on this content.
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
    id: "sample-1",
    slug: "oberoi-skyline-penthouse",
    name: "The Oberoi Skyline Penthouse",
    tagline: "Duplex penthouse with panoramic Gomti views",
    display_type: "Penthouse",
    description:
      "<p>A two-level penthouse on the 28th floor of Gomti Nagar's most distinguished tower. Floor-to-ceiling glass, imported Italian marble, a private rooftop garden and dedicated concierge define a residence reserved for the few.</p>",
    locality: "Gomti Nagar, Lucknow",
    property_type: "Apartment",
    configurations: "4 BHK",
    area_range: "4,200 sqft",
    possession_status: "Ready to move",
    possession_date: null,
    builder_name: "Sample Developer Pvt Ltd",
    rera_number: "UPRERAPRJ000000",
    price_band: "₹12.5 Cr",
    map_embed_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1780!2d81.0!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
    status: "active",
    sort_order: 1,
    created_at: now,
    updated_at: now,
    card_badge: "Featured",
    amenities: [
      "Private rooftop garden",
      "Italian marble flooring",
      "Smart home automation",
      "Two reserved car parks",
      "24x7 concierge",
      "Infinity-edge pool access",
      "Private elevator lobby",
      "Wine cellar",
    ],
    landmarks: [
      { name: "Phoenix Palassio Mall", distance: "1.8 km" },
      { name: "Lulu Mall", distance: "3.2 km" },
      { name: "SGPGI Hospital", distance: "6.0 km" },
      { name: "CCS International Airport", distance: "16 km" },
    ],
    images: [],
  },
  {
    id: "sample-2",
    slug: "hazratganj-heritage-manor",
    name: "Hazratganj Heritage Manor",
    tagline: "Restored colonial estate on a half-acre plot",
    display_type: "Villa",
    description:
      "<p>A 1920s manor in Hazratganj combining original architectural features with modern amenities. The restoration preserves arched verandahs, hand-laid tile floors and mature gardens while incorporating contemporary systems including climate control, EV charging and fibre optic connectivity.</p>",
    locality: "Central Lucknow",
    property_type: "Villa",
    configurations: "5 BHK",
    area_range: "6,800 sqft",
    possession_status: "Ready to move",
    possession_date: null,
    builder_name: "Sample Developer Pvt Ltd",
    rera_number: "UPRERAPRJ000001",
    price_band: "₹8.2 Cr",
    map_embed_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1780!2d80.94!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
    status: "active",
    sort_order: 2,
    created_at: now,
    updated_at: now,
    card_badge: null,
    amenities: [
      "Half-acre landscaped grounds",
      "Restored arched verandahs",
      "Staff quarters",
      "EV charging",
      "Private library",
      "Wine cellar",
      "Outdoor entertaining lawn",
    ],
    landmarks: [
      { name: "Hazratganj Market", distance: "0.4 km" },
      { name: "La Martinière College", distance: "1.2 km" },
      { name: "Vidhan Sabha", distance: "1.7 km" },
      { name: "Charbagh Railway", distance: "4.5 km" },
    ],
    images: [],
  },
  {
    id: "sample-3",
    slug: "aura-business-district",
    name: "Aura Business District",
    tagline: "Grade-A commercial suites in Sushant Golf City",
    display_type: "Commercial Suite",
    description:
      "<p>A landmark Grade-A development with column-free floor plates, double-glazed curtain walls and LEED Gold certification.</p>",
    locality: "Sushant Golf City",
    property_type: "Commercial",
    configurations: "",
    area_range: "1,850 sqft",
    possession_status: "",
    possession_date: null,
    builder_name: "Sample Developer Pvt Ltd",
    rera_number: null,
    price_band: "From ₹4.5 Cr",
    map_embed_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1780!2d80.98!3d26.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
    status: "active",
    sort_order: 3,
    created_at: now,
    updated_at: now,
    card_badge: "Commercial",
    amenities: [
      "LEED Gold certified",
      "Column-free floor plates",
      "Double-glazed curtain walls",
      "1:80 sqft parking ratio",
      "Sky lobby & conference facilities",
      "Cafeteria & food court",
      "24x7 manned security",
    ],
    landmarks: [
      { name: "Shaheed Path", distance: "0.6 km" },
      { name: "Ekana Stadium", distance: "2.4 km" },
      { name: "CCS International Airport", distance: "9 km" },
      { name: "Lucknow Metro (Munshipulia)", distance: "12 km" },
    ],
    images: [],
  },
];

const coverPhotos: Record<string, string> = {
  "oberoi-skyline-penthouse":
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
  "hazratganj-heritage-manor":
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=80",
  "aura-business-district":
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
};

for (const p of sampleProjects) {
  p.images = [cover(p.id, coverPhotos[p.slug], `${p.name} — ${p.locality}`)];
}

export function getSampleProject(slug: string) {
  return sampleProjects.find((p) => p.slug === slug);
}
