import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'ömerfaruk.dev',
  description: 'Frontend geliştirici portfolyosu',
}

const inter = Inter({ subsets: ['latin'] })

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

