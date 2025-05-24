import { apiClient } from '@/lib/api'
import { RestaurantCard } from '../restaurant-card'
import { type Restaurant } from '@/types'

type RestaurantListProps = {
  query: string
  closedRestaurants?: boolean
}

export async function RestaurantList(props: Readonly<RestaurantListProps>) {
  const { query, closedRestaurants = false } = props

  const restaurants = await apiClient.get<Restaurant[]>('/restaurants', {
    queryParams: {
      name_like: query,
      is_closed: closedRestaurants
    },

    config: {
      cache: 'no-store'
    }
  })

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 2xl:grid-cols-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          image={restaurant.image}
          name={restaurant.name}
          delivery_fee={restaurant.delivery_fee}
          rating={restaurant.rating}
          is_closed={restaurant.is_closed}
        />
      ))}
    </div>
  )
}
