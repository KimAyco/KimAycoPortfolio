"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface Blip {
  angle: number
  radius: number
  life: number
  maxLife: number
}

export function RadarPing({ size = 180 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const R = size / 2 - 6

    const blips: Blip[] = []
    const seedBlips = () => {
      for (let i = 0; i < 4; i++) {
        blips.push({
          angle: Math.random() * Math.PI * 2,
          radius: Math.random() * R * 0.7 + R * 0.15,
          life: Math.random(),
          maxLife: 1,
        })
      }
    }
    seedBlips()

    let sweep = 0
    let raf: number

    const draw = () => {
      // partial clear for motion trails on sweep
      ctx.fillStyle = "rgba(0, 8, 8, 0.25)"
      ctx.fillRect(0, 0, size, size)

      // base circle fill
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R + 3, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 10, 10, 0.6)"
      ctx.fill()
      ctx.restore()

      // grid rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, R * (i / 4), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(42, 138, 122, ${0.1 + i * 0.04})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // cross hairs
      ctx.save()
      ctx.strokeStyle = "rgba(42, 138, 122, 0.18)"
      ctx.lineWidth = 0.5
      ctx.setLineDash([3, 5])
      ctx.beginPath()
      ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R)
      ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()

      // sweep trail — draw overlapping thin sectors fading out
      const TRAIL = Math.PI * 0.55
      for (let i = 0; i < 32; i++) {
        const t = i / 32
        const a0 = sweep - t * TRAIL
        const a1 = a0 + TRAIL / 32
        const alpha = (1 - t) * 0.22
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, R, a0, a1)
        ctx.closePath()
        ctx.fillStyle = `rgba(204,255,0,${alpha})`
        ctx.fill()
      }

      // sweep arm
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R)
      ctx.strokeStyle = "rgba(204,255,0,0.9)"
      ctx.lineWidth = 1.5
      ctx.shadowColor = "#ccff00"
      ctx.shadowBlur = 6
      ctx.stroke()
      ctx.shadowBlur = 0

      // outer ring
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(204,255,0,0.55)"
      ctx.lineWidth = 1.2
      ctx.stroke()

      // center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(204,255,0,1)"
      ctx.shadowColor = "#ccff00"
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.shadowBlur = 0

      // update and draw blips
      for (let i = blips.length - 1; i >= 0; i--) {
        const b = blips[i]
        b.life -= 0.006
        if (b.life <= 0) { blips.splice(i, 1); continue }

        const bx = cx + Math.cos(b.angle) * b.radius
        const by = cy + Math.sin(b.angle) * b.radius
        const a = Math.min(1, b.life * 2.5)

        // blip dot
        ctx.beginPath()
        ctx.arc(bx, by, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(204,255,0,${a})`
        ctx.shadowColor = "#ccff00"
        ctx.shadowBlur = a * 8
        ctx.fill()
        ctx.shadowBlur = 0

        // ripple rings
        const age = (1 - b.life / b.maxLife)
        ctx.beginPath()
        ctx.arc(bx, by, 2.8 + age * 14, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(204,255,0,${a * 0.18})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // randomly spawn new blip when sweep passes
      if (Math.random() < 0.018) {
        blips.push({
          angle: sweep + (Math.random() - 0.5) * 0.25,
          radius: Math.random() * R * 0.72 + R * 0.12,
          life: 1,
          maxLife: 1,
        })
      }

      sweep += 0.022
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [reduced, size])

  if (reduced) {
    return (
      <div
        className="flex items-center justify-center border border-primary/20 bg-[#000808]"
        style={{ width: size, height: size }}
      >
        <span className="font-mono text-[9px] text-primary/30">RADAR_OFFLINE</span>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="block"
      aria-hidden
    />
  )
}
