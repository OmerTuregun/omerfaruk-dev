import Image from 'next/image'

const instagramImages = [
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
  'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&q=80',
  'https://images.unsplash.com/photo-1452697620382-f6543ead73b5?w=400&q=80',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80',
]

const hoverCss = `
  .instagram-card:hover .instagram-image {
    transform: scale(1.06);
  }
  .instagram-card:hover .instagram-overlay {
    opacity: 1;
  }
`

export default function PhotographerInstagram() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: hoverCss }} />
      <section
        style={{
          borderTop: '1px solid #e8e8e4',
          padding: '80px 60px',
          background: '#fdfcfc',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: 40,
                  color: '#111',
                }}
              >
                @elifsahin.photo
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: 8,
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: 13,
                  color: '#888',
                }}
              >
                Instagram&apos;da bizi takip edin
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'transparent',
                color: '#111',
                border: '1px solid #e8b4b8',
                borderRadius: 2,
                padding: '10px 24px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize: 11,
                letterSpacing: 2,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
              }}
            >
              Takip Et →
            </a>
          </header>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 4,
            }}
          >
            {instagramImages.map((src, index) => (
              <div
                key={src}
                className="instagram-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  paddingBottom: '100%',
                }}
              >
                <Image
                  src={src}
                  alt={`Instagram önizleme ${index + 1}`}
                  fill
                  sizes="(max-width: 900px) 33vw, 16vw"
                  className="instagram-image"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div
                  className="instagram-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(232, 180, 184, 0.3)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={1.5}
                    aria-hidden
                  >
                    <title>Instagram</title>
                    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
                    <circle cx="12" cy="12" r="3.5" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export { PhotographerInstagram }
