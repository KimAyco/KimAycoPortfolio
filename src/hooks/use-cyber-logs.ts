import { useCallback, useEffect, useRef, useState } from "react"
import { generateCyberLog, type CyberLogLine } from "@/lib/cyber-logs"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function useCyberLogs({
  maxLines = 12,
  intervalMs = 1400,
  enabled = true,
  seed = [] as CyberLogLine[],
}: {
  maxLines?: number
  intervalMs?: number
  enabled?: boolean
  seed?: CyberLogLine[]
}) {
  const reduced = useReducedMotion()
  const [lines, setLines] = useState<CyberLogLine[]>(seed)
  const intervalRef = useRef<number | undefined>(undefined)

  const push = useCallback(
    (line?: CyberLogLine) => {
      const entry = line ?? generateCyberLog()
      setLines((prev) => [...prev.slice(-(maxLines - 1)), entry])
    },
    [maxLines]
  )

  useEffect(() => {
    if (seed.length > 0) setLines(seed.slice(-maxLines))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- seed once

  useEffect(() => {
    if (!enabled || reduced) return

    const tick = () => {
      push()
      const jitter = randomInt(-400, 600)
      intervalRef.current = window.setTimeout(tick, intervalMs + jitter)
    }

    intervalRef.current = window.setTimeout(tick, intervalMs * 0.5)

    return () => {
      if (intervalRef.current) window.clearTimeout(intervalRef.current)
    }
  }, [enabled, reduced, intervalMs, push])

  return { lines, push }
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
