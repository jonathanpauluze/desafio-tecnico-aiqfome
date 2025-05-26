'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/ui'
import { TrashIcon } from '@/icons'
import { cn } from '@/lib/utils'

type QuantityInputProps = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  size?: 'sm' | 'md'
  showDelete?: boolean
  className?: string
}

export function QuantityInput({
  value,
  onIncrement,
  onDecrement,
  size = 'md',
  showDelete = false,
  className
}: Readonly<QuantityInputProps>) {
  const isZero = value <= 0
  const isOne = value === 1

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        type="button"
        variant="outline"
        onClick={onDecrement}
        disabled={isZero && !showDelete}
        className={cn('p-0 text-teal-400 border-teal-400 rounded-full', {
          'opacity-50 bg-gray-400 dark:bg-gray-100 text-gray-900 border-gray-100 cursor-not-allowed':
            isZero && !showDelete,
          'border-none': isOne && showDelete,
          'w-8 h-8': size === 'md',
          'w-6 h-6': size === 'sm'
        })}
      >
        {showDelete && value === 1 ? (
          <TrashIcon
            className={cn({
              'w-8 h-8': size === 'md',
              'w-6 h-6': size === 'sm'
            })}
          />
        ) : (
          <MinusIcon className="w-4 h-4" />
        )}
      </Button>

      <span
        className={cn('w-8 text-center font-bold', {
          'text-sm': size === 'sm'
        })}
      >
        {value}
      </span>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onIncrement}
        className={cn('text-teal-400 border-teal-400 rounded-full', {
          'w-8 h-8': size === 'md',
          'w-6 h-6': size === 'sm'
        })}
      >
        <PlusIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}
