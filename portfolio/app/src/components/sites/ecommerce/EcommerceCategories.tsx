export function EcommerceCategories() {
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

  const categories = [
    {
      name: 'Kaseler',
      count: '4 ürün',
      img: 'https://images.unsplash.com/photo-1536936812504-0e77dc3f0b40?w=700&q=80',
      alt: 'El yapımı seramik kaseler',
    },
    {
      name: 'Vazolar',
      count: '2 ürün',
      img: 'https://images.unsplash.com/photo-1631125916276-69bcd14e3980?w=700&q=80',
      alt: 'El yapımı seramik vazolar',
    },
    {
      name: 'Kupalar',
      count: '2 ürün',
      img: 'https://images.unsplash.com/photo-1721109890030-00faaa68981f?w=700&q=80',
      alt: 'El yapımı seramik kupalar',
    },
    {
      name: 'Ev Dekor',
      count: '2 ürün',
      img: 'https://images.unsplash.com/photo-1721328004336-c19ee38adcd1?w=700&q=80',
      alt: 'Ev dekor objeleri',
    },
  ] as const

  return (
    <section id="kategoriler" style={{ padding: '80px 60px', background: colors.bg }}>
      <style>{`
        .cat-card { transform: scale(1); transition: transform 0.4s ease; }
        .cat-card:hover { transform: scale(1.02); }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              color: colors.gold,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            KATEGORİLER
          </div>
          <div
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 40,
              fontWeight: 400,
              color: colors.dark,
              fontStyle: 'italic',
            }}
          >
            Ne arıyorsunuz?
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {categories.map((c) => (
            <div
              key={c.name}
              className="cat-card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: 4,
                paddingBottom: '133%',
              }}
              role="link"
              tabIndex={0}
              aria-label={`${c.name} kategorisini aç`}
            >
              <img
                src={c.img}
                alt={c.alt}
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
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60%',
                  background: 'linear-gradient(to top, rgba(44,24,16,0.7), transparent)',
                  zIndex: 1,
                }}
              />
              <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 2 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 24,
                    color: '#fff',
                    fontWeight: 400,
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.7)',
                    marginTop: 4,
                  }}
                >
                  {c.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

