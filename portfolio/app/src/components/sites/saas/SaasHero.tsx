'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { SaasModal } from '@/components/sites/saas/SaasModal'

const colors = {
  primary: '#4f46e5',
  dark: '#0f172a',
  muted: '#64748b',
  subtle: '#94a3b8',
  border: '#e2e8f0',
  surface: '#f8fafc',
  white: '#ffffff',
} as const

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease },
  }),
}

const barSpecs = [
  { x: 10, h: 40, active: false },
  { x: 50, h: 65, active: false },
  { x: 90, h: 50, active: false },
  { x: 130, h: 80, active: true },
  { x: 170, h: 60, active: false },
  { x: 210, h: 90, active: false },
  { x: 250, h: 75, active: false },
] as const

function DashboardMockup() {
  const navItems = [
    { label: 'Dashboard', active: true },
    { label: 'Analitik', active: false },
    { label: 'Raporlar', active: false },
    { label: 'Müşteriler', active: false },
    { label: 'Ayarlar', active: false },
  ] as const

  const metrics = [
    { label: 'Toplam Gelir', value: '₺284.5K', trend: '↑ 12.5%' },
    { label: 'Aktif Kullanıcı', value: '8,429', trend: '↑ 3.2%' },
    { label: 'Dönüşüm Oranı', value: '%3.24', trend: '↑ 0.8%' },
    { label: 'Churn Rate', value: '%1.2', trend: '↓ 0.3%' },
  ] as const

  const rows = [
    { name: 'Ahmet K.', amount: '₺2,400', status: 'Başarılı', statusColor: '#22c55e' },
    { name: 'Zeynep M.', amount: '₺1,800', status: 'Başarılı', statusColor: '#22c55e' },
    { name: 'Can B.', amount: '₺3,200', status: 'Bekliyor', statusColor: '#eab308' },
  ] as const

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: '12px 12px 0 0',
        overflow: 'hidden',
        background: colors.white,
      }}
    >
      <div
        style={{
          height: 40,
          background: colors.surface,
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
          position: 'relative',
        }}
      >
        <span
          style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }}
        />
        <span
          style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }}
        />
        <span
          style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            background: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            padding: '4px 16px',
            fontSize: 12,
            color: colors.subtle,
            width: 240,
            textAlign: 'center',
          }}
        >
          app.datawise.io/dashboard
        </div>
      </div>

      <div
        style={{
          height: 400,
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          background: colors.surface,
        }}
      >
        <aside
          style={{
            background: colors.white,
            borderRight: `1px solid ${colors.border}`,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 24,
            }}
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
                fontSize: 13,
                fontWeight: 600,
                color: colors.dark,
              }}
            >
              Datawise
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              flex: 1,
            }}
          >
            {navItems.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  background: item.active ? '#eff6ff' : 'transparent',
                  color: item.active ? colors.primary : colors.subtle,
                  fontWeight: item.active ? 500 : 400,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 24,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: colors.border,
              }}
            />
            <span style={{ fontSize: 11, color: colors.muted }}>Ahmet Y.</span>
          </div>
        </aside>

        <div style={{ padding: 20 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 10,
              marginBottom: 16,
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: colors.white,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: colors.subtle,
                    marginBottom: 4,
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: colors.dark,
                  }}
                >
                  {m.value}
                </div>
                <div style={{ fontSize: 10, color: '#22c55e' }}>{m.trend}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
            }}
          >
            <div
              style={{
                background: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                padding: 12,
                height: 160,
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: colors.dark,
                  marginBottom: 12,
                }}
              >
                Aylık Gelir
              </div>
              <svg
                viewBox="0 0 300 100"
                width="100%"
                height={80}
                preserveAspectRatio="xMidYMax meet"
                aria-hidden
              >
                {barSpecs.map((b) => (
                  <rect
                    key={b.x}
                    x={b.x}
                    y={100 - b.h}
                    width={30}
                    height={b.h}
                    rx={4}
                    fill={b.active ? colors.primary : colors.border}
                  />
                ))}
              </svg>
            </div>

            <div
              style={{
                background: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: 8,
                padding: 12,
                height: 160,
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: colors.dark,
                  marginBottom: 12,
                }}
              >
                Son İşlemler
              </div>
              {rows.map((row) => (
                <div
                  key={row.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: `1px solid #f1f5f9`,
                    fontSize: 10,
                  }}
                >
                  <span style={{ color: colors.dark }}>{row.name}</span>
                  <span style={{ color: colors.dark }}>{row.amount}</span>
                  <span style={{ color: row.statusColor }}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SaasHero() {
  const heroRef = useRef<HTMLElement>(null)
  const [modalType, setModalType] = useState<'signup' | 'demo' | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const mockupY = useTransform(scrollYProgress, [0, 1], ['0px', '80px'])
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3])

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 60px 80px',
        textAlign: 'center',
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-gradient {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #eff6ff 20%,
            #eef2ff 40%,
            #f5f3ff 60%,
            #eff6ff 80%,
            #ffffff 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        @keyframes blobMove1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(30px, -50px) scale(1.1); }
          66%       { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes blobMove2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(-40px, 30px) scale(1.05); }
          66%       { transform: translate(20px, -30px) scale(0.95); }
        }
        .hero-blob-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.08);
          filter: blur(80px);
          top: -100px;
          right: -100px;
          animation: blobMove1 10s ease-in-out infinite;
        }
        .hero-blob-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.06);
          filter: blur(80px);
          bottom: 0px;
          left: -50px;
          animation: blobMove2 12s ease-in-out infinite;
        }
        .hero-blob-3 {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.05);
          filter: blur(60px);
          top: 40%;
          left: 40%;
          animation: blobMove1 15s ease-in-out infinite reverse;
        }
      `}</style>

      <div className="hero-gradient">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />
        <div className="hero-blob-3" />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          flex: '1 1 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1 1 auto',
            width: '100%',
          }}
        >
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: 20,
              padding: '6px 16px',
              marginBottom: 24,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#22c55e',
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: '#3b82f6',
                fontWeight: 500,
              }}
            >
              Yeni: Yapay zeka destekli anomali tespiti →
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: colors.dark,
              letterSpacing: '-2px',
              lineHeight: 1.1,
              maxWidth: 800,
              margin: '0 0 24px',
            }}
          >
            Verileriniz artık
            <br />
            <span style={{ color: colors.primary }}>sizin için çalışıyor.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontSize: 18,
              color: colors.muted,
              lineHeight: 1.7,
              maxWidth: 520,
              margin: '0 0 40px',
            }}
          >
            Gerçek zamanlı analitik, akıllı raporlama ve otomatik uyarılarla
            işletmenizin nabzını anlık takip edin.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              marginBottom: 64,
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
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Ücretsiz Başla
            </button>
            <button
              type="button"
              onClick={() => setModalType('demo')}
              style={{
                background: colors.white,
                color: colors.dark,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                padding: '14px 28px',
                fontSize: 15,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 12, color: colors.primary }}>▶</span>
              Demo İzle
            </button>
          </motion.div>
        </div>

        <motion.div
          style={{
            y: mockupY,
            opacity: mockupOpacity,
            maxWidth: '1000px',
            width: '100%',
            margin: '0 auto',
            marginTop: 'auto',
          }}
        >
          <DashboardMockup />
        </motion.div>
      </div>

      <SaasModal type={modalType} onClose={() => setModalType(null)} />
    </section>
  )
}
