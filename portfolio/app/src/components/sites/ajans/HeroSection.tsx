'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

type HeroSectionProps = {
  setShowreel: (v: boolean) => void
}

const heroImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1560439514-4e964d992605?auto=format&fit=crop&w=1920&q=80',
] as const

const titleLines = [
  { text: 'We make', italic: false, delay: 0 },
  { text: 'work that', italic: false, delay: 0.1 },
  { text: 'matters.', italic: true, delay: 0.2 },
] as const

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '3', label: 'Cannes Lions' },
  { value: '40+', label: 'Countries Reached' },
] as const

function scrollToWorks() {
  document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection({ setShowreel }: HeroSectionProps) {
  const [imgIndex, setImgIndex] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true })

  useEffect(() => {
    const id = window.setInterval(() => {
      setImgIndex((i) => (i + 1) % heroImages.length)
    }, 3000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background image carousel */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={imgIndex}
            src={heroImages[imgIndex]}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(105deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.75) 100%)',
        }}
      />

      {/* Left vertical red line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '20%',
          bottom: '20%',
          width: 2,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, #ff3b00, transparent)',
        }}
      />

      {/* 2-column grid */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100vh',
        }}
      >
        {/* Left column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '120px 48px 64px 48px',
          }}
        >
          <p
            style={{
              position: 'absolute',
              top: 120,
              left: 48,
              fontSize: 11,
              letterSpacing: 3,
              color: 'rgba(240,240,240,0.5)',
              borderLeft: '2px solid #ff3b00',
              paddingLeft: 12,
              margin: 0,
            }}
          >
            Creative Agency
          </p>

          <motion.div>
            {titleLines.map((line) => (
              <motion.div key={line.text} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: line.delay,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  style={{
                    fontSize: 'clamp(52px, 8vw, 96px)',
                    fontWeight: 600,
                    lineHeight: 0.95,
                    color: line.italic ? '#ff3b00' : '#f0f0f0',
                    fontStyle: line.italic ? 'italic' : 'normal',
                  }}
                >
                  {line.text}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div
            style={{
              marginTop: 32,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <motion.button
              type="button"
              onClick={() => setShowreel(true)}
              whileHover={{ background: 'rgba(240,240,240,0.08)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1px solid rgba(240,240,240,0.25)',
                padding: '14px 28px',
                fontSize: 12,
                letterSpacing: 2,
                color: '#f0f0f0',
                borderRadius: 2,
                cursor: 'pointer',
                background: 'transparent',
                fontFamily: 'inherit',
              }}
            >
              <svg width={8} height={8} viewBox="0 0 8 8" aria-hidden>
                <polygon points="0,0 8,4 0,8" fill="#ff3b00" />
              </svg>
              Play Showreel
            </motion.button>

            <button
              type="button"
              onClick={scrollToWorks}
              style={{
                border: 'none',
                padding: '14px 0',
                fontSize: 12,
                letterSpacing: 2,
                color: 'rgba(240,240,240,0.4)',
                cursor: 'pointer',
                background: 'transparent',
                fontFamily: 'inherit',
              }}
            >
              View Work ↓
            </button>
          </div>
        </div>

        {/* Right column */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '120px 48px 64px 48px',
            borderLeft: '1px solid rgba(240,240,240,0.06)',
          }}
        >
          <motion.div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: 'rgba(240,240,240,0.4)',
                margin: 0,
                textAlign: 'right',
              }}
            >
              Est. 2016 · Istanbul
            </p>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 6,
              }}
            >
              {heroImages.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background:
                      i === imgIndex ? '#ff3b00' : 'rgba(240,240,240,0.2)',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <div
            ref={statsRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              margin: 'auto 0',
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 24 }}
                animate={
                  statsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }
                }
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  background: 'rgba(240,240,240,0.03)',
                  border: '1px solid rgba(240,240,240,0.06)',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: '#f0f0f0',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: 2,
                    color: 'rgba(240,240,240,0.4)',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontSize: 10,
              letterSpacing: 3,
              color: 'rgba(240,240,240,0.3)',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              margin: 0,
              alignSelf: 'flex-end',
            }}
          >
            ↓ Scroll
          </motion.p>
        </div>
      </div>
    </section>
  )
}
