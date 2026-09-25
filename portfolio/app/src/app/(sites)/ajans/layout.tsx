import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter-ajans',
})

export const metadata: Metadata = {
  title: 'Void Studio — Creative Agency',
  description: 'Uluslararası kreatif ajans. Film prodüksiyon, marka kimliği ve motion design.',
}

export default function AjansLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" style={{ scrollBehavior: 'smooth' }}>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable}`}
        style={{
          background: '#050505',
          color: '#f0f0f0',
          fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  )
}
