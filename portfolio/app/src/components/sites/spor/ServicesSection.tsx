'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { services } from '@/lib/spor-data'

type ServicesSectionProps = {
  setContactOpen: (v: boolean) => void
}

export function ServicesSection({ setContactOpen }: ServicesSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      id="services"
      style={{
        background: '#080808',
        padding: '120px 48px',
      }}
    >
      <div style={{ marginBottom: 64 }}>
        <p
          style={{
            fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
            fontSize: 10,
            letterSpacing: 4,
            color: '#39ff14',
            marginBottom: 12,
            marginTop: 0,
          }}
        >
          HİZMETLER
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
            fontSize: 'clamp(40px, 5vw, 64px)',
            color: '#ffffff',
            margin: 0,
            lineHeight: 0.9,
          }}
        >
          SENİN İÇİN
          <br />
          DOĞRU PROGRAM
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 1,
          background: '#1f1f1f',
        }}
      >
        {services.map((service, index) => {
          const num = String(index + 1).padStart(2, '0')
          const isHovered = hoveredId === service.id

          return (
            <motion.div
              key={service.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: '#080808',
                padding: '40px 36px',
                position: 'relative',
                overflow: 'hidden',
                border: isHovered
                  ? '1px solid rgba(57,255,20,0.3)'
                  : '1px solid transparent',
                boxShadow: isHovered
                  ? 'inset 0 0 40px rgba(57,255,20,0.03)'
                  : 'none',
              }}
            >
              {service.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#39ff14',
                    color: '#080808',
                    fontSize: 9,
                    letterSpacing: 2,
                    fontWeight: 700,
                    padding: '6px 16px',
                    fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                  }}
                >
                  EN POPÜLER
                </span>
              )}

              <span
                style={{
                  fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                  fontSize: 80,
                  color: 'rgba(57,255,20,0.06)',
                  position: 'absolute',
                  top: 16,
                  right: 24,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                {num}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                  fontSize: 32,
                  color: '#ffffff',
                  marginBottom: 4,
                  marginTop: 0,
                  position: 'relative',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                  fontSize: 11,
                  letterSpacing: 2,
                  color: '#39ff14',
                  marginBottom: 20,
                  marginTop: 0,
                }}
              >
                {service.subtitle}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: '#666666',
                  marginBottom: 24,
                  marginTop: 0,
                }}
              >
                {service.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {service.features.map((feature) => (
                  <p
                    key={feature}
                    style={{
                      fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                      fontSize: 13,
                      color: '#999999',
                      margin: 0,
                    }}
                  >
                    <span style={{ color: '#39ff14', fontSize: 12 }}>✓ </span>
                    {feature}
                  </p>
                ))}
              </div>

              <div
                style={{
                  height: 1,
                  background: '#1f1f1f',
                  margin: '24px 0',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p style={{ margin: 0 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                      fontSize: 36,
                      color: '#39ff14',
                    }}
                  >
                    {service.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                      fontSize: 12,
                      color: '#666666',
                    }}
                  >
                    /{service.duration}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #1f1f1f',
                    color: '#ffffff',
                    padding: '10px 20px',
                    fontSize: 11,
                    letterSpacing: 2,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#39ff14'
                    e.currentTarget.style.color = '#39ff14'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1f1f1f'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                >
                  BAŞVUR →
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
