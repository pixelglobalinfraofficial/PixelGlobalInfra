"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { LoginState } from "@/lib/admin/fields";

export async function login(_prev: LoginState, data: FormData): Promise<LoginState> {
  const email = String(data.get("email") ?? "").trim();
  const password = String(data.get("password") ?? "");
  const next = String(data.get("next") ?? "/admin");

  if (!email || !password) {
    return { status: "error", message: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { status: "error", message: "Incorrect email or password." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}
