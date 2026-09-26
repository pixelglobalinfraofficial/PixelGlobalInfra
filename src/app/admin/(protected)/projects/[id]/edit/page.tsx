import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ImageManager } from "@/components/admin/image-manager";
import { ProjectForm } from "@/components/admin/project-form";
import { getProjectByIdForAdmin } from "@/lib/admin/projects";

export const metadata: Metadata = { title: "Edit project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectByIdForAdmin(id);
  if (!project) notFound();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold">{project.name}</h1>
        <p className="text-muted-foreground text-sm">/projects/{project.slug}</p>
      </div>

      <ProjectForm project={project} />

      <div className="max-w-3xl space-y-4 border-t pt-8">
        <h2 className="text-lg font-semibold">Photos</h2>
        <ImageManager projectId={project.id} images={project.images} />
      </div>
    </div>
  );
}
