export type ProjectFormState = { status: "idle" | "success" | "error"; message: string };
export const initialProjectFormState: ProjectFormState = { status: "idle", message: "" };

export type LoginState = { status: "idle" | "error"; message: string };
export const initialLoginState: LoginState = { status: "idle", message: "" };

/** Splits a textarea into trimmed, non-empty lines. */
export function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function linesToText(lines: string[]): string {
  return lines.join("\n");
}

/** Parses "Name | Distance" lines into landmark objects. Lines without a "|" are skipped. */
export function parseLandmarks(value: string): { name: string; distance: string }[] {
  return parseLines(value)
    .map((line) => {
      const separator = line.indexOf("|");
      if (separator === -1) return null;
      const name = line.slice(0, separator).trim();
      const distance = line.slice(separator + 1).trim();
      if (!name || !distance) return null;
      return { name, distance };
    })
    .filter((entry): entry is { name: string; distance: string } => entry !== null);
}

export function landmarksToText(landmarks: { name: string; distance: string }[]): string {
  return landmarks.map((landmark) => `${landmark.name} | ${landmark.distance}`).join("\n");
}

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

function escapeHtml(value: string): string {
  return value.replace(/[&<>]/g, (char) => HTML_ESCAPES[char]);
}

/**
 * Converts admin-typed plain text into the HTML the site renders via
 * dangerouslySetInnerHTML. Text is escaped before any tag is added, so
 * nothing typed into the textarea can inject markup — every paragraph comes
 * out as plain, safe text wrapped in <p>.
 */
export function paragraphsToHtml(value: string): string {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

/**
 * Reverses paragraphsToHtml for pre-filling the edit form's textarea. Assumes
 * the HTML was produced by paragraphsToHtml — the only writer of this field.
 */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/^<p>/i, "")
    .replace(/<\/p>$/i, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}
