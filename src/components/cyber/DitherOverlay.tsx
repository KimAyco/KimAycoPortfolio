import { useEffect, useRef } from "react"
import { BAYER_4, CYBER_PALETTE } from "@/lib/dither"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function DitherOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const offsetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cell = 4
    const [bgR, bgG, bgB] = CYBER_PALETTE.bg
    const [gridR, gridG, gridB] = CYBER_PALETTE.grid

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    let time = 0
    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      if (reducedMotion) {
        offsetRef.current = { x: 0, y: 0 }
      } else {
        const targetX = (mouseRef.current.x - 0.5) * 12
        const targetY = (mouseRef.current.y - 0.5) * 12
        offsetRef.current.x += (targetX - offsetRef.current.x) * 0.08
        offsetRef.current.y += (targetY - offsetRef.current.y) * 0.08
        time += 0.002
      }

      const ox = Math.floor(offsetRef.current.x)
      const oy = Math.floor(offsetRef.current.y)

      ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`
      ctx.fillRect(0, 0, w, h)

      const cols = Math.ceil(w / cell) + 1
      const rows = Math.ceil(h / cell) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cell + ox
          const y = row * cell + oy
          const threshold = BAYER_4[y % 4][x % 4] / 16
          const show = threshold > 0.35 + Math.sin(time + col * 0.1 + row * 0.1) * 0.05
          if (show) {
            ctx.fillStyle = `rgba(${gridR},${gridG},${gridB},${0.15 + threshold * 0.2})`
            ctx.fillRect(x, y, cell, cell)
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-40 mix-blend-screen"
      aria-hidden
    />
  )
}
