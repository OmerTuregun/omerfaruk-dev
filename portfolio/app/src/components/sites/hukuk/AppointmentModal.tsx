'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type AppointmentModalProps = {
  isOpen: boolean
  onClose: () => void
}

type SubmitState = 'idle' | 'loading' | 'done'

type MeetingType = 'Yüz Yüze' | 'Telefon' | 'Video'

const SUBJECTS = [
  'Ticaret Hukuku',
  'Gayrimenkul',
  'İş Hukuku',
  'Ceza Hukuku',
  'Aile Hukuku',
  'İdare Hukuku',
  'Diğer',
] as const

type Subject = (typeof SUBJECTS)[number]

type FormState = {
  name: string
  phone: string
  email: string
  subject: Subject
  message: string
  meetingType: MeetingType
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  subject: 'Ticaret Hukuku',
  message: '',
  meetingType: 'Yüz Yüze',
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 0',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #e5e0d8',
  outline: 'none',
  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
  fontSize: 15,
  color: '#1a1a2e',
}

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm)
      setSubmitState('idle')
      setDropdownOpen(false)
      setFocusedField(null)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getBorderColor = (field: string) =>
    focusedField === field ? '#c5a572' : '#e5e0d8'

  const handleSubmit = () => {
    if (submitState !== 'idle') return
    setSubmitState('loading')
    window.setTimeout(() => {
      setSubmitState('done')
      window.setTimeout(() => {
        onClose()
      }, 2500)
    }, 1500)
  }

  const meetingTypes: MeetingType[] = ['Yüz Yüze', 'Telefon', 'Video']

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
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
              background: 'rgba(26, 26, 46, 0.7)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(520px, 90vw)',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#fafaf8',
              padding: 48,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Kapat"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 36,
                height: 36,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 22,
                color: '#6b7280',
              }}
            >
              ×
            </button>

            {submitState === 'done' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', padding: '32px 0' }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-libre-baskerville), Libre Baskerville, Georgia, serif",
                    fontSize: 28,
                    color: '#1a1a2e',
                    margin: '0 0 12px',
                  }}
                >
                  Randevu Talebiniz Alındı
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                    fontSize: 15,
                    color: '#6b7280',
                    margin: 0,
                  }}
                >
                  En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              </motion.div>
            ) : (
              <>
                <h2
                  style={{
                    fontFamily: "var(--font-libre-baskerville), Libre Baskerville, Georgia, serif",
                    fontSize: 28,
                    fontWeight: 400,
                    color: '#1a1a2e',
                    margin: '0 0 8px',
                  }}
                >
                  Randevu Al
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                    fontSize: 14,
                    color: '#6b7280',
                    margin: '0 0 32px',
                  }}
                >
                  Ücretsiz ön görüşme için formu doldurun.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label
                      htmlFor="appointment-name"
                      style={{
                        fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                        fontSize: 11,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: '#6b7280',
                      }}
                    >
                      Ad Soyad
                    </label>
                    <input
                      id="appointment-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      disabled={submitState === 'loading'}
                      style={{
                        ...inputStyle,
                        borderBottom: `1px solid ${getBorderColor('name')}`,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="appointment-phone"
                      style={{
                        fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                        fontSize: 11,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: '#6b7280',
                      }}
                    >
                      Telefon
                    </label>
                    <input
                      id="appointment-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      disabled={submitState === 'loading'}
                      style={{
                        ...inputStyle,
                        borderBottom: `1px solid ${getBorderColor('phone')}`,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="appointment-email"
                      style={{
                        fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                        fontSize: 11,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: '#6b7280',
                      }}
                    >
                      E-posta
                    </label>
                    <input
                      id="appointment-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      disabled={submitState === 'loading'}
                      style={{
                        ...inputStyle,
                        borderBottom: `1px solid ${getBorderColor('email')}`,
                      }}
                    />
                  </div>

                  <div ref={dropdownRef} style={{ position: 'relative' }}>
                    <span
                      style={{
                        fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                        fontSize: 11,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: '#6b7280',
                      }}
                    >
                      Konu
                    </span>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => submitState === 'idle' && setDropdownOpen((v) => !v)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          if (submitState === 'idle') setDropdownOpen((v) => !v)
                        }
                      }}
                      style={{
                        ...inputStyle,
                        borderBottom: `1px solid ${dropdownOpen || focusedField === 'subject' ? '#c5a572' : '#e5e0d8'}`,
                        cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{form.subject}</span>
                      <span style={{ fontSize: 10, color: '#6b7280' }}>{dropdownOpen ? '▲' : '▼'}</span>
                    </div>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          style={{
                            position: 'absolute',
                            left: 48,
                            right: 48,
                            marginTop: 4,
                            background: '#fafaf8',
                            border: '1px solid #e5e0d8',
                            boxShadow: '0 8px 24px rgba(26, 26, 46, 0.1)',
                            zIndex: 10,
                          }}
                        >
                          {SUBJECTS.map((subject) => (
                            <div
                              key={subject}
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                setForm((prev) => ({ ...prev, subject }))
                                setDropdownOpen(false)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  setForm((prev) => ({ ...prev, subject }))
                                  setDropdownOpen(false)
                                }
                              }}
                              style={{
                                padding: '12px 16px',
                                fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                                fontSize: 14,
                                color: form.subject === subject ? '#1a3a5c' : '#1a1a2e',
                                background: form.subject === subject ? '#f0ece6' : 'transparent',
                                cursor: 'pointer',
                              }}
                            >
                              {subject}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label
                      htmlFor="appointment-message"
                      style={{
                        fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                        fontSize: 11,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: '#6b7280',
                      }}
                    >
                      Mesaj
                    </label>
                    <textarea
                      id="appointment-message"
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      disabled={submitState === 'loading'}
                      rows={4}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        borderBottom: `1px solid ${getBorderColor('message')}`,
                      }}
                    />
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                        fontSize: 11,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: '#6b7280',
                        display: 'block',
                        marginBottom: 12,
                      }}
                    >
                      Görüşme Türü
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {meetingTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, meetingType: type }))}
                          disabled={submitState === 'loading'}
                          style={{
                            flex: 1,
                            padding: '10px 12px',
                            fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                            fontSize: 13,
                            border: `1px solid ${form.meetingType === type ? '#1a3a5c' : '#e5e0d8'}`,
                            background: form.meetingType === type ? '#1a3a5c' : 'transparent',
                            color: form.meetingType === type ? '#fafaf8' : '#1a1a2e',
                            cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitState === 'loading'}
                    whileHover={{ scale: submitState === 'idle' ? 1.02 : 1 }}
                    whileTap={{ scale: submitState === 'idle' ? 0.98 : 1 }}
                    style={{
                      marginTop: 8,
                      padding: '16px 24px',
                      background: submitState === 'loading' ? '#6b7280' : '#1a3a5c',
                      color: '#fafaf8',
                      border: 'none',
                      fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                      fontSize: 14,
                      letterSpacing: 1,
                      cursor: submitState === 'loading' ? 'wait' : 'pointer',
                    }}
                  >
                    {submitState === 'idle' && 'Randevu Talebi Gönder'}
                    {submitState === 'loading' && 'Gönderiliyor...'}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
