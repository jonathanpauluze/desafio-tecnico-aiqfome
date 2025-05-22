import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
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
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>{children}</body>
    </html>
  )
}
