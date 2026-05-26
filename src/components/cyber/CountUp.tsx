import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function CountUp({
  value,
  suffix = "",
  duration = 1200,
}: {
  value: string
  suffix?: string
  duration?: number
}) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(reducedMotion ? value : "0")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (reducedMotion) {
      setDisplay(value)
      return
    }

    const numeric = parseInt(value.replace(/\D/g, ""), 10)
    if (Number.isNaN(numeric)) {
      setDisplay(value)
      return
    }

    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const current = Math.floor(numeric * t)
      setDisplay(`${current}${suffix}`)
      if (t < 1) requestAnimationFrame(tick)
      else setDisplay(value)
    }
    requestAnimationFrame(tick)
  }, [started, value, suffix, duration, reducedMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  )
}
