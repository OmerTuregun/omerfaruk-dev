'use client'

import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/spor-data'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
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
  suffix,
  isLast,
}: {
  value: string
  label: string
  suffix?: string
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const numeric = parseInt(value, 10)
  const animated = useCountUp(numeric, 1500, ref)

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '0 32px',
        borderRight: isLast ? 'none' : '1px solid #1f1f1f',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
          fontSize: 'clamp(48px, 6vw, 72px)',
          color: '#39ff14',
          lineHeight: 1,
          margin: 0,
        }}
      >
        {animated}
        {suffix && (
          <span style={{ color: '#ffffff' }}>{suffix}</span>
        )}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
          fontSize: 11,
          letterSpacing: 3,
          color: '#666666',
          marginTop: 8,
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
        background: '#080808',
        borderTop: '1px solid #1f1f1f',
        borderBottom: '1px solid #1f1f1f',
        padding: '60px 48px',
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
            suffix={stat.suffix}
            isLast={i === stats.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
