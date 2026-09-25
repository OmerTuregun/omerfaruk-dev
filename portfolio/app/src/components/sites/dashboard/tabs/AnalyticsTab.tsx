'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '@/components/sites/dashboard/shared/ThemeContext'

const FUNNEL = [
  { label: 'Ziyaret', percent: 100, count: 48200 },
  { label: 'Kayıt', percent: 38, count: 18316 },
  { label: 'Aktivasyon', percent: 22, count: 10604 },
  { label: 'Ödeme', percent: 14, count: 6748 },
]

const COUNTRIES = [
  { flag: '🇹🇷', name: 'Türkiye', percent: 42 },
  { flag: '🇺🇸', name: 'ABD', percent: 28 },
  { flag: '🇩🇪', name: 'Almanya', percent: 12 },
  { flag: '🇲🇽', name: 'Meksika', percent: 8 },
  { flag: '🇰🇷', name: 'Güney Kore', percent: 6 },
  { flag: '🌍', name: 'Diğer', percent: 4 },
]

function generateHeatmap(): number[][] {
  const grid: number[][] = []
  for (let w = 0; w < 8; w++) {
    const row: number[] = []
    for (let c = 0; c < 8; c++) {
      const base = Math.max(20, 100 - w * 10 - c * 3 + Math.floor(Math.random() * 15))
      row.push(Math.min(100, base))
    }
    grid.push(row)
  }
  return grid
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function heatColor(value: number, low: string, high: string): string {
  const t = value / 100
  const a = hexToRgb(low)
  const b = hexToRgb(high)
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const bl = Math.round(a.b + (b.b - a.b) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

export function AnalyticsTab() {
  const { colors } = useTheme()
  const [heatmap] = useState(() => generateHeatmap())
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>Analitik</h1>
        <span
          style={{
            fontSize: 11,
            color: colors.accent,
            background: colors.accent + '26',
            padding: '4px 10px',
            borderRadius: 999,
            fontWeight: 600,
          }}
        >
          Son 30 Gün
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '45fr 55fr', gap: 16, marginBottom: 24 }}>
        <div
          style={{
            background: colors.bgCard,
            border: '1px solid ' + colors.border,
            borderRadius: 12,
            padding: 20,
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 20px' }}>Dönüşüm Hunisi</h2>
          {FUNNEL.map((stage, i) => (
            <div key={stage.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: colors.textSecondary }}>{stage.label}</span>
                <span style={{ fontSize: 13, color: colors.textPrimary, fontWeight: 600 }}>
                  {stage.percent}% · {stage.count.toLocaleString('tr-TR')}
                </span>
              </div>
              <div style={{ height: 8, background: colors.bgCardHover, borderRadius: 4, overflow: 'hidden' }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  style={{
                    height: '100%',
                    width: `${stage.percent}%`,
                    background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`,
                    borderRadius: 4,
                    transformOrigin: 'left',
                  }}
                />
              </div>
            </div>
          ))}
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
          <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px' }}>Retention Isı Haritası</h2>
          {tooltip && (
            <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 8 }}>{tooltip}</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {heatmap.map((row, wi) => (
              <div key={wi} style={{ display: 'flex', gap: 4 }}>
                {row.map((val, ci) => (
                  <div
                    key={ci}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 4,
                      background: heatColor(val, colors.bgCard, colors.accent),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: val > 50 ? '#fff' : colors.textMuted,
                      cursor: 'default',
                    }}
                    onMouseEnter={() => setTooltip(`Hafta ${wi + 1} - Kohort ${ci + 1}: %${val} retention`)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
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
        <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px' }}>Ülke Dağılımı</h2>
        {COUNTRIES.map((c, i) => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 18, width: 28 }}>{c.flag}</span>
            <span style={{ fontSize: 13, color: colors.textPrimary, width: 100 }}>{c.name}</span>
            <div style={{ flex: 1, height: 6, background: colors.bgCardHover, borderRadius: 3, overflow: 'hidden' }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  height: '100%',
                  width: `${c.percent}%`,
                  background: colors.accent,
                  borderRadius: 3,
                  transformOrigin: 'left',
                }}
              />
            </div>
            <span style={{ fontSize: 13, color: colors.textSecondary, width: 36, textAlign: 'right' }}>{c.percent}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
