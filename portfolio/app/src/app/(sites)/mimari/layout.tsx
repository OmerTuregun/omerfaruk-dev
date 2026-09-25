import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Forma Mimarlık — Lüks Mimarlık',
  description:
    'Lüks konut ve ticari projeler. İstanbul merkezli mimarlık ve iç mimari stüdyosu.',
}

export default function MimariLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${cormorant.variable} ${dmSans.variable}`}
        style={{
          background: '#0a0a0a',
          color: '#f5f0e8',
          fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  )
}
