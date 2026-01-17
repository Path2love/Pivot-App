"use client"

import { motion } from "framer-motion"
import { Activity, TrendingUp, Lock, Brain, Compass, Shield, Lightbulb, AlertCircle, Sparkles } from "lucide-react"
import { ClarityClock } from "./clarity-clock"
import { DailyAnchorCard } from "./daily-anchor-card"
import { PivotCard } from "@/components/ui/pivot-card"
import { getUserProfile, getCurrentDay, getCheckIns, getUsageStats, getVaultEntries, getUserNeeds } from "@/lib/storage"

interface MainDashboardProps {
  onOpenSubView: (view: string) => void
}

const screenTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
}

export function MainDashboard({ onOpenSubView }: MainDashboardProps) {
  const profile = getUserProfile()
  const currentDay = getCurrentDay()
  const duration = profile.clarityDuration || 14
  const checkIns = getCheckIns()
  const todayCheckIn = checkIns.find((c) => new Date(c.date).toDateString() === new Date().toDateString())

  const usageStats = getUsageStats()
  const vaultEntries = getVaultEntries()
  const userNeeds = getUserNeeds()

  const statusCopy = {
    limbo: "Your nervous system is learning to trust the silence.",
    shutdown: "Every day of quiet is a day of healing.",
    "post-breakup": "You're rebuilding from a solid foundation.",
  }

  const statusMessage = statusCopy[profile.statusPath as keyof typeof statusCopy] || statusCopy.limbo

  const getDayGuidance = () => {
    if (currentDay <= 3) {
      return { tool: "vault", text: "If you want to text them, use Safety Vault first." }
    } else if (currentDay <= 7) {
      return { tool: "patterns", text: "If their behavior confuses you, read one Pattern." }
    } else {
      return { tool: "needs", text: "If you're thinking about 'what next', open Needs Navigator." }
    }
  }

  const dayGuidance = getDayGuidance()

  const getBehaviorReflection = () => {
    if (vaultEntries.length > 0) {
      return "You've chosen to park messages instead of sending them. That's pause over panic."
    }
    if (usageStats.panicModeUses > 0) {
      return "You've used the breathing tool to ride out tough moments. That's your nervous system learning."
    }
    if (userNeeds.filter((n) => n.isCore).length > 0) {
      return "You've started mapping your non-negotiables. That's clarity you'll carry forward."
    }
    return null
  }

  const behaviorReflection = getBehaviorReflection()

  return (
    <motion.div className="min-h-screen pb-24" {...screenTransition}>
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

        {currentDay === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-pivot-heart-burgundy/20 border border-pivot-heart-burgundy/40"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-pivot-heart-burgundy flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Day 1: System Shock</h3>
                <p className="text-sm text-foreground/80">
                  Don't decide anything today. Just follow the steps and let your system catch up.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {currentDay === duration && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-pivot-clarity-cyan/20 border border-pivot-clarity-cyan/40"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-pivot-clarity-cyan flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Day {duration}: Decision Day</h3>
                <p className="text-sm text-foreground/80">
                  Review the last {duration === 14 ? "2 weeks" : "30 days"}. You're choosing from clarity now, not
                  panic.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="mb-8 p-5 rounded-xl bg-pivot-logic-blue/10 border border-pivot-logic-blue/30"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-pivot-logic-blue" />
            <h2 className="text-lg font-semibold text-foreground">Today, start here</h2>
          </div>
          <p className="text-base text-foreground/90 leading-relaxed mb-3">
            1) Read today's anchor. 2) Do the check-in. 3) Use one tool if needed.
          </p>
          <div className="p-3 rounded-lg bg-pivot-slate-900/50 border border-pivot-slate-800">
            <p className="text-sm text-foreground/90">
              <span className="text-pivot-clarity-cyan font-medium">Day {currentDay}:</span> {dayGuidance.text}
            </p>
          </div>
        </motion.div>

        {/* Clarity Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center mb-8"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">Daily Check-in</h3>
            <p className="text-sm text-muted-foreground mb-3">Track your state. Takes 30 seconds.</p>
            <PivotCard
              variant="logic"
              className="p-4 cursor-pointer cta-button"
              onClick={() => onOpenSubView("checkin")}
              glow
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pivot-logic-blue/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-pivot-logic-blue" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Open Check-in</h3>
                  <p className="text-muted-foreground text-sm">No judgment, just data.</p>
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
            className="mb-8"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">Today's Anchor</h3>
          <p className="text-sm text-muted-foreground mb-3">Read it. Sit with it.</p>
          <DailyAnchorCard dayNumber={currentDay} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">Your Toolkit</h3>
          <p className="text-sm text-muted-foreground mb-4">Tap when you need it.</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              {dayGuidance.tool === "vault" && (
                <span className="absolute -top-2 left-2 px-2 py-0.5 text-[10px] font-medium bg-pivot-logic-blue text-white rounded-full z-10">
                  Recommended
                </span>
              )}
              <PivotCard
                variant="logic"
                className={`p-4 cursor-pointer h-full ${dayGuidance.tool === "vault" ? "border-pivot-logic-blue" : ""}`}
                onClick={() => onOpenSubView("vault")}
                glow={dayGuidance.tool === "vault"}
              >
                <Lock className="w-5 h-5 text-pivot-logic-blue mb-2" />
                <p className="font-medium text-foreground text-sm">Safety Vault</p>
                <p className="text-xs text-muted-foreground mt-1">When you want to text them</p>
              </PivotCard>
            </div>

            <div className="relative">
              {dayGuidance.tool === "patterns" && (
                <span className="absolute -top-2 left-2 px-2 py-0.5 text-[10px] font-medium bg-pivot-clarity-cyan text-slate-900 rounded-full z-10">
                  Recommended
                </span>
              )}
              <PivotCard
                variant="clarity"
                className={`p-4 cursor-pointer h-full ${dayGuidance.tool === "patterns" ? "border-pivot-clarity-cyan" : ""}`}
                onClick={() => onOpenSubView("patterns")}
                glow={dayGuidance.tool === "patterns"}
              >
                <Brain className="w-5 h-5 text-[#00f5ff] mb-2" />
                <p className="font-medium text-foreground text-sm">Patterns</p>
                <p className="text-xs text-muted-foreground mt-1">When their behavior confuses you</p>
              </PivotCard>
            </div>

            <div className="relative">
              {dayGuidance.tool === "needs" && (
                <span className="absolute -top-2 left-2 px-2 py-0.5 text-[10px] font-medium bg-pivot-warm-amber text-slate-900 rounded-full z-10">
                  Recommended
                </span>
              )}
              <PivotCard
                variant="default"
                className={`p-4 cursor-pointer h-full ${dayGuidance.tool === "needs" ? "border-pivot-warm-amber" : ""}`}
                onClick={() => onOpenSubView("needs")}
                glow={dayGuidance.tool === "needs"}
              >
                <Compass className="w-5 h-5 text-pivot-warm-amber mb-2" />
                <p className="font-medium text-foreground text-sm">Needs Navigator</p>
                <p className="text-xs text-muted-foreground mt-1">When you're thinking "what next"</p>
              </PivotCard>
            </div>

            <PivotCard variant="heart" className="p-4 cursor-pointer" onClick={() => onOpenSubView("boundaries")}>
              <Shield className="w-5 h-5 text-pivot-heart-burgundy mb-2" />
              <p className="font-medium text-foreground text-sm">Boundaries</p>
              <p className="text-xs text-muted-foreground mt-1">When you need to protect your space</p>
            </PivotCard>
          </div>
        </motion.div>

        {behaviorReflection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-xl bg-pivot-slate-900/50 border border-pivot-slate-800"
          >
            <p className="text-sm text-pivot-clarity-cyan/80 leading-relaxed text-center">{behaviorReflection}</p>
          </motion.div>
        )}

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 rounded-xl bg-pivot-slate-900/30"
        >
          <p className="text-sm text-muted-foreground leading-relaxed text-center italic">
            "The urge will pass. You are still on solid ground."
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
