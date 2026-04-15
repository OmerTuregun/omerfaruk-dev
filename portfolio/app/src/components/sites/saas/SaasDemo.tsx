'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const demoData = {
  '7gun': {
    gelir: 48500,
    kullanici: 1240,
    donusum: 2.84,
    churn: 1.8,
    gelirTrend: '+8.2%',
    kullaniciTrend: '+5.1%',
    donusumTrend: '+0.3%',
    churnTrend: '-0.2%',
    bars: [38, 52, 44, 68, 58, 72, 65],
    line: [38, 45, 42, 55, 52, 65, 65],
    islemler: [
      { isim: 'Ahmet K.', tutar: '₺2.400', durum: 'Başarılı', renk: '#22c55e' },
      { isim: 'Zeynep M.', tutar: '₺1.800', durum: 'Başarılı', renk: '#22c55e' },
      { isim: 'Can B.', tutar: '₺3.200', durum: 'Bekliyor', renk: '#f59e0b' },
      { isim: 'Selin A.', tutar: '₺950', durum: 'Başarılı', renk: '#22c55e' },
    ],
  },
  '30gun': {
    gelir: 184200,
    kullanici: 4820,
    donusum: 3.24,
    churn: 1.4,
    gelirTrend: '+12.5%',
    kullaniciTrend: '+8.3%',
    donusumTrend: '+0.6%',
    churnTrend: '-0.4%',
    bars: [45, 58, 52, 75, 68, 84, 78],
    line: [45, 52, 58, 65, 70, 78, 78],
    islemler: [
      { isim: 'Mert Y.', tutar: '₺5.600', durum: 'Başarılı', renk: '#22c55e' },
      { isim: 'Ayşe T.', tutar: '₺3.200', durum: 'Başarılı', renk: '#22c55e' },
      { isim: 'Burak D.', tutar: '₺8.900', durum: 'Başarılı', renk: '#22c55e' },
      { isim: 'Elif K.', tutar: '₺2.100', durum: 'İptal', renk: '#ef4444' },
    ],
  },
  '3ay': {
    gelir: 284500,
    kullanici: 8429,
    donusum: 3.89,
    churn: 1.1,
    gelirTrend: '+24.8%',
    kullaniciTrend: '+18.6%',
    donusumTrend: '+1.2%',
    churnTrend: '-0.8%',
    bars: [55, 68, 62, 88, 78, 95, 90],
    line: [55, 62, 70, 76, 82, 90, 90],
    islemler: [
      { isim: 'TechCorp A.Ş.', tutar: '₺24.000', durum: 'Başarılı', renk: '#22c55e' },
      { isim: 'StartupHub', tutar: '₺18.500', durum: 'Başarılı', renk: '#22c55e' },
      { isim: 'DataFlow Ltd.', tutar: '₺32.800', durum: 'Başarılı', renk: '#22c55e' },
      { isim: 'Nexus Dijital', tutar: '₺9.200', durum: 'Bekliyor', renk: '#f59e0b' },
    ],
  },
} as const

type Period = keyof typeof demoData
type ChartType = 'bar' | 'line'

function useAnimatedNumber(target: number, duration: number = 800) {
  const [current, setCurrent] = useState(target)
  const prevTarget = useRef(target)

  useEffect(() => {
    if (prevTarget.current === target) return
    const start = prevTarget.current
    const diff = target - start
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(start + diff * eased))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        prevTarget.current = target
      }
    }

    requestAnimationFrame(tick)
  }, [target, duration])

  return current
}

const periodChartSubtitle: Record<Period, string> = {
  '7gun': 'Son 7 gün',
  '30gun': 'Son 30 gün',
  '3ay': 'Son 3 ay',
}

function TrendPill({
  trend,
  churnInverse,
}: {
  trend: string
  churnInverse?: boolean
}) {
  const up = trend.startsWith('+')
  const down = trend.startsWith('-')
  let bg = '#dcfce7'
  let color = '#16a34a'
  if (churnInverse) {
    if (down) {
      bg = '#dcfce7'
      color = '#16a34a'
    } else if (up) {
      bg = '#fee2e2'
      color = '#dc2626'
    }
  } else {
    if (up) {
      bg = '#dcfce7'
      color = '#16a34a'
    } else if (down) {
      bg = '#fee2e2'
      color = '#dc2626'
    }
  }
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
        fontSize: 12,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 20,
        background: bg,
        color,
      }}
    >
      {trend}
    </span>
  )
}

