import path from "node:path";

import type { NextConfig } from "next";

/** Hostname of the Supabase project, derived from the connection URL. */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't walk up and pick up an
  // unrelated lockfile from the parent directory.
  turbopack: { root: path.resolve(__dirname) },

  images: {
    remotePatterns: [
      // Project photos uploaded through the admin panel.
      ...(supabaseHost
        ? ([
            {
              protocol: "https" as const,
              hostname: supabaseHost,
              pathname: "/storage/v1/object/public/**",
            },
          ] as const)
        : []),
      // Placeholder photography used before real project images are uploaded.
      { protocol: "https" as const, hostname: "images.unsplash.com" },
    ],
    // Modern formats only — meaningfully smaller over a 4G connection.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
