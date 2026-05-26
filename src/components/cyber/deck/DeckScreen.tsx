"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { ReactNode } from "react"
import {
  bootExitVariants,
  getPanelVariants,
  type TransitionDirection,
} from "./deck-animations"
import { DeckTransitionFX } from "./DeckTransitionFX"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function DeckPanel({
  screenKey,
  direction = "forward",
  children,
  className,
}: {
  screenKey: string
  direction?: TransitionDirection
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  const isBootExit = screenKey === "boot"
  const variants = isBootExit ? bootExitVariants : getPanelVariants(direction)

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={screenKey}
        custom={direction}
        variants={reduced ? undefined : variants}
        initial={reduced ? false : "initial"}
        animate={reduced ? undefined : "animate"}
        exit={reduced ? undefined : "exit"}
        className={className}
      >
        {!reduced && screenKey !== "boot" && (
          <DeckTransitionFX key={`fx-${screenKey}`} />
        )}

        <div
          className="deck-corners pointer-events-none absolute inset-3 z-10 hidden md:block"
          aria-hidden
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
