"use client"

import { motion } from "framer-motion"
import { useCyberLogs } from "@/hooks/use-cyber-logs"
import { generateCyberLog, type LogLevel } from "@/lib/cyber-logs"
import { cn } from "@/lib/utils"

const LEVEL: Record<LogLevel, string> = {
  info: "text-primary/70",
  ok: "text-primary/90",
  warn: "text-accent/90",
  err: "text-accent",
  sys: "text-muted-foreground/80",
  hex: "text-primary/40",
}

export function SidebarConsole({ enabled }: { enabled: boolean }) {
  const { lines } = useCyberLogs({
    maxLines: 4,
    intervalMs: 2200,
    enabled,
    seed: [generateCyberLog(), generateCyberLog()],
  })

  return (
    <div className="hidden border-t border-primary/20 p-2 md:block">
      <p className="mb-1.5 font-mono text-[8px] uppercase tracking-widest text-primary/30">
        aux_stream
      </p>
      <div className="space-y-1 overflow-hidden">
        {lines.map((line) => (
          <motion.p
            key={line.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn("truncate font-mono text-[8px] leading-tight", LEVEL[line.level])}
          >
            <span className="text-primary/20">{line.timestamp} </span>
            {line.text}
          </motion.p>
        ))}
      </div>
    </div>
  )
}
