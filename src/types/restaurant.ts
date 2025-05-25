export type Restaurant = {
  id: string
  name: string
  rating: number
  delivery_fee: number
  free_delivery_over: number
  min_order: number
  distance_km: number
  delivery_time_min: string
  closes_at: string
  image: string
  is_closed: boolean
}

export type Category = {
  id: string
  name: string
  description?: string
  restaurantId: number
}

export enum ProductBadge {
  SPICY = 'SPICY',
  VEGAN = 'VEGAN'
}

export type ProductOptionChoice = {
  id?: string
  label: string
  price: number
  original_price?: number
}

export type ProductOptions = {
  [key: string]: {
    type: 'radio' | 'checkbox' | 'number' | 'quantity'
    title: string
    required?: boolean
    min?: number
    max?: number
    choices?: ProductOptionChoice[]
  }
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  restaurantId: string
  categoryId: string
  image: string
  badges?: ProductBadge[]
  options?: ProductOptions | null
}
