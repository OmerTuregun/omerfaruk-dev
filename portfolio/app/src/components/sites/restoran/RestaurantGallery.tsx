'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&q=80',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    tall: true,
  },
] as const

const ease = [0.22, 1, 0.36, 1] as const

export function RestaurantGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, amount: 0.15 })

  useEffect(() => {
    document.body.style.overflow = selectedPhoto !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedPhoto])

  const goPrev = () => {
    if (selectedPhoto === null) return
    setSelectedPhoto(
      (selectedPhoto - 1 + photos.length) % photos.length
    )
  }

  const goNext = () => {
    if (selectedPhoto === null) return
    setSelectedPhoto((selectedPhoto + 1) % photos.length)
  }

  const lightboxItem =
    selectedPhoto === null ? undefined : photos.at(selectedPhoto)

  return (
    <section
      id="atmosfer"
      style={{
        background: '#1a1208',
        padding: '80px 80px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            color: '#c8a96e',
            letterSpacing: '3px',
            marginBottom: 16,
          }}
        >
          ATMOSFERİMİZ
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 44,
            color: '#ffffff',
            fontStyle: 'italic',
            fontWeight: 400,
            margin: 0,
          }}
        >
          Marcello&apos;s&apos;ta bir akşam.
        </h2>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
          gap: 0,
          alignItems: 'stretch',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {photos.map((photo, index) => (
          <motion.button
            key={`${photo.src}-${index}`}
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              ease,
            }}
            onClick={() => setSelectedPhoto(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              minHeight: photo.tall ? 300 : 190,
              alignSelf: 'stretch',
              overflow: 'hidden',
              borderRadius: 0,
              cursor: 'pointer',
              border: 'none',
              padding: 0,
              margin: 0,
              width: '100%',
              display: 'block',
              lineHeight: 0,
            }}
          >
            <Image
              src={photo.src}
              alt={`Marcello's atmosfer ${index + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 33vw"
              style={{ objectFit: 'cover', borderRadius: 0, display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(26,18,8,0.4)',
                opacity: hoveredIndex === index ? 1 : 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <svg
                width={32}
                height={32}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden
                style={{ color: '#c8a96e' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {lightboxItem !== undefined ? (
        <div
          role="presentation"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            style={{ position: 'relative', maxWidth: '85vw', maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: -40,
                right: 0,
                color: '#c8a96e',
                fontSize: 24,
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                lineHeight: 1,
              }}
              aria-label="Kapat"
            >
              ✕
            </button>
            <div
              style={{
                position: 'relative',
                width: 'min(85vw, 1200px)',
                height: 'min(85vh, 800px)',
              }}
            >
              <Image
                src={lightboxItem.src}
                alt={`Marcello's galeri büyük görünüm ${(selectedPhoto ?? 0) + 1}`}
                fill
                sizes="85vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: -60,
                transform: 'translateY(-50%)',
                background: 'rgba(26,18,8,0.7)',
                border: '1px solid rgba(200,169,110,0.3)',
                color: '#c8a96e',
                width: 44,
                height: 44,
                borderRadius: '50%',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
              aria-label="Önceki"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              style={{
                position: 'absolute',
                top: '50%',
                right: -60,
                transform: 'translateY(-50%)',
                background: 'rgba(26,18,8,0.7)',
                border: '1px solid rgba(200,169,110,0.3)',
                color: '#c8a96e',
                width: 44,
                height: 44,
                borderRadius: '50%',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
              aria-label="Sonraki"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
