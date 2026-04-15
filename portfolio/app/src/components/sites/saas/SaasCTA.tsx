'use client'

import { useState } from 'react'

import { SaasModal } from '@/components/sites/saas/SaasModal'

const colors = {
  primary: '#4f46e5',
  dark: '#0f172a',
  muted: '#475569',
  subtle: '#94a3b8',
  slate: '#334155',
} as const

export function SaasCTA() {
  const [modalType, setModalType] = useState<'signup' | 'demo' | null>(null)

  return (
    <section
      style={{
        background: colors.dark,
        padding: '100px 60px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <span
          style={{
            background: 'rgba(79,70,229,0.2)',
            color: '#818cf8',
            border: '1px solid rgba(79,70,229,0.3)',
            borderRadius: 20,
            padding: '6px 18px',
            fontSize: 13,
            display: 'inline-block',
            marginBottom: 24,
          }}
        >
          14 GÜN ÜCRETSİZ DENEME
        </span>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-1.5px',
            margin: '0 0 16px',
          }}
        >
          Verileriniz sizi bekliyor.
        </h2>
        <p
          style={{
            fontSize: 17,
            color: colors.muted,
            margin: '0 0 40px',
          }}
        >
          Kredi kartı gerekmez. Kurulum yok. 30 saniyede başlayın.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => setModalType('signup')}
            style={{
              background: colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '15px 32px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Ücretsiz Başla
          </button>
          <button
            type="button"
            onClick={() => setModalType('demo')}
            style={{
              background: 'transparent',
              color: colors.subtle,
              border: `1px solid ${colors.slate}`,
              borderRadius: 10,
              padding: '15px 32px',
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            Demo İste
          </button>
        </div>
        <p
          style={{
            fontSize: 13,
            color: colors.slate,
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          2.000&apos;den fazla şirket Datawise kullanıyor
        </p>
      </div>

      <SaasModal type={modalType} onClose={() => setModalType(null)} />
    </section>
  )
}
