'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { KPIMetric } from '@/lib/dashboard-data'
import { useTheme } from './ThemeContext'

function useCountUp(target: number, duration = 1200, isDecimal = false) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(isDecimal ? target * eased : Math.round(target * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, isDecimal])

  return { count, ref }
}

function formatValue(metric: KPIMetric, count: number): string {
  if (metric.unit === 'currency') {
    return `${metric.prefix ?? '₺'}${Math.round(count).toLocaleString('tr-TR')}`
  }
  if (metric.unit === 'percent') {
    return `${count.toFixed(1)}%`
  }
  return Math.round(count).toLocaleString('tr-TR')
}

function getChangeBadgeStyle(
  metric: KPIMetric,
  success: string,
  danger: string,
): { bg: string; color: string } {
  const isChurn = metric.id === 'churn'
  const isPositive =
    (metric.change > 0 && metric.trend === 'up') ||
    (metric.trend === 'down' && isChurn)

  if (isPositive) {
    return { bg: success + '26', color: success }
  }
  return { bg: danger + '26', color: danger }
}

function Sparkline({ data, accent }: { data: number[]; accent: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 80
  const h = 28
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')
  const lastX = w
  const lastY = h - ((data[data.length - 1]! - min) / range) * (h - 4) - 2

  return (
    <svg width={80} height={28} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <polyline
        points={points}
        fill="none"
        stroke={accent}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastX} cy={lastY} r={2.5} fill={accent} />
    </svg>
  )
}

function TrendIcon({ trend, success, danger }: { trend: KPIMetric['trend']; success: string; danger: string }) {
  if (trend === 'flat') return null
  const up = trend === 'up'
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path
        d={up ? 'M8 4l4 4H4l4-4z' : 'M8 12l4-4H4l4 4z'}
        fill={up ? success : danger}
      />
    </svg>
  )
}

type KPICardProps = {
  metric: KPIMetric
  onClick?: () => void
}

export function KPICard({ metric, onClick }: KPICardProps) {
  const { colors } = useTheme()
  const isDecimal = metric.unit === 'percent'
  const { count, ref } = useCountUp(metric.value, 1200, isDecimal)
  const badgeStyle = getChangeBadgeStyle(metric, colors.success, colors.danger)
  const changePrefix = metric.change > 0 ? '+' : ''

  return (
    <motion.div
      ref={ref}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      style={{
        background: colors.bgCard,
        border: '1px solid ' + colors.border,
        borderRadius: 12,
        padding: 20,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
      }}
      onMouseEnter={
        onClick
          ? (e) => {
              e.currentTarget.style.borderColor = colors.accent
            }
          : undefined
      }
      onMouseLeave={
        onClick
          ? (e) => {
              e.currentTarget.style.borderColor = colors.border
            }
          : undefined
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {metric.label}
        </span>
        <TrendIcon trend={metric.trend} success={colors.success} danger={colors.danger} />
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: colors.textPrimary, marginBottom: 12 }}>
        {formatValue(metric, count)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            background: badgeStyle.bg,
            color: badgeStyle.color,
            padding: '2px 8px',
            borderRadius: 999,
          }}
        >
          {changePrefix}{metric.change}%
        </span>
        <Sparkline data={metric.sparkline} accent={colors.accent} />
      </div>
    </motion.div>
  )
}
