'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { caseStudies } from '@/lib/hukuk-data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export function CaseStudiesSection() {
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 768) setColumns(1)
      else if (w < 1024) setColumns(2)
      else setColumns(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section
      id="case-studies"
      style={{
        background: '#f0ece6',
        padding: '120px 48px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
              fontSize: 13,
              letterSpacing: 3,
              color: '#c5a572',
              margin: '0 0 12px',
              textTransform: 'uppercase',
            }}
          >
            04
          </p>
          <h2
            style={{
              fontFamily: "var(--font-libre-baskerville), Libre Baskerville, Georgia, serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              color: '#1a1a2e',
              margin: '0 0 12px',
            }}
          >
            Seçilmiş Davalar
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
              fontSize: 16,
              color: '#6b7280',
              margin: '0 0 16px',
            }}
          >
            Müvekkil Gizliliği Korunarak
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
              fontSize: 13,
              color: '#6b7280',
              margin: 0,
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            Aşağıdaki örnekler, müvekkil kimlikleri ve dava detayları gizli tutularak
            yalnızca sonuç ve süre bilgisiyle paylaşılmaktadır.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 24,
          }}
        >
          {caseStudies.map((study) => (
            <motion.div
              key={`${study.sector}-${study.subject}`}
              variants={cardVariants}
              style={{
                background: '#fafaf8',
                padding: '28px 24px',
                border: '1px solid #e5e0d8',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                  fontSize: 11,
                  letterSpacing: 1,
                  padding: '5px 12px',
                  background: '#1a3a5c',
                  color: '#fafaf8',
                  marginBottom: 16,
                }}
              >
                {study.sector}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-libre-baskerville), Libre Baskerville, Georgia, serif",
                  fontSize: 18,
                  fontWeight: 400,
                  color: '#1a1a2e',
                  margin: '0 0 20px',
                  lineHeight: 1.4,
                }}
              >
                {study.subject}
              </h3>
              <div
                style={{
                  height: 1,
                  background: '#e5e0d8',
                  marginBottom: 20,
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                  fontSize: 14,
                  color: '#6b4c3b',
                  margin: '0 0 12px',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: '#c5a572' }}>✓ </span>
                {study.outcome}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                  fontSize: 13,
                  color: '#6b7280',
                  margin: 0,
                }}
              >
                ⏱ {study.duration}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
