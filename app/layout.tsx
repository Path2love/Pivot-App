import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Fraunces } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: "THE PIVOT - When Love Needs Logic",
  description:
    "A digital safe harbor for navigating relationship crisis. Clarity tools for everyone - any attachment style, any situation.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0c0a09",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSans.variable} ${fraunces.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
        <Analytics />
        <footer className="w-full text-center py-4 px-4 border-t border-border/20 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Path2Love Mastery &mdash;{" "}
          <a href="https://path2love.com/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Privacy Policy
          </a>{" "}
          &middot;{" "}
          <a href="mailto:support@path2love.com" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Contact
          </a>
        </footer>
      </body>
    </html>
  )
}
