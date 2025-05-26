import { useMemo } from 'react'
import { z, ZodTypeAny } from 'zod'
import { buildProductFieldValidation } from '@/lib/form/product-schema-utils'
import type { ProductOptions } from '@/types/restaurant'

export function useProductFormSchema(options: ProductOptions) {
  return useMemo(() => {
    const schemaShape: Record<string, ZodTypeAny> = {}

    for (const [key, option] of Object.entries(options)) {
      schemaShape[key] = buildProductFieldValidation(option)
    }

    schemaShape['quantity'] = z.number().min(1, 'Selecione a quantidade')
    schemaShape['observation'] = z.string().optional()

    return z.object(schemaShape)
  }, [options])
}
