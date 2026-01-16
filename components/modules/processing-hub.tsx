"use client"

import { motion } from "framer-motion"
import { Compass, PenLine, TrendingUp, MessageCircle, Heart, Shield, Search, Lightbulb } from "lucide-react"

interface ProcessingHubProps {
  onOpenSubView: (view: string) => void
}

const processingTools = [
  {
    id: "checkin",
    icon: TrendingUp,
    title: "Daily Check-in",
    description: "Track how you're feeling over time",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "reflection",
    icon: PenLine,
    title: "Guided Reflection",
    description: "Explore your thoughts with gentle prompts",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "vault",
    icon: MessageCircle,
    title: "Write It Out",
    description: "A safe space for words you can't say",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
  {
    id: "patterns",
    icon: Search,
    title: "Pattern Explorer",
    description: "Understand relationship dynamics",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "needs",
    icon: Heart,
    title: "Needs Discovery",
    description: "Uncover what matters most to you",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "boundaries",
    icon: Shield,
    title: "Boundary Builder",
    description: "Practice what you might say",
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
]

export function ProcessingHub({ onOpenSubView }: ProcessingHubProps) {
  return (
    <div className="min-h-screen pb-24">
      <div className="px-6 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Processing Tools</h2>
              <p className="text-sm text-muted-foreground">Explore at your own pace</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-card border border-border mb-6"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              These tools are here to help you explore and process—not to tell you what to do. Use what feels helpful,
              skip what doesn't. There's no right order or required pace.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-3">
          {processingTools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => onOpenSubView(tool.id)}
                className="w-full p-4 rounded-xl bg-card border border-border text-left hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${tool.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{tool.description}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
