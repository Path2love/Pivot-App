'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import Checkout from '@/components/checkout'
import { PRODUCTS } from '@/lib/products'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get('product')

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
