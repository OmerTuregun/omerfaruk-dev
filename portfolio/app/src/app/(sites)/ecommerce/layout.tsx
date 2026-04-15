import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Toprak Studio — El Yapımı Seramik & Ev Dekor',
  description: 'Her parça bir hikaye. El yapımı seramik ve ev dekor.',
}

export default function EcommerceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body
        className={`${cormorant.variable} ${inter.variable}`}
        style={{ background: '#faf8f5', margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  )
}

