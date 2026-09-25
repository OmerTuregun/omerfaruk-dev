'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { awards } from '@/lib/mimari-data'

export function AwardsSection() {
  const listRef = useRef<HTMLDivElement>(null)
  const inView = useInView(listRef, { once: true, amount: 0.2 })

  return (
    <section id="awards" style={{ padding: '120px 48px' }}>
      <div style={{ position: 'relative', marginBottom: 64 }}>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 120,
            fontWeight: 300,
            color: 'rgba(245,240,232,0.04)',
            lineHeight: 1,
            position: 'absolute',
            top: -40,
            left: 0,
            margin: 0,
          }}
        >
          04
        </p>
        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            color: 'rgba(245,240,232,0.4)',
            position: 'relative',
            zIndex: 1,
            margin: '0 0 8px',
          }}
        >
          Ödüller
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f5f0e8',
            position: 'relative',
            zIndex: 1,
            margin: 0,
          }}
        >
          Ödüller {'&'} Tanınırlık
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
      >
        <div ref={listRef}>
          {awards.map((award, i) => (
            <motion.div
              key={`${award.title}-${award.year}`}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                borderBottom: '1px solid rgba(245,240,232,0.06)',
                paddingBottom: 24,
                marginBottom: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: 3,
                    color: '#b8a98a',
                    margin: '0 0 6px',
                  }}
                >
                  {award.org}
                </p>
                <p
                  style={{
                    fontSize: 18,
                    fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                    color: '#f5f0e8',
                    margin: 0,
                  }}
                >
                  {award.title}
                </p>
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: 'rgba(245,240,232,0.3)',
                  flexShrink: 0,
                  marginLeft: 16,
                }}
              >
                {award.year}
              </span>
            </motion.div>
          ))}
        </div>

        <div>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: 180,
              fontWeight: 300,
              color: 'rgba(245,240,232,0.04)',
              lineHeight: 1,
              margin: 0,
            }}
          >
            12
          </p>
          <p
            style={{
              fontSize: 14,
              letterSpacing: 3,
              color: 'rgba(245,240,232,0.4)',
              marginTop: -20,
            }}
          >
            Uluslararası Ödül
          </p>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(245,240,232,0.4)',
              marginTop: 16,
              lineHeight: 1.7,
            }}
          >
            Yerel mimarlık yarışmalarından Cannes&apos;a uzanan bir tanınırlık
            yolculuğu.
          </p>
        </div>
      </div>
    </section>
  )
}
