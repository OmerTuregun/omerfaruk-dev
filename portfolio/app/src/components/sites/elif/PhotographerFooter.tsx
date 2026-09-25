'use client'

import { useState } from 'react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function FooterNavLink({
  children,
  targetId,
}: {
  children: string
  targetId: string
}) {
  const [hover, setHover] = useState(false)

  return (
    <span
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          scrollTo(targetId)
        }
      }}
      onClick={() => scrollTo(targetId)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 11,
        color: hover ? '#c4848a' : '#bbb',
        letterSpacing: 1.5,
        cursor: 'pointer',
        transition: 'color 0.2s',
      }}
    >
      {children}
    </span>
  )
}

export function PhotographerFooter() {
  return (
    <footer
      style={{
        padding: '32px 60px',
        borderTop: '1px solid #f5e8ea',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fafaf8',
        flexWrap: 'wrap',
        gap: 20,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", serif',
          fontSize: 16,
          fontWeight: 400,
          letterSpacing: 2,
          color: '#c4848a',
        }}
      >
        Elif Şahin
      </div>
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        <FooterNavLink targetId="portfolyo">Portfolyo</FooterNavLink>
        <FooterNavLink targetId="hakkimda">Hakkımda</FooterNavLink>
        <FooterNavLink targetId="hizmetler">Hizmetler</FooterNavLink>
        <FooterNavLink targetId="iletisim">İletişim</FooterNavLink>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 11,
          color: '#bbb',
        }}
      >
        © 2025 Elif Şahin Fotoğrafçılık
      </div>
    </footer>
  )
}
