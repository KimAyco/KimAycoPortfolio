import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-none border px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-wider w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-primary/50 bg-primary/10 text-primary [a&]:hover:bg-primary/20",
        secondary: "border-secondary text-secondary-foreground bg-secondary/30 [a&]:hover:bg-secondary/50",
        destructive: "border-destructive/50 bg-destructive/10 text-destructive [a&]:hover:bg-destructive/20",
        outline: "border-primary/30 text-foreground [a&]:hover:bg-primary/5",
        accent: "border-accent/50 bg-accent/10 text-accent [a&]:hover:bg-accent/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
