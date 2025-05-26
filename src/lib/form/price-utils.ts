import { ProductOption } from '@/types'
import { SelectedExtra } from '@/contexts/useCartStore'

export function getRadioPrice(
  key: string,
  selected: string,
  option: ProductOption,
  updateBasePrice: (price: number) => void
): { price: number; extra?: SelectedExtra } {
  const match = option.choices?.find((choice) => choice.label === selected)
  if (!match) return { price: 0 }
  if (key === 'size') {
    updateBasePrice(match.price)
    return { price: 0 }
  }
  return {
    price: match.price ?? 0,
    extra: {
      group: option.title,
      label: match.label,
      price: match.price ?? 0
    }
  }
}

export function getCheckboxExtras(
  selected: string[],
  option: ProductOption
): SelectedExtra[] {
  return selected.reduce<SelectedExtra[]>((acc, id) => {
    const match = option.choices?.find((choice) => choice.id === id)

    if (match?.price) {
      acc.push({
        group: option.title,
        label: match.label,
        price: match.price
      })
    }

    return acc
  }, [])
}

export function getQuantityExtras(
  selected: Record<string, number>,
  option: ProductOption
): SelectedExtra[] {
  return Object.entries(selected).reduce<SelectedExtra[]>(
    (acc, [id, quantity]) => {
      const match = option.choices?.find((c) => c.id === id)
      if (match && quantity > 0) {
        acc.push({
          group: option.title,
          label: match.label,
          price: (match.price ?? 0) * quantity
        })
      }
      return acc
    },
    []
  )
}
