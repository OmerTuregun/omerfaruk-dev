'use client'

import { motion } from 'framer-motion'

type ChartTooltipProps = {
  x: number
  y: number
  revenue: number
  users: number
  visible: boolean
}

export function ChartTooltip({ x, y, revenue, users, visible }: ChartTooltipProps) {
  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        background: '#1e1e28',
        border: '1px solid #2a2a35',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: 12,
        color: '#f8f8fc',
        transform: 'translate(-50%, -100%)',
        zIndex: 10,
        whiteSpace: 'nowrap',
      }}
    >
      <div>Gelir: ₺{revenue.toLocaleString('tr-TR')}</div>
      <div style={{ color: '#9ca3af', marginTop: 2 }}>Kullanıcı: {users.toLocaleString('tr-TR')}</div>
    </motion.div>
  )
}
