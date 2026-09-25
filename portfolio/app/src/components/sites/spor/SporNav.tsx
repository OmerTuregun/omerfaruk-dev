'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { id: 'about', label: 'Hakkımda' },
  { id: 'services', label: 'Hizmetler' },
  { id: 'transformations', label: 'Dönüşümler' },
  { id: 'contact', label: 'İletişim' },
] as const

const handleNavClick = (sectionId: string, onDone?: () => void) => {
  onDone?.()
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type SporNavProps = {
  setContactOpen: (v: boolean) => void
}

export function SporNav({ setContactOpen }: SporNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const updateMobile = () => setIsMobile(mq.matches)
    updateMobile()
    mq.addEventListener('change', updateMobile)
    return () => mq.removeEventListener('change', updateMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2,
          background: '#39ff14',
          zIndex: 101,
          width: `${scrollProgress}%`,
          transition: 'width 0.1s linear',
          boxShadow: '0 0 12px rgba(57, 255, 20, 0.8), 0 0 24px rgba(57, 255, 20, 0.4)',
        }}
      />

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 72,
          padding: isMobile ? '0 24px' : '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(8, 8, 8, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #1f1f1f' : '1px solid transparent',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
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
          style={{ cursor: 'pointer' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: 22,
              letterSpacing: '2px',
              color: '#ffffff',
              lineHeight: 1,
            }}
          >
            MERT
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: 22,
              letterSpacing: '2px',
              color: '#39ff14',
              lineHeight: 1,
            }}
          >
            KAYA
          </div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: '4px',
              color: '#666666',
              fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
              marginTop: 2,
            }}
          >
            PERFORMANCE
          </div>
        </div>

        <div
          style={{
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: 36,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#39ff14'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#666666'
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#666666',
                fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                padding: 0,
                transition: 'color 0.3s ease',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px rgba(57, 255, 20, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 16px rgba(57, 255, 20, 0.3)'
            }}
            style={{
              background: '#39ff14',
              color: '#080808',
              padding: '10px 24px',
              fontSize: 13,
              letterSpacing: '2px',
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(57, 255, 20, 0.3)',
              transition: 'box-shadow 0.3s ease',
              whiteSpace: 'nowrap',
            }}
          >
            BAŞVUR
          </button>

          {isMobile && (
            <button
              type="button"
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
              }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                style={{
                  display: 'block',
                  width: 24,
                  height: 1,
                  background: '#ffffff',
                  transformOrigin: 'center',
                }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{ display: 'block', width: 24, height: 1, background: '#ffffff' }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                style={{
                  display: 'block',
                  width: 24,
                  height: 1,
                  background: '#ffffff',
                  transformOrigin: 'center',
                }}
              />
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(8, 8, 8, 0.97)',
              zIndex: 200,
              padding: '100px 32px 48px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                  onClick={() => handleNavClick(link.id, () => setMenuOpen(false))}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                    fontSize: 'clamp(36px, 8vw, 52px)',
                    color: '#ffffff',
                    padding: '12px 0',
                    borderBottom: '1px solid #1f1f1f',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setContactOpen(true)
              }}
              style={{
                marginTop: 32,
                width: '100%',
                background: '#39ff14',
                color: '#080808',
                padding: '14px 24px',
                fontSize: 16,
                letterSpacing: '2px',
                fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 16px rgba(57, 255, 20, 0.3)',
              }}
            >
              BAŞVUR
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
