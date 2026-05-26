"use client"

import { motion } from "framer-motion"

/** Cyber CRT effects played on each screen change */
export function DeckTransitionFX() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden>
      {/* Bright flash */}
      <motion.div
        className="absolute inset-0 bg-primary mix-blend-screen"
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      {/* RGB channel split — fades quickly */}
      <motion.div
        className="absolute inset-0"
        initial={{
          boxShadow:
            "inset 5px 0 0 rgba(255,0,0,0.35), inset -5px 0 0 rgba(0,255,238,0.3)",
        }}
        animate={{
          boxShadow: "inset 0 0 0 transparent",
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />

      {/* Horizontal glitch bands */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `
            linear-gradient(transparent 18%, rgba(255,0,0,0.06) 20%, transparent 22%),
            linear-gradient(transparent 48%, rgba(0,255,238,0.05) 50%, transparent 52%),
            linear-gradient(transparent 72%, rgba(204,255,0,0.04) 74%, transparent 76%)
          `,
        }}
      />

      {/* Scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-12 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent shadow-[0_0_24px_rgba(204,255,0,0.4)]"
        initial={{ top: "-12%" }}
        animate={{ top: "108%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Vertical wipe bar */}
      <motion.div
        className="absolute bottom-0 top-0 w-1 bg-primary/80 shadow-[0_0_16px_#ccff00]"
        initial={{ left: "-2%" }}
        animate={{ left: "102%" }}
        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1], delay: 0.04 }}
      />
    </div>
  )
}
