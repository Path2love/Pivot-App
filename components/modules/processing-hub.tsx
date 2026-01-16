"use client"

import { motion } from "framer-motion"
import { Compass, PenLine, TrendingUp, Lock, Heart, Shield, Brain, Lightbulb } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"

interface ProcessingHubProps {
  onOpenSubView: (view: string) => void
}

const processingTools = [
  {
    id: "checkin",
    icon: TrendingUp,
    title: "Daily Check-in",
    description: "Track how you're feeling over time",
    variant: "logic" as const,
    color: "text-pivot-logic-blue",
    bgColor: "bg-pivot-logic-blue/20",
  },
  {
    id: "reflection",
    icon: PenLine,
    title: "Guided Reflection",
    description: "Explore your thoughts with gentle prompts",
    variant: "heart" as const,
    color: "text-pivot-heart-burgundy",
    bgColor: "bg-pivot-heart-burgundy/20",
  },
  {
    id: "vault",
    icon: Lock,
    title: "Safety Vault",
    description: "Lock away the texts you're desperate to send",
    variant: "logic" as const,
    color: "text-pivot-logic-blue",
    bgColor: "bg-pivot-logic-blue/20",
  },
  {
    id: "patterns",
    icon: Brain,
    title: "Pattern Recognition",
    description: "Understand relationship dynamics",
    variant: "clarity" as const,
    color: "text-pivot-clarity-cyan",
    bgColor: "bg-pivot-clarity-cyan/20",
  },
  {
    id: "needs",
    icon: Heart,
    title: "Needs Navigator",
    description: "Uncover your non-negotiables",
    variant: "heart" as const,
    color: "text-pivot-heart-burgundy",
    bgColor: "bg-pivot-heart-burgundy/20",
  },
  {
    id: "boundaries",
    icon: Shield,
    title: "Boundary Builder",
    description: "Practice what you might say",
    variant: "logic" as const,
    color: "text-pivot-logic-blue",
    bgColor: "bg-pivot-logic-blue/20",
  },
]

export function ProcessingHub({ onOpenSubView }: ProcessingHubProps) {
  return (
    <div className="min-h-screen pb-24">
      <div className="px-6 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-pivot-logic-blue/20 flex items-center justify-center">
              <Compass className="w-6 h-6 text-pivot-logic-blue" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Processing Tools</h2>
              <p className="text-sm text-muted-foreground">Explore at your own pace</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <PivotCard className="p-4 mb-6" hover={false}>
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-pivot-clarity-cyan shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                These tools are here to help you explore and process—not to tell you what to do. Use what feels helpful,
                skip what doesn't. There's no right order or required pace.
              </p>
            </div>
          </PivotCard>
        </motion.div>

        <div className="grid gap-3">
          {processingTools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <PivotCard variant={tool.variant} className="p-4 cursor-pointer" onClick={() => onOpenSubView(tool.id)}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{tool.description}</p>
                    </div>
                  </div>
                </PivotCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
