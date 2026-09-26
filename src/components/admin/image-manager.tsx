"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { extractStoragePath, PROJECT_IMAGES_BUCKET } from "@/lib/supabase/storage";
import type { ProjectImage } from "@/lib/supabase/types";

/**
 * Uploads go straight from the browser to Supabase Storage (see the comment
 * on createClient in lib/supabase/client.ts) rather than through a Server
 * Action — Next.js caps action request bodies at 1MB by default, too small
 * for photos.
 */
export function ImageManager({
  projectId,
  images,
}: {
  projectId: string;
  images: ProjectImage[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();

  async function handleFiles(files: FileList) {
    setUploading(true);
    const supabase = createClient();
    let hasCover = images.some((image) => image.is_cover);

    for (const file of Array.from(files)) {
      const extension = file.name.split(".").pop() ?? "jpg";
      const path = `${projectId}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from(PROJECT_IMAGES_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        toast.error(`Could not upload ${file.name}: ${uploadError.message}`);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path);

      const { error: insertError } = await supabase.from("project_images").insert({
        project_id: projectId,
        image_url: publicUrl,
        alt_text: file.name,
        is_cover: !hasCover,
        sort_order: images.length,
      });

      if (insertError) {
        toast.error(`Uploaded ${file.name} but could not save it: ${insertError.message}`);
        continue;
      }

      hasCover = true;
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    router.refresh();
  }

  function handleDelete(image: ProjectImage) {
    startTransition(async () => {
      const supabase = createClient();
      const path = extractStoragePath(image.image_url);
      if (path) {
        await supabase.storage.from(PROJECT_IMAGES_BUCKET).remove([path]);
      }

      const { error } = await supabase.from("project_images").delete().eq("id", image.id);
      if (error) {
        toast.error(`Could not delete photo: ${error.message}`);
        return;
      }
      router.refresh();
    });
  }

  function handleSetCover(image: ProjectImage) {
    startTransition(async () => {
      const supabase = createClient();

      const { error: clearError } = await supabase
        .from("project_images")
        .update({ is_cover: false })
        .eq("project_id", projectId);
      if (clearError) {
        toast.error(`Could not update cover photo: ${clearError.message}`);
        return;
      }

      const { error: setError } = await supabase
        .from("project_images")
        .update({ is_cover: true })
        .eq("id", image.id);
      if (setError) {
        toast.error(`Could not update cover photo: ${setError.message}`);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted flex flex-wrap items-center gap-4 rounded-md border px-4 py-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={(event) => event.target.files && handleFiles(event.target.files)}
          className="hidden"
        />
        <Button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Upload photos"}
        </Button>
        <p className="text-muted-foreground text-xs">
          Pick one or more photos from your device. The first photo uploaded becomes the cover
          automatically — change it anytime using &ldquo;Set as cover&rdquo; below a photo.
        </p>
      </div>

      {images.length === 0 ? (
        <p className="text-muted-foreground text-sm">No photos yet — click &ldquo;Upload photos&rdquo; above.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="space-y-2">
              {/* Plain img: this admin-only thumbnail grid doesn't need next/image's optimizer. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="aspect-square w-full rounded-md border object-cover"
              />
              <div className="flex items-center justify-between gap-2 text-xs">
                {image.is_cover ? (
                  <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 font-medium">
                    Cover
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleSetCover(image)}
                    className="text-muted-foreground hover:text-foreground underline disabled:opacity-50"
                  >
                    Set as cover
                  </button>
                )}
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => handleDelete(image)}
                  className="text-destructive hover:underline disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
