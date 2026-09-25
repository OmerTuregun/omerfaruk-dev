'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

import { photographerInfo } from '@/lib/photographer-data'

function useCountUp(target: number, started: boolean, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])
  return count
}

const motionBlock = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7 },
} as const

export function PhotographerHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const [statsStarted, setStatsStarted] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true })
  useEffect(() => {
    if (statsInView) setStatsStarted(true)
  }, [statsInView])
  const count1 = useCountUp(340, statsStarted)
  const count2 = useCountUp(8, statsStarted)
  const count3 = useCountUp(12, statsStarted)

  const [ctaHover, setCtaHover] = useState(false)

  const locationLine = `${photographerInfo.location.toUpperCase()} · 2025`

  return (
    <section
      ref={heroRef}
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: '#fafaf8',
          padding: '80px 60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid #e8e8e4',
        }}
      >
        <motion.div
          {...motionBlock}
          transition={{ ...motionBlock.transition, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 10,
            color: '#bbb',
            letterSpacing: 3,
          }}
        >
          {locationLine}
        </motion.div>

        <motion.div
          {...motionBlock}
          transition={{ ...motionBlock.transition, delay: 0.2 }}
          style={{ paddingTop: 60 }}
        >
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 10,
              color: '#bbb',
              letterSpacing: 3,
              marginBottom: 24,
            }}
          >
            {photographerInfo.title.toUpperCase()}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 76,
              fontWeight: 400,
              letterSpacing: '-1.5px',
              lineHeight: 1.0,
              color: '#111',
              margin: 0,
              padding: 0,
              marginBottom: 32,
            }}
          >
            Işığı ve{' '}
            <span style={{ fontStyle: 'italic', color: '#e8b4b8' }}>anı</span> yakalarım.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 14,
              color: '#777',
              lineHeight: 1.9,
              maxWidth: 320,
              marginBottom: 40,
            }}
          >
            İstanbul merkezli düğün, portre ve ticari fotoğrafçı. Her kare, anın duygusunu ve hikayesini
            sonsuza taşır.
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <button
              type="button"
              style={{
                background: ctaHover ? '#c4848a' : '#111',
                color: '#fff',
                border: 'none',
                padding: '13px 32px',
                fontSize: 11,
                letterSpacing: 2,
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              onClick={() => document.getElementById('portfolyo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Portfolyoyu Gör
            </button>
            <span
              role="button"
              tabIndex={0}
              onClick={() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 11,
                color: '#888',
                letterSpacing: 1.5,
                borderBottom: '1px solid #e8b4b8',
                paddingBottom: 2,
                cursor: 'pointer',
              }}
            >
              İletişime Geç →
            </span>
          </div>
        </motion.div>

        <motion.div
          ref={statsRef}
          {...motionBlock}
          transition={{ ...motionBlock.transition, delay: 0.3 }}
          style={{ display: 'flex', gap: 32 }}
        >
          {[
            { value: `${count1}+`, label: 'PROJE' },
            { value: `${count2}yıl`, label: 'DENEYİM' },
            { value: `${count3}+`, label: 'ÖDÜL' },
          ].map((stat) => (
            <div key={stat.label} style={{ borderLeft: '2px solid #e8b4b8', paddingLeft: 16 }}>
              <div
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 28,
                  color: '#111',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 10,
                  color: '#bbb',
                  letterSpacing: 1,
                  marginTop: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100vh',
            background: 'linear-gradient(160deg, #e8e4dc, #d4cfc4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80"
            alt="Düğün fotoğrafı"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              y: imgY,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 32,
              right: 32,
              borderLeft: '2px solid rgba(232,180,184,0.5)',
              paddingLeft: 12,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 13,
                color: '#111',
                fontStyle: 'italic',
              }}
            >
              Kapadokya Serisi, 2024
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 10,
                color: '#888',
                letterSpacing: 2,
                marginTop: 4,
              }}
            >
              DOĞA · PORTRE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
