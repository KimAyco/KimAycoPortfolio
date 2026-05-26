import type { DeckScreen } from "@/types/deck"
import type { TransitionDirection } from "@/components/cyber/deck/deck-animations"

/** Order used for slide direction (left = back, right = forward) */
const SCREEN_ORDER: Record<DeckScreen, number> = {
  boot: -1,
  home: 0,
  projects: 1,
  "project-detail": 2,
  capabilities: 3,
  help: 4,
  uplink: 5,
}

export function getTransitionDirection(
  from: DeckScreen,
  to: DeckScreen
): TransitionDirection {
  if (from === to) return "none"
  if (from === "boot" || to === "boot") return "forward"

  const fromOrder = SCREEN_ORDER[from]
  const toOrder = SCREEN_ORDER[to]

  if (toOrder > fromOrder) return "forward"
  if (toOrder < fromOrder) return "back"
  return "none"
}
