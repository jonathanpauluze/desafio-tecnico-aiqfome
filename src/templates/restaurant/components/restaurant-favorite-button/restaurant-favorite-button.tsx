'use client'

import { Button } from '@/components/ui'
import { HeartFilledIcon, HeartIcon } from '@/icons'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useFavoriteRestaurants } from '@/hooks/useFavoriteRestaurants'

type FavoriteButtonProps = {
  id: string
}

export function RestaurantFavoriteButton(props: Readonly<FavoriteButtonProps>) {
  const { id } = props

  const isMounted = useIsMounted()
  const { isFavorite, toggleFavorite } = useFavoriteRestaurants()

  let icon = null

  if (isMounted) {
    icon = isFavorite(id) ? <HeartFilledIcon /> : <HeartIcon />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => toggleFavorite(id)}
      className="text-brand"
    >
      {icon}
    </Button>
  )
}
