"use client"

import { motion } from "framer-motion"
import { Lightbulb, Users } from "lucide-react"
import { getUserProfile } from "@/lib/storage"

const insightsByStatus: Record<string, { title: string; content: string; lgbtqNote?: string }> = {
  limbo: {
    title: "The Hope Loop",
    content:
      "Talking right now feels like a lifeline, but it's actually a 'Dopamine Hit' that resets your healing clock. You can't see the truth while you're still chasing the fix.",
    lgbtqNote:
      "Community Overlap: It's okay to step back from shared spaces for 14 days. Your 'Found Family' will still be there when the fog lifts.",
  },
  shutdown: {
    title: "Understanding the Shutdown",
    content:
      "Your partner's shutdown is a Safety Switch in their nervous system. Your love isn't a 'key' that can turn it back on—only their own internal work can do that.",
    lgbtqNote:
      "Remember: Their deactivation isn't a rejection of your identity or your love. It's a protection mechanism they've carried long before you.",
  },
  separated: {
    title: "The Clarity After",
    content:
      "The decision has been made, but your nervous system is still catching up. Give yourself permission to grieve while also recognizing this is the beginning of clarity.",
    lgbtqNote:
      "Navigating separation within a tight-knit queer community can feel like losing multiple safety nets at once. Take it one day at a time.",
  },
  churning: {
    title: "Breaking the Cycle",
    content:
      "The on/off pattern isn't love testing itself—it's two nervous systems triggering each other. Understanding this pattern is the first step to choosing differently.",
    lgbtqNote:
      "In LGBTQ+ relationships, the scarcity mindset ('there's no one else like them') can intensify churning. There are other people who can meet your needs.",
  },
}

export function InsightCard() {
  const profile = getUserProfile()
  const status = profile.status || "limbo"
  const sharedHome = profile.sharedHome
  const insight = insightsByStatus[status] || insightsByStatus.limbo

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="p-5 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-2 text-amber mb-3">
          <Lightbulb className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-medium">{insight.title}</span>
        </div>
        <p className="font-serif text-foreground/90 leading-relaxed">{insight.content}</p>
      </div>

      {sharedHome && insight.lgbtqNote && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-4 rounded-xl bg-accent/10 border border-accent/20"
        >
          <div className="flex items-center gap-2 text-accent mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Community Note</span>
          </div>
          <p className="text-sm text-accent/90">{insight.lgbtqNote}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
