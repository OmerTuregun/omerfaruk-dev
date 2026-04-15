'use client'

import { Fragment, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const colors = {
  primary: '#4f46e5',
  dark: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  surface: '#f8fafc',
} as const

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    n: 1,
    title: 'Hesabınızı Oluşturun',
    description:
      'E-posta adresinizle 30 saniyede kayıt olun. Kredi kartı gerekmez, 14 gün ücretsiz deneyin.',
  },
  {
    n: 2,
    title: 'Verilerinizi Bağlayın',
    description:
      'Mevcut araçlarınızı — Shopify, Stripe, Google Analytics — tek tıkla entegre edin.',
  },
  {
    n: 3,
    title: 'Analiz Edin ve Büyüyün',
    description:
      "Dashboard'unuz anında hazır. Verilerinizi görselleştirin, kararlarınızı güvenle alın.",
  },
] as const

function Arrow() {
  return (
    <span
      style={{
        fontSize: 24,
        color: '#334155',
        alignSelf: 'center',
        flexShrink: 0,
        padding: '0 8px',
      }}
      aria-hidden
    >
      →
    </span>
  )
}

export function SaasHowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      id="nasil-calisir"
      style={{
        background: '#0f172a',
        borderTop: '1px solid #1e293b',
        borderBottom: '1px solid #1e293b',
        padding: '100px 60px',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span
            style={{
              fontSize: 12,
              background: 'rgba(79,70,229,0.2)',
              color: '#818cf8',
              border: '1px solid rgba(79,70,229,0.3)',
              borderRadius: 20,
              padding: '4px 14px',
              display: 'inline-block',
              marginBottom: 16,
            }}
          >
            NASIL ÇALIŞIR
          </span>
          <h2
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 8px',
            }}
          >
            3 adımda kullanıma hazır.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: '#475569',
              margin: 0,
            }}
          >
            Kurulum yok, teknik bilgi gerekmez.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 0,
          }}
        >
          {steps.map((step, index) => (
            <Fragment key={step.n}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease,
                }}
                style={{
                  textAlign: 'center',
                  flex: '1 1 200px',
                  maxWidth: 280,
                  minWidth: 200,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: colors.primary,
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  {step.n}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: '0 0 12px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: '#94a3b8',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
              {index < steps.length - 1 ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                  }}
                >
                  <Arrow />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
