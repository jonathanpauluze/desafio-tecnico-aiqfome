import { RestaurantInfo } from '@/templates/restaurant/components/restaurant-info'
import { RestaurantMenu } from '@/templates/restaurant/components/restaurant-menu'
import { RestaurantBagButton } from '@/templates/restaurant/components/restaurant-bag-button'
import { apiClient } from '@/lib/api'
import { type Restaurant } from '@/types'

type PageProps = {
  params: Promise<{ restaurantId: string }>
}

export default async function Restaurant(props: Readonly<PageProps>) {
  const { restaurantId } = await props.params

  const restaurant = await apiClient.get<Restaurant>(
    `/restaurants/${restaurantId}`,
    {
      config: {
        cache: 'no-store'
      }
    }
  )

  return (
    <div className="min-h-[calc(100vh-204px)] lg:min-h-[calc(100vh-180px)]">
      <RestaurantInfo restaurant={restaurant} />

      <RestaurantMenu restaurantId={restaurantId} />

      <RestaurantBagButton />
    </div>
  )
}
