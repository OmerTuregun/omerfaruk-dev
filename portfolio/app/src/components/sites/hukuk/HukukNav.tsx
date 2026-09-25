'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { id: 'practice-areas', label: 'Uzmanlık Alanları' },
  { id: 'attorneys', label: 'Avukatlarımız' },
  { id: 'process', label: 'Süreç' },
  { id: 'case-studies', label: 'Davalarımız' },
  { id: 'contact', label: 'İletişim' },
] as const

const handleNavClick = (sectionId: string, onDone?: () => void) => {
  onDone?.()
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type HukukNavProps = {
  isMenuOpen: boolean
  setIsMenuOpen: (v: boolean) => void
  setAppointmentOpen: (v: boolean) => void
}

export function HukukNav({ isMenuOpen, setIsMenuOpen, setAppointmentOpen }: HukukNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const updateMobile = () => setIsMobile(mq.matches)
    updateMobile()
    mq.addEventListener('change', updateMobile)
    return () => mq.removeEventListener('change', updateMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 2,
          background: '#c5a572',
          zIndex: 101,
          width: `${scrollProgress}%`,
          transition: 'width 0.1s linear',
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
          background: 'rgba(250,250,248,0.97)',
          boxShadow: scrolled ? '0 1px 0 #e5e0d8' : 'none',
          transition: 'box-shadow 0.3s ease',
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
              fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#1a3a5c',
            }}
          >
            ÇELİK & DOĞAN
          </div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: '4px',
              color: '#c5a572',
              fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
              marginTop: 2,
            }}
          >
            HUKUK BÜROSU
          </div>
        </div>

        <div
          style={{
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1a3a5c'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280'
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                letterSpacing: '0.5px',
                color: '#6b7280',
                fontFamily: 'inherit',
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
            onClick={() => setAppointmentOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#15304d'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1a3a5c'
            }}
            style={{
              background: '#1a3a5c',
              color: '#fafaf8',
              padding: '10px 22px',
              fontSize: 12,
              letterSpacing: '1px',
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
              transition: 'background 0.3s ease',
              whiteSpace: 'nowrap',
            }}
          >
            Ücretsiz Danışma
          </button>

          {isMobile && (
            <button
              type="button"
              aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                animate={isMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                style={{
                  display: 'block',
                  width: 24,
                  height: 1,
                  background: '#1a3a5c',
                  transformOrigin: 'center',
                }}
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{ display: 'block', width: 24, height: 1, background: '#1a3a5c' }}
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                style={{
                  display: 'block',
                  width: 24,
                  height: 1,
                  background: '#1a3a5c',
                  transformOrigin: 'center',
                }}
              />
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(250,250,248,0.98)',
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
                  onClick={() => handleNavClick(link.id, () => setIsMenuOpen(false))}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
                    fontSize: 'clamp(28px, 6vw, 40px)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#1a3a5c',
                    padding: '12px 0',
                    borderBottom: '1px solid #e5e0d8',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false)
                setAppointmentOpen(true)
              }}
              style={{
                marginTop: 32,
                width: '100%',
                background: '#1a3a5c',
                color: '#fafaf8',
                padding: '14px 24px',
                fontSize: 13,
                letterSpacing: '1px',
                borderRadius: 2,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Ücretsiz Danışma
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
