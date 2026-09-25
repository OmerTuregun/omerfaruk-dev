'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
  { id: 'works', label: 'Works' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'clients', label: 'Clients' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
] as const

type AjansNavProps = {
  isMenuOpen: boolean
  setIsMenuOpen: (v: boolean) => void
}

export function AjansNav({ isMenuOpen, setIsMenuOpen }: AjansNavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
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
          background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background 0.35s ease',
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
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            color: '#f0f0f0',
            cursor: 'pointer',
          }}
        >
          VOID
        </div>

        <motion.div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button
            type="button"
            onClick={() => scrollToImmediate('contact')}
            style={{
              border: '1px solid rgba(240,240,240,0.3)',
              padding: '10px 24px',
              borderRadius: 2,
              fontSize: 13,
              letterSpacing: 1,
              color: '#f0f0f0',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Let&apos;s Talk
          </button>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
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
                height: 1.5,
                background: '#f0f0f0',
                transformOrigin: 'center',
              }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ display: 'block', width: 24, height: 1.5, background: '#f0f0f0' }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              style={{
                display: 'block',
                width: 24,
                height: 1.5,
                background: '#f0f0f0',
                transformOrigin: 'center',
              }}
            />
          </button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: 'circle(0% at calc(100% - 60px) 36px)',
            }}
            animate={{
              opacity: 1,
              clipPath: 'circle(150% at calc(100% - 60px) 36px)',
            }}
            exit={{
              opacity: 0,
              clipPath: 'circle(0% at calc(100% - 60px) 36px)',
            }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#050505',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: 48,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f0f0f0',
                  fontSize: 28,
                  cursor: 'pointer',
                  padding: 8,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ x: 16, color: '#ff3b00' }}
                  onClick={() => scrollTo(link.id, () => setIsMenuOpen(false))}
                  style={{
                    fontSize: 'clamp(36px, 6vw, 72px)',
                    fontWeight: 600,
                    color: '#f0f0f0',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '8px 0',
                    fontFamily: 'inherit',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <motion.div>
                <p style={{ fontSize: 12, color: 'rgba(240,240,240,0.4)', margin: 0 }}>
                  © 2024 Void Studio
                </p>
                <p style={{ fontSize: 12, color: 'rgba(240,240,240,0.4)', margin: '4px 0 0' }}>
                  Istanbul / London / Tokyo
                </p>
              </motion.div>
              <motion.div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, color: '#f0f0f0', margin: '0 0 12px' }}>
                  hello@voidstudio.com
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                  {['Instagram', 'LinkedIn', 'Behance'].map((social) => (
                    <span
                      key={social}
                      style={{
                        fontSize: 11,
                        letterSpacing: 1,
                        color: 'rgba(240,240,240,0.5)',
                        cursor: 'pointer',
                      }}
                    >
                      {social}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
