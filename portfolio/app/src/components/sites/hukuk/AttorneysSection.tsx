'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Attorney } from '@/lib/hukuk-data'

type AttorneysSectionProps = {
  attorneys: Attorney[]
  setSelectedAttorney: (a: Attorney) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function AttorneyCard({
  attorney,
  onSelect,
}: {
  attorney: Attorney
  onSelect: (a: Attorney) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      onClick={() => onSelect(attorney)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? '#1a3a5c' : '#e5e0d8'}`,
        background: '#fafaf8',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: hovered ? '0 8px 32px rgba(26, 58, 92, 0.12)' : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <div style={{ overflow: 'hidden', aspectRatio: '3/4' }}>
        <motion.img
          src={attorney.image}
          alt={attorney.name}
          animate={{
            filter: hovered ? 'grayscale(0%)' : 'grayscale(20%)',
            scale: hovered ? 1.03 : 1,
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
      <div style={{ padding: '24px 20px' }}>
        <h3
          style={{
            fontFamily: "var(--font-libre-baskerville), Libre Baskerville, Georgia, serif",
            fontSize: 18,
            fontWeight: 400,
            color: '#1a1a2e',
            margin: '0 0 6px',
          }}
        >
          {attorney.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
            fontSize: 13,
            color: '#c5a572',
            margin: '0 0 16px',
            letterSpacing: 0.5,
          }}
        >
          {attorney.title}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {attorney.specializations.map((spec) => (
            <span
              key={spec}
              style={{
                fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
                fontSize: 11,
                padding: '4px 10px',
                background: '#f0ece6',
                color: '#6b4c3b',
                borderRadius: 2,
              }}
            >
              {spec}
            </span>
          ))}
        </div>
        <span
          style={{
            fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
            fontSize: 13,
            color: hovered ? '#1a3a5c' : '#6b7280',
            transition: 'color 0.3s',
          }}
        >
          Profili Gör →
        </span>
      </div>
    </motion.div>
  )
}

export function AttorneysSection({ attorneys, setSelectedAttorney }: AttorneysSectionProps) {
  const [columns, setColumns] = useState(4)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setColumns(1)
      else if (w < 1024) setColumns(2)
      else if (w < 1280) setColumns(3)
      else setColumns(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section
      id="attorneys"
      style={{
        background: '#fafaf8',
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
            03
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
            Avukatlarımız
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter-hukuk), Inter, sans-serif",
              fontSize: 16,
              color: '#6b7280',
              margin: 0,
            }}
          >
            Deneyimli Hukuk Ekibi
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
          {attorneys.map((attorney) => (
            <AttorneyCard
              key={attorney.id}
              attorney={attorney}
              onSelect={setSelectedAttorney}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
