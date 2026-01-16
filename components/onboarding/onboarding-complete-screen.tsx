"use client"

import { motion } from "framer-motion"
import { Compass, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/lib/storage"

interface OnboardingCompleteScreenProps {
  onComplete: () => void
}

export function OnboardingCompleteScreen({ onComplete }: OnboardingCompleteScreenProps) {
  const profile = getUserProfile()
  const duration = profile.clarityDuration || 30

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen px-6 py-12 flex flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8"
      >
        <Compass className="w-12 h-12 text-primary" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Your space is ready</h2>
        <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
          You&apos;ve chosen a {duration}-day clarity window. This is your time to explore, process, and discover what
          you need—at your own pace.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 space-y-4 max-w-sm"
      >
        <div className="p-4 rounded-xl bg-card border border-border text-left">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">What you&apos;ll find inside</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Daily check-ins to track how you&apos;re feeling</li>
            <li>• Guided reflections with questions, not answers</li>
            <li>• A safe space to write what you can&apos;t say</li>
            <li>• Tools to discover your needs and boundaries</li>
            <li>• Grounding exercises when things feel intense</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
          <p className="font-serif text-foreground/90 text-sm italic">
            &quot;This app won&apos;t tell you what to do. It will help you find your own clarity through the right
            questions.&quot;
          </p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-10">
        <Button
          onClick={onComplete}
          size="lg"
          className="px-12 py-6 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Enter Your Space
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
