'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './shared/ThemeContext'

const tabLabels: Record<string, string> = {
  overview: 'Genel Bakış',
  analytics: 'Analitik',
  insights: 'AI Insights',
  users: 'Kullanıcılar',
  reports: 'Raporlar',
  settings: 'Ayarlar',
}

const searchableTabs = Object.entries(tabLabels).map(([id, label]) => ({ id, label }))

const notifications = [
  { id: 'n1', title: 'Yeni Enterprise kaydı', tab: 'users' as const },
  { id: 'n2', title: 'Churn uyarısı — TR segment', tab: 'insights' as const },
  { id: 'n3', title: 'Aralık gelir raporu hazır', tab: 'reports' as const },
]

function changeDashboardTab(tabId: string) {
  window.dispatchEvent(new CustomEvent('dashboardTabChange', { detail: tabId }))
}

export function DashboardTopbar() {
  const { isDark, toggleTheme, colors } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      setActiveTab((e as CustomEvent<string>).detail)
    }
    window.addEventListener('dashboardTabChange', handler)
    return () => window.removeEventListener('dashboardTabChange', handler)
  }, [])

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const searchResults = searchableTabs.filter((t) =>
    t.label.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  )

  const handleSearchSelect = (tabId: string) => {
    changeDashboardTab(tabId)
    setSearchQuery('')
    setSearchOpen(false)
  }

  const handleNotifClick = (tab: string) => {
    changeDashboardTab(tab)
    setNotifOpen(false)
  }

  return (
    <header
      style={{
        height: 60,
        background: colors.topbarBg,
        borderBottom: '1px solid ' + colors.border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div style={{ fontSize: 13, color: colors.textMuted }}>
        Dashboard
        <span style={{ padding: '0 8px' }}>/</span>
        {tabLabels[activeTab] ?? 'Genel Bakış'}
      </div>

      <div ref={searchRef} style={{ position: 'relative', width: 280 }}>
        <svg
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
        >
          <circle cx={7} cy={7} r={5} stroke={colors.textMuted} strokeWidth={1.5} />
          <path d="M11 11l3 3" stroke={colors.textMuted} strokeWidth={1.5} strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Ara..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setSearchOpen(true)
          }}
          onFocus={() => setSearchOpen(true)}
          style={{
            background: colors.bgCard,
            border: '1px solid ' + colors.border,
            borderRadius: 8,
            padding: '8px 48px 8px 36px',
            width: '100%',
            color: colors.textPrimary,
            fontSize: 13,
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 11,
            color: colors.textMuted,
            background: colors.borderHover,
            padding: '2px 6px',
            borderRadius: 4,
            pointerEvents: 'none',
          }}
        >
          ⌘K
        </span>
        {searchOpen && searchQuery.trim() && (
          <motion.div
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              background: colors.bgCard,
              border: '1px solid ' + colors.border,
              borderRadius: 8,
              overflow: 'hidden',
              zIndex: 100,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >
            {searchResults.length === 0 ? (
              <p style={{ fontSize: 13, color: colors.textMuted, margin: 0, padding: '12px 16px' }}>
                Sonuç bulunamadı
              </p>
            ) : (
              searchResults.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => handleSearchSelect(result.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: colors.textPrimary,
                    fontSize: 13,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    borderBottom: '1px solid ' + colors.border,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.bgCardHover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {result.label}
                </button>
              ))
            )}
          </motion.div>
        )}
      </div>

      <motion.div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 4 }}
            aria-label="Bildirimler"
            aria-expanded={notifOpen}
          >
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2a5 5 0 00-5 5v3l-1.5 2.5h13L15 10V7a5 5 0 00-5-5zM8.5 17a1.5 1.5 0 003 0"
                stroke={colors.textSecondary}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: colors.danger,
                color: '#fff',
                fontSize: 9,
                fontWeight: 700,
                width: 14,
                height: 14,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              3
            </span>
          </button>
          {notifOpen && (
            <motion.div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: 280,
                background: colors.bgCard,
                border: '1px solid ' + colors.border,
                borderRadius: 8,
                overflow: 'hidden',
                zIndex: 100,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  margin: 0,
                  padding: '12px 16px 8px',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                Bildirimler
              </p>
              {notifications.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleNotifClick(n.tab)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    background: 'transparent',
                    border: 'none',
                    borderTop: '1px solid ' + colors.border,
                    color: colors.textPrimary,
                    fontSize: 13,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.bgCardHover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {n.title}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Yardım">
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
            <circle cx={10} cy={10} r={8} stroke={colors.textSecondary} strokeWidth={1.5} />
            <path d="M8 8a2 2 0 014 0c0 1.5-2 1.5-2 3M10 14h.01" stroke={colors.textSecondary} strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          style={{
            background: colors.bgCard,
            border: '1px solid ' + colors.border,
            borderRadius: 8,
            padding: '6px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          title={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
          aria-label="Tema değiştir"
        >
          {isDark ? (
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
              <circle cx={12} cy={12} r={5} />
              <line x1={12} y1={1} x2={12} y2={3} />
              <line x1={12} y1={21} x2={12} y2={23} />
              <line x1={4.22} y1={4.22} x2={5.64} y2={5.64} />
              <line x1={18.36} y1={18.36} x2={19.78} y2={19.78} />
              <line x1={1} y1={12} x2={3} y2={12} />
              <line x1={21} y1={12} x2={23} y2={12} />
              <line x1={4.22} y1={19.78} x2={5.64} y2={18.36} />
              <line x1={18.36} y1={5.64} x2={19.78} y2={4.22} />
            </svg>
          ) : (
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth={2}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: colors.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 600,
            color: '#fff',
          }}
        >
          AY
        </div>
      </motion.div>
    </header>
  )
}
