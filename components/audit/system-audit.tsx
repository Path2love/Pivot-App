"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Brain } from "lucide-react"
import { PivotCard } from "@/components/ui/pivot-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { auditQuestions, calculateAuditResult } from "@/lib/system-audit"
import { saveUserProfile } from "@/lib/storage"

interface SystemAuditProps {
  onComplete: () => void
}

export function SystemAudit({ onComplete }: SystemAuditProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, "a" | "b">>({})
  const [showIntro, setShowIntro] = useState(true)

  const currentQuestion = auditQuestions[currentIndex]
  const progress = ((currentIndex + 1) / auditQuestions.length) * 100
  const isComplete = Object.keys(answers).length === auditQuestions.length

  const handleAnswer = (answer: "a" | "b") => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentIndex < auditQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }, 300)
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleComplete = () => {
    const result = calculateAuditResult(answers)
    saveUserProfile({
      auditAnswers: answers,
      auditProfile: result.profile,
      auditCompletedAt: new Date().toISOString(),
    })
    onComplete()
  }

  if (showIntro) {
    return (
      <div className="min-h-screen px-6 py-8 flex flex-col">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-pivot-clarity-cyan/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-pivot-clarity-cyan" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">System Audit: 10 Quick Questions</h1>
              <p className="text-muted-foreground text-sm">Map Your Relationship's Architecture</p>
            </div>
          </div>

          <PivotCard variant="default" className="p-6 mb-6" hover={false}>
            <p className="text-foreground/90 leading-relaxed mb-4">
              For each card, choose the option that feels most like your relationship. There are no right answers—just
              patterns.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              This isn't a "relationship quiz." It's a diagnostic tool—designed to help you see patterns that are hard
              to see from the inside.
            </p>
            <p className="text-muted-foreground text-sm italic">
              Remember: This is about understanding the system, not assigning blame.
            </p>
          </PivotCard>

          <div className="p-3 rounded-lg bg-pivot-logic-blue/10 border border-pivot-logic-blue/20 mb-6">
            <p className="text-sm text-foreground/80 text-center">You'll see your result and a plan at the end.</p>
          </div>

          <div className="mt-auto">
            <Button
              onClick={() => setShowIntro(false)}
              className="w-full rounded-full py-6 bg-pivot-logic-blue hover:bg-pivot-logic-blue/90 text-white"
            >
              Begin the Audit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-8 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="text-muted-foreground disabled:opacity-30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {auditQuestions.length}
          </span>
          <div className="w-5" /> {/* Spacer */}
        </div>
        <Progress value={progress} className="h-1" />
        <p className="text-xs text-muted-foreground text-center mt-2">
          Tap an option to answer, then use the arrow to go back if needed.
        </p>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col"
        >
          <div className="mb-2">
            <span className="text-xs text-pivot-clarity-cyan uppercase tracking-wider">
              {currentQuestion.dimension}
            </span>
          </div>

          <h2 className="font-serif text-xl text-foreground mb-8 leading-relaxed">{currentQuestion.question}</h2>

          <div className="space-y-4 flex-1">
            {/* Option A */}
            <PivotCard
              variant={answers[currentQuestion.id] === "a" ? "logic" : "default"}
              glow={answers[currentQuestion.id] === "a"}
              className={`p-5 cursor-pointer transition-all ${
                answers[currentQuestion.id] === "a" ? "border-pivot-logic-blue" : ""
              }`}
              onClick={() => handleAnswer("a")}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    answers[currentQuestion.id] === "a"
                      ? "border-pivot-logic-blue bg-pivot-logic-blue"
                      : "border-muted-foreground"
                  }`}
                >
                  {answers[currentQuestion.id] === "a" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <p className="text-foreground/90 leading-relaxed">{currentQuestion.optionA.text}</p>
              </div>
            </PivotCard>

            {/* Option B */}
            <PivotCard
              variant={answers[currentQuestion.id] === "b" ? "heart" : "default"}
              glow={answers[currentQuestion.id] === "b"}
              className={`p-5 cursor-pointer transition-all ${
                answers[currentQuestion.id] === "b" ? "border-pivot-heart-burgundy" : ""
              }`}
              onClick={() => handleAnswer("b")}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    answers[currentQuestion.id] === "b"
                      ? "border-pivot-heart-burgundy bg-pivot-heart-burgundy"
                      : "border-muted-foreground"
                  }`}
                >
                  {answers[currentQuestion.id] === "b" && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <p className="text-foreground/90 leading-relaxed">{currentQuestion.optionB.text}</p>
              </div>
            </PivotCard>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Complete Button */}
      {isComplete && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <p className="text-xs text-muted-foreground text-center mb-3">
            You've answered all 10 questions. Ready to see what the data says?
          </p>
          <Button
            onClick={handleComplete}
            className="w-full rounded-full py-6 bg-pivot-clarity-cyan hover:bg-pivot-clarity-cyan/90 text-pivot-clarity-foreground glow-cyan"
          >
            See Your Results
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
