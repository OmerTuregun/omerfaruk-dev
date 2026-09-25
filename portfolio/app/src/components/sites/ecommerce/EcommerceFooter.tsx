'use client'

import { useState, type MouseEvent, type ReactNode } from 'react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function FooterLink({
  children,
  last,
  onActivate,
}: {
  children: ReactNode
  last?: boolean
  onActivate: () => void
}) {
  const [hover, setHover] = useState(false)

  return (
    <a
      href="#"
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        onActivate()
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 13,
        color: hover ? '#c4a882' : 'rgba(196,168,130,0.6)',
        display: 'block',
        marginBottom: last ? 0 : 10,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color 0.2s',
      }}
    >
      {children}
    </a>
  )
}

export function EcommerceFooter() {
  const colors = {
    bg: '#faf8f5',
    bgAlt: '#f5f0eb',
    bgDark: '#f0ebe4',
    dark: '#2c1810',
    brown: '#5c3d2e',
    gold: '#c4a882',
    goldLight: '#e8ddd0',
    muted: '#8c7b6e',
    border: '#e8e0d8',
    white: '#ffffff',
  } as const

  const headingStyle = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: 10,
    color: 'rgba(196,168,130,0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    marginBottom: 16,
  }

  return (
    <footer id="iletisim" style={{ background: colors.dark, padding: '64px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(196,168,130,0.15)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 22,
                fontWeight: 600,
                color: colors.gold,
                letterSpacing: 4,
              }}
            >
              TOPRAK
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 10,
                color: 'rgba(196,168,130,0.5)',
                letterSpacing: 6,
                marginTop: 2,
              }}
            >
              STUDIO
            </div>
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: 'rgba(196,168,130,0.5)',
                lineHeight: 1.7,
                marginTop: 16,
                marginBottom: 0,
                whiteSpace: 'pre-line',
              }}
            >
              El yapımı seramik ve ev dekor.{'\n'}İstanbul, Türkiye.
            </p>
          </div>

          <div>
            <div style={headingStyle}>Koleksiyon</div>
            <FooterLink onActivate={() => scrollTo('kategoriler')}>Kaseler</FooterLink>
            <FooterLink onActivate={() => scrollTo('kategoriler')}>Vazolar</FooterLink>
            <FooterLink onActivate={() => scrollTo('kategoriler')}>Kupalar</FooterLink>
            <FooterLink last onActivate={() => scrollTo('kategoriler')}>
              Ev Dekor
            </FooterLink>
          </div>

          <div>
            <div style={headingStyle}>Bilgi</div>
            <FooterLink onActivate={() => scrollTo('hikaye')}>Hikayemiz</FooterLink>
            <FooterLink onActivate={() => scrollTo('surec')}>Nasıl Yapılıyor</FooterLink>
            <FooterLink onActivate={() => scrollTo('sss')}>Bakım Rehberi</FooterLink>
            <FooterLink last onActivate={() => scrollTo('sss')}>
              S.S.S.
            </FooterLink>
          </div>

          <div>
            <div style={headingStyle}>İletişim</div>
            <FooterLink onActivate={() => window.open('https://instagram.com', '_blank')}>
              Instagram
            </FooterLink>
            <FooterLink
              onActivate={() => {
                window.location.href = 'mailto:info@toprakstudio.com'
              }}
            >
              E-posta
            </FooterLink>
            <FooterLink onActivate={() => window.open('https://wa.me/905300000000', '_blank')}>
              WhatsApp
            </FooterLink>
            <FooterLink last onActivate={() => scrollTo('tum-urunler')}>
              Sipariş Takibi
            </FooterLink>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 32,
            fontSize: 12,
            color: 'rgba(196,168,130,0.3)',
            flexWrap: 'wrap',
            gap: 16,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          <span>© 2025 Toprak Studio. Tüm hakları saklıdır.</span>
          <span>Kargo · İade · Gizlilik</span>
        </div>
      </div>
    </footer>
  )
}
