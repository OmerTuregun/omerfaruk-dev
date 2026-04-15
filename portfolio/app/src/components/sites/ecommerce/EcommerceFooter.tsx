export function EcommerceFooter() {
  const colors = {
    bg: '#faf8f5',
    bgAlt: '#f5f0eb',
    bgDark: '#f0ebe4',
    dark: '#2c1810',
    brown: '#5c3d2e',
    gold: '#c4a882',
    goldLight: '#e8ddd0',
    muted: '#8c7b6e',
    border: '#e8e0d8',
    white: '#ffffff',
  } as const

  const headingStyle = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: 10,
    color: 'rgba(196,168,130,0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
    marginBottom: 16,
  }

  const linkStyle = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: 13,
    color: 'rgba(196,168,130,0.6)',
    display: 'block' as const,
    marginBottom: 10,
    textDecoration: 'none' as const,
  }

  return (
    <footer id="iletisim" style={{ background: colors.dark, padding: '64px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(196,168,130,0.15)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 22,
                fontWeight: 600,
                color: colors.gold,
                letterSpacing: 4,
              }}
            >
              TOPRAK
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 10,
                color: 'rgba(196,168,130,0.5)',
                letterSpacing: 6,
                marginTop: 2,
              }}
            >
              STUDIO
            </div>
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: 'rgba(196,168,130,0.5)',
                lineHeight: 1.7,
                marginTop: 16,
                marginBottom: 0,
                whiteSpace: 'pre-line',
              }}
            >
              El yapımı seramik ve ev dekor.{'\n'}İstanbul, Türkiye.
            </p>
          </div>

          <div>
            <div style={headingStyle}>Koleksiyon</div>
            <span style={linkStyle}>Kaseler</span>
            <span style={linkStyle}>Vazolar</span>
            <span style={linkStyle}>Kupalar</span>
            <span style={{ ...linkStyle, marginBottom: 0 }}>Ev Dekor</span>
          </div>

          <div>
            <div style={headingStyle}>Bilgi</div>
            <span style={linkStyle}>Hikayemiz</span>
            <span style={linkStyle}>Nasıl Yapılıyor</span>
            <span style={linkStyle}>Bakım Rehberi</span>
            <span style={{ ...linkStyle, marginBottom: 0 }}>S.S.S.</span>
          </div>

          <div>
            <div style={headingStyle}>İletişim</div>
            <span style={linkStyle}>Instagram</span>
            <span style={linkStyle}>E-posta</span>
            <span style={linkStyle}>WhatsApp</span>
            <span style={{ ...linkStyle, marginBottom: 0 }}>Sipariş Takibi</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 32,
            fontSize: 12,
            color: 'rgba(196,168,130,0.3)',
            flexWrap: 'wrap',
            gap: 16,
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          <span>© 2025 Toprak Studio. Tüm hakları saklıdır.</span>
          <span>Kargo · İade · Gizlilik</span>
        </div>
      </div>
    </footer>
  )
}

