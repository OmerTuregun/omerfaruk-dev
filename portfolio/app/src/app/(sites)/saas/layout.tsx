import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Datawise — Kurumsal Analitik Platformu',
  description: 'Verilerinizi anlık takip edin, doğru kararlar alın.',
}

export default function SaasLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body
        className={inter.className}
        style={{
          background: '#ffffff',
          margin: 0,
          padding: 0,
          fontFamily: inter.style.fontFamily,
        }}
      >
        {children}
      </body>
    </html>
  )
}
