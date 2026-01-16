"use client"

import { Home, Compass, Search, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavBarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", icon: Home, label: "Anchor" },
  { id: "process", icon: Compass, label: "Process" },
  { id: "explore", icon: Search, label: "Patterns" },
  { id: "tools", icon: Wrench, label: "Tools" },
]

export function NavBar({ activeTab, onTabChange }: NavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-pivot-background/95 backdrop-blur border-t border-pivot-slate-800 px-4 py-2 safe-area-inset-bottom z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors",
                isActive ? "text-pivot-clarity-cyan" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_4px_rgba(0,245,255,0.5)]")} />
              <span className="text-xs">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
