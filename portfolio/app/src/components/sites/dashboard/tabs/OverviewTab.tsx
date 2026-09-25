'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { chartData, kpiMetrics, transactions, type ChartPoint, type Transaction } from '@/lib/dashboard-data'
import { KPICard } from '@/components/sites/dashboard/shared/KPICard'
import { LiveIndicator } from '@/components/sites/dashboard/shared/LiveIndicator'
import { ChartTooltip } from '@/components/sites/dashboard/shared/ChartTooltip'
import { useTheme } from '@/components/sites/dashboard/shared/ThemeContext'

type Period = '7d' | '30d' | '90d' | '1y'
type ChartMode = 'bar' | 'line'

const PERIODS: Period[] = ['7d', '30d', '90d', '1y']
const PERIOD_LABELS: Record<Period, string> = { '7d': '7G', '30d': '30G', '90d': '90G', '1y': '1Y' }

const kpiTabMap: Record<string, string> = {
  revenue: 'analytics',
  users: 'users',
  churn: 'insights',
  mrr_growth: 'analytics',
}

function changeDashboardTab(tabId: string) {
  window.dispatchEvent(new CustomEvent('dashboardTabChange', { detail: tabId }))
}

const PLAN_DIST = [
  { name: 'Starter', color: '#374151', percent: 18 },
  { name: 'Pro', color: '#6366f1', percent: 54 },
  { name: 'Enterprise', color: '#10b981', percent: 28 },
]

const RANDOM_POOL = {
  users: ['Deniz Ak', 'Zeynep Öz', 'Can Polat', 'Elif Nur', 'Oğuz Han', 'Selin Ar'],
  emails: ['deniz@tech.io', 'zeynep@startup.co', 'can@saas.com', 'elif@corp.tr', 'oguz@media.io', 'selin@dev.co'],
  plans: ['Starter', 'Pro', 'Enterprise'] as Transaction['plan'][],
  statuses: ['success', 'pending', 'failed'] as Transaction['status'][],
  countries: ['TR', 'US', 'DE', 'MX', 'KR'],
  amounts: [990, 2490, 8970],
}

function statusBadge(status: Transaction['status']) {
  const map = {
    success: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', label: 'Başarılı' },
    pending: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', label: 'Beklemede' },
    failed: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', label: 'Başarısız' },
  }
  return map[status]
}

function planBadge(plan: Transaction['plan']) {
  const map = {
    Starter: { bg: 'rgba(55, 65, 81, 0.4)', color: '#9ca3af' },
    Pro: { bg: 'rgba(79, 70, 229, 0.2)', color: '#818cf8' },
    Enterprise: { bg: 'rgba(5, 150, 105, 0.2)', color: '#34d399' },
  }
  return map[plan]
}

function generateRandomTxn(counter: number): Transaction {
  const i = Math.floor(Math.random() * RANDOM_POOL.users.length)
  return {
    id: `TXN-${8800 + counter}`,
    user: RANDOM_POOL.users[i]!,
    email: RANDOM_POOL.emails[i]!,
    amount: RANDOM_POOL.amounts[Math.floor(Math.random() * RANDOM_POOL.amounts.length)]!,
    status: RANDOM_POOL.statuses[Math.floor(Math.random() * RANDOM_POOL.statuses.length)]!,
    plan: RANDOM_POOL.plans[Math.floor(Math.random() * RANDOM_POOL.plans.length)]!,
    date: '2024-12-29',
    country: RANDOM_POOL.countries[Math.floor(Math.random() * RANDOM_POOL.countries.length)]!,
  }
}

