export interface UserProfile {
  // Basic info
  age?: string
  identity?: string
  pronouns?: string

  statusPath?: "limbo" | "shutdown" | "post-breakup"

  // Situation discovery
  situationType?: string
  myAttachmentStyle?: string
  partnerAttachmentStyle?: string
  relationshipStatus?: string
  livingSituation?: string
  sharedCommunity?: boolean

  auditAnswers?: Record<string, "a" | "b">
  auditProfile?: "integrated" | "compartmentalized" | "shutdown"
  auditCompletedAt?: string

  // Timeline preferences
  clarityDuration?: number
  clarityStartDate?: string
  onboardingComplete?: boolean

  // Processing data
  emotionalState?: string[]
  primaryConcerns?: string[]
}

export interface JournalEntry {
  id: string
  type: "reflection" | "unsent" | "gratitude" | "insight" | "anchor"
  prompt?: string
  text: string
  timestamp: string
  followUpQuestions?: string[]
  dayNumber?: number
}

export interface CheckInEntry {
  id: string
  date: string
  mood: number
  urgeToContact: number
  anxietyLevel: number
  selfCareActions: string[]
  insights?: string
}

export interface NeedItem {
  id: string
  text: string
  category: string
  isCore: boolean
  createdAt: string
}

export interface BoundaryItem {
  id: string
  situation: string
  script: string
  practiced: boolean
  createdAt: string
}

export interface VaultEntry {
  id: string
  text: string
  timestamp: string
  reflectionQuestions: string[]
}

export interface UsageStats {
  vaultDeposits: number
  panicModeUses: number
  needsAdded: number
  patternsViewed: number
}

const STORAGE_KEYS = {
  PROFILE: "pivot_user_profile",
  JOURNAL: "pivot_journal_entries",
  CHECKINS: "pivot_checkin_entries",
  NEEDS: "pivot_needs",
  BOUNDARIES: "pivot_boundaries",
  VAULT: "pivot_vault_entries",
}

const USAGE_KEY = "pivot_usage_stats"

export function getUserProfile(): UserProfile {
  if (typeof window === "undefined") return {}
  const stored = localStorage.getItem(STORAGE_KEYS.PROFILE)
  return stored ? JSON.parse(stored) : {}
}

export function saveUserProfile(profile: Partial<UserProfile>): void {
  if (typeof window === "undefined") return
  const existing = getUserProfile()
  const updated = { ...existing, ...profile }
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated))
}

export function getJournalEntries(): JournalEntry[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL)
  return stored ? JSON.parse(stored) : []
}

export function saveJournalEntry(entry: JournalEntry): void {
  if (typeof window === "undefined") return
  const entries = getJournalEntries()
  entries.unshift(entry)
  localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries))
}

export function getCheckIns(): CheckInEntry[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.CHECKINS)
  return stored ? JSON.parse(stored) : []
}

export function saveCheckIn(entry: CheckInEntry): void {
  if (typeof window === "undefined") return
  const entries = getCheckIns()
  entries.unshift(entry)
  localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify(entries))
}

export function getUserNeeds(): NeedItem[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.NEEDS)
  return stored ? JSON.parse(stored) : []
}

export function saveUserNeed(need: NeedItem): void {
  if (typeof window === "undefined") return
  const needs = getUserNeeds()
  needs.push(need)
  localStorage.setItem(STORAGE_KEYS.NEEDS, JSON.stringify(needs))
  incrementUsageStat("needsAdded")
}

export function updateUserNeeds(needs: NeedItem[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.NEEDS, JSON.stringify(needs))
}

export function getBoundaries(): BoundaryItem[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.BOUNDARIES)
  return stored ? JSON.parse(stored) : []
}

export function saveBoundary(boundary: BoundaryItem): void {
  if (typeof window === "undefined") return
  const boundaries = getBoundaries()
  boundaries.push(boundary)
  localStorage.setItem(STORAGE_KEYS.BOUNDARIES, JSON.stringify(boundaries))
}

export function getVaultEntries(): VaultEntry[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.VAULT)
  return stored ? JSON.parse(stored) : []
}

export function saveVaultEntry(entry: VaultEntry): void {
  if (typeof window === "undefined") return
  const entries = getVaultEntries()
  entries.unshift(entry)
  localStorage.setItem(STORAGE_KEYS.VAULT, JSON.stringify(entries))
  incrementUsageStat("vaultDeposits")
}

export function getClarityDaysRemaining(): number {
  const profile = getUserProfile()
  if (!profile.clarityStartDate) return profile.clarityDuration || 14

  const duration = profile.clarityDuration || 14
  const start = new Date(profile.clarityStartDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(0, duration - diffDays)
}

export function getCurrentDay(): number {
  const profile = getUserProfile()
  if (!profile.clarityStartDate) return 1

  const duration = profile.clarityDuration || 14
  const start = new Date(profile.clarityStartDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.min(duration, Math.max(1, diffDays + 1))
}

export function getClarityProgress(): number {
  const profile = getUserProfile()
  const duration = profile.clarityDuration || 14
  const remaining = getClarityDaysRemaining()
  return ((duration - remaining) / duration) * 100
}

export function resetAllData(): void {
  if (typeof window === "undefined") return
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
  localStorage.removeItem(USAGE_KEY)
}

export function getUsageStats(): UsageStats {
  if (typeof window === "undefined") return { vaultDeposits: 0, panicModeUses: 0, needsAdded: 0, patternsViewed: 0 }
  const stored = localStorage.getItem(USAGE_KEY)
  return stored ? JSON.parse(stored) : { vaultDeposits: 0, panicModeUses: 0, needsAdded: 0, patternsViewed: 0 }
}

export function incrementUsageStat(stat: keyof UsageStats): void {
  if (typeof window === "undefined") return
  const stats = getUsageStats()
  stats[stat] = (stats[stat] || 0) + 1
  localStorage.setItem(USAGE_KEY, JSON.stringify(stats))
}
