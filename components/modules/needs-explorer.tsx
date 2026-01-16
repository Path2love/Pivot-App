"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, Plus, Check, Trash2, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { getUserNeeds, saveUserNeed, updateUserNeeds, type NeedItem } from "@/lib/storage"

interface NeedsExplorerProps {
  onBack: () => void
  embedded?: boolean
}

// Prompt questions to help discover needs - organized by category
const needsPrompts = [
  {
    category: "Safety & Security",
    color: "text-primary",
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
    color: "text-accent",
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
    color: "text-amber",
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
    color: "text-primary",
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
    color: "text-accent",
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
    <div className={cn("min-h-screen", !embedded && "pb-24")}>
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
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Needs Discovery</h2>
              <p className="text-sm text-muted-foreground">Uncover what matters most to you</p>
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
            Needs aren't demands or being "too much." They're what you require to feel safe, seen, and valued. Use the
            prompts below to discover yours, or add your own.
          </p>
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
                  <button
                    onClick={() =>
                      setSelectedCategory(selectedCategory === category.category ? null : category.category)
                    }
                    className={cn(
                      "w-full p-4 rounded-xl border text-left transition-colors",
                      selectedCategory === category.category
                        ? "bg-card border-primary/50"
                        : "bg-card/50 border-border hover:border-primary/30",
                    )}
                  >
                    <span className={cn("font-medium", category.color)}>{category.category}</span>
                  </button>

                  {selectedCategory === category.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 space-y-3 pl-4"
                    >
                      <div className="p-3 rounded-lg bg-secondary/30">
                        <p className="text-xs text-muted-foreground mb-2">Questions to consider:</p>
                        {category.prompts.map((prompt, i) => (
                          <p key={i} className="text-sm text-foreground/70 mb-1">
                            • {prompt}
                          </p>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg bg-secondary/30">
                        <p className="text-xs text-muted-foreground mb-2">Example needs:</p>
                        {category.examples.map((example, i) => (
                          <button
                            key={i}
                            onClick={() => handleAddNeed(example, category.category)}
                            className="block w-full text-left text-sm text-foreground/70 mb-2 hover:text-foreground transition-colors"
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
                          className="bg-card border-border text-sm"
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
          <Button variant="outline" onClick={() => setShowPrompts(true)} className="mb-6 w-full">
            <Lightbulb className="w-4 h-4 mr-2" />
            Show discovery prompts
          </Button>
        )}

        {/* Core Needs */}
        {coreNeeds.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              Core Needs ({coreNeeds.length})
            </h3>
            <div className="space-y-2">
              {coreNeeds.map((need) => (
                <div
                  key={need.id}
                  className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3"
                >
                  <button onClick={() => handleToggleCore(need.id)} className="mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
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
                </div>
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
                <div key={need.id} className="p-3 rounded-xl bg-card border border-border flex items-start gap-3">
                  <button
                    onClick={() => handleToggleCore(need.id)}
                    className="mt-0.5 w-4 h-4 rounded border border-muted-foreground/30 hover:border-primary"
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
                </div>
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
