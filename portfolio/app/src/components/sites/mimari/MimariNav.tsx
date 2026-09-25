'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects as mimariProjects } from '@/lib/mimari-data'

const scrollTo = (id: string, onDone: () => void) => {
  onDone()
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, 400)
}

const scrollToImmediate = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const navLinks = [
  { id: 'projects', label: 'Projeler', previewIndex: 0 },
  { id: 'about', label: 'Hakkımızda', previewIndex: 1 },
  { id: 'services', label: 'Hizmetler', previewIndex: 2 },
  { id: 'team', label: 'Ekip', previewIndex: 3 },
  { id: 'contact', label: 'İletişim', previewIndex: 4 },
] as const

type MimariNavProps = {
  isMenuOpen: boolean
  setIsMenuOpen: (v: boolean) => void
}

export function MimariNav({ isMenuOpen, setIsMenuOpen }: MimariNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
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

  const hoveredNavLink =
    hoveredLink !== null ? navLinks.find((l) => l.id === hoveredLink) : undefined
  const previewProject =
    hoveredNavLink !== undefined ? mimariProjects[hoveredNavLink.previewIndex] : null

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 72,
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245,240,232,0.08)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <motion.div
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
          <motion.div
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 6,
              color: '#f5f0e8',
            }}
          >
            FORMA
          </motion.div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: 8,
              color: 'rgba(245,240,232,0.4)',
              marginTop: 2,
            }}
          >
            MİMARLIK
          </div>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button
            type="button"
            onClick={() => scrollToImmediate('contact')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(245,240,232,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
            style={{
              border: '1px solid rgba(245,240,232,0.2)',
              padding: '9px 22px',
              fontSize: 12,
              letterSpacing: 2,
              color: '#f5f0e8',
              borderRadius: 1,
              cursor: 'pointer',
              background: 'transparent',
              fontFamily: 'inherit',
              transition: 'background 0.3s ease',
            }}
          >
            İletişim
          </button>

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
                background: '#f5f0e8',
                transformOrigin: 'center',
              }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ display: 'block', width: 24, height: 1, background: '#f5f0e8' }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              style={{
                display: 'block',
                width: 24,
                height: 1,
                background: '#f5f0e8',
                transformOrigin: 'center',
              }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#0a0a0a',
              zIndex: 200,
            }}
          >
            <motion.div
              initial={{ x: -40 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              style={{
                height: '100%',
                padding: '120px 80px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <button
                type="button"
                aria-label="Menüyü kapat"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  position: 'absolute',
                  top: 32,
                  right: 48,
                  background: 'none',
                  border: 'none',
                  color: '#f5f0e8',
                  fontSize: 28,
                  cursor: 'pointer',
                }}
              >
                ×
              </button>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    type="button"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => scrollTo(link.id, () => setIsMenuOpen(false))}
                    style={{
                      fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                      fontSize: 'clamp(48px, 7vw, 80px)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color:
                        hoveredLink === link.id ? '#f5f0e8' : 'rgba(245,240,232,0.15)',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      padding: '8px 0',
                      transform:
                        hoveredLink === link.id ? 'translateX(24px)' : 'translateX(0)',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                    }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {previewProject && (
                  <motion.img
                    key={previewProject.id}
                    src={previewProject.heroImage}
                    alt={previewProject.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      right: 80,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 200,
                      height: 280,
                      objectFit: 'cover',
                      borderRadius: 2,
                    }}
                  />
                )}
              </AnimatePresence>

              <div style={{ marginTop: 'auto' }}>
                <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.4)', margin: '0 0 4px' }}>
                  Nişantaşı, İstanbul 34367
                </p>
                <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.4)', margin: '0 0 4px' }}>
                  info@formamimari.com
                </p>
                <p style={{ fontSize: 12, color: 'rgba(245,240,232,0.4)', margin: 0 }}>
                  +90 212 000 00 00
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
