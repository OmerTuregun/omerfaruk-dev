'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { services } from '@/lib/ajans-data'

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

export function ServicesSection() {
  const [openService, setOpenService] = useState<string | null>(null)

  return (
    <section id="services" style={{ padding: '120px 48px' }}>
      <p
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(240,240,240,0.4)',
          margin: '0 0 48px',
        }}
      >
        02 — Services
      </p>

      {services.map((service, index) => {
        const isOpen = openService === service.id
        const num = String(index + 1).padStart(2, '0')

        return (
          <div
            key={service.id}
            style={{ borderTop: '1px solid rgba(240,240,240,0.08)' }}
          >
            <button
              type="button"
              onClick={() => setOpenService(isOpen ? null : service.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(240,240,240,0.02)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
              style={{
                width: '100%',
                height: 72,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                padding: 0,
                fontFamily: 'inherit',
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: service.accent,
                  fontWeight: 600,
                  width: 48,
                  textAlign: 'left',
                }}
              >
                {num}
              </span>
              <span style={{ fontSize: 20, fontWeight: 500, color: '#f0f0f0' }}>{service.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                style={{
                  marginLeft: 'auto',
                  fontSize: 24,
                  color: service.accent,
                  lineHeight: 1,
                }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      padding: '24px 0 40px 48px',
                      display: 'flex',
                      gap: 48,
                      flexWrap: 'wrap',
                    }}
                  >
                    <p
                      style={{
                        flex: '1 1 55%',
                        fontSize: 15,
                        color: 'rgba(240,240,240,0.6)',
                        lineHeight: 1.7,
                        margin: 0,
                        maxWidth: 520,
                      }}
                    >
                      {service.description}
                    </p>
                    <ul
                      style={{
                        flex: '1 1 35%',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          style={{
                            fontSize: 13,
                            letterSpacing: 0.5,
                            color: 'rgba(240,240,240,0.7)',
                            marginBottom: 12,
                          }}
                        >
                          → {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={scrollToContact}
                      style={{
                        width: '100%',
                        marginTop: 8,
                        fontSize: 11,
                        letterSpacing: 2,
                        color: 'rgba(240,240,240,0.4)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      Detaylar →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
      <div style={{ borderTop: '1px solid rgba(240,240,240,0.08)' }} />
    </section>
  )
}
