import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { code } = await request.json()
  if (!code) return NextResponse.json({ valid: false, error: 'No code provided' })

  const rawCodes = process.env.BYPASS_CODES || ''
  const validCodes = rawCodes.split(',').map((c: string) => c.trim().toUpperCase()).filter(Boolean)

  if (validCodes.length === 0) {
    return NextResponse.json({ valid: false, error: 'No codes configured' })
  }

  const valid = validCodes.includes(code.trim().toUpperCase())
  return NextResponse.json({ valid })
}
