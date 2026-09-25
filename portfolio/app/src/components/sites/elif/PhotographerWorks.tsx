'use client'

import { useState, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { works, type Work } from '@/lib/photographer-data'

import { PhotoLightbox, type PhotoLightboxPhoto } from './PhotoLightbox'

const workImages: Record<string, string> = {
  w1: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
  w2: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80',
  w3: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  w4: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80',
  w5: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
  w6: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
}

const lightboxPhotos: PhotoLightboxPhoto[] = works.map((w) => ({
  src: workImages[w.id]!,
  title: w.title,
  category: w.category,
  year: w.year,
}))

const categories = ['TÜMÜ', 'DÜĞÜN', 'PORTRE', 'DOĞA', 'KOMERSİYEL', 'EDİTORYAL'] as const

function getGridStyle(
  idx: number,
  size: Work['size'],
  filtered: Work[],
): CSSProperties {
  const hasLargeInFilter = filtered.some((w) => w.size === 'large')
  const heroAtFirst =
    filtered[0]?.size === 'large' || !hasLargeInFilter

  if (idx === 0 && (size === 'large' || !hasLargeInFilter)) {
    return { gridColumn: '1 / 6', gridRow: '1 / 3' }
  }

  const smallIdx = heroAtFirst ? idx - 1 : idx
  const positions: CSSProperties[] = [
    { gridColumn: '6 / 9', gridRow: '1 / 2' },
    { gridColumn: '9 / 13', gridRow: '1 / 2' },
    { gridColumn: '6 / 9', gridRow: '2 / 3' },
    { gridColumn: '9 / 13', gridRow: '2 / 3' },
    { gridColumn: '1 / 5', gridRow: '3 / 4' },
    { gridColumn: '5 / 9', gridRow: '3 / 4' },
    { gridColumn: '9 / 13', gridRow: '3 / 4' },
  ]
  return positions[smallIdx] ?? {}
}

function isHeroCard(idx: number, work: Work, filtered: Work[]): boolean {
  const hasLargeInFilter = filtered.some((w) => w.size === 'large')
  return idx === 0 && (work.size === 'large' || !hasLargeInFilter)
}

export function PhotographerWorks() {
  const [hoveredWork, setHoveredWork] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('TÜMÜ')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filtered =
    activeFilter === 'TÜMÜ'
      ? works
      : works.filter((w) => w.category === activeFilter)

  return (
    <section
      id="portfolyo"
      style={{ padding: '80px 60px', maxWidth: 1400, margin: '0 auto' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'flex-end',
          marginBottom: 64,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 10,
              color: '#e8b4b8',
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            01 — SEÇİLMİŞ ÇALIŞMALAR
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontSize: 48,
              fontWeight: 400,
              color: '#111',
              margin: 0,
            }}
          >
            Seçilmiş{' '}
            <span style={{ fontStyle: 'italic' }}>kareler.</span>
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 24,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => {
            const selected = activeFilter === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: 12,
                  color: selected ? '#c4848a' : '#bbb',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: selected
                    ? '1px solid #e8b4b8'
                    : '1px solid transparent',
                  padding: '0 0 2px 0',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 12,
        }}
      >
        <AnimatePresence>
          {filtered.map((work, idx) => (
            <motion.div
              key={work.id}
              data-photo="true"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                height: isHeroCard(idx, work, filtered) ? 520 : 250,
                background: work.color,
                ...getGridStyle(idx, work.size, filtered),
              }}
              onClick={() => {
                setLightboxIndex(works.findIndex((w) => w.id === work.id))
                setLightboxOpen(true)
              }}
              onMouseEnter={() => setHoveredWork(work.id)}
              onMouseLeave={() => setHoveredWork(null)}
            >
              <img
                src={workImages[work.id]}
                alt={work.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(245,232,234,0.92)',
                  opacity: hoveredWork === work.id ? 1 : 0,
                  transition: 'opacity 0.35s',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontSize: 10,
                      color: '#c4848a',
                      letterSpacing: 2,
                    }}
                  >
                    {work.category}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                      fontStyle: 'italic',
                      fontSize: 20,
                      color: '#111',
                      marginTop: 8,
                    }}
                  >
                    {work.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontSize: 11,
                      color: '#bbb',
                      marginTop: 4,
                    }}
                  >
                    {work.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <PhotoLightbox
            photos={lightboxPhotos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
