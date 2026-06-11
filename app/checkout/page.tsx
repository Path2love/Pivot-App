'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import Checkout from '@/components/checkout'
import { PRODUCTS } from '@/lib/products'
import { saveUserProfile } from '@/lib/storage'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get('product')
  const [showPromo, setShowPromo] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)
  const [promoError, setPromoError] = useState('')

  const handlePromoApply = async () => {
    if (!promoCode.trim()) return
    setPromoLoading(true)
    setPromoError('')
    try {
      const response = await fetch('/api/redeem-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode.trim() }),
      })
      const data = await response.json()
      if (data.valid) {
        saveUserProfile({ accessLevel: 'full-access' })
        router.replace('/')
      } else {
        setPromoError('Invalid code. Please try again.')
      }
    } catch {
      setPromoError('Something went wrong. Please try again.')
    } finally {
      setPromoLoading(false)
    }
  }

  const product = productId ? PRODUCTS.find((p) => p.id === productId && p.priceInCents > 0) : null

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center space-y-4">
          <p className="text-foreground">Invalid or missing product.</p>
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-1">
              {product.name}
            </h1>
            <p className="text-muted-foreground">
              ${(product.priceInCents / 100).toFixed(0)} — {product.description}
            </p>
          </div>
          <button
            onClick={() => router.replace('/')}
            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Checkout productId={product.id} />

        <div className="mt-6 text-center">
          {!showPromo ? (
            <button
              onClick={() => setShowPromo(true)}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Have a promo code?
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 w-full max-w-xs">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === 'Enter' && handlePromoApply()}
                  placeholder="ENTER CODE"
                  className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-[#00f5ff]"
                />
                <button
                  onClick={handlePromoApply}
                  disabled={promoLoading}
                  className="px-4 py-2 rounded-lg bg-[#00f5ff] text-black text-sm font-semibold hover:opacity-90 disabled:opacity-60"
                >
                  {promoLoading ? '...' : 'Apply'}
                </button>
              </div>
              {promoError && <p className="text-red-400 text-xs">{promoError}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-10 h-10 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
