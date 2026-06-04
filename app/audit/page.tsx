"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  auditQuestions,
  calculateAuditResult,
  profileDescriptions,
  profileNextSteps,
  type AuditProfile,
  type AuditResult,
} from "@/lib/system-audit"
import { saveUserProfile } from "@/lib/storage"

// ─── Profile colour mapping ───

const profileColors: Record<AuditProfile, string> = {
  integrated: "#3b82f6",
  compartmentalized: "#691d33",
  shutdown: "#00f5ff",
}

const profileEmoji: Record<AuditProfile, string> = {
  integrated: "🔗",
  compartmentalized: "📦",
  shutdown: "🔒",
}

// ─── Teaser descriptions (shown before email capture) ───

const profileTeasers: Record<AuditProfile, string> = {
  integrated:
    "Your relationship has real roots. The crisis you're feeling may be a stress response, not a structural failure. But there's a specific pattern that determines whether this becomes a temporary rough patch or a permanent fracture.",
  compartmentalized:
    "You've been fitting into a version of love that keeps you in a box. The relationship works on the surface, but underneath, you've been dimming yourself to keep it alive. There's a reason this keeps happening.",
  shutdown:
    "When things get close, something shuts down. You're caught in a loop where distance feels safer than connection. This is one of the most common patterns we see, and it's not a life sentence.",
}

// ─── Full descriptions (shown after email capture) ───

const profileFullDescriptions: Record<AuditProfile, string> = {
  integrated:
    "Your relationship has deep roots and genuine reliability. The current crisis likely stems from external stress overwhelming a system that was, at its core, working. The good news: Integrated Systems have the highest recovery rate when both people commit to understanding what went wrong. The danger is assuming that because it was good before, it will fix itself. It won't. Stress fractures in strong systems require deliberate repair, not just time.",
  compartmentalized:
    "Your relationship has been operating in a carefully managed box. It felt high-functioning because both of you kept certain parts of life separate. But when life forced integration, the walls came down, and the system couldn't hold. This pattern often shows up as: you're deeply connected in private but invisible in their public life. You've slowly let go of friendships, hobbies, and parts of yourself to fit into the space they made for you. The cost of compartmentalization is that you never get to be fully known, fully chosen, and fully included.",
  shutdown:
    "You're in a cycle where closeness triggers withdrawal. When things get emotionally intense, your partner (or you, or both) goes cold, disappears, or shuts down. Then there's a warm-up period, things feel close again, and the cycle repeats. This isn't about caring. People in Shutdown Cycles often care deeply. The problem is that the system has learned to treat intimacy as a threat. Closeness becomes unpredictable, so distance becomes the default response. The pattern will keep repeating until someone interrupts it deliberately.",
}

// ─── Phases ───

type Phase = "intro" | "questions" | "teaser" | "email-capture" | "full-result"

