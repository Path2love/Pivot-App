"use client"

import type React from "react"

import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface PivotCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
  variant?: "default" | "logic" | "heart" | "clarity"
  hover?: boolean
  glow?: boolean
}

export const PivotCard = forwardRef<HTMLDivElement, PivotCardProps>(
  ({ className, children, variant = "default", hover = true, glow = false, ...props }, ref) => {
    const variantStyles = {
      default: "border-pivot-slate-800",
      logic: "border-pivot-logic-blue/30",
      heart: "border-pivot-heart-burgundy/30",
      clarity: "border-pivot-clarity-cyan/30",
    }

    const glowStyles = {
      default: "",
      logic: "shadow-[0_0_20px_rgba(0,86,143,0.2)]",
      heart: "shadow-[0_0_20px_rgba(105,29,51,0.2)]",
      clarity: "glow-cyan-subtle",
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-pivot-slate-900/50 backdrop-blur-md rounded-2xl border shadow-lg",
          variantStyles[variant],
          glow && glowStyles[variant],
          className,
        )}
        whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)

PivotCard.displayName = "PivotCard"
