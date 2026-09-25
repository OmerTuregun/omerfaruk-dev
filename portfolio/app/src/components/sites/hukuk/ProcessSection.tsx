'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { processSteps } from '@/lib/hukuk-data'

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="process"
      ref={ref}
      style={{
        background: '#f0ece6',
        padding: '120px 48px',
      }}
    >
      <div style={{ position: 'relative', marginBottom: 64 }}>
        <p
          style={{
            fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
            fontSize: 120,
            fontWeight: 400,
            color: 'rgba(26, 58, 92, 0.06)',
            lineHeight: 1,
            position: 'absolute',
            top: -40,
            left: 0,
            margin: 0,
          }}
        >
          02
        </p>
        <p
          style={{
            fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
            fontSize: 11,
            letterSpacing: 4,
            color: '#c5a572',
            position: 'relative',
            zIndex: 1,
            margin: '0 0 8px',
            textTransform: 'uppercase',
          }}
        >
          Nasıl Çalışıyoruz
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#1a3a5c',
            position: 'relative',
            zIndex: 1,
            margin: 0,
          }}
        >
          Şeffaf, Adım Adım Bir Süreç
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32,
        }}
      >
        {processSteps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '2px solid #c5a572',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#1a3a5c',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {i < processSteps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  left: 'calc(48px + 16px)',
                  right: -16,
                  height: 2,
                  background: '#e5e0d8',
                  zIndex: 0,
                }}
              />
            )}

            <h3
              style={{
                fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
                fontSize: 18,
                fontWeight: 400,
                color: '#1a3a5c',
                margin: '0 0 12px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
                fontSize: 14,
                lineHeight: 1.7,
                color: '#6b7280',
                margin: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
