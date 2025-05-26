import { Header } from './header'
import { Footer } from './footer'
import { Toaster } from '@/ui'

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="grid font-[family-name:var(--font-nunito)]">
      <Header />

      <main className="w-full">{children}</main>

      <Toaster />

      <Footer />
    </div>
  )
}
