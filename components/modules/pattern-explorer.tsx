"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Search, ChevronRight, Lightbulb, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserProfile } from "@/lib/storage"

interface PatternExplorerProps {
  onBack: () => void
  embedded?: boolean
}

// Universal patterns that apply to all attachment styles
const patternCategories = [
  {
    id: "my-patterns",
    title: "Patterns in Myself",
    description: "Understanding how I show up in relationships",
    patterns: [
      {
        id: "seeking-reassurance",
        title: "Seeking Reassurance",
        question: "Do you often need to check that things are okay?",
        exploration: [
          "When do you feel the strongest urge to seek reassurance?",
          "What happens in your body when you don't get the response you hoped for?",
          "What reassurance are you really looking for—and can you give any of that to yourself?",
          "What did reassurance look like (or not look like) when you were growing up?",
        ],
        forStyles: ["anxious", "disorganized"],
      },
      {
        id: "withdrawing",
        title: "Pulling Away When Close",
        question: "Do you sometimes feel the urge to create distance when things get intimate?",
        exploration: [
          "What does it feel like in your body when someone gets 'too close'?",
          "What are you protecting yourself from when you pull away?",
          "Has pulling away ever cost you something you actually wanted?",
          "When did you first learn that distance felt safer than closeness?",
        ],
        forStyles: ["avoidant", "disorganized"],
      },
      {
        id: "overgiving",
        title: "Over-Giving",
        question: "Do you tend to give more than you receive in relationships?",
        exploration: [
          "What do you hope your giving will create or prevent?",
          "How does it feel when someone tries to give to you?",
          "Is your giving freely chosen, or does it feel compulsive?",
          "What would happen if you gave less? What are you afraid of?",
        ],
        forStyles: ["anxious", "secure", "disorganized"],
      },
      {
        id: "conflict-avoidance",
        title: "Avoiding Conflict",
        question: "Do you tend to keep the peace even when something bothers you?",
        exploration: [
          "What feels dangerous about expressing disagreement?",
          "Where does the unexpressed frustration go?",
          "What did conflict look like in your family growing up?",
          "What might be possible if you could voice concerns earlier?",
        ],
        forStyles: ["anxious", "avoidant", "secure"],
      },
      {
        id: "hypervigilance",
        title: "Reading the Room",
        question: "Are you highly attuned to shifts in others' moods or energy?",
        exploration: [
          "When did you first learn to be a mood-detector?",
          "What do you do with the information once you sense a shift?",
          "Is this skill protecting you, exhausting you, or both?",
          "What would it feel like to not have to monitor so closely?",
        ],
        forStyles: ["anxious", "disorganized"],
      },
      {
        id: "independence",
        title: "Fierce Independence",
        question: "Do you pride yourself on not needing others?",
        exploration: [
          "What does needing someone mean to you?",
          "Has your independence ever been lonely?",
          "What would it mean to need someone and have them show up?",
          "When did you decide it was safer to rely on yourself?",
        ],
        forStyles: ["avoidant", "disorganized"],
      },
    ],
  },
  {
    id: "partner-patterns",
    title: "Patterns I Noticed in Them",
    description: "Understanding behaviors I observed",
    patterns: [
      {
        id: "hot-cold",
        title: "Hot and Cold",
        question: "Did they seem to cycle between closeness and distance?",
        exploration: [
          "What seemed to trigger the shift from warm to distant?",
          "How did you typically respond to the cold phases?",
          "Did the cycle intensify over time, or stay consistent?",
          "What did you tell yourself to explain the shifts?",
        ],
        forStyles: ["all"],
      },
      {
        id: "compartmentalization",
        title: "Keeping Things Separate",
        question: "Did they keep parts of their life separate from you?",
        exploration: [
          "What parts felt off-limits to you?",
          "How did the separation make you feel about your place in their life?",
          "Did they explain the separation, or was it unspoken?",
          "What might compartmentalization have been protecting them from?",
        ],
        forStyles: ["all"],
      },
      {
        id: "shutdown",
        title: "Shutting Down Under Stress",
        question: "Did they become unreachable or go silent when things got hard?",
        exploration: [
          "What situations seemed to trigger shutdown?",
          "How long did shutdowns typically last?",
          "What did you need during those times that you weren't getting?",
          "How did you interpret their silence?",
        ],
        forStyles: ["all"],
      },
      {
        id: "future-avoidance",
        title: "Avoiding Future Talk",
        question: "Did conversations about the future feel uncomfortable or get deflected?",
        exploration: [
          "How did they respond when you brought up future plans?",
          "What did their avoidance mean to you at the time?",
          "Did you adjust your needs to accommodate their discomfort?",
          "What were you hoping future-talk would give you?",
        ],
        forStyles: ["all"],
      },
      {
        id: "caring-distance",
        title: "Caring But Distant",
        question: "Did they show care in some ways but feel emotionally unavailable in others?",
        exploration: [
          "How did they show care? What was present?",
          "What kind of emotional connection felt missing?",
          "Did their care feel conditional or consistent?",
          "What did you make it mean when care and distance coexisted?",
        ],
        forStyles: ["all"],
      },
    ],
  },
  {
    id: "dynamic-patterns",
    title: "Patterns Between Us",
    description: "Understanding the dance we created together",
    patterns: [
      {
        id: "pursuer-distancer",
        title: "The Pursue-Withdraw Cycle",
        question: "Did one of you tend to pursue while the other withdrew?",
        exploration: [
          "Which role did you typically play? Did it ever switch?",
          "What was each person really seeking in their role?",
          "How did pursuit feel to you? How did withdrawal feel?",
          "What might have happened if the pursuer paused? Or the withdrawer approached?",
        ],
        forStyles: ["all"],
      },
      {
        id: "walking-eggshells",
        title: "Walking on Eggshells",
        question: "Did you find yourself carefully managing your words or behavior?",
        exploration: [
          "What were you trying to prevent by being careful?",
          "Did they know you felt this way?",
          "What did it cost you to be so careful?",
          "When did you first start walking on eggshells?",
        ],
        forStyles: ["all"],
      },
      {
        id: "crisis-intimacy",
        title: "Intensity During Crisis",
        question: "Did your closest moments happen during conflicts or crises?",
        exploration: [
          "What was it about crisis that brought you closer?",
          "Was the intimacy sustainable after the crisis passed?",
          "What did 'normal' times feel like in comparison?",
          "What might that pattern reveal about how you both experienced safety?",
        ],
        forStyles: ["all"],
      },
      {
        id: "unspoken-rules",
        title: "Unspoken Rules",
        question: "Were there things you 'just knew' not to bring up or do?",
        exploration: [
          "How did you learn these rules?",
          "What happened when a rule was broken?",
          "Did they follow unspoken rules for you too?",
          "What would a relationship without unspoken rules feel like?",
        ],
        forStyles: ["all"],
      },
    ],
  },
]

