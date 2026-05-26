"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type GlitchState = "idle" | "glitch" | "scanpass"

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

export function GlitchCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [state, setState] = useState<GlitchState>("idle")
  const reduced = useReducedMotion()
  const timerRef = useRef<number>(0)

  const triggerGlitch = () => {
    if (reduced || state !== "idle") return
    const seq: GlitchState[] = Math.random() > 0.5 ? ["glitch", "idle"] : ["scanpass", "idle"]
    setState(seq[0])
    timerRef.current = window.setTimeout(
      () => setState("idle"),
      seq[0] === "glitch" ? randomBetween(180, 320) : randomBetween(250, 400)
    )
  }

  // Autonomous random glitch bursts
  useEffect(() => {
    if (reduced) return
    const schedule = () => {
      timerRef.current = window.setTimeout(
        () => {
          triggerGlitch()
          schedule()
        },
        randomBetween(4000, 11000)
      )
    }
    schedule()
    return () => window.clearTimeout(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  const isGlitch = state === "glitch" && !reduced
  const isScan = state === "scanpass" && !reduced

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      onHoverStart={triggerGlitch}
      animate={
        isGlitch
          ? { x: [0, -3, 2, -2, 3, -1, 0], skewX: [0, -0.5, 0.5, 0] }
          : { x: 0, skewX: 0 }
      }
      transition={{ duration: 0.28, ease: "easeInOut" }}
    >
      {/* RGB channel split layers */}
      {isGlitch && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              boxShadow: "inset 3px 0 0 rgba(255,0,0,0.45), inset -3px 0 0 rgba(0,255,238,0.35)",
              mixBlendMode: "screen",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-60"
            style={{
              background:
                "linear-gradient(transparent 38%, rgba(255,0,0,0.07) 40%, rgba(255,0,0,0.07) 44%, transparent 46%)",
              transform: "translateX(3px)",
              mixBlendMode: "screen",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-50"
            style={{
              background:
                "linear-gradient(transparent 55%, rgba(0,255,238,0.06) 57%, rgba(0,255,238,0.06) 60%, transparent 62%)",
              transform: "translateX(-2px)",
              mixBlendMode: "screen",
            }}
            aria-hidden
          />
        </>
      )}

      {/* Scan line sweep */}
      {isScan && (
        <motion.div
          className="pointer-events-none absolute left-0 right-0 z-30 h-0.5 bg-primary/60"
          style={{ boxShadow: "0 0 8px rgba(204,255,0,0.6)" }}
          initial={{ top: "-2px" }}
          animate={{ top: "102%" }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          aria-hidden
        />
      )}

      {children}
    </motion.div>
  )
}
