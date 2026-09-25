'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { awards, clients } from '@/lib/ajans-data'

export function ClientsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="clients" ref={ref} style={{ padding: '120px 48px' }}>
      <p
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(240,240,240,0.4)',
          margin: '0 0 64px',
        }}
      >
        04 — Clients & Recognition
      </p>

      <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 55%', minWidth: 280 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: 'rgba(240,240,240,0.4)',
              margin: '0 0 24px',
            }}
          >
            Trusted by
          </p>
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              whileHover={{ x: 16, color: '#f0f0f0' }}
              style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 600,
                borderBottom: '1px solid rgba(240,240,240,0.06)',
                padding: '16px 0',
                color: 'rgba(240,240,240,0.3)',
                cursor: 'default',
              }}
            >
              {client}
            </motion.div>
          ))}
        </div>

        <div style={{ flex: '1 1 35%', minWidth: 240 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: 'rgba(240,240,240,0.4)',
              margin: '0 0 24px',
            }}
          >
            Awards
          </p>
          {awards.map((award, i) => (
            <motion.div
              key={`${award.org}-${award.year}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 16,
                padding: '20px 0',
                borderBottom: '1px solid rgba(240,240,240,0.06)',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: 1,
                    color: '#ff3b00',
                    margin: '0 0 4px',
                  }}
                >
                  {award.org}
                </p>
                <p style={{ fontSize: 18, fontWeight: 500, margin: 0, color: '#f0f0f0' }}>
                  {award.title}
                </p>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(240,240,240,0.4)' }}>{award.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
