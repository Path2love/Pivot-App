'use client'

export const dynamic = 'force-dynamic'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyPurchase } from '@/app/actions/stripe'
import { saveUserProfile } from '@/lib/storage'

const GHL_PRODUCTS = ['breakthrough-kit', 'bundle']

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [productId, setProductId] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const pid = searchParams.get('product')

    if (!sessionId) {
      setStatus('error')
      return
    }

    verifyPurchase(sessionId).then(({ verified }) => {
      if (verified) {
        type AccessLevel = 'full-access' | 'lifetime' | 'breakthrough-kit' | 'bundle'
        const accessLevelMap: Record<string, AccessLevel> = {
          'lifetime': 'lifetime',
          'breakthrough-kit': 'breakthrough-kit',
          'bundle': 'bundle',
        }
        const accessLevel: AccessLevel = accessLevelMap[pid ?? ''] ?? 'full-access'
        saveUserProfile({ accessLevel })
        setProductId(pid)
        setStatus('success')
        // GHL funnel products are delivered by email — stay on this page
        if (!pid || !GHL_PRODUCTS.includes(pid)) {
          setTimeout(() => router.replace('/'), 1500)
        }
      } else {
        setStatus('error')
      }
    })
  }, [searchParams, router])

  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Verifying your purchase...</p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    const isGhlProduct = productId && GHL_PRODUCTS.includes(productId)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-sm px-6">
          <div className="text-4xl">✓</div>
          {isGhlProduct ? (
            <>
              <p className="text-foreground font-semibold">Your order is confirmed.</p>
              <p className="text-muted-foreground text-sm">Check your email — your materials are on their way.</p>
            </>
          ) : (
            <p className="text-foreground font-semibold">You&apos;re in. Starting your reset.</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <p className="text-foreground">Something went wrong verifying your purchase.</p>
        <button
          onClick={() => router.replace('/')}
          className="text-[#00f5ff] underline text-sm"
        >
          Return to The Pivot
        </button>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
