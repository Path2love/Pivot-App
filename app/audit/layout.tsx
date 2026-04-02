import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What type of relationship crisis are you in? | The Pivot",
  description:
    "Take the 10-question Relationship System Audit. Discover whether you're in an Integrated System, a Compartmentalized System, or a Shutdown Cycle. Free, private, no sign-up required.",
  openGraph: {
    title: "What type of relationship crisis are you in? | The Pivot",
    description:
      "10 questions. 2 minutes. Find out what's really happening in your relationship. Free and private.",
    url: "https://mypivot.app/audit",
    type: "website",
    siteName: "The Pivot",
  },
  twitter: {
    card: "summary_large_image",
    title: "What type of relationship crisis are you in? | The Pivot",
    description:
      "10 questions. 2 minutes. Find out what's really happening in your relationship.",
  },
}

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
