'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '@/lib/mimari-data'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function useCountUp(target: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0)

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
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const match = value.match(/^(\d+)(\+?)$/)
  const numeric = match ? parseInt(match[1] ?? '0', 10) : 0
  const suffix = match?.[2] ?? ''
  const animated = useCountUp(numeric, 2000, inView)

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '0 32px',
        borderRight: isLast ? 'none' : '1px solid rgba(245,240,232,0.06)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
          fontSize: 'clamp(48px, 6vw, 72px)',
          fontWeight: 300,
          color: '#f5f0e8',
          margin: 0,
          lineHeight: 1,
        }}
      >
        {match ? (
          <>
            {animated}
            {suffix && <span>{suffix}</span>}
          </>
        ) : (
          value
        )}
      </p>
      <p
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(245,240,232,0.4)',
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
        background: '#0f0d0a',
        padding: '100px 48px',
        borderTop: '1px solid rgba(245,240,232,0.06)',
        borderBottom: '1px solid rgba(245,240,232,0.06)',
      }}
    >
      <motion.div
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
      </motion.div>
    </section>
  )
}
