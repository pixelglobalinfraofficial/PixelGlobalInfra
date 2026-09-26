"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteProject } from "./projects/actions";

export function DeleteProjectButton({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (
      !window.confirm(
        `Delete "${projectName}"? This also removes its photos. This cannot be undone.`,
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteProject(projectId);
      if (result?.status === "error") {
        toast.error(result.message);
        return;
      }
      router.refresh();
    });
  }

  return (
    <Button variant="destructive" size="sm" disabled={pending} onClick={handleClick}>
      {pending ? "Deleting…" : "Delete"}
    </Button>
  );
}
