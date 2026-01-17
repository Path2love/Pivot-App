"use client"

import { motion } from "framer-motion"
import { Activity, TrendingUp, Lock, Brain, Compass, Shield } from "lucide-react"
import { ClarityClock } from "./clarity-clock"
import { DailyAnchorCard } from "./daily-anchor-card"
import { PivotCard } from "@/components/ui/pivot-card"
import { getUserProfile, getCurrentDay, getCheckIns } from "@/lib/storage"

interface MainDashboardProps {
  onOpenSubView: (view: string) => void
}

export function MainDashboard({ onOpenSubView }: MainDashboardProps) {
  const profile = getUserProfile()
  const currentDay = getCurrentDay()
  const duration = profile.clarityDuration || 14
  const checkIns = getCheckIns()
  const todayCheckIn = checkIns.find((c) => new Date(c.date).toDateString() === new Date().toDateString())

  // Status-specific copy
  const statusCopy = {
    limbo: "Your nervous system is learning to trust the silence.",
    shutdown: "Every day of quiet is a day of healing.",
    "post-breakup": "You're rebuilding from a solid foundation.",
  }

  const statusMessage = statusCopy[profile.statusPath as keyof typeof statusCopy] || statusCopy.limbo

  return (
    <div className="min-h-screen pb-24">
      <div className="px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">The Anchor</h1>
            <p className="text-muted-foreground text-sm">{statusMessage}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="mb-6 p-3 rounded-lg bg-pivot-logic-blue/10 border border-pivot-logic-blue/20"
        >
          <p className="text-sm text-foreground/80 text-center">This is your home base for the next {duration} days.</p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            Check your daily anchor, then use the tools as needed.
          </p>
        </motion.div>

        {/* Clarity Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-6"
        >
          <ClarityClock />
          <div className="mt-3 px-4 py-2 rounded-full bg-pivot-logic-blue/10 border border-pivot-logic-blue/20">
            <p className="text-sm text-foreground/80">
              <span className="text-[#00f5ff] font-medium">Neurochemistry:</span> Stabilizing (Day {currentDay} of{" "}
              {duration})
            </p>
          </div>
        </motion.div>

        {/* Daily Check-in Prompt */}
        {!todayCheckIn && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-xs text-muted-foreground text-center mb-2">
              Start here each day: read today's anchor, then respond to the check-in.
            </p>
            <PivotCard
              variant="logic"
              className="p-4 mb-4 cursor-pointer"
              onClick={() => onOpenSubView("checkin")}
              glow
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pivot-logic-blue/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-pivot-logic-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Daily Check-in</h3>
                  <p className="text-muted-foreground text-sm">Track your state. No judgment.</p>
                </div>
              </div>
            </PivotCard>
          </motion.div>
        )}

        {todayCheckIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <PivotCard className="p-4" hover={false}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00f5ff]" />
                  <span className="text-sm text-muted-foreground">Today's check-in complete</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Mood:</span>
                  <span className="font-medium text-[#00f5ff]">{todayCheckIn.mood}/10</span>
                </div>
              </div>
            </PivotCard>
          </motion.div>
        )}

        {/* Daily Anchor */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <DailyAnchorCard dayNumber={currentDay} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Toolkit</h3>
          <p className="text-xs text-muted-foreground mb-3">Tap any tool below to open it.</p>
          <div className="grid grid-cols-2 gap-3">
            <PivotCard variant="logic" className="p-4 cursor-pointer" onClick={() => onOpenSubView("vault")}>
              <Lock className="w-5 h-5 text-pivot-logic-blue mb-2" />
              <p className="font-medium text-foreground text-sm">Safety Vault</p>
              <p className="text-xs text-muted-foreground mt-1">Deposit unsent words</p>
            </PivotCard>

            <PivotCard variant="clarity" className="p-4 cursor-pointer" onClick={() => onOpenSubView("patterns")}>
              <Brain className="w-5 h-5 text-[#00f5ff] mb-2" />
              <p className="font-medium text-foreground text-sm">Patterns</p>
              <p className="text-xs text-muted-foreground mt-1">Understand the "why"</p>
            </PivotCard>

            <PivotCard variant="default" className="p-4 cursor-pointer" onClick={() => onOpenSubView("needs")}>
              <Compass className="w-5 h-5 text-pivot-warm-amber mb-2" />
              <p className="font-medium text-foreground text-sm">Needs Navigator</p>
              <p className="text-xs text-muted-foreground mt-1">Identify what matters</p>
            </PivotCard>

            <PivotCard variant="heart" className="p-4 cursor-pointer" onClick={() => onOpenSubView("boundaries")}>
              <Shield className="w-5 h-5 text-pivot-heart-burgundy mb-2" />
              <p className="font-medium text-foreground text-sm">Boundaries</p>
              <p className="text-xs text-muted-foreground mt-1">Protect your space</p>
            </PivotCard>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-pivot-slate-900/50 border border-pivot-slate-800"
        >
          <p className="text-sm text-muted-foreground leading-relaxed text-center italic">
            "The urge will pass. You are still on solid ground."
          </p>
        </motion.div>
      </div>
    </div>
  )
}
