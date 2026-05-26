const PROJECT_NODES = ["SignSpeak", "FINSNAP", "AUTOPRINT", "VerVin_Cam", "visor_uplink"]
const MODULES = ["ROOT", "PROJECTS", "SKILLS", "HELP", "UPLINK"]

export type LogLevel = "info" | "ok" | "warn" | "sys" | "hex" | "err"

export interface CyberLogLine {
  id: string
  text: string
  level: LogLevel
  timestamp: string
}

function pad(n: number, len = 2) {
  return String(n).padStart(len, "0")
}

function timeStamp() {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomHex(bytes: number) {
  return Array.from({ length: bytes }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase()
  ).join(" ")
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const GENERATORS: (() => { text: string; level: LogLevel })[] = [
  () => ({ text: `ping node_${pad(randomInt(1, 99))}... OK (${randomInt(4, 48)}ms)`, level: "ok" }),
  () => ({ text: `ping node_${pad(randomInt(1, 99))}... TIMEOUT`, level: "warn" }),
  () => ({
    text: `mount /dev/archive/${pick(PROJECT_NODES).toLowerCase()} [RO]`,
    level: "info",
  }),
  () => ({
    text: `dither_engine frame=${randomInt(24, 120)} buffer=OK`,
    level: "sys",
  }),
  () => ({
    text: `neural_link handshake v${randomInt(1, 3)}.${randomInt(0, 9)}`,
    level: "info",
  }),
  () => ({
    text: `heap free ${randomInt(128, 890)}kb / ${randomInt(900, 1024)}kb`,
    level: "sys",
  }),
  () => ({
    text: `scan sector 0x${randomInt(0, 255).toString(16).toUpperCase()}... clean`,
    level: "ok",
  }),
  () => ({
    text: `WARN: packet loss ${randomInt(1, 12)}% on uplink`,
    level: "warn",
  }),
  () => ({
    text: `module::${pick(MODULES)} loaded (${randomInt(2, 40)}ms)`,
    level: "ok",
  }),
  () => ({
    text: `visor_bloom intensity ${(Math.random() * 0.8 + 0.1).toFixed(2)}`,
    level: "sys",
  }),
  () => ({
    text: `CRC check ${randomInt(100000, 999999).toString(16).toUpperCase()} PASS`,
    level: "ok",
  }),
  () => ({
    text: `ERR: retry sync/${pick(PROJECT_NODES)} [${randomInt(1, 3)}/3]`,
    level: "err",
  }),
  () => ({
    text: `decrypt keyblock [${randomHex(4)} ${randomHex(4)} ...]`,
    level: "hex",
  }),
  () => ({
    text: `0x${pad(randomInt(0, 65535), 4)} | ${randomHex(8)} ${randomHex(8)}`,
    level: "hex",
  }),
  () => ({
    text: `auth token refresh... OK`,
    level: "ok",
  }),
  () => ({
    text: `listening on :${randomInt(3000, 9999)} (secure)`,
    level: "info",
  }),
  () => ({
    text: `glitch_filter armed threshold=${randomInt(1, 9)}`,
    level: "sys",
  }),
  () => ({
    text: `archive sync ${randomInt(10, 99)}% complete`,
    level: "info",
  }),
]

export function generateCyberLog(): CyberLogLine {
  const gen = pick(GENERATORS)
  const { text, level } = gen()
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text,
    level,
    timestamp: timeStamp(),
  }
}

export const BOOT_LOG_SEED: CyberLogLine[] = [
  { id: "b1", text: "POST memory test........ OK", level: "ok", timestamp: "00:00:01" },
  { id: "b2", text: "loading dither_matrix.bin", level: "info", timestamp: "00:00:02" },
  { id: "b3", text: "0x4F2A | A3 B1 00 FF C2 11 9E 7D", level: "hex", timestamp: "00:00:02" },
  { id: "b4", text: "mount cyberdeck rootfs", level: "sys", timestamp: "00:00:03" },
  { id: "b5", text: "visor_uplink driver started", level: "ok", timestamp: "00:00:04" },
]
