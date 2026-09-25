'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type ContactModalProps = {
  isOpen: boolean
  onClose: () => void
}

type SubmitState = 'idle' | 'loading' | 'done'

type ActivityLevel = 'Yeni Başlayan' | 'Orta' | 'İleri'

const PROGRAMS = [
  '1\'e 1 Antrenman',
  'Online Koçluk',
  'Beslenme Danışmanlığı',
  'Grup Antrenmanı',
] as const

type Program = (typeof PROGRAMS)[number]

const GOALS = [
  'Kilo Verme',
  'Kas Kazanımı',
  'Rekompozisyon',
  'Performans Artışı',
  'Genel Sağlık & Fitness',
] as const

type Goal = (typeof GOALS)[number]

type FormState = {
  name: string
  phone: string
  email: string
  program: Program
  goal: Goal
  activityLevel: ActivityLevel
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  program: '1\'e 1 Antrenman',
  goal: 'Kilo Verme',
  activityLevel: 'Yeni Başlayan',
}

const activityLevels: ActivityLevel[] = ['Yeni Başlayan', 'Orta', 'İleri']

const fontInter = 'var(--font-inter-spor), Inter, sans-serif'
const fontBebas = 'var(--font-bebas), "Bebas Neue", sans-serif'

function neonFocusStyle(focused: boolean): CSSProperties {
  return {
    borderColor: focused ? '#39ff14' : '#1f1f1f',
    boxShadow: focused ? '0 0 12px rgba(57, 255, 20, 0.35)' : 'none',
  }
}

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      style={{
        display: 'inline-block',
        width: 18,
        height: 18,
        border: '2px solid rgba(8, 8, 8, 0.3)',
        borderTopColor: '#080808',
        borderRadius: '50%',
      }}
    />
  )
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [programOpen, setProgramOpen] = useState(false)
  const [goalOpen, setGoalOpen] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const programRef = useRef<HTMLDivElement>(null)
  const goalRef = useRef<HTMLDivElement>(null)

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
      setProgramOpen(false)
      setGoalOpen(false)
      setFocusedField(null)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (programRef.current && !programRef.current.contains(e.target as Node)) {
        setProgramOpen(false)
      }
      if (goalRef.current && !goalRef.current.contains(e.target as Node)) {
        setGoalOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: '#080808',
    border: '1px solid #1f1f1f',
    borderRadius: 4,
    outline: 'none',
    fontFamily: fontInter,
    fontSize: 14,
    color: '#ffffff',
    boxSizing: 'border-box',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  }

  const labelStyle: CSSProperties = {
    display: 'block',
    fontFamily: fontInter,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#666666',
    marginBottom: 8,
  }

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 600 }}
        >
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Paneli kapat"
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
              background: 'rgba(8, 8, 8, 0.75)',
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
              width: 'min(480px, 100vw)',
              background: '#111111',
              borderLeft: '1px solid #1f1f1f',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 28px',
                borderBottom: '1px solid #1f1f1f',
                flexShrink: 0,
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: fontBebas,
                    fontSize: 28,
                    letterSpacing: 2,
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  BAŞVURU FORMU
                </h2>
                <p
                  style={{
                    fontFamily: fontInter,
                    fontSize: 12,
                    color: '#666666',
                    margin: '6px 0 0',
                  }}
                >
                  Ücretsiz danışma için bilgilerini bırak.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid #1f1f1f',
                  background: '#080808',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '28px', flex: 1 }}>
              {submitState === 'done' ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    textAlign: 'center',
                    padding: '48px 16px',
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'rgba(57, 255, 20, 0.12)',
                      border: '2px solid #39ff14',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 0 24px rgba(57, 255, 20, 0.3)',
                      fontSize: 28,
                      color: '#39ff14',
                    }}
                  >
                    ✓
                  </div>
                  <p
                    style={{
                      fontFamily: fontBebas,
                      fontSize: 32,
                      letterSpacing: 2,
                      color: '#39ff14',
                      margin: '0 0 12px',
                    }}
                  >
                    BAŞVURUN ALINDI
                  </p>
                  <p
                    style={{
                      fontFamily: fontInter,
                      fontSize: 14,
                      color: '#666666',
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    24 saat içinde seninle iletişime geçeceğim. Hazır ol!
                  </p>
                </motion.div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>
                      Ad Soyad
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      disabled={submitState === 'loading'}
                      style={{
                        ...inputStyle,
                        ...neonFocusStyle(focusedField === 'name'),
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" style={labelStyle}>
                      Telefon
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      disabled={submitState === 'loading'}
                      style={{
                        ...inputStyle,
                        ...neonFocusStyle(focusedField === 'phone'),
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" style={labelStyle}>
                      E-posta
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      disabled={submitState === 'loading'}
                      style={{
                        ...inputStyle,
                        ...neonFocusStyle(focusedField === 'email'),
                      }}
                    />
                  </div>

                  <div ref={programRef} style={{ position: 'relative' }}>
                    <span style={labelStyle}>Program</span>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => submitState === 'idle' && setProgramOpen((v) => !v)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          if (submitState === 'idle') setProgramOpen((v) => !v)
                        }
                      }}
                      onFocus={() => setFocusedField('program')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputStyle,
                        cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        ...neonFocusStyle(programOpen || focusedField === 'program'),
                      }}
                    >
                      <span>{form.program}</span>
                      <span style={{ fontSize: 10, color: '#666666' }}>
                        {programOpen ? '▲' : '▼'}
                      </span>
                    </div>
                    <AnimatePresence>
                      {programOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            marginTop: 4,
                            background: '#111111',
                            border: '1px solid #1f1f1f',
                            borderRadius: 4,
                            zIndex: 10,
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          {PROGRAMS.map((program) => (
                            <div
                              key={program}
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                setForm((prev) => ({ ...prev, program }))
                                setProgramOpen(false)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  setForm((prev) => ({ ...prev, program }))
                                  setProgramOpen(false)
                                }
                              }}
                              style={{
                                padding: '12px 16px',
                                fontFamily: fontInter,
                                fontSize: 14,
                                color: form.program === program ? '#39ff14' : '#ffffff',
                                background:
                                  form.program === program ? 'rgba(57, 255, 20, 0.08)' : 'transparent',
                                cursor: 'pointer',
                              }}
                            >
                              {program}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div ref={goalRef} style={{ position: 'relative' }}>
                    <span style={labelStyle}>Hedef</span>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => submitState === 'idle' && setGoalOpen((v) => !v)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          if (submitState === 'idle') setGoalOpen((v) => !v)
                        }
                      }}
                      onFocus={() => setFocusedField('goal')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputStyle,
                        cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        ...neonFocusStyle(goalOpen || focusedField === 'goal'),
                      }}
                    >
                      <span>{form.goal}</span>
                      <span style={{ fontSize: 10, color: '#666666' }}>{goalOpen ? '▲' : '▼'}</span>
                    </div>
                    <AnimatePresence>
                      {goalOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            marginTop: 4,
                            background: '#111111',
                            border: '1px solid #1f1f1f',
                            borderRadius: 4,
                            zIndex: 10,
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          {GOALS.map((goal) => (
                            <div
                              key={goal}
                              role="button"
                              tabIndex={0}
                              onClick={() => {
                                setForm((prev) => ({ ...prev, goal }))
                                setGoalOpen(false)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  setForm((prev) => ({ ...prev, goal }))
                                  setGoalOpen(false)
                                }
                              }}
                              style={{
                                padding: '12px 16px',
                                fontFamily: fontInter,
                                fontSize: 14,
                                color: form.goal === goal ? '#39ff14' : '#ffffff',
                                background:
                                  form.goal === goal ? 'rgba(57, 255, 20, 0.08)' : 'transparent',
                                cursor: 'pointer',
                              }}
                            >
                              {goal}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <span style={{ ...labelStyle, marginBottom: 12 }}>Aktivite Seviyesi</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {activityLevels.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, activityLevel: level }))}
                          disabled={submitState === 'loading'}
                          style={{
                            flex: 1,
                            padding: '12px 8px',
                            fontFamily: fontInter,
                            fontSize: 11,
                            letterSpacing: 0.5,
                            border: `1px solid ${form.activityLevel === level ? '#39ff14' : '#1f1f1f'}`,
                            background:
                              form.activityLevel === level
                                ? 'rgba(57, 255, 20, 0.12)'
                                : '#080808',
                            color: form.activityLevel === level ? '#39ff14' : '#666666',
                            cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                            borderRadius: 4,
                            boxShadow:
                              form.activityLevel === level
                                ? '0 0 12px rgba(57, 255, 20, 0.25)'
                                : 'none',
                            transition: 'border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease',
                          }}
                        >
                          {level}
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
                      background: submitState === 'loading' ? '#1f1f1f' : '#39ff14',
                      color: '#080808',
                      border: 'none',
                      borderRadius: 4,
                      fontFamily: fontBebas,
                      fontSize: 18,
                      letterSpacing: 2,
                      cursor: submitState === 'loading' ? 'wait' : 'pointer',
                      boxShadow:
                        submitState === 'loading'
                          ? 'none'
                          : '0 0 20px rgba(57, 255, 20, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                    }}
                  >
                    {submitState === 'idle' && 'GÖNDER'}
                    {submitState === 'loading' && (
                      <>
                        <Spinner />
                        GÖNDERİLİYOR...
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
