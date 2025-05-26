'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/ui'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/contexts/use-cart-store'

export function RestaurantBagButton() {
  const router = useRouter()
  const cart = useCartStore()

  const isCartEmpty = cart.items.length === 0

  if (isCartEmpty) return null

  return (
    <Button
      variant="ghost"
      className="fixed bottom-6 right-6 z-50 p-2 w-14 h-14 rounded-full bg-white border border-neutral-200 shadow-md active:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700  dark:active:bg-neutral-600 transition-colors"
      onClick={() => router.push('/checkout')}
    >
      <ShoppingBag className="w-14 h-14 text-brand" />
      <span className="sr-only">Ver sacola</span>
    </Button>
  )
}
