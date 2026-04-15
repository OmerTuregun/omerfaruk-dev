'use client'

import Link from 'next/link'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export interface NavButtonProps {
  sectionId: string
  children: string
}

function NavButton({ sectionId, children }: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(sectionId)}
      style={{
        fontSize: 14,
        color: '#666',
        textDecoration: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  )
}

export function Navbar() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 60px',
        borderBottom: '1px solid #f0f0f0',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: '#111',
          letterSpacing: '-0.3px',
          textDecoration: 'none',
        }}
      >
        ömerfaruk.dev
      </Link>

      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 36,
        }}
      >
        <NavButton sectionId="neden-ben">KALİTELİ WEB</NavButton>
        <NavButton sectionId="projeler">PROJELER</NavButton>
        <NavButton sectionId="surec">SÜREÇ</NavButton>
        <NavButton sectionId="destek">DESTEK</NavButton>
        <NavButton sectionId="iletisim">İLETİŞİM</NavButton>
      </nav>

      <button
        type="button"
        onClick={() => scrollToId('iletisim')}
        style={{
          background: '#111',
          color: '#fff',
          border: 'none',
          borderRadius: 20,
          padding: '7px 18px',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        BİRLİKTE ÇALIŞALIM
      </button>
    </header>
  )
}
