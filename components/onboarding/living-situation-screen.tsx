"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Home, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LivingSituationScreenProps {
  onNext: (data: { livingSituation: string; sharedCommunity: boolean }) => void
}

const livingOptions = [
  {
    id: "together",
    label: "We live(d) together",
    description: "Shared home or space",
  },
  {
    id: "separate",
    label: "We live(d) separately",
    description: "Different homes",
  },
  {
    id: "complicated",
    label: "It's complicated",
    description: "Partially shared, or in transition",
  },
  {
    id: "na",
    label: "Not applicable",
    description: "This isn't about a specific person",
  },
]

export function LivingSituationScreen({ onNext }: LivingSituationScreenProps) {
  const [selectedLiving, setSelectedLiving] = useState("")
  const [sharedCommunity, setSharedCommunity] = useState<boolean | null>(null)

  const canProceed = selectedLiving && (selectedLiving === "na" || sharedCommunity !== null)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen px-6 py-12 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-accent mb-2">
            <Home className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest">Your Context</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Your situation</h2>
          <p className="text-muted-foreground mt-2">
            Understanding your circumstances helps us offer relevant support.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
          <div>
            <label className="text-sm text-muted-foreground mb-3 block">Living arrangement</label>
            <div className="space-y-2">
              {livingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedLiving(option.id)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-200 border",
                    selectedLiving === option.id
                      ? "bg-card border-primary ring-1 ring-primary"
                      : "bg-card/50 border-border hover:border-primary/50",
                  )}
                >
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {selectedLiving && selectedLiving !== "na" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <label className="text-sm text-muted-foreground mb-3 block">
                Do you share friend groups, community, or social spaces?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSharedCommunity(true)}
                  className={cn(
                    "p-4 rounded-xl text-center transition-all duration-200 border",
                    sharedCommunity === true
                      ? "bg-accent/20 border-accent ring-1 ring-accent"
                      : "bg-card/50 border-border hover:border-accent/50",
                  )}
                >
                  <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="font-medium text-foreground text-sm">Yes, overlap</p>
                  <p className="text-xs text-muted-foreground mt-1">Shared circles</p>
                </button>
                <button
                  onClick={() => setSharedCommunity(false)}
                  className={cn(
                    "p-4 rounded-xl text-center transition-all duration-200 border",
                    sharedCommunity === false
                      ? "bg-card border-primary ring-1 ring-primary"
                      : "bg-card/50 border-border hover:border-primary/50",
                  )}
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium text-foreground text-sm">No, separate</p>
                  <p className="text-xs text-muted-foreground mt-1">Different worlds</p>
                </button>
              </div>
            </motion.div>
          )}

          {sharedCommunity === true && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 rounded-xl bg-accent/10 border border-accent/20"
            >
              <p className="text-sm text-foreground/80">
                <span className="font-medium text-accent">Shared spaces are complex.</span> We&apos;ll help you think
                through how to navigate them in a way that works for you—no prescriptions, just options.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-8">
        <Button
          onClick={() => onNext({ livingSituation: selectedLiving, sharedCommunity: sharedCommunity ?? false })}
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
