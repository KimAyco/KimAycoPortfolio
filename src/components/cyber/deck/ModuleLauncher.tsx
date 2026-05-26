"use client"

import { motion } from "framer-motion"
import { DECK_MODULES } from "@/types/deck"
import type { DeckScreen } from "@/types/deck"
import { cn } from "@/lib/utils"
import { staggerGrid, staggerItem } from "./deck-animations"

const LAUNCH_MODULES = DECK_MODULES.filter((m) => m.id !== "home")

export function ModuleLauncher({
  onNavigate,
  className,
  fillHeight = false,
}: {
  onNavigate: (s: DeckScreen) => void
  className?: string
  fillHeight?: boolean
}) {
  return (
    <motion.div
      variants={staggerGrid}
      initial="hidden"
      animate="show"
      className={cn(
        "grid grid-cols-2 gap-2",
        fillHeight && "h-full auto-rows-fr",
        className
      )}
    >
      {LAUNCH_MODULES.map((mod) => (
        <motion.button
          key={mod.id}
          type="button"
          variants={staggerItem}
          whileHover={{ scale: 1.02, borderColor: "rgba(204,255,0,0.75)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate(mod.id)}
          className={cn(
            "group relative flex flex-col justify-between border-2 border-primary/20 bg-[#000c0c]/95 p-2.5 text-left sm:p-3",
            "hover:bg-primary/8 hover:shadow-[inset_0_0_24px_rgba(204,255,0,0.06),0_0_16px_rgba(204,255,0,0.1)]",
            fillHeight && "min-h-0 h-full"
          )}
        >
          <div className="flex items-start justify-between gap-1">
            <span className="font-mono text-[10px] tabular-nums text-primary/45">
              {mod.short}
            </span>
            <span className="text-base text-primary/55 transition-colors group-hover:text-primary sm:text-lg">
              {mod.icon}
            </span>
          </div>

          <div className="mt-2">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wide text-primary sm:text-xs">
              {mod.label}
            </p>
            <p className="mt-0.5 hidden font-mono text-[9px] text-muted-foreground sm:block">
              {mod.hint}
            </p>
          </div>

          <span className="absolute bottom-2 right-2 font-mono text-[9px] text-primary/20 group-hover:text-primary/50">
            [{mod.key}]
          </span>
        </motion.button>
      ))}
    </motion.div>
  )
}
