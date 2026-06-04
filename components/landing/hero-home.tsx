"use client"

import type React from "react"

import { useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { ArrowRight, Lock, Clock, Brain, X, Check, Shield, Zap } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import Checkout from "@/components/checkout"

interface HeroHomeProps {
  onStatusSelect: (status: "limbo" | "shutdown" | "post-breakup") => void
  onStartJourney: () => void
}

type StatusPath = "limbo" | "shutdown" | "post-breakup"

const screenTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" as const },
}

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
    description: "You tell us where you are. The system adapts your experience based on your situation.",
  },
  {
    step: 2,
    title: "The System Audit",
    description: "You answer 10 short questions—an engineering report on your relationship's reliability.",
  },
  {
    step: 3,
    title: "The Profile",
    description: "You see what kind of system you were in: Integrated, Compartmentalized, or Shutdown.",
  },
  {
    step: 4,
    title: "The 14-Day Reset",
    description: "You get a science-backed window to stabilize your neurochemistry with daily anchors.",
  },
  {
    step: 5,
    title: "The Toolkit",
    description: "You access tools to stay steady: Safety Vault, Pattern Library, and Somatic Panic Mode.",
  },
]

const protocolFeatures = [
  "Relationship System Audit + personalised profile",
  "14-Day Clarity Clock with daily anchors",
  "Unlimited Safety Vault",
  "Complete Pattern Library",
  "Needs Navigator + Boundary Builder",
  "Guided Reflection sequences",
  "Somatic Panic Tool — always on",
  "14-day money-back guarantee",
]

const trustIndicators = [
  { number: "Science-backed", label: "Attachment & neuroscience research" },
  { number: "14 days", label: "Proven reset window" },
  { number: "7 tools", label: "Vault, Patterns, Reflection + more" },
]

