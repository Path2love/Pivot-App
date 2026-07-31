import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[stripe-webhook] Signature verification failed: ${message}`)
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const productId = session.metadata?.productId
      const isPivotProduct = PRODUCTS.some((p) => p.id === productId)

      if (!isPivotProduct) {
        // This Stripe account is shared with other apps (love-mastery-iq, alison-ai).
        // Ignore checkout sessions that don't belong to a Pivot-App product.
        break
      }

      if (session.payment_status === 'paid') {
        const email = session.customer_details?.email
        console.log(`[stripe-webhook] Payment confirmed for session ${session.id} product=${productId} email=${email}`)

        // Trigger GHL post-purchase automation if webhook URL is configured
        const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL
        if (ghlWebhookUrl && email) {
          fetch(ghlWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, productId, sessionId: session.id }),
          }).catch((err) => console.error('[stripe-webhook] GHL webhook failed:', err))
        }
      }
      break
    }
    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent
      console.error(`[stripe-webhook] Payment failed for intent ${intent.id}`)
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
