export function EcommerceInstagram() {
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

  const tiles = [
    'https://images.unsplash.com/photo-1536936812504-0e77dc3f0b40?w=400&q=80',
    'https://images.unsplash.com/photo-1631125916276-69bcd14e3980?w=400&q=80',
    'https://images.unsplash.com/photo-1721109890030-00faaa68981f?w=400&q=80',
    'https://images.unsplash.com/photo-1721328004336-c19ee38adcd1?w=400&q=80',
    'https://images.unsplash.com/photo-1676125105332-608345abe20e?w=400&q=80',
    'https://images.unsplash.com/photo-1607556671927-78a6605e290b?w=400&q=80',
  ] as const

  return (
    <section
      style={{
        background: colors.bgAlt,
        borderTop: `1px solid ${colors.border}`,
        padding: '80px 60px',
      }}
    >
      <style>{`
        .ig-tile { position: relative; overflow: hidden; cursor: pointer; }
        .ig-overlay { position:absolute; inset:0; background: rgba(44,24,16,0.3); opacity:0; display:flex; align-items:center; justify-content:center; transition: opacity 0.25s ease; }
        .ig-tile:hover .ig-overlay { opacity:1; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 40,
              color: colors.dark,
            }}
          >
            @toprakstudio
          </div>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 14,
              color: colors.muted,
              marginTop: 8,
            }}
          >
            Instagram&apos;da bizi takip edin
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
          {tiles.map((bg, i) => (
            <div
              key={i}
              className="ig-tile"
              style={{ paddingBottom: '100%' }}
              role="img"
              aria-label="Instagram görseli"
            >
              <img
                src={bg}
                alt="Toprak Studio Instagram paylaşımı"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  zIndex: 0,
                }}
              />
              <div className="ig-overlay" aria-hidden style={{ zIndex: 1 }}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

