-- =============================================================================
-- PIXEL GLOBAL INFRA — DATABASE SCHEMA
-- =============================================================================
-- HOW TO RUN THIS:
--   1. Open https://supabase.com/dashboard and select your project
--   2. Click "SQL Editor" in the left sidebar
--   3. Click "New query"
--   4. Paste this entire file in and press "Run"
--
-- It is safe to run more than once.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. ADMINS
-- -----------------------------------------------------------------------------
-- This table is the security gate for the whole admin panel. Being logged in is
-- NOT enough to edit the site — your user id has to appear in this table.
-- That way, even if someone manages to create an account, they still cannot
-- touch your projects or read your customer enquiries.
-- -----------------------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

-- Helper used by every policy below. SECURITY DEFINER lets it read the admins
-- table without itself being blocked by row level security, which would
-- otherwise cause infinite recursion.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;


-- -----------------------------------------------------------------------------
-- 2. PROJECTS
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  description       text not null default '',
  locality          text not null,
  property_type     text not null,
  configurations    text not null default '',
  area_range        text not null default '',
  possession_status text not null default '',
  possession_date   text,
  builder_name      text not null default '',
  rera_number       text,
  -- Deliberately free text, and deliberately optional. When empty the site
  -- shows "Price on request". An exact figure is never displayed.
  price_band        text,
  map_embed_url     text,
  -- One-line descriptor shown under the project name on cards and the hero.
  tagline           text not null default '',
  -- "Type" wording on the detail page, e.g. "Penthouse" or "Commercial
  -- Suite". Kept separate from property_type, which drives site filters and
  -- must stay one of the four values in the check constraint below.
  display_type      text not null default '',
  -- Badge shown on the card, e.g. "Featured" or "Commercial". Null shows no badge.
  card_badge        text,
  amenities         text[] not null default '{}',
  -- Array of {"name": "...", "distance": "..."} objects.
  landmarks         jsonb not null default '[]',
  status            text not null default 'active',
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint projects_status_check
    check (status in ('active', 'coming_soon', 'sold_out')),
  constraint projects_property_type_check
    check (property_type in ('Apartment', 'Villa', 'Plot', 'Commercial'))
);

create index if not exists projects_status_idx        on public.projects (status);
create index if not exists projects_locality_idx      on public.projects (locality);
create index if not exists projects_property_type_idx on public.projects (property_type);
create index if not exists projects_sort_idx          on public.projects (sort_order, created_at desc);

-- Keep updated_at honest without the app having to remember.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at
  before update on public.projects
  for each row execute function public.touch_updated_at();


-- -----------------------------------------------------------------------------
-- 3. PROJECT IMAGES
-- -----------------------------------------------------------------------------
create table if not exists public.project_images (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  image_url  text not null,
  alt_text   text not null default '',
  is_cover   boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists project_images_project_idx
  on public.project_images (project_id, sort_order);

-- At most one cover image per project, enforced by the database rather than
-- trusted to the UI.
create unique index if not exists project_images_one_cover_idx
  on public.project_images (project_id)
  where is_cover;


-- -----------------------------------------------------------------------------
-- 4. ENQUIRIES
-- -----------------------------------------------------------------------------
-- Contains customer phone numbers, so this table is never publicly readable.
-- -----------------------------------------------------------------------------
create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  message     text,
  project_id  uuid references public.projects (id) on delete set null,
  source_page text not null default '',
  created_at  timestamptz not null default now()
);

create index if not exists enquiries_created_idx on public.enquiries (created_at desc);


-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
alter table public.admins         enable row level security;
alter table public.projects       enable row level security;
alter table public.project_images enable row level security;
alter table public.enquiries      enable row level security;

-- --- admins ------------------------------------------------------------------
drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row"
  on public.admins for select
  using (user_id = auth.uid());

-- --- projects: public reads, admins write ------------------------------------
drop policy if exists "projects are publicly readable" on public.projects;
create policy "projects are publicly readable"
  on public.projects for select
  using (true);

drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects"
  on public.projects for all
  using (public.is_admin())
  with check (public.is_admin());

-- --- project images: public reads, admins write ------------------------------
drop policy if exists "project images are publicly readable" on public.project_images;
create policy "project images are publicly readable"
  on public.project_images for select
  using (true);

drop policy if exists "admins manage project images" on public.project_images;
create policy "admins manage project images"
  on public.project_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- --- enquiries: anyone may submit, only admins may read ----------------------
drop policy if exists "anyone can submit an enquiry" on public.enquiries;
create policy "anyone can submit an enquiry"
  on public.enquiries for insert
  with check (true);

drop policy if exists "admins read enquiries" on public.enquiries;
create policy "admins read enquiries"
  on public.enquiries for select
  using (public.is_admin());

drop policy if exists "admins delete enquiries" on public.enquiries;
create policy "admins delete enquiries"
  on public.enquiries for delete
  using (public.is_admin());


-- =============================================================================
-- IMAGE STORAGE
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

drop policy if exists "project images are publicly viewable" on storage.objects;
create policy "project images are publicly viewable"
  on storage.objects for select
  using (bucket_id = 'project-images');

drop policy if exists "admins upload project images" on storage.objects;
create policy "admins upload project images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "admins update project images" on storage.objects;
create policy "admins update project images"
  on storage.objects for update
  using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "admins delete project images" on storage.objects;
create policy "admins delete project images"
  on storage.objects for delete
  using (bucket_id = 'project-images' and public.is_admin());


-- =============================================================================
-- FINAL STEP — MAKE YOURSELF AN ADMIN
-- =============================================================================
-- 1. In the Supabase dashboard go to Authentication → Users → "Add user"
--    → "Create new user". Enter your email and a strong password.
--    Tick "Auto Confirm User" so you can log in straight away.
--
-- 2. Then run the line below, with your email in place of the placeholder:
--
--      insert into public.admins (user_id, email)
--      select id, email from auth.users where email = 'you@example.com'
--      on conflict (user_id) do nothing;
--
-- 3. Finally, turn OFF public sign-ups so nobody else can create an account:
--    Authentication → Sign In / Providers → Email → disable "Allow new users
--    to sign up" → Save.
-- =============================================================================
