"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function PanicButton() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [timer, setTimer] = useState(4)
  const [cycles, setCycles] = useState(0)

  const resetExercise = useCallback(() => {
    setIsActive(false)
    setPhase("inhale")
    setTimer(4)
    setCycles(0)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (phase === "inhale") {
            setPhase("hold")
            return 4
          } else if (phase === "hold") {
            setPhase("exhale")
            return 8
          } else {
            // Complete one cycle
            setCycles((c) => c + 1)
            setPhase("inhale")
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, phase])

  const phaseInstructions = {
    inhale: "Breathe In",
    hold: "Hold",
    exhale: "Breathe Out Slowly",
  }

  return (
    <>
      {/* Floating Panic Button - Burgundy with Cyan core */}
      <motion.button
        onClick={() => setIsActive(true)}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-pivot-heart-burgundy flex items-center justify-center shadow-lg z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: ["0 0 0 0 rgba(0, 245, 255, 0.4)", "0 0 0 12px rgba(0, 245, 255, 0)"],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-4 h-4 rounded-full bg-pivot-clarity-cyan" />
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

            {/* Breathing visualization - Burgundy circle with Cyan core */}
            <motion.div
              className="w-52 h-52 rounded-full bg-pivot-heart-burgundy/30 flex items-center justify-center"
              animate={{
                scale: phase === "inhale" ? [1, 1.3] : phase === "exhale" ? [1.3, 1] : 1.3,
              }}
              transition={{
                duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-36 h-36 rounded-full bg-pivot-heart-burgundy/50 flex items-center justify-center"
                animate={{
                  scale: phase === "inhale" ? [1, 1.2] : phase === "exhale" ? [1.2, 1] : 1.2,
                }}
                transition={{
                  duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-pivot-clarity-cyan/80 flex items-center justify-center glow-cyan"
                  animate={{
                    scale: phase === "inhale" ? [1, 1.15] : phase === "exhale" ? [1.15, 1] : 1.15,
                  }}
                  transition={{
                    duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0,
                    ease: "easeInOut",
                  }}
                >
                  <span className="font-serif text-4xl font-bold text-pivot-clarity-foreground">{timer}</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Instructions */}
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

            {/* Phase indicators */}
            <div className="flex gap-2 mt-8">
              {["inhale", "hold", "exhale"].map((p) => (
                <div
                  key={p}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    phase === p ? "bg-pivot-clarity-cyan glow-cyan-subtle" : "bg-secondary"
                  }`}
                />
              ))}
            </div>

            {/* Cycles counter */}
            {cycles > 0 && <p className="mt-4 text-muted-foreground text-sm">Cycles completed: {cycles}</p>}

            {/* Closing message after 3 cycles */}
            {cycles >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                <p className="text-pivot-clarity-cyan font-medium">The urge has passed.</p>
                <p className="text-muted-foreground text-sm">You are still on solid ground.</p>
              </motion.div>
            )}

            <p className="absolute bottom-12 text-muted-foreground/60 text-xs">4-4-8 Breathing Exercise</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
