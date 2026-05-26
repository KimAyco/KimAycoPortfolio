import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function TypewriterText({
  text,
  className,
  speed = 45,
  delay = 0,
  showCursor = true,
}: {
  text: string
  className?: string
  speed?: number
  delay?: number
  showCursor?: boolean
}) {
  const reducedMotion = useReducedMotion()
  const [displayed, setDisplayed] = useState(reducedMotion ? text : "")
  const [done, setDone] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text)
      setDone(true)
      return
    }

    setDisplayed("")
    setDone(false)
    let i = 0
    let intervalId: number
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          window.clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [text, speed, delay, reducedMotion])

  return (
    <span className={cn(className)}>
      {displayed}
      {showCursor && !done && (
        <span className="inline-block w-[0.55em] bg-primary animate-cursor-blink" aria-hidden>
          &nbsp;
        </span>
      )}
    </span>
  )
}
