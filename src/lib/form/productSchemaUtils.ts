import { z, ZodTypeAny } from 'zod'
import { type ProductOption } from '@/types/restaurant'

export function buildProductFieldValidation(option: ProductOption): ZodTypeAny {
  switch (option.type) {
    case 'number': {
      const field = z.number().min(1, 'Obrigatório')
      return option.required ? field : field.optional()
    }

    case 'radio': {
      const field = z
        .string({
          required_error: 'Selecione uma opção',
          invalid_type_error: 'Selecione uma opção'
        })
        .min(1, 'Selecione uma opção')

      return option.required ? field : field.optional()
    }

    case 'checkbox': {
      let field = z.array(z.string())

      if (option.min) {
        field = field.min(option.min, `Selecione pelo menos ${option.min}`)
      }

      if (option.max) {
        field = field.max(option.max, `Selecione no máximo ${option.max}`)
      }

      return option.required ? field : field.optional()
    }

    case 'quantity': {
      const field = z.record(z.number())
      return option.required ? field : field.optional()
    }

    default:
      return z.any()
  }
}

export function getProductFormDefaultValues(
  options: Record<string, ProductOption>
) {
  const defaults: Record<string, unknown> = {}

  for (const [key, opt] of Object.entries(options)) {
    switch (opt.type) {
      case 'number':
        defaults[key] = 0
        break

      case 'radio':
        defaults[key] = ''
        break

      case 'checkbox':
        defaults[key] = []
        break

      case 'quantity':
        defaults[key] = opt.choices?.reduce((acc, choice) => {
          acc[choice.id] = 0
          return acc
        }, {} as Record<string, number>)
        break
    }
  }

  defaults['quantity'] = 0
  defaults['observation'] = ''

  return defaults
}

export function calculateProductOptionsTotal(
  options: Record<string, ProductOption>,
  data: Record<string, unknown>
): number {
  let total = 0

  for (const [key, selected] of Object.entries(data)) {
    if (key === 'observation') continue

    const option = options[key]
    if (!option) continue

    switch (option.type) {
      case 'radio': {
        const choice = option.choices?.find(
          (c) => c.label === selected || c.id === selected
        )
        if (choice?.price) total += choice.price
        break
      }

      case 'checkbox': {
        const ids: string[] = Array.isArray(selected) ? selected : []
        for (const id of ids) {
          const found = option.choices?.find((c) => c.id === id)
          if (found?.price) total += found.price
        }
        break
      }

      case 'quantity': {
        for (const [id, qty] of Object.entries(selected ?? {})) {
          const found = option.choices?.find((c) => c.id === id)
          if (found?.price && typeof qty === 'number') {
            total += found.price * qty
          }
        }
        break
      }
    }
  }

  return total
}
