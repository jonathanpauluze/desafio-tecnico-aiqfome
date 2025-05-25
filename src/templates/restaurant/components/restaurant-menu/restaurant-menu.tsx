import { Fragment, JSX } from 'react'
import Link from 'next/link'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/ui'
import { MoneyCircleIcon, PepperFireIcon, PlantIcon } from '@/icons'
import { getMenuByRestaurantId } from '@/lib/menu'
import { cn } from '@/lib/utils'
import { ProductBadge } from '@/types'

type RestaurantMenuProps = {
  restaurantId: string
}

const iconByBadge: Record<ProductBadge, JSX.Element> = {
  [ProductBadge.SPICY]: <PepperFireIcon className="text-teal-400" />,
  [ProductBadge.VEGAN]: <PlantIcon className="text-teal-400" />
}

export async function RestaurantMenu(props: Readonly<RestaurantMenuProps>) {
  const { restaurantId } = props

  const menu = await getMenuByRestaurantId(restaurantId)

  return (
    <Accordion type="multiple" className="w-full">
      {menu.map((section) => (
        <div key={section.categoryId}>
          <AccordionItem
            value={section.categoryId}
            className="py-3 border-b-4 border-neutral-100 dark:border-gray-800"
          >
            <AccordionTrigger className="px-6 !no-underline">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <strong className="text-lg font-bold">
                    {section.categoryName}
                  </strong>

                  {section.hasPromo && (
                    <MoneyCircleIcon className="text-emerald-500" />
                  )}
                </div>

                {section.categoryDescription ? (
                  <p className="text-xs text-neutral-500 font-semibold">
                    {section.categoryDescription}
                  </p>
                ) : null}
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-6">
              {section.products.length === 0 && (
                <p className="pl-6 text-sm text-neutral-400">
                  Nenhum produto encontrado nesta categoria.
                </p>
              )}

              <div className="flex flex-col gap-6">
                {section.products.map((product) => (
                  <Link
                    href={`/restaurant/${restaurantId}/product/${product.id}`}
                    key={product.id}
                    className="flex gap-3 pl-6"
                  >
                    <div className="flex-1 flex justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex gap-1 items-center">
                          <h3 className="font-bold">{product.name}</h3>
                          {product.badges?.map((badge) => (
                            <Fragment key={badge}>
                              {iconByBadge[badge]}
                            </Fragment>
                          ))}
                        </div>

                        <p className="text-sm text-neutral-500 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex flex-col">
                        {product?.hasFrom ? (
                          <span className="text-xs text-neutral-500 font-bold">
                            a partir de
                          </span>
                        ) : null}

                        {product?.formattedOriginalPrice ? (
                          <span className="text-xs text-neutral-500 font-bold self-end line-through">
                            {product.formattedPrice}
                          </span>
                        ) : null}

                        <span
                          className={cn(
                            'flex items-center gap-1 font-bold',
                            product?.formattedOriginalPrice
                              ? 'text-green-500'
                              : 'text-brand'
                          )}
                        >
                          {product?.formattedOriginalPrice ? (
                            <MoneyCircleIcon className="w-4 h-4 text-green-500" />
                          ) : null}

                          {product.formattedPrice}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  )
}
