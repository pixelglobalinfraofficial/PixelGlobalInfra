# Pixel Global Infra — Website

A project showcase for a property brokerage in Lucknow. Customers open a link
from WhatsApp, browse the projects we're dealing with, and message us to talk
about price and availability.

This README is written for a non-developer. Every step you have to do yourself
is marked **YOU DO THIS**.

---

## Contents

- [What this site is built with](#what-this-site-is-built-with)
- [First-time setup](#first-time-setup)
- [Choosing a palette](#choosing-a-palette)
- [Changing colours](#changing-colours)
- [Changing your phone number, WhatsApp number, email or address](#changing-your-contact-details)
- [Running the site on your own computer](#running-the-site-on-your-own-computer)
- [Important — UP RERA agent registration](#important--up-rera-agent-registration)

---

## What this site is built with

Everything below is on a **free plan**. Nothing here charges your card.

| What it does | Service |
| --- | --- |
| The website itself | Next.js |
| Stores projects, photos and enquiries | Supabase |
| Puts the site on the internet | Vercel |
| Emails you when someone enquires | Resend |
| Shows the project location | Google Maps embed |

---

## First-time setup

### Step 1 — Set up the database

**YOU DO THIS:**

1. Go to <https://supabase.com/dashboard> and open your project.
2. In the left sidebar click **SQL Editor**, then **New query**.
3. Open the file [`supabase/schema.sql`](supabase/schema.sql) in this project,
   copy the whole thing, paste it into the editor, and press **Run**.
   You should see "Success. No rows returned."

### Step 2 — Create your admin login

**YOU DO THIS:**

1. In Supabase, go to **Authentication → Users → Add user → Create new user**.
2. Enter your email and a strong password.
   **Tick "Auto Confirm User"** — otherwise you can't log in.
3. Go back to **SQL Editor**, and run this, with your own email in the quotes:

   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email = 'you@example.com'
   on conflict (user_id) do nothing;
   ```

4. Now lock the door behind you: **Authentication → Sign In / Providers →
   Email** → turn **off** "Allow new users to sign up" → **Save**.

   This matters. Without it, anyone could create an account on your Supabase
   project. With it, only the accounts you create by hand can exist.

### Step 3 — Connect the site to Supabase

**YOU DO THIS:**

1. In Supabase go to **Project Settings → API Keys**.
2. Copy the **Project URL** and the **anon / public** key.
3. In this project, make a copy of `.env.example` and name it `.env.local`.
4. Paste your two values in, and fill in your real phone number, WhatsApp
   number, email and office address.

> The anon key is safe to put on a public website. It can only do what the
> security rules in `schema.sql` allow — read projects, and submit an enquiry.
> It cannot read your enquiries or edit your projects.

### Step 4 — Put the code on GitHub

**YOU DO THIS:**

1. Go to <https://github.com/new>.
2. Repository name: `pixel-global-infra`.
3. Set it to **Private**.
4. Do **not** tick "Add a README" — this project already has one.
5. Click **Create repository**.
6. GitHub will show you a page of commands. Ignore it, and instead run these
   in your terminal from this folder, replacing `YOUR-USERNAME`:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/pixel-global-infra.git
   git branch -M main
   git push -u origin main
   ```

### Step 5 — Put the site on the internet

**YOU DO THIS:**

1. Go to <https://vercel.com/signup> and sign up **with your GitHub account** —
   this saves a lot of steps later.
2. Click **Add New → Project**, find `pixel-global-infra`, click **Import**.
3. Before clicking Deploy, expand **Environment Variables** and add every
   variable from your `.env.local` file.
   Set `NEXT_PUBLIC_SITE_URL` to the URL Vercel gives you, for example
   `https://pixel-global-infra.vercel.app`.
4. Click **Deploy** and wait about a minute.

From now on, every time code is pushed to GitHub, Vercel updates the live site
automatically. You never have to deploy by hand.

---

## Choosing a palette

The site currently ships with **two** colour schemes so you can compare them on
your actual phone. A small **Palette** button sits in the bottom-left corner —
tap it to switch between:

- **Sand** — deep navy structure, warm amber call-to-action, warm sand page
- **Walnut** — dark walnut surfaces, muted gold call-to-action

Once you've decided, tell Claude which one you want and it will be locked in
and the switcher removed. (For reference, doing it by hand means setting
`data-palette` on the `<html>` tag in `src/app/layout.tsx` and deleting
`src/components/palette-switcher.tsx`.)

---

## Changing colours

**All colours in the entire site live in one file:**
[`src/app/globals.css`](src/app/globals.css)

No colour is written anywhere else. Change a value there and it updates
everywhere on the site at once. Each one is labelled with what it controls.

There is one note worth knowing: the WhatsApp button uses WhatsApp's official
green, which technically fails accessibility contrast standards with white
text. It's kept because it's instantly recognisable. If you'd rather be
compliant, `globals.css` explains the one-line change.

---

## Changing your contact details

Your WhatsApp number, phone, email and office address are **not** written into
the code. They're settings you can change without touching anything technical.

**YOU DO THIS:**

1. Go to <https://vercel.com> → your project → **Settings** →
   **Environment Variables**.
2. Edit the value you want to change.
3. Go to the **Deployments** tab, click the **···** menu on the most recent
   one, and choose **Redeploy**.

| Setting | What it controls |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Every WhatsApp button on the site |
| `NEXT_PUBLIC_PHONE` | The "Call us" button and footer |
| `NEXT_PUBLIC_EMAIL` | Footer and contact page |
| `NEXT_PUBLIC_ADDRESS` | Footer and contact page |
| `ENQUIRY_NOTIFY_EMAIL` | Where new enquiry emails get sent |

> **The WhatsApp number format matters.** Digits only, country code included,
> no `+` and no spaces. `+91 98765 43210` must be written as `919876543210`.
> If you get this wrong, the buttons open WhatsApp to nothing.

---

## Running the site on your own computer

You only need this if you want to preview changes before they go live.

```bash
npm install      # once, the first time
npm run dev      # then open http://localhost:3000
```

To check nothing is broken before pushing:

```bash
npm run build
```

---

## Important — UP RERA agent registration

Under the Real Estate (Regulation and Development) Act, property agents and
brokers in Uttar Pradesh are generally required to register with **UP RERA**
and to quote their agent registration number when marketing projects.

**This is a legal obligation on you, not something this website handles.**
Please confirm your own registration status and requirements with UP RERA or
your lawyer — <https://www.up-rera.in>

If you have an agent registration number, tell Claude and it will be added to
the site footer. Each project also has its own field for the **developer's**
RERA number, which you fill in through the admin panel.

---

## Project structure

```
src/
  app/                 pages — one folder per URL
    globals.css        ← ALL COLOURS LIVE HERE
    layout.tsx         wraps every page; fonts and site-wide metadata
  components/          reusable pieces of interface
    ui/                shadcn/ui components (don't edit by hand)
  config/site.ts       company name, tagline, disclaimer
  lib/
    supabase/          database connection
    whatsapp.ts        builds the WhatsApp links
  proxy.ts             keeps you logged in; protects /admin
supabase/
  schema.sql           the database structure — run this once in Supabase
```
