'use client'

import { useRef, useState } from 'react'
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

export function EcommerceReviews() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const reviews = [
    {
      quote:
        'Wabi Vazoyu aldım, beklentimin çok üzerinde çıktı.\nRengi ve formu fotoğraftan çok daha güzel.',
      initials: 'AK',
      name: 'Ayşe K.',
      city: 'İstanbul',
    },
    {
      quote:
        'Sabah Kupası ile güne başlamak artık çok daha keyifli.\nEl yapımı olduğunu her dokunuşta hissediyorsunuz.',
      initials: 'ZD',
      name: 'Zeynep D.',
      city: 'Ankara',
    },
    {
      quote:
        'Hediye olarak aldım, alan çok beğendi. Ambalajı da\nçok şıktı. Kesinlikle tekrar alacağım.',
      initials: 'MB',
      name: 'Mert B.',
      city: 'İzmir',
    },
  ] as const

  return (
    <section ref={ref} style={{ background: colors.bg, padding: '100px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              color: colors.gold,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            MÜŞTERİ DENEYİMLERİ
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
            Ellerimizden evinize.
          </h2>
          <div
            aria-hidden
            style={{
              width: 40,
              height: 1,
              background: colors.gold,
              opacity: 0.5,
              margin: '20px auto 0',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {reviews.map((r, i) => {
            const isHovered = hoveredIndex === i

            return (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: '#fff',
                  borderRadius: 4,
                  padding: 36,
                  border: `1px solid ${colors.border}`,
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isHovered ? '0 12px 32px rgba(44,24,16,0.08)' : 'none',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 64,
                    color: colors.goldLight,
                    lineHeight: 0.8,
                    marginBottom: 16,
                  }}
                  aria-hidden
                >
                  &quot;
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontStyle: 'italic',
                    fontSize: 18,
                    color: colors.dark,
                    lineHeight: 1.7,
                    marginBottom: 24,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {r.quote}
                </div>
                <div
                  aria-hidden
                  style={{
                    width: 24,
                    height: 1,
                    background: colors.gold,
                    opacity: 0.4,
                    marginBottom: 20,
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: colors.goldLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontSize: 16,
                        color: colors.muted,
                      }}
                    >
                      {r.initials}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 13,
                        fontWeight: 500,
                        color: colors.dark,
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 12,
                        color: colors.gold,
                        marginTop: 2,
                      }}
                    >
                      {r.city}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

