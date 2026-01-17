"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/lib/storage"
import { profileDescriptions, type AuditProfile } from "@/lib/system-audit"

interface MissionBriefingProps {
  onEnterDashboard: () => void
}

export function MissionBriefing({ onEnterDashboard }: MissionBriefingProps) {
  const profile = getUserProfile()
  const auditProfile = (profile.auditProfile || "integrated") as AuditProfile
  const profileInfo = profileDescriptions[auditProfile]

  // Profile color mapping
  const profileColors: Record<AuditProfile, { primary: string; glow: string; bg: string }> = {
    integrated: {
      primary: "#00568f",
      glow: "0 0 30px rgba(0,86,143,0.4)",
      bg: "rgba(0,86,143,0.15)",
    },
    compartmentalized: {
      primary: "#691d33",
      glow: "0 0 30px rgba(105,29,51,0.4)",
      bg: "rgba(105,29,51,0.15)",
    },
    shutdown: {
      primary: "#00f5ff",
      glow: "0 0 30px rgba(0,245,255,0.4)",
      bg: "rgba(0,245,255,0.15)",
    },
  }

  const colors = profileColors[auditProfile]

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-muted-foreground text-sm mb-4"
      >
        You've finished the audit. Here's what it means and what happens next.
      </motion.p>

      {/* Success Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center mb-8"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: colors.bg,
            boxShadow: colors.glow,
          }}
        >
          <CheckCircle2 className="w-10 h-10" style={{ color: colors.primary }} />
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">System Audit Complete.</h1>
        <p className="text-foreground/80 leading-relaxed max-w-md mx-auto">
          The data is in. You've moved from emotional fog to structural clarity. You are no longer guessing; you are
          witnessing.
        </p>
      </motion.div>

      {/* Profile Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <p className="text-center text-muted-foreground text-xs uppercase tracking-wider mb-4">Your Dynamic Profile</p>

        <div
          className="p-6 rounded-2xl border"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.primary,
            boxShadow: colors.glow,
          }}
        >
          <h2 className="font-serif text-xl font-bold mb-3 text-center" style={{ color: colors.primary }}>
            {profileInfo.title}
          </h2>
          <p className="text-foreground/80 text-sm leading-relaxed text-center">{profileInfo.logic}</p>
        </div>
      </motion.div>

      {/* Mission Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mb-8 px-4"
      >
        <p className="text-foreground/90 leading-relaxed">
          Your <span className="font-semibold text-pivot-clarity-cyan">14-day Clarity Window</span> is now active.
        </p>
        <p className="text-muted-foreground text-sm mt-2 italic">
          Your priority is not "fixing" the relationship—it is stabilizing your system.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center mb-6"
      >
        <p className="text-sm text-muted-foreground">
          Next step: Tap 'Enter My Dashboard' to start your 14-day clarity window.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-auto">
        <Button
          onClick={onEnterDashboard}
          className="w-full rounded-full py-6 text-white"
          style={{
            backgroundColor: "#00568f",
            boxShadow: "0 0 20px rgba(0,245,255,0.3)",
          }}
        >
          Enter My Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}
