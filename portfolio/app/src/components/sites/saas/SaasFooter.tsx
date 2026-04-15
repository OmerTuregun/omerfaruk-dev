const colors = {
  primary: '#4f46e5',
  slate: '#334155',
  muted: '#475569',
  border: '#1e293b',
  dark: '#0f172a',
} as const

const linkStyle = {
  fontSize: 14,
  color: colors.muted,
  display: 'block' as const,
  marginBottom: 10,
  textDecoration: 'none' as const,
}

export function SaasFooter() {
  return (
    <footer
      style={{
        background: colors.dark,
        borderTop: `1px solid ${colors.border}`,
        padding: '64px 60px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 48,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: colors.primary,
                  borderRadius: '50%',
                }}
              />
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                Datawise
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: colors.muted,
                lineHeight: 1.6,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              Verilerinizi anlık takip edin,{'\n'}doğru kararlar alın.
            </p>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                color: colors.slate,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Ürün
            </div>
            <a href="#ozellikler" style={linkStyle}>
              Özellikler
            </a>
            <a href="#entegrasyonlar" style={linkStyle}>
              Entegrasyonlar
            </a>
            <a href="#fiyatlandirma" style={linkStyle}>
              Fiyatlandırma
            </a>
            <a href="#sss" style={linkStyle}>
              SSS
            </a>
            <a href="#yorumlar" style={linkStyle}>
              Değişiklik Günlüğü
            </a>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                color: colors.slate,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Şirket
            </div>
            <span style={linkStyle}>Hakkımızda</span>
            <span style={linkStyle}>Blog</span>
            <span style={linkStyle}>Kariyer</span>
            <span style={{ ...linkStyle, marginBottom: 0 }}>Basın</span>
          </div>

          <div>
            <div
              style={{
                fontSize: 12,
                color: colors.slate,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Destek
            </div>
            <span style={linkStyle}>Dokümantasyon</span>
            <span style={linkStyle}>API Referansı</span>
            <span style={linkStyle}>Durum</span>
            <span style={{ ...linkStyle, marginBottom: 0 }}>İletişim</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            paddingTop: 32,
            fontSize: 13,
            color: colors.slate,
          }}
        >
          <span>© 2025 Datawise Technologies Inc.</span>
          <span>Gizlilik Politikası · Kullanım Koşulları</span>
        </div>
      </div>
    </footer>
  )
}
