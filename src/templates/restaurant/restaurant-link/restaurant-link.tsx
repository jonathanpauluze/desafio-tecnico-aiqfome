'use client'

import Link from 'next/link'

type RestaurantLinkProps = {
  id: number
  name: string
  children: React.ReactNode
}

export function RestaurantLink(props: Readonly<RestaurantLinkProps>) {
  const { id, name, children } = props

  return (
    <Link
      href={`/restaurant/${id}`}
      className="flex h-[72px] items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-hidden"
      aria-label={`Ver detalhes do restaurante ${name}`}
    >
      {children}
    </Link>
  )
}
