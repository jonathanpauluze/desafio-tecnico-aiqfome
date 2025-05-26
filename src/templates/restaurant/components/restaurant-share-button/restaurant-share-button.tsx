'use client'

import { Button } from '@/components/ui'
import { ShareIcon } from '@/icons'
import { useShareRestaurant } from '@/hooks/useShareRestaurant'

type RestaurantShareProps = {
  restaurantName: string
}

export function RestaurantShareButton(props: Readonly<RestaurantShareProps>) {
  const { restaurantName } = props

  const share = useShareRestaurant()

  return (
    <Button variant="ghost" size="icon" onClick={() => share(restaurantName)}>
      <ShareIcon className="text-brand" />
      <span className="sr-only">Compartilhar</span>
    </Button>
  )
}
