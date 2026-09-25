'use client'

import { useEffect, useState } from 'react'

import { photographerInfo } from '@/lib/photographer-data'

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function PhotographerNav() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [ctaHover, setCtaHover] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { id: 'portfolyo', label: 'Portfolyo' },
    { id: 'hakkimda', label: 'Hakkımda' },
    { id: 'hizmetler', label: 'Hizmetler' },
  ] as const

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 60px',
        height: 72,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(250,250,248,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid #e8e8e4' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 20,
          fontWeight: 400,
          letterSpacing: 2,
          color: '#111',
          cursor: 'pointer',
        }}
      >
        {photographerInfo.name}
      </div>

      <div style={{ display: 'flex', gap: 36 }}>
        {links.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => scrollTo(link.id)}
            onMouseEnter={() => setHoveredLink(link.id)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              color: hoveredLink === link.id ? '#111' : '#888',
              letterSpacing: 2,
              textTransform: 'uppercase',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              transition: 'color 0.2s',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollTo('iletisim')}
        onMouseEnter={() => setCtaHover(true)}
        onMouseLeave={() => setCtaHover(false)}
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 11,
          color: ctaHover ? '#c4848a' : '#111',
          letterSpacing: 1,
          borderBottom: '1px solid #e8b4b8',
          paddingBottom: 2,
          cursor: 'pointer',
          background: 'none',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          transition: 'color 0.2s',
        }}
      >
        İletişime Geç →
      </button>
    </nav>
  )
}
