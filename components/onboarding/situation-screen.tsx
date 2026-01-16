"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CloudRain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SituationScreenProps {
  onNext: (data: { situationType: string; relationshipStatus: string }) => void
}

const situationOptions = [
  {
    id: "breakup",
    label: "A breakup or separation",
    description: "Recent or still processing",
  },
  {
    id: "uncertainty",
    label: "Relationship uncertainty",
    description: "Not sure where things stand",
  },
  {
    id: "onoff",
    label: "An on-again/off-again pattern",
    description: "Cycling between together and apart",
  },
  {
    id: "distance",
    label: "Feeling distant or disconnected",
    description: "Still together but something feels off",
  },
  {
    id: "processing",
    label: "Processing past relationships",
    description: "Understanding patterns from before",
  },
  {
    id: "growth",
    label: "Personal growth",
    description: "Working on myself and how I relate",
  },
]

const statusOptions = [
  { id: "single", label: "Single" },
  { id: "separated", label: "Separated" },
  { id: "itsComplicated", label: "It's complicated" },
  { id: "together", label: "Still together" },
  { id: "noContact", label: "No contact" },
  { id: "limitedContact", label: "Limited contact" },
]

export function SituationScreen({ onNext }: SituationScreenProps) {
  const [selectedSituation, setSelectedSituation] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const canProceed = selectedSituation && selectedStatus

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen px-6 py-12 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-amber mb-2">
            <CloudRain className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest">Your Situation</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">What brought you here?</h2>
          <p className="text-muted-foreground mt-2">
            There&apos;s no right or wrong answer. Just pick what feels closest to your experience.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
          <div className="space-y-3">
            {situationOptions.map((situation) => (
              <button
                key={situation.id}
                onClick={() => setSelectedSituation(situation.id)}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all duration-200 border",
                  selectedSituation === situation.id
                    ? "bg-card border-primary ring-1 ring-primary"
                    : "bg-card/50 border-border hover:border-primary/50",
                )}
              >
                <p className="font-medium text-foreground">{situation.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{situation.description}</p>
              </button>
            ))}
          </div>

          {selectedSituation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <label className="text-sm text-muted-foreground mb-3 block">Where do things currently stand?</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setSelectedStatus(status.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-all duration-200 border",
                      selectedStatus === status.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-foreground/80 hover:border-primary/50",
                    )}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-8">
        <Button
          onClick={() => onNext({ situationType: selectedSituation, relationshipStatus: selectedStatus })}
          disabled={!canProceed}
          className="w-full h-14 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