function RevenueChart({
  data,
  mode,
}: {
  data: ChartPoint[]
  mode: ChartMode
}) {
  const { colors } = useTheme()
  const [hovered, setHovered] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const chartW = 600
  const chartH = 180
  const padL = 40
  const padB = 30
  const padT = 10
  const innerW = chartW - padL - 10
  const innerH = chartH - padB - padT
  const maxRev = Math.max(...data.map((d) => d.revenue))

  const handleHover = useCallback((idx: number, cx: number, cy: number) => {
    setHovered(idx)
    if (containerRef.current) {
      setTooltipPos({ x: cx, y: cy - 10 })
    }
  }, [])

  const barW = innerW / data.length * 0.6
  const gap = innerW / data.length

  const linePoints = data.map((d, i) => {
    const x = padL + i * gap + gap / 2
    const y = padT + innerH - (d.revenue / maxRev) * innerH
    return { x, y, d }
  })

  const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${linePoints[linePoints.length - 1]!.x} ${padT + innerH} L ${linePoints[0]!.x} ${padT + innerH} Z`

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <svg width="100%" viewBox={`0 0 ${chartW} ${chartH}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.accent} stopOpacity={0.3} />
            <stop offset="100%" stopColor={colors.accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={padL}
            y1={padT + (innerH / 3) * i}
            x2={chartW - 10}
            y2={padT + (innerH / 3) * i}
            stroke={colors.border}
            strokeWidth={1}
          />
        ))}
        {mode === 'bar' &&
          data.map((d, i) => {
            const barH = (d.revenue / maxRev) * innerH
            const x = padL + i * gap + (gap - barW) / 2
            const y = padT + innerH - barH
            const cx = x + barW / 2
            return (
              <motion.rect
                key={d.label}
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill={hovered === i ? colors.accentHover : colors.accent}
                rx={3}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ transformOrigin: `${cx}px ${padT + innerH}px` }}
                onMouseEnter={() => handleHover(i, cx, y)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}
        {mode === 'line' && (
          <>
            <motion.path
              d={areaPath}
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke={colors.accent}
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
            {linePoints.map((p, i) => (
              <circle
                key={p.d.label}
                cx={p.x}
                cy={p.y}
                r={hovered === i ? 5 : 3}
                fill={colors.accent}
                onMouseEnter={() => handleHover(i, p.x, p.y)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </>
        )}
        {data.map((d, i) => {
          const x = padL + i * gap + gap / 2
          return (
            <text key={`lbl-${d.label}`} x={x} y={chartH - 8} textAnchor="middle" fill={colors.textMuted} fontSize={10}>
              {d.label}
            </text>
          )
        })}
      </svg>
      {hovered !== null && data[hovered] && (
        <ChartTooltip
          x={tooltipPos.x}
          y={tooltipPos.y}
          revenue={data[hovered].revenue}
          users={data[hovered].users}
          visible
        />
      )}
    </div>
  )
}

function DonutChart() {
  const { colors } = useTheme()
  const r = 60
  const cx = 80
  const cy = 80
  const circumference = 2 * Math.PI * r
  let offset = 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={160} height={160} viewBox="0 0 160 160">
        {PLAN_DIST.map((plan) => {
          const dash = (plan.percent / 100) * circumference
          const currentOffset = offset
          offset += dash
          return (
            <motion.circle
              key={plan.name}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={plan.color}
              strokeWidth={16}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-currentOffset}
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          )
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill={colors.textPrimary} fontSize={18} fontWeight={700}>
          12,847
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill={colors.textMuted} fontSize={11}>
          kullanıcı
        </text>
      </svg>
      <div style={{ marginTop: 16, width: '100%' }}>
        {PLAN_DIST.map((plan) => (
          <div key={plan.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: plan.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: colors.textSecondary, flex: 1 }}>{plan.name}</span>
            <span style={{ fontSize: 13, color: colors.textPrimary, fontWeight: 600 }}>{plan.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function OverviewTab() {
  const { colors } = useTheme()
  const [period, setPeriod] = useState<Period>('7d')
  const [chartMode, setChartMode] = useState<ChartMode>('bar')
  const [txns, setTxns] = useState<Transaction[]>(transactions.slice(0, 8))
  const counterRef = useRef(8822)

  useEffect(() => {
    const interval = setInterval(() => {
      counterRef.current += 1
      const newTxn = generateRandomTxn(counterRef.current)
      setTxns((prev) => [newTxn, ...prev].slice(0, 8))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentData = chartData[period]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>Genel Bakış</h1>
          <LiveIndicator />
          <span style={{ fontSize: 13, color: colors.textMuted }}>Aralık 2024</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: period === p ? 'none' : '1px solid ' + colors.border,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                background: period === p ? colors.accent : colors.bgCard,
                color: period === p ? '#fff' : colors.textSecondary,
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {kpiMetrics.map((m) => (
          <KPICard
            key={m.id}
            metric={m}
            onClick={() => {
              const tab = kpiTabMap[m.id]
              if (tab) changeDashboardTab(tab)
            }}
          />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 24 }}>
        <div
          style={{
            background: colors.bgCard,
            border: '1px solid ' + colors.border,
            borderRadius: 12,
            padding: 20,
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: 0 }}>Gelir & Kullanıcı</h2>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['bar', 'line'] as ChartMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setChartMode(m)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    background: chartMode === m ? colors.accent : colors.bgCardHover,
                    color: chartMode === m ? '#fff' : colors.textMuted,
                  }}
                >
                  {m === 'bar' ? 'Bar' : 'Line'}
                </button>
              ))}
            </div>
          </div>
          <RevenueChart data={currentData} mode={chartMode} />
        </div>

        <div
          style={{
            background: colors.bgCard,
            border: '1px solid ' + colors.border,
            borderRadius: 12,
            padding: 20,
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px' }}>Plan Dağılımı</h2>
          <DonutChart />
        </div>
      </div>

      <div
        style={{
          background: colors.bgCard,
          border: '1px solid ' + colors.border,
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: 0 }}>Son İşlemler</h2>
          <button
            type="button"
            onClick={() => changeDashboardTab('users')}
            style={{
              fontSize: 13,
              color: colors.accent,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              fontFamily: 'inherit',
              padding: 0,
            }}
          >
            Tümünü Gör →
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr 80px 90px 90px 90px',
            padding: '10px 20px',
            background: colors.bgSecondary,
            fontSize: 11,
            color: colors.textMuted,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          <span>ID</span>
          <span>Kullanıcı</span>
          <span>Plan</span>
          <span>Tutar</span>
          <span>Durum</span>
          <span>Tarih</span>
        </div>
        <AnimatePresence initial={false}>
          {txns.map((txn) => {
            const st = statusBadge(txn.status)
            const pl = planBadge(txn.plan)
            return (
              <motion.div
                key={txn.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr 80px 90px 90px 90px',
                  padding: '12px 20px',
                  borderBottom: '1px solid ' + colors.border,
                  alignItems: 'center',
                  fontSize: 13,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgCardHover }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ color: colors.textMuted, fontFamily: 'monospace', fontSize: 11 }}>{txn.id}</span>
                <span style={{ color: colors.textPrimary }}>{txn.user}</span>
                <span>
                  <span style={{ background: pl.bg, color: pl.color, padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>
                    {txn.plan}
                  </span>
                </span>
                <span style={{ color: colors.textPrimary }}>₺{txn.amount.toLocaleString('tr-TR')}</span>
                <span>
                  <span style={{ background: st.bg, color: st.color, padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>
                    {st.label}
                  </span>
                </span>
                <span style={{ color: colors.textMuted }}>{txn.date}</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
