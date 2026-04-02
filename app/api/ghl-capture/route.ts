import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, source, timestamp } = body

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL
  if (!webhookUrl) {
    // GHL not yet configured — log and return success so user journey is not blocked
    console.warn(`[ghl-capture] GHL_WEBHOOK_URL not set — email not forwarded: ${email} source=${source}`)
    return NextResponse.json({ ok: true })
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source, timestamp }),
    })
  } catch {
    // Log but don't fail — the user journey should not be blocked by a GHL error
    console.error("[ghl-capture] Failed to forward to GHL webhook")
  }

  return NextResponse.json({ ok: true })
}
