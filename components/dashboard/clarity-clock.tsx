"use client"

import { motion } from "framer-motion"
import { getClarityDaysRemaining, getClarityProgress, getUserProfile, getCurrentDay } from "@/lib/storage"

export function ClarityClock() {
  const profile = getUserProfile()
  const duration = profile.clarityDuration || 14
  const daysRemaining = getClarityDaysRemaining()
  const progress = getClarityProgress()
  const currentDay = getCurrentDay()
  const circumference = 2 * Math.PI * 45

  // Calculate needle rotation (0 to 360 degrees based on progress)
  const needleRotation = (progress / 100) * 360

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-48 h-48" viewBox="0 0 100 100">
        {/* Background circle - Burgundy */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-pivot-heart-burgundy/30"
        />
        {/* Progress circle - Burgundy */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className="text-pivot-heart-burgundy"
          style={{
            transformOrigin: "center",
            transform: "rotate(-90deg)",
          }}
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference - (progress / 100) * circumference,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Center dot */}
        <circle cx="50" cy="50" r="3" className="fill-pivot-clarity-cyan" />
        {/* Needle - Cyan */}
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-pivot-clarity-cyan"
          style={{ transformOrigin: "50px 50px" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: needleRotation }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Needle glow */}
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-pivot-clarity-cyan/30"
          style={{ transformOrigin: "50px 50px", filter: "blur(2px)" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: needleRotation }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {daysRemaining > 0 ? (
          <>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Day</span>
            <span className="font-serif text-4xl font-bold text-foreground">{currentDay}</span>
            <span className="text-xs text-muted-foreground">of {duration}</span>
          </>
        ) : (
          <>
            <span className="font-serif text-xl font-bold text-pivot-clarity-cyan">Complete</span>
            <span className="text-xs text-muted-foreground mt-1">{duration} days</span>
          </>
        )}
      </div>
    </div>
  )
}
