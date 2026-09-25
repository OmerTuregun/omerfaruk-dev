'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { aiInsights, type AIInsight } from '@/lib/dashboard-data'
import { triggerToast } from '@/components/sites/dashboard/shared/Toast'
import { useTheme } from '@/components/sites/dashboard/shared/ThemeContext'

const fullText =
  "Aralık ayı verilerinizi analiz ettim. Enterprise segmenti yıl genelindeki büyümenin ana motoru olmaya devam ediyor. Türkiye pazarında yaşanan ödeme anomalisi acil aksiyon gerektiriyor. Pro→Enterprise dönüşüm fırsatı bu ay en yüksek ROI'li büyüme kanalı olarak öne çıkıyor."

const typeColors: Record<AIInsight['type'], { bar: string; badge: string; badgeBg: string }> = {
  anomaly: { bar: '#ef4444', badge: '#ef4444', badgeBg: 'rgba(239, 68, 68, 0.15)' },
  opportunity: { bar: '#10b981', badge: '#10b981', badgeBg: 'rgba(16, 185, 129, 0.15)' },
  warning: { bar: '#f59e0b', badge: '#f59e0b', badgeBg: 'rgba(245, 158, 11, 0.15)' },
  info: { bar: '#6366f1', badge: '#6366f1', badgeBg: 'rgba(99, 102, 241, 0.15)' },
}

const typeLabels: Record<AIInsight['type'], string> = {
  anomaly: 'Anomali',
  opportunity: 'Fırsat',
  warning: 'Uyarı',
  info: 'Bilgi',
}

const insightTabMap: Record<string, string> = {
  revenue: 'analytics',
  churn: 'insights',
  users: 'users',
  mrr_growth: 'analytics',
}

type AnalyzeState = 'idle' | 'loading' | 'done'

function changeDashboardTab(tabId: string) {
  window.dispatchEvent(new CustomEvent('dashboardTabChange', { detail: tabId }))
}

export function InsightsTab() {
  const { colors, isDark } = useTheme()
  const [displayedText, setDisplayedText] = useState('')
  const [analyzeState, setAnalyzeState] = useState<AnalyzeState>('idle')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 18)
    return () => clearInterval(interval)
  }, [])

  const handleAnalyze = () => {
    if (analyzeState === 'loading') return
    setAnalyzeState('loading')
    setTimeout(() => {
      setAnalyzeState('done')
      triggerToast('Analiz tamamlandı', 'success')
      setTimeout(() => setAnalyzeState('idle'), 2000)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary, margin: 0 }}>AI Insights</h1>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: colors.accent,
            background: colors.accent + '26',
            padding: '3px 8px',
            borderRadius: 4,
            letterSpacing: 0.5,
          }}
        >
          BETA
        </span>
        <span style={{ fontSize: 12, color: colors.textMuted }}>Model: GPT-4o</span>
      </div>

      <div
        style={{
          background: isDark ? '#0f0f2a' : '#ededff',
          borderLeft: '3px solid ' + colors.accent,
          padding: 16,
          borderRadius: '0 8px 8px 0',
          marginBottom: 24,
          fontSize: 14,
          color: isDark ? '#c7d2fe' : '#3730a3',
          lineHeight: 1.6,
          transition: 'background 0.3s ease, color 0.3s ease',
        }}
      >
        {displayedText}
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: 16,
            background: colors.accent,
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            animation: 'blink 500ms step-end infinite',
          }}
        />
        <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {aiInsights.map((insight, i) => {
          const typeStyle = typeColors[insight.type]
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: colors.bgCard,
                border: '1px solid ' + colors.border,
                borderRadius: 12,
                padding: 20,
                borderLeft: `4px solid ${typeStyle.bar}`,
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: typeStyle.badge,
                    background: typeStyle.badgeBg,
                    padding: '2px 8px',
                    borderRadius: 4,
                  }}
                >
                  {typeLabels[insight.type]}
                </span>
                <span style={{ fontSize: 11, color: colors.textMuted }}>{insight.timestamp}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 8px' }}>{insight.title}</h3>
              <p style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.6, margin: '0 0 12px' }}>{insight.body}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: colors.textMuted }}>Confidence: %{insight.confidence}</span>
                <div style={{ flex: 1, height: 4, background: colors.bgCardHover, borderRadius: 2, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${insight.confidence}%`,
                      background: typeStyle.bar,
                      borderRadius: 2,
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const tab = insight.metric ? insightTabMap[insight.metric] : 'analytics'
                    if (tab) changeDashboardTab(tab)
                  }}
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
                  Aksiyona Geç →
                </button>
              </div>
            </motion.div>
          )
        })}
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
        <h3 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 12px' }}>Yeni Analiz İste</h3>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Verileriniz hakkında bir soru sorun..."
          rows={3}
          style={{
            width: '100%',
            background: colors.bgCard,
            border: '1px solid ' + colors.border,
            borderRadius: 8,
            padding: 12,
            color: colors.textPrimary,
            fontSize: 13,
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: 12,
            fontFamily: 'inherit',
            transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
          }}
        />
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={analyzeState === 'loading'}
          style={{
            background: analyzeState === 'done' ? colors.success : colors.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontSize: 13,
            fontWeight: 600,
            cursor: analyzeState === 'loading' ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: analyzeState === 'loading' ? 0.7 : 1,
          }}
        >
          {analyzeState === 'loading' && (
            <svg width={16} height={16} viewBox="0 0 16 16" style={{ animation: 'spin 1s linear infinite' }}>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <circle cx={8} cy={8} r={6} stroke="#fff" strokeWidth={2} fill="none" strokeDasharray="20 10" />
            </svg>
          )}
          {analyzeState === 'loading'
            ? 'Analiz ediliyor...'
            : analyzeState === 'done'
              ? 'Tamamlandı ✓'
              : 'Analiz Et'}
        </button>
      </div>
    </motion.div>
  )
}
