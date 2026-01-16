"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Shield, ChevronRight, Check, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getBoundaries, saveBoundary, type BoundaryItem } from "@/lib/storage"

interface BoundaryBuilderProps {
  onBack: () => void
}

// Common boundary scenarios with script templates
const boundaryScenarios = [
  {
    id: "contact",
    title: "If they reach out",
    description: "What to say if they text or call",
    prompts: [
      "What would feel protective right now?",
      "What do you need them to understand?",
      "What response would you regret later?",
    ],
    templates: [
      "I need some space right now to process things. I'll reach out when I'm ready.",
      "I appreciate you reaching out, but I need time to think clearly before we talk.",
      "I'm not ready to have this conversation yet. I'll let you know when I am.",
    ],
  },
  {
    id: "mutual-friends",
    title: "Navigating shared spaces",
    description: "What to say to mutual friends or in shared communities",
    prompts: [
      "What do others need to know, and what's private?",
      "How can you protect yourself without creating sides?",
      "What support do you actually need from friends?",
    ],
    templates: [
      "I'm going through something difficult right now. I'd appreciate if we didn't talk about [them] for a while.",
      "I'm taking some space from the group for a bit. It's not personal—I just need to focus on myself.",
      "I'd rather not be in the middle or hear updates about what they're doing right now.",
    ],
  },
  {
    id: "urge",
    title: "When you want to reach out",
    description: "Scripts for yourself when the urge hits",
    prompts: [
      "What are you hoping contact will give you?",
      "What might it cost you?",
      "What else could meet this need right now?",
    ],
    templates: [
      "I'm feeling the urge to reach out because I want [X]. But I know that right now, contact would [Y].",
      "This feeling will pass. What I'm really needing is [Z], and I can [do something else] for that.",
      "I'm choosing to wait 24 hours before deciding. If I still feel this way tomorrow, I'll reconsider.",
    ],
  },
  {
    id: "explain",
    title: "Explaining your space to others",
    description: "What to tell family, coworkers, or acquaintances",
    prompts: [
      "How much do they need to know?",
      "What questions do you not want to answer?",
      "What would feel supportive vs. invasive?",
    ],
    templates: [
      "I'm going through a personal transition right now. I appreciate your concern, but I'm not ready to talk about it.",
      "[We're/I'm] taking some time apart. I'd rather not go into details, but thank you for understanding.",
      "I'm focusing on myself right now. I'll share more when I'm ready.",
    ],
  },
  {
    id: "self",
    title: "Boundaries with yourself",
    description: "Commitments to yourself during this time",
    prompts: [
      "What behaviors aren't serving you right now?",
      "What do you need to protect your peace?",
      "What would future-you thank present-you for?",
    ],
    templates: [
      "I commit to not checking their social media for [X days/weeks].",
      "I commit to calling [friend] when I feel the urge to reach out.",
      "I commit to [self-care activity] every day, no matter how I feel.",
    ],
  },
]

export function BoundaryBuilder({ onBack }: BoundaryBuilderProps) {
  const [boundaries, setBoundaries] = useState<BoundaryItem[]>(() => getBoundaries())
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [customSituation, setCustomSituation] = useState("")
  const [customScript, setCustomScript] = useState("")
  const [showMyBoundaries, setShowMyBoundaries] = useState(false)

  const selectedScenarioData = boundaryScenarios.find((s) => s.id === selectedScenario)

  const handleSaveBoundary = (situation: string, script: string) => {
    const boundary: BoundaryItem = {
      id: Date.now().toString(),
      situation,
      script,
      practiced: false,
      createdAt: new Date().toISOString(),
    }
    saveBoundary(boundary)
    setBoundaries((prev) => [...prev, boundary])
    setCustomSituation("")
    setCustomScript("")
    setSelectedScenario(null)
  }

  const handleUseTemplate = (template: string) => {
    setCustomScript(template)
  }

  // Scenario Detail View
  if (selectedScenario && selectedScenarioData) {
    return (
      <div className="min-h-screen pb-8">
        <div className="px-6 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <button
              onClick={() => setSelectedScenario(null)}
              className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to scenarios</span>
            </button>
            <h2 className="font-serif text-2xl font-bold text-foreground">{selectedScenarioData.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{selectedScenarioData.description}</p>
          </motion.div>

          {/* Reflection Questions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-accent/10 border border-accent/20 mb-6"
          >
            <div className="flex items-center gap-2 text-accent mb-2">
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm font-medium">Questions to consider first</span>
            </div>
            {selectedScenarioData.prompts.map((prompt, i) => (
              <p key={i} className="text-sm text-foreground/70 mb-1">
                • {prompt}
              </p>
            ))}
          </motion.div>

          {/* Templates */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
            <h3 className="text-sm text-muted-foreground mb-3">Example scripts (tap to use as starting point)</h3>
            <div className="space-y-2">
              {selectedScenarioData.templates.map((template, i) => (
                <button
                  key={i}
                  onClick={() => handleUseTemplate(template)}
                  className="w-full p-3 rounded-xl bg-card border border-border text-left text-sm text-foreground/80 hover:border-primary/50 transition-colors"
                >
                  "{template}"
                </button>
              ))}
            </div>
          </motion.div>

          {/* Custom Script */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Your script</label>
              <Textarea
                placeholder="Write what feels true and protective for you..."
                value={customScript}
                onChange={(e) => setCustomScript(e.target.value)}
                className="min-h-[120px] bg-card border-border"
              />
            </div>
            <Button
              onClick={() => handleSaveBoundary(selectedScenarioData.title, customScript)}
              disabled={!customScript.trim()}
              className="w-full rounded-full"
            >
              Save this script
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  // Main View
  return (
    <div className="min-h-screen pb-8">
      <div className="px-6 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Boundary Builder</h2>
              <p className="text-sm text-muted-foreground">Practice what you might say</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-card border border-border mb-6"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            Boundaries aren't walls—they're bridges that let the right things in and keep the harmful things out. Having
            words ready can help you respond from your values, not your fear.
          </p>
        </motion.div>

        {/* Toggle between scenarios and saved boundaries */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={!showMyBoundaries ? "default" : "outline"}
            onClick={() => setShowMyBoundaries(false)}
            className="flex-1 rounded-full"
          >
            Scenarios
          </Button>
          <Button
            variant={showMyBoundaries ? "default" : "outline"}
            onClick={() => setShowMyBoundaries(true)}
            className="flex-1 rounded-full"
          >
            My Scripts ({boundaries.length})
          </Button>
        </div>

        {!showMyBoundaries ? (
          <div className="space-y-3">
            {boundaryScenarios.map((scenario, index) => (
              <motion.button
                key={scenario.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => setSelectedScenario(scenario.id)}
                className="w-full p-4 rounded-xl bg-card border border-border text-left hover:border-amber/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{scenario.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {boundaries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No scripts saved yet. Explore scenarios to create some.</p>
              </div>
            ) : (
              boundaries.map((boundary) => (
                <div key={boundary.id} className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-amber font-medium uppercase tracking-wider">
                      {boundary.situation}
                    </span>
                    {boundary.practiced && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-sm text-foreground/80">"{boundary.script}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Saved {new Date(boundary.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
