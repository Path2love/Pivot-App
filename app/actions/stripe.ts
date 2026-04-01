'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

export async function startCheckoutSession(productId: string, origin: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  if (product.priceInCents === 0) {
    return null
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'if_required',
    return_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  })

  return session.client_secret
}

export async function verifyPurchase(sessionId: string): Promise<{
  verified: boolean
  productId: string | null
}> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status === 'paid') {
      return { verified: true, productId: session.metadata?.productId ?? null }
    }
    return { verified: false, productId: null }
  } catch {
    return { verified: false, productId: null }
  }
}
