import { readdirSync } from "node:fs";
import path from "node:path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

/**
 * Any file in public/images/ named ceo-*.{jpg,jpeg,png,webp} is picked up
 * automatically and rendered in the founder photo frame on /about, in
 * filename order — drop in ceo-1.jpg, ceo-2.jpg, etc. and redeploy, no code
 * change needed. Returns an empty array (rendered as a placeholder frame)
 * until at least one file exists.
 */
export function getCeoPhotos(): string[] {
  let files: string[];
  try {
    files = readdirSync(IMAGES_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => /^ceo-.*\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file) => `/images/${file}`);
}