function StatusPill({ durum }: { durum: string }) {
  const bg =
    durum === 'Başarılı'
      ? '#dcfce7'
      : durum === 'Bekliyor'
        ? '#fef9c3'
        : '#fee2e2'
  const color =
    durum === 'Başarılı'
      ? '#16a34a'
      : durum === 'Bekliyor'
        ? '#ca8a04'
        : '#dc2626'
  return (
    <span
      style={{
        background: bg,
        color,
        fontSize: 12,
        padding: '3px 10px',
        borderRadius: 20,
        fontWeight: 500,
      }}
    >
      {durum}
    </span>
  )
}

const barGap = 20
const barW = 40
const barStartX = 10
const maxBarH = 120
const baselineY = 140

export default function SaasDemo() {
  const [period, setPeriod] = useState<Period>('30gun')
  const [chartType, setChartType] = useState<ChartType>('bar')
  const [liveOffset, setLiveOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const data = demoData[period]

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOffset((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLiveOffset(0)
  }, [period])

  const animatedGelir = useAnimatedNumber(data.gelir)
  const animatedKullanici = useAnimatedNumber(data.kullanici + liveOffset)
  const animatedDonusum = data.donusum
  const animatedChurn = data.churn

  const formatGelir = (n: number) =>
    n >= 1000 ? `₺${(n / 1000).toFixed(1)}K` : `₺${n}`

  const maxBar = Math.max(...data.bars)
  const linePoints = data.line.map((v, i) => {
    const x = barStartX + i * (barW + barGap) + barW / 2
    const y = baselineY - (v / 100) * maxBarH
    return { x, y }
  })
  const firstPt = linePoints[0]
  const lastPt = linePoints[linePoints.length - 1]
  const areaPath =
    firstPt && lastPt
      ? `M ${firstPt.x} ${baselineY} ${linePoints.map((p) => `L ${p.x} ${p.y}`).join(' ')} L ${lastPt.x} ${baselineY} Z`
      : ''
  const linePath = `M ${linePoints.map((p) => `${p.x} ${p.y}`).join(' L ')}`

  const dayLabels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']

  return (
    <section
      id="canli-demo"
      ref={ref}
      style={{
        background: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        padding: '100px 60px',
        scrollMarginTop: 80,
      }}
    >
      <style>{`
        @keyframes saas-demo-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .saas-demo-live-dot {
          animation: saas-demo-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span
            style={{
              background: '#eff6ff',
              color: '#4f46e5',
              border: '1px solid #c7d2fe',
              borderRadius: 20,
              padding: '4px 14px',
              fontSize: 12,
              display: 'inline-block',
              marginBottom: 16,
            }}
          >
            CANLI DEMO
          </span>
          <h2
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-1px',
              margin: 0,
            }}
          >
            Kendiniz deneyin.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: '#64748b',
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            Gerçek verilerle çalışan bir demo — filtreleri değiştirin, grafikleri
            keşfedin.
          </p>
        </motion.div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(
              [
                { key: '7gun' as const, label: 'Son 7 Gün' },
                { key: '30gun' as const, label: 'Son 30 Gün' },
                { key: '3ay' as const, label: 'Son 3 Ay' },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setPeriod(key)}
                style={{
                  background: period === key ? '#4f46e5' : '#fff',
                  color: period === key ? '#fff' : '#64748b',
                  border: period === key ? 'none' : '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: '8px 18px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: 0,
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={() => setChartType('bar')}
              style={{
                background: chartType === 'bar' ? '#4f46e5' : '#fff',
                color: chartType === 'bar' ? '#fff' : '#64748b',
                padding: '8px 16px',
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Bar
            </button>
            <button
              type="button"
              onClick={() => setChartType('line')}
              style={{
                background: chartType === 'line' ? '#4f46e5' : '#fff',
                color: chartType === 'line' ? '#fff' : '#64748b',
                padding: '8px 16px',
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Çizgi
            </button>
          </div>
        </div>

        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: 16,
            background: '#fff',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            {[
              {
                label: 'Toplam Gelir',
                value: formatGelir(animatedGelir),
                trend: data.gelirTrend,
                churnInverse: false,
                live: false,
              },
              {
                label: 'Aktif Kullanıcı',
                value: animatedKullanici.toLocaleString('tr-TR'),
                trend: data.kullaniciTrend,
                churnInverse: false,
                live: true,
              },
              {
                label: 'Dönüşüm Oranı',
                value: `%${animatedDonusum}`,
                trend: data.donusumTrend,
                churnInverse: false,
                live: false,
              },
              {
                label: 'Churn Rate',
                value: `%${animatedChurn}`,
                trend: data.churnTrend,
                churnInverse: true,
                live: false,
              },
            ].map((card, i) => (
              <div
                key={card.label}
                style={{
                  padding: 24,
                  borderRight: i < 3 ? '1px solid #e2e8f0' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: '#94a3b8',
                    marginBottom: 8,
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#0f172a',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    {card.value}
                  </span>
                  {card.live ? (
                    <span
                      className="saas-demo-live-dot"
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#22c55e',
                        flexShrink: 0,
                      }}
                      aria-hidden
                    />
                  ) : null}
                </div>
                <TrendPill
                  trend={card.trend}
                  churnInverse={card.churnInverse}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              minHeight: 300,
            }}
          >
            <div
              style={{
                padding: 24,
                borderRight: '1px solid #e2e8f0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0f172a',
                  }}
                >
                  Gelir Trendi
                </span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>
                  {periodChartSubtitle[period]}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {chartType === 'bar' ? (
                  <motion.div
                    key="bar-chart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      viewBox="0 0 420 160"
                      width="100%"
                      height={160}
                      aria-hidden
                    >
                      {data.bars.map((b, i) => {
                        const barHeight = (b / 100) * maxBarH
                        const barY = baselineY - barHeight
                        const x = barStartX + i * (barW + barGap)
                        const fill = b === maxBar ? '#4f46e5' : '#e2e8f0'
                        return (
                          <motion.rect
                            key={`${period}-bar-${i}`}
                            x={x}
                            width={barW}
                            rx={4}
                            fill={fill}
                            initial={false}
                            animate={{ height: barHeight, y: barY }}
                            transition={{
                              duration: 0.5,
                              ease: 'easeOut',
                              delay: i * 0.05,
                            }}
                          />
                        )
                      })}
                      {dayLabels.map((d, i) => (
                        <text
                          key={d}
                          x={barStartX + i * (barW + barGap) + barW / 2}
                          y={155}
                          fill="#94a3b8"
                          fontSize={10}
                          textAnchor="middle"
                          style={{ fontFamily: 'inherit' }}
                        >
                          {d}
                        </text>
                      ))}
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="line-chart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      viewBox="0 0 420 160"
                      width="100%"
                      height={160}
                      aria-hidden
                    >
                      <path d={areaPath} fill="#eff6ff" opacity={0.8} />
                      <path
                        d={linePath}
                        stroke="#4f46e5"
                        strokeWidth={2.5}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {linePoints.map((p, i) => (
                        <circle
                          key={`${period}-pt-${i}`}
                          cx={p.x}
                          cy={p.y}
                          r={4}
                          fill="#4f46e5"
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                      {dayLabels.map((d, i) => (
                        <text
                          key={d}
                          x={barStartX + i * (barW + barGap) + barW / 2}
                          y={155}
                          fill="#94a3b8"
                          fontSize={10}
                          textAnchor="middle"
                          style={{ fontFamily: 'inherit' }}
                        >
                          {d}
                        </text>
                      ))}
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: 20,
                }}
              >
                Son İşlemler
              </div>
              <AnimatePresence mode="popLayout">
                {data.islemler.map((row, i) => (
                  <motion.div
                    key={`${period}-${row.isim}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #f8fafc',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        color: '#1e293b',
                        fontWeight: 500,
                      }}
                    >
                      {row.isim}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: '#0f172a',
                        fontWeight: 600,
                      }}
                    >
                      {row.tutar}
                    </span>
                    <StatusPill durum={row.durum} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 0,
            fontSize: 12,
            color: '#94a3b8',
          }}
        >
          Bu bir demo gösterimidir — veriler simüle edilmektedir.
        </p>
      </div>
    </section>
  )
}
