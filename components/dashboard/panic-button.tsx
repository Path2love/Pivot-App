"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { incrementUsageStat } from "@/lib/storage"

export function PanicButton() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [timer, setTimer] = useState(4)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const exerciseStartRef = useRef<number | null>(null)

  const resetExercise = useCallback(() => {
    setIsActive(false)
    setPhase("inhale")
    setTimer(4)
    setTotalSeconds(0)
    exerciseStartRef.current = null
  }, [])

  const startExercise = () => {
    setIsActive(true)
    incrementUsageStat("panicModeUses")
  }

  useEffect(() => {
    if (!isActive) return

    if (!exerciseStartRef.current) {
      exerciseStartRef.current = Date.now()
    }

    const interval = setInterval(() => {
      setTotalSeconds((prev) => prev + 1)

      setTimer((prev) => {
        if (prev <= 1) {
          if (phase === "inhale") {
            setPhase("hold")
            return 4
          } else if (phase === "hold") {
            setPhase("exhale")
            return 8
          } else {
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

  const cyclesCompleted = Math.floor(totalSeconds / 16)
  const isComplete = totalSeconds >= 60

  return (
    <>
      <motion.button
        onClick={startExercise}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-40"
        style={{ backgroundColor: "#691d33" }}
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
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: "#00f5ff",
            boxShadow: "0 0 10px #00f5ff, 0 0 20px #00f5ff",
          }}
        />
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-20 text-center px-6"
            >
              <h2 className="text-lg font-semibold text-foreground mb-1">Somatic Panic Mode</h2>
              <p className="text-sm text-muted-foreground">Use this when your body is in overdrive.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start the loop and breathe with the circle until it finishes.
              </p>
            </motion.div>

            <motion.div
              className="w-52 h-52 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(105, 29, 51, 0.3)" }}
              animate={{
                scale: phase === "inhale" ? [1, 1.3] : phase === "exhale" ? [1.3, 1] : 1.3,
              }}
              transition={{
                duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-36 h-36 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(105, 29, 51, 0.5)" }}
                animate={{
                  scale: phase === "inhale" ? [1, 1.2] : phase === "exhale" ? [1.2, 1] : 1.2,
                }}
                transition={{
                  duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(0, 245, 255, 0.8)",
                    boxShadow: "0 0 30px #00f5ff, 0 0 60px #00f5ff",
                  }}
                  animate={{
                    scale: phase === "inhale" ? [1, 1.15] : phase === "exhale" ? [1.15, 1] : 1.15,
                  }}
                  transition={{
                    duration: phase === "inhale" ? 4 : phase === "exhale" ? 8 : 0,
                    ease: "easeInOut",
                  }}
                >
                  <span className="font-serif text-4xl font-bold text-slate-900">{timer}</span>
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
                  className={`w-3 h-3 rounded-full transition-colors ${phase === p ? "bg-[#00f5ff]" : "bg-secondary"}`}
                  style={phase === p ? { boxShadow: "0 0 10px #00f5ff" } : {}}
                />
              ))}
            </div>

            <div className="mt-6 w-48">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{Math.min(totalSeconds, 60)}s / 60s</span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#00f5ff" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min((totalSeconds / 60) * 100, 100)}%` }}
                />
              </div>
            </div>

            {cyclesCompleted > 0 && <p className="mt-4 text-muted-foreground text-xs">Cycles: {cyclesCompleted}</p>}

            {isComplete && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                <p className="text-[#00f5ff] font-medium text-lg" style={{ textShadow: "0 0 10px #00f5ff" }}>
                  The urge has passed.
                </p>
                <p className="text-sm text-muted-foreground">You are still on solid ground.</p>
                <p className="text-sm text-muted-foreground mt-2">Pause before deciding what to do next.</p>
              </motion.div>
            )}

            <p className="absolute bottom-12 text-muted-foreground/60 text-xs">4-4-8 Breathing</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
