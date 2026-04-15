export interface FooterColumnTitleProps {
  children: string
}

function FooterColumnTitle({ children }: FooterColumnTitleProps) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 11,
        color: '#888',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  )
}

export interface FooterLinkProps {
  href: string
  children: string
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 13,
        color: '#555',
        textDecoration: 'none',
        display: 'block',
        marginBottom: 8,
      }}
    >
      {children}
    </a>
  )
}

export function RestaurantFooter() {
  return (
    <footer
      style={{
        background: '#0f0a04',
        padding: '60px 80px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 40,
          paddingBottom: 40,
          borderBottom: '1px solid rgba(200,169,110,0.15)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 16,
              color: '#c8a96e',
              letterSpacing: '3px',
            }}
          >
            MARCELLO&apos;S
          </div>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 13,
              color: '#555',
              lineHeight: 1.7,
              marginTop: 12,
              marginBottom: 0,
              whiteSpace: 'pre-line',
            }}
          >
            Via della Cucina, No:12{'\n'}Beyoğlu, İstanbul
          </p>
        </div>

        <div>
          <FooterColumnTitle>Bağlantılar</FooterColumnTitle>
          <FooterLink href="#menu">Menü</FooterLink>
          <FooterLink href="#hakkimizda">Hakkımızda</FooterLink>
          <FooterLink href="#rezervasyon">Rezervasyon</FooterLink>
          <FooterLink href="#atmosfer">Atmosfer</FooterLink>
          <FooterLink href="#yorumlar">Yorumlar</FooterLink>
          <FooterLink href="#etkinlikler">Etkinlikler</FooterLink>
          <FooterLink href="#konum">Konum</FooterLink>
        </div>

        <div>
          <FooterColumnTitle>İletişim</FooterColumnTitle>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 13,
              color: '#555',
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            +90 212 555 0 555
            <br />
            info@marcellos.com.tr
            <br />
            Pzt–Paz: 12:00 – 23:00
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          paddingTop: 24,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 12,
            color: '#333',
          }}
        >
          © 2025 Marcello&apos;s Ristorante
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 12,
            color: '#333',
          }}
        >
          İstanbul, Türkiye
        </span>
      </div>
    </footer>
  )
}
