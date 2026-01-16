"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X } from "lucide-react"

export function PanicButton() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [timer, setTimer] = useState(4)

  const resetExercise = useCallback(() => {
    setIsActive(false)
    setPhase("inhale")
    setTimer(4)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === "inhale") {
            setPhase("hold")
            return 4
          } else if (phase === "hold") {
            setPhase("exhale")
            return 8
          } else {
            // Complete - reset after exhale
            resetExercise()
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, phase, resetExercise])

  const phaseInstructions = {
    inhale: "Breathe In",
    hold: "Hold",
    exhale: "Breathe Out Slowly",
  }

  return (
    <>
      {/* Floating Panic Button */}
      <motion.button
        onClick={() => setIsActive(true)}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: ["0 0 0 0 rgba(245, 158, 11, 0.4)", "0 0 0 10px rgba(245, 158, 11, 0)"],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Heart className="w-6 h-6" />
      </motion.button>

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={resetExercise}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center"
              animate={{
                scale: phase === "inhale" ? [1, 1.3] : phase === "exhale" ? [1.3, 1] : 1.3,
              }}
              transition={{
                duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-32 h-32 rounded-full bg-primary/40 flex items-center justify-center"
                animate={{
                  scale: phase === "inhale" ? [1, 1.2] : phase === "exhale" ? [1.2, 1] : 1.2,
                }}
                transition={{
                  duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0,
                  ease: "easeInOut",
                }}
              >
                <span className="font-serif text-5xl font-bold text-primary">{timer}</span>
              </motion.div>
            </motion.div>

            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <h3 className="font-serif text-2xl text-foreground mb-2">{phaseInstructions[phase]}</h3>
              <p className="text-muted-foreground text-sm">
                {phase === "inhale" && "Fill your lungs slowly"}
                {phase === "hold" && "Keep the breath in"}
                {phase === "exhale" && "Release slowly through your mouth"}
              </p>
            </motion.div>

            <div className="flex gap-2 mt-8">
              {["inhale", "hold", "exhale"].map((p) => (
                <div
                  key={p}
                  className={cn("w-3 h-3 rounded-full transition-colors", phase === p ? "bg-primary" : "bg-secondary")}
                />
              ))}
            </div>

            <p className="absolute bottom-12 text-muted-foreground/60 text-xs">4-4-8 Breathing Exercise</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
