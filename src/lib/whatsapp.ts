import { siteConfig } from "@/config/site";

/**
 * Builds a wa.me deep link with a properly URL-encoded pre-filled message.
 *
 * Format: https://wa.me/91XXXXXXXXXX?text=<encoded message>
 * The number carries the country code with no "+" and no spaces — wa.me
 * silently fails or opens the wrong chat if either is present.
 */
export function buildWhatsAppUrl(message: string): string {
  const number = siteConfig.contact.whatsapp;
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Message used on a project page. Naming the project and locality means the
 * enquiry arrives with context instead of a bare "Hi".
 */
export function projectWhatsAppMessage(name: string, locality: string): string {
  return `Hi, I'm interested in ${name}, ${locality}. Could you share more details?`;
}

/** Generic message for the homepage, header, contact page and footer. */
export function generalWhatsAppMessage(): string {
  return `Hi, I found ${siteConfig.name} online. I'd like to know more about the projects you're currently dealing with.`;
}
