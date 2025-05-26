'use client'

import { FieldError, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
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
import { useProductFormSchema } from '@/hooks/useProductFormSchema'
import { getProductFormDefaultValues } from '@/lib/form/productSchemaUtils'
import { formatCurrency } from '@/lib/format'
import z from 'zod'
import { SelectedExtra, useCartStore } from '@/contexts/useCartStore'
import { useMemo } from 'react'
import { QuantityInput } from '@/components/quantity-input'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/restaurant'

type ProductFormProps = {
  product: Product
}

export function ProductForm({ product }: Readonly<ProductFormProps>) {
  const router = useRouter()
  const schema = useProductFormSchema(product.options ?? {})
  const defaultValues = getProductFormDefaultValues(product.options ?? {})
  type FormData = z.infer<typeof schema>

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const values = form.watch()

  const calculatedTotal = useMemo(() => {
    const options = product.options ?? {}
    const valuesQuantity = values.quantity ?? 1
    let basePrice = product.price
    let extrasTotal = 0

    for (const [key, option] of Object.entries(options)) {
      const selected = values[key as keyof typeof values]
      if (!selected) continue

      if (option.type === 'radio') {
        const match = option.choices?.find(
          (choice) => choice.label === selected
        )

        if (match) {
          if (key === 'size') {
            basePrice = match.price
          } else if (match.price) {
            extrasTotal += match.price
          }
        }
      }

      if (option.type === 'checkbox' && Array.isArray(selected)) {
        selected.forEach((id: string) => {
          const match = option.choices?.find((choice) => choice.id === id)

          if (match?.price) {
            extrasTotal += match.price
          }
        })
      }

      if (option.type === 'quantity' && typeof selected === 'object') {
        Object.entries(selected).forEach(([id, quantity]) => {
          const parsedQuantity = Number(quantity)
          const match = option.choices?.find((choice) => choice.id === id)

          if (match?.price && parsedQuantity > 0) {
            extrasTotal += match.price * parsedQuantity
          }
        })
      }
    }

    return (basePrice + extrasTotal) * valuesQuantity
  }, [values, product])

  const onSubmit = (data: FormData) => {
    const quantity = data.quantity ?? 1
    const observation = data.observation
    let basePrice = product.price
    const extras: SelectedExtra[] = []

    const options = product.options ?? {}

    for (const [key, option] of Object.entries(options)) {
      const selected = data[key as keyof FormData]

      if (!selected) continue

      if (option.type === 'radio') {
        const choice = option.choices?.find(
          (choice) => choice.label === selected
        )

        if (!choice) continue

        if (key === 'size') {
          basePrice = choice.price
        } else if (choice.price) {
          extras.push({
            group: option.title,
            label: choice.label,
            price: choice.price
          })
        }
      }

      if (option.type === 'checkbox' && Array.isArray(selected)) {
        selected.forEach((value: string) => {
          const choice = option.choices?.find((choice) => choice.id === value)
          if (choice?.price) {
            extras.push({
              group: option.title,
              label: choice.label,
              price: choice.price
            })
          }
        })
      }

      if (
        option.type === 'quantity' &&
        typeof selected === 'object' &&
        selected !== null
      ) {
        Object.entries(selected as Record<string, number>).forEach(
          ([id, quantity]) => {
            if (typeof quantity !== 'number') return

            const choice = option.choices?.find((c) => c.id === id)
            if (choice && quantity > 0) {
              extras.push({
                group: option.title,
                label: choice.label,
                price: choice.price * quantity
              })
            }
          }
        )
      }
    }

    useCartStore.getState().addItem({
      productId: product.id,
      restaurantId: product.restaurantId,
      name: product.name,
      image: product.image,
      quantity,
      basePrice,
      observation,
      extras
    })

    router.push('/checkout')
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
                <span className="text-xs text-neutral-50 font-bold bg-neutral-700 p-2 rounded-sm">
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
                    <FormItem>
                      {option.choices?.map((choice) => (
                        <div
                          key={choice.id}
                          className="flex items-center gap-2 justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(choice.id)}
                                onCheckedChange={(checked) => {
                                  const valueArray = field.value || []
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
                            <FormLabel>{choice.label}</FormLabel>
                          </div>
                          {choice.price && (
                            <p className="text-sm font-medium text-brand">
                              + {formatCurrency(choice.price)}
                            </p>
                          )}
                        </div>
                      ))}
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

        <button
          type="submit"
          className="bg-brand text-white px-4 py-2 rounded font-bold"
        >
          Ver ticket
        </button>
      </form>
    </Form>
  )
}
