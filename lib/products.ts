export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// This is the source of truth for all products.
// All UI to display products should pull from this array.
// IDs passed to the checkout session should be the same as IDs from this array.
export const PRODUCTS: Product[] = [
  {
    id: 'free-trial',
    name: 'Free Trial',
    description: '3-day trial with basic access to The Pivot tools',
    priceInCents: 0, // Free
  },
  {
    id: 'full-access',
    name: 'Full Access',
    description: 'Complete 14-day reset program with all tools and features',
    priceInCents: 700, // $7.00
  },
  {
    id: 'lifetime',
    name: 'Lifetime Access',
    description: 'Forever access to all current and future tools',
    priceInCents: 7900, // $79.00
  },
  {
    id: 'breakthrough-kit',
    name: 'Breakthrough Kit',
    description: 'The complete toolkit to break through the deep-rooted blocks holding you back',
    priceInCents: 4700, // $47.00
  },
  {
    id: 'bundle',
    name: 'Love Manifestation Sanctuary Bundle',
    description: '21-Day Challenge, Affirmations, AI Prompts, and Visualization Guide',
    priceInCents: 1500, // $15.00
  },
]
