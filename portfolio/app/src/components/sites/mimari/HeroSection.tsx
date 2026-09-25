'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects as heroProjects } from '@/lib/mimari-data'

const bgImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80',
] as const

const titleLines = [
  { text: 'Mekânı', italic: true, weight: 300, color: '#f5f0e8', delay: 0 },
  { text: 'Hikâyeye', italic: true, weight: 300, color: '#f5f0e8', delay: 0.1 },
  {
    text: 'Dönüştürüyoruz',
    italic: false,
    weight: 500,
    color: '#b8a98a',
    delay: 0.2,
  },
] as const

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection() {
  const [imgIndex, setImgIndex] = useState(0)
  const currentProject = heroProjects[imgIndex % bgImages.length]

  useEffect(() => {
    const id = window.setInterval(() => {
      setImgIndex((i) => (i + 1) % bgImages.length)
    }, 4000)
    return () => window.clearInterval(id)
  }, [])

  const counter = String(imgIndex + 1).padStart(2, '0')

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ position: 'absolute', inset: 0 }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={imgIndex}
            src={bgImages[imgIndex]}
            alt=""
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AnimatePresence>
      </motion.div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.2) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 48,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      >
        <div
          style={{
            background: 'rgba(10,10,10,0.6)',
            border: '1px solid rgba(245,240,232,0.08)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '20px 24px',
            minWidth: 200,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <p style={{ fontSize: 14, fontWeight: 500, color: '#f5f0e8', margin: 0 }}>
                {currentProject?.title}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: 'rgba(245,240,232,0.4)',
                  margin: '4px 0 0',
                }}
              >
                {currentProject?.location}
              </p>
              <p style={{ fontSize: 11, color: '#b8a98a', margin: '8px 0 0' }}>
                {currentProject?.year}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 48px 80px',
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: 4,
              color: 'rgba(245,240,232,0.4)',
              marginBottom: 32,
              borderLeft: '1px solid #b8a98a',
              paddingLeft: 12,
            }}
          >
            MİMARLIK / İÇ MİMARİ / TASARIM
          </p>

          {titleLines.map((line) => (
            <div key={line.text} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: line.delay,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={{
                  fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                  fontSize: 'clamp(52px, 7vw, 88px)',
                  fontWeight: line.weight,
                  fontStyle: line.italic ? 'italic' : 'normal',
                  color: line.color,
                  lineHeight: 0.9,
                }}
              >
                {line.text}
              </motion.div>
            </div>
          ))}

          <div
            style={{
              marginTop: 40,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c9b99a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#b8a98a'
              }}
              style={{
                background: '#b8a98a',
                color: '#0a0a0a',
                padding: '14px 32px',
                fontSize: 12,
                letterSpacing: 2,
                fontWeight: 500,
                borderRadius: 1,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.3s ease',
              }}
            >
              Projeleri Gör
            </button>
            <button
              type="button"
              onClick={() => scrollTo('about')}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f5f0e8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(245,240,232,0.5)'
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(245,240,232,0.5)',
                fontSize: 12,
                letterSpacing: 2,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'color 0.3s ease',
              }}
            >
              Hakkımızda →
            </button>
          </div>
        </div>
      </motion.div>

      <div
        style={{
          position: 'absolute',
          right: 48,
          bottom: 80,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 24,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 80,
            fontWeight: 300,
            color: 'rgba(245,240,232,0.06)',
            lineHeight: 1,
            margin: 0,
          }}
        >
          {counter}
        </p>
        <motion.div style={{ display: 'flex', gap: 8 }}>
          {bgImages.map((_, i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: i === imgIndex ? '#b8a98a' : 'rgba(245,240,232,0.2)',
              }}
            />
          ))}
        </motion.div>
        <motion.p
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: 10,
            letterSpacing: 3,
            color: 'rgba(245,240,232,0.3)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            margin: 0,
          }}
        >
          ↓ Scroll
        </motion.p>
      </div>
    </section>
  )
}
