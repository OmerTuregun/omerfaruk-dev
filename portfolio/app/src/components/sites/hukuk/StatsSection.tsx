'use client'

import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/hukuk-data'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

type ParsedStat = {
  prefix: string
  numeric: number
  suffix: string
  useDotFormatting: boolean
}

function parseStatValue(value: string): ParsedStat {
  if (value.startsWith('%')) {
    const numeric = parseInt(value.slice(1), 10)
    return { prefix: '%', numeric, suffix: '', useDotFormatting: false }
  }

  const match = value.match(/^([\d.]+)(\+?)$/)
  if (match) {
    const raw = match[1] ?? '0'
    const suffix = match[2] ?? ''
    if (raw.includes('.')) {
      const numeric = parseInt(raw.replace(/\./g, ''), 10)
      return { prefix: '', numeric, suffix, useDotFormatting: true }
    }
    const numeric = parseInt(raw, 10)
    return { prefix: '', numeric, suffix, useDotFormatting: false }
  }

  return { prefix: '', numeric: 0, suffix: '', useDotFormatting: false }
}

function formatWithDots(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function useCountUp(
  target: number,
  duration: number,
  ref: React.RefObject<HTMLDivElement | null>
): number {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  useEffect(() => {
    if (!active) return

    let start: number | null = null
    let frameId: number

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(easeOutCubic(progress) * target))
      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [target, duration, active])

  return count
}

function StatItem({
  value,
  label,
  isLast,
}: {
  value: string
  label: string
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const parsed = parseStatValue(value)
  const animated = useCountUp(parsed.numeric, 2000, ref)

  const displayValue = parsed.useDotFormatting
    ? formatWithDots(animated)
    : String(animated)

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '0 32px',
        borderRight: isLast ? 'none' : '1px solid rgba(245, 240, 232, 0.1)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-libre-baskerville), "Libre Baskerville", serif',
          fontSize: 'clamp(40px, 5vw, 56px)',
          fontWeight: 400,
          color: '#fafaf8',
          margin: 0,
          lineHeight: 1,
        }}
      >
        {parsed.prefix}
        {displayValue}
        {parsed.suffix}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-inter-hukuk), Inter, sans-serif',
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(250, 250, 248, 0.5)',
          marginTop: 12,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
    </div>
  )
}

export function StatsSection() {
  return (
    <section
      id="stats"
      style={{
        background: '#1a3a5c',
        padding: '80px 48px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {stats.map((stat, i) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            label={stat.label}
            isLast={i === stats.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
