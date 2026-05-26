import type { Transition, Variants } from "framer-motion"

export type TransitionDirection = "forward" | "back" | "none"

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const EASE_IN = [0.4, 0, 0.85, 0.2] as const

export function getPanelVariants(direction: TransitionDirection = "forward"): Variants {
  const enterX = direction === "back" ? -56 : 56
  const exitX = direction === "back" ? 40 : -40

  return {
    initial: {
      opacity: 0,
      x: direction === "none" ? 0 : enterX,
      scale: 0.97,
      filter: "blur(12px) brightness(1.4)",
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      transition: {
        duration: 0.52,
        ease: EASE_OUT,
        opacity: { duration: 0.35 },
        filter: { duration: 0.45 },
      },
    },
    exit: {
      opacity: 0,
      x: direction === "none" ? 0 : exitX,
      scale: 0.98,
      filter: "blur(10px) brightness(0.7)",
      transition: {
        duration: 0.32,
        ease: EASE_IN,
      },
    },
  }
}

export const bootExitVariants: Variants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 1.03,
    filter: "blur(6px) brightness(2)",
    transition: { duration: 0.55, ease: EASE_IN },
  },
}

export const glitchVariants: Variants = {
  initial: { opacity: 0, scale: 0.94, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(4px)",
    transition: { duration: 0.28 },
  },
}

export const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: EASE_OUT },
  },
}

export const bootLineVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.22, ease: EASE_OUT },
  }),
}

export const viewHeaderVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT, delay: 0.12 },
  },
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

export const springTransition: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
}
