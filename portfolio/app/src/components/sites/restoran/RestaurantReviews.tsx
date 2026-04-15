'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#c8a96e" d={STAR_PATH} />
    </svg>
  )
}

const reviews = [
  {
    text: "İstanbul'da yediğim en iyi İtalyan yemeği. Osso Buco unutulmazdı, servis mükemmeldi. Marco Şef'in elinden çıkan her tabak bir sanat eseri.",
    name: 'Ayşe K.',
    platform: 'Google',
    initials: 'AK',
  },
  {
    text: 'Atmosfer inanılmaz. Mum ışığı, müzik, servis — her şey birbirine uyumlu. Yıl dönümümüzü burada kutladık, hiç pişman olmadık.',
    name: 'Mehmet & Selin T.',
    platform: 'TripAdvisor',
    initials: 'MS',
  },
  {
    text: "Tiramisu'su için bile tekrar gelmeye değer. Rezervasyon sistemi çok kolay, personel çok ilgili. Kesinlikle tavsiye ediyorum.",
    name: 'Zeynep A.',
    platform: 'Google',
    initials: 'ZA',
  },
  {
    text: "Roma'da yediğimden farksız. Gerçek İtalyan lezzetini İstanbul'da bulmak çok nadir — Marcello's bunu başarıyor.",
    name: 'Can B.',
    platform: 'Google',
    initials: 'CB',
  },
  {
    text: 'Carpaccio di Manzo muhteşemdi. Şarap listesi de çok zengin. Personelin bilgisi ve ilgisi beş yıldızı hak ediyor.',
    name: 'Deniz Y.',
    platform: 'TripAdvisor',
    initials: 'DY',
  },
  {
    text: 'Özel gün rezervasyonu için aradım, çok ilgili davrandılar. Masayı çiçeklerle süslemiş olarak bulduk. Detaylara gösterdikleri özen inanılmaz.',
    name: 'Elif M.',
    platform: 'Google',
    initials: 'EM',
  },
] as const

export function RestaurantReviews() {
  const ratingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ratingInView = useInView(ratingRef, { once: true, amount: 0.2 })
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="yorumlar"
      style={{
        background: '#faf7f2',
        padding: '100px 80px',
        scrollMarginTop: 96,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            color: '#c8a96e',
            letterSpacing: '3px',
            marginBottom: 16,
          }}
        >
          YORUMLAR
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 44,
            fontWeight: 400,
            color: '#1a1208',
            margin: 0,
          }}
        >
          Misafirlerimiz ne diyor?
        </h2>
        <div
          style={{
            width: 40,
            height: 1,
            background: '#c8a96e',
            opacity: 0.5,
            margin: '20px auto 0',
          }}
        />
      </div>

      <motion.div
        ref={ratingRef}
        initial={{ opacity: 0 }}
        animate={ratingInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 80,
            fontWeight: 400,
            color: '#1a1208',
            lineHeight: 1,
          }}
        >
          4.9
        </div>
        <div
          style={{
            display: 'flex',
            gap: 6,
            justifyContent: 'center',
            margin: '12px 0',
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={20} />
          ))}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 13,
            color: '#8b6914',
            marginTop: 8,
          }}
        >
          Google&apos;da 847 değerlendirme
        </div>
      </motion.div>

      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {reviews.map((r, index) => (
          <motion.article
            key={r.name}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 24 }}
            animate={
              cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease,
            }}
            style={{
              background: '#fff',
              borderRadius: 4,
              padding: 32,
              border: '1px solid rgba(200,169,110,0.15)',
              transform: hoveredIndex === index ? 'translateY(-6px)' : 'translateY(0)',
              transition: 'transform 0.25s ease',
              boxShadow:
                hoveredIndex === index ? '0 12px 32px rgba(200,169,110,0.12)' : 'none',
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
                <Star key={i} size={14} />
              ))}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 16,
                fontStyle: 'italic',
                color: '#1a1208',
                lineHeight: 1.7,
                margin: '0 0 24px',
              }}
            >
              {r.text}
            </p>
            <div
              style={{
                width: 24,
                height: 1,
                background: '#c8a96e',
                opacity: 0.4,
                marginBottom: 20,
              }}
            />
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
                  background: '#f0e8d8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 14,
                    color: '#8b6914',
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
                    color: '#1a1208',
                  }}
                >
                  {r.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 11,
                    color: '#c8a96e',
                    marginTop: 2,
                  }}
                >
                  {r.platform}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
