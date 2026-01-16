"use client"

import { motion } from "framer-motion"
import { getClarityDaysRemaining, getClarityProgress, getUserProfile } from "@/lib/storage"

export function ClarityClock() {
  const profile = getUserProfile()
  const duration = profile.clarityDuration || 30
  const daysRemaining = getClarityDaysRemaining()
  const progress = getClarityProgress()
  const currentDay = duration - daysRemaining
  const circumference = 2 * Math.PI * 45

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className="text-primary"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference - (progress / 100) * circumference,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {daysRemaining > 0 ? (
          <>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Day</span>
            <span className="font-serif text-4xl font-bold text-foreground">{currentDay}</span>
            <span className="text-xs text-muted-foreground">of {duration}</span>
          </>
        ) : (
          <>
            <span className="font-serif text-2xl font-bold text-primary">Complete</span>
            <span className="text-xs text-muted-foreground mt-1">{duration} days</span>
          </>
        )}
      </div>
    </div>
  )
}
