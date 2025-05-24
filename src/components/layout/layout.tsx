import { Header } from './header'
import { Footer } from './footer'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="grid font-[family-name:var(--font-nunito)]">
      <Header />

      <main className="w-full">{children}</main>

      <Footer />
    </div>
  )
}
