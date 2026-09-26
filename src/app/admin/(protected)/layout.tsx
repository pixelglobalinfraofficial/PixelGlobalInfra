import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { logout } from "./actions";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted/20 min-h-screen">
      <header className="bg-card border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-semibold">
            Pixel Globalinfra Admin
          </Link>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
