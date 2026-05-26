import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function ScanlineOverlay() {
  const reducedMotion = useReducedMotion()

  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-[2] scanlines",
          !reducedMotion && "animate-scanline-flicker"
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-[2] crt-vignette"
        aria-hidden
      />
    </>
  )
}
