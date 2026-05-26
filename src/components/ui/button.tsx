import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-sm font-medium uppercase tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border-2 border-primary bg-primary/10 text-primary shadow-[0_0_12px_rgba(204,255,0,0.2)] hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(204,255,0,0.35)]",
        destructive:
          "border-2 border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20",
        outline:
          "border-2 border-primary/50 bg-transparent text-primary hover:border-primary hover:bg-primary/10",
        secondary:
          "border border-secondary bg-secondary/50 text-secondary-foreground hover:bg-secondary",
        ghost:
          "border border-transparent text-primary hover:border-primary/30 hover:bg-primary/5",
        link: "text-primary underline-offset-4 hover:underline border-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
