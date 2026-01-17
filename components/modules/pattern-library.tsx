"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Brain, ChevronDown, ChevronUp } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { incrementUsageStat } from "@/lib/storage"

interface PatternLibraryProps {
  onBack: () => void
  embedded?: boolean
}

// ... existing code for patterns array ...

interface Pattern {
  id: string
  title: string
  subtitle: string
  logic: string
  details: string[]
}

const patterns: Pattern[] = [
  {
    id: "the-switch",
    title: "The Switch",
    subtitle: "Why closeness feels like a cage to some systems",
    logic:
      "For some people, intimacy triggers a 'Safety Switch.' The closer you get, the more their nervous system perceives danger—not because of you, but because of their wiring.",
    details: [
      "This is not rejection—it's a survival mechanism.",
      "The switch often flips during transitions: moving in, meeting family, or discussing the future.",
      "Their withdrawal is about managing their own internal alarm, not about your value.",
      "Without conscious work, this pattern repeats in every relationship.",
    ],
  },
  {
    id: "exit-empathy",
    title: "Exit Empathy",
    subtitle: "Why they were caring only around the breakup",
    logic:
      "Some people can only access empathy when the pressure of the relationship is removed. The 'kindness at the end' isn't who they 'really' are—it's who they can be when they're leaving.",
    details: [
      "This creates confusion: 'If they can be this kind now, why couldn't they before?'",
      "The answer: sustained emotional presence requires a different capacity than exit kindness.",
      "Exit empathy is about relieving their guilt, not about reconnecting with you.",
      "Don't mistake their relief for reconciliation.",
    ],
  },
  {
    id: "segmentation",
    title: "Segmentation",
    subtitle: "Why being kept separate was a structural risk",
    logic:
      "If you were kept in a 'compartment'—separate from family, friends, or future plans—the relationship lacked systemic integration. You were a subset, not a partner.",
    details: [
      "Healthy relationships integrate. Compartmentalized relationships segment.",
      "Being a 'secret' or a 'side story' is not a phase—it's a design.",
      "If they couldn't introduce you to their life, they weren't planning to keep you in it.",
      "Integration is a choice. Segmentation is a warning sign.",
    ],
  },
  {
    id: "static-stability",
    title: "Static Stability",
    subtitle: "Why 'good times' don't mean 'good relationship'",
    logic:
      "A relationship can feel stable when nothing is being asked of it. The real test is what happens during stress, change, or growth. Static stability is not the same as systemic reliability.",
    details: [
      "Many relationships work perfectly when the 'static' is good: no stress, no transitions, no growth demands.",
      "The moment life requires adaptation, static relationships crash.",
      "Reliability means showing up when things are hard, not just when things are easy.",
      "Don't confuse 'we had a good time' with 'we had a good system.'",
    ],
  },
  {
    id: "the-dimming",
    title: "The Dimming",
    subtitle: "How you became smaller to fit their life",
    logic:
      "In unhealthy dynamics, one person gradually 'dims' their needs, personality, and presence to avoid triggering the other's withdrawal or discomfort.",
    details: [
      "You may have stopped seeing friends, expressing opinions, or asking for what you needed.",
      "This dimming happens slowly—so slowly you may not have noticed.",
      "A healthy relationship expands both people. An unhealthy one shrinks one to fit the other.",
      "Reclaiming yourself means turning the lights back on.",
    ],
  },
  {
    id: "caring-paradox",
    title: "The Caring Paradox",
    subtitle: "Why 'they care' doesn't mean 'they're reliable'",
    logic:
      "Someone can genuinely care about you and still be incapable of showing up reliably. Caring is a feeling. Reliability is a system. You need both.",
    details: [
      "Caring without action is just a thought they have about you.",
      "Reliability is caring translated into consistent behavior over time.",
      "You deserve someone who can do both—not just feel, but act.",
      "Don't let 'but they care' excuse a pattern of unreliability.",
    ],
  },
]

const screenTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
}

export function PatternLibrary({ onBack, embedded = false }: PatternLibraryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
    if (expandedId !== id) {
      incrementUsageStat("patternsViewed")
    }
  }

  return (
    <motion.div className={`min-h-screen ${embedded ? "pb-24" : "pb-8"}`} {...screenTransition}>
      <div className="px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          {!embedded && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
          )}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-pivot-clarity-cyan/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-pivot-clarity-cyan" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Pattern Library</h2>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Use this when their behavior doesn't make sense.
          </h3>
          <p className="text-sm text-muted-foreground">Read one pattern at a time. Notice what matches.</p>
        </motion.div>

        {/* Pattern Cards */}
        <div className="space-y-3">
          {patterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <PivotCard className="overflow-hidden" hover={false}>
                <button
                  onClick={() => toggleExpand(pattern.id)}
                  className="w-full p-5 flex items-start justify-between text-left"
                >
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{pattern.title}</h3>
                    <p className="text-muted-foreground text-sm">{pattern.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    {expandedId === pattern.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="text-[10px] text-muted-foreground mt-1">
                      {expandedId === pattern.id ? "Close" : "Tap"}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === pattern.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5"
                    >
                      <div className="p-4 rounded-xl bg-pivot-logic-blue/10 border border-pivot-logic-blue/20 mb-4">
                        <p className="text-base text-foreground/90 leading-relaxed">{pattern.logic}</p>
                      </div>

                      <div className="space-y-2">
                        {pattern.details.map((detail, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-pivot-clarity-cyan mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground text-sm leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </PivotCard>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-pivot-slate-900/50 border border-pivot-slate-800"
        >
          <p className="text-sm text-muted-foreground leading-relaxed text-center italic">
            "Your reaction isn't 'crazy'—it's biology."
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
