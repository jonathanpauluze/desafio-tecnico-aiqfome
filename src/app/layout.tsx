import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Layout from '@/components/layout/layout'
import './globals.css'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Aiqfome',
  description: 'O melhor app de delivery da sua cidade e região'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
