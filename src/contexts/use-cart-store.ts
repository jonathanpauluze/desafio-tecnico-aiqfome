import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_CART_KEY } from '@/constants/storage'
import { type ProductOptions, type Restaurant } from '@/types'

export type SelectedExtra = {
  group: string
  label: string
  price: number
}

export type CartItem = {
  id: string
  productId: string
  restaurantId: string
  name: string
  image: string
  quantity: number
  observation?: string
  basePrice: number
  extras: SelectedExtra[]
  totalPrice: number
  options: ProductOptions
}

interface CartState {
  items: CartItem[]
  total: number
  restaurant: Restaurant | null
  setRestaurant: (restaurant: Restaurant) => void
  isDifferentRestaurant: (restaurantId: string) => boolean
  addItem: (item: Omit<CartItem, 'totalPrice'>) => void
  updateItem: (id: string, newData: Omit<CartItem, 'totalPrice'>) => void
  removeItem: (cartItemId: string) => void
  updateItemQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      restaurant: null,

      setRestaurant: (restaurant) => set({ restaurant }),

      isDifferentRestaurant: (restaurantId: string) => {
        const current = get().restaurant

        return current !== null && current.id !== restaurantId
      },

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
              options: item.options,
              totalPrice: (item.basePrice + extrasTotal) * item.quantity
            }
          ]
        }

        set({
          items: newItems,
          total: newItems.reduce((acc, i) => acc + i.totalPrice, 0)
        })
      },

      updateItem: (cartItemId, newData) => {
        const extrasTotal = newData.extras.reduce(
          (acc, extra) => acc + extra.price,
          0
        )
        const updatedItems = get().items.map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                ...newData,
                totalPrice: (newData.basePrice + extrasTotal) * newData.quantity
              }
            : item
        )

        set({
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + item.totalPrice, 0)
        })
      },

      removeItem: (cartItemId: string) => {
        const newItems = get().items.filter((i) => i.id !== cartItemId)

        set({
          items: newItems,
          total: newItems.reduce((acc, i) => acc + i.totalPrice, 0)
        })
      },

      updateItemQuantity: (cartItemId, quantity) => {
        const newItems = get().items.map((item) => {
          if (item.id === cartItemId) {
            const extrasTotal = item.extras.reduce(
              (acc, extra) => acc + extra.price,
              0
            )
            return {
              ...item,
              quantity,
              totalPrice: (item.basePrice + extrasTotal) * quantity
            }
          }
          return item
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
