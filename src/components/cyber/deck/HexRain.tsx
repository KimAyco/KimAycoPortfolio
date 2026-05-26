"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const CHARS = "01アイウエオABCDEF▣◈◎↑↓→◆■□▪"

export function HexRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const FONT_SIZE = 11
    let drops: number[] = []
    let cols = 0

    const init = () => {
      cols = Math.floor(canvas.offsetWidth / FONT_SIZE)
      drops = Array.from({ length: cols }, () => -(Math.random() * 40))
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let raf: number
    let lastTime = 0
    const FPS = 18

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      if (now - lastTime < 1000 / FPS) return
      lastTime = now

      ctx.fillStyle = "rgba(0,26,26,0.12)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * FONT_SIZE
        const x = i * FONT_SIZE

        if (y < 0) { drops[i] += 0.5; continue }

        // leading character — brightest
        ctx.font = `${FONT_SIZE}px monospace`
        ctx.fillStyle = "rgba(220,255,100,0.92)"
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y)

        // secondary (one step back)
        if (y > FONT_SIZE) {
          ctx.fillStyle = "rgba(42,138,122,0.6)"
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - FONT_SIZE)
        }

        // tertiary (faint trail)
        if (y > FONT_SIZE * 3) {
          ctx.fillStyle = "rgba(42,138,122,0.2)"
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - FONT_SIZE * 3)
        }

        if (y > canvas.height && Math.random() > 0.972) {
          drops[i] = -(Math.random() * 30)
        }
        drops[i] += 0.55
      }
    }

    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className ?? ""}`}
      aria-hidden
    />
  )
}
