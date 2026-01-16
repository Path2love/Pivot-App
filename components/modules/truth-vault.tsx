"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, MessageCircle, Send, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { saveJournalEntry, getJournalEntries } from "@/lib/storage"

interface TruthVaultProps {
  onBack: () => void
}

// Reflective responses that ask questions rather than tell answers
const reflectiveResponses = [
  {
    opening: "I hear the weight in these words.",
    questions: [
      "What do you hope would happen if you sent this?",
      "What are you most afraid would happen?",
      "Is there a version of this message that's really for yourself?",
    ],
  },
  {
    opening: "There's a lot here.",
    questions: [
      "What feeling is driving this message most strongly?",
      "If you received this message, how would you feel?",
      "What would it mean to sit with this feeling instead of sending it?",
    ],
  },
  {
    opening: "Writing this took courage.",
    questions: [
      "What part of this do you most need them to understand?",
      "Is there something you're trying to get back? Or something you're trying to let go?",
      "What would feel resolved for you, regardless of their response?",
    ],
  },
  {
    opening: "Sometimes we need to say things even when no one's listening.",
    questions: [
      "Who is this message really for—them, or you?",
      "What would change for you if you could say this out loud?",
      "What do you need that this message is trying to get?",
    ],
  },
  {
    opening: "You're holding a lot.",
    questions: [
      "What would it feel like to release this without needing a response?",
      "Is there grief in these words? What are you mourning?",
      "What would your wisest self say about sending this?",
    ],
  },
]

function getReflectiveResponse() {
  return reflectiveResponses[Math.floor(Math.random() * reflectiveResponses.length)]
}

export function TruthVault({ onBack }: TruthVaultProps) {
  const [text, setText] = useState("")
  const [showResponse, setShowResponse] = useState(false)
  const [currentResponse, setCurrentResponse] = useState<(typeof reflectiveResponses)[0] | null>(null)
  const [showPastEntries, setShowPastEntries] = useState(false)

  const pastEntries = getJournalEntries().filter((e) => e.type === "unsent")

  const handleDeposit = () => {
    if (!text.trim()) return

    const response = getReflectiveResponse()

    saveJournalEntry({
      id: Date.now().toString(),
      type: "unsent",
      text: text.trim(),
      timestamp: new Date().toISOString(),
      followUpQuestions: response.questions,
    })

    setCurrentResponse(response)
    setText("")
    setShowResponse(true)
  }

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
              <MessageCircle className="w-5 h-5 text-amber" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">Write It Out</h2>
              <p className="text-sm text-muted-foreground">A safe space for unsent words</p>
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
            Sometimes we need to say things we can't actually send. This is a space to write whatever you're holding—no
            judgment, no one sees it but you. Writing it out can help process what's inside.
          </p>
        </motion.div>

        {/* Writing Area */}
        <AnimatePresence mode="wait">
          {!showResponse ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Textarea
                placeholder="Write what you wish you could say..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[180px] bg-card border-border"
              />
              <Button
                onClick={handleDeposit}
                disabled={!text.trim()}
                className="w-full rounded-full bg-amber text-background hover:bg-amber/90"
              >
                <Send className="w-4 h-4 mr-2" />
                Deposit these words
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="p-5 rounded-xl bg-amber/10 border border-amber/20">
                <div className="flex items-center gap-2 text-amber mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Words received</span>
                </div>
                <p className="font-serif text-foreground/90 leading-relaxed mb-4">{currentResponse?.opening}</p>
                <p className="text-sm text-muted-foreground mb-4">Some questions to sit with, if they feel useful:</p>
                <div className="space-y-3">
                  {currentResponse?.questions.map((q, i) => (
                    <p key={i} className="text-sm text-foreground/80 italic">
                      • {q}
                    </p>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                You don't need to answer these. They're just here if they help.
              </p>

              <Button onClick={() => setShowResponse(false)} variant="outline" className="w-full rounded-full">
                Write something else
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Past Entries */}
        {pastEntries.length > 0 && !showResponse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8">
            <button
              onClick={() => setShowPastEntries(!showPastEntries)}
              className="flex items-center justify-between w-full text-sm text-muted-foreground mb-3"
            >
              <span>Past entries ({pastEntries.length})</span>
              {showPastEntries ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPastEntries && (
              <div className="space-y-3">
                {pastEntries.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                    <p className="text-sm text-foreground/70 line-clamp-3">{entry.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
