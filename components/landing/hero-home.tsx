"use client"

import type React from "react"

import { useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { ArrowRight, Lock, Clock, Brain, X } from "lucide-react"
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

const howItWorksSteps = [
  {
    step: 1,
    title: "The Status Check",
    description:
      "We begin by identifying your current location (Limbo, Shutdown, or Post-Breakup) so the system can calibrate to your specific nervous system state.",
  },
  {
    step: 2,
    title: "The System Audit",
    description:
      "A 10-question behavioral diagnostic. This isn't about 'feelings'—it's an engineering report on the reliability of your relationship's architecture.",
  },
  {
    step: 3,
    title: "The Profile",
    description:
      "We categorize the connection as an Integrated System, a Compartmentalized System, or a Shutdown Cycle to remove the mystery of 'what happened'.",
  },
  {
    step: 4,
    title: "The 14-Day Reset",
    description:
      "A science-backed window to stabilize your neurochemistry. You'll receive a daily 'Logic Anchor' to counter 'Heart Panic'.",
  },
  {
    step: 5,
    title: "The Toolkit",
    description:
      "Access to the Safety Vault (for dopamine cravings), Pattern Recognition (to stop self-blame), and Somatic Panic Mode (to ground your body).",
  },
]

export function HeroHome({ onStatusSelect, onStartJourney }: HeroHomeProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusPath | null>(null)
  const [showHowItWorks, setShowHowItWorks] = useState(false)

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
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          The{" "}
          <motion.span
            className="inline-block"
            style={{ rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ rotate: 5 }}
          >
            <span className="inline-flex">
              <motion.span whileHover={{ rotate: 5 }} style={{ display: "inline-block" }}>
                P
              </motion.span>
              <motion.span whileHover={{ rotate: 5 }} style={{ display: "inline-block" }}>
                I
              </motion.span>
              <span
                className="text-[#00f5ff] inline-block"
                style={{
                  textShadow: "0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 60px #00f5ff",
                  transform: "rotate(0deg)",
                }}
              >
                V
              </span>
              <motion.span whileHover={{ rotate: 5 }} style={{ display: "inline-block" }}>
                O
              </motion.span>
              <motion.span whileHover={{ rotate: 5 }} style={{ display: "inline-block" }}>
                T
              </motion.span>
            </span>
          </motion.span>
        </h1>
        <p className="text-xl text-muted-foreground font-serif italic mb-6">When Love Needs Logic</p>

        <p className="text-foreground/90 max-w-md mx-auto leading-relaxed mb-4">
          You're not here to "move on." You're here to understand what happened—and find your way back to solid ground.
        </p>

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
                  selectedStatus === status.id
                    ? "border-[#00f5ff] shadow-[0_0_20px_rgba(0,245,255,0.4)]"
                    : "hover:border-muted-foreground/30"
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
                      className="w-6 h-6 rounded-full bg-[#00f5ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.6)]"
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-10"
      >
        <p className="text-center text-muted-foreground text-xs uppercase tracking-wider mb-6">What You'll Get</p>

        <div className="space-y-5 px-2">
          {/* Safety Vault */}
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-pivot-logic-blue flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">The Safety Vault</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Write the text you're desperate to send. Lock it away. Give yourself 24 hours.
              </p>
            </div>
          </div>

          {/* Clarity Clock */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-pivot-heart-burgundy flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">The Clarity Clock</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A 14-day reset window... your nervous system needs space to stop treating this person like a threat or a
                savior.
              </p>
            </div>
          </div>

          {/* Pattern Recognition */}
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-pivot-clarity-cyan flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Pattern Recognition</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Short, clear explanations for why closeness can feel dangerous... why your reaction isn't "crazy"—it's
                biology.
              </p>
            </div>
          </div>
        </div>
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
          onClick={() => setShowHowItWorks(true)}
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

      {/* How It Works Modal */}
      {showHowItWorks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-6 py-12">
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-bold text-foreground">How It Works</h2>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {howItWorksSteps.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PivotCard className="p-5" hover={false}>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-pivot-clarity-cyan/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-pivot-clarity-cyan font-semibold text-sm">{item.step}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </PivotCard>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => setShowHowItWorks(false)}
                className="w-full rounded-full py-6 mt-8 bg-pivot-logic-blue hover:bg-pivot-logic-blue/90 text-white"
              >
                Got It
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
