"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ListChecks, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Need {
  id: string
  text: string
  category: "reliability" | "integration" | "communication"
}

const needs: Need[] = [
  { id: "1", text: "I need a partner who doesn't unplug when life gets heavy", category: "reliability" },
  {
    id: "2",
    text: "I need my relationship to be integrated into our whole lives, not kept in a box",
    category: "integration",
  },
  { id: "3", text: "I need someone who can stay present during hard conversations", category: "communication" },
  { id: "4", text: "I need consistency between words and actions over time", category: "reliability" },
  { id: "5", text: "I need to meet their important people and be part of their world", category: "integration" },
  {
    id: "6",
    text: "I need a partner who sees conflict as 'us vs. the problem' not 'me vs. you'",
    category: "communication",
  },
  { id: "7", text: "I need someone who can repair after ruptures, not disappear", category: "reliability" },
  { id: "8", text: "I need emotional availability, not just physical presence", category: "communication" },
]

export function NeedsNavigator() {
  const [selectedNeeds, setSelectedNeeds] = useState<Set<string>>(new Set())

  const toggleNeed = (id: string) => {
    const newSelected = new Set(selectedNeeds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedNeeds(newSelected)
  }

  const getCategoryColor = (category: Need["category"]) => {
    switch (category) {
      case "reliability":
        return "border-l-primary"
      case "integration":
        return "border-l-accent"
      case "communication":
        return "border-l-amber"
    }
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <ListChecks className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Needs Navigator</h2>
            <p className="text-sm text-muted-foreground">
              From &quot;What do they want?&quot; to &quot;What do I require?&quot;
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <p className="font-serif text-foreground/90 leading-relaxed">
            This isn&apos;t about being &quot;picky&quot;—it&apos;s about identifying what Systemic Reliability looks
            like for you. Check the needs that resonate with your experience.
          </p>
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Reliability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Integration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber" />
            <span className="text-muted-foreground">Communication</span>
          </div>
        </div>

        {/* Needs Checklist */}
        <div className="space-y-3">
          {needs.map((need, index) => (
            <motion.button
              key={need.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleNeed(need.id)}
              className={cn(
                "w-full p-4 rounded-xl border-l-4 text-left transition-all",
                getCategoryColor(need.category),
                selectedNeeds.has(need.id)
                  ? "bg-card border border-primary/50"
                  : "bg-secondary/30 border border-transparent hover:bg-secondary/50",
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                    selectedNeeds.has(need.id)
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30",
                  )}
                >
                  {selectedNeeds.has(need.id) && <Check className="w-3 h-3" />}
                </div>
                <span
                  className={cn(
                    "text-sm leading-relaxed",
                    selectedNeeds.has(need.id) ? "text-foreground" : "text-foreground/70",
                  )}
                >
                  {need.text}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Summary */}
        {selectedNeeds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-5 rounded-xl bg-primary/10 border border-primary/20"
          >
            <h3 className="font-medium text-primary mb-2">Your Requirements</h3>
            <p className="text-sm text-foreground/80">
              You&apos;ve identified {selectedNeeds.size} core need{selectedNeeds.size > 1 ? "s" : ""}. These
              aren&apos;t demands—they&apos;re the foundation of systemic reliability that you deserve in any future
              partnership.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
