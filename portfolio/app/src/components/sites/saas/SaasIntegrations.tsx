'use client'

import { useState } from 'react'

const colors = {
  primary: '#4f46e5',
  dark: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  surface: '#f8fafc',
} as const

type Integration = {
  badgeBg: string
  badgeColor: string
  badgeText: string
  name: string
  category: string
}

const integrations: Integration[] = [
  { badgeBg: '#635bff', badgeColor: '#fff', badgeText: 'St', name: 'Stripe', category: 'Ödeme' },
  {
    badgeBg: '#ff6900',
    badgeColor: '#fff',
    badgeText: 'Sh',
    name: 'Shopify',
    category: 'E-ticaret',
  },
  {
    badgeBg: '#4285f4',
    badgeColor: '#fff',
    badgeText: 'GA',
    name: 'Google Analytics',
    category: 'Analitik',
  },
  { badgeBg: '#ff7a59', badgeColor: '#fff', badgeText: 'Hs', name: 'HubSpot', category: 'CRM' },
  {
    badgeBg: '#00b37d',
    badgeColor: '#fff',
    badgeText: 'In',
    name: 'Intercom',
    category: 'Destek',
  },
  { badgeBg: '#e01e5a', badgeColor: '#fff', badgeText: 'Sk', name: 'Slack', category: 'Bildirim' },
  { badgeBg: '#172b4d', badgeColor: '#fff', badgeText: 'Jr', name: 'Jira', category: 'Proje' },
  {
    badgeBg: '#0052cc',
    badgeColor: '#fff',
    badgeText: 'Sf',
    name: 'Salesforce',
    category: 'CRM',
  },
  { badgeBg: '#36c5f0', badgeColor: '#fff', badgeText: 'Zm', name: 'Zoom', category: 'Toplantı' },
  { badgeBg: '#000000', badgeColor: '#fff', badgeText: 'Nt', name: 'Notion', category: 'Doküman' },
  { badgeBg: '#f24e1e', badgeColor: '#fff', badgeText: 'Fg', name: 'Figma', category: 'Tasarım' },
  {
    badgeBg: '#1db954',
    badgeColor: '#fff',
    badgeText: '+',
    name: 'Ve daha fazlası',
    category: '50+ entegrasyon',
  },
]

export function SaasIntegrations() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [btnHover, setBtnHover] = useState(false)

  return (
    <section
      id="entegrasyonlar"
      style={{
        padding: '100px 60px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <span
          style={{
            background: '#eff6ff',
            color: colors.primary,
            border: '1px solid #c7d2fe',
            borderRadius: 20,
            padding: '4px 14px',
            fontSize: 12,
            display: 'inline-block',
            marginBottom: 16,
          }}
        >
          ENTEGRASYONLAR
        </span>
        <h2
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.dark,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          Kullandığınız araçlarla{'\n'}kusursuz çalışır.
        </h2>
        <div style={{ fontSize: 17, color: colors.muted, marginTop: 16 }}>
          Mevcut iş akışınızı bozmadan, tek tıkla entegre edin.
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 64,
        }}
      >
        {integrations.map((it, i) => {
          const isHovered = hoveredIndex === i

          return (
            <div
              key={`${it.name}-${it.category}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                border: `1px solid ${isHovered ? '#c7d2fe' : colors.border}`,
                borderRadius: 12,
                padding: 24,
                background: '#fff',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                textAlign: 'center',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  background: it.badgeBg,
                  color: it.badgeColor,
                }}
              >
                {it.badgeText}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.dark }}>{it.name}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{it.category}</div>
            </div>
          )
        })}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '32px 40px',
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: colors.dark }}>
            İhtiyacınız olan entegrasyon listede yok mu?
          </div>
          <div style={{ fontSize: 14, color: colors.muted, marginTop: 4 }}>
            Özel entegrasyon talebinizi iletebilirsiniz.
          </div>
        </div>

        <button
          type="button"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            background: btnHover ? '#4338ca' : colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '11px 24px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.15s ease',
          }}
        >
          Talep Gönder
        </button>
      </div>
    </section>
  )
}

