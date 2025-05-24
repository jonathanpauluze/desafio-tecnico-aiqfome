'use client'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()

  const isCheckoutPage = pathname === '/checkout'

  if (isCheckoutPage) return null

  return (
    <footer className="flex justify-center items-center flex-col gap-2 py-6 px-4 bg-neutral-100  dark:bg-gray-800">
      <p className="text-sm text-center font-bold text-purple-700">
        feito com 💜 em maringá-PR
      </p>

      <p className="text-center font-bold text-purple-700">
        aiqfome.com © 2007-2023 aiqfome LTDA . CNPJ: 09.186.786/0001-58
      </p>
    </footer>
  )
}
