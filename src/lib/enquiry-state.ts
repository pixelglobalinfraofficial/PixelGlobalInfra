/**
 * Shape of the contact form's result.
 *
 * This lives outside `src/app/contact/actions.ts` on purpose: a "use server"
 * module may only export async functions, so the type and the initial value
 * cannot sit alongside the action itself.
 */
export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
};

/** The four things a caller ever wants. Matches the approved design. */
export const ENQUIRY_INTERESTS = [
  "Luxury Residential",
  "Commercial Portfolio",
  "Investment Advisory",
  "NRI Consultation",
] as const;
