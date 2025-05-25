import Image from 'next/image'
import { Button, Tag } from '@/ui'
import { ShareIcon, ChevronRightIcon, MotocycleIcon, StarIcon } from '@/icons'
import { RestaurantFavoriteButton } from '@/templates/restaurant/components/restaurant-favorite-button'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'
import { type Restaurant } from '@/types'

type RestaurantInfoProps = {
  restaurant: Restaurant
}

export async function RestaurantInfo(props: Readonly<RestaurantInfoProps>) {
  const { restaurant } = props

  const isFreeDelivery = restaurant.delivery_fee === 0

  return (
    <div className="py-6 px-4">
      <div className="flex items-center gap-2">
        <Image
          src={restaurant.image}
          alt=""
          width={36}
          height={36}
          className="rounded-sm"
        />
        <h3 className="text-xl font-extrabold">{restaurant.name}</h3>
      </div>

      <div className="flex gap-4 justify-between my-2">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <ShareIcon className="text-brand" />
          </Button>

          <RestaurantFavoriteButton id={restaurant.id} />
        </div>

        <Button
          variant="unstyled"
          className="group flex items-center gap-1 p-0"
        >
          <span className="text-xs font-bold text-teal-400 group-hover:text-teal-500">
            mais infos
          </span>

          <ChevronRightIcon className="w-2 h-2 text-teal-400 group-hover:text-teal-500" />
        </Button>
      </div>

      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <MotocycleIcon
              className={cn(isFreeDelivery ? 'text-teal-600' : 'text-brand')}
            />

            <p
              className={cn(
                'text-sm font-bold',
                isFreeDelivery ? 'text-teal-600' : 'text-brand'
              )}
            >
              {formatCurrency(restaurant.delivery_fee)}
            </p>

            <ChevronRightIcon
              className={cn(
                'w-2 h-2',
                isFreeDelivery ? 'text-teal-600' : 'text-brand'
              )}
            />
          </div>

          <p className="flex items-center gap-2 text-xs font-bold text-neutral-500 before:text-neutral-400 before:content-['•']">
            hoje, {restaurant.delivery_time_min} min
          </p>

          <p className="flex items-center gap-2 text-xs font-bold text-neutral-500 before:text-neutral-400 before:content-['•']">
            {restaurant.distance_km}km
          </p>
        </div>

        {restaurant.free_delivery_over ? (
          <Tag>entrega grátis acima de R$ 35,00</Tag>
        ) : null}

        <div className="flex items-center gap-2">
          <StarIcon className="w-4 h-4 text-yellow-500" />

          <span className="text-sm font-bold text-neutral-500">
            {restaurant.rating} de 5
          </span>

          <ChevronRightIcon className="w-2 h-2 text-neutral-500" />

          <p className="flex items-center gap-2 text-xs text-green-500 font-bold  before:text-neutral-400 before:content-['•']">
            fecha às {restaurant.closes_at}
          </p>
        </div>

        {restaurant.min_order ? (
          <p className="text-xs text-neutral-500 font-bold">
            pedido mínimo: {formatCurrency(restaurant.min_order)}
          </p>
        ) : null}
      </div>
    </div>
  )
}