export function HeroHome({ onStatusSelect, onStartJourney }: HeroHomeProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusPath | null>(null)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const mouseX = useMotionValue(0)
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    mouseX.set(e.clientX - centerX)
  }

  const handleStatusSelect = (status: StatusPath) => {
    setSelectedStatus(status)
    onStatusSelect(status)
  }

  return (
    <>
      <motion.div className="min-h-screen px-6 py-8 flex flex-col max-w-4xl mx-auto" {...screenTransition}>
        {/* Hero Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => mouseX.set(0)}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-4 leading-[1.1] tracking-tight">
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
                  className="text-pivot-clarity-cyan inline-block"
                  style={{
                    textShadow: "0 0 30px rgba(0,245,255,0.6), 0 0 60px rgba(0,245,255,0.3)",
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
          <p className="text-xl md:text-2xl text-muted-foreground font-serif italic mb-6">When Love Needs Logic</p>
          
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            A 14-day clarity protocol for relationship crisis. Not therapy. Not another subscription. An answer.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            {trustIndicators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-pivot-clarity-cyan mb-1">{item.number}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            What makes The Pivot different
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <PivotCard className="p-6 text-center" hover>
              <div className="w-12 h-12 rounded-full bg-pivot-logic-blue/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-pivot-logic-blue" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Safety Vault</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lock away texts before you send them. Give yourself 24 hours.
              </p>
            </PivotCard>

            <PivotCard className="p-6 text-center" hover>
              <div className="w-12 h-12 rounded-full bg-pivot-heart-burgundy/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-pivot-heart-burgundy" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">14-Day Clarity Clock</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Science-backed window to reach a real decision — not just survive the moment.
              </p>
            </PivotCard>

            <PivotCard className="p-6 text-center" hover>
              <div className="w-12 h-12 rounded-full bg-pivot-clarity-cyan/20 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-pivot-clarity-cyan" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Pattern Library</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Understand why your reaction isn't crazy—it's biology.
              </p>
            </PivotCard>
          </div>
        </motion.div>

        {/* Status Selection — Step 1 (required) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-pivot-clarity-cyan flex items-center justify-center flex-shrink-0">
              <span className="text-background font-bold text-sm">1</span>
            </div>
            <h2 className="text-center text-2xl font-serif font-bold text-foreground">
              Where are you right now?
            </h2>
          </div>
          <p className="text-center text-foreground/70 mb-2 font-medium">
            Choose your situation — this shapes your entire experience
          </p>
          {!selectedStatus && (
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-center text-pivot-clarity-cyan text-sm font-medium mb-6"
            >
              ↓ Tap a card below to get started
            </motion.p>
          )}
          {selectedStatus && (
            <p className="text-center text-pivot-clarity-cyan text-sm font-medium mb-6">
              ✓ Got it — now scroll down to continue
            </p>
          )}

          <div className="space-y-3 max-w-2xl mx-auto">
            {statusPaths.map((status, index) => (
              <motion.div
                key={status.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <PivotCard
                  variant={selectedStatus === status.id ? "clarity" : "default"}
                  glow={selectedStatus === status.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedStatus === status.id
                      ? "border-pivot-clarity-cyan shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                      : !selectedStatus
                        ? "hover:border-pivot-clarity-cyan/60 border-muted-foreground/20 shadow-[0_0_0px_rgba(0,245,255,0)] hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                        : "hover:border-muted-foreground/40 opacity-60"
                  }`}
                  onClick={() => handleStatusSelect(status.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">{status.title}</h3>
                      <p className="text-foreground/90 mb-2">{status.subtitle}</p>
                      <p className="text-muted-foreground text-sm italic">"{status.logic}"</p>
                    </div>
                    {selectedStatus === status.id ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-7 h-7 rounded-full bg-pivot-clarity-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.6)]"
                      >
                        <Check className="w-4 h-4 text-background" />
                      </motion.div>
                    ) : (
                      <div className="w-7 h-7 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                </PivotCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section — Step 2 (unlocks after selection) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 max-w-md mx-auto w-full"
        >
          {!selectedStatus ? (
            <div className="rounded-2xl border-2 border-dashed border-muted-foreground/20 p-6 text-center">
              <p className="text-muted-foreground text-sm font-medium">
                Select your situation above to unlock the next step
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-pivot-clarity-cyan flex items-center justify-center flex-shrink-0">
                  <span className="text-background font-bold text-sm">2</span>
                </div>
                <p className="text-foreground/80 font-medium text-sm">Take the free 5-minute audit</p>
              </div>
              <Button
                onClick={() => onStartJourney()}
                size="lg"
                className="w-full rounded-full py-7 text-lg bg-pivot-clarity-cyan hover:bg-pivot-clarity-cyan/90 text-background font-semibold cta-button shadow-[0_0_40px_rgba(0,245,255,0.3)]"
              >
                Start Your Free Relationship Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-center text-muted-foreground/70 text-xs">
                5 minutes. Free. No card required. See your Relationship Profile instantly.
              </p>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-xs text-muted-foreground/50">or</span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <Button
                variant="ghost"
                className="w-full rounded-full py-5 text-muted-foreground hover:text-foreground text-sm"
                onClick={() => setShowPaywall(true)}
              >
                See pricing first →
              </Button>
            </>
          )}

          {!selectedStatus && (
            <Button
              variant="ghost"
              className="w-full rounded-full py-5 text-muted-foreground hover:text-foreground text-sm"
              onClick={() => setShowHowItWorks(true)}
            >
              How does this work?
            </Button>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-muted-foreground/60 text-xs mt-12"
        >
          Built for everyone. All genders, identities, and relationship structures.
        </motion.p>
      </motion.div>

      {/* Paywall Modal */}
      {showPaywall && !showCheckout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/98 backdrop-blur-md z-50 overflow-y-auto"
        >
          <motion.div
            className="min-h-screen px-6 py-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-1">
                    Unlock Your 14-Day Clarity Protocol
                  </h2>
                  <p className="text-muted-foreground text-sm">One-time. No subscription. No renewal.</p>
                </div>
                <button
                  onClick={() => setShowPaywall(false)}
                  className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price anchor */}
              <div className="mb-6 p-4 rounded-xl bg-pivot-slate-900/60 border border-pivot-slate-800 text-center">
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Therapy charges <span className="text-pivot-clarity-cyan font-semibold">$250+/hour</span> to ask "how does that make you feel?" for 6 months.
                  The Pivot gives you a framework, a decision, and 14 days of structured clarity. One time.
                </p>
              </div>

              <PivotCard className="p-6 border-pivot-clarity-cyan shadow-[0_0_40px_rgba(0,245,255,0.15)]" glow>
                <div className="text-center mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pivot-clarity-cyan/20 border border-pivot-clarity-cyan/40 mb-4">
                    <Zap className="w-3.5 h-3.5 text-pivot-clarity-cyan" />
                    <span className="text-pivot-clarity-cyan text-xs font-semibold">14-Day Clarity Protocol</span>
                  </div>
                  <div className="mb-1">
                    <span className="text-5xl font-bold text-foreground">$79</span>
                    <span className="text-muted-foreground text-sm ml-2">one-time</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Less than one therapy session. 14-day money-back guarantee.</p>
                </div>

                <div className="space-y-2.5 mb-6">
                  {protocolFeatures.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-pivot-clarity-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setShowCheckout(true)}
                  className="w-full rounded-full py-6 bg-pivot-clarity-cyan hover:bg-pivot-clarity-cyan/90 text-background font-semibold text-base shadow-[0_0_30px_rgba(0,245,255,0.3)] cta-button"
                >
                  Unlock The Protocol
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="text-xs">Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="text-xs">Private & encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Brain className="w-3.5 h-3.5" />
                    <span className="text-xs">Science-backed</span>
                  </div>
                </div>
              </PivotCard>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Checkout Modal */}
      {showPaywall && showCheckout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/98 backdrop-blur-md z-50 overflow-y-auto"
        >
          <motion.div
            className="min-h-screen px-6 py-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Secure Checkout</h2>
                  <p className="text-muted-foreground text-sm">Powered by Stripe</p>
                </div>
              </div>
              <Checkout productId="full-access" />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* How It Works Modal */}
      {showHowItWorks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto"
        >
          <motion.div
            className="min-h-screen px-6 py-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">How It Works</h2>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-muted-foreground text-sm mb-8">In 5 steps, here's how the 14-Day Clarity Protocol works.</p>

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
                className="w-full rounded-full py-6 mt-8 bg-pivot-clarity-cyan hover:bg-pivot-clarity-cyan/90 text-background cta-button font-semibold"
              >
                Got It
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
