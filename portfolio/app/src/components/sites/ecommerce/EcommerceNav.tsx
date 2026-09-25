'use client'

import { useEffect, useState } from 'react'

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

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export interface EcommerceNavProps {
  cartCount: number
  onCartClick: () => void
  onLoginClick: () => void
  onRegisterClick: () => void
}

export function EcommerceNav({ cartCount, onCartClick, onLoginClick, onRegisterClick }: EcommerceNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { id: 'urunler', label: 'Ürünler' },
    { id: 'tum-urunler', label: 'Tüm Ürünler' },
    { id: 'kategoriler', label: 'Kategoriler' },
    { id: 'hikaye', label: 'Hikayemiz' },
    { id: 'surec', label: 'Süreç' },
    { id: 'iletisim', label: 'İletişim' },
  ] as const

  return (
    <nav
      style={{
        height: 64,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 60px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 50,
        background: scrolled ? 'rgba(250,248,245,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 20,
            fontWeight: 600,
            color: colors.dark,
            letterSpacing: 4,
          }}
        >
          TOPRAK
        </div>
        <span
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            color: colors.gold,
            letterSpacing: 6,
            display: 'block',
            marginTop: -4,
          }}
        >
          STUDIO
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {links.map((l) => (
          <button
            key={l.label}
            type="button"
            onClick={() => scrollTo(l.id)}
            onMouseEnter={() => setHoveredLink(l.label)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 13,
              color: hoveredLink === l.label ? colors.dark : colors.muted,
              letterSpacing: 0.5,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              transition: 'color 0.2s ease',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          onClick={onLoginClick}
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 13,
            color: '#8c7b6e',
            cursor: 'pointer',
            marginRight: 16,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLDivElement).style.color = '#2c1810'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLDivElement).style.color = '#8c7b6e'
          }}
          role="button"
          tabIndex={0}
          aria-label="Giriş yap"
        >
          Giriş Yap
        </div>

        <button
          type="button"
          onClick={onRegisterClick}
          style={{
            background: '#2c1810',
            color: '#fff',
            border: 'none',
            borderRadius: 2,
            padding: '8px 20px',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 12,
            letterSpacing: 1,
            cursor: 'pointer',
            marginRight: 16,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = '#3d2518'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = '#2c1810'
          }}
          aria-label="Kayıt ol"
        >
          Kayıt Ol
        </button>

        <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={onCartClick}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Sepet"
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.dark} strokeWidth={1.5} aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </button>

        {cartCount > 0 ? (
          <div
            style={{
              position: 'absolute',
              top: -6,
              right: -8,
              background: colors.dark,
              color: '#fff',
              fontSize: 10,
              borderRadius: '50%',
              width: 16,
              height: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
            aria-label={`Sepet: ${cartCount} ürün`}
          >
            {cartCount}
          </div>
        ) : null}
      </div>
      </div>
    </nav>
  )
}

