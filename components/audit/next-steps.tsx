"use client"

import { motion } from "framer-motion"
import { ArrowRight, Target, Sparkles } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/lib/storage"
import { profileDescriptions, profileNextSteps, type AuditProfile } from "@/lib/system-audit"

interface NextStepsProps {
  onContinue: () => void
}

export function NextSteps({ onContinue }: NextStepsProps) {
  const profile = getUserProfile()
  const auditProfile = (profile.auditProfile || "integrated") as AuditProfile
  const profileInfo = profileDescriptions[auditProfile]
  const nextSteps = profileNextSteps[auditProfile]

  const colorClasses = {
    "pivot-logic-blue": {
      bg: "bg-pivot-logic-blue/20",
      border: "border-pivot-logic-blue/30",
      text: "text-pivot-logic-blue",
      glow: "shadow-[0_0_30px_rgba(0,86,143,0.3)]",
    },
    "pivot-heart-burgundy": {
      bg: "bg-pivot-heart-burgundy/20",
      border: "border-pivot-heart-burgundy/30",
      text: "text-pivot-heart-burgundy",
      glow: "shadow-[0_0_30px_rgba(105,29,51,0.3)]",
    },
    "pivot-clarity-cyan": {
      bg: "bg-pivot-clarity-cyan/20",
      border: "border-pivot-clarity-cyan/30",
      text: "text-pivot-clarity-cyan",
      glow: "glow-cyan",
    },
  }

  const colors = colorClasses[profileInfo.color as keyof typeof colorClasses]

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col">
      {/* Result Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Your System Profile</span>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-2xl ${colors.bg} ${colors.border} border ${colors.glow} mb-6`}
        >
          <h1 className={`font-serif text-2xl font-bold ${colors.text} mb-3`}>{profileInfo.title}</h1>
          <p className="text-foreground/80 leading-relaxed text-sm">{profileInfo.logic}</p>
        </motion.div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="flex items-center gap-2 text-lg font-medium text-foreground mb-4">
          <Target className="w-5 h-5 text-muted-foreground" />
          Your Next Steps
        </h2>

        <div className="space-y-3">
          {nextSteps.steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <PivotCard className="p-4" hover={false}>
                <div className="flex gap-4">
                  <div
                    className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 ${colors.text} font-semibold text-sm`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </PivotCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA - Updated button text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-auto space-y-4"
      >
        <Button
          onClick={onContinue}
          className="w-full rounded-full py-6 bg-pivot-logic-blue hover:bg-pivot-logic-blue/90 text-white glow-cyan-subtle"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}
