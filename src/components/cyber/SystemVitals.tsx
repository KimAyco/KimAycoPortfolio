"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const VITALS = [
  { label: "CPU", min: 14, max: 82 },
  { label: "MEM", min: 38, max: 88 },
  { label: "NET", min: 5, max: 98 },
  { label: "GPU", min: 8, max: 65 },
]

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function VitalBar({
  label,
  pct,
  compact,
}: {
  label: string
  pct: number
  compact?: boolean
}) {
  const hot = pct > 72
  return (
    <div className={cn("flex items-center gap-2", compact && "flex-col items-stretch gap-1")}>
      <div className={cn("flex items-center gap-2", compact && "justify-between")}>
        <span className="text-[9px] text-primary/50">{label}</span>
        {!compact && (
          <span
            className={cn(
              "w-8 text-right text-[9px] tabular-nums",
              hot ? "text-accent" : "text-primary/70"
            )}
          >
            {pct}%
          </span>
        )}
      </div>
      <div className="relative h-1.5 overflow-hidden border border-primary/15 bg-[#001010]">
        <motion.div
          className={
            hot
              ? "h-full bg-accent shadow-[0_0_6px_rgba(255,0,0,0.5)]"
              : "h-full bg-primary shadow-[0_0_6px_rgba(204,255,0,0.35)]"
          }
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </div>
      {compact && (
        <span
          className={cn(
            "text-right text-[9px] tabular-nums",
            hot ? "text-accent" : "text-primary/60"
          )}
        >
          {pct}%
        </span>
      )}
    </div>
  )
}

export function SystemVitals({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState(() =>
    VITALS.map((v) => randomBetween(v.min, v.max))
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      setValues((prev) =>
        prev.map((val, i) => {
          const { min, max } = VITALS[i]
          const delta = (Math.random() - 0.44) * 18
          return Math.min(max, Math.max(min, Math.round(val + delta)))
        })
      )
    }, 1600)
    return () => window.clearInterval(id)
  }, [])

  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono sm:grid-cols-4">
        {VITALS.map((v, i) => (
          <VitalBar key={v.label} label={v.label} pct={values[i]} compact />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2 font-mono">
      <p className="mb-2 text-[8px] uppercase tracking-widest text-primary/40">sys_vitals</p>
      {VITALS.map((v, i) => (
        <VitalBar key={v.label} label={v.label} pct={values[i]} />
      ))}
    </div>
  )
}
