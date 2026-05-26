import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FaqItem {
  q: string
  a: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {items.map((faq, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="border border-primary/30 bg-card"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                "group flex w-full items-center justify-between px-4 py-4 font-mono text-left text-sm font-medium uppercase tracking-wide text-primary",
                "hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <span>
                <span className="text-accent">+</span> {faq.q}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="border-t border-primary/20 px-4 py-3 font-mono text-sm text-muted-foreground">
              {"> "}
              {faq.a}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
