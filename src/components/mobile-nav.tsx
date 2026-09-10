"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl, generalWhatsAppMessage } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="text-nav-foreground hover:bg-nav-foreground/10 -mr-2 flex size-10 items-center justify-center rounded-md md:hidden"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-nav text-nav-foreground w-72">
        <SheetHeader>
          <SheetTitle className="font-heading text-nav-foreground text-left text-lg">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-4">
          {NAV_LINKS.map((link) => (
            <SheetClose key={link.href} asChild>
              <Link
                href={link.href}
                className="text-nav-foreground/90 hover:bg-nav-foreground/10 rounded-md px-3 py-3 text-base font-medium transition-colors"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto px-4 pb-6">
          <WhatsAppButton
            href={buildWhatsAppUrl(generalWhatsAppMessage())}
            className="w-full"
          >
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
