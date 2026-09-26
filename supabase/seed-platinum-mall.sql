-- =============================================================================
-- SEED — PLATINUM MALL
-- =============================================================================
-- HOW TO RUN THIS:
--   1. Supabase dashboard → SQL Editor → New query
--   2. Paste this entire file in and press "Run"
--
-- Sourced from the "Platinum Mall" brochure (Sushant Golf City, Lucknow).
-- That brochure states on its own disclaimer page: "This brochure is purely
-- conceptual and not a legal offering... subject to change." There is no
-- builder name, RERA number, price or possession date anywhere in it, so
-- this is seeded with status = 'coming_soon' rather than 'active', and those
-- fields are left blank rather than guessed.
--
-- No photos are attached here — the brochure was shared in chat, not as a
-- file this environment could read, so no real image could be extracted and
-- uploaded to Storage. Add photos via /admin/projects/[id]/edit once you
-- have real ones.
--
-- Safe to run more than once: it skips the insert if a project with this
-- slug already exists.
-- =============================================================================

insert into public.projects (
  slug, name, tagline, display_type, description, locality, property_type,
  configurations, area_range, possession_status, possession_date,
  builder_name, rera_number, price_band, map_embed_url, status, sort_order,
  card_badge, amenities, landmarks
)
select
  'platinum-mall',
  'Platinum Mall',
  'Biggest brands. Best products.',
  'Shopping Mall',
  '<p>A planned retail and entertainment destination in Sushant Golf City — a 6,564-acre township built around an 18-hole international-standard championship golf course, with a commercial zone anchored by Best Price (a Walmart venture) at one end and Medanta Awadh Hospital at the other. Platinum Mall itself is proposed across roughly 5 acres, with six retail levels plus two dedicated food court and entertainment floors topped by a 12-screen multiplex.</p><p>This is a conceptual, pre-development listing — layouts, specifications and timelines are indicative and subject to change.</p>',
  'Sushant Golf City, Lucknow',
  'Commercial',
  'Retail, F&B, Multiplex & Anchor Spaces',
  'Approx. 5,00,000 sq ft retail across 6 levels',
  '',
  null,
  '',
  null,
  null,
  null,
  'coming_soon',
  5,
  'Commercial',
  array[
    '12-screen multiplex cinema',
    '50,000 sq ft food court & fine dining',
    '1,000+ car parking spaces',
    'Anchor store spanning approx. 1,700 sq m',
    'Multiple car lifts & passenger lifts',
    'Within Sushant Golf City township',
    'Adjacent to an 18-hole championship golf course'
  ],
  '[
    {"name": "International Cricket Stadium", "distance": "< 1 km"},
    {"name": "Gomti Nagar", "distance": "3 km"},
    {"name": "Hazratganj", "distance": "9 km"},
    {"name": "Charbagh Railway Station", "distance": "10 km"},
    {"name": "Lucknow International Airport", "distance": "12 km"}
  ]'::jsonb
where not exists (
  select 1 from public.projects where slug = 'platinum-mall'
);
