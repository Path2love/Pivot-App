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
  {
    day: 8,
    title: "The Grief That Isn't Named",
    heart: "You're mourning something that never fully existed, or that existed differently in your mind.",
    logic:
      "Ambiguous loss—grief without a clear ending—is neurologically harder to process than death. Your brain keeps searching for a resolution that hasn't come.",
    logicPrompt:
      "What specifically are you grieving? Not the person as they are, but the version of the relationship you believed was possible. Name it.",
  },
  {
    day: 9,
    title: "The Stories You're Running",
    heart: "You have a version of events playing on repeat. It feels like fact.",
    logic:
      "Your brain constructs narratives to make sense of pain. Those narratives feel true because they reduce uncertainty—but they are interpretations, not data.",
    logicPrompt:
      "Write down the story you're telling yourself about why this happened. Then write three alternative explanations that are equally plausible.",
  },
  {
    day: 10,
    title: "The Cost of Holding On",
    heart: "Letting go feels like betrayal, or like admitting it meant nothing.",
    logic:
      "Holding on isn't loyalty. It's a way of avoiding the pain of acceptance. The energy you spend maintaining hope for one outcome is energy unavailable for your actual life.",
    logicPrompt:
      "What are you putting on hold while you wait? List three things you've paused, avoided, or diminished because of where your attention is right now.",
  },
  {
    day: 11,
    title: "Who You Were In That System",
    heart: "You're starting to see parts of yourself you don't fully recognise.",
    logic:
      "Every relationship is a system, and you adapted to survive inside it. Some of those adaptations served you. Some didn't. Neither makes you broken.",
    logicPrompt:
      "Describe one way you changed yourself—your voice, your needs, your behaviour—to manage the relationship. Was that adaptation working for you?",
  },
  {
    day: 12,
    title: "What You Actually Need",
    heart: "You've been so focused on what they need, or what went wrong, that your own needs feel selfish to name.",
    logic:
      "You cannot build a relationship that works without knowing what you require to function well inside it. Needs are data, not demands.",
    logicPrompt:
      "Complete this sentence three times: 'In a relationship, I need _______ to feel safe.' No editing. No justifying. Just the truth.",
  },
  {
    day: 13,
    title: "The Standard You're Keeping",
    heart: "Part of you wonders if you're asking for too much.",
    logic:
      "The bar you set for acceptable behaviour gets shaped by what you've been willing to accept. Consistency, clarity, and care are not luxury requirements.",
    logicPrompt:
      "Write down three things you excused or minimised in this relationship that you would not accept from a close friend or colleague. What does that tell you?",
  },
  {
    day: 14,
    title: "After the Reset",
    heart: "You made it through two weeks. That took something.",
    logic:
      "A reset doesn't mean you have the answers. It means your nervous system has had enough space to stop reacting and start thinking. That is the foundation everything else is built on.",
    logicPrompt:
      "What do you know now that you didn't know 14 days ago? Write it down. This is your baseline—the place you return to when things get loud again.",
  },
]

export function getDailyAnchor(dayNumber: number): DailyAnchor | null {
  if (dayNumber < 1 || dayNumber > 14) return null
  return dailyAnchors[dayNumber - 1]
}
