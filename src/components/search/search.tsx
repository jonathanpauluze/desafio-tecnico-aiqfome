'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from '@/icons'
import { Input } from '@/ui'
import { cn } from '@/lib/utils'

export function Search() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') ?? ''
  const hasQuery = !!searchParams?.has('q')

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      if (query.trim()) {
        router.push(`/?q=${encodeURIComponent(query)}`)
      }
    },
    [query, router]
  )

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (!newQuery.trim()) {
        router.push('/')
      } else {
        router.push(`/?q=${encodeURIComponent(newQuery)}`, { scroll: false })
      }
    }, 500)
  }

  useEffect(() => {
    if (hasQuery) {
      inputRef.current?.focus()
    }
  }, [hasQuery])

  return (
    <form onSubmit={handleSearch} className="relative">
      <SearchIcon
        className={cn(
          'text-gray-400 pointer-events-none absolute left-2 top-1/2 transform -translate-y-1/2',
          hasQuery ? 'text-brand' : ''
        )}
      />

      <Input
        className="pl-10"
        placeholder="Busque pela loja ou culinária"
        ref={inputRef}
        defaultValue={query}
        onChange={handleQueryChange}
      />
    </form>
  )
}
