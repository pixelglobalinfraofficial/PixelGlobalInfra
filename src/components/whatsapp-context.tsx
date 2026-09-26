"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WhatsAppMessageContext = createContext<{
  message: string | null;
  setMessage: (message: string | null) => void;
} | null>(null);

/** Wraps the whole app so any page can override what the floating WhatsApp button says. */
export function WhatsAppMessageProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <WhatsAppMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </WhatsAppMessageContext.Provider>
  );
}

/** Read the current override, if any. Used by the floating button itself. */
export function useWhatsAppMessage() {
  const ctx = useContext(WhatsAppMessageContext);
  return ctx?.message ?? null;
}

/**
 * Render this on any page to make the floating WhatsApp button mention that
 * page's context (e.g. a specific property) instead of the generic message.
 * Clears the override again when the page unmounts.
 */
export function WhatsAppMessageOverride({ message }: { message: string }) {
  const ctx = useContext(WhatsAppMessageContext);
  useEffect(() => {
    ctx?.setMessage(message);
    return () => ctx?.setMessage(null);
  }, [ctx, message]);
  return null;
}
