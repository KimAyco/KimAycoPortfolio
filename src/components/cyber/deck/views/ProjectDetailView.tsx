"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Cpu } from "lucide-react"
import type { Project } from "@/data/portfolio"
import { GlitchCard } from "@/components/cyber/GlitchCard"
import { TerminalConsole } from "@/components/cyber/TerminalConsole"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { glitchVariants } from "../deck-animations"

export function ProjectDetailView({
  project,
  onBack,
}: {
  project: Project
  onBack: () => void
}) {
  const isCert = project.kind === "certificate"

  return (
    <motion.div
      variants={glitchVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-full flex-col overflow-hidden p-3 md:p-5"
    >
      <Button
        variant="ghost"
        size="sm"
        className="mb-3 w-fit gap-2"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        RETURN TO ARCHIVE
      </Button>

      <GlitchCard className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col border-2 border-primary/40 bg-card overflow-hidden md:flex-row">

          {/* ── Image panel ──────────────────────────────────────── */}
          <div
            className={`relative shrink-0 overflow-hidden border-b border-primary/20 md:w-2/5 md:border-b-0 md:border-r ${
              isCert ? "bg-[#0a0a12]" : ""
            }`}
          >
            <motion.img
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55 }}
              src={project.image}
              alt={project.title}
              className={
                isCert
                  ? "h-48 w-full object-contain object-center p-2 md:h-full md:min-h-[280px]"
                  : "image-rendering-pixelated h-40 w-full object-cover contrast-125 saturate-50 md:h-full"
              }
            />
            {!isCert && (
              <>
                <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000e0e]/80 md:bg-gradient-to-r md:from-transparent md:to-[#000e0e]/60" />
                <div className="pointer-events-none absolute left-0 right-0 h-0.5 bg-primary/30 animate-scan-sweep blur-[1px]" />
              </>
            )}
            <span className="absolute left-2 top-2 border border-primary/40 bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-primary">
              {isCert ? "CERTIFICATE" : `NODE_${String(project.id).padStart(2, "0")}`}
            </span>
          </div>

          {/* ── Info panel ───────────────────────────────────────── */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-[10px] text-accent">
                  {isCert ? "ARCHIVE // CERTIFICATE" : "DEPLOYMENT // ACTIVE"}
                </p>
                <h2 className="mt-0.5 font-mono text-xl font-bold uppercase text-glow-primary text-primary sm:text-2xl">
                  {project.title}
                </h2>
              </div>
              <Cpu className="mt-1 h-5 w-5 shrink-0 text-primary/30" />
            </div>

            <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05, borderColor: "rgba(204,255,0,0.7)" }}
                  className="inline-block border border-primary/30 px-2 py-0.5 font-mono text-[9px] uppercase text-primary/70 transition-colors hover:text-primary"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Completion bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>{isCert ? "VERIFICATION" : "COMPLETION_INDEX"}</span>
                <span className="text-primary font-bold">
                  {isCert ? "VERIFIED" : `${project.progress}%`}
                </span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            {!isCert && (
              <div className="mt-4">
                <TerminalConsole
                  title={`${project.title.toLowerCase().replace(/\s/g, "_")}.log`}
                  maxLines={4}
                  intervalMs={1300}
                  compact
                />
              </div>
            )}

            {!isCert && (
              <div className="mt-4 pt-2">
                {project.url ? (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      LAUNCH DEPLOYMENT
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="w-full sm:w-auto">
                    DEPLOYMENT PENDING
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </GlitchCard>
    </motion.div>
  )
}
