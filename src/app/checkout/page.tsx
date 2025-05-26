'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/contexts/use-cart-store'
import { Button } from '@/ui'
import { PencilIcon } from '@/icons'
import { QuantityInput } from '@/components/quantity-input'
import { groupExtrasByGroup } from '@/lib/cart/cart-utils'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Fragment } from 'react'

export default function Checkout() {
  const router = useRouter()
  const { items, total, restaurant, updateItemQuantity, removeItem } =
    useCartStore()

  const isCartEmpty = items?.length === 0

  if (!restaurant) return null

  return (
    <div className="min-h-[calc(100vh-204px)] lg:min-h-[calc(100vh-180px)] pb-[84px]">
      <Link
        href={`/restaurant/${restaurant.id}`}
        className="mt-6 px-4 flex items-center gap-2"
      >
        <Image
          src={restaurant.image}
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-sm bg-white object-cover"
        />

        <div className="flex flex-col gap-1">
          <span className="text-sm text-neutral-500 font-bold">
            seus itens em
          </span>
          <strong className="font-bold">{restaurant.name}</strong>
        </div>
      </Link>

      {isCartEmpty ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-sm text-neutral-500 font-bold mt-6">
            Seu carrinho está vazio
          </p>
          <p className="text-center text-sm text-neutral-400">
            Adicione itens ao seu carrinho para continuar
          </p>
          <Button onClick={() => router.push(`/restaurant/${restaurant.id}`)}>
            Ver cardápio
          </Button>
        </div>
      ) : (
        <Fragment>
          {items?.map((item, index) => {
            const groupedExtras = groupExtrasByGroup(item.extras)
            const isLastItem = index === items.length - 1

            return (
              <div
                key={item.id}
                className={cn(
                  'flex flex-col gap-1 p-4 pb-[calc(1rem + 4px)] border-b-4 border-neutral-100 dark:border-gray-800',
                  {
                    'border-b-0': isLastItem
                  }
                )}
              >
                <div className="flex gap-3 justify-between items-center">
                  <p className="text-sm font-bold">{item.name}</p>

                  <span className="text-sm text-brand font-bold">
                    {formatCurrency(item.basePrice)}
                  </span>
                </div>

                <div className="self-end flex items-center gap-6">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm text-teal-400 font-bold"
                    onClick={() =>
                      router.push(
                        `/restaurant/${item.restaurantId}/product/${item.productId}?edit=${item.id}`
                      )
                    }
                  >
                    <PencilIcon className="w-6 h-6" />
                    editar
                  </Button>

                  <QuantityInput
                    size="sm"
                    value={item.quantity}
                    onIncrement={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                    onDecrement={() => {
                      const newQuantity = item.quantity - 1

                      if (newQuantity > 0) {
                        updateItemQuantity(item.id, item.quantity - 1)
                      } else {
                        removeItem(item.id)
                      }
                    }}
                    showDelete
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {typeof item.options.size === 'string' ? (
                    <div className="flex flex-col gap-[2px]">
                      <p className="flex items-center gap-1 text-xs text-neutral-400 before:text-neutral-400 before:content-['•'] font-bold">
                        tamanho
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-neutral-400 font-semibold">
                          {item.options.size}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {Object.entries(groupedExtras).map(([groupName, extras]) => (
                    <div key={groupName} className="flex flex-col gap-[2px]">
                      <p className="flex items-center gap-1 text-xs text-neutral-400 before:text-neutral-400 before:content-['•'] font-bold">
                        {groupName}
                      </p>
                      {extras.map((extra) => (
                        <div
                          key={extra.label}
                          className="flex items-center gap-3 "
                        >
                          <span className="text-xs text-neutral-400 font-semibold">
                            {extra.label}
                          </span>

                          {extra.price > 0 ? (
                            <span className="text-xs text-teal-400 font-semibold">
                              +{formatCurrency(extra.price)}
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ))}

                  {item.observation ? (
                    <div className="bg-neutral-50 dark:bg-gray-700 p-2 rounded-sm">
                      <p className="flex items-center gap-1 text-xs text-neutral-700 dark:text-neutral-400 font-semibold">
                        <span className="font-bold">observação:</span>{' '}
                        {item.observation}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </Fragment>
      )}

      {!isCartEmpty ? (
        <div className="fixed bottom-0 left-0 right-0 flex lg:justify-end items-center gap-6 shadow-sm py-4 px-8 bg-white dark:bg-slate-800">
          <div>
            <span className="text-sm font-bold">Subtotal</span>
            <p className="text-xl text-brand font-extrabold">
              {formatCurrency(total)}
            </p>
          </div>

          <Button className="w-full h-full lg:w-fit">Ir para pagamento</Button>
        </div>
      ) : null}
    </div>
  )
}
