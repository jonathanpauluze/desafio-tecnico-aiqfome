import { apiClient } from '@/lib/api'
import { formatCurrency } from './format'
import { ProductBadge, type Product, type Category } from '@/types/restaurant'

type MenuProduct = {
  id: string
  name: string
  description: string
  image: string
  price: number
  formattedPrice: string
  originalPrice?: number
  formattedOriginalPrice?: string
  displayType: 'DEFAULT' | 'FROM' | 'PROMO'
  hasOptions: boolean
  hasFrom: boolean
  badges: ProductBadge[]
}

type MenuSection = {
  categoryId: string
  categoryName: string
  categoryDescription?: string
  products: MenuProduct[]
  hasPromo: boolean
}

export async function getMenuByRestaurantId(
  restaurantId: string
): Promise<MenuSection[]> {
  const [categories, products] = await Promise.all([
    apiClient.get<Category[]>('/categories', { queryParams: { restaurantId } }),
    apiClient.get<Product[]>('/products', { queryParams: { restaurantId } })
  ])

  const menu: MenuSection[] = categories.map((category) => {
    const filteredProducts = products.filter(
      (product) => product.categoryId === category.id
    )

    const mappedProducts: MenuProduct[] = filteredProducts.map((product) => {
      const hasOptions = !!product.options
      let price = product.price
      let displayType: 'DEFAULT' | 'FROM' | 'PROMO' = 'DEFAULT'
      let originalPrice: number | undefined
      let hasFrom = false

      const sizeOptions = product.options?.size?.choices

      if (sizeOptions && sizeOptions.length > 1) {
        const sorted = [...sizeOptions].sort((a, b) => a.price - b.price)
        const lowest = sorted[0]
        const highest = sorted[sorted.length - 1]

        price = lowest.price

        const hasPromotion =
          lowest.original_price && lowest.original_price > lowest.price
        if (hasPromotion) {
          displayType = 'PROMO'
          originalPrice = lowest.original_price
        } else if (lowest.price !== highest.price) {
          displayType = 'FROM'
          hasFrom = true
        }
      }

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        price,
        formattedPrice: formatCurrency(price),
        originalPrice,
        formattedOriginalPrice: originalPrice
          ? formatCurrency(originalPrice)
          : undefined,
        displayType,
        hasOptions,
        hasFrom: hasFrom,
        badges: product.badges ?? []
      }
    })

    const hasPromo = mappedProducts.some((p) => p.displayType === 'PROMO')

    return {
      categoryId: category.id,
      categoryName: category.name,
      categoryDescription: category.description,
      products: mappedProducts,
      hasPromo
    }
  })

  return menu
}
