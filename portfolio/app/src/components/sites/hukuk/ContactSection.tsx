'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

type FormState = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type SubmitState = 'idle' | 'loading' | 'done'

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: 'Genel Soru',
  message: '',
}

const subjectOptions = [
  'Genel Soru',
  'Randevu Talebi',
  'Ticaret Hukuku',
  'Gayrimenkul',
  'İş Hukuku',
  'Diğer',
] as const

const contactRows = [
  {
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    label: '+90 212 291 47 00',
    href: 'tel:+902122914700',
  },
  {
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    label: 'info@celikdogan.av.tr',
    href: 'mailto:info@celikdogan.av.tr',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    label: 'Pzt–Cum, 09:00–18:00',
    href: undefined,
  },
  {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    label: '7/24 Acil Hukuki Destek Hattı',
    href: undefined,
    prefix: 'Acil',
  },
] as const

function ContactIcon({ path }: { path: string }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c5a572"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={path} />
    </svg>
  )
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
        border: '2px solid rgba(250,250,248,0.3)',
        borderTopColor: '#fafaf8',
        borderRadius: '50%',
      }}
    />
  )
}

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>(initialForm)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (submitState !== 'done') return
    const timer = window.setTimeout(() => setSubmitState('idle'), 2000)
    return () => window.clearTimeout(timer)
  }, [submitState])

  const inputStyle: CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #e5e0d8',
    padding: '14px 0',
    fontSize: 14,
    color: '#1a1a2e',
    width: '100%',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = '#c5a572'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = '#e5e0d8'
  }

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (submitState !== 'idle') return
    setSubmitState('loading')
    window.setTimeout(() => {
      setSubmitState('done')
      setFormState(initialForm)
    }, 1500)
  }

  return (
    <section
      id="contact"
      style={{
        background: '#fafaf8',
        padding: isMobile ? '80px 24px' : '120px 48px',
      }}
    >
      <div style={{ position: 'relative', marginBottom: 64 }}>
        <p
          style={{
            fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
            fontSize: isMobile ? 80 : 120,
            fontWeight: 400,
            color: 'rgba(26,58,92,0.06)',
            lineHeight: 1,
            position: 'absolute',
            top: isMobile ? -24 : -40,
            left: 0,
            margin: 0,
            userSelect: 'none',
          }}
        >
          05
        </p>
        <p
          style={{
            fontSize: 11,
            letterSpacing: 3,
            color: '#c5a572',
            position: 'relative',
            zIndex: 1,
            margin: '0 0 8px',
            textTransform: 'uppercase',
          }}
        >
          İletişim
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            color: '#1a3a5c',
            position: 'relative',
            zIndex: 1,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Bugün Bir Adım Atın
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
          gap: isMobile ? 48 : 80,
        }}
      >
        {/* Left column */}
        <div>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: '#c5a572',
              margin: '0 0 16px',
              textTransform: 'uppercase',
            }}
          >
            Ofisimiz
          </p>
          <address
            style={{
              fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
              fontSize: 18,
              fontStyle: 'normal',
              color: '#1a1a2e',
              lineHeight: 1.7,
              margin: '0 0 32px',
            }}
          >
            Abdi İpekçi Cad. No:45 Kat:8
            <br />
            Nişantaşı, İstanbul 34367
          </address>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
            {contactRows.map((row) => (
              <div
                key={row.label}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}
              >
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <ContactIcon path={row.icon} />
                </div>
                <div>
                  {'prefix' in row && row.prefix && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: 10,
                        letterSpacing: 2,
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        marginBottom: 2,
                      }}
                    >
                      {row.prefix}
                    </span>
                  )}
                  {row.href ? (
                    <a
                      href={row.href}
                      style={{
                        fontSize: 14,
                        color: '#1a1a2e',
                        textDecoration: 'none',
                        lineHeight: 1.5,
                      }}
                    >
                      {row.label}
                    </a>
                  ) : (
                    <span style={{ fontSize: 14, color: '#1a1a2e', lineHeight: 1.5 }}>
                      {row.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <iframe
            title="Çelik & Doğan Hukuk Bürosu konum haritası"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.234!2d28.9933!3d41.0478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a0ef87e235%3A0x5d5e1b2a2e1c6c2c!2zTmnFn2FudGHFn8SxLCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1234567890"
            width="100%"
            height={200}
            style={{
              border: 'none',
              borderRadius: 2,
              filter: 'grayscale(20%)',
              display: 'block',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Right column — form without <form> tag */}
        <div>
          <input
            type="text"
            placeholder="Ad Soyad"
            value={formState.name}
            onChange={(e) => updateField('name', e.target.value)}
            style={{ ...inputStyle, marginBottom: 24 }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 0 : 32,
              marginBottom: 24,
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={(e) => updateField('email', e.target.value)}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="tel"
              placeholder="Telefon"
              value={formState.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              style={{ ...inputStyle, marginTop: isMobile ? 24 : 0 }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={{ position: 'relative', marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => window.setTimeout(() => setDropdownOpen(false), 150)}
              style={{
                ...inputStyle,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ color: formState.subject ? '#1a1a2e' : '#6b7280' }}>
                {formState.subject}
              </span>
              <span style={{ fontSize: 10, color: '#6b7280' }}>▼</span>
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '100%',
                  background: '#fafaf8',
                  border: '1px solid #e5e0d8',
                  borderRadius: 2,
                  zIndex: 10,
                  boxShadow: '0 4px 16px rgba(26,26,46,0.08)',
                }}
              >
                {subjectOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      updateField('subject', opt)
                      setDropdownOpen(false)
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 16px',
                      background: formState.subject === opt ? '#f0ece6' : 'none',
                      border: 'none',
                      color: '#1a1a2e',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 14,
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <textarea
            placeholder="Mesajınız"
            rows={5}
            value={formState.message}
            onChange={(e) => updateField('message', e.target.value)}
            style={{
              ...inputStyle,
              minHeight: 120,
              resize: 'vertical',
              marginBottom: 32,
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={submitState === 'loading'}
              whileHover={submitState === 'idle' ? { scale: 1.02 } : {}}
              whileTap={submitState === 'idle' ? { scale: 0.98 } : {}}
              style={{
                padding: '16px 32px',
                background:
                  submitState === 'done' ? '#6b4c3b' : submitState === 'loading' ? '#1a3a5c' : '#1a3a5c',
                color: '#fafaf8',
                fontSize: 13,
                letterSpacing: 1,
                border: 'none',
                borderRadius: 2,
                cursor: submitState === 'loading' ? 'wait' : 'pointer',
                fontFamily: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                minWidth: 180,
                transition: 'background 0.3s ease',
              }}
            >
              {submitState === 'idle' && 'Mesaj Gönder →'}
              {submitState === 'loading' && <Spinner />}
              {submitState === 'done' && '✓ Mesajınız İletildi'}
            </motion.button>

            <p
              style={{
                fontSize: 11,
                color: '#6b7280',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 280,
              }}
            >
              Bilgileriniz yalnızca talebinize yanıt vermek amacıyla kullanılır. Üçüncü
              taraflarla paylaşılmaz.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
