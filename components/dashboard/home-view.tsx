"use client"

import { motion } from "framer-motion"
import { Compass, Calendar, Sun, Moon, Sunrise, MessageCircle, TrendingUp } from "lucide-react"
import { ClarityClock } from "./clarity-clock"
import { getUserProfile, getClarityDaysRemaining, getCheckIns } from "@/lib/storage"

interface HomeViewProps {
  onOpenSubView: (view: string) => void
}

export function HomeView({ onOpenSubView }: HomeViewProps) {
  const profile = getUserProfile()
  const daysRemaining = getClarityDaysRemaining()
  const duration = profile.clarityDuration || 30
  const checkIns = getCheckIns()
  const todayCheckIn = checkIns.find((c) => new Date(c.date).toDateString() === new Date().toDateString())

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: "Good morning", icon: Sunrise }
    if (hour < 18) return { text: "Good afternoon", icon: Sun }
    return { text: "Good evening", icon: Moon }
  }

  const greeting = getGreeting()
  const GreetingIcon = greeting.icon

  // Gentle, non-prescriptive prompts based on situation
  const getDailyPrompt = () => {
    const prompts = [
      "What's one thing you're noticing about yourself today?",
      "How is your body feeling right now?",
      "What do you need most in this moment?",
      "Is there something you've been avoiding thinking about?",
      "What would feel like a small act of kindness toward yourself today?",
      "What emotions have visited you today?",
      "If you could tell someone one thing right now, what would it be?",
    ]
    const dayIndex = new Date().getDay()
    return prompts[dayIndex]
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <GreetingIcon className="w-4 h-4" />
              <span>{greeting.text}</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Your Space</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Compass className="w-5 h-5 text-primary" />
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
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {daysRemaining === 0
                ? "Your clarity window is complete"
                : `Day ${duration - daysRemaining + 1} of ${duration}`}
            </span>
          </div>
        </motion.div>

        {/* Daily Check-in Prompt */}
        {!todayCheckIn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onOpenSubView("checkin")}
            className="w-full mb-6 p-5 rounded-xl bg-primary/10 border border-primary/20 text-left"
          >
            <div className="flex items-center gap-2 text-primary mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Daily Check-in</span>
            </div>
            <p className="text-foreground/90 text-sm">
              Take a moment to check in with yourself. How are you feeling today?
            </p>
          </motion.button>
        )}

        {todayCheckIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Today's check-in complete</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Mood:</span>
                <span className="text-sm font-medium text-primary">{todayCheckIn.mood}/10</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Daily Reflection Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="font-serif text-lg text-foreground mb-3">A question for you</h2>
          <button
            onClick={() => onOpenSubView("reflection")}
            className="w-full p-5 rounded-xl bg-card border border-border text-left hover:border-primary/50 transition-colors"
          >
            <p className="font-serif text-foreground/90 leading-relaxed italic">"{getDailyPrompt()}"</p>
            <p className="text-xs text-muted-foreground mt-3">Tap to reflect</p>
          </button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => onOpenSubView("vault")}
            className="p-4 rounded-xl bg-secondary/50 border border-border text-left hover:border-amber/50 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-amber mb-2" />
            <p className="font-medium text-foreground text-sm">Write it out</p>
            <p className="text-xs text-muted-foreground mt-1">Safe space for unsaid words</p>
          </button>
          <button
            onClick={() => onOpenSubView("patterns")}
            className="p-4 rounded-xl bg-secondary/50 border border-border text-left hover:border-accent/50 transition-colors"
          >
            <Compass className="w-5 h-5 text-accent mb-2" />
            <p className="font-medium text-foreground text-sm">Explore patterns</p>
            <p className="text-xs text-muted-foreground mt-1">Understand dynamics</p>
          </button>
        </motion.div>

        {/* Gentle Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/10"
        >
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            There are no right answers here. Only your truth, at your pace.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
