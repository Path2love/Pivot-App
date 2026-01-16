"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, Plus, Check, Trash2, Lightbulb } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getUserNeeds, saveUserNeed, updateUserNeeds, type NeedItem } from "@/lib/storage"

interface NeedsExplorerProps {
  onBack: () => void
  embedded?: boolean
}

const needsPrompts = [
  {
    category: "Safety & Security",
    color: "text-pivot-logic-blue",
    bgColor: "bg-pivot-logic-blue/10",
    borderColor: "border-pivot-logic-blue/30",
    prompts: [
      "What makes you feel safe in a relationship?",
      "What does consistency look like for you?",
      "When have you felt most secure with someone?",
    ],
    examples: [
      "I need to feel like my partner won't disappear when things get hard",
      "I need reliability—knowing they'll follow through on what they say",
      "I need to feel like I can be imperfect and still be accepted",
    ],
  },
  {
    category: "Communication",
    color: "text-pivot-heart-burgundy",
    bgColor: "bg-pivot-heart-burgundy/10",
    borderColor: "border-pivot-heart-burgundy/30",
    prompts: [
      "What kind of communication helps you feel connected?",
      "How do you need conflict to be handled?",
      "What does feeling heard look like for you?",
    ],
    examples: [
      "I need someone who can talk about hard things without shutting down",
      "I need to be able to express concerns without fear of punishment",
      "I need regular check-ins about how we're both doing",
    ],
  },
  {
    category: "Presence & Attention",
    color: "text-pivot-clarity-cyan",
    bgColor: "bg-pivot-clarity-cyan/10",
    borderColor: "border-pivot-clarity-cyan/30",
    prompts: [
      "What does quality time mean to you?",
      "How do you know someone is truly present with you?",
      "What kind of attention nourishes you?",
    ],
    examples: [
      "I need undivided attention sometimes—phones away, just us",
      "I need someone who notices when something is off with me",
      "I need a partner who is curious about my inner world",
    ],
  },
  {
    category: "Integration & Inclusion",
    color: "text-pivot-logic-blue",
    bgColor: "bg-pivot-logic-blue/10",
    borderColor: "border-pivot-logic-blue/30",
    prompts: [
      "How important is it to be included in your partner's life?",
      "What role do you want to play in their world?",
      "How do you feel about being introduced to important people?",
    ],
    examples: [
      "I need to be part of my partner's broader life, not kept separate",
      "I need to know their friends and family, and for them to know me",
      "I need our relationship to be acknowledged, not hidden",
    ],
  },
  {
    category: "Growth & Support",
    color: "text-pivot-heart-burgundy",
    bgColor: "bg-pivot-heart-burgundy/10",
    borderColor: "border-pivot-heart-burgundy/30",
    prompts: [
      "What kind of support do you need when you're struggling?",
      "How do you want to grow together with a partner?",
      "What does encouragement look like for you?",
    ],
    examples: [
      "I need a partner who celebrates my wins and supports my dreams",
      "I need someone willing to work on themselves and the relationship",
      "I need space to be my own person while also being part of a 'we'",
    ],
  },
]

