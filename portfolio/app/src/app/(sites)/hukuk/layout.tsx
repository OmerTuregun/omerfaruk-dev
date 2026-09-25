import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-hukuk',
})

export const metadata: Metadata = {
  title: 'Çelik & Doğan Hukuk Bürosu',
  description:
    'Tam servis hukuk bürosu. Ticaret, gayrimenkul, iş ve ceza hukuku alanlarında kurumsal danışmanlık.',
}

export default function HukukLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${libreBaskerville.variable} ${inter.variable}`}
        style={{
          background: '#fafaf8',
          color: '#1a1a2e',
          fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  )
}
