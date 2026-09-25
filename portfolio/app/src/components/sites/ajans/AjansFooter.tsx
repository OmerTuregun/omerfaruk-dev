'use client'

const sections: Record<string, string> = {
  Works: 'works',
  Services: 'services',
  Process: 'process',
  Contact: 'contact',
}

const socials = ['IG', 'LI', 'BE', 'TW'] as const

export function AjansFooter() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(240,240,240,0.06)',
        padding: 48,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 48,
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, color: '#f0f0f0' }}>
          VOID
        </span>

        <nav style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {Object.entries(sections).map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              style={{
                fontSize: 12,
                letterSpacing: 2,
                color: 'rgba(240,240,240,0.4)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f0f0f0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(240,240,240,0.4)'
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 8 }}>
          {socials.map((s) => (
            <span
              key={s}
              style={{
                fontSize: 11,
                letterSpacing: 1,
                border: '1px solid rgba(240,240,240,0.15)',
                padding: '8px 12px',
                color: 'rgba(240,240,240,0.5)',
                cursor: 'pointer',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <p
        style={{
          fontSize: 'clamp(60px, 12vw, 160px)',
          fontWeight: 700,
          letterSpacing: -2,
          color: 'rgba(240,240,240,0.04)',
          textAlign: 'center',
          lineHeight: 1,
          margin: '0 0 48px',
        }}
      >
        VOID STUDIO
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 12, color: 'rgba(240,240,240,0.3)' }}>
          © 2024 Void Studio. All rights reserved.
        </span>
        <span style={{ fontSize: 12, color: 'rgba(240,240,240,0.2)' }}>
          Designed & built with obsession.
        </span>
      </div>
    </footer>
  )
}
