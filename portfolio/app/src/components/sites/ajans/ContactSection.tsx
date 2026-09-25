'use client'

import { useRef, useState, type CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'

const ctaLines = [
  { text: 'Have an idea?', italic: false },
  { text: "Let's make", italic: false },
  { text: 'it real.', italic: true },
] as const

const serviceOptions = ['Film', 'Brand', 'Motion', 'Digital', 'Other'] as const

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [service, setService] = useState<string>('Film')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'sent'>('idle')

  const handleSubmit = () => {
    if (submitState !== 'idle') return
    setSubmitState('loading')
    window.setTimeout(() => setSubmitState('sent'), 1500)
  }

  const inputStyle: CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(240,240,240,0.15)',
    padding: '16px 0',
    fontSize: 16,
    color: '#f0f0f0',
    width: '100%',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '120px 48px',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(240,240,240,0.4)',
          margin: '0 0 48px',
        }}
      >
        06 — Start a Project
      </p>

      <div style={{ marginBottom: 64 }}>
        {ctaLines.map((line, i) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.7 }}
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 600,
              lineHeight: 0.95,
              color: line.italic ? '#ff3b00' : '#f0f0f0',
              fontStyle: line.italic ? 'italic' : 'normal',
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
        <motion.div style={{ flex: '1 1 280px' }}>
          <p style={{ fontSize: 11, letterSpacing: 2, color: 'rgba(240,240,240,0.4)', margin: '0 0 8px' }}>
            New Business
          </p>
          <a
            href="mailto:hello@voidstudio.com"
            style={{ fontSize: 16, color: 'rgba(240,240,240,0.6)', textDecoration: 'none' }}
          >
            hello@voidstudio.com
          </a>

          <p
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: 'rgba(240,240,240,0.4)',
              margin: '32px 0 8px',
            }}
          >
            Press
          </p>
          <a
            href="mailto:press@voidstudio.com"
            style={{ fontSize: 16, color: 'rgba(240,240,240,0.6)', textDecoration: 'none' }}
          >
            press@voidstudio.com
          </a>

          <p style={{ fontSize: 16, color: 'rgba(240,240,240,0.6)', margin: '32px 0 0' }}>
            +90 212 000 00 00
          </p>

          {['Nişantaşı, Istanbul', 'Soho, London', 'Shibuya, Tokyo'].map((addr) => (
            <p
              key={addr}
              style={{
                fontSize: 11,
                color: 'rgba(240,240,240,0.35)',
                margin: '8px 0 0',
              }}
            >
              {addr}
            </p>
          ))}
        </motion.div>

        <motion.div style={{ flex: '1 1 360px' }}>
          <input
            type="text"
            placeholder="Name"
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#ff3b00'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(240,240,240,0.15)'
            }}
          />
          <input
            type="text"
            placeholder="Company"
            style={{ ...inputStyle, marginTop: 24 }}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#ff3b00'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(240,240,240,0.15)'
            }}
          />

          <div style={{ marginTop: 24, position: 'relative' }}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                ...inputStyle,
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{service}</span>
              <span style={{ fontSize: 12 }}>▼</span>
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '100%',
                  background: '#0f0f0f',
                  border: '1px solid rgba(240,240,240,0.1)',
                  zIndex: 10,
                }}
              >
                {serviceOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setService(opt)
                      setDropdownOpen(false)
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      color: '#f0f0f0',
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
            placeholder="Message"
            rows={4}
            style={{
              ...inputStyle,
              marginTop: 24,
              minHeight: 120,
              resize: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderBottomColor = '#ff3b00'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottomColor = 'rgba(240,240,240,0.15)'
            }}
          />

          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={submitState === 'loading'}
            whileHover={submitState === 'idle' ? { scale: 1.02 } : {}}
            whileTap={submitState === 'idle' ? { scale: 0.98 } : {}}
            style={{
              marginTop: 32,
              padding: '18px 40px',
              background: submitState === 'sent' ? '#10b981' : '#ff3b00',
              color: '#050505',
              fontSize: 14,
              letterSpacing: 2,
              fontWeight: 600,
              border: 'none',
              borderRadius: 2,
              cursor: submitState === 'loading' ? 'wait' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {submitState === 'idle' && 'Send Message →'}
            {submitState === 'loading' && 'Sending...'}
            {submitState === 'sent' && 'Message Sent ✓'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
