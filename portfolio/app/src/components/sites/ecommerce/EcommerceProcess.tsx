'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const colors = {
  bg: '#faf8f5',
  bgAlt: '#f5f0eb',
  bgDark: '#f0ebe4',
  dark: '#2c1810',
  brown: '#5c3d2e',
  gold: '#c4a882',
  goldLight: '#e8ddd0',
  muted: '#8c7b6e',
  border: '#e8e0d8',
  white: '#ffffff',
} as const

export function EcommerceProcess() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      n: '01',
      title: 'Kil Seçimi',
      desc:
        "Türkiye'nin farklı bölgelerinden getirilen doğal killer,\n" +
        'el ile test edilerek seçilir. Her kil farklı bir his, farklı bir karakter taşır.',
    },
    {
      n: '02',
      title: 'El Şekillendirme',
      desc:
        'Çömlek çarkında veya el ile şekillendirilen her parça,\n' +
        "ustanın elleriyle hayat bulur. Hiçbir parça diğeriyle aynı değildir.",
    },
    {
      n: '03',
      title: 'Fırın & Sır',
      desc:
        "1260°C'de fırınlanan parçalar, doğal sırlarla kaplanır.\n" +
        '48 saatlik süreç sonunda benzersiz renk ve doku ortaya çıkar.',
    },
  ] as const

  return (
    <section
      ref={ref}
      id="surec"
      style={{
        background: colors.bgDark,
        borderTop: `1px solid ${colors.border}`,
        padding: '100px 60px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              color: colors.gold,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            NASIL YAPILIYOR
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 48,
              color: colors.dark,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Toprağından sofranıza.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.65, delay: i * 0.2 }}
              style={{ textAlign: 'center' }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 80,
                  fontWeight: 400,
                  color: 'rgba(196,168,130,0.3)',
                  lineHeight: 1,
                  marginBottom: 24,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontStyle: 'italic',
                  fontSize: 28,
                  color: colors.dark,
                  marginBottom: 16,
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 14,
                  color: colors.muted,
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {s.desc}
              </div>
              <div
                aria-hidden
                style={{
                  width: 32,
                  height: 1,
                  background: colors.gold,
                  opacity: 0.5,
                  margin: '24px auto 0',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

