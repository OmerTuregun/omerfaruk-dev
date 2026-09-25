'use client'

import { useState } from 'react'
import { navItems } from '@/lib/dashboard-data'
import { useTheme } from './shared/ThemeContext'

export function DashboardSidebar() {
  const { colors, isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    window.dispatchEvent(new CustomEvent('dashboardTabChange', { detail: tabId }))
  }

  const width = collapsed ? 64 : 240
  const activeBg = isDark ? '#1a1a38' : '#ededff'

  return (
    <aside
      style={{
        width,
        minHeight: '100vh',
        background: colors.sidebarBg,
        borderRight: '1px solid ' + colors.border,
        padding: 20,
        position: 'relative',
        flexShrink: 0,
        transition: 'width 0.2s ease, background 0.3s ease, border-color 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          paddingBottom: 24,
          borderBottom: '1px solid ' + colors.border,
          marginBottom: 0,
          transition: 'border-color 0.3s ease',
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: colors.accent,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M2 12V4l6-2 6 2v8l-6 2-6-2z" stroke="#fff" strokeWidth={1.5} fill="none" />
              </svg>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.textPrimary, transition: 'color 0.3s ease' }}>
              Datawise
            </span>
          </div>
        )}
        {collapsed && (
          <div
            style={{
              width: 28,
              height: 28,
              background: colors.accent,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M2 12V4l6-2 6 2v8l-6 2-6-2z" stroke="#fff" strokeWidth={1.5} fill="none" />
            </svg>
          </div>
        )}
        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            aria-label="Daralt"
          >
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke={colors.textMuted} strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </button>
        )}
        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              position: 'absolute',
              top: 20,
              right: 8,
            }}
            aria-label="Genişlet"
          >
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke={colors.textMuted} strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <nav style={{ paddingTop: 16 }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                border: 'none',
                background: isActive ? activeBg : 'transparent',
                color: isActive ? colors.accent : colors.textSecondary,
                fontWeight: isActive ? 600 : 400,
                fontSize: 14,
                marginBottom: 4,
                position: 'relative',
                justifyContent: collapsed ? 'center' : 'flex-start',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = colors.bgCardHover
                  e.currentTarget.style.color = colors.textPrimary
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = colors.textSecondary
                }
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: 24,
                    background: colors.accent,
                    borderRadius: '0 2px 2px 0',
                  }}
                />
              )}
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path
                  d={item.icon}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge !== undefined && (
                <span
                  style={{
                    marginLeft: 'auto',
                    background: colors.danger,
                    color: '#fff',
                    fontSize: 10,
                    borderRadius: 999,
                    minWidth: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5px',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {!collapsed && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            background: colors.bgCardHover,
            borderRadius: 8,
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            transition: 'background 0.3s ease',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: colors.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            AY
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: colors.textPrimary, fontWeight: 500, transition: 'color 0.3s ease' }}>
              Ahmet Yılmaz
            </div>
            <div
              style={{
                fontSize: 11,
                color: colors.textMuted,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'color 0.3s ease',
              }}
            >
              admin@datawise.io
            </div>
          </div>
          <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Çıkış">
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke={colors.textMuted} strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </aside>
  )
}
