"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { HeroHome } from "@/components/landing/hero-home"
import { SystemAudit } from "@/components/audit/system-audit"
import { NextSteps } from "@/components/audit/next-steps"
import { MissionBriefing } from "@/components/audit/mission-briefing"
import { WelcomeScreen } from "@/components/onboarding/welcome-screen"
import { IdentityScreen } from "@/components/onboarding/identity-screen"
import { SituationScreen } from "@/components/onboarding/situation-screen"
import { AttachmentScreen } from "@/components/onboarding/attachment-screen"
import { LivingSituationScreen } from "@/components/onboarding/living-situation-screen"
import { TimelineScreen } from "@/components/onboarding/timeline-screen"
import { OnboardingCompleteScreen } from "@/components/onboarding/onboarding-complete-screen"
import { MainDashboard } from "@/components/dashboard/main-dashboard"
import { ProcessingHub } from "@/components/modules/processing-hub"
import { GuidedReflection } from "@/components/modules/guided-reflection"
import { DailyCheckIn } from "@/components/modules/daily-check-in"
import { NeedsExplorer } from "@/components/modules/needs-explorer"
import { BoundaryBuilder } from "@/components/modules/boundary-builder"
import { SafetyVault } from "@/components/modules/safety-vault"
import { PatternLibrary } from "@/components/modules/pattern-library"
import { NavBar } from "@/components/dashboard/nav-bar"
import { PanicButton } from "@/components/dashboard/panic-button"
import { getUserProfile, saveUserProfile } from "@/lib/storage"

type AppState = "hero" | "audit" | "next-steps" | "mission-briefing" | "onboarding" | "dashboard"
type OnboardingStep = "welcome" | "identity" | "situation" | "attachment" | "living" | "timeline" | "complete"
type AppTab = "home" | "process" | "explore" | "tools"
type SubView = null | "reflection" | "checkin" | "vault" | "patterns" | "needs" | "boundaries"

export default function ThePivot() {
  const [isLoading, setIsLoading] = useState(true)
  const [appState, setAppState] = useState<AppState>("hero")
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("welcome")
  const [activeTab, setActiveTab] = useState<AppTab>("home")
  const [subView, setSubView] = useState<SubView>(null)

  useEffect(() => {
    const profile = getUserProfile()

    if (profile.onboardingComplete && profile.auditProfile) {
      setAppState("dashboard")
    } else if (profile.auditProfile && !profile.onboardingComplete) {
      setAppState("mission-briefing")
    } else if (profile.statusPath && !profile.auditProfile) {
      setAppState("audit")
    } else {
      setAppState("hero")
    }

    setIsLoading(false)
  }, [])

  const handleStatusSelect = () => {}

  const handleStartJourney = () => {
    setAppState("audit")
  }

  const handleAuditComplete = () => {
    setAppState("next-steps")
  }

  const handleNextStepsComplete = () => {
    setAppState("mission-briefing")
  }

  const handleMissionBriefingComplete = () => {
    setAppState("onboarding")
  }

  const handleIdentityComplete = (data: { age: string; identity: string; pronouns: string }) => {
    saveUserProfile({ age: data.age, identity: data.identity, pronouns: data.pronouns })
    setOnboardingStep("situation")
  }

  const handleSituationComplete = (data: { situationType: string; relationshipStatus: string }) => {
    saveUserProfile({ situationType: data.situationType, relationshipStatus: data.relationshipStatus })
    setOnboardingStep("attachment")
  }

  const handleAttachmentComplete = (data: { myAttachmentStyle: string; partnerAttachmentStyle: string }) => {
    saveUserProfile({
      myAttachmentStyle: data.myAttachmentStyle,
      partnerAttachmentStyle: data.partnerAttachmentStyle,
    })
    setOnboardingStep("living")
  }

  const handleLivingComplete = (data: { livingSituation: string; sharedCommunity: boolean }) => {
    saveUserProfile({ livingSituation: data.livingSituation, sharedCommunity: data.sharedCommunity })
    setOnboardingStep("timeline")
  }

  const handleTimelineComplete = (duration: number) => {
    saveUserProfile({ clarityDuration: duration })
    setOnboardingStep("complete")
  }

  const handleOnboardingComplete = () => {
    saveUserProfile({
      onboardingComplete: true,
      clarityStartDate: new Date().toISOString(),
    })
    setAppState("dashboard")
  }

  const handleOpenSubView = (view: SubView) => {
    setSubView(view)
  }

  const handleCloseSubView = () => {
    setSubView(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (appState === "hero") {
    return (
      <main className="min-h-screen bg-background">
        <HeroHome onStatusSelect={handleStatusSelect} onStartJourney={handleStartJourney} />
      </main>
    )
  }

  if (appState === "audit") {
    return (
      <main className="min-h-screen bg-background">
        <SystemAudit onComplete={handleAuditComplete} />
      </main>
    )
  }

  if (appState === "next-steps") {
    return (
      <main className="min-h-screen bg-background">
        <NextSteps onContinue={handleNextStepsComplete} />
      </main>
    )
  }

  if (appState === "mission-briefing") {
    return (
      <main className="min-h-screen bg-background">
        <MissionBriefing onEnterDashboard={handleMissionBriefingComplete} />
      </main>
    )
  }

  if (appState === "onboarding") {
    return (
      <main className="min-h-screen bg-background">
        <AnimatePresence mode="wait">
          {onboardingStep === "welcome" && <WelcomeScreen key="welcome" onNext={() => setOnboardingStep("identity")} />}
          {onboardingStep === "identity" && <IdentityScreen key="identity" onNext={handleIdentityComplete} />}
          {onboardingStep === "situation" && <SituationScreen key="situation" onNext={handleSituationComplete} />}
          {onboardingStep === "attachment" && <AttachmentScreen key="attachment" onNext={handleAttachmentComplete} />}
          {onboardingStep === "living" && <LivingSituationScreen key="living" onNext={handleLivingComplete} />}
          {onboardingStep === "timeline" && <TimelineScreen key="timeline" onNext={handleTimelineComplete} />}
          {onboardingStep === "complete" && (
            <OnboardingCompleteScreen key="complete" onComplete={handleOnboardingComplete} />
          )}
        </AnimatePresence>
      </main>
    )
  }

  if (subView) {
    return (
      <main className="min-h-screen bg-background">
        <AnimatePresence mode="wait">
          {subView === "reflection" && <GuidedReflection key="reflection" onBack={handleCloseSubView} />}
          {subView === "checkin" && <DailyCheckIn key="checkin" onBack={handleCloseSubView} />}
          {subView === "vault" && <SafetyVault key="vault" onBack={handleCloseSubView} />}
          {subView === "patterns" && <PatternLibrary key="patterns" onBack={handleCloseSubView} />}
          {subView === "needs" && <NeedsExplorer key="needs" onBack={handleCloseSubView} />}
          {subView === "boundaries" && <BoundaryBuilder key="boundaries" onBack={handleCloseSubView} />}
        </AnimatePresence>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {activeTab === "home" && <MainDashboard key="home" onOpenSubView={handleOpenSubView} />}
        {activeTab === "process" && <ProcessingHub key="process" onOpenSubView={handleOpenSubView} />}
        {activeTab === "explore" && <PatternLibrary key="explore" onBack={() => setActiveTab("home")} embedded />}
        {activeTab === "tools" && <NeedsExplorer key="tools" onBack={() => setActiveTab("home")} embedded />}
      </AnimatePresence>

      <PanicButton />
      <NavBar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as AppTab)} />
    </main>
  )
}
