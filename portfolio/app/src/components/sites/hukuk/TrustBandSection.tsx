'use client'

const TRUST_ITEMS = [
  'İstanbul Barosu Üyesi',
  '25+ Yıl Deneyim',
  'Gizlilik Güvencesi',
  'Ücretsiz İlk Görüşme',
  '7/24 Acil Destek',
  'Şeffaf Ücretlendirme',
] as const

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8l3 3 7-7"
        stroke="#c5a572"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TrustBandSection() {
  return (
    <section
      style={{
        background: '#f0ece6',
        borderTop: '1px solid #e5e0d8',
        borderBottom: '1px solid #e5e0d8',
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      {TRUST_ITEMS.map((item) => (
        <div
          key={item}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <CheckIcon />
          <span
            style={{
              fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
              fontSize: 12,
              letterSpacing: '0.5px',
              color: '#6b4c3b',
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </section>
  )
}
