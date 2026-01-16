export interface UserProfile {
  // Basic info (optional, non-judgmental)
  age?: string
  identity?: string
  pronouns?: string

  // Situation discovery
  situationType?: string // what brought them here
  myAttachmentStyle?: string // their self-identified style
  partnerAttachmentStyle?: string // what they observe in partner
  relationshipStatus?: string // current state
  livingSituation?: string // living arrangement
  sharedCommunity?: boolean // shared social circles

  // Timeline preferences
  clarityDuration?: number // 14 or 30 days
  clarityStartDate?: string
  onboardingComplete?: boolean

  // Processing data
  emotionalState?: string[]
  primaryConcerns?: string[]
}

export interface JournalEntry {
  id: string
  type: "reflection" | "unsent" | "gratitude" | "insight"
  prompt?: string
  text: string
  timestamp: string
  followUpQuestions?: string[]
}

export interface CheckInEntry {
  id: string
  date: string
  mood: number // 1-10
  urgeToContact: number // 1-10
  anxietyLevel: number // 1-10
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

const STORAGE_KEYS = {
  PROFILE: "pivot_user_profile",
  JOURNAL: "pivot_journal_entries",
  CHECKINS: "pivot_checkin_entries",
  NEEDS: "pivot_needs",
  BOUNDARIES: "pivot_boundaries",
}

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

export function getClarityDaysRemaining(): number {
  const profile = getUserProfile()
  if (!profile.clarityStartDate) return profile.clarityDuration || 30

  const duration = profile.clarityDuration || 30
  const start = new Date(profile.clarityStartDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(0, duration - diffDays)
}

export function getClarityProgress(): number {
  const profile = getUserProfile()
  const duration = profile.clarityDuration || 30
  const remaining = getClarityDaysRemaining()
  return ((duration - remaining) / duration) * 100
}

export function resetAllData(): void {
  if (typeof window === "undefined") return
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
}
