"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { CyberLogLine, LogLevel } from "@/lib/cyber-logs"
import { useCyberLogs } from "@/hooks/use-cyber-logs"
import { cn } from "@/lib/utils"

const LEVEL_STYLES: Record<LogLevel, string> = {
  info: "text-primary/90",
  ok: "text-primary",
  warn: "text-accent",
  err: "text-accent",
  sys: "text-muted-foreground",
  hex: "text-secondary-foreground/80",
}

function LogLine({ line, isNew }: { line: CyberLogLine; isNew: boolean }) {
  return (
    <motion.div
      layout
      initial={isNew ? { opacity: 0, x: -6, filter: "blur(2px)" } : false}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.2 }}
      className="flex gap-2 font-mono text-[10px] leading-relaxed md:text-[11px]"
    >
      <span className="shrink-0 tabular-nums text-primary/25">{line.timestamp}</span>
      <span className={cn("min-w-0 break-all", LEVEL_STYLES[line.level])}>
        {line.level === "warn" && <span className="text-accent">!</span>}
        {line.level === "err" && <span className="text-accent">× </span>}
        {line.level === "ok" && <span className="text-primary/50">✓ </span>}
        {line.text}
      </span>
    </motion.div>
  )
}

export function TerminalConsole({
  title = "sys_log.stream",
  maxLines = 10,
  intervalMs = 1200,
  enabled = true,
  seed,
  className,
  compact = false,
}: {
  title?: string
  maxLines?: number
  intervalMs?: number
  enabled?: boolean
  seed?: CyberLogLine[]
  className?: string
  compact?: boolean
}) {
  const { lines } = useCyberLogs({ maxLines, intervalMs, enabled, seed })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [lines])

  return (
    <div
      className={cn(
        "terminal-flicker flex flex-col overflow-hidden border-2 border-primary/30 bg-[#000c0c]/90",
        compact ? "min-h-[100px]" : "min-h-[140px]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-primary/25 bg-[#001818] px-2 py-1">
        <motion.span
          className="h-1.5 w-1.5 bg-primary"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <span className="font-mono text-[9px] uppercase tracking-wider text-primary/70">
          {title}
        </span>
        <span className="ml-auto font-mono text-[8px] text-primary/30">LIVE</span>
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "relative flex-1 overflow-y-auto overflow-x-hidden p-2",
          compact ? "max-h-[120px]" : "max-h-[200px] md:max-h-[220px]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 scanlines opacity-20" />
        <div className="relative space-y-0.5">
          <AnimatePresence initial={false}>
            {lines.map((line, i) => (
              <LogLine
                key={line.id}
                line={line}
                isNew={i === lines.length - 1}
              />
            ))}
          </AnimatePresence>
          <motion.span
            className="inline-block h-3 w-2 bg-primary align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}
