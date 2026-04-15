'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    title: 'Keşif',
    body: 'Projenin amacını, hedef kitlesini ve bütçesini konuşuruz.',
  },
  {
    title: 'Tasarım',
    body: 'Wireframe ve görsel konsept. Onayından sonra ilerleriz.',
  },
  {
    title: 'Geliştirme',
    body: 'Kod yazılır, her aşama seninle paylaşılır.',
  },
  {
    title: 'Test',
    body: 'Tüm cihazlarda, tüm tarayıcılarda test edilir.',
  },
  {
    title: 'Yayın',
    body: 'Domain, hosting kurulumu ve canlıya alım. Sonrası da buradayım.',
  },
] as const

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="surec"
      style={{
        background: '#fafafa',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
        padding: '100px 60px',
        scrollMarginTop: 96,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            fontSize: 13,
            color: '#bbb',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          SÜREÇ
        </div>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 500,
            letterSpacing: '-1px',
            color: '#111',
            lineHeight: 1.2,
            margin: '0 0 16px',
            whiteSpace: 'pre-line',
          }}
        >
          Baştan sona şeffaf{'\n'}bir çalışma süreci.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: '#999',
            margin: '0 0 72px',
            maxWidth: 480,
            lineHeight: 1.5,
          }}
        >
          Proje fikrinden canlı yayına — her adımda ne olduğunu bilirsin.
        </p>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 0,
          }}
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.45,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: 'relative',
                textAlign: 'center',
                padding: '0 12px',
              }}
            >
              {index < STEPS.length - 1 ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 28,
                    left: '50%',
                    right: '-50%',
                    height: 1,
                    background: '#e0e0e0',
                    zIndex: 0,
                  }}
                />
              ) : null}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border:
                    index === 0 ? '1.5px solid #111' : '1.5px solid #e0e0e0',
                  background: index === 0 ? '#111' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 500,
                  color: index === 0 ? '#fff' : '#111',
                  margin: '0 auto 20px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#111',
                  marginBottom: 8,
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: '#999',
                  lineHeight: 1.6,
                }}
              >
                {step.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
