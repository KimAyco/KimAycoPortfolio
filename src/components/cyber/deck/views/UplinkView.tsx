"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TerminalConsole } from "@/components/cyber/TerminalConsole"
import { viewHeaderVariants } from "../deck-animations"

const CONTACTS = [
  {
    icon: Mail,
    label: "EMAIL",
    value: "kimayco1@gmail.com",
    href: "mailto:kimayco1@gmail.com",
  },
  {
    icon: Globe,
    label: "GITHUB",
    value: "github.com/KimAyco",
    href: "https://github.com/KimAyco",
  },
]

function TransmitAnimation({ onDone }: { onDone: () => void }) {
  const lines = [
    ">> Encrypting payload...",
    ">> Opening secure channel...",
    ">> Handshake v2.1 OK",
    ">> Transmitting 1.2kb...",
    ">> ACK received from node",
    ">> TRANSMISSION COMPLETE ✓",
  ]
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= lines.length) {
      const t = window.setTimeout(onDone, 600)
      return () => clearTimeout(t)
    }
    const t = window.setTimeout(() => setShown((s) => s + 1), 280)
    return () => clearTimeout(t)
  }, [shown]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="border border-primary/30 bg-[#000c0c] p-3 font-mono text-[10px] space-y-1">
      {lines.slice(0, shown).map((l, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className={i === lines.length - 1 ? "text-primary font-bold" : "text-muted-foreground"}
        >
          {l}
        </motion.p>
      ))}
    </div>
  )
}

export function UplinkView() {
  const [status, setStatus] = useState<"idle" | "sending" | "ack">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (status !== "idle") return
    setStatus("sending")
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto p-4 md:p-5">
      <motion.header
        variants={viewHeaderVariants}
        initial="hidden"
        animate="show"
        className="mb-4 shrink-0 border-b border-primary/20 pb-3"
      >
        <p className="font-mono text-[10px] text-accent">// MODULE_05</p>
        <h2 className="font-mono text-2xl font-bold uppercase text-glow-primary text-primary">
          OPEN CHANNEL
        </h2>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
          {">"} Initialize secure uplink transmission
        </p>
      </motion.header>

      <div className="grid flex-1 gap-4 md:grid-cols-[200px_1fr]">
        {/* Contact nodes */}
        <div className="space-y-2">
          <p className="font-mono text-[8px] uppercase tracking-widest text-primary/40">contact_nodes</p>
          {CONTACTS.map(({ icon: Icon, label, value, href }) => (
            <motion.a
              key={label}
              href={href ?? undefined}
              target={href ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ x: 3, borderColor: "rgba(204,255,0,0.6)" }}
              className="flex items-center gap-2.5 border border-primary/20 bg-[#000c0c] p-2.5 font-mono transition-colors hover:bg-primary/5"
              style={{ cursor: href ? "pointer" : "default", textDecoration: "none" }}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary/60" />
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-widest text-primary/40">{label}</p>
                <p className="truncate text-[10px] text-primary/80">{value}</p>
              </div>
            </motion.a>
          ))}

          {/* Signal strength display */}
          <div className="mt-3 border border-primary/15 bg-[#000808] p-2.5">
            <p className="mb-2 font-mono text-[8px] uppercase tracking-widest text-primary/40">signal</p>
            <TerminalConsole
              title="uplink.stream"
              maxLines={3}
              intervalMs={1800}
              compact
            />
          </div>
        </div>

        {/* Transmit form */}
        <div className="border border-primary/20 bg-[#000c0c]">
          <div className="border-b border-primary/20 bg-[#000808] px-3 py-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-primary/60">
              transmit.msg
            </span>
          </div>

          <div className="p-3">
            <AnimatePresence mode="wait">
              {status === "sending" ? (
                <TransmitAnimation key="tx" onDone={() => setStatus("ack")} />
              ) : status === "ack" ? (
                <motion.div
                  key="ack"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-8 text-center"
                >
                  <motion.div
                    className="h-10 w-10 border-2 border-primary/60 bg-primary/10 flex items-center justify-center font-mono text-xl text-primary"
                    animate={{ boxShadow: ["0 0 0px rgba(204,255,0,0)", "0 0 20px rgba(204,255,0,0.4)", "0 0 0px rgba(204,255,0,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✓
                  </motion.div>
                  <p className="font-mono text-[11px] text-primary">ACK // MESSAGE RECEIVED</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    Transmission delivered successfully.
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => setStatus("idle")}>
                    SEND ANOTHER
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="space-y-3"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-primary/50">CALLSIGN</label>
                      <Input placeholder="your name" required />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-primary/50">EMAIL_NODE</label>
                      <Input type="email" placeholder="you@node.dev" required />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase text-primary/50">
                      MESSAGE_PAYLOAD
                    </label>
                    <Textarea
                      placeholder="Enter transmission..."
                      className="min-h-[90px] font-mono text-[11px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    EXEC TRANSMIT
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
