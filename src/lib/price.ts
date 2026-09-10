/** Renders a price band, or the "Price on request" fallback when empty. */
export function formatPriceBand(price: string | null): string {
  return price && price.trim().length > 0 ? price : "Price on request";
}

/**
 * Parses a free-text price band like "₹12.5 Cr" or "From ₹4.5 Cr" into a
 * number of crores, for sorting. Returns null when nothing numeric is found
 * so unparsable bands (or "Price on request") always sort last.
 */
export function parsePriceCr(price: string | null): number | null {
  if (!price) return null;
  const match = price.replace(/,/g, "").match(/([\d.]+)/);
  if (!match) return null;
  const value = Number.parseFloat(match[1]);
  return Number.isFinite(value) ? value : null;
}
