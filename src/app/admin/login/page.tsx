import type { Metadata } from "next";

import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Admin sign in" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="bg-muted/30 flex min-h-screen items-center justify-center px-6">
      <div className="bg-card w-full max-w-sm space-y-8 rounded-xl border p-8 shadow-sm">
        <div className="space-y-1 text-center">
          <h1 className="text-xl font-semibold">Pixel Globalinfra Admin</h1>
          <p className="text-muted-foreground text-sm">
            Sign in with the admin account created in Supabase.
          </p>
        </div>
        <LoginForm next={next ?? "/admin"} />
      </div>
    </main>
  );
}
