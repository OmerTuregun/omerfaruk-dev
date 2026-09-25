'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    delay: 0.3,
    style: {
      position: 'absolute' as const,
      top: '10%',
      left: '8%',
      width: '58%',
      aspectRatio: '3/4',
      objectFit: 'cover' as const,
      boxShadow: '0 8px 32px rgba(26,58,92,0.12)',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=400&q=80',
    delay: 0.5,
    style: {
      position: 'absolute' as const,
      top: '18%',
      right: '6%',
      width: '38%',
      aspectRatio: '1/1',
      objectFit: 'cover' as const,
      boxShadow: '0 8px 32px rgba(26,58,92,0.12)',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=400&q=80',
    delay: 0.7,
    style: {
      position: 'absolute' as const,
      bottom: '8%',
      right: '12%',
      width: '45%',
      aspectRatio: '4/3',
      objectFit: 'cover' as const,
      boxShadow: '0 8px 32px rgba(26,58,92,0.12)',
    },
  },
]

const titleLines = [
  { text: 'Hukukta', italic: true, weight: 400, color: '#1a3a5c', delay: 0 },
  { text: 'Güvenilir', italic: false, weight: 700, color: '#1a3a5c', delay: 0.12 },
  { text: 'Bir Ortak.', italic: true, weight: 400, color: '#6b4c3b', delay: 0.24 },
] as const

const heroStats = [
  { value: '25+', label: 'Yıl' },
  { value: '2.400+', label: 'Dava' },
  { value: '%94', label: 'Başarı' },
] as const

type HeroSectionProps = {
  setAppointmentOpen: (v: boolean) => void
}

function scrollToPracticeAreas() {
  document.getElementById('practice-areas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HeroSection({ setAppointmentOpen }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const updateMobile = () => setIsMobile(mq.matches)
    updateMobile()
    mq.addEventListener('change', updateMobile)
    return () => mq.removeEventListener('change', updateMobile)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        background: '#fafaf8',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '120px 24px 64px' : '140px 64px 80px 48px',
          borderRight: isMobile ? 'none' : '1px solid #e5e0d8',
          borderBottom: isMobile ? '1px solid #e5e0d8' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 40,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3v18M6 7h12M4 7l2-4h12l2 4M8 7v2a4 4 0 008 0V7"
              stroke="#c5a572"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: 11,
              letterSpacing: '3px',
              color: '#6b7280',
              fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
            }}
          >
            1999&apos;dan Bu Yana İstanbul&apos;da
          </span>
        </div>

        {titleLines.map((line) => (
          <div key={line.text} style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: line.delay,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
                fontSize: 'clamp(44px, 5.5vw, 72px)',
                fontWeight: line.weight,
                fontStyle: line.italic ? 'italic' : 'normal',
                color: line.color,
                lineHeight: 1.05,
              }}
            >
              {line.text}
            </motion.div>
          </div>
        ))}

        <p
          style={{
            marginTop: 32,
            maxWidth: 420,
            fontSize: 15,
            lineHeight: 1.8,
            color: '#6b7280',
            fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
          }}
        >
          25 yılı aşkın deneyimimiz ve 2.400&apos;den fazla tamamlanan davamızla ticaret,
          gayrimenkul, iş ve ceza hukuku başta olmak üzere tüm hukuki ihtiyaçlarınızda
          yanınızdayız.
        </p>

        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => setAppointmentOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#15304d'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1a3a5c'
            }}
            style={{
              background: '#1a3a5c',
              color: '#fafaf8',
              padding: '14px 32px',
              fontSize: 13,
              letterSpacing: '1px',
              border: 'none',
              borderRadius: 2,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.3s ease',
            }}
          >
            Ücretsiz Danışma Al
          </button>
          <button
            type="button"
            onClick={scrollToPracticeAreas}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#1a3a5c'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e0d8'
            }}
            style={{
              background: 'transparent',
              border: '1px solid #e5e0d8',
              color: '#1a3a5c',
              padding: '14px 24px',
              fontSize: 13,
              letterSpacing: '1px',
              borderRadius: 2,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'border-color 0.3s ease',
            }}
          >
            Uzmanlık Alanları →
          </button>
        </div>

        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid #e5e0d8',
            display: 'flex',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
                  color: '#1a3a5c',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#6b7280',
                  letterSpacing: '1px',
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? 480 : 'auto',
        }}
      >
        {heroImages.map((img) => (
          <motion.img
            key={img.src}
            src={img.src}
            alt=""
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: img.delay, ease: [0.76, 0, 0.24, 1] }}
            style={{
              ...img.style,
              borderRadius: 2,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '4%',
            background: '#1a3a5c',
            color: '#fafaf8',
            padding: '16px 20px',
            borderRadius: 4,
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '2px',
              color: '#c5a572',
            }}
          >
            İstanbul Barosu
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Tescilli Hukuk Bürosu
          </div>
        </motion.div>
      </div>
    </section>
  )
}
