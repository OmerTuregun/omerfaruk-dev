'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const titleLines = [
  { text: 'DAHA', accent: false, delay: 0 },
  { text: 'GÜÇLÜ', accent: true, delay: 0.12 },
  { text: 'DAHA HIZLI', accent: false, delay: 0.24 },
  { text: 'DAHA İYİ.', accent: true, delay: 0.36 },
] as const

const avatars = [
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=80&h=80&fit=crop&q=80',
  'https://images.unsplash.com/photo-1594381898411-8465977d1933?w=80&h=80&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=80&h=80&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop&q=80',
] as const

const floatingStats = [
  { value: '500+', label: 'Danışan' },
  { value: '12', label: 'Yıl Deneyim' },
  { value: '%98', label: 'Memnuniyet' },
] as const

type HeroSectionProps = {
  setContactOpen: (v: boolean) => void
}

function scrollToServices() {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function WireframeSphere() {
  return (
    <motion.svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        top: '8%',
        right: '-5%',
        opacity: 0.35,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <circle cx="140" cy="140" r="120" stroke="#39ff14" strokeWidth="0.5" opacity="0.6" />
      <ellipse cx="140" cy="140" rx="120" ry="40" stroke="#39ff14" strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="140" cy="140" rx="120" ry="80" stroke="#39ff14" strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="140" cy="140" rx="40" ry="120" stroke="#39ff14" strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="140" cy="140" rx="80" ry="120" stroke="#39ff14" strokeWidth="0.5" opacity="0.4" />
      <line x1="20" y1="140" x2="260" y2="140" stroke="#39ff14" strokeWidth="0.5" opacity="0.3" />
      <line x1="140" y1="20" x2="140" y2="260" stroke="#39ff14" strokeWidth="0.5" opacity="0.3" />
      <circle cx="140" cy="20" r="3" fill="#39ff14" opacity="0.8" />
      <circle cx="260" cy="140" r="3" fill="#39ff14" opacity="0.8" />
      <circle cx="140" cy="260" r="3" fill="#39ff14" opacity="0.8" />
      <circle cx="20" cy="140" r="3" fill="#39ff14" opacity="0.8" />
    </motion.svg>
  )
}

export function HeroSection({ setContactOpen }: HeroSectionProps) {
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
        background: '#080808',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '120px 24px 64px' : '140px 64px 80px 48px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#39ff14',
              boxShadow: '0 0 8px rgba(57, 255, 20, 0.8)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#666666',
              fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
            }}
          >
            Kişisel Antrenörlük & Performans Koçluğu
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
                fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                fontSize: 'clamp(52px, 7vw, 96px)',
                color: line.accent ? '#39ff14' : '#ffffff',
                lineHeight: 0.95,
                letterSpacing: '2px',
                textShadow: line.accent ? '0 0 40px rgba(57, 255, 20, 0.3)' : 'none',
              }}
            >
              {line.text}
            </motion.div>
          </div>
        ))}

        <p
          style={{
            marginTop: 28,
            maxWidth: 440,
            fontSize: 15,
            lineHeight: 1.8,
            color: '#666666',
            fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
          }}
        >
          Bilim temelli antrenman programları, beslenme rehberliği ve 7/24 destek ile
          hedeflerine ulaş. Sınırlarını aş, potansiyelini keşfet.
        </p>

        <div
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 32px rgba(57, 255, 20, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.4)'
            }}
            style={{
              background: '#39ff14',
              color: '#080808',
              padding: '14px 32px',
              fontSize: 16,
              letterSpacing: '2px',
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.4)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            ÜCRETSİZ DANIŞMA
          </button>
          <button
            type="button"
            onClick={scrollToServices}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#39ff14'
              e.currentTarget.style.color = '#39ff14'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1f1f1f'
              e.currentTarget.style.color = '#ffffff'
            }}
            style={{
              background: 'transparent',
              border: '1px solid #1f1f1f',
              color: '#ffffff',
              padding: '14px 28px',
              fontSize: 14,
              letterSpacing: '1px',
              fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
          >
            Programları İncele →
          </button>
        </div>

        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex' }}>
            {avatars.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #080808',
                  marginLeft: i === 0 ? 0 : -12,
                  position: 'relative',
                  zIndex: avatars.length - i,
                }}
              />
            ))}
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#ffffff',
                fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
              }}
            >
              500+ danışan
            </div>
            <div
              style={{
                fontSize: 12,
                color: '#666666',
                marginTop: 2,
                fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
              }}
            >
              ★★★★★ 4.9/5 ortalama puan
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          minHeight: isMobile ? 480 : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <WireframeSphere />

        <div
          style={{
            position: 'relative',
            width: isMobile ? '85%' : '78%',
            aspectRatio: '3/4',
            maxHeight: isMobile ? 520 : 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(57,255,20,0.15) 0%, transparent 50%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #080808 0%, transparent 40%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #080808 0%, transparent 30%)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          <motion.img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b946d?w=800&q=80"
            alt="Mert Kaya — Kişisel Antrenör"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 4,
              border: '1px solid #1f1f1f',
            }}
          />

          {floatingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
              style={{
                position: 'absolute',
                background: '#111111',
                border: '1px solid #1f1f1f',
                padding: '14px 18px',
                borderRadius: 4,
                zIndex: 3,
                ...(i === 0
                  ? { top: '12%', left: '-8%' }
                  : i === 1
                    ? { bottom: '28%', right: '-6%' }
                    : { bottom: '8%', left: '4%' }),
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                  fontSize: 28,
                  color: '#39ff14',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#666666',
                  marginTop: 4,
                  fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
