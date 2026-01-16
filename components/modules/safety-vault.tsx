"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Lock, Sparkles, ChevronDown, ChevronUp, Clock } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { saveVaultEntry, getVaultEntries } from "@/lib/storage"

interface SafetyVaultProps {
  onBack: () => void
}

export function SafetyVault({ onBack }: SafetyVaultProps) {
  const [text, setText] = useState("")
  const [showResponse, setShowResponse] = useState(false)
  const [showPastEntries, setShowPastEntries] = useState(false)

  const pastEntries = getVaultEntries()

  const handleDeposit = () => {
    if (!text.trim()) return

    const reflectionQuestions = [
      "If you send this now, you are medicating their choice. Let them feel the silence so they can find their own truth.",
      "What outcome are you hoping for? Is that outcome within your control?",
      "Would you send this if you knew they wouldn't respond for a week?",
    ]

    saveVaultEntry({
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date().toISOString(),
      reflectionQuestions,
    })

    setText("")
    setShowResponse(true)
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pivot-logic-blue/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-pivot-logic-blue" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">The Safety Vault</h2>
              <p className="text-sm text-muted-foreground">Write it. Lock it. Give yourself 24 hours.</p>
            </div>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <PivotCard variant="logic" className="p-5 mb-6" hover={false}>
            <p className="text-foreground/90 leading-relaxed text-sm mb-3">
              This is where the texts you're desperate to send come to rest. Write them here instead. Lock them away.
              Give yourself 24 hours before you decide anything.
            </p>
            <div className="flex items-center gap-2 text-pivot-clarity-cyan text-sm">
              <Clock className="w-4 h-4" />
              <span>Most urges pass within 20 minutes.</span>
            </div>
          </PivotCard>
        </motion.div>

        {/* Writing Area */}
        <AnimatePresence mode="wait">
          {!showResponse ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-muted-foreground mb-2">What are you desperate to say?</label>
                <Textarea
                  placeholder="Write the message you want to send..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[180px] bg-pivot-slate-900/50 border-pivot-slate-800"
                />
              </div>
              <Button
                onClick={handleDeposit}
                disabled={!text.trim()}
                className="w-full rounded-full py-6 bg-pivot-logic-blue hover:bg-pivot-logic-blue/90 text-white glow-cyan-subtle"
              >
                <Lock className="w-4 h-4 mr-2" />
                Deposit to Vault
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <PivotCard variant="clarity" className="p-5" glow hover={false}>
                <div className="flex items-center gap-2 text-pivot-clarity-cyan mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Words Secured</span>
                </div>
                <p className="text-foreground leading-relaxed mb-4">
                  If you send this now, you are medicating their choice. Let them feel the silence so they can find
                  their own truth.
                </p>
                <p className="text-muted-foreground text-sm italic">
                  Your message is locked. Come back in 24 hours if you still feel the need to send it.
                </p>
              </PivotCard>

              <Button
                onClick={() => setShowResponse(false)}
                variant="outline"
                className="w-full rounded-full border-pivot-slate-800"
              >
                Write something else
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Past Entries */}
        {pastEntries.length > 0 && !showResponse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8">
            <button
              onClick={() => setShowPastEntries(!showPastEntries)}
              className="flex items-center justify-between w-full text-sm text-muted-foreground mb-3"
            >
              <span>Vault History ({pastEntries.length})</span>
              {showPastEntries ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPastEntries && (
              <div className="space-y-3">
                {pastEntries.slice(0, 5).map((entry) => {
                  const hoursAgo = Math.floor((Date.now() - new Date(entry.timestamp).getTime()) / (1000 * 60 * 60))
                  const canRelease = hoursAgo >= 24

                  return (
                    <PivotCard key={entry.id} className="p-4" hover={false}>
                      <p className="text-sm text-foreground/70 line-clamp-2 mb-2">{entry.text}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </p>
                        {canRelease ? (
                          <span className="text-xs text-pivot-clarity-cyan">24h passed - safe to review</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">{24 - hoursAgo}h until review</span>
                        )}
                      </div>
                    </PivotCard>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
