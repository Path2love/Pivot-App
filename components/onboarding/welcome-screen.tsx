"use client"

import { motion } from "framer-motion"
import { Compass, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-20 h-20 rounded-full bg-pivot-clarity-cyan/20 flex items-center justify-center mb-6 mx-auto">
          <Compass className="w-10 h-10 text-pivot-clarity-cyan" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">THE PIVOT</h1>
        <p className="text-pivot-clarity-cyan text-sm tracking-widest uppercase">When Love Needs Logic</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-sm mb-12"
      >
        <p className="font-serif text-xl text-foreground/90 leading-relaxed">
          Whatever brought you here, you&apos;re welcome.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          This is a space to process, explore, and find your own answers. No judgment. No timelines you didn&apos;t
          choose. Just gentle questions to help you understand what you&apos;re experiencing.
        </p>
        <div className="flex items-center justify-center gap-2 mt-6 text-pivot-warm-amber">
          <Heart className="w-4 h-4" />
          <span className="text-sm">For all identities and all experiences</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Button
          onClick={onNext}
          size="lg"
          className="px-12 py-6 text-lg font-medium rounded-full bg-pivot-clarity-cyan text-pivot-charcoal hover:bg-pivot-clarity-cyan/90 transition-all duration-300"
        >
          Let&apos;s Begin
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-muted-foreground/60 text-xs"
      >
        Everything stays private on your device
      </motion.p>
    </motion.div>
  )
}
