'use client'

import { motion } from 'framer-motion'

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '100px 60px 80px',
        background: '#ffffff',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }}
      >
        <div>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.45, ease: easeOut, delay: 0 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 28,
              border: '1px solid #eee',
              borderRadius: 20,
              padding: '4px 14px',
              fontSize: 14,
              color: '#666',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: '#4ade80',
              }}
            />
            Ömer Faruk Türegün — Full Stack Developer
          </motion.div>

          <motion.h1
            {...fadeInUp}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.1 }}
            style={{
              fontSize: 56,
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-2px',
              marginBottom: 24,
              marginTop: 0,
            }}
          >
            <span style={{ color: '#111' }}>Web&apos;i </span>
            <span style={{ color: '#bbb' }}>güzel</span>
            <span style={{ color: '#111' }}> yapan geliştirici.</span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.2 }}
            style={{
              fontSize: 16,
              color: '#777',
              lineHeight: 1.7,
              maxWidth: 420,
              marginBottom: 36,
              marginTop: 0,
            }}
          >
            Restoranından SaaS ürününe, e-ticaretten kurumsal sitelere — her
            projeye özel tasarım ve kod.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.3 }}
            style={{ display: 'flex', gap: 12 }}
          >
            <button
              type="button"
              onClick={() => scrollToId('projeler')}
              style={{
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Projeleri Gör
            </button>
            <button
              type="button"
              onClick={() => scrollToId('iletisim')}
              style={{
                background: '#fff',
                color: '#111',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              İletişime Geç
            </button>
          </motion.div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.1 }}
            style={{
              background: '#111',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: '#fff',
                letterSpacing: '-1px',
              }}
            >
              12+
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              tamamlanan proje
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.2 }}
            style={{
              background: '#f8f8f8',
              border: '1px solid #f0f0f0',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: '#111',
                letterSpacing: '-1px',
              }}
            >
              2 Yıl
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              profesyonel deneyim
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: easeOut, delay: 0.3 }}
            style={{
              background: '#f8f8f8',
              border: '1px solid #f0f0f0',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: '#111',
                letterSpacing: '-1px',
              }}
            >
              3
            </div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              sektör deneyimi
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