export function PatternExplorer({ onBack, embedded = false }: PatternExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)

  const profile = getUserProfile()
  const myStyle = profile.myAttachmentStyle || "unsure"

  const selectedCategoryData = patternCategories.find((c) => c.id === selectedCategory)
  const selectedPatternData = selectedCategoryData?.patterns.find((p) => p.id === selectedPattern)

  // Filter patterns based on attachment style
  const getRelevantPatterns = (patterns: (typeof patternCategories)[0]["patterns"]) => {
    return patterns.filter((p) => p.forStyles.includes("all") || p.forStyles.includes(myStyle))
  }

  // Pattern Detail View
  if (selectedPattern && selectedPatternData) {
    return (
      <div className={cn("min-h-screen", !embedded && "pb-8")}>
        <div className="px-6 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <button
              onClick={() => setSelectedPattern(null)}
              className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to patterns</span>
            </button>
            <h2 className="font-serif text-2xl font-bold text-foreground">{selectedPatternData.title}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-xl bg-card border border-border mb-6"
          >
            <p className="font-serif text-lg text-foreground/90 italic">"{selectedPatternData.question}"</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2 text-accent mb-4">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Questions to explore</span>
            </div>
            <div className="space-y-3">
              {selectedPatternData.exploration.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-xl bg-secondary/30 border border-border/50"
                >
                  <p className="text-sm text-foreground/80">{question}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-xl bg-accent/10 border border-accent/20"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-foreground/80">
                These questions aren't meant to be answered all at once. Let them sit with you. Notice what comes up.
                There are no right answers—only your truth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Category View
  if (selectedCategory && selectedCategoryData) {
    const relevantPatterns = getRelevantPatterns(selectedCategoryData.patterns)

    return (
      <div className={cn("min-h-screen", !embedded && "pb-8")}>
        <div className="px-6 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to categories</span>
            </button>
            <h2 className="font-serif text-2xl font-bold text-foreground">{selectedCategoryData.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{selectedCategoryData.description}</p>
          </motion.div>

          <div className="space-y-3">
            {relevantPatterns.map((pattern, index) => (
              <motion.button
                key={pattern.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPattern(pattern.id)}
                className="w-full p-4 rounded-xl bg-card border border-border text-left hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{pattern.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{pattern.question}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Main Category Selection View
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
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Pattern Explorer</h2>
              <p className="text-sm text-muted-foreground">Understand relationship dynamics</p>
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
            Patterns aren't good or bad—they're information. They often developed for good reasons, even if they no
            longer serve us. Explore with curiosity, not judgment.
          </p>
        </motion.div>

        <div className="space-y-3">
          {patternCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => setSelectedCategory(category.id)}
              className="w-full p-5 rounded-xl bg-card border border-border text-left hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground text-lg">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
