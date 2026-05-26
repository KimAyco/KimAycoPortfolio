import * as React from "react"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value = 0,
  ...props
}: React.ComponentProps<"div"> & { value?: number }) {
  const clamped = Math.min(100, Math.max(0, value))
  const segments = 20
  const filled = Math.round((clamped / 100) * segments)

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("flex h-3 w-full gap-0.5", className)}
      {...props}
    >
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-full flex-1 transition-colors duration-300",
            i < filled ? "bg-primary shadow-[0_0_6px_rgba(204,255,0,0.4)]" : "bg-secondary/50"
          )}
        />
      ))}
    </div>
  )
}

export { Progress }
