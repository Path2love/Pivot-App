"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TimelineScreenProps {
  onNext: (duration: number) => void
}

export function TimelineScreen({ onNext }: TimelineScreenProps) {
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
            <span className="text-xs uppercase tracking-widest">Your Reset Window</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">14 days to get clear</h2>
          <p className="text-muted-foreground mt-2">
            Research shows 14 days is the minimum window for your neurochemistry to stop reacting and start thinking.
            That&apos;s what this program is built around.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="w-full p-6 rounded-xl border bg-card border-primary ring-1 ring-primary">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="text-xl font-bold">14</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground text-lg">14-Day Reset</h3>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">The Program</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  One daily anchor to read. A set of tools to use when it gets hard. A clear framework for what you&apos;re
                  doing and why it works. After Day 14, your tools remain available — no expiry.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 rounded-xl bg-card border border-border"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            You won&apos;t need 30 days to know if this is working. The clarity usually comes in the first week. What
            you&apos;re building here is a foundation — and that takes 14 days, not 60.
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-8">
        <Button
          onClick={() => onNext(14)}
          className="w-full h-14 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Start My 14-Day Reset
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
