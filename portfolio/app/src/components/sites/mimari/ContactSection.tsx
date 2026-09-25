'use client'

import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

type FormState = {
  name: string
  company: string
  email: string
  projectType: string
  message: string
}

const initialForm: FormState = {
  name: '',
  company: '',
  email: '',
  projectType: 'Konut',
  message: '',
}

const contactInfo = [
  { label: 'TELEFON', value: '+90 212 000 00 00' },
  { label: 'E-POSTA', value: 'info@formamimari.com' },
  { label: 'ADRES', value: 'Nişantaşı, İstanbul 34367' },
  { label: 'ÇALIŞMA SAATLERİ', value: 'Pzt–Cum, 09:00–18:00' },
] as const

const inputStyle: CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(245,240,232,0.1)',
  padding: '14px 0',
  fontSize: 14,
  color: '#f5f0e8',
  width: '100%',
  outline: 'none',
  marginBottom: 24,
  fontFamily: 'inherit',
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'done'>('idle')

  const handleSubmit = () => {
    if (submitState !== 'idle') return
    setSubmitState('loading')
    window.setTimeout(() => setSubmitState('done'), 1500)
  }

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section
      id="contact"
      style={{
        background: '#0f0d0a',
        padding: '120px 48px',
        minHeight: '70vh',
      }}
    >
      <motion.div style={{ position: 'relative' }}>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 120,
            fontWeight: 300,
            color: 'rgba(245,240,232,0.04)',
            lineHeight: 1,
            position: 'absolute',
            top: -40,
            left: 0,
            margin: 0,
          }}
        >
          05
        </p>
        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            color: 'rgba(245,240,232,0.4)',
            position: 'relative',
            zIndex: 1,
            margin: '0 0 8px',
          }}
        >
          İletişim
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f5f0e8',
            position: 'relative',
            zIndex: 1,
            margin: 0,
          }}
        >
          Bize ulaşın
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          marginTop: 64,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.2,
              color: '#f5f0e8',
              margin: '0 0 48px',
            }}
          >
            Bir projeniz mi var? Birlikte konuşalım.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {contactInfo.map((item) => (
              <div key={item.label}>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: 3,
                    color: 'rgba(245,240,232,0.3)',
                    marginBottom: 4,
                    display: 'block',
                  }}
                >
                  {item.label}
                </span>
                <span style={{ fontSize: 14, color: 'rgba(245,240,232,0.7)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <iframe
            title="Forma Mimarlık — Nişantaşı"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.714583374123!2d28.9904!3d41.0482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c4e6e3b!2zTmnEscWfbGFudGHFnywgMzQzNjcgxLB6bWlyL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
            width="100%"
            height={200}
            style={{
              border: 'none',
              marginTop: 40,
              filter: 'grayscale(1) invert(0.9) contrast(0.8)',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <motion.div>
          <input
            type="text"
            placeholder="Adınız"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#b8a98a'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(245,240,232,0.1)'
            }}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Şirketiniz"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#b8a98a'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(245,240,232,0.1)'
            }}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="E-posta"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#b8a98a'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(245,240,232,0.1)'
            }}
            style={inputStyle}
          />
          <select
            value={form.projectType}
            onChange={(e) => update('projectType', e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#b8a98a'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(245,240,232,0.1)'
            }}
            style={{
              ...inputStyle,
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="Konut">Konut</option>
            <option value="Ticari">Ticari</option>
            <option value="İç Mimari">İç Mimari</option>
            <option value="Diğer">Diğer</option>
          </select>
          <textarea
            placeholder="Mesajınız"
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#b8a98a'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(245,240,232,0.1)'
            }}
            style={{
              ...inputStyle,
              minHeight: 120,
              resize: 'vertical',
            }}
          />

          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={submitState === 'loading'}
            whileHover={{ scale: submitState === 'idle' ? 1.02 : 1 }}
            whileTap={{ scale: submitState === 'idle' ? 0.98 : 1 }}
            style={{
              background: '#b8a98a',
              color: '#0a0a0a',
              padding: '16px 40px',
              fontSize: 12,
              letterSpacing: 3,
              fontWeight: 500,
              border: 'none',
              cursor: submitState === 'loading' ? 'wait' : 'pointer',
              borderRadius: 1,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {submitState === 'loading' && (
              <span
                style={{
                  width: 14,
                  height: 14,
                  border: '2px solid rgba(10,10,10,0.2)',
                  borderTopColor: '#0a0a0a',
                  borderRadius: '50%',
                  animation: 'mimari-spin 0.8s linear infinite',
                }}
              />
            )}
            {submitState === 'idle' && 'Gönderin →'}
            {submitState === 'loading' && 'Gönderiliyor...'}
            {submitState === 'done' && 'Mesajınız Alındı ✓'}
          </motion.button>
          <style>{`@keyframes mimari-spin { to { transform: rotate(360deg); } }`}</style>
        </motion.div>
      </div>
    </section>
  )
}
