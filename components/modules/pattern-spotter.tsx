"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, ChevronRight, Zap, Layers, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface Pattern {
  id: string
  title: string
  subtitle: string
  icon: typeof Zap
  color: string
  content: string
  insight: string
}

const patterns: Pattern[] = [
  {
    id: "switch",
    title: "The Switch",
    subtitle: "Why closeness felt threatening",
    icon: Zap,
    color: "text-amber",
    content:
      "For partners with avoidant attachment, intimacy activates their nervous system's threat response. When you got closer, their internal alarm said 'danger'—not because of you, but because closeness was wired as vulnerability in their early experiences.",
    insight:
      "Their withdrawal wasn't about your worth. It was their protection system misfiring in response to connection itself.",
  },
  {
    id: "separate-life",
    title: "The Separate Life",
    subtitle: "Understanding segmentation",
    icon: Layers,
    color: "text-accent",
    content:
      "Did they keep their family, friends, or roots in a separate compartment from your relationship? This 'Segmentation' isn't accidental—it's a strategy to prevent any one part of life from having too much power. If you never fully met their world, it wasn't rejection; it was self-protection.",
    insight:
      "Integration requires feeling safe enough to have all parts of life touch. They may not have had that capacity yet.",
  },
  {
    id: "caring-paradox",
    title: "The Caring Paradox",
    subtitle: "Cold in love, warm in leaving",
    icon: Heart,
    color: "text-primary",
    content:
      "Why could they be so caring during the breakup but distant during the relationship? In the relationship, closeness activated their avoidance. In the breakup, the 'ending' provides enough distance that their natural warmth can finally emerge safely.",
    insight:
      "Their warmth now isn't manipulation—it's what they can access when they don't feel 'trapped' by ongoing closeness.",
  },
]

export function PatternSpotter() {
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null)

  return (
    <div className="min-h-screen pb-24">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Pattern Spotter</h2>
            <p className="text-sm text-muted-foreground">Understanding the &quot;Why&quot;</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">
          These cards help explain complex relationship dynamics in simple terms. Tap to explore.
        </p>

        <div className="space-y-4">
          {patterns.map((pattern) => {
            const Icon = pattern.icon
            const isExpanded = expandedPattern === pattern.id

            return (
              <motion.div key={pattern.id} layout className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedPattern(isExpanded ? null : pattern.id)}
                  className="w-full p-4 flex items-center gap-4 text-left"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0",
                      pattern.color,
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{pattern.title}</h3>
                    <p className="text-sm text-muted-foreground">{pattern.subtitle}</p>
                  </div>
                  <ChevronRight
                    className={cn("w-5 h-5 text-muted-foreground transition-transform", isExpanded && "rotate-90")}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 space-y-4">
                        <div className="h-px bg-border" />
                        <p className="text-foreground/80 leading-relaxed">{pattern.content}</p>
                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                          <p className="text-sm font-medium text-primary">Key Insight: {pattern.insight}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
