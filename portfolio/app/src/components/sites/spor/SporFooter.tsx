'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Hakkımda', id: 'about' },
  { label: 'Hizmetler', id: 'services' },
  { label: 'Dönüşümler', id: 'transformations' },
  { label: 'İletişim', id: 'contact' },
] as const

const socialLinks = [
  {
    label: 'Instagram',
    abbr: 'IG',
    href: 'https://instagram.com/mertkayaperformance',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'YouTube',
    abbr: 'YT',
    href: 'https://youtube.com/@mertkayaperformance',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'TikTok',
    abbr: 'TT',
    href: 'https://tiktok.com/@mertkayaperformance',
    icon: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
  },
] as const

const fontInter = 'var(--font-inter-spor), Inter, sans-serif'
const fontBebas = 'var(--font-bebas), "Bebas Neue", sans-serif'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function SporFooter() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const linkButtonStyle = {
    background: 'none' as const,
    border: 'none' as const,
    padding: '6px 0',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    color: '#666666',
    cursor: 'pointer' as const,
    fontFamily: fontInter,
    textAlign: 'left' as const,
    transition: 'color 0.3s ease',
  }

  return (
    <footer
      style={{
        background: '#111111',
        borderTop: '1px solid #1f1f1f',
        padding: isMobile ? '48px 24px 32px' : '56px 48px 36px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 40 : 32,
          marginBottom: 40,
        }}
      >
        <div>
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
            style={{ cursor: 'pointer', display: 'inline-block' }}
          >
            <div
              style={{
                fontFamily: fontBebas,
                fontSize: 22,
                letterSpacing: 2,
                color: '#ffffff',
                lineHeight: 1,
              }}
            >
              MERT
            </div>
            <div
              style={{
                fontFamily: fontBebas,
                fontSize: 22,
                letterSpacing: 2,
                color: '#39ff14',
                lineHeight: 1,
              }}
            >
              KAYA
            </div>
            <div
              style={{
                fontFamily: fontInter,
                fontSize: 8,
                letterSpacing: 4,
                color: '#666666',
                marginTop: 2,
              }}
            >
              PERFORMANCE
            </div>
          </div>
        </div>

        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '8px 28px' : 36,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#39ff14'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#666666'
              }}
              style={linkButtonStyle}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 10 }}>
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#39ff14'
                e.currentTarget.style.color = '#39ff14'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1f1f1f'
                e.currentTarget.style.color = '#666666'
              }}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#080808',
                border: '1px solid #1f1f1f',
                borderRadius: 4,
                textDecoration: 'none',
                fontFamily: fontInter,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 1,
                color: '#666666',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
            >
              {social.abbr}
            </motion.a>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          height: 1,
          background: '#1f1f1f',
          marginBottom: 24,
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: fontInter,
            fontSize: 12,
            color: '#666666',
            margin: 0,
          }}
        >
          © 2024 Mert Kaya Performance. Tüm hakları saklıdır.
        </p>
        <p
          style={{
            fontFamily: fontInter,
            fontSize: 11,
            color: '#666666',
            margin: 0,
            letterSpacing: 1,
          }}
        >
          Kişisel Antrenörlük & Performans Koçluğu
        </p>
      </div>
    </footer>
  )
}
