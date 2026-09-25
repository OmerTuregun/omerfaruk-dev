'use client'

import { motion } from 'framer-motion'

const sections: Record<string, string> = {
  Projeler: 'projects',
  Hakkımızda: 'about',
  Hizmetler: 'services',
  Ekip: 'team',
  İletişim: 'contact',
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function MimariFooter() {
  return (
    <footer
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(245,240,232,0.06)',
        padding: '48px 48px 40px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 48,
          flexWrap: 'wrap',
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 6,
              color: '#f5f0e8',
            }}
          >
            FORMA
          </div>
          <motion.div
            style={{
              fontSize: 8,
              letterSpacing: 8,
              color: 'rgba(245,240,232,0.4)',
              marginTop: 2,
            }}
          >
            MİMARLIK
          </motion.div>
        </div>

        <nav style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {Object.entries(sections).map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f5f0e8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(245,240,232,0.3)'
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 11,
                letterSpacing: 2,
                color: 'rgba(245,240,232,0.3)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'color 0.3s ease',
                padding: 0,
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <motion.div style={{ textAlign: 'right' }}>
          <button
            type="button"
            onClick={() => {
              window.location.href = 'mailto:info@formamimari.com'
            }}
            style={{
              fontSize: 13,
              color: 'rgba(245,240,232,0.6)',
              margin: '0 0 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              padding: 0,
            }}
          >
            info@formamimari.com
          </button>
          <motion.div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => window.open('https://linkedin.com', '_blank')}
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: 'rgba(245,240,232,0.4)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                fontFamily: 'inherit',
                padding: 0,
              }}
            >
              IN
            </button>
            <button
              type="button"
              onClick={() => window.open('https://behance.net', '_blank')}
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: 'rgba(245,240,232,0.4)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                fontFamily: 'inherit',
                padding: 0,
              }}
            >
              BE
            </button>
          </motion.div>
        </motion.div>
      </div>

      <p
        style={{
          textAlign: 'center',
          margin: '40px 0 32px',
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: 'clamp(80px, 15vw, 180px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'rgba(245,240,232,0.04)',
          letterSpacing: -2,
          lineHeight: 1,
        }}
      >
        FORMA
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 24,
          borderTop: '1px solid rgba(245,240,232,0.04)',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.2)', margin: 0 }}>
          © 2024 Forma Mimarlık. Tüm hakları saklıdır.
        </p>
        <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.2)', margin: 0 }}>
          İstanbul / Bodrum / Kapadokya
        </p>
      </div>
    </footer>
  )
}
