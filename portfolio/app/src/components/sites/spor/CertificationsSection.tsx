'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { certifications } from '@/lib/spor-data'

export function CertificationsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      style={{
        padding: '80px 48px',
        background: '#080808',
        borderTop: '1px solid #1f1f1f',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: '3px',
            color: '#666666',
            fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          Sertifikalar &amp; Akreditasyonlar
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 0,
          }}
        >
          {certifications.map((cert, index) => (
            <span
              key={cert}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                fontSize: 12,
                letterSpacing: '1px',
                color: hoveredIndex === index ? '#39ff14' : '#666666',
                borderRight:
                  index < certifications.length - 1
                    ? '1px solid #1f1f1f'
                    : 'none',
                paddingRight: index < certifications.length - 1 ? 24 : 0,
                marginRight: index < certifications.length - 1 ? 24 : 0,
                fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                cursor: 'default',
                transition: 'color 0.2s ease',
              }}
            >
              {cert}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
