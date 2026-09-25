'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project as MimariProject } from '@/lib/mimari-data'

type ProjectModalProps = {
  project: MimariProject | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [hoveredGallery, setHoveredGallery] = useState<number | null>(null)

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 500 }}
        >
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Modalı kapat"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClose()
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
            }}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 'min(680px, 100vw)',
              background: '#0f0d0a',
              borderLeft: '1px solid rgba(245,240,232,0.08)',
              overflowY: 'auto',
            }}
          >
            <img
              src={project.heroImage}
              alt={project.title}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            <motion.div style={{ padding: 48 }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  float: 'right',
                  background: 'none',
                  border: 'none',
                  color: '#f5f0e8',
                  fontSize: 24,
                  cursor: 'pointer',
                  marginBottom: 16,
                }}
              >
                ×
              </button>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginBottom: 16,
                  clear: 'both',
                }}
              >
                <span
                  style={{
                    border: '1px solid rgba(245,240,232,0.15)',
                    padding: '4px 12px',
                    fontSize: 10,
                    letterSpacing: 2,
                    color: 'rgba(245,240,232,0.7)',
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    border: '1px solid rgba(184,169,138,0.3)',
                    padding: '4px 12px',
                    fontSize: 10,
                    letterSpacing: 2,
                    color: '#b8a98a',
                  }}
                >
                  {project.status}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                  fontSize: 36,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#f5f0e8',
                  margin: '0 0 8px',
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontSize: 12,
                  color: 'rgba(245,240,232,0.4)',
                  letterSpacing: 2,
                  margin: 0,
                }}
              >
                {project.location} · {project.year} · {project.area} m²
              </p>

              <hr
                style={{
                  border: 'none',
                  borderTop: '1px solid rgba(245,240,232,0.08)',
                  margin: '24px 0',
                }}
              />

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: 'rgba(245,240,232,0.7)',
                  margin: '0 0 24px',
                }}
              >
                {project.description}
              </p>

              {project.awards && project.awards.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  {project.awards.map((award) => (
                    <p
                      key={award}
                      style={{
                        fontSize: 13,
                        color: '#b8a98a',
                        margin: '0 0 8px',
                      }}
                    >
                      ★ {award}
                    </p>
                  ))}
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 4,
                  marginTop: 24,
                }}
              >
                {project.gallery.map((src, i) => (
                  <div
                    key={src}
                    style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}
                    onMouseEnter={() => setHoveredGallery(i)}
                    onMouseLeave={() => setHoveredGallery(null)}
                  >
                    <img
                      src={src}
                      alt={`${project.title} galeri ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        cursor: 'pointer',
                      }}
                    />
                    {hoveredGallery === i && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(10,10,10,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 20,
                          color: '#f5f0e8',
                        }}
                      >
                        ⊕
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                <button
                  type="button"
                  onClick={async () => {
                    const shareData = {
                      title: project.title,
                      text: project.description,
                      url: typeof window !== 'undefined' ? window.location.href : '',
                    }
                    if (typeof navigator !== 'undefined' && navigator.share) {
                      try {
                        await navigator.share(shareData)
                        return
                      } catch {
                        /* fall through to clipboard */
                      }
                    }
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      const text = `${shareData.title}\n${shareData.text}\n${shareData.url}`
                      await navigator.clipboard.writeText(text)
                      return
                    }
                    window.alert('Paylaşım bu cihazda desteklenmiyor.')
                  }}
                  style={{
                    flex: 1,
                    border: '1px solid rgba(245,240,232,0.2)',
                    padding: '14px 24px',
                    fontSize: 12,
                    letterSpacing: 2,
                    color: '#f5f0e8',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Projeyi Paylaş
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }, 300)
                  }}
                  style={{
                    flex: 1,
                    background: '#b8a98a',
                    color: '#0a0a0a',
                    border: 'none',
                    padding: '14px 24px',
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  İletişime Geç
                </button>
              </div>
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
