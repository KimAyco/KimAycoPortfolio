"use client"

import { motion } from "framer-motion"
import { faqItems } from "@/data/portfolio"
import { FaqAccordion } from "@/components/cyber/FaqAccordion"
import { TerminalConsole } from "@/components/cyber/TerminalConsole"
import { viewHeaderVariants } from "../deck-animations"

export function HelpView() {
  return (
    <div className="flex h-full flex-col overflow-y-auto p-4 md:p-5">
      <motion.header
        variants={viewHeaderVariants}
        initial="hidden"
        animate="show"
        className="mb-4 shrink-0 border-b border-primary/20 pb-3"
      >
        <p className="font-mono text-[10px] text-accent">// MODULE_04</p>
        <h2 className="font-mono text-2xl font-bold uppercase text-glow-primary text-primary">
          FAQ.dat
        </h2>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
          {">"} Expand entries for system help
        </p>
      </motion.header>

      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="min-w-0">
          <FaqAccordion items={faqItems} />
        </div>

        {/* Side panel */}
        <div className="hidden space-y-3 md:block">
          <div className="border border-primary/20 bg-[#000c0c] p-3">
            <p className="mb-2 font-mono text-[8px] uppercase tracking-widest text-primary/40">sys_help</p>
            <div className="space-y-1.5 font-mono text-[10px] text-muted-foreground">
              {[
                ["[1]", "ROOT"],
                ["[2]", "PROJECTS"],
                ["[3]", "SKILLS"],
                ["[4]", "FAQ"],
                ["[5]", "UPLINK"],
                ["[ESC]", "HOME"],
              ].map(([key, label]) => (
                <div key={key} className="flex gap-2">
                  <motion.span
                    className="text-primary/60 tabular-nums"
                    whileHover={{ color: "rgba(204,255,0,1)" }}
                  >
                    {key}
                  </motion.span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <TerminalConsole
            title="help.stream"
            maxLines={5}
            intervalMs={2000}
            compact
          />
        </div>
      </div>
    </div>
  )
}
