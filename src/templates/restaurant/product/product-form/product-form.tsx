'use client'

import { FieldError, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { nanoid } from 'nanoid'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Textarea,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  RadioGroup,
  RadioGroupItem
} from '@/ui'
import { MoneyCircleIcon } from '@/icons'
import { useProductFormSchema } from '@/hooks/use-product-form-schema'
import { getProductFormDefaultValues } from '@/lib/form/product-schema-utils'
import { formatCurrency } from '@/lib/format'
import z from 'zod'
import {
  CartItem,
  SelectedExtra,
  useCartStore
} from '@/contexts/use-cart-store'
import { useMemo, useState } from 'react'
import { QuantityInput } from '@/components/quantity-input'
import { cn } from '@/lib/utils'
import { type Restaurant, type Product } from '@/types/restaurant'
import { RestaurantConflictDialog } from '../../components/restaurant-conflict-dialog'
import {
  getCheckboxExtras,
  getQuantityExtras,
  getRadioPrice
} from '@/lib/form/price-utils'

type ProductFormProps = {
  restaurant: Restaurant
  product: Product
}

export function ProductForm(props: Readonly<ProductFormProps>) {
  const { restaurant, product } = props

  const [showDialog, setShowDialog] = useState(false)
  const [pendingItem, setPendingItem] = useState<Omit<
    CartItem,
    'totalPrice'
  > | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const schema = useProductFormSchema(product.options ?? {})
  const cart = useCartStore()

  const editId = searchParams.get('edit')

  const itemToEdit = cart.items.find((item) => item.id === editId)

  const defaultValues = itemToEdit
    ? {
        ...itemToEdit.options,
        quantity: itemToEdit.quantity,
        observation: itemToEdit.observation
      }
    : getProductFormDefaultValues(product.options ?? {})

  type FormData = z.infer<typeof schema>

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const values = form.watch()

  const calculatedTotal = useMemo(() => {
    const options = product.options ?? {}
    const quantity = values.quantity ?? 1
    let basePrice = product.price
    let extrasTotal = 0

    const updateBasePrice = (price: number) => {
      basePrice = price
    }

    for (const [key, option] of Object.entries(options)) {
      const selected = values[key as keyof typeof values]
      if (!selected) continue

      if (option.type === 'radio' && typeof selected === 'string') {
        const result = getRadioPrice(key, selected, option, updateBasePrice)

        extrasTotal += result.price
      }

      if (option.type === 'checkbox' && Array.isArray(selected)) {
        const extras = getCheckboxExtras(selected, option)
        extrasTotal += extras.reduce((sum, extra) => sum + extra.price, 0)
      }

      if (option.type === 'quantity' && typeof selected === 'object') {
        const extras = getQuantityExtras(selected, option)
        extrasTotal += extras.reduce((sum, extra) => sum + extra.price, 0)
      }
    }

    return (basePrice + extrasTotal) * quantity
  }, [values, product])

  const onSubmit = (data: FormData) => {
    const quantity = data.quantity ?? 1
    const observation = data.observation
    let basePrice = product.price
    let extras: SelectedExtra[] = []

    const updateBasePrice = (price: number) => {
      basePrice = price
    }

    const options = product.options ?? {}

    for (const [key, option] of Object.entries(options)) {
      const selected = data[key as keyof FormData]
      if (!selected) continue

      if (option.type === 'radio' && typeof selected === 'string') {
        const result = getRadioPrice(key, selected, option, updateBasePrice)
        if (result.extra) extras.push(result.extra)
      }

      if (option.type === 'checkbox' && Array.isArray(selected)) {
        extras = extras.concat(getCheckboxExtras(selected, option))
      }

      if (
        option.type === 'quantity' &&
        typeof selected === 'object' &&
        selected !== null
      ) {
        extras = extras.concat(getQuantityExtras(selected, option))
      }
    }

    const cartItem = {
      id: editId ?? nanoid(),
      productId: product.id,
      restaurantId: product.restaurantId,
      name: product.name,
      image: product.image,
      quantity,
      basePrice,
      observation,
      extras,
      options: data
    }

    if (cart.isDifferentRestaurant(cartItem.restaurantId)) {
      setPendingItem(cartItem)
      setShowDialog(true)
    } else {
      if (editId) {
        cart.updateItem(editId, cartItem)
      } else {
        cart.addItem(cartItem)
        cart.setRestaurant(restaurant)
      }

      router.push('/checkout')
    }
  }

  const sortedOptions = Object.entries(product.options ?? []).sort(
    ([, a], [, b]) => {
      return (a.position ?? 0) - (b.position ?? 0)
    }
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-6"
      >
        <div className="flex items-center gap-2 pb-4 border-b-4 border-neutral-100 dark:border-gray-800">
          <div className="px-6 w-full flex justify-between gap-4">
            <div>
              <label htmlFor="quantity" className="font-bold">
                quantos?
              </label>
              <p className="text-sm font-semibold">
                total{' '}
                <span className="text-base   font-bold">
                  {formatCurrency(calculatedTotal)}
                </span>
              </p>

              {form.formState.errors.quantity && (
                <p className="text-xs text-red-500">
                  {(form.formState.errors.quantity as FieldError)?.message}
                </p>
              )}
            </div>

            {values?.quantity === 0 ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => form.setValue('quantity', 1)}
              >
                Adicionar
              </Button>
            ) : (
              <QuantityInput
                value={values.quantity}
                onIncrement={() =>
                  form.setValue('quantity', values.quantity + 1)
                }
                onDecrement={() =>
                  form.setValue('quantity', values.quantity - 1)
                }
                showDelete
              />
            )}
          </div>
        </div>

        {sortedOptions.map(([key, option]) => (
          <div
            key={key}
            className="flex flex-col gap-1 pb-5 border-b-4 border-neutral-100 dark:border-gray-800"
          >
            <div className="flex justify-between gap-4 px-6 mb-4">
              <div>
                <label className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
                  {option.title}
                </label>
              </div>

              {option.required ? (
                <span className="text-xs text-neutral-50 font-bold bg-neutral-700 p-2 rounded-sm self-start">
                  obrigatório
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 px-6">
              {option.type === 'radio' && (
                <FormField
                  key={key}
                  control={form.control}
                  name={key}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col gap-2"
                        >
                          {option.choices?.map((choice) => (
                            <FormItem
                              key={choice.label}
                              className="flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <FormControl>
                                  <RadioGroupItem value={choice.label} />
                                </FormControl>

                                <FormLabel className="font-normal flex items-center gap-1">
                                  {choice.original_price ? (
                                    <MoneyCircleIcon className="text-green-500" />
                                  ) : null}
                                  {choice.label}
                                </FormLabel>
                              </div>

                              {choice.price ? (
                                <p className="flex items-center gap-1 text-sm font-bold">
                                  {choice.original_price ? (
                                    <span className="text-xs text-gray-500 font-bold line-through">
                                      {formatCurrency(choice.original_price)}
                                    </span>
                                  ) : null}
                                  <span
                                    className={cn({
                                      'text-green-500': choice.original_price,
                                      'text-brand': !choice.original_price
                                    })}
                                  >
                                    {formatCurrency(choice.price)}
                                  </span>
                                </p>
                              ) : null}
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {option.type === 'checkbox' && (
                <FormField
                  key={key}
                  control={form.control}
                  name={key}
                  render={({ field }) => (
                    <FormItem key={key}>
                      {option.choices?.map((choice) => {
                        const checkboxId = `${key}-${choice.id}`

                        return (
                          <div
                            key={choice.id}
                            className="flex items-center gap-2 justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  id={checkboxId}
                                  checked={field.value?.includes(choice.id)}
                                  onCheckedChange={(checked) => {
                                    const valueArray = field.value ?? []
                                    if (checked) {
                                      field.onChange([...valueArray, choice.id])
                                    } else {
                                      field.onChange(
                                        valueArray.filter(
                                          (v: string) => v !== choice.id
                                        )
                                      )
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel htmlFor={checkboxId}>
                                {choice.label}
                              </FormLabel>
                            </div>

                            {choice.price ? (
                              <p className="text-sm font-medium text-brand">
                                + {formatCurrency(choice.price)}
                              </p>
                            ) : null}
                          </div>
                        )
                      })}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {option.type === 'quantity' &&
                option.choices?.map((choice) => (
                  <div
                    key={choice.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <QuantityInput
                        value={values[key][choice.id]}
                        onIncrement={() =>
                          form.setValue(
                            `${key}.${choice.id}`,
                            values[key][choice.id] + 1
                          )
                        }
                        onDecrement={() =>
                          form.setValue(
                            `${key}.${choice.id}`,
                            values[key][choice.id] - 1
                          )
                        }
                      />

                      <label className="text-sm text-neutral-700 font-semibold text-neutral-500 dark:text-neutral-200">
                        {choice.label}
                      </label>
                    </div>

                    <p className="text-sm text-brand font-bold">
                      + {formatCurrency(choice.price)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}

        <div className="px-6 pt-4 pb-6">
          <Textarea
            className="w-full border rounded p-2 text-sm placeholder:whitespace-pre-wrap px-6"
            rows={2}
            placeholder="alguma observação do item? • opcional &#10; ex: tirar algum ingrediente, ponto do prato"
            {...form.register('observation')}
          />
        </div>

        {values.quantity > 0 ? (
          <div className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-[linear-gradient(to_top,_#ffffff_0%,_#fefefe_20%,_#fefefe_20%,_#f6f8fa_90%)] dark:bg-[linear-gradient(to_top,_#111827_0%,_#1f2937_20%,_#1f2937_20%,_#374151_90%)]">
            <Button
              type="submit"
              className="w-full h-12 bg-brand text-white px-4 py-2 rounded font-bold"
            >
              Ver ticket
            </Button>
          </div>
        ) : null}
      </form>

      <RestaurantConflictDialog
        open={showDialog}
        onOpenChange={(open) => setShowDialog(open)}
        onCancel={() => setShowDialog(false)}
        onConfirm={() => {
          if (pendingItem) {
            const cart = useCartStore.getState()
            cart.clearCart()
            cart.setRestaurant(restaurant)
            cart.addItem(pendingItem)

            router.push('/checkout')
          }
        }}
      />
    </Form>
  )
}
