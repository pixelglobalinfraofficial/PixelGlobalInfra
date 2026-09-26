"use client";

import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";
import { useWhatsAppMessage } from "@/components/whatsapp-context";

/** Official WhatsApp glyph — kept inline so no icon package is needed. */
function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className="size-8">
      <path d="M16.004 2.667c-7.363 0-13.333 5.97-13.333 13.333 0 2.353.615 4.646 1.782 6.666l-1.893 6.914 7.083-1.857a13.27 13.27 0 0 0 6.361 1.62h.006c7.362 0 13.333-5.97 13.333-13.333 0-3.562-1.387-6.911-3.905-9.428a13.24 13.24 0 0 0-9.434-3.915Zm0 24.4h-.005a11.08 11.08 0 0 1-5.647-1.546l-.405-.24-4.203 1.102 1.122-4.098-.264-.42a11.05 11.05 0 0 1-1.7-5.865c0-6.121 4.982-11.1 11.107-11.1 2.966 0 5.754 1.156 7.851 3.255a11.03 11.03 0 0 1 3.249 7.852c0 6.122-4.983 11.1-11.105 11.1Zm6.09-8.316c-.334-.167-1.973-.973-2.278-1.084-.306-.111-.529-.167-.751.167-.223.334-.863 1.084-1.058 1.307-.195.223-.39.25-.723.083-.334-.167-1.409-.519-2.684-1.654-.992-.884-1.662-1.977-1.857-2.31-.195-.334-.021-.514.146-.68.15-.15.334-.39.5-.585.167-.195.223-.334.334-.557.111-.223.056-.418-.028-.585-.083-.167-.751-1.809-1.029-2.478-.271-.65-.546-.562-.751-.573l-.64-.011c-.223 0-.585.083-.891.418-.306.334-1.169 1.142-1.169 2.785s1.197 3.23 1.363 3.452c.167.223 2.354 3.594 5.703 5.04.797.344 1.418.55 1.902.703.799.254 1.526.218 2.101.132.641-.096 1.973-.807 2.251-1.586.278-.78.278-1.448.195-1.587-.083-.14-.306-.223-.64-.39Z" />
    </svg>
  );
}

/**
 * Fixed-position launcher, visible on every page — mirrors the pattern from
 * the reference site (pixel-global-infra.lovable.app).
 */
export function WhatsAppFab() {
  const override = useWhatsAppMessage();
  return (
    <a
      href={buildWhatsAppUrl(override ?? generalWhatsAppMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppGlyph />
    </a>
  );
}
