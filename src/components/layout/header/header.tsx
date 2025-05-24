'use client'
import { usePathname, useRouter } from 'next/navigation'
import { LogoIcon, LocationIcon, ChevronRightIcon, UserIcon } from '@/icons'
import { Button } from '@/ui'
import { Search } from '@/components/search'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  return (
    <header className="bg-brand p-4 flex flex-col gap-4">
      <div className="flex gap-6 justify-between items-center">
        <Button variant="unstyled" size="icon" onClick={() => router.push('/')}>
          <LogoIcon width={32} height={32} />
        </Button>

        <div className="flex-1 flex gap-2 items-center">
          <LocationIcon className="text-white min-w-6 min-h-6" />

          <div className="max-w-sm">
            <p className="text-purple-200">entregando em</p>
            <button className="flex items-center gap-1 text-white h-auto p-0 w-full">
              <span className="text-base text-white line-clamp-1 w-full text-left overflow-hidden">
                Rua Mandaguari, 198
              </span>
              <ChevronRightIcon className="text-white w-4 h-4 flex-shrink-0" />
            </button>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <UserIcon className="text-white w-6 h-6" />
        </Button>
      </div>

      {isHomePage ? <Search /> : null}
    </header>
  )
}
