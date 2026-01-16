"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface IdentityScreenProps {
  onNext: (data: { age: string; identity: string; pronouns: string }) => void
}

const identityOptions = [
  "Lesbian",
  "Gay",
  "Bisexual",
  "Pansexual",
  "Queer",
  "Transgender",
  "Non-binary",
  "Asexual",
  "Questioning",
  "Straight",
  "Prefer to self-describe",
  "Prefer not to say",
]

const pronounOptions = ["She/Her", "He/Him", "They/Them", "She/They", "He/They", "Any pronouns", "Other"]

export function IdentityScreen({ onNext }: IdentityScreenProps) {
  const [age, setAge] = useState("")
  const [selectedIdentity, setSelectedIdentity] = useState("")
  const [selectedPronouns, setSelectedPronouns] = useState("")

  const canProceed = selectedIdentity && selectedPronouns

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
            <User className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest">About You (Optional)</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">A little about you</h2>
          <p className="text-muted-foreground mt-2">
            This helps us use language that feels right. Skip anything that doesn&apos;t feel comfortable.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-8">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Your Age (optional)</label>
            <Input
              type="number"
              placeholder="Skip if you prefer"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 h-14 text-lg"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-3 block">How do you identify?</label>
            <div className="flex flex-wrap gap-2">
              {identityOptions.map((identity) => (
                <button
                  key={identity}
                  onClick={() => setSelectedIdentity(identity)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all duration-200 border",
                    selectedIdentity === identity
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card border-border text-foreground/80 hover:border-accent/50",
                  )}
                >
                  {identity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-3 block">Your pronouns?</label>
            <div className="flex flex-wrap gap-2">
              {pronounOptions.map((pronoun) => (
                <button
                  key={pronoun}
                  onClick={() => setSelectedPronouns(pronoun)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all duration-200 border",
                    selectedPronouns === pronoun
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card border-border text-foreground/80 hover:border-accent/50",
                  )}
                >
                  {pronoun}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-8">
        <Button
          onClick={() => onNext({ age, identity: selectedIdentity, pronouns: selectedPronouns })}
          disabled={!canProceed}
          className="w-full h-14 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
