'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function PhotographerAbout() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="hakkimda"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderTop: '1px solid #e8e8e4',
      }}
    >
      <motion.div
        ref={ref}
        style={{
          padding: '100px 60px',
          borderRight: '1px solid #e8e8e4',
        }}
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: inView ? 0 : -40, opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          style={{
            borderLeft: '3px solid #f5e8ea',
            paddingLeft: 24,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 10,
              color: '#e8b4b8',
              letterSpacing: 3,
              marginBottom: 24,
            }}
          >
            02 — HAKKIMDA
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontSize: 44,
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: 28,
              color: '#111',
              margin: 0,
            }}
          >
            Işığı ve{' '}
            <span style={{ fontStyle: 'italic', color: '#e8b4b8' }}>duyguyu</span>{' '}
            yakalarım.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 14,
              color: '#666',
              lineHeight: 1.9,
              margin: 0,
              marginBottom: 20,
            }}
          >
            2016&apos;dan bu yana İstanbul merkezli çalışıyorum. Düğünden portreye,
            doğadan ticari çekime her alanda yetkin bir bakış açısı sunuyorum.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: 14,
              color: '#666',
              lineHeight: 1.9,
              margin: 0,
              marginBottom: 20,
            }}
          >
            Her çekim benim için yeni bir hikaye. Müşterilerimin duygularını ve
            anlarını en saf haliyle ölümsüzleştiriyorum.
          </p>
          <div
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: 36,
              color: '#e8b4b8',
              marginTop: 32,
            }}
          >
            Elif Şahin
          </div>
        </div>
      </motion.div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '1fr 1fr',
          gap: 2,
          background: '#e8e8e4',
        }}
      >
        <motion.div
          style={{ height: 320, overflow: 'hidden' }}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{
            scale: inView ? 1 : 1.05,
            opacity: inView ? 1 : 0,
          }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
        <motion.div
          style={{ height: 320, overflow: 'hidden' }}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{
            scale: inView ? 1 : 1.05,
            opacity: inView ? 1 : 0,
          }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <img
            src="https://images.unsplash.com/photo-1452697620382-f6543ead73b5?w=800&q=80"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
