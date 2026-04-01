'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyPurchase } from '@/app/actions/stripe'
import { saveUserProfile } from '@/lib/storage'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const productId = searchParams.get('product')

    if (!sessionId) {
      setStatus('error')
      return
    }

    verifyPurchase(sessionId).then(({ verified }) => {
      if (verified && productId) {
        type AccessLevel = 'full-access' | 'lifetime' | 'breakthrough-kit' | 'bundle'
        const accessLevelMap: Record<string, AccessLevel> = {
          'lifetime': 'lifetime',
          'breakthrough-kit': 'breakthrough-kit',
          'bundle': 'bundle',
        }
        const accessLevel: AccessLevel = accessLevelMap[productId] ?? 'full-access'
        saveUserProfile({ accessLevel })
        setStatus('success')
        setTimeout(() => router.replace('/'), 1500)
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="text-4xl">✓</div>
          <p className="text-foreground font-semibold">You're in. Starting your reset.</p>
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
