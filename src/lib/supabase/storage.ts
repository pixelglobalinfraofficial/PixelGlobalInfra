export const PROJECT_IMAGES_BUCKET = "project-images";

/**
 * Recovers the bucket-relative path from a public Storage URL, so it can be
 * passed to `storage.from(bucket).remove([...])` when an image is deleted.
 * Returns null for URLs that don't match this shape — e.g. the Unsplash
 * placeholder used before any project had a real uploaded photo.
 */
export function extractStoragePath(
  publicUrl: string,
  bucket: string = PROJECT_IMAGES_BUCKET,
): string | null {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = publicUrl.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(publicUrl.slice(index + marker.length));
}
