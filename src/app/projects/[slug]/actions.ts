"use server";

import type { EnquiryState } from "@/lib/enquiry-state";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/** Trims, caps length, and collapses an absent value to "". */
function field(data: FormData, name: string, max: number): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Saves a project enquiry.
 *
 * Mirrors `submitEnquiry` in `src/app/contact/actions.ts`: the `enquiries`
 * table has no dedicated "property" or "interest" column, so both are folded
 * into the message body rather than widening the schema. `project_id` is left
 * unset — the sample projects use placeholder ids, not real UUIDs, and the
 * property name in the message body already gives the concierge full context.
 */
export async function submitProjectEnquiry(
  _prev: EnquiryState,
  data: FormData,
): Promise<EnquiryState> {
  const name = field(data, "name", 255);
  const email = field(data, "email", 255);
  const phone = field(data, "phone", 255);
  const interest = field(data, "interest", 255);
  const message = field(data, "message", 1000);
  const projectName = field(data, "project_name", 255);
  const sourcePage = field(data, "source_page", 255);

  if (!name || !phone) {
    return {
      status: "error",
      message:
        "Please give us your name and a phone number so we can call back.",
    };
  }

  const composed = [
    projectName ? `Property: ${projectName}` : null,
    interest && interest !== projectName ? `Interest: ${interest}` : null,
    email ? `Email: ${email}` : null,
    message ? `\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  if (!isSupabaseConfigured) {
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
    source_page: sourcePage || "/projects",
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
    message:
      "Thank you — your enquiry has reached our concierge. We usually reply within a few hours.",
  };
}
