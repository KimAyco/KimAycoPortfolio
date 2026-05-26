"use client"

import { motion } from "framer-motion"
import { projects, type Project } from "@/data/portfolio"
import { GlitchCard } from "@/components/cyber/GlitchCard"
import { Progress } from "@/components/ui/progress"
import { staggerGrid, staggerItem, viewHeaderVariants } from "../deck-animations"

export function ProjectsView({
  onSelectProject,
}: {
  onSelectProject: (project: Project) => void
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden p-4 md:p-6">
      <motion.header
        variants={viewHeaderVariants}
        initial="hidden"
        animate="show"
        className="mb-3 shrink-0 space-y-1 border-b border-primary/20 pb-3"
      >
        <p className="font-mono text-[10px] text-accent">// MODULE_02</p>
        <h2 className="font-mono text-2xl font-bold uppercase text-glow-primary text-primary">
          PROJECT ARCHIVE
        </h2>
        <p className="font-mono text-xs text-muted-foreground">
          {">"} Select node — [ESC] returns to root
        </p>
      </motion.header>

      <motion.div
        variants={staggerGrid}
        initial="hidden"
        animate="show"
        className="grid flex-1 auto-rows-min gap-3 overflow-y-auto pb-2 md:grid-cols-2"
      >
        {projects.map((project, index) => {
          const isCert = project.kind === "certificate"
          return (
            <motion.button
              key={project.id}
              type="button"
              variants={staggerItem}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectProject(project)}
              className="text-left"
            >
              <GlitchCard className="h-full">
                <div className="flex h-full overflow-hidden border-2 border-primary/30 bg-card md:flex-row">
                  <div
                    className={`relative h-32 w-full shrink-0 overflow-hidden border-b border-primary/20 md:h-auto md:w-36 md:border-b-0 md:border-r ${
                      isCert ? "bg-[#0a0a12]" : ""
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className={
                        isCert
                          ? "h-full w-full object-contain object-center p-1"
                          : "image-rendering-pixelated h-full w-full object-cover contrast-125 saturate-50"
                      }
                    />
                    {!isCert && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#001818]/80 md:bg-gradient-to-t md:from-[#001818]" />
                    )}
                    <span className="absolute left-2 top-2 font-mono text-[10px] text-primary">
                      {isCert ? "CERT" : `NODE_${String(index + 1).padStart(2, "0")}`}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="font-mono text-sm font-bold uppercase text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between font-mono text-[9px] text-muted-foreground">
                        <span>{isCert ? "STATUS" : "SYNC"}</span>
                        <span className="text-primary">
                          {isCert ? "VERIFIED" : `${project.progress}%`}
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <p className="mt-2 font-mono text-[9px] uppercase text-primary/50">
                      [ ENTER ] inspect →
                    </p>
                  </div>
                </div>
              </GlitchCard>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
