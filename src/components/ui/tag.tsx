import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tagVariants = cva(
  'inline-flex items-center rounded-sm px-3 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border'
      },
      type: {
        info: '',
        danger: '',
        neutral: '',
        success: ''
      }
    },
    compoundVariants: [
      {
        variant: 'solid',
        type: 'info',
        className:
          'bg-teal-100 text-teal-700 dark:bg-teal-700 dark:text-teal-100'
      },
      {
        variant: 'solid',
        type: 'danger',
        className: 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100'
      },
      {
        variant: 'solid',
        type: 'neutral',
        className:
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100'
      },
      {
        variant: 'solid',
        type: 'success',
        className:
          'bg-emerald-100 text-emerald-700-700 dark:bg-emerald-700 dark:text-emerald-100'
      },
      {
        variant: 'outline',
        type: 'info',
        className:
          'text-teal-600 border-teal-600 dark:text-teal-100 dark:border-teal-100'
      },
      {
        variant: 'outline',
        type: 'danger',
        className:
          'text-red-600 border-red-600 dark:text-red-100 dark:border-red-100'
      },
      {
        variant: 'outline',
        type: 'neutral',
        className:
          'text-gray-600 border-gray-600 dark:text-gray-100 dark:border-gray-100'
      },
      {
        variant: 'outline',
        type: 'success',
        className:
          'text-emerald-600 border-emerald-600 dark:text-emerald-100 dark:border-emerald-100'
      }
    ],
    defaultVariants: {
      variant: 'solid',
      type: 'info'
    }
  }
)

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, type }), className)}
        {...props}
      />
    )
  }
)
Tag.displayName = 'Tag'

export { Tag, tagVariants }
