"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DECK_MODULES, type DeckScreen } from "@/types/deck"

const SCREEN_LABELS: Record<DeckScreen, string> = {
  boot: "INITIALIZING...",
  home: "ROOT://SYS",
  projects: "MODULE://PROJECTS",
  "project-detail": "MODULE://PROJECT_DETAIL",
  capabilities: "MODULE://SKILLS",
  help: "MODULE://FAQ.DAT",
  uplink: "MODULE://OPEN_CHANNEL",
}

const SIGNAL_BARS = 4

function SignalBars({ bars }: { bars: number }) {
  return (
    <span className="inline-flex items-end gap-0.5" aria-label={`Signal ${bars}/${SIGNAL_BARS}`}>
      {Array.from({ length: SIGNAL_BARS }).map((_, i) => (
        <span
          key={i}
          className="inline-block w-[3px] transition-colors"
          style={{
            height: `${5 + i * 2}px`,
            backgroundColor:
              i < bars ? "rgba(204,255,0,0.85)" : "rgba(204,255,0,0.12)",
          }}
        />
      ))}
    </span>
  )
}

function useLiveClock() {
  const fmt = () =>
    new Date().toLocaleTimeString("en-US", { hour12: false })
  const [clock, setClock] = useState(fmt)
  useEffect(() => {
    const id = window.setInterval(() => setClock(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return clock
}

export function StatusBar({
  screen,
  message,
}: {
  screen: DeckScreen
  message?: string
}) {
  const clock = useLiveClock()
  const [signalBars, setSignalBars] = useState(SIGNAL_BARS)

  // Randomly fluctuate signal bars for ambience
  useEffect(() => {
    const id = window.setInterval(() => {
      setSignalBars(Math.random() > 0.85 ? 3 : SIGNAL_BARS)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  const mod = DECK_MODULES.find(
    (m) => m.id === screen || (screen === "project-detail" && m.id === "projects")
  )

  return (
    <footer className="flex h-8 shrink-0 items-center justify-between border-t-2 border-primary/25 bg-[#000808] px-3 font-mono text-[9px] uppercase tracking-wider md:h-9 md:text-[10px]">
      {/* Left: screen label */}
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        <motion.span
          className="h-1.5 w-1.5 shrink-0 bg-primary"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
        <span className="truncate text-primary/75">{SCREEN_LABELS[screen]}</span>
        {mod && screen !== "boot" && (
          <span className="hidden text-primary/25 sm:inline">| {mod.short}</span>
        )}
      </div>

      {/* Right: status items */}
      <div className="flex shrink-0 items-center gap-3 text-muted-foreground md:gap-4">
        {message && (
          <motion.span
            key={message}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-[38vw] truncate text-accent sm:max-w-none"
          >
            {message}
          </motion.span>
        )}
        <span className="hidden items-center gap-1 sm:flex">
          <SignalBars bars={signalBars} />
        </span>
        <span className="tabular-nums text-primary/70">{clock}</span>
        <span className="text-primary">NET:OK</span>
      </div>
    </footer>
  )
}
