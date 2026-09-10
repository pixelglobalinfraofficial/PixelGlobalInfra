"use client";

import { useActionState } from "react";

import { submitProjectEnquiry } from "@/app/projects/[slug]/actions";
import { ENQUIRY_INTERESTS, initialEnquiryState } from "@/lib/enquiry-state";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Shared underline treatment — the design has no boxed inputs anywhere. */
const FIELD =
  "border-emerald-deep/20 text-emerald-deep focus:border-gold w-full border-b bg-transparent py-2 text-sm focus:outline-none";

const LABEL =
  "text-emerald-deep block text-[10px] font-bold tracking-[0.25em] uppercase";

export function ProjectInquiryForm({
  projectName,
  sourcePage,
  whatsappMessage,
}: {
  projectName: string;
  sourcePage: string;
  whatsappMessage: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitProjectEnquiry,
    initialEnquiryState,
  );

  return (
    <form action={formAction} className="grid gap-8 md:grid-cols-2" noValidate>
      <input type="hidden" name="project_name" value={projectName} />
      <input type="hidden" name="source_page" value={sourcePage} />

      <div className="space-y-3">
        <label htmlFor="name" className={LABEL}>
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={255}
          autoComplete="name"
          className={FIELD}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="email" className={LABEL}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          className={FIELD}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="phone" className={LABEL}>
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          maxLength={255}
          autoComplete="tel"
          className={FIELD}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="interest" className={LABEL}>
          Interest
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue={projectName}
          className={FIELD}
        >
          <option value={projectName}>{projectName}</option>
          {ENQUIRY_INTERESTS.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3 md:col-span-2">
        <label htmlFor="message" className={LABEL}>
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={1000}
          className={FIELD}
        />
      </div>

      <div className="space-y-4 md:col-span-2">
        {state.status !== "idle" && (
          <p
            role="status"
            aria-live="polite"
            className={`text-sm leading-relaxed ${
              state.status === "success"
                ? "text-emerald-deep"
                : "text-destructive"
            }`}
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-emerald-deep text-cream hover:bg-gold w-full py-5 text-[11px] font-bold tracking-[0.3em] uppercase transition-colors disabled:opacity-60"
        >
          {pending ? "Sending…" : "Submit Inquiry"}
        </button>

        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          className="border-emerald-deep/30 text-emerald-deep hover:border-gold hover:text-gold block w-full border py-4 text-center text-[11px] font-bold tracking-[0.3em] uppercase transition-colors"
        >
          Chat on WhatsApp instead
        </a>
      </div>
    </form>
  );
}
