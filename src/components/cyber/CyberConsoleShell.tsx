import type { ReactNode } from "react"
import { DitherOverlay } from "./DitherOverlay"
import { ScanlineOverlay } from "./ScanlineOverlay"

export function CyberConsoleShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen cyber-cursor">
      <DitherOverlay />
      <ScanlineOverlay />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
