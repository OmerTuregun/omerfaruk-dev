'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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

export function EcommerceHero() {
  const [primaryHover, setPrimaryHover] = useState(false)

  return (
    <section
      style={{
        height: '95vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: colors.bgDark,
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 80px 0 80px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            color: colors.gold,
            letterSpacing: 3,
            marginBottom: 32,
          }}
        >
          EL YAPIMI SERAMİK & EV DEKOR
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 24,
            marginTop: 8,
          }}
        >
          <div style={{ width: 32, height: 1, background: '#c4a882', opacity: 0.5 }} />
          <span
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 22,
              color: '#c4a882',
              letterSpacing: 3,
              fontStyle: 'italic',
            }}
          >
            Toprak Studio
          </span>
          <div style={{ width: 32, height: 1, background: '#c4a882', opacity: 0.5 }} />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 80,
            fontWeight: 400,
            color: colors.dark,
            lineHeight: 1.0,
            letterSpacing: '-1px',
            margin: '0 0 24px',
            fontStyle: 'italic',
            whiteSpace: 'pre-line',
          }}
        >
          Her parça{'\n'}bir hikaye.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 15,
            color: colors.muted,
            lineHeight: 1.8,
            maxWidth: 380,
            margin: '0 0 40px',
            whiteSpace: 'pre-line',
          }}
        >
          Ellerimizle şekillendirilen, fırında olgunlaşan,{'\n'}
          evinize anlam katan objeler.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
            style={{
              background: primaryHover ? '#3d2518' : colors.dark,
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              padding: '14px 32px',
              fontSize: 13,
              letterSpacing: 1,
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
              transition: 'background 0.2s ease',
            }}
          >
            Koleksiyonu Keşfet
          </button>
          <button
            type="button"
            style={{
              background: 'transparent',
              color: colors.dark,
              border: `1px solid ${colors.gold}`,
              borderRadius: 2,
              padding: '14px 32px',
              fontSize: 13,
              letterSpacing: 1,
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Nasıl Yapılıyor?
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: colors.goldLight }} />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(196,168,130,0.15)',
            top: -100,
            right: -100,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(92,61,46,0.08)',
            bottom: 50,
            left: 50,
          }}
        />

        <div
          style={{
            width: 280,
            background: '#fff',
            borderRadius: 4,
            padding: 32,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: '#c4a882',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              Toprak Studio
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 12,
                color: '#d4c4b0',
                letterSpacing: 2,
              }}
            >
              El Yapımı
            </span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1536936812504-0e77dc3f0b40?w=700&q=80"
            alt="El yapımı seramik kase"
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 2 }}
          />
          <div
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 20,
              color: colors.dark,
              marginTop: 20,
            }}
          >
            Doğa Kasesi
          </div>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 14,
              color: colors.muted,
              marginTop: 4,
            }}
          >
            ₺380
          </div>
          <button
            type="button"
            style={{
              width: '100%',
              marginTop: 16,
              background: colors.dark,
              color: '#fff',
              border: 'none',
              padding: '10px',
              fontSize: 12,
              letterSpacing: 1,
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
              borderRadius: 2,
            }}
          >
            Sepete Ekle
          </button>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 60,
            background: '#fff',
            borderRadius: 4,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            aria-hidden
            style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 12,
              color: colors.dark,
            }}
          >
            Hızlı kargo · 2-3 iş günü
          </span>
        </div>
      </motion.div>
    </section>
  )
}

