export interface AuditQuestion {
  id: string
  dimension: string
  question: string
  optionA: {
    text: string
    profile: "integrated" | "compartmentalized" | "shutdown"
  }
  optionB: {
    text: string
    profile: "integrated" | "compartmentalized" | "shutdown"
  }
}

export const auditQuestions: AuditQuestion[] = [
  {
    id: "stress-response",
    dimension: "Stress Response",
    question: "When life gets hard, your partner typically:",
    optionA: {
      text: "Pulls you closer and communicates more",
      profile: "integrated",
    },
    optionB: {
      text: "Goes quiet and needs space alone",
      profile: "shutdown",
    },
  },
  {
    id: "root-system",
    dimension: "Root System",
    question: "In terms of life integration, you feel:",
    optionA: {
      text: "Woven into their daily life, family, and future plans",
      profile: "integrated",
    },
    optionB: {
      text: "Like a separate 'compartment' from the rest of their life",
      profile: "compartmentalized",
    },
  },
  {
    id: "future-filter",
    dimension: "Future Filter",
    question: "When you talk about the future:",
    optionA: {
      text: "They engage and make plans with you",
      profile: "integrated",
    },
    optionB: {
      text: "They get vague, change the subject, or seem uncomfortable",
      profile: "compartmentalized",
    },
  },
  {
    id: "safety-switch",
    dimension: "Safety Switch",
    question: "When things get emotionally intense:",
    optionA: {
      text: "They stay present and work through it with you",
      profile: "integrated",
    },
    optionB: {
      text: "They shut down, go cold, or disappear for a while",
      profile: "shutdown",
    },
  },
  {
    id: "conflict-architecture",
    dimension: "Conflict Architecture",
    question: "After a disagreement:",
    optionA: {
      text: "You resolve it together and feel closer afterward",
      profile: "integrated",
    },
    optionB: {
      text: "It lingers unresolved or they withdraw emotionally",
      profile: "shutdown",
    },
  },
  {
    id: "dimming-effect",
    dimension: "Dimming Effect",
    question: "Since this relationship started:",
    optionA: {
      text: "You've maintained your friendships, hobbies, and identity",
      profile: "integrated",
    },
    optionB: {
      text: "You've slowly dimmed parts of yourself to fit into their life",
      profile: "compartmentalized",
    },
  },
  {
    id: "social-transparency",
    dimension: "Social Transparency",
    question: "In their social world, you are:",
    optionA: {
      text: "Known, introduced, and included naturally",
      profile: "integrated",
    },
    optionB: {
      text: "Kept separate, hidden, or introduced minimally",
      profile: "compartmentalized",
    },
  },
  {
    id: "predictability-factor",
    dimension: "Predictability Factor",
    question: "Their emotional availability is:",
    optionA: {
      text: "Consistent and predictable day to day",
      profile: "integrated",
    },
    optionB: {
      text: "Hot and cold, unpredictable, or depends on their mood",
      profile: "shutdown",
    },
  },
  {
    id: "vulnerability-gap",
    dimension: "Vulnerability Gap",
    question: "When it comes to emotional depth:",
    optionA: {
      text: "They share their fears, struggles, and inner world with you",
      profile: "integrated",
    },
    optionB: {
      text: "They keep walls up and rarely let you in fully",
      profile: "compartmentalized",
    },
  },
  {
    id: "pivot-point",
    dimension: "Pivot Point",
    question: "Right now, you feel:",
    optionA: {
      text: "Like a partner working through a rough patch together",
      profile: "integrated",
    },
    optionB: {
      text: "Like you're waiting for them to decide your fate",
      profile: "shutdown",
    },
  },
]

export type AuditProfile = "integrated" | "compartmentalized" | "shutdown"

export interface AuditResult {
  profile: AuditProfile
  scores: {
    integrated: number
    compartmentalized: number
    shutdown: number
  }
}

export function calculateAuditResult(answers: Record<string, "a" | "b">): AuditResult {
  const scores = {
    integrated: 0,
    compartmentalized: 0,
    shutdown: 0,
  }

  auditQuestions.forEach((q) => {
    const answer = answers[q.id]
    if (answer === "a") {
      scores[q.optionA.profile]++
    } else if (answer === "b") {
      scores[q.optionB.profile]++
    }
  })

  // Determine dominant profile
  const maxScore = Math.max(scores.integrated, scores.compartmentalized, scores.shutdown)
  let profile: AuditProfile = "integrated"

  if (scores.shutdown === maxScore) {
    profile = "shutdown"
  } else if (scores.compartmentalized === maxScore) {
    profile = "compartmentalized"
  }

  return { profile, scores }
}

export const profileDescriptions: Record<
  AuditProfile,
  {
    title: string
    logic: string
    color: string
  }
> = {
  integrated: {
    title: "Integrated System",
    logic:
      "Your relationship has deep roots and high reliability. The current 'Limbo' may be a temporary glitch rather than a structural failure.",
    color: "pivot-logic-blue",
  },
  compartmentalized: {
    title: "Compartmentalized System",
    logic:
      "Your relationship was high-functioning in a 'box,' but crashed when life got 'real.' This suggests a lack of systemic integration.",
    color: "pivot-heart-burgundy",
  },
  shutdown: {
    title: "Shutdown Cycle",
    logic:
      "This pattern shows that closeness is perceived as a threat. The 'logic' suggests that without professional intervention, the 'switch' will continue to flip during transitions.",
    color: "pivot-clarity-cyan",
  },
}

export const profileNextSteps: Record<
  AuditProfile,
  {
    steps: { title: string; description: string }[]
  }
> = {
  integrated: {
    steps: [
      {
        title: "The 14-Day Clarity Window",
        description: "Commit to 14 days of Mental Quiet. Give your nervous system time to regulate.",
      },
      {
        title: "The Repair Audit",
        description: "Schedule a 'System Check' after 14 days to discuss stress triggers and reconnection.",
      },
      {
        title: "Re-Integration",
        description: "Strengthen the Root System to prevent future shutdowns during high-stress periods.",
      },
    ],
  },
  compartmentalized: {
    steps: [
      {
        title: "Needs Navigator",
        description:
          "List your non-negotiables. Ask yourself: Am I willing to be a subset, or do I want true integration?",
      },
      {
        title: "Reclaim Your Subsets",
        description: "Re-engage the hobbies, friends, and parts of yourself you dimmed for this relationship.",
      },
      {
        title: "Evaluate the Cost",
        description:
          "Determine if your partner is willing to do Root Integration work, or if compartmentalization is their ceiling.",
      },
    ],
  },
  shutdown: {
    steps: [
      {
        title: "Hard Reset",
        description:
          "14-30 days of total silence. Your nervous system needs space to stop treating this person like a threat or a savior.",
      },
      {
        title: "Reliability Test",
        description: "Review a daily 'Why' list. Accept that caring does not equal reliable.",
      },
      {
        title: "Professional Requirement",
        description:
          "Acknowledge this as a hard-coded loop. Without therapy or reprogramming, the 'switch' will continue to flip.",
      },
    ],
  },
}
