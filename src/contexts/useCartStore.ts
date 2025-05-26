import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_CART_KEY } from '@/constants/storage'

export type SelectedExtra = {
  group: string
  label: string
  price: number
}

export type CartItem = {
  productId: string
  restaurantId: string
  name: string
  image: string
  quantity: number
  observation?: string
  basePrice: number
  extras: SelectedExtra[]
  totalPrice: number
}

interface CartState {
  items: CartItem[]
  total: number
  addItem: (item: Omit<CartItem, 'totalPrice'>) => void
  removeItem: (productId: string) => void
  updateItemQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (item) => {
        const extrasTotal = item.extras.reduce(
          (acc, extra) => acc + extra.price,
          0
        )

        const existing = get().items.find(
          (i) =>
            i.productId === item.productId &&
            JSON.stringify(i.extras) === JSON.stringify(item.extras) &&
            i.observation === item.observation
        )

        let newItems: CartItem[]

        if (existing) {
          newItems = get().items.map((i) =>
            i === existing
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                  totalPrice:
                    (i.basePrice + extrasTotal) * (i.quantity + item.quantity)
                }
              : i
          )
        } else {
          newItems = [
            ...get().items,
            {
              ...item,
              totalPrice: (item.basePrice + extrasTotal) * item.quantity
            }
          ]
        }

        set({
          items: newItems,
          total: newItems.reduce((acc, i) => acc + i.totalPrice, 0)
        })
      },

      removeItem: (productId) => {
        const newItems = get().items.filter((i) => i.productId !== productId)
        set({
          items: newItems,
          total: newItems.reduce((acc, i) => acc + i.totalPrice, 0)
        })
      },

      updateItemQuantity: (productId, quantity) => {
        const newItems = get().items.map((i) => {
          if (i.productId === productId) {
            const extrasTotal = i.extras.reduce(
              (acc, extra) => acc + extra.price,
              0
            )
            return {
              ...i,
              quantity,
              totalPrice: (i.basePrice + extrasTotal) * quantity
            }
          }
          return i
        })

        set({
          items: newItems,
          total: newItems.reduce((acc, i) => acc + i.totalPrice, 0)
        })
      },

      clearCart: () => set({ items: [], total: 0 })
    }),
    {
      name: STORAGE_CART_KEY
    }
  )
)
