"use client"

import type React from "react"

import { useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { ArrowRight, Lock, Clock, Brain } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import { saveUserProfile } from "@/lib/storage"

interface HeroHomeProps {
  onStatusSelect: (status: "limbo" | "shutdown" | "post-breakup") => void
  onStartJourney: () => void
}

type StatusPath = "limbo" | "shutdown" | "post-breakup"

const statusPaths: {
  id: StatusPath
  title: string
  subtitle: string
  logic: string
}[] = [
  {
    id: "limbo",
    title: "Limbo",
    subtitle: "Still Connected, But Something's Off.",
    logic: "You're doing the work, they're pulling back.",
  },
  {
    id: "shutdown",
    title: "Shutdown",
    subtitle: "Everything Just Went Silent.",
    logic: "No fight, just distance, left wondering what you did wrong.",
  },
  {
    id: "post-breakup",
    title: "Post-Breakup",
    subtitle: "It's Over, But You're Not.",
    logic: "The relationship ended, but your brain hasn't caught up.",
  },
]

export function HeroHome({ onStatusSelect, onStartJourney }: HeroHomeProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusPath | null>(null)

  // Mouse position for tilt effect
  const mouseX = useMotionValue(0)
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    mouseX.set(e.clientX - centerX)
  }

  const handleStatusSelect = (status: StatusPath) => {
    setSelectedStatus(status)
    saveUserProfile({ statusPath: status })
    onStatusSelect(status)
  }

  const handleStart = () => {
    if (selectedStatus) {
      onStartJourney()
    }
  }

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => mouseX.set(0)}
      >
        {/* Title with PIVOT tilt effect */}
        <motion.h1
          className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
          style={{ rotateY, transformStyle: "preserve-3d" }}
        >
          The{" "}
          <span className="inline-block">
            PI
            <span className="text-pivot-clarity-cyan text-glow-cyan">V</span>
            OT
          </span>
        </motion.h1>
        <p className="text-xl text-muted-foreground font-serif italic mb-6">When Love Needs Logic</p>

        {/* Subheadline */}
        <p className="text-foreground/90 max-w-md mx-auto leading-relaxed mb-4">
          You're not here to "move on." You're here to understand what happened—and find your way back to solid ground.
        </p>

        {/* Intro copy */}
        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
          Right now, you might be replaying conversations, checking your phone, or wondering if you're the one who broke
          something that could have worked...
        </p>
      </motion.div>

      {/* Status Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <h2 className="text-center text-lg font-medium text-foreground mb-6">Where are you right now?</h2>

        <div className="space-y-3">
          {statusPaths.map((status, index) => (
            <motion.div
              key={status.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <PivotCard
                variant={selectedStatus === status.id ? "clarity" : "default"}
                glow={selectedStatus === status.id}
                className={`p-5 cursor-pointer transition-all ${
                  selectedStatus === status.id ? "border-pivot-clarity-cyan" : ""
                }`}
                onClick={() => handleStatusSelect(status.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{status.title}</h3>
                    <p className="text-foreground/80 text-sm mb-2">{status.subtitle}</p>
                    <p className="text-muted-foreground text-xs italic">"{status.logic}"</p>
                  </div>
                  {selectedStatus === status.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-pivot-clarity-cyan flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-background" />
                    </motion.div>
                  )}
                </div>
              </PivotCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3 mb-10"
      >
        {/* Safety Vault */}
        <PivotCard variant="logic" className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pivot-logic-blue/20 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-pivot-logic-blue" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">The Safety Vault</h4>
              <p className="text-muted-foreground text-sm">
                Write the text you're desperate to send. Lock it away. Give yourself 24 hours.
              </p>
            </div>
          </div>
        </PivotCard>

        {/* Clarity Clock */}
        <PivotCard variant="heart" className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pivot-heart-burgundy/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-pivot-heart-burgundy" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">The Clarity Clock</h4>
              <p className="text-muted-foreground text-sm">
                A 14-day reset window... your nervous system needs space to stop treating this person like a threat or a
                savior.
              </p>
            </div>
          </div>
        </PivotCard>

        {/* Pattern Recognition */}
        <PivotCard variant="clarity" className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-pivot-clarity-cyan/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-pivot-clarity-cyan" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Pattern Recognition</h4>
              <p className="text-muted-foreground text-sm">
                Short, clear explanations for why closeness can feel dangerous... why your reaction isn't "crazy"—it's
                biology.
              </p>
            </div>
          </div>
        </PivotCard>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-auto space-y-4"
      >
        <p className="text-center text-muted-foreground text-sm italic">
          "This isn't about getting them back. It's about getting YOU back."
        </p>

        <Button
          onClick={handleStart}
          disabled={!selectedStatus}
          className="w-full rounded-full py-6 bg-pivot-logic-blue hover:bg-pivot-logic-blue/90 text-white glow-cyan-subtle disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Your Clarity Journey
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <Button
          variant="outline"
          className="w-full rounded-full py-6 border-pivot-heart-burgundy/50 text-foreground bg-transparent"
        >
          See How It Works
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-muted-foreground/60 text-xs mt-8"
      >
        Built for everyone. All genders, all identities, all relationship structures, all versions of love. Grounded in
        logic; open to all.
      </motion.p>
    </div>
  )
}
