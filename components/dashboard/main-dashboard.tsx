"use client"

import { motion } from "framer-motion"
import { Activity, TrendingUp, Lock, Brain, Compass, Shield, Lightbulb } from "lucide-react"
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

  const getDayGuidance = () => {
    if (currentDay <= 3) {
      return "If you feel panicky or desperate to reach out, use the Safety Vault first. If your body feels tight or flooded, tap the Somatic Panic button (bottom right)."
    } else if (currentDay <= 7) {
      return "If you keep replaying their behavior, open Pattern Library and read one pattern. If you're unsure what you need, open Needs Navigator."
    } else {
      return "If you feel tempted to 'check in' with them, deposit your message in the Safety Vault. If you're thinking about the future, review your Needs Navigator list."
    }
  }

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
          className="mb-6 p-5 rounded-xl bg-pivot-logic-blue/10 border border-pivot-logic-blue/30"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-pivot-logic-blue" />
            <h2 className="text-lg font-semibold text-foreground">Today, start here</h2>
          </div>
          <p className="text-base text-foreground/90 leading-relaxed mb-4">
            1) Read today's anchor. 2) Answer the check-in. 3) Then choose the tool that matches how you feel.
          </p>
          <div className="p-3 rounded-lg bg-pivot-slate-900/50 border border-pivot-slate-800">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-pivot-clarity-cyan font-medium">Day {currentDay} suggestion:</span>{" "}
              {getDayGuidance()}
            </p>
          </div>
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
            <h3 className="text-lg font-semibold text-foreground mb-2">Daily Check-in</h3>
            <p className="text-base text-foreground/80 mb-3">
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
                  <h3 className="font-medium text-foreground">Open Check-in</h3>
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
          <h3 className="text-lg font-semibold text-foreground mb-2">Today's Anchor</h3>
          <p className="text-base text-foreground/80 mb-3">A grounding thought for today. Read it, sit with it.</p>
          <DailyAnchorCard dayNumber={currentDay} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">Your Toolkit</h3>
          <p className="text-base text-foreground/80 mb-4">
            Tap any tool below when you need it. Each one helps with a different feeling.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <PivotCard variant="logic" className="p-4 cursor-pointer" onClick={() => onOpenSubView("vault")}>
              <Lock className="w-5 h-5 text-pivot-logic-blue mb-2" />
              <p className="font-medium text-foreground text-sm">Safety Vault</p>
              <p className="text-xs text-muted-foreground mt-1">When you want to text them</p>
            </PivotCard>

            <PivotCard variant="clarity" className="p-4 cursor-pointer" onClick={() => onOpenSubView("patterns")}>
              <Brain className="w-5 h-5 text-[#00f5ff] mb-2" />
              <p className="font-medium text-foreground text-sm">Patterns</p>
              <p className="text-xs text-muted-foreground mt-1">When their behavior confuses you</p>
            </PivotCard>

            <PivotCard variant="default" className="p-4 cursor-pointer" onClick={() => onOpenSubView("needs")}>
              <Compass className="w-5 h-5 text-pivot-warm-amber mb-2" />
              <p className="font-medium text-foreground text-sm">Needs Navigator</p>
              <p className="text-xs text-muted-foreground mt-1">When you're thinking "what next"</p>
            </PivotCard>

            <PivotCard variant="heart" className="p-4 cursor-pointer" onClick={() => onOpenSubView("boundaries")}>
              <Shield className="w-5 h-5 text-pivot-heart-burgundy mb-2" />
              <p className="font-medium text-foreground text-sm">Boundaries</p>
              <p className="text-xs text-muted-foreground mt-1">When you need to protect your space</p>
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
