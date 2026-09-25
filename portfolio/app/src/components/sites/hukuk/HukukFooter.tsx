'use client'

import { useEffect, useState } from 'react'
import { practiceAreas } from '@/lib/hukuk-data'

const quickLinks = [
  { label: 'Avukatlarımız', id: 'attorneys' },
  { label: 'Süreç', id: 'process' },
  { label: 'Davalarımız', id: 'case-studies' },
  { label: 'İletişim', id: 'contact' },
] as const

const legalLinks = ['Gizlilik Politikası', 'Kullanım Koşulları', 'KVKK Aydınlatma Metni'] as const

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HukukFooter() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const columnTitleStyle = {
    fontSize: 11,
    letterSpacing: 3,
    color: '#c5a572',
    textTransform: 'uppercase' as const,
    margin: '0 0 20px',
  }

  const linkButtonStyle = {
    display: 'block' as const,
    background: 'none',
    border: 'none',
    padding: '6px 0',
    fontSize: 13,
    color: 'rgba(250,250,248,0.55)',
    cursor: 'pointer' as const,
    fontFamily: 'inherit',
    textAlign: 'left' as const,
    transition: 'color 0.3s ease',
  }

  return (
    <footer
      style={{
        background: '#1a1a2e',
        padding: isMobile ? '48px 24px 32px' : '64px 48px 40px',
        color: '#fafaf8',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? 40 : 48,
          marginBottom: 48,
        }}
      >
        {/* Column 1 — Logo & description */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#fafaf8',
            }}
          >
            ÇELİK & DOĞAN
          </div>
          <div
            style={{
              fontSize: 8,
              letterSpacing: 4,
              color: '#c5a572',
              marginTop: 4,
              marginBottom: 20,
            }}
          >
            HUKUK BÜROSU
          </div>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: 'rgba(250,250,248,0.45)',
              margin: '0 0 20px',
              maxWidth: 320,
            }}
          >
            25 yılı aşkın deneyimle ticaret, gayrimenkul, iş ve ceza hukuku alanlarında
            kurumsal danışmanlık ve dava takibi hizmeti sunuyoruz.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(250,250,248,0.45)', margin: '0 0 6px' }}>
            Hukuki sorularınız için:
          </p>
          <a
            href="mailto:info@celikdogan.av.tr"
            style={{
              fontSize: 14,
              color: '#c5a572',
              textDecoration: 'none',
            }}
          >
            info@celikdogan.av.tr
          </a>
        </div>

        {/* Column 2 — Practice areas */}
        <div>
          <p style={columnTitleStyle}>Uzmanlık Alanları</p>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {practiceAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => scrollTo('practice-areas')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fafaf8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(250,250,248,0.55)'
                }}
                style={linkButtonStyle}
              >
                {area.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Column 3 — Quick links */}
        <div>
          <p style={columnTitleStyle}>Hızlı Erişim</p>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {quickLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fafaf8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(250,250,248,0.55)'
                }}
                style={linkButtonStyle}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Column 4 — Contact info */}
        <div>
          <p style={columnTitleStyle}>İletişim</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              href="tel:+902122914700"
              style={{
                fontSize: 13,
                color: 'rgba(250,250,248,0.55)',
                textDecoration: 'none',
              }}
            >
              +90 212 291 47 00
            </a>
            <a
              href="mailto:info@celikdogan.av.tr"
              style={{
                fontSize: 13,
                color: 'rgba(250,250,248,0.55)',
                textDecoration: 'none',
              }}
            >
              info@celikdogan.av.tr
            </a>
            <span style={{ fontSize: 13, color: 'rgba(250,250,248,0.55)' }}>
              Nişantaşı, İstanbul
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: 'rgba(250,250,248,0.08)',
          marginBottom: 24,
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <p style={{ fontSize: 12, color: 'rgba(250,250,248,0.35)', margin: 0 }}>
          © 2024 Çelik & Doğan Hukuk Bürosu. Tüm hakları saklıdır.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {legalLinks.map((label, i) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && (
                <span style={{ color: 'rgba(250,250,248,0.2)', fontSize: 12 }}>·</span>
              )}
              <button
                type="button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#c5a572'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(250,250,248,0.35)'
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: 12,
                  color: 'rgba(250,250,248,0.35)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'color 0.3s ease',
                }}
              >
                {label}
              </button>
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
