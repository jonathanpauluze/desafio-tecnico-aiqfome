'use client'

import { Button } from '@/ui'
import { AlertTriangle } from 'lucide-react'

type ErrorBoundaryProps = {
  error: Error
  reset: () => void
}

export default function ErrorBoundary(props: Readonly<ErrorBoundaryProps>) {
  const { error, reset } = props

  return (
    <div>
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="relative inline-block mb-6">
            <AlertTriangle
              size={64}
              className="text-gray-300 dark:text-gray-700 mx-auto"
            />

            <div className="absolute h-1 w-16 bg-red-500 -rotate-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80" />
          </div>

          <h2 className="text-heading-xl text-gray-700 dark:text-white font-sans mb-2">
            Oops! Algo deu errado!
          </h2>

          {error?.message && (
            <p className="text-gray-500 dark:text-gray-500 mb-2 px-4 text-body-md overflow-hidden text-ellipsis max-h-24">
              {error?.message}
            </p>
          )}

          <Button onClick={reset} className="mt-4">
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  )
}
