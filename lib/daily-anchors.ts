export interface DailyAnchor {
  day: number
  title: string
  heart: string
  logic: string
  logicPrompt: string
}

export const dailyAnchors: DailyAnchor[] = [
  {
    day: 1,
    title: "The Biology of the Break",
    heart: "Your chest feels tight and the silence is loud.",
    logic:
      "You are in a state of 'System Shock.' Your brain is physically reacting to the loss of a primary connection.",
    logicPrompt:
      "Today, don't try to solve the future. Just focus on regulating your breathing. Your only job is to stay grounded.",
  },
  {
    day: 2,
    title: "The Urge to Reach Out",
    heart: "You feel like one text could fix everything.",
    logic:
      "That urge is a 'Dopamine Craving.' Your brain wants to stop the pain, but reaching out during a 'shutdown' usually causes more distance.",
    logicPrompt: "If you have something to say, put it in the Vault. Let the 'urge' pass before you make a move.",
  },
  {
    day: 3,
    title: "The Gift of Space",
    heart: "Space feels like a punishment or a sign of the end.",
    logic:
      "Space is actually a diagnostic tool. You cannot see the shape of a relationship while you are standing in the middle of a fire.",
    logicPrompt: "Use this silence to observe your own thoughts, not to guess theirs.",
  },
  {
    day: 4,
    title: "Understanding the 'Silence'",
    heart: "You feel like the silence means they don't care.",
    logic:
      "For some, silence is a survival mechanism. It's a 'Safety Switch' that flips when they feel overwhelmed by expectation or intimacy.",
    logicPrompt: "Their silence is about their internal boundaries, not your personal value.",
  },
  {
    day: 5,
    title: "Defining Reliability",
    heart: "You remember the good times and think that's who they 'really' are.",
    logic: "A person is the sum of their actions during stress, not just during the 'static' or easy times.",
    logicPrompt:
      "Think about a time things got difficult. Did the system hold up, or did it crash? Reliability is a requirement, not a bonus.",
  },
  {
    day: 6,
    title: "Reclaiming Your Needs",
    heart: "You've been so focused on what they need that you've forgotten yourself.",
    logic: "A healthy partnership requires Systemic Integration—where both people's needs are visible and valued.",
    logicPrompt: "Write down three things you need to feel secure in any relationship, regardless of who it is with.",
  },
  {
    day: 7,
    title: "The Pivot Point",
    heart: "You're tired of waiting for a sign or a decision.",
    logic: "Waiting for someone else to decide your future puts you in a position of zero power.",
    logicPrompt: "Today, you are the decision-maker. You are pivoting from 'waiting' to 'witnessing.'",
  },
]

export function getDailyAnchor(dayNumber: number): DailyAnchor | null {
  if (dayNumber < 1 || dayNumber > 7) return null
  return dailyAnchors[dayNumber - 1]
}
