import { useEffect, useRef } from "react"
import { ditherImageData } from "@/lib/dither"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function DitheredImage({
  src,
  alt,
  className,
  cellSize = 3,
}: {
  src: string
  alt: string
  className?: string
  cellSize?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useMousePosition()
  const reducedMotion = useReducedMotion()
  const imageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    img.onload = () => {
      imageRef.current = img
      render()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  useEffect(() => {
    render()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouse.x, mouse.y, reducedMotion])

  const render = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const img = imageRef.current
    if (!canvas || !container || !img) return

    const rect = container.getBoundingClientRect()
    const w = Math.floor(rect.width) || 400
    const h = Math.floor(rect.height) || 400

    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const scale = Math.max(w / img.width, h / img.height)
    const sw = img.width * scale
    const sh = img.height * scale
    const sx = (w - sw) / 2
    const sy = (h - sh) / 2

    ctx.drawImage(img, sx, sy, sw, sh)

    const imageData = ctx.getImageData(0, 0, w, h)
    ditherImageData(imageData, cellSize)
    ctx.putImageData(imageData, 0, 0)

    if (!reducedMotion) {
      const containerRect = container.getBoundingClientRect()
      const mx = mouse.x * window.innerWidth - containerRect.left
      const my = mouse.y * window.innerHeight - containerRect.top
      const cx = w * 0.55
      const cy = h * 0.42
      const dist = Math.hypot(mx - cx, my - cy)
      const radius = Math.min(w, h) * 0.35
      if (dist < radius) {
        const intensity = 1 - dist / radius
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        gradient.addColorStop(0, `rgba(204, 255, 0, ${0.25 * intensity})`)
        gradient.addColorStop(0.5, `rgba(204, 255, 0, ${0.08 * intensity})`)
        gradient.addColorStop(1, "rgba(204, 255, 0, 0)")
        ctx.globalCompositeOperation = "screen"
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
        ctx.globalCompositeOperation = "source-over"
      }
    }
  }

  useEffect(() => {
    const ro = new ResizeObserver(() => render())
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className={cn("relative h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        className="image-rendering-pixelated h-full w-full object-contain"
        role="img"
        aria-label={alt}
      />
    </div>
  )
}
