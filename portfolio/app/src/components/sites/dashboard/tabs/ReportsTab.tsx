'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { triggerToast } from '@/components/sites/dashboard/shared/Toast'
import { useTheme } from '@/components/sites/dashboard/shared/ThemeContext'

const REPORTS = [
  {
    id: 'revenue',
    title: 'Aylık Gelir Raporu — Aralık 2024',
    description: 'Detaylı gelir analizi, segment kırılımı ve büyüme trendleri.',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    id: 'growth',
    title: 'Kullanıcı Büyüme Analizi',
    description: 'Yeni kayıtlar, aktivasyon oranları ve kohort performansı.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
  {
    id: 'churn',
    title: 'Churn & Retention Raporu',
    description: 'İptal nedenleri, retention eğrileri ve risk segmentleri.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
] as const

type DownloadState = 'idle' | 'loading' | 'done'

function changeDashboardTab(tabId: string) {
  window.dispatchEvent(new CustomEvent('dashboardTabChange', { detail: tabId }))
}

function ReportCard({ report }: { report: (typeof REPORTS)[number] }) {
  const { colors } = useTheme()
  const [downloadState, setDownloadState] = useState<DownloadState>('idle')
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    if (downloadState === 'loading') return
    setDownloadState('loading')
    setProgress(0)
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / 1500, 1)
      setProgress(p * 100)
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setDownloadState('done')
        triggerToast('Hazır! PDF indirilmeye hazır.', 'success')
        setTimeout(() => setDownloadState('idle'), 2000)
      }
    }
    requestAnimationFrame(tick)
  }

  const handleView = () => {
    changeDashboardTab('analytics')
  }

  const isLoading = downloadState === 'loading'
  const isDone = downloadState === 'done'

  return (
    <div
      style={{
        background: colors.bgCard,
        border: '1px solid ' + colors.border,
        borderRadius: 12,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <motion.div
        style={{
          width: 40,
          height: 40,
          background: colors.accent + '26',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <path d={report.icon} stroke={colors.accent} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: 0 }}>{report.title}</h3>
      <p style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.5, margin: 0, flex: 1 }}>{report.description}</p>
      {isLoading && (
        <div style={{ height: 4, background: colors.bgCardHover, borderRadius: 2, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: colors.accent,
              borderRadius: 2,
              transition: 'width 0.1s',
            }}
          />
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={handleDownload}
          disabled={isLoading}
          style={{
            flex: 1,
            background: isDone ? colors.success : colors.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 0',
            fontSize: 13,
            fontWeight: 600,
            cursor: isLoading ? 'wait' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? 'İndiriliyor...' : isDone ? 'İndirildi ✓' : 'PDF İndir'}
        </button>
        <button
          type="button"
          onClick={handleView}
          style={{
            flex: 1,
            background: 'transparent',
            color: colors.textSecondary,
            border: '1px solid ' + colors.borderHover,
            borderRadius: 8,
            padding: '8px 0',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Görüntüle
        </button>
      </div>
    </div>
  )
}

export function ReportsTab() {
  const { colors } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary, margin: '0 0 24px' }}>Raporlar</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {REPORTS.map((r) => (
          <ReportCard key={r.id} report={r} />
        ))}
      </div>
    </motion.div>
  )
}
