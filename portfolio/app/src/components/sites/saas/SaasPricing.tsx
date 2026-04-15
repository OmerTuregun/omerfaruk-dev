'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import { SaasModal } from '@/components/sites/saas/SaasModal'

const colors = {
  primary: '#4f46e5',
  dark: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  white: '#ffffff',
  text: '#374151',
} as const

const ease = [0.22, 1, 0.36, 1] as const

type PlanId = 'starter' | 'pro' | 'enterprise'

type Plan = {
  id: PlanId
  name: string
  /** Aylık faturalandırmada /ay gösterilen tutar */
  monthlyPerMonth: number
  /** Yıllık planda eşdeğer /ay tutarı (daha düşük) */
  yearlyPerMonth: number
  /** Yıllık toplam fatura (12 ay) */
  yearlyBilledTotal: number
  description: string
  features: readonly string[]
  cta: string
  featured: boolean
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPerMonth: 490,
    yearlyPerMonth: 390,
    yearlyBilledTotal: 4680,
    description: 'Küçük ekipler ve yeni başlayanlar için.',
    features: [
      '5 kullanıcıya kadar',
      '10 dashboard',
      '7 günlük veri geçmişi',
      'E-posta desteği',
    ],
    cta: 'Ücretsiz Başla',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPerMonth: 990,
    yearlyPerMonth: 790,
    yearlyBilledTotal: 9480,
    description: 'Büyüyen şirketler için en popüler plan.',
    features: [
      '25 kullanıcıya kadar',
      'Sınırsız dashboard',
      '1 yıllık veri geçmişi',
      'Öncelikli destek',
      'API erişimi',
    ],
    cta: 'Hemen Başla',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPerMonth: 2490,
    yearlyPerMonth: 1990,
    yearlyBilledTotal: 23880,
    description: 'Büyük organizasyonlar için özel çözüm.',
    features: [
      'Sınırsız kullanıcı',
      'Özel entegrasyonlar',
      'Sınırsız veri geçmişi',
      '7/24 telefon desteği',
      'SLA garantisi',
    ],
    cta: 'Satışla İletişime Geç',
    featured: false,
  },
]

function formatPrice(amount: number): string {
  return `₺${amount.toLocaleString('tr-TR')}`
}

function CheckIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.primary}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function SaasPricing() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const [isYearly, setIsYearly] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [modalType, setModalType] = useState<'signup' | 'demo' | null>(null)

  return (
    <section
      ref={ref}
      id="fiyatlandirma"
      style={{
        padding: '100px 60px',
        maxWidth: 1200,
        margin: '0 auto',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span
          style={{
            fontSize: 12,
            color: colors.primary,
            background: '#eff6ff',
            border: '1px solid #c7d2fe',
            borderRadius: 20,
            padding: '4px 14px',
            display: 'inline-block',
            marginBottom: 16,
          }}
        >
          FİYATLANDIRMA
        </span>
        <h2
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.dark,
            margin: '0 0 16px',
          }}
        >
          Şeffaf ve adil fiyatlandırma.
        </h2>
        <p
          style={{
            fontSize: 17,
            color: colors.muted,
            margin: 0,
          }}
        >
          İhtiyacınıza göre büyüyen planlar.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 64,
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setIsYearly(false)}
          style={{
            fontSize: 14,
            fontWeight: isYearly ? 400 : 600,
            color: isYearly ? colors.muted : colors.dark,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
          }}
        >
          Aylık
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={isYearly}
          onClick={() => setIsYearly((v) => !v)}
          style={{
            width: 48,
            height: 26,
            borderRadius: 13,
            border: `1px solid ${colors.border}`,
            background: isYearly ? colors.primary : colors.white,
            cursor: 'pointer',
            position: 'relative',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 3,
              left: isYearly ? 24 : 3,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              transition: 'left 0.2s ease',
            }}
          />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={() => setIsYearly(true)}
            style={{
              fontSize: 14,
              fontWeight: isYearly ? 600 : 400,
              color: isYearly ? colors.dark : colors.muted,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            Yıllık
          </button>
          <span
            style={{
              background: '#dcfce7',
              color: '#166534',
              fontSize: 12,
              borderRadius: 20,
              padding: '2px 8px',
            }}
          >
            %20 indirim
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
      >
        {plans.map((plan, index) => {
          const displayPerMonth = isYearly
            ? plan.yearlyPerMonth
            : plan.monthlyPerMonth

          return (
            <motion.article
              key={plan.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease }}
              style={{
                border: plan.featured
                  ? `2px solid ${colors.primary}`
                  : `1px solid ${colors.border}`,
                borderColor:
                  hoveredIndex === index
                    ? '#c7d2fe'
                    : index === 1
                      ? colors.primary
                      : colors.border,
                borderRadius: 16,
                padding: 36,
                position: 'relative',
                background: colors.white,
                transform: hoveredIndex === index ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
            >
              {plan.featured ? (
                <span
                  style={{
                    position: 'absolute',
                    top: -14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: colors.primary,
                    color: '#fff',
                    fontSize: 12,
                    padding: '4px 16px',
                    borderRadius: 20,
                    whiteSpace: 'nowrap',
                  }}
                >
                  En Popüler
                </span>
              ) : null}

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.muted,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                {plan.name}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span
                    style={{
                      fontSize: 48,
                      fontWeight: 700,
                      color: colors.dark,
                      letterSpacing: '-1px',
                    }}
                  >
                    {formatPrice(displayPerMonth)}
                  </span>
                  <span style={{ fontSize: 16, color: colors.muted }}>/ay</span>
                </div>
                {isYearly ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: '#94a3b8',
                      marginTop: 4,
                    }}
                  >
                    {`${formatPrice(plan.yearlyBilledTotal)}/yıl olarak faturalandırılır`}
                  </div>
                ) : null}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: colors.muted,
                  margin: '12px 0 28px',
                  lineHeight: 1.6,
                }}
              >
                {plan.description}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                    }}
                  >
                    <CheckIcon />
                    <span style={{ fontSize: 14, color: colors.text }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  if (plan.id === 'enterprise') setModalType('demo')
                  else setModalType('signup')
                }}
                style={{
                  border: plan.featured ? 'none' : `1px solid ${colors.border}`,
                  background: plan.featured ? colors.primary : colors.white,
                  color: plan.featured ? '#fff' : colors.dark,
                  borderRadius: 10,
                  padding: 13,
                  width: '100%',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                {plan.cta}
              </button>
            </motion.article>
          )
        })}
      </div>

      <SaasModal type={modalType} onClose={() => setModalType(null)} />
    </section>
  )
}
