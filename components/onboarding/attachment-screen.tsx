"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Heart, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AttachmentScreenProps {
  onNext: (data: { myAttachmentStyle: string; partnerAttachmentStyle: string }) => void
}

const attachmentStyles = [
  {
    id: "anxious",
    label: "I tend to worry about relationships",
    description: "I often need reassurance, fear abandonment, or feel like I care more than my partner",
    full: "Anxious attachment",
  },
  {
    id: "avoidant",
    label: "I tend to need a lot of space",
    description: "I value independence, sometimes pull away when things get intense, or feel smothered easily",
    full: "Avoidant attachment",
  },
  {
    id: "disorganized",
    label: "I feel conflicted about closeness",
    description: "I want intimacy but also fear it, sometimes feel push-pull within myself",
    full: "Disorganized attachment",
  },
  {
    id: "secure",
    label: "I generally feel secure in relationships",
    description: "I can balance closeness and independence, communicate needs openly",
    full: "Secure attachment",
  },
  {
    id: "unsure",
    label: "I'm not sure / still learning",
    description: "I want to understand more about how I attach",
    full: "Exploring",
  },
]

const partnerStyles = [
  {
    id: "anxious",
    label: "They seemed to worry a lot",
    description: "Needed frequent reassurance, feared losing me",
  },
  {
    id: "avoidant",
    label: "They often needed space or pulled away",
    description: "Valued independence, sometimes felt distant",
  },
  {
    id: "disorganized",
    label: "They seemed hot and cold",
    description: "Would come close then push away unpredictably",
  },
  {
    id: "secure",
    label: "They seemed generally secure",
    description: "Good at communicating and balancing needs",
  },
  {
    id: "unsure",
    label: "I'm not sure",
    description: "I want to explore this more",
  },
  {
    id: "na",
    label: "Not applicable",
    description: "This isn't about a specific person",
  },
]

export function AttachmentScreen({ onNext }: AttachmentScreenProps) {
  const [myStyle, setMyStyle] = useState("")
  const [partnerStyle, setPartnerStyle] = useState("")
  const [showInfo, setShowInfo] = useState(false)

  const canProceed = myStyle && partnerStyle

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen px-6 py-12 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Heart className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest">Attachment Styles</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">How do you connect?</h2>
          <p className="text-muted-foreground mt-2">
            This isn&apos;t a diagnosis—just a starting point for understanding patterns.
          </p>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-1 text-accent text-sm mt-2 hover:underline"
          >
            <HelpCircle className="w-3 h-3" />
            What are attachment styles?
          </button>
        </motion.div>

        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-card rounded-xl p-4 mb-6 border border-border"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              Attachment styles describe patterns in how we relate to others, often shaped by early experiences. They
              help explain why we might react certain ways in relationships. Most people are a mix, and styles can
              change with awareness and work.
            </p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
          <div>
            <label className="text-sm text-muted-foreground mb-3 block">Which feels most like you?</label>
            <div className="space-y-2">
              {attachmentStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setMyStyle(style.id)}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-200 border",
                    myStyle === style.id
                      ? "bg-card border-primary ring-1 ring-primary"
                      : "bg-card/50 border-border hover:border-primary/50",
                  )}
                >
                  <p className="font-medium text-foreground text-sm">{style.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
                </button>
              ))}
            </div>
          </div>

          {myStyle && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <label className="text-sm text-muted-foreground mb-3 block">
                What patterns did you notice in them? (if applicable)
              </label>
              <div className="space-y-2">
                {partnerStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setPartnerStyle(style.id)}
                    className={cn(
                      "w-full p-3 rounded-xl text-left transition-all duration-200 border",
                      partnerStyle === style.id
                        ? "bg-card border-accent ring-1 ring-accent"
                        : "bg-card/50 border-border hover:border-accent/50",
                    )}
                  >
                    <p className="font-medium text-foreground text-sm">{style.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{style.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-6">
        <Button
          onClick={() => onNext({ myAttachmentStyle: myStyle, partnerAttachmentStyle: partnerStyle })}
          disabled={!canProceed}
          className="w-full h-14 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
