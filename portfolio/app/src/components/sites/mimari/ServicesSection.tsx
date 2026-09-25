'use client'

import { motion } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Mimari Tasarım',
    body: 'Konsept geliştirmeden uygulama projelerine. Konut, ticari ve karma kullanım yapıları.',
  },
  {
    num: '02',
    title: 'İç Mimari',
    body: 'Yaşam ve çalışma mekânlarının detaylı tasarımı. Malzeme seçimi, mobilya ve aydınlatma.',
  },
  {
    num: '03',
    title: 'Proje Yönetimi',
    body: 'İhale sürecinden teslimata. Maliyet kontrolü, zaman yönetimi, kalite denetimi.',
  },
] as const

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

export function ServicesSection() {
  return (
    <section id="services" style={{ padding: '120px 48px' }}>
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
          02
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
          Hizmetler
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
          Ne yapıyoruz
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(245,240,232,0.06)',
        }}
      >
        {services.map((service) => (
          <motion.div
            key={service.num}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0f0d0a'
              const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement | null
              if (arrow) arrow.style.color = '#b8a98a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0a0a0a'
              const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement | null
              if (arrow) arrow.style.color = 'rgba(245,240,232,0.3)'
            }}
            style={{
              background: '#0a0a0a',
              padding: '48px 36px',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: '#b8a98a',
                margin: '0 0 24px',
              }}
            >
              {service.num}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
                fontSize: 28,
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.2,
                color: '#f5f0e8',
                margin: '0 0 16px',
              }}
            >
              {service.title}
            </h3>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.8,
                color: 'rgba(245,240,232,0.5)',
                margin: 0,
              }}
            >
              {service.body}
            </p>
            <button
              type="button"
              data-arrow
              onClick={scrollToContact}
              style={{
                marginTop: 32,
                fontSize: 11,
                letterSpacing: 2,
                color: 'rgba(245,240,232,0.3)',
                transition: 'color 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: 0,
              }}
            >
              → Detaylar
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
