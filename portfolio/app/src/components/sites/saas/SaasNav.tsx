'use client'

import { useState } from 'react'

import { SaasModal } from '@/components/sites/saas/SaasModal'

const colors = {
  primary: '#4f46e5',
  primaryHover: '#4338ca',
  dark: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  white: '#ffffff',
} as const

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function SaasNav() {
  const [ctaHover, setCtaHover] = useState(false)
  const [modalType, setModalType] = useState<'signup' | 'demo' | null>(null)

  const linkStyle = {
    fontSize: 14,
    color: colors.muted,
    cursor: 'pointer',
  } as const

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 60px',
        height: 64,
        borderBottom: `1px solid ${colors.border}`,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        aria-label="Ana sayfa"
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
            color: colors.dark,
            letterSpacing: '-0.4px',
          }}
        >
          Datawise
        </span>
      </button>

      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 32,
        }}
        aria-label="Ana navigasyon"
      >
        <button
          type="button"
          onClick={() => scrollTo('ozellikler')}
          style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }}
        >
          Özellikler
        </button>
        <button
          type="button"
          onClick={() => scrollTo('nasil-calisir')}
          style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }}
        >
          Nasıl Çalışır
        </button>
        <button
          type="button"
          onClick={() => scrollTo('entegrasyonlar')}
          style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }}
        >
          Entegrasyonlar
        </button>
        <button
          type="button"
          onClick={() => scrollTo('fiyatlandirma')}
          style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }}
        >
          Fiyatlandırma
        </button>
        <button
          type="button"
          onClick={() => scrollTo('yorumlar')}
          style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }}
        >
          Yorumlar
        </button>
        <button
          type="button"
          onClick={() => scrollTo('sss')}
          style={{ ...linkStyle, background: 'none', border: 'none', padding: 0 }}
        >
          SSS
        </button>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setModalType('signup')}
          style={{
            ...linkStyle,
            marginRight: 8,
            background: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          Giriş Yap
        </button>
        <button
          type="button"
          onClick={() => setModalType('signup')}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            background: ctaHover ? colors.primaryHover : colors.primary,
            color: colors.white,
            border: 'none',
            borderRadius: 8,
            padding: '9px 20px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.15s ease',
          }}
        >
          Ücretsiz Başla →
        </button>
      </div>

      <SaasModal type={modalType} onClose={() => setModalType(null)} />
    </header>
  )
}
