"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, TrendingUp, Check } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { saveCheckIn, type CheckInEntry } from "@/lib/storage"
import { cn } from "@/lib/utils"

interface DailyCheckInProps {
  onBack: () => void
}

const selfCareOptions = [
  "Slept enough",
  "Ate well",
  "Moved my body",
  "Connected with someone",
  "Went outside",
  "Did something enjoyable",
  "Set a boundary",
  "Practiced self-compassion",
]

export function DailyCheckIn({ onBack }: DailyCheckInProps) {
  const [step, setStep] = useState(1)
  const [mood, setMood] = useState(5)
  const [urgeToContact, setUrgeToContact] = useState(5)
  const [anxietyLevel, setAnxietyLevel] = useState(5)
  const [selfCare, setSelfCare] = useState<string[]>([])
  const [insights, setInsights] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  const toggleSelfCare = (item: string) => {
    setSelfCare((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleSubmit = () => {
    const entry: CheckInEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood,
      urgeToContact,
      anxietyLevel,
      selfCareActions: selfCare,
      insights: insights.trim() || undefined,
    }
    saveCheckIn(entry)
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen px-6 py-12 flex flex-col items-center justify-center text-center"
      >
        <div className="w-16 h-16 rounded-full bg-pivot-clarity-cyan/20 flex items-center justify-center mb-6 glow-cyan-subtle">
          <Check className="w-8 h-8 text-pivot-clarity-cyan" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Check-in complete</h2>
        <p className="text-muted-foreground mb-8 max-w-xs">
          Thank you for taking time to notice how you're feeling. Every check-in builds your self-awareness.
        </p>
        <Button onClick={onBack} className="rounded-full bg-pivot-logic-blue hover:bg-pivot-logic-blue/90">
          Return Home
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pivot-logic-blue/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-pivot-logic-blue" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Daily Check-in</h2>
              <p className="text-sm text-muted-foreground">Step {step} of 4</p>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Mood */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <PivotCard className="p-5" hover={false}>
              <h3 className="font-medium text-foreground mb-2">How are you feeling overall today?</h3>
              <p className="text-sm text-muted-foreground mb-6">1 = Really struggling, 10 = Feeling good</p>
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMood(num)}
                    className={cn(
                      "w-8 h-8 rounded-full text-sm font-medium transition-all",
                      mood === num
                        ? "bg-pivot-logic-blue text-white scale-110"
                        : "bg-pivot-slate-800 text-foreground/70 hover:bg-pivot-slate-800/80",
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </PivotCard>
            <Button
              onClick={() => setStep(2)}
              className="w-full rounded-full bg-pivot-logic-blue hover:bg-pivot-logic-blue/90"
            >
              Continue
            </Button>
          </motion.div>
        )}

        {/* Step 2: Urge to Contact */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <PivotCard className="p-5" hover={false}>
              <h3 className="font-medium text-foreground mb-2">How strong is any urge to reach out to them?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                1 = No urge at all, 10 = Very strong urge (no judgment either way)
              </p>
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setUrgeToContact(num)}
                    className={cn(
                      "w-8 h-8 rounded-full text-sm font-medium transition-all",
                      urgeToContact === num
                        ? "bg-pivot-heart-burgundy text-white scale-110"
                        : "bg-pivot-slate-800 text-foreground/70 hover:bg-pivot-slate-800/80",
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </PivotCard>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 rounded-full border-pivot-slate-800"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 rounded-full bg-pivot-logic-blue hover:bg-pivot-logic-blue/90"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Anxiety Level + Self Care */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <PivotCard className="p-5" hover={false}>
              <h3 className="font-medium text-foreground mb-2">What's your anxiety or stress level?</h3>
              <p className="text-sm text-muted-foreground mb-6">1 = Very calm, 10 = Very anxious</p>
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setAnxietyLevel(num)}
                    className={cn(
                      "w-8 h-8 rounded-full text-sm font-medium transition-all",
                      anxietyLevel === num
                        ? "bg-pivot-clarity-cyan text-pivot-clarity-foreground scale-110"
                        : "bg-pivot-slate-800 text-foreground/70 hover:bg-pivot-slate-800/80",
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </PivotCard>

            <PivotCard className="p-5" hover={false}>
              <h3 className="font-medium text-foreground mb-3">Any self-care today? (optional)</h3>
              <div className="flex flex-wrap gap-2">
                {selfCareOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleSelfCare(item)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-all border",
                      selfCare.includes(item)
                        ? "bg-pivot-logic-blue/20 border-pivot-logic-blue text-foreground"
                        : "bg-pivot-slate-900/50 border-pivot-slate-800 text-muted-foreground hover:border-pivot-logic-blue/50",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </PivotCard>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1 rounded-full border-pivot-slate-800"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="flex-1 rounded-full bg-pivot-logic-blue hover:bg-pivot-logic-blue/90"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Insights */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <PivotCard className="p-5" hover={false}>
              <h3 className="font-medium text-foreground mb-2">Anything you noticed or want to remember?</h3>
              <p className="text-sm text-muted-foreground mb-4">This is optional—just a space to capture thoughts.</p>
              <Textarea
                placeholder="I noticed that... I'm realizing... Today I..."
                value={insights}
                onChange={(e) => setInsights(e.target.value)}
                className="min-h-[120px] bg-pivot-slate-900/50 border-pivot-slate-800"
              />
            </PivotCard>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
                className="flex-1 rounded-full border-pivot-slate-800"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 rounded-full bg-pivot-clarity-cyan hover:bg-pivot-clarity-cyan/90 text-pivot-clarity-foreground glow-cyan-subtle"
              >
                Complete Check-in
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
