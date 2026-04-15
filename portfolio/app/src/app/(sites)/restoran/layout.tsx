import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: "Marcello's — Lüks İtalyan Restoranı",
  description:
    'İstanbul Beyoğlu’nda otantik İtalyan mutfağı, seçkin şarap eşleşmeleri ve unutulmaz bir akşam yemeği deneyimi. Marcello’s Ristorante.',
}

export default function RestoranLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body
        style={{
          background: '#faf7f2',
          margin: 0,
          padding: 0,
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  )
}
