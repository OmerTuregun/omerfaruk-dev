'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { practiceAreas } from '@/lib/hukuk-data'

type PracticeAreasSectionProps = {
  openArea: string | null
  setOpenArea: (id: string | null) => void
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

export function PracticeAreasSection({ openArea, setOpenArea }: PracticeAreasSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggleArea = (id: string) => {
    setOpenArea(openArea === id ? null : id)
  }

  return (
    <section id="practice-areas" style={{ padding: '120px 48px' }}>
      <div style={{ position: 'relative', marginBottom: 64 }}>
        <p
          style={{
            fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
            fontSize: 120,
            fontWeight: 400,
            color: 'rgba(26, 58, 92, 0.06)',
            lineHeight: 1,
            position: 'absolute',
            top: -40,
            left: 0,
            margin: 0,
          }}
        >
          01
        </p>
        <p
          style={{
            fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
            fontSize: 11,
            letterSpacing: 4,
            color: '#c5a572',
            position: 'relative',
            zIndex: 1,
            margin: '0 0 8px',
            textTransform: 'uppercase',
          }}
        >
          Uzmanlık Alanları
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#1a3a5c',
            position: 'relative',
            zIndex: 1,
            margin: 0,
          }}
        >
          Hukukun Her Alanında Yanınızdayız
        </h2>
      </div>

      <div>
        {practiceAreas.map((area, index) => {
          const isOpen = openArea === area.id
          const num = String(index + 1).padStart(2, '0')

          return (
            <div
              key={area.id}
              style={{
                borderBottom: '1px solid #e5e0d8',
              }}
            >
              <button
                type="button"
                onClick={() => toggleArea(area.id)}
                onMouseEnter={() => setHoveredId(area.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  padding: '28px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
                    fontSize: 13,
                    letterSpacing: 2,
                    color: '#c5a572',
                    minWidth: 28,
                  }}
                >
                  {num}
                </span>

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d={area.icon}
                    stroke="#6b4c3b"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
                    fontSize: 20,
                    color: hoveredId === area.id ? '#6b4c3b' : '#1a3a5c',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {area.title}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    fontSize: 24,
                    fontWeight: 300,
                    color: '#6b4c3b',
                    flexShrink: 0,
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingBottom: 32 }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
                          fontSize: 15,
                          lineHeight: 1.7,
                          color: '#6b7280',
                          margin: '0 0 24px',
                          maxWidth: 640,
                          paddingLeft: 76,
                        }}
                      >
                        {area.shortDesc}
                      </p>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '12px 32px',
                          paddingLeft: 76,
                          marginBottom: 28,
                        }}
                      >
                        {area.details.map((detail) => (
                          <p
                            key={detail}
                            style={{
                              fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
                              fontSize: 14,
                              color: '#1a1a2e',
                              margin: 0,
                              lineHeight: 1.6,
                            }}
                          >
                            → {detail}
                          </p>
                        ))}
                      </div>

                      <div style={{ paddingLeft: 76 }}>
                        <button
                          type="button"
                          onClick={scrollToContact}
                          style={{
                            fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
                            fontSize: 13,
                            letterSpacing: '0.5px',
                            color: '#1a3a5c',
                            background: 'none',
                            border: '1px solid #c5a572',
                            padding: '12px 24px',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease, color 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#1a3a5c'
                            e.currentTarget.style.color = '#fafaf8'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.color = '#1a3a5c'
                          }}
                        >
                          Bu Alanda Danışın →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
