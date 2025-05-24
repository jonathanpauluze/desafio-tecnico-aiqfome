import Image from 'next/image'
import { MotocycleIcon, GhostDeliveryIcon, StarIcon } from '@/icons'
import { RestaurantLink } from '../restaurant-link'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

export type RestaurantCardProps = {
  id: number
  image: string
  name: string
  delivery_fee: number
  rating: number
  is_closed: boolean
}

export async function RestaurantCard(props: Readonly<RestaurantCardProps>) {
  const { id, image, name, delivery_fee, rating, is_closed } = props
  const isFreeDelivery = delivery_fee === 0

  const content = (
    <>
      <Image
        src={image}
        alt={`Imagem do restaurante ${name}`}
        width={72}
        height={72}
        className="w-[72px] h-[72px] object-cover bg-white"
      />

      <div className="flex flex-col">
        <p className="font-bold">{name}</p>

        <div className="flex gap-1 items-center">
          <div className="flex gap-[2px] items-center">
            {isFreeDelivery ? (
              <MotocycleIcon className="text-teal-600" />
            ) : (
              <GhostDeliveryIcon className="text-brand" />
            )}
            <p
              className={cn(
                'text-sm font-bold',
                isFreeDelivery ? 'text-teal-600' : 'text-brand'
              )}
            >
              {isFreeDelivery ? 'grátis' : formatCurrency(delivery_fee)}
            </p>
          </div>

          <div className="flex gap-[2px] items-center">
            <StarIcon className="text-yellow-500" />
            <p className="text-sm font-bold text-neutral-500">{rating}</p>
          </div>
        </div>
      </div>
    </>
  )

  const baseClasses =
    'flex h-[72px] items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-hidden'

  return is_closed ? (
    <button
      className={cn(
        baseClasses,
        'opacity-50 cursor-not-allowed text-left w-full'
      )}
      aria-disabled="true"
      disabled
    >
      {content}
    </button>
  ) : (
    <RestaurantLink id={id} name={name}>
      {content}
    </RestaurantLink>
  )
}
