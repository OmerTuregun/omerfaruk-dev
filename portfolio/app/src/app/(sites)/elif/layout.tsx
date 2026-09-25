import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Elif Şahin — Fotoğrafçı',
  description: 'İstanbul merkezli düğün, portre ve ticari fotoğrafçı.',
}

export default function ElifLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${playfair.variable} ${inter.variable}`}
        style={{ background: '#fafaf8', margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  )
}
