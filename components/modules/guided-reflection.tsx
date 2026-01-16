"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, PenLine, ChevronRight, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PivotCard } from "@/components/ui/pivot-card"
import { saveJournalEntry } from "@/lib/storage"

interface GuidedReflectionProps {
  onBack: () => void
}

// Reflection prompts organized by theme - Socratic, non-prescriptive questions
const reflectionCategories = [
  {
    id: "feelings",
    title: "What I'm Feeling",
    color: "cyan" as const,
    prompts: [
      "What emotions have been most present for you today? Can you name them without judging them?",
      "Where do you feel this emotion in your body? What sensations do you notice?",
      "If this feeling could speak, what would it be trying to tell you?",
      "What would it look like to make space for this feeling instead of pushing it away?",
      "Is there a feeling underneath the feeling? What might be beneath the surface?",
    ],
  },
  {
    id: "situation",
    title: "Understanding What Happened",
    color: "amber" as const,
    prompts: [
      "If you stepped outside yourself and watched this situation like a movie, what would you see?",
      "What parts of this situation were within your control? What parts weren't?",
      "What story are you telling yourself about why this happened? Is that the only possible story?",
      "What would a trusted friend notice about this situation that you might be missing?",
      "Looking back, were there earlier signs that things were shifting? What did you notice at the time?",
    ],
  },
  {
    id: "patterns",
    title: "Patterns I Notice",
    color: "rose" as const,
    prompts: [
      "Does this situation remind you of anything from your past? What feels familiar?",
      "What role do you typically play in relationships? Is that a role you chose?",
      "When do you feel most like yourself in relationships? When do you feel like you're performing?",
      "What patterns do you see in what you're drawn to? What might that tell you?",
      "How do you typically respond when you feel unsafe or uncertain in relationships?",
    ],
  },
  {
    id: "needs",
    title: "What I Need",
    color: "cyan" as const,
    prompts: [
      "What do you need most right now? Not what you should need—what do you actually need?",
      "When have you felt truly safe and seen in a relationship? What made that possible?",
      "What are you afraid to ask for? Why might that be?",
      "If you could design your ideal sense of security, what would it include?",
      "What would 'enough' look like for you? How would you know when you had it?",
    ],
  },
  {
    id: "growth",
    title: "Moving Forward",
    color: "green" as const,
    prompts: [
      "What would it mean to be kind to yourself right now? What would that look like in practice?",
      "What are you learning about yourself through this experience?",
      "What do you want to carry forward from this? What do you want to leave behind?",
      "If you trusted that you'll be okay no matter what, what would you do differently?",
      "What does your wisest self know that your scared self doesn't?",
    ],
  },
]

export function GuidedReflection({ onBack }: GuidedReflectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [response, setResponse] = useState("")
  const [showFollowUp, setShowFollowUp] = useState(false)

  const selectedCategoryData = reflectionCategories.find((c) => c.id === selectedCategory)
  const currentPrompt = selectedCategoryData?.prompts[currentPromptIndex]

  const getFollowUpQuestions = (): string[] => {
    const followUps: Record<string, string[]> = {
      feelings: [
        "What might happen if you allowed this feeling to be here without trying to fix it?",
        "How long have you been carrying this feeling?",
        "What would you tell a friend who was feeling this way?",
      ],
      situation: [
        "What part of this feels unfinished for you?",
        "What question do you most wish you had an answer to?",
        "What would acceptance (not approval) of this situation look like?",
      ],
      patterns: [
        "If this pattern is protecting you from something, what might that be?",
        "What would be different if you responded differently next time?",
        "Who taught you this pattern? Was it a conscious choice?",
      ],
      needs: [
        "What gets in the way of asking for what you need?",
        "How do you feel when someone meets your needs? Is that comfortable for you?",
        "What's the smallest step toward meeting this need yourself?",
      ],
      growth: [
        "What would future you thank present you for doing?",
        "What are you ready to let go of?",
        "What strength has this situation revealed in you?",
      ],
    }
    return followUps[selectedCategory || "feelings"] || []
  }

  const handleSaveReflection = () => {
    if (!response.trim() || !currentPrompt) return

    saveJournalEntry({
      id: Date.now().toString(),
      type: "reflection",
      prompt: currentPrompt,
      text: response.trim(),
      timestamp: new Date().toISOString(),
      followUpQuestions: getFollowUpQuestions(),
    })

    setShowFollowUp(true)
  }

  const handleNextPrompt = () => {
    if (!selectedCategoryData) return
    setCurrentPromptIndex((prev) => (prev + 1) % selectedCategoryData.prompts.length)
    setResponse("")
    setShowFollowUp(false)
  }

  const handleNewPrompt = () => {
    if (!selectedCategoryData) return
    const newIndex = Math.floor(Math.random() * selectedCategoryData.prompts.length)
    setCurrentPromptIndex(newIndex)
    setResponse("")
    setShowFollowUp(false)
  }

  // Category Selection View
  if (!selectedCategory) {
    return (
      <div className="min-h-screen pb-8">
        <div className="px-6 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pivot-clarity-cyan/20 flex items-center justify-center">
                <PenLine className="w-5 h-5 text-pivot-clarity-cyan" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Guided Reflection</h2>
                <p className="text-sm text-muted-foreground">Choose what you'd like to explore</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-6"
          >
            These prompts are questions, not tests. There are no wrong answers—only your truth.
          </motion.p>

          <div className="space-y-3">
            {reflectionCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <PivotCard
                  variant={category.color}
                  onClick={() => setSelectedCategory(category.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{category.title}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </PivotCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Reflection Writing View
  return (
    <div className="min-h-screen pb-8">
      <div className="px-6 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to categories</span>
          </button>
          <h2 className="font-serif text-xl font-bold text-foreground">{selectedCategoryData?.title}</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showFollowUp ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <PivotCard variant={selectedCategoryData?.color || "cyan"}>
                <p className="font-serif text-lg text-foreground/90 leading-relaxed italic">"{currentPrompt}"</p>
              </PivotCard>

              <div>
                <Textarea
                  placeholder="Write whatever comes to mind... There's no wrong answer."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="min-h-[200px] bg-pivot-charcoal border-white/10 focus:border-pivot-clarity-cyan"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleNewPrompt}
                  className="rounded-full bg-transparent border-white/10 text-foreground"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Different question
                </Button>
                <Button
                  onClick={handleSaveReflection}
                  disabled={!response.trim()}
                  className="flex-1 rounded-full bg-pivot-clarity-cyan text-pivot-charcoal hover:bg-pivot-clarity-cyan/90"
                >
                  Save & Continue
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="followup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <PivotCard variant="green">
                <div className="flex items-center gap-2 text-pivot-growth-green mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Reflection saved</span>
                </div>
                <p className="text-sm text-foreground/80">
                  Thank you for taking time to reflect. Here are some questions that might deepen your exploration:
                </p>
              </PivotCard>

              <div className="space-y-3">
                {getFollowUpQuestions().map((question, index) => (
                  <PivotCard key={index} variant="default">
                    <p className="text-sm text-foreground/80 italic">"{question}"</p>
                  </PivotCard>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                You don't need to answer these now. Let them sit with you.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(null)}
                  className="flex-1 rounded-full bg-transparent border-white/10"
                >
                  Explore other topics
                </Button>
                <Button
                  onClick={handleNextPrompt}
                  className="flex-1 rounded-full bg-pivot-clarity-cyan text-pivot-charcoal"
                >
                  Another question
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
