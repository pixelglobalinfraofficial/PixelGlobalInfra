import type { Metadata } from "next";

import { ProjectForm } from "@/components/admin/project-form";

export const metadata: Metadata = { title: "Add project" };

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add new project</h1>
      <p className="bg-muted rounded-md border px-4 py-3 text-sm">
        Fill in the details below and click <strong>Create project</strong> first. You&rsquo;ll then
        land on this project&rsquo;s edit page, where a <strong>Photos</strong> section appears for
        uploading images and choosing the cover photo.
      </p>
      <ProjectForm />
    </div>
  );
}
