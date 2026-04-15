'use client'

import { useEffect, useState } from 'react'

import { colors } from '@/components/sites/restoran/colors'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function NavScrollLink({
  sectionId,
  children,
}: {
  sectionId: string
  children: string
}) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        scrollTo(sectionId)
      }}
      style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 12,
        color: colors.goldMid,
        letterSpacing: '1px',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </a>
  )
}

export function RestaurantNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 60px',
        background: scrolled ? 'rgba(250,247,242,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'background 0.3s ease',
      }}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 18,
          color: colors.dark,
          letterSpacing: '3px',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        MARCELLO&apos;S
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <NavScrollLink sectionId="menu">Menü</NavScrollLink>
        <NavScrollLink sectionId="sefimiz">Şefimiz</NavScrollLink>
        <NavScrollLink sectionId="atmosfer">Atmosfer</NavScrollLink>
        <NavScrollLink sectionId="yorumlar">Yorumlar</NavScrollLink>
        <NavScrollLink sectionId="hakkimizda">Hakkımızda</NavScrollLink>
        <NavScrollLink sectionId="konum">Konum</NavScrollLink>
        <NavScrollLink sectionId="rezervasyon">Rezervasyon</NavScrollLink>
      </nav>
    </header>
  )
}
