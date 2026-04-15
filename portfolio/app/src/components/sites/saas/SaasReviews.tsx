'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const colors = {
  primary: '#4f46e5',
  dark: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  text: '#374151',
  surface: '#f8fafc',
} as const

const ease = [0.22, 1, 0.36, 1] as const

const reviews = [
  {
    quote:
      "Datawise'ı kullanmaya başladıktan sonra hangi ürünlerimizin gerçekten para kazandırdığını ilk kez net olarak gördük. 3 ayda gelirlerimiz %28 arttı.",
    initials: 'AK',
    name: 'Ahmet Kaya',
    role: 'CEO, TechCorp',
  },
  {
    quote:
      'Kurulum gerçekten 5 dakika sürdü. Stripe entegrasyonu mükemmel çalışıyor, raporlar otomatik geliyor. Artık pazartesi toplantılarımız çok daha verimli.',
    initials: 'ZD',
    name: 'Zeynep Demir',
    role: 'COO, StartupHub',
  },
  {
    quote:
      'Uyarı sistemi sayesinde büyük bir müşteri kaybının önüne geçtik. Churn oranımız 6 ayda yarıya düştü. Kesinlikle tavsiye ediyorum.',
    initials: 'MB',
    name: 'Mert Bilgin',
    role: 'Growth Lead, SaasBase',
  },
] as const

export function SaasReviews() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      id="yorumlar"
      style={{
        background: colors.surface,
        borderTop: `1px solid ${colors.border}`,
        padding: '100px 60px',
        maxWidth: 1200,
        margin: '0 auto',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <span
          style={{
            fontSize: 12,
            color: colors.primary,
            background: '#eff6ff',
            border: '1px solid #c7d2fe',
            borderRadius: 20,
            padding: '4px 14px',
            display: 'inline-block',
            marginBottom: 16,
          }}
        >
          YORUMLAR
        </span>
        <h2
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.dark,
            margin: 0,
          }}
        >
          Müşterilerimiz ne diyor?
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
      >
        {reviews.map((r, index) => (
          <motion.article
            key={r.name}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.12, ease }}
            style={{
              background: '#fff',
              border: `1px solid ${colors.border}`,
              borderRadius: 16,
              padding: 32,
              transform: hoveredIndex === index ? 'translateY(-6px)' : 'translateY(0)',
              borderColor: hoveredIndex === index ? '#c7d2fe' : '#e2e8f0',
              transition: 'transform 0.25s ease, border-color 0.25s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 4,
                marginBottom: 16,
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  style={{ fontSize: 16, color: '#f59e0b' }}
                  aria-hidden
                >
                  ★
                </span>
              ))}
            </div>
            <p
              style={{
                fontSize: 15,
                color: colors.text,
                lineHeight: 1.7,
                margin: '0 0 24px',
                fontStyle: 'italic',
              }}
            >
              {r.quote}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.primary,
                  flexShrink: 0,
                }}
              >
                {r.initials}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.dark,
                  }}
                >
                  {r.name}
                </div>
                <div style={{ fontSize: 13, color: colors.muted }}>{r.role}</div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
