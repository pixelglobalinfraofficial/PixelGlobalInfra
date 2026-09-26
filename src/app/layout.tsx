import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import { PaletteScript, PaletteSwitcher } from "@/components/palette-switcher";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { WhatsAppMessageProvider } from "@/components/whatsapp-context";
import { siteConfig } from "@/config/site";

import "./globals.css";

/** Display face for headings — warm, high-contrast serif. */
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

/** Body face — self-hosted, so no extra network request on a 4G connection. */
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Sets the browser chrome colour on mobile to match the navy header.
  themeColor: "#14213d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-palette="sand"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <PaletteScript />
      </head>
      <body className="flex min-h-full flex-col">
        <WhatsAppMessageProvider>
          {children}
          <WhatsAppFab />
          <PaletteSwitcher />
        </WhatsAppMessageProvider>
        <Toaster />
      </body>
    </html>
  );
}
