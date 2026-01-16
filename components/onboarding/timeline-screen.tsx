"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimelineScreenProps {
  onNext: (duration: number) => void
}

export function TimelineScreen({ onNext }: TimelineScreenProps) {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen px-6 py-12 flex flex-col"
    >
      <div className="flex-1">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest">Your Pace</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Choose your clarity window</h2>
          <p className="text-muted-foreground mt-2">
            How long would you like to focus on processing and clarity? You can always adjust this later.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setSelectedDuration(14)}
            className={cn(
              "w-full p-6 rounded-xl border text-left transition-all duration-200",
              selectedDuration === 14
                ? "bg-card border-primary ring-1 ring-primary"
                : "bg-card/50 border-border hover:border-primary/50",
            )}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="text-xl font-bold">14</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground text-lg">14 Days</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  A focused period to start gaining perspective. Good for when you need to process something quickly or
                  test how you feel.
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setSelectedDuration(30)}
            className={cn(
              "w-full p-6 rounded-xl border text-left transition-all duration-200",
              selectedDuration === 30
                ? "bg-card border-primary ring-1 ring-primary"
                : "bg-card/50 border-border hover:border-primary/50",
            )}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-amber/20 flex items-center justify-center text-amber shrink-0">
                <span className="text-xl font-bold">30</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground text-lg">30 Days</h3>
                  <span className="text-xs bg-amber/20 text-amber px-2 py-0.5 rounded-full">Recommended</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  The commonly recommended timeframe for deeper processing. Allows more space for your nervous system to
                  settle and patterns to become clear.
                </p>
              </div>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setSelectedDuration(60)}
            className={cn(
              "w-full p-6 rounded-xl border text-left transition-all duration-200",
              selectedDuration === 60
                ? "bg-card border-primary ring-1 ring-primary"
                : "bg-card/50 border-border hover:border-primary/50",
            )}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                <span className="text-xl font-bold">60</span>
              </div>
              <div>
                <h3 className="font-medium text-foreground text-lg">60 Days</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  For longer-term processing, especially after significant relationships or complex situations. No rush.
                </p>
              </div>
            </div>
          </motion.button>
        </motion.div>

        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex items-center gap-2 text-accent text-sm mt-6 hover:underline"
        >
          <Info className="w-4 h-4" />
          Why these timeframes?
        </button>

        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-4 rounded-xl bg-card border border-border"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              These aren&apos;t rules—they&apos;re based on what many people find helpful. Research suggests it takes
              time for our nervous systems to recalibrate after emotional upheaval. But you know yourself best. Choose
              what feels right, and remember you can always extend or restart.
            </p>
          </motion.div>
        )}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-8">
        <Button
          onClick={() => selectedDuration && onNext(selectedDuration)}
          disabled={!selectedDuration}
          className="w-full h-14 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
