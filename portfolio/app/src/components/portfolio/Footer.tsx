'use client'

export interface FooterColumnTitleProps {
  children: string
}

function FooterColumnTitle({ children }: FooterColumnTitleProps) {
  return (
    <div
      style={{
        fontSize: 11,
        color: '#444',
        letterSpacing: '0.5px',
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
  target?: '_blank' | '_self'
  rel?: string
}

function FooterLink({ href, children, target, rel }: FooterLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={{
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

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function FooterScrollLink({
  sectionId,
  children,
}: {
  sectionId: string
  children: string
}) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        scrollToId(sectionId)
      }}
      style={{
        fontSize: 13,
        color: '#555',
        textDecoration: 'none',
        display: 'block',
        marginBottom: 8,
        cursor: 'pointer',
      }}
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        padding: 60,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: '#fff',
                marginBottom: 12,
              }}
            >
              ömerfaruk.dev
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#444',
                lineHeight: 1.6,
                maxWidth: 220,
                margin: 0,
              }}
            >
              Freelance web geliştirici. Next.js, React ve modern web
              teknolojileri ile çalışıyorum.
            </p>
          </div>

          <div>
            <FooterColumnTitle>KEŞFET</FooterColumnTitle>
            <FooterScrollLink sectionId="neden-ben">KALİTELİ WEB</FooterScrollLink>
            <FooterScrollLink sectionId="projeler">PROJELER</FooterScrollLink>
            <FooterScrollLink sectionId="surec">SÜREÇ</FooterScrollLink>
            <FooterScrollLink sectionId="destek">DESTEK</FooterScrollLink>
            <FooterScrollLink sectionId="iletisim">İLETİŞİM</FooterScrollLink>
          </div>

          <div>
            <FooterColumnTitle>BAĞLANTILAR</FooterColumnTitle>
            <FooterLink href="https://github.com/OmerTuregun">GitHub</FooterLink>
            <FooterLink href="https://linkedin.com">LinkedIn</FooterLink>
            <FooterLink href="https://twitter.com">Twitter</FooterLink>
          </div>

          <div>
            <FooterColumnTitle>İLETİŞİM</FooterColumnTitle>
            <FooterScrollLink sectionId="iletisim">İLETİŞİM FORMU</FooterScrollLink>
            <FooterLink href="/cv.pdf">CV indir</FooterLink>
            <FooterScrollLink sectionId="projeler">MÜSAİTLİK DURUMU</FooterScrollLink>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #1f1f1f',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: '#333' }}>
            © 2025 ömerfaruk.dev
          </span>
          <span style={{ fontSize: 12, color: '#333' }}>
            İstanbul, Türkiye
          </span>
        </div>
      </div>
    </footer>
  )
}