export default function StandaloneAuditPage() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, "a" | "b">>({})
  const [result, setResult] = useState<AuditResult | null>(null)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = auditQuestions[currentIndex]
  const progress = ((currentIndex + 1) / auditQuestions.length) * 100
  const allAnswered = Object.keys(answers).length === auditQuestions.length

  // ─── Handlers ───

  const handleAnswer = (answer: "a" | "b") => {
    const updated = { ...answers, [currentQuestion.id]: answer }
    setAnswers(updated)

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

  const handleSeeResults = () => {
    const auditResult = calculateAuditResult(answers)
    setResult(auditResult)

    // Save audit data (no email yet)
    saveUserProfile({
      auditAnswers: answers,
      auditProfile: auditResult.profile,
      auditCompletedAt: new Date().toISOString(),
    })

    setPhase("teaser")
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")

    const trimmed = email.trim()
    if (!trimmed) {
      setEmailError("Enter your email to see the full result.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("That doesn't look like a valid email.")
      return
    }

    setIsSubmitting(true)

    // Save email to profile
    saveUserProfile({ email: trimmed })

    // Forward to GHL
    try {
      await fetch('/api/ghl-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, source: 'pivot-audit-result', timestamp: new Date().toISOString() }),
      })
    } catch {
      // Don't block user if GHL is down
    }

    // Small delay for feel
    await new Promise((r) => setTimeout(r, 400))
    setIsSubmitting(false)
    setPhase("full-result")
  }

  const handleShare = () => {
    if (!result) return
    const profileName = profileDescriptions[result.profile].title
    const text = `I just took a Relationship System Audit. I'm in a ${profileName}. Take yours: mypivot.app/audit`

    if (navigator.share) {
      navigator.share({ text, url: "https://mypivot.app/audit" }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard.")
      })
    }
  }

  // ─── Render: Intro ───

  if (phase === "intro") {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-lg mx-auto px-6 py-12 flex flex-col min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
          >
            {/* Logo / branding */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#00f5ff]/70 mb-2">The Pivot</p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
                What type of relationship crisis are you in?
              </h1>
              <p className="text-white/60 text-lg leading-relaxed">
                10 questions. 2 minutes. No sign-up required.
              </p>
            </div>

            {/* What you'll get */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <p className="text-white/80 leading-relaxed mb-4">
                This is not a relationship quiz. It's a diagnostic tool designed to show you patterns that are hard to see from the inside.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                For each question, choose the option that feels most like your relationship right now. There are no right answers, just patterns.
              </p>
            </div>

            <div className="bg-[#00f5ff]/10 border border-[#00f5ff]/20 rounded-xl p-4 mb-8">
              <p className="text-sm text-white/70 text-center">
                You'll get your result type and a clear explanation of what it means.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <button
                onClick={() => setPhase("questions")}
                className="w-full py-4 rounded-full bg-[#00f5ff] text-black font-semibold text-lg hover:bg-[#00f5ff]/90 transition-colors"
              >
                Start the Audit
              </button>
              <p className="text-center text-white/30 text-xs mt-3">
                Free. Private. Nothing saved unless you choose to.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // ─── Render: Questions ───

  if (phase === "questions") {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-lg mx-auto px-6 py-8 flex flex-col min-h-screen">
          {/* Progress header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleBack}
                disabled={currentIndex === 0}
                className="text-white/40 disabled:opacity-20 hover:text-white/70 transition-colors"
                aria-label="Previous question"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-white/40">
                {currentIndex + 1} of {auditQuestions.length}
              </span>
              <div className="w-5" />
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#00f5ff] rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#00f5ff]/70 mb-2">
                {currentQuestion.dimension}
              </p>
              <h2 className="font-serif text-xl md:text-2xl text-white mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4 flex-1">
                {/* Option A */}
                <button
                  onClick={() => handleAnswer("a")}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                    answers[currentQuestion.id] === "a"
                      ? "bg-blue-500/10 border-blue-500/50"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        answers[currentQuestion.id] === "a"
                          ? "border-blue-500 bg-blue-500"
                          : "border-white/30"
                      }`}
                    >
                      {answers[currentQuestion.id] === "a" && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <p className="text-white/85 leading-relaxed">{currentQuestion.optionA.text}</p>
                  </div>
                </button>

                {/* Option B */}
                <button
                  onClick={() => handleAnswer("b")}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                    answers[currentQuestion.id] === "b"
                      ? "bg-[#691d33]/30 border-[#691d33]/60"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                        answers[currentQuestion.id] === "b"
                          ? "border-[#691d33] bg-[#691d33]"
                          : "border-white/30"
                      }`}
                    >
                      {answers[currentQuestion.id] === "b" && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <p className="text-white/85 leading-relaxed">{currentQuestion.optionB.text}</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Complete button */}
          {allAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <p className="text-xs text-white/40 text-center mb-3">
                All 10 questions answered. Ready to see what the data says?
              </p>
              <button
                onClick={handleSeeResults}
                className="w-full py-4 rounded-full bg-[#00f5ff] text-black font-semibold text-lg hover:bg-[#00f5ff]/90 transition-colors"
              >
                See Your Results
              </button>
            </motion.div>
          )}
        </div>
      </main>
    )
  }

  // ─── Render: Teaser (profile name + teaser, gated) ───

  if (phase === "teaser" && result) {
    const profile = result.profile
    const desc = profileDescriptions[profile]
    const colour = profileColors[profile]

    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-lg mx-auto px-6 py-12 flex flex-col min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#00f5ff]/70 mb-6">Your Result</p>

            {/* Profile badge */}
            <div
              className="rounded-2xl p-8 mb-6 border"
              style={{
                backgroundColor: `${colour}15`,
                borderColor: `${colour}40`,
              }}
            >
              <p className="text-4xl mb-3">{profileEmoji[profile]}</p>
              <h1 className="font-serif text-2xl md:text-3xl font-bold mb-4" style={{ color: colour }}>
                {desc.title}
              </h1>
              <p className="text-white/70 leading-relaxed">
                {profileTeasers[profile]}
              </p>
            </div>

            {/* Gate */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="font-serif text-lg font-semibold mb-2 text-white">
                Want the full picture?
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Enter your email to see the complete analysis: what this pattern means, why it keeps showing up, and the specific next steps designed for your profile.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError("")
                  }}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00f5ff]/50 focus:ring-1 focus:ring-[#00f5ff]/30 transition-colors"
                  autoComplete="email"
                />
                {emailError && (
                  <p className="text-red-400 text-xs">{emailError}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#00f5ff] text-black font-semibold hover:bg-[#00f5ff]/90 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "One moment..." : "Show Me the Full Result"}
                </button>
              </form>

              <p className="text-white/25 text-xs text-center mt-3">
                No spam. Your email stays with us.
              </p>
            </div>

            {/* Share button (even at teaser stage) */}
            <button
              onClick={handleShare}
              className="text-white/40 text-sm hover:text-white/60 transition-colors text-center mt-auto"
            >
              Share your result
            </button>
          </motion.div>
        </div>
      </main>
    )
  }

  // ─── Render: Full Result (after email capture) ───

  if (phase === "full-result" && result) {
    const profile = result.profile
    const desc = profileDescriptions[profile]
    const colour = profileColors[profile]
    const steps = profileNextSteps[profile].steps

    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="max-w-lg mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#00f5ff]/70 mb-6">Your Full Result</p>

            {/* Profile badge */}
            <div
              className="rounded-2xl p-8 mb-8 border"
              style={{
                backgroundColor: `${colour}15`,
                borderColor: `${colour}40`,
              }}
            >
              <p className="text-4xl mb-3">{profileEmoji[profile]}</p>
              <h1 className="font-serif text-2xl md:text-3xl font-bold mb-4" style={{ color: colour }}>
                {desc.title}
              </h1>
              <p className="text-white/80 leading-relaxed">
                {profileFullDescriptions[profile]}
              </p>
            </div>

            {/* Score breakdown */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="font-serif text-lg font-semibold mb-4 text-white">Your Scores</h2>
              <div className="space-y-3">
                {(["integrated", "compartmentalized", "shutdown"] as AuditProfile[]).map((p) => (
                  <div key={p} className="flex items-center gap-3">
                    <span className="text-white/50 text-sm w-44 flex-shrink-0">
                      {profileDescriptions[p].title}
                    </span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${(result.scores[p] / auditQuestions.length) * 100}%`,
                          backgroundColor: profileColors[p],
                        }}
                      />
                    </div>
                    <span className="text-white/40 text-sm w-8 text-right">
                      {result.scores[p]}/{auditQuestions.length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next steps */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold mb-4 text-white">Your Next Steps</h2>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                        style={{ backgroundColor: `${colour}30`, color: colour }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#00f5ff]/10 to-[#691d33]/10 border border-[#00f5ff]/20 rounded-2xl p-8 mb-8 text-center">
              <h2 className="font-serif text-xl font-bold mb-2 text-white">
                Your 14-day reset starts here.
              </h2>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Daily clarity tools, guided reflections, and a structured plan built around your specific profile. Everything you need to stop spiralling and start seeing clearly.
              </p>
              <a
                href="/"
                className="inline-block w-full py-4 rounded-full bg-[#00f5ff] text-black font-semibold text-lg hover:bg-[#00f5ff]/90 transition-colors text-center"
              >
                Get Full Access for $79
              </a>
              <p className="text-white/30 text-xs mt-3">One-time payment. No subscription.</p>
            </div>

            {/* Share */}
            <div className="text-center pb-8">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/50 hover:text-white/80 hover:border-white/30 transition-colors text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                </svg>
                Share your result
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  // Fallback (should never reach)
  return null
}
