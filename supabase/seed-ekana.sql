-- =============================================================================
-- SEED — EKANA MALL (the only real project entered so far)
-- =============================================================================
-- HOW TO RUN THIS:
--   1. First run supabase/schema.sql if you haven't already (creates the
--      tables, storage bucket, and security policies).
--   2. Open https://supabase.com/dashboard and select your project
--   3. Click "SQL Editor" in the left sidebar → "New query"
--   4. Paste this entire file in and press "Run"
--
-- This inserts one project row (Ekana Mall) and one cover-photo row. The
-- cover photo below is still the same placeholder stock photo used during
-- development — replace it with a real photo of Ekana Mall once you have
-- one (Storage → project-images bucket → upload, then update image_url).
--
-- Safe to run more than once: it skips the insert if a project with this
-- slug already exists.
-- =============================================================================

with new_project as (
  insert into public.projects (
    slug, name, tagline, display_type, description, locality, property_type,
    configurations, area_range, possession_status, possession_date,
    builder_name, rera_number, price_band, map_embed_url, status, sort_order,
    card_badge, amenities, landmarks
  )
  select
    'ekana-mall',
    'Ekana Mall',
    'A bouquet of leisure and retail experiences at Ekana Sportz City',
    'Retail Mall',
    '<p>Lucknow''s flagship shopping and entertainment destination at Ekana Sportz City — a 137-acre, state-government-backed development anchored by the Ekana International Cricket Stadium. The mall spans hyper retail and anchor stores, a multiplex cinema, gaming arcade, a Venetian-style indoor gondola ride, a gold souk, food court, rooftop resto-bar and multiple floors of Grade-A commercial office space.</p>',
    'Gomti Nagar Extension, Lucknow',
    'Commercial',
    'Retail, F&B, Office & Anchor Spaces',
    '472 – 7,150 sqft (per unit)',
    '',
    null,
    'Ekana Sportz City Pvt. Ltd.',
    'UPRERAPRJ407529',
    null,
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1780!2d80.99!3d26.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    'active',
    1,
    'Commercial',
    array[
      'Multiplex cinema with recliner screens',
      'Venetian-style indoor gondola ride',
      'Gold souk',
      'Gaming arcade & kids'' playzone',
      'Rooftop resto-bar with skyline views',
      'Food court & opulent diners',
      'Hyper stores & anchor retail',
      'Grade-A commercial office floors',
      'Multi-level secured parking'
    ],
    '[
      {"name": "Ekana International Cricket Stadium", "distance": "Adjacent"},
      {"name": "Shaheed Path", "distance": "On arterial road"},
      {"name": "Hazratganj", "distance": "10 km"},
      {"name": "Charbagh Railway Station", "distance": "12 km"},
      {"name": "Amausi International Airport", "distance": "15 km"}
    ]'::jsonb
  where not exists (
    select 1 from public.projects where slug = 'ekana-mall'
  )
  returning id
)
insert into public.project_images (project_id, image_url, alt_text, is_cover, sort_order)
select id, 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1400&q=80',
       'Ekana Mall — Gomti Nagar Extension, Lucknow', true, 0
from new_project;
