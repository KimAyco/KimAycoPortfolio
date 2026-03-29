"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="h-full w-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function BackgroundPaths({
  title = "Background Paths",
  subtitle,
  profileImageSrc,
  profileImageAlt = "Profile photo",
  children,
}: {
  title?: string
  subtitle?: string
  profileImageSrc?: string
  profileImageAlt?: string
  children?: ReactNode
}) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-radial-[ellipse_at_center] from-white/12 via-transparent to-transparent dark:from-white/8" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_75%)]" />

      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:gap-12 md:px-6 md:py-24">
        <div className="order-1 mx-auto w-full max-w-[18rem] sm:max-w-[22rem] md:order-2 md:max-w-md">
          {profileImageSrc ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_60%)] blur-2xl" />
              <div className="relative aspect-square w-full rounded-full border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent" />
                <img
                  src={profileImageSrc}
                  alt={profileImageAlt}
                  className="relative z-10 h-full w-full rounded-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </motion.div>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 mx-auto max-w-xl text-center md:order-1 md:mx-0 md:text-left"
        >
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {subtitle ? (
            <p className="mt-5 max-w-prose text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  )
}

