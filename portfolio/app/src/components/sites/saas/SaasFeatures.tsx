'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const colors = {
  primary: '#4f46e5',
  dark: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  white: '#ffffff',
} as const

const ease = [0.22, 1, 0.36, 1] as const

const features = [
  {
    title: 'Gerçek Zamanlı Analitik',
    description:
      'Satış, kullanıcı davranışı ve gelir verilerinizi anlık olarak takip edin. Gecikme yok, her şey canlı.',
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.primary}
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
  {
    title: 'Akıllı Uyarı Sistemi',
    description:
      'Belirlediğiniz eşik değerleri aşıldığında anında e-posta veya SMS ile haberdar olun. Hiçbir anormal durumu kaçırmayın.',
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.primary}
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        />
      </svg>
    ),
  },
  {
    title: 'Otomatik Raporlama',
    description:
      'Haftalık ve aylık raporlarınız otomatik olarak oluşturulur ve e-postanıza gönderilir. Siz sadece kararlarınıza odaklanın.',
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.primary}
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
] as const

export function SaasFeatures() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      id="ozellikler"
      style={{
        padding: '100px 60px',
        maxWidth: 1200,
        margin: '0 auto',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
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
          ÖZELLİKLER
        </span>
        <h2
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.dark,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          İşinizi büyütmek için{'\n'}ihtiyacınız olan her şey.
        </h2>
        <p
          style={{
            fontSize: 17,
            color: colors.muted,
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          Tek platformda analitik, raporlama ve uyarı yönetimi.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32,
        }}
      >
        {features.map((f, index) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: index * 0.12, ease }}
          >
            <article
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                border: `1px solid ${
                  hoveredIndex === index ? '#c7d2fe' : colors.border
                }`,
                borderRadius: 16,
                padding: 36,
                background: colors.white,
                transform:
                  hoveredIndex === index ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                height: '100%',
                boxSizing: 'border-box',
              }}
            >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              {f.icon}
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: colors.dark,
                margin: '0 0 10px',
              }}
            >
              {f.title}
            </h3>
            <p
              style={{
                fontSize: 15,
                color: colors.muted,
                lineHeight: 1.7,
                margin: '0 0 24px',
              }}
            >
              {f.description}
            </p>
            <span
              style={{
                fontSize: 14,
                color: colors.primary,
                cursor: 'pointer',
                opacity: hoveredIndex === index ? 1 : 0,
                transform:
                  hoveredIndex === index
                    ? 'translateX(0)'
                    : 'translateX(-8px)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                display: 'inline-block',
              }}
            >
              Daha fazla →
            </span>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