export function NeedsExplorer({ onBack, embedded = false }: NeedsExplorerProps) {
  const [userNeeds, setUserNeeds] = useState<NeedItem[]>(() => getUserNeeds())
  const [newNeed, setNewNeed] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showPrompts, setShowPrompts] = useState(true)

  const handleAddNeed = (text: string, category: string) => {
    if (!text.trim()) return
    const need: NeedItem = {
      id: Date.now().toString(),
      text: text.trim(),
      category,
      isCore: false,
      createdAt: new Date().toISOString(),
    }
    saveUserNeed(need)
    setUserNeeds((prev) => [...prev, need])
    setNewNeed("")
  }

  const handleToggleCore = (id: string) => {
    const updated = userNeeds.map((n) => (n.id === id ? { ...n, isCore: !n.isCore } : n))
    setUserNeeds(updated)
    updateUserNeeds(updated)
  }

  const handleDeleteNeed = (id: string) => {
    const updated = userNeeds.filter((n) => n.id !== id)
    setUserNeeds(updated)
    updateUserNeeds(updated)
  }

  const coreNeeds = userNeeds.filter((n) => n.isCore)
  const otherNeeds = userNeeds.filter((n) => !n.isCore)

  return (
    <div className={cn("min-h-screen", embedded ? "pb-24" : "pb-8")}>
      <div className="px-6 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          {!embedded && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pivot-heart-burgundy/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-pivot-heart-burgundy" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Needs Navigator</h2>
              <p className="text-sm text-muted-foreground">Uncover your non-negotiables</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <PivotCard variant="heart" className="p-4 mb-6" hover={false}>
            <p className="text-sm text-foreground/90 leading-relaxed mb-2">
              Needs aren't demands or being "too much." They're what you require to feel safe, seen, and valued.
            </p>
            <p className="text-sm text-muted-foreground italic">
              "Systemic Reliability"—evaluate partners by behavior during stress, not just static good times.
            </p>
          </PivotCard>
        </motion.div>

        {/* Discovery Prompts */}
        {showPrompts && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Explore by category</h3>
              <button onClick={() => setShowPrompts(false)} className="text-xs text-muted-foreground hover:underline">
                Hide prompts
              </button>
            </div>

            <div className="space-y-3">
              {needsPrompts.map((category) => (
                <div key={category.category}>
                  <PivotCard
                    className={cn(
                      "p-4 cursor-pointer transition-all",
                      selectedCategory === category.category && `${category.borderColor} border`,
                    )}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === category.category ? null : category.category)
                    }
                  >
                    <span className={cn("font-medium", category.color)}>{category.category}</span>
                  </PivotCard>

                  {selectedCategory === category.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 space-y-3 pl-4"
                    >
                      <div className={cn("p-3 rounded-lg", category.bgColor)}>
                        <p className="text-xs text-muted-foreground mb-2">Questions to consider:</p>
                        {category.prompts.map((prompt, i) => (
                          <p key={i} className="text-sm text-foreground/70 mb-1">
                            • {prompt}
                          </p>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg bg-pivot-slate-900/50">
                        <p className="text-xs text-muted-foreground mb-2">Example needs (tap to add):</p>
                        {category.examples.map((example, i) => (
                          <button
                            key={i}
                            onClick={() => handleAddNeed(example, category.category)}
                            className="block w-full text-left text-sm text-foreground/70 mb-2 hover:text-pivot-clarity-cyan transition-colors"
                          >
                            + "{example}"
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Write your own..."
                          value={newNeed}
                          onChange={(e) => setNewNeed(e.target.value)}
                          className="bg-pivot-slate-900/50 border-pivot-slate-800 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddNeed(newNeed, category.category)
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleAddNeed(newNeed, category.category)}
                          disabled={!newNeed.trim()}
                          className="bg-pivot-logic-blue hover:bg-pivot-logic-blue/90"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {!showPrompts && (
          <Button variant="outline" onClick={() => setShowPrompts(true)} className="mb-6 w-full border-pivot-slate-800">
            <Lightbulb className="w-4 h-4 mr-2" />
            Show discovery prompts
          </Button>
        )}

        {/* Core Needs */}
        {coreNeeds.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pivot-heart-burgundy" />
              Core Non-Negotiables ({coreNeeds.length})
            </h3>
            <div className="space-y-2">
              {coreNeeds.map((need) => (
                <PivotCard key={need.id} variant="heart" className="p-3 flex items-start gap-3" hover={false} glow>
                  <button onClick={() => handleToggleCore(need.id)} className="mt-0.5">
                    <Check className="w-4 h-4 text-pivot-heart-burgundy" />
                  </button>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{need.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{need.category}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNeed(need.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </PivotCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Other Needs */}
        {otherNeeds.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-medium text-foreground mb-3">
              All Needs ({otherNeeds.length})
              <span className="text-xs text-muted-foreground font-normal ml-2">Tap check to mark as core</span>
            </h3>
            <div className="space-y-2">
              {otherNeeds.map((need) => (
                <PivotCard key={need.id} className="p-3 flex items-start gap-3" hover={false}>
                  <button
                    onClick={() => handleToggleCore(need.id)}
                    className="mt-0.5 w-4 h-4 rounded border border-muted-foreground/30 hover:border-pivot-heart-burgundy"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground/80">{need.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{need.category}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNeed(need.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </PivotCard>
              ))}
            </div>
          </motion.div>
        )}

        {userNeeds.length === 0 && !showPrompts && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No needs added yet. Use the prompts above to discover yours.</p>
          </div>
        )}
      </div>
    </div>
  )
}
