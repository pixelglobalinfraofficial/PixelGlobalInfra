"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/** What the form renders after a submit attempt. */
export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialEnquiryState: EnquiryState = { status: "idle", message: "" };

const INTERESTS = [
  "Luxury Residential",
  "Commercial Portfolio",
  "Investment Advisory",
  "NRI Consultation",
] as const;

/** Trims, caps length, and collapses an absent value to "". */
function field(data: FormData, name: string, max: number): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Saves a contact enquiry.
 *
 * The `enquiries` table only carries name, phone and message — email and the
 * interest dropdown are folded into the message body rather than widening the
 * schema, so an enquiry from here reads the same way in the admin panel as one
 * from a project page.
 *
 * Row level security allows the insert but not the read back, so we never ask
 * for one. See supabase/schema.sql — "anyone can submit an enquiry".
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  data: FormData,
): Promise<EnquiryState> {
  const name = field(data, "name", 255);
  const email = field(data, "email", 255);
  const phone = field(data, "phone", 255);
  const rawInterest = field(data, "interest", 255);
  const message = field(data, "message", 1000);

  if (!name || !phone) {
    return {
      status: "error",
      message: "Please give us your name and a phone number so we can call back.",
    };
  }

  // Never trust the select — a hand-crafted POST can send anything.
  const interest = (INTERESTS as readonly string[]).includes(rawInterest)
    ? rawInterest
    : INTERESTS[0];

  const composed = [
    `Interest: ${interest}`,
    email ? `Email: ${email}` : null,
    message ? `\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (!isSupabaseConfigured) {
    // The site is built to render before Supabase is wired up. Say so plainly
    // rather than pretending the enquiry was saved.
    return {
      status: "error",
      message:
        "Our enquiry form is not connected yet. Please reach us on WhatsApp or by phone — both are listed on this page.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({
    name,
    phone,
    message: composed,
    source_page: "/contact",
  });

  if (error) {
    return {
      status: "error",
      message:
        "Something went wrong sending that. Please try again, or reach us on WhatsApp.",
    };
  }

  return {
    status: "success",
    message: "Thank you — your enquiry has reached our concierge. We usually reply within a few hours.",
  };
}