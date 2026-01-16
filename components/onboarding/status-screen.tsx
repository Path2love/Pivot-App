"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CloudLightning, Power, HeartCrack, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StatusScreenProps {
  onNext: (status: string) => void
}

const statusOptions = [
  {
    id: "limbo",
    label: "In Limbo",
    description: "Still talking, still trying",
    icon: CloudLightning,
    color: "text-amber",
  },
  {
    id: "shutdown",
    label: "The Sudden Shutdown",
    description: "They deactivated suddenly",
    icon: Power,
    color: "text-destructive",
  },
  {
    id: "separated",
    label: "Recently Separated",
    description: "The decision has been made",
    icon: HeartCrack,
    color: "text-muted-foreground",
  },
  {
    id: "churning",
    label: "Relationship Churning",
    description: "On/off cycle repeating",
    icon: RefreshCw,
    color: "text-accent",
  },
]

export function StatusScreen({ onNext }: StatusScreenProps) {
  const [selectedStatus, setSelectedStatus] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen px-6 py-12 flex flex-col"
    >
      <div className="flex-1">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-accent mb-2">
            <CloudLightning className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest">Step 2 of 4</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">Where are you in the storm?</h2>
          <p className="text-muted-foreground mt-2">Understanding your situation helps us guide you better.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-3">
          {statusOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedStatus(option.id)}
                className={cn(
                  "w-full p-4 rounded-xl border text-left transition-all duration-200",
                  selectedStatus === option.id
                    ? "bg-card border-primary ring-1 ring-primary"
                    : "bg-card/50 border-border hover:border-primary/50",
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn("w-12 h-12 rounded-full bg-secondary flex items-center justify-center", option.color)}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-8">
        <Button
          onClick={() => onNext(selectedStatus)}
          disabled={!selectedStatus}
          className="w-full h-14 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
