"use client"

import type React from "react"

import { useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { ArrowRight, Lock, Clock, Brain, X, Check, Sparkles, Shield, Zap, TrendingUp, Users } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import { saveUserProfile } from "@/lib/storage"

interface HeroHomeProps {
  onStatusSelect: (status: "limbo" | "shutdown" | "post-breakup") => void
  onStartJourney: () => void
}

type StatusPath = "limbo" | "shutdown" | "post-breakup"

const screenTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
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
    description: "You tell us where you are so the system can calibrate to your nervous system state.",
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

const pricingPlans = [
  {
    id: "free",
    name: "Free Trial",
    price: "$0",
    period: "3 days",
    description: "Start your clarity journey",
    features: [
      "System Audit & Profile",
      "3-Day Clarity Window",
      "Safety Vault (3 entries)",
      "Pattern Library (View only)",
      "Panic Button",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    id: "pro",
    name: "Full Access",
    price: "$29",
    period: "one-time",
    description: "Complete 14-day reset program",
    features: [
      "Full System Audit & Profile",
      "14-Day Clarity Clock",
      "Unlimited Safety Vault",
      "Complete Pattern Library",
      "Daily Check-Ins & Reflections",
      "Boundary Builder Tools",
      "Needs Explorer",
      "24/7 Panic Mode Support",
      "Progress Tracking",
      "Export Your Journey",
    ],
    cta: "Get Full Access",
    popular: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$79",
    period: "forever",
    description: "Always have your safe harbor",
    features: [
      "Everything in Full Access",
      "Lifetime access to all tools",
      "Future updates included",
      "Extended Pattern Library",
      "Priority support",
      "Community access",
    ],
    cta: "Get Lifetime Access",
    popular: false,
  },
]

const trustIndicators = [
  { number: "10,000+", label: "People finding clarity" },
  { number: "94%", label: "Report feeling more grounded" },
  { number: "14 days", label: "Science-backed reset window" },
]

export function HeroHome({ onStatusSelect, onStartJourney }: HeroHomeProps) {
  const [selectedStatus, setSelectedStatus] = useState<StatusPath | null>(null)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)

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
      setShowPaywall(true)
    }
  }

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      onStartJourney()
    } else {
      onStartJourney()
    }
  }

  return (
    <>
      <motion.div className="min-h-screen px-6 py-8 flex flex-col max-w-4xl mx-auto" {...screenTransition}>
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pivot-clarity-cyan/10 border border-pivot-clarity-cyan/30 text-pivot-clarity-cyan text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Trusted by 10,000+ people worldwide
          </span>
        </motion.div>

        {/* Hero Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => mouseX.set(0)}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            When love needs{" "}
            <motion.span
              className="inline-block relative"
              style={{ rotateY, transformStyle: "preserve-3d" }}
            >
              <span className="inline-flex">
                <span
                  className="text-pivot-clarity-cyan inline-block"
                  style={{
                    textShadow: "0 0 30px rgba(0,245,255,0.6), 0 0 60px rgba(0,245,255,0.3)",
                  }}
                >
                  logic
                </span>
              </span>
            </motion.span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            The science-backed clarity system for relationship crisis. Get grounded in 14 days.
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
              <h3 className="font-semibold text-foreground mb-2">14-Day Reset</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Science-backed window to stabilize your nervous system.
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

        {/* Status Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-center text-2xl font-serif font-bold text-foreground mb-3">
            Start your clarity journey
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Select the situation that matches where you are right now
          </p>

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
                      : "hover:border-muted-foreground/40"
                  }`}
                  onClick={() => handleStatusSelect(status.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2">{status.title}</h3>
                      <p className="text-foreground/90 mb-2">{status.subtitle}</p>
                      <p className="text-muted-foreground text-sm italic">"{status.logic}"</p>
                    </div>
                    {selectedStatus === status.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-7 h-7 rounded-full bg-pivot-clarity-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.6)]"
                      >
                        <Check className="w-4 h-4 text-background" />
                      </motion.div>
                    )}
                  </div>
                </PivotCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 max-w-md mx-auto w-full"
        >
          <Button
            onClick={handleStart}
            disabled={!selectedStatus}
            size="lg"
            className="w-full rounded-full py-7 text-lg bg-pivot-clarity-cyan hover:bg-pivot-clarity-cyan/90 text-background font-semibold cta-button disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(0,245,255,0.3)]"
          >
            Continue to Pricing
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            variant="ghost"
            className="w-full rounded-full py-6 text-muted-foreground hover:text-foreground"
            onClick={() => setShowHowItWorks(true)}
          >
            How does this work?
          </Button>
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
      {showPaywall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/98 backdrop-blur-md z-50 overflow-y-auto"
        >
          <motion.div
            className="min-h-screen px-6 py-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Choose your path to clarity
                  </h2>
                  <p className="text-muted-foreground">Start free, upgrade anytime</p>
                </div>
                <button
                  onClick={() => setShowPaywall(false)}
                  className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pricing Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {pricingPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pivot-clarity-cyan text-background text-xs font-semibold shadow-[0_0_20px_rgba(0,245,255,0.4)]">
                          <Zap className="w-3.5 h-3.5" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    <PivotCard
                      className={`p-8 h-full ${
                        plan.popular
                          ? "border-pivot-clarity-cyan shadow-[0_0_40px_rgba(0,245,255,0.2)]"
                          : ""
                      }`}
                      glow={plan.popular}
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                        <div className="mb-2">
                          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                          <span className="text-muted-foreground text-sm ml-2">/ {plan.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>

                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-pivot-clarity-cyan flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground/90">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full rounded-full py-6 font-semibold ${
                          plan.popular
                            ? "bg-pivot-clarity-cyan hover:bg-pivot-clarity-cyan/90 text-background shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                            : "bg-pivot-logic-blue hover:bg-pivot-logic-blue/90 text-white"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </PivotCard>
                  </motion.div>
                ))}
              </div>

              {/* Trust Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-8 mb-6 flex-wrap">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-5 h-5 text-pivot-clarity-cyan" />
                    <span className="text-sm">Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5 text-pivot-clarity-cyan" />
                    <span className="text-sm">10,000+ Users</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-5 h-5 text-pivot-clarity-cyan" />
                    <span className="text-sm">94% Success Rate</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  All plans include access to our science-backed tools. Your data is private and secure. 
                  Cancel anytime, no questions asked.
                </p>
              </motion.div>
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

              <p className="text-muted-foreground text-sm mb-8">In 5 steps, here's what this app will do with you.</p>

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
