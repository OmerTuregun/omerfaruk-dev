import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter-spor',
})

export const metadata: Metadata = {
  title: 'Mert Kaya Performance — Kişisel Antrenörlük',
  description:
    'Profesyonel kişisel antrenörlük, online koçluk ve performans programları. Daha güçlü, daha hızlı, daha iyi.',
}

export default function SporLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${bebasNeue.variable} ${inter.variable}`}
        style={{
          background: '#080808',
          color: '#ffffff',
          fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  )
}
