"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pgi-palette";

/**
 * Inline script that runs before paint and applies the saved palette to
 * <html>, so switching palettes never causes a flash of the wrong theme.
 */
export function PaletteScript() {
  const script = `
    (function () {
      try {
        var saved = localStorage.getItem("${STORAGE_KEY}");
        if (saved === "sand" || saved === "walnut") {
          document.documentElement.setAttribute("data-palette", saved);
        }
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

/** Floating control to compare the Sand and Walnut palettes on a real phone. */
export function PaletteSwitcher() {
  const [palette, setPalette] = useState<"sand" | "walnut">("sand");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-palette");
    if (current === "walnut") setPalette("walnut");
  }, []);

  function toggle() {
    const next = palette === "sand" ? "walnut" : "sand";
    setPalette(next);
    document.documentElement.setAttribute("data-palette", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="border-border bg-surface text-surface-foreground fixed bottom-4 left-4 z-50 rounded-full border px-4 py-2 text-xs font-medium shadow-sm"
    >
      {palette === "sand" ? "Sand" : "Walnut"} palette
    </button>
  );
}
