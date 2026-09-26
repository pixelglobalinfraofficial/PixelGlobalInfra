import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PROJECT_STATUSES } from "@/config/site";
import { getAllProjectsForAdmin } from "@/lib/admin/projects";

import { DeleteProjectButton } from "./delete-project-button";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminDashboardPage() {
  const projects = await getAllProjectsForAdmin();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-muted-foreground text-sm">
            {projects.length} {projects.length === 1 ? "property" : "properties"} listed.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">Add new project</Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No properties yet. Click &ldquo;Add new project&rdquo; to create the first one.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Locality</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Photos</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.locality}</TableCell>
                <TableCell>{project.property_type}</TableCell>
                <TableCell>{PROJECT_STATUSES[project.status].label}</TableCell>
                <TableCell>{project.images.length}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteProjectButton projectId={project.id} projectName={project.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
