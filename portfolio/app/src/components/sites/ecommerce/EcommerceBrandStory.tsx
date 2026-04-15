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

export function EcommerceBrandStory() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      id="hikaye"
      style={{ background: colors.bg, padding: '100px 60px' }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 100,
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', height: 560 }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 40,
              bottom: 40,
              background: colors.goldLight,
              borderRadius: 4,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1676125105332-608345abe20e?w=700&q=80"
              alt="Atölye"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4,
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                right: 24,
                fontFamily: 'var(--font-cormorant), serif',
                fontStyle: 'italic',
                fontSize: 14,
                color: 'rgba(92,61,46,0.2)',
                letterSpacing: 3,
              }}
            >
              TOPRAK STUDIO
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 200,
              height: 200,
              background: '#d4c4b0',
              borderRadius: 4,
              border: `4px solid ${colors.bg}`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1607556671927-78a6605e290b?w=700&q=80"
              alt="Seramik detay"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4,
                display: 'block',
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              color: colors.gold,
              letterSpacing: 3,
              marginBottom: 20,
            }}
          >
            HİKAYEMİZ
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 48,
              fontWeight: 400,
              color: colors.dark,
              fontStyle: 'italic',
              lineHeight: 1.15,
              margin: '0 0 28px',
              whiteSpace: 'pre-line',
            }}
          >
            Toprağın sesini{'\n'}duyuyoruz.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 15,
              color: colors.muted,
              lineHeight: 1.8,
              margin: '0 0 20px',
              whiteSpace: 'pre-line',
            }}
          >
            Her sabah atölyemizde toprağı yoğurmaya başlıyoruz.{'\n'}
            Ellerimiz şekil verirken, doğanın ritmine uyum sağlıyoruz.{'\n'}
            Mükemmel olmayan, ama tam da bu yüzden eşsiz parçalar çıkıyor ortaya.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 15,
              color: colors.muted,
              lineHeight: 1.8,
              margin: '0 0 40px',
              whiteSpace: 'pre-line',
            }}
          >
            2018&apos;den bu yana İstanbul&apos;da üretiyoruz. Her parça numaralanmış,{'\n'}
            her parça benzersiz. Evinize aldığınız nesne, bizim ellerimizin izini taşıyor.
          </p>

          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { value: '2018', label: 'Kuruluş' },
              { value: '1.200+', label: 'Parça' },
              { value: '48', label: 'Saat/Parça' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 40,
                    fontWeight: 600,
                    color: colors.dark,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 11,
                    color: colors.gold,
                    letterSpacing: 1,
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

