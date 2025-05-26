'use client'

import { Button } from '@/components/ui'
import { HeartFilledIcon, HeartIcon } from '@/icons'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useFavoriteRestaurants } from '@/hooks/useFavoriteRestaurants'

type RestaurantFavoriteProps = {
  restaurantId: string
}

export function RestaurantFavoriteButton(
  props: Readonly<RestaurantFavoriteProps>
) {
  const { restaurantId } = props

  const isMounted = useIsMounted()
  const { isFavorite, toggleFavorite } = useFavoriteRestaurants()

  let icon = null

  if (isMounted) {
    icon = isFavorite(restaurantId) ? <HeartFilledIcon /> : <HeartIcon />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => toggleFavorite(restaurantId)}
      className="text-brand"
    >
      {icon}

      <span className="sr-only">
        {isFavorite(restaurantId) ? 'Desfavoritar' : 'Favoritar'}
      </span>
    </Button>
  )
}
