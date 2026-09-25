'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface PhotoLightboxPhoto {
  src: string
  title: string
  category: string
  year: string
}

interface PhotoLightboxProps {
  photos: PhotoLightboxPhoto[]
  initialIndex: number
  onClose: () => void
}

export function PhotoLightbox({
  photos,
  initialIndex,
  onClose,
}: PhotoLightboxProps) {
  const safeInitial =
    photos.length > 0
      ? Math.max(0, Math.min(initialIndex, photos.length - 1))
      : 0
  const [currentIndex, setCurrentIndex] = useState(safeInitial)
  const [closeHovered, setCloseHovered] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<'prev' | 'next' | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (photos.length === 0) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentIndex((i) => (i + 1) % photos.length)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentIndex((i) => (i - 1 + photos.length) % photos.length)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [photos.length, onClose])

  const current = photos[currentIndex]

  const navButtonBase: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 48,
    height: 48,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 20,
    zIndex: 10,
    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
  }

  const navButtonIdle: CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.6)',
  }

  const navButtonHover: CSSProperties = {
    background: 'rgba(232,180,184,0.2)',
    border: '1px solid #e8b4b8',
    color: '#e8b4b8',
  }

  if (!current || photos.length === 0) {
    return null
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Fotoğraf galerisi"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'rgba(10,10,10,0.96)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '24px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: 2,
            }}
          >
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: closeHovered ? '#e8b4b8' : 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 12,
              letterSpacing: 1,
              padding: 0,
              transition: 'color 0.2s',
            }}
          >
            ESC veya ✕
          </button>
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 120px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={current.src}
              alt={current.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              draggable={false}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                userSelect: 'none',
              }}
            />
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Önceki fotoğraf"
          onClick={(e) => {
            e.stopPropagation()
            setCurrentIndex((i) => (i - 1 + photos.length) % photos.length)
          }}
          onMouseEnter={() => setHoveredNav('prev')}
          onMouseLeave={() => setHoveredNav(null)}
          style={{
            ...navButtonBase,
            ...navButtonIdle,
            ...(hoveredNav === 'prev' ? navButtonHover : {}),
            left: 24,
          }}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Sonraki fotoğraf"
          onClick={(e) => {
            e.stopPropagation()
            setCurrentIndex((i) => (i + 1) % photos.length)
          }}
          onMouseEnter={() => setHoveredNav('next')}
          onMouseLeave={() => setHoveredNav(null)}
          style={{
            ...navButtonBase,
            ...navButtonIdle,
            ...(hoveredNav === 'next' ? navButtonHover : {}),
            right: 24,
          }}
        >
          ›
        </button>

        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: 18,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {current.title}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: 2,
              marginTop: 6,
            }}
          >
            {current.category} · {current.year}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            padding: '0 40px',
          }}
        >
          {photos.map((p, i) => (
            <button
              key={`${p.src}-${i}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(i)
              }}
              style={{
                width: 60,
                height: 44,
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: 2,
                opacity: i === currentIndex ? 1 : 0.35,
                border:
                  i === currentIndex
                    ? '1.5px solid #e8b4b8'
                    : '1.5px solid transparent',
                transition: 'opacity 0.2s, border-color 0.2s',
                padding: 0,
                background: 'transparent',
              }}
            >
              <img
                src={p.src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
