"use client"

import { motion } from "framer-motion"
import { features, stats } from "@/data/portfolio"
import { CountUp } from "@/components/cyber/CountUp"
import { staggerGrid, staggerItem, viewHeaderVariants } from "../deck-animations"

const SKILLS = [
  { label: "Python / ML", level: 88 },
  { label: "React / TypeScript", level: 92 },
  { label: "Node.js / APIs", level: 80 },
  { label: "Computer Vision", level: 78 },
  { label: "UI / UX Design", level: 75 },
  { label: "Docker / DevOps", level: 68 },
]

function SkillBar({ label, level, delay = 0 }: { label: string; level: number; delay?: number }) {
  const hot = level >= 85
  return (
    <div className="space-y-1">
      <div className="flex justify-between font-mono text-[10px]">
        <span className="text-muted-foreground">{label}</span>
        <span className={hot ? "text-primary font-bold" : "text-primary/70"}>{level}%</span>
      </div>
      <div className="relative h-2 overflow-hidden border border-primary/20 bg-[#001010]">
        <motion.div
          className={
            hot
              ? "h-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.55)]"
              : "h-full bg-primary/60"
          }
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
        {/* Segment ticks */}
        {[25, 50, 75].map((tick) => (
          <div
            key={tick}
            className="absolute top-0 h-full w-px bg-black/50"
            style={{ left: `${tick}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function CapabilitiesView() {
  return (
    <div className="flex h-full flex-col overflow-y-auto p-4 md:p-5">
      <motion.header
        variants={viewHeaderVariants}
        initial="hidden"
        animate="show"
        className="mb-4 shrink-0 border-b border-primary/20 pb-3"
      >
        <p className="font-mono text-[10px] text-accent">// MODULE_03</p>
        <h2 className="font-mono text-2xl font-bold uppercase text-glow-primary text-primary">
          SKILL MATRIX
        </h2>
      </motion.header>

      {/* Stat counters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="animate-neon-pulse border-2 border-primary/30 bg-[#000e0e] p-3 text-center"
            style={{ animationDelay: `${Math.random() * 2}s` }}
          >
            <div className="font-mono text-2xl font-bold tabular-nums text-glow-primary text-primary md:text-3xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Two-col layout on md+ */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Skill bars */}
        <div className="space-y-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-primary/40">proficiency_index</p>
          {SKILLS.map((s, i) => (
            <SkillBar key={s.label} label={s.label} level={s.level} delay={i * 0.1} />
          ))}
        </div>

        {/* Capability cards */}
        <div>
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-primary/40">loaded_modules</p>
          <motion.div
            variants={staggerGrid}
            initial="hidden"
            animate="show"
            className="grid gap-2"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                whileHover={{ borderColor: "rgba(204,255,0,0.7)", x: 2 }}
                className="border border-primary/20 bg-card/50 px-3 py-2.5 transition-shadow hover:shadow-[0_0_14px_rgba(204,255,0,0.07)]"
              >
                <p className="font-mono text-[10px] font-bold uppercase text-primary">{f.title}</p>
                <p className="mt-0.5 font-mono text-[9px] leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
