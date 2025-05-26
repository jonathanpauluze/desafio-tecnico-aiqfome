import { ProductInfo } from '@/templates/restaurant/product/product-info'
import { ProductForm } from '@/templates/restaurant/product/product-form'
import { apiClient } from '@/lib/api'
import { type Restaurant, type Product } from '@/types'

type PageProps = {
  params: Promise<{ restaurantId: string; productId: string }>
}

export default async function Restaurant(props: Readonly<PageProps>) {
  const { restaurantId, productId } = await props.params

  const restaurant = await apiClient.get<Restaurant>(
    `/restaurants/${restaurantId}`
  )
  const product = await apiClient.get<Product>(`/products/${productId}`, {
    config: {
      cache: 'no-store'
    }
  })

  return (
    <div className="min-h-[calc(100vh-204px)] lg:min-h-[calc(100vh-180px)] mb-10">
      <ProductInfo product={product} />

      <ProductForm restaurant={restaurant} product={product} />
    </div>
  )
}
