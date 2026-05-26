export type DeckScreen =
  | "boot"
  | "home"
  | "projects"
  | "project-detail"
  | "capabilities"
  | "help"
  | "uplink"

export interface DeckModule {
  id: DeckScreen
  label: string
  short: string
  icon: string
  hint: string
  key: string
}

export const DECK_MODULES: DeckModule[] = [
  { id: "home", label: "ROOT", short: "01", icon: "◈", hint: "System hub", key: "1" },
  { id: "projects", label: "PROJECTS", short: "02", icon: "▣", hint: "Archive", key: "2" },
  { id: "capabilities", label: "SKILLS", short: "03", icon: "◎", hint: "Matrix", key: "3" },
  { id: "help", label: "HELP", short: "04", icon: "?", hint: "FAQ.dat", key: "4" },
  { id: "uplink", label: "UPLINK", short: "05", icon: "↑", hint: "Contact", key: "5" },
]

export const NAVIGABLE_SCREENS = DECK_MODULES.map((m) => m.id)
