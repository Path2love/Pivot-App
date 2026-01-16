"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Brain, Lightbulb, ChevronDown, ChevronUp, PenLine } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getDailyAnchor } from "@/lib/daily-anchors"
import { saveJournalEntry, getJournalEntries } from "@/lib/storage"

interface DailyAnchorCardProps {
  dayNumber: number
}

export function DailyAnchorCard({ dayNumber }: DailyAnchorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showJournal, setShowJournal] = useState(false)
  const [journalText, setJournalText] = useState("")
  const [saved, setSaved] = useState(false)

  const anchor = getDailyAnchor(dayNumber)

  // Check if already journaled for this day's anchor
  const existingEntry = getJournalEntries().find((e) => e.type === "anchor" && e.dayNumber === dayNumber)

  if (!anchor) {
    // For days 8+, show a simpler prompt
    return (
      <PivotCard variant="heart" className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-pivot-heart-burgundy/20 flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-pivot-heart-burgundy" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Day {dayNumber}</h3>
            <p className="text-muted-foreground text-sm">
              You're past the first week. The hardest part is behind you. Keep observing, keep breathing.
            </p>
          </div>
        </div>
      </PivotCard>
    )
  }

  const handleSaveJournal = () => {
    if (!journalText.trim()) return

    saveJournalEntry({
      id: Date.now().toString(),
      type: "anchor",
      prompt: anchor.logicPrompt,
      text: journalText.trim(),
      timestamp: new Date().toISOString(),
      dayNumber,
    })

    setSaved(true)
    setJournalText("")
    setTimeout(() => {
      setShowJournal(false)
      setSaved(false)
    }, 1500)
  }

  return (
    <PivotCard variant="heart" className="overflow-hidden" hover={false}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-start justify-between text-left"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-pivot-heart-burgundy/20 flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-pivot-heart-burgundy" />
          </div>
          <div>
            <p className="text-xs text-pivot-clarity-cyan uppercase tracking-wider mb-1">Day {dayNumber} Anchor</p>
            <h3 className="font-serif text-lg font-semibold text-foreground">{anchor.title}</h3>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-5 pb-5"
          >
            {/* Heart Section */}
            <div className="mb-4 p-4 rounded-xl bg-pivot-heart-burgundy/10 border border-pivot-heart-burgundy/20">
              <div className="flex items-center gap-2 text-pivot-heart-burgundy text-sm font-medium mb-2">
                <Heart className="w-4 h-4" />
                <span>Heart</span>
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed italic">"{anchor.heart}"</p>
            </div>

            {/* Logic Section */}
            <div className="mb-4 p-4 rounded-xl bg-pivot-logic-blue/10 border border-pivot-logic-blue/20">
              <div className="flex items-center gap-2 text-pivot-logic-blue text-sm font-medium mb-2">
                <Brain className="w-4 h-4" />
                <span>Logic</span>
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed">{anchor.logic}</p>
            </div>

            {/* Logic Prompt */}
            <div className="p-4 rounded-xl bg-pivot-clarity-cyan/10 border border-pivot-clarity-cyan/20">
              <div className="flex items-center gap-2 text-pivot-clarity-cyan text-sm font-medium mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>Today's Focus</span>
              </div>
              <p className="text-foreground text-sm leading-relaxed">{anchor.logicPrompt}</p>
            </div>

            {/* Journal Section */}
            {!existingEntry && !showJournal && (
              <Button
                onClick={() => setShowJournal(true)}
                variant="outline"
                className="w-full mt-4 rounded-full border-pivot-slate-800"
              >
                <PenLine className="w-4 h-4 mr-2" />
                Reflect on this
              </Button>
            )}

            {existingEntry && (
              <div className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Your reflection:</p>
                <p className="text-sm text-foreground/80 line-clamp-2">{existingEntry.text}</p>
              </div>
            )}

            <AnimatePresence>
              {showJournal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  <Textarea
                    placeholder="What comes up for you when you read this?"
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    className="min-h-[100px] bg-secondary/30 border-border"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowJournal(false)}
                      variant="outline"
                      className="flex-1 rounded-full"
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveJournal}
                      disabled={!journalText.trim() || saved}
                      className="flex-1 rounded-full bg-pivot-logic-blue hover:bg-pivot-logic-blue/90"
                      size="sm"
                    >
                      {saved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </PivotCard>
  )
}
