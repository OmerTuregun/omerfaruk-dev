'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type ContactSectionProps = {
  setContactOpen: (v: boolean) => void
}

const fontInter = 'var(--font-inter-spor), Inter, sans-serif'
const fontBebas = 'var(--font-bebas), "Bebas Neue", sans-serif'

const contactInfo = [
  {
    label: 'Telefon',
    value: '+90 532 441 28 00',
    href: 'tel:+905324412800',
  },
  {
    label: 'E-posta',
    value: 'info@mertkayaperformance.com',
    href: 'mailto:info@mertkayaperformance.com',
  },
  {
    label: 'Konum',
    value: 'Beşiktaş, İstanbul',
    href: undefined,
  },
  {
    label: 'Çalışma Saatleri',
    value: 'Pzt–Cmt, 07:00–21:00',
    href: undefined,
  },
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

export function ContactSection({ setContactOpen }: ContactSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: '#080808',
        padding: isMobile ? '80px 24px' : '120px 48px',
        borderTop: '1px solid #1f1f1f',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 56 : 80,
          alignItems: 'center',
        }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: fontInter,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#666666',
              margin: '0 0 16px',
            }}
          >
            Son Adım
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{
              fontFamily: fontBebas,
              fontSize: 'clamp(56px, 8vw, 96px)',
              letterSpacing: 2,
              color: '#ffffff',
              lineHeight: 0.95,
              margin: '0 0 8px',
            }}
          >
            HAZIR
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{
              fontFamily: fontBebas,
              fontSize: 'clamp(56px, 8vw, 96px)',
              letterSpacing: 2,
              color: '#39ff14',
              lineHeight: 0.95,
              margin: '0 0 28px',
              textShadow: '0 0 40px rgba(57, 255, 20, 0.25)',
            }}
          >
            MISIN?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.24 }}
            style={{
              fontFamily: fontInter,
              fontSize: 15,
              lineHeight: 1.8,
              color: '#666666',
              margin: '0 0 36px',
              maxWidth: 420,
            }}
          >
            Hedeflerine ulaşmak için tek yapman gereken ilk adımı atmak. Ücretsiz danışma
            görüşmesiyle programını birlikte planlayalım.
          </motion.p>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.32 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setContactOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(57, 255, 20, 0.55)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.35)'
            }}
            style={{
              background: '#39ff14',
              color: '#080808',
              padding: '16px 40px',
              fontSize: 18,
              letterSpacing: 2,
              fontFamily: fontBebas,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.35)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            HEMEN BAŞVUR
          </motion.button>
        </div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            style={{
              fontFamily: fontInter,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#666666',
              margin: '0 0 24px',
            }}
          >
            İletişim Bilgileri
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.16 + i * 0.06 }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: fontInter,
                    fontSize: 10,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#666666',
                    marginBottom: 6,
                  }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontFamily: fontInter,
                      fontSize: 16,
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#39ff14'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ffffff'
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: fontInter,
                      fontSize: 16,
                      color: '#ffffff',
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              fontFamily: fontInter,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#666666',
              margin: '0 0 16px',
            }}
          >
            Sosyal Medya
          </motion.p>

          <div style={{ display: 'flex', gap: 12 }}>
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.44 + i * 0.06 }}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#39ff14'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(57, 255, 20, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1f1f1f'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                style={{
                  width: 52,
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#111111',
                  border: '1px solid #1f1f1f',
                  borderRadius: 4,
                  textDecoration: 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="#666666"
                  aria-hidden
                >
                  <path d={social.icon} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
