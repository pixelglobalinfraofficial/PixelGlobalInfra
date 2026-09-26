"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { saveProject } from "@/app/admin/(protected)/projects/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PROJECT_STATUSES, PROPERTY_TYPES } from "@/config/site";
import {
  htmlToPlainText,
  initialProjectFormState,
  landmarksToText,
  linesToText,
} from "@/lib/admin/fields";
import type { Project, ProjectImage } from "@/lib/supabase/types";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProjectForm({
  project,
}: {
  project?: Project & { images: ProjectImage[] };
}) {
  const [state, formAction, pending] = useActionState(saveProject, initialProjectFormState);
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));

  useEffect(() => {
    if (state.status === "error") toast.error(state.message);
    if (state.status === "success") toast.success(state.message);
  }, [state]);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Property name</Label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={project?.name}
            onChange={(event) => {
              if (!slugTouched) setSlug(slugify(event.target.value));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">URL slug</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            placeholder="auto-generated from name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>
        <Input id="tagline" name="tagline" defaultValue={project?.tagline} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="locality">Locality</Label>
          <Input id="locality" name="locality" required defaultValue={project?.locality} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display_type">
            Display type <span className="text-muted-foreground">(e.g. &ldquo;Penthouse&rdquo;)</span>
          </Label>
          <Input id="display_type" name="display_type" defaultValue={project?.display_type} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="property_type">Property type</Label>
          <Select name="property_type" defaultValue={project?.property_type ?? PROPERTY_TYPES[0]}>
            <SelectTrigger id="property_type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={project?.status ?? "active"}>
            <SelectTrigger id="status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PROJECT_STATUSES).map(([value, { label }]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort order</Label>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={project?.sort_order ?? 0}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="configurations">
            Configuration <span className="text-muted-foreground">(e.g. &ldquo;4 BHK&rdquo;)</span>
          </Label>
          <Input id="configurations" name="configurations" defaultValue={project?.configurations} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area_range">Area</Label>
          <Input id="area_range" name="area_range" defaultValue={project?.area_range} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="possession_status">Possession status</Label>
          <Input
            id="possession_status"
            name="possession_status"
            defaultValue={project?.possession_status}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="possession_date">Possession date</Label>
          <Input
            id="possession_date"
            name="possession_date"
            defaultValue={project?.possession_date ?? ""}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="builder_name">Builder name</Label>
          <Input id="builder_name" name="builder_name" defaultValue={project?.builder_name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rera_number">RERA number</Label>
          <Input id="rera_number" name="rera_number" defaultValue={project?.rera_number ?? ""} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price_band">
            Price <span className="text-muted-foreground">(leave blank for &ldquo;Price on request&rdquo;)</span>
          </Label>
          <Input id="price_band" name="price_band" defaultValue={project?.price_band ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="card_badge">
            Card badge <span className="text-muted-foreground">(e.g. &ldquo;Featured&rdquo;)</span>
          </Label>
          <Input id="card_badge" name="card_badge" defaultValue={project?.card_badge ?? ""} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="map_embed_url">Google Maps embed URL</Label>
        <Input id="map_embed_url" name="map_embed_url" defaultValue={project?.map_embed_url ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <p className="text-muted-foreground text-xs">Separate paragraphs with a blank line.</p>
        <Textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={project ? htmlToPlainText(project.description) : ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amenities">Amenities</Label>
        <p className="text-muted-foreground text-xs">One per line.</p>
        <Textarea
          id="amenities"
          name="amenities"
          rows={5}
          defaultValue={project ? linesToText(project.amenities) : ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="landmarks">Nearby landmarks</Label>
        <p className="text-muted-foreground text-xs">
          One per line, as &ldquo;Name | Distance&rdquo; — e.g. &ldquo;Charbagh Railway | 4.5 km&rdquo;.
        </p>
        <Textarea
          id="landmarks"
          name="landmarks"
          rows={5}
          defaultValue={project ? landmarksToText(project.landmarks) : ""}
        />
      </div>

      {state.status === "error" && (
        <p role="status" aria-live="polite" className="text-destructive text-sm">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : project ? "Save changes" : "Create project"}
      </Button>
    </form>
  );
}
