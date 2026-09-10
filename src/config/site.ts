/**
 * Central site configuration.
 *
 * Everything here is read from environment variables so it can be changed from
 * the Vercel dashboard without editing code or redeploying by hand.
 * The fallbacks are placeholders — the site renders fine before real values
 * are supplied, so nothing crashes on a fresh clone.
 *
 * To change any of these: Vercel → your project → Settings → Environment
 * Variables → edit → then Redeploy.
 */

/** Digits only, country code included, no "+" and no spaces. e.g. 919876543210 */
const RAW_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000";

export const siteConfig = {
  name: "Pixel Globalinfra",
  shortName: "Pixel Globalinfra",

  /** One-line positioning shown in the hero and in SEO descriptions. */
  tagline: "Curated residential and commercial projects across Lucknow",

  /** Longer description used for meta tags and Open Graph. */
  description:
    "Pixel Globalinfra is a property consultancy in Lucknow. We market and broker a curated portfolio of residential and commercial projects from leading developers.",

  /** Year the firm was established — shown as "since {year}". */
  establishedYear: process.env.NEXT_PUBLIC_ESTABLISHED_YEAR ?? "2015",

  /** Canonical site URL. Required for Open Graph previews in WhatsApp. */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),

  contact: {
    /** WhatsApp number in wa.me format — digits only. */
    whatsapp: RAW_WHATSAPP.replace(/\D/g, ""),
    /** Human-readable phone for tel: links and display. */
    phone: process.env.NEXT_PUBLIC_PHONE ?? "+91 00000 00000",
    email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@example.com",
    address:
      process.env.NEXT_PUBLIC_ADDRESS ?? "Office address, Lucknow, Uttar Pradesh",
  },

  /**
   * Legally important. We are a brokerage, not the developer — this must
   * appear in the footer on every page.
   */
  disclaimer:
    "Pixel Globalinfra is a property brokerage and consultancy. We are not the developer of the projects listed on this website. All information — including pricing, availability, specifications, layouts and possession timelines — is indicative, sourced from the respective developers, and subject to change without notice. Nothing on this website constitutes an offer or a contract. Buyers are advised to independently verify all details and RERA registration particulars with the developer before making any commitment.",
} as const;

/** The four property types. Keep this list short — no BHK or budget filters. */
export const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Plot",
  "Commercial",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

/** Project lifecycle status, and how each renders as a badge. */
export const PROJECT_STATUSES = {
  active: { label: "Available", showBadge: false },
  coming_soon: { label: "Coming Soon", showBadge: true },
  sold_out: { label: "Sold Out", showBadge: true },
} as const;

export type ProjectStatus = keyof typeof PROJECT_STATUSES;
