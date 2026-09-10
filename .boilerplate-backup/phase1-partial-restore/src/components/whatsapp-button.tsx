import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

const whatsAppButtonVariants = cva(
  "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
  {
    variants: {
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-3 text-sm",
        lg: "px-6 py-3.5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface WhatsAppButtonProps
  extends ComponentPropsWithoutRef<"a">,
    VariantProps<typeof whatsAppButtonVariants> {}

/** Anchor styled as WhatsApp's brand button. Always opens in a new tab. */
export function WhatsAppButton({
  size,
  className,
  children,
  ...props
}: WhatsAppButtonProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={whatsAppButtonVariants({ size, className })}
      {...props}
    >
      {children}
    </a>
  );
}
