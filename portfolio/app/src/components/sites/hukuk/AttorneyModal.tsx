'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Attorney } from '@/lib/hukuk-data'

type AttorneyModalProps = {
  attorney: Attorney | null
  onClose: () => void
  setAppointmentOpen: (v: boolean) => void
}

export function AttorneyModal({ attorney, onClose, setAppointmentOpen }: AttorneyModalProps) {
  useEffect(() => {
    if (!attorney) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [attorney, onClose])

  const handleAppointment = () => {
    onClose()
    setAppointmentOpen(true)
  }

  return (
    <AnimatePresence>
      {attorney && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 500 }}
        >
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Modalı kapat"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClose()
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(26, 26, 46, 0.6)',
            }}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 'min(520px, 100vw)',
              background: '#fafaf8',
              overflowY: 'auto',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Kapat"
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                zIndex: 1,
                width: 40,
                height: 40,
                border: '1px solid #e5e0d8',
                background: '#fafaf8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                color: '#1a1a2e',
              }}
            >
              ×
            </button>

            <img
              src={attorney.image}
              alt={attorney.name}
              style={{
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            <div style={{ padding: '32px 40px 48px' }}>
              <h2
                style={{
                  fontFamily: "var(--font-libre-baskerville), Libre Baskerville, Georgia, serif",
                  fontSize: 28,
                  fontWeight: 400,
                  color: '#1a1a2e',
                  margin: '0 0 8px',
                }}
              >
                {attorney.name}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                  fontSize: 14,
                  color: '#c5a572',
                  margin: '0 0 16px',
                  letterSpacing: 0.5,
                }}
              >
                {attorney.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                  fontSize: 13,
                  color: '#6b7280',
                  margin: '0 0 24px',
                  paddingBottom: 24,
                  borderBottom: '1px solid #e5e0d8',
                }}
              >
                {attorney.barMembership}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: '#1a1a2e',
                  margin: '0 0 32px',
                }}
              >
                {attorney.bio}
              </p>

              <div style={{ marginBottom: 32 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#6b7280',
                    margin: '0 0 12px',
                  }}
                >
                  Eğitim
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {attorney.education.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                        fontSize: 14,
                        color: '#1a1a2e',
                        padding: '8px 0',
                        borderBottom: '1px solid #e5e0d8',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#6b7280',
                    margin: '0 0 12px',
                  }}
                >
                  Uzmanlık Alanları
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {attorney.specializations.map((spec) => (
                    <span
                      key={spec}
                      style={{
                        fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                        fontSize: 12,
                        padding: '6px 14px',
                        background: '#f0ece6',
                        color: '#6b4c3b',
                        borderRadius: 2,
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={`mailto:${attorney.email}`}
                style={{
                  display: 'inline-block',
                  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                  fontSize: 14,
                  color: '#1a3a5c',
                  textDecoration: 'none',
                  marginBottom: 24,
                }}
              >
                {attorney.email}
              </a>

              <button
                type="button"
                onClick={handleAppointment}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '16px 24px',
                  background: '#1a3a5c',
                  color: '#fafaf8',
                  border: 'none',
                  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                  fontSize: 14,
                  letterSpacing: 1,
                  cursor: 'pointer',
                }}
              >
                Randevu Al
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
