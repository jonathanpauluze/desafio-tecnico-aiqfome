import Image from 'next/image'
import { formatCurrency } from '@/lib/format'
import { type Product } from '@/types'

type ProductInfoProps = {
  product: Product
}

function hasFromPrice(product: Product): boolean {
  const sizeOptions = product.options?.size?.choices

  if (!sizeOptions || sizeOptions.length < 2) return false

  const prices = sizeOptions.map((opt) => opt.price)
  const hasDifferentPrices = new Set(prices).size > 1

  return hasDifferentPrices
}

export async function ProductInfo(props: Readonly<ProductInfoProps>) {
  const { product } = props

  return (
    <div>
      <div className="relative w-full h-[195px]">
        <Image src={product.image} alt="" fill className="object-cover" />
      </div>

      <div className="mt-6 px-6">
        <p className="text-xl font-bold">{product.name}</p>

        <div className="flex items-center gap-2">
          {hasFromPrice(product) && (
            <span className="text-sm font-extrabold">a partir de</span>
          )}
          <p className="text-lg text-brand font-extrabold">
            {formatCurrency(product.price)}
          </p>
        </div>

        <p className="text-neutral-500 font-semibold">{product.description}</p>
      </div>
    </div>
  )
}
