'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { triggerToast } from '@/components/sites/dashboard/shared/Toast'
import { useTheme } from '@/components/sites/dashboard/shared/ThemeContext'

const NOTIFICATIONS = [
  { id: 'email', label: 'Email bildirimleri', default: true },
  { id: 'churn', label: 'Churn uyarıları', default: true },
  { id: 'weekly', label: 'Haftalık rapor', default: false },
  { id: 'ai', label: 'AI önerileri', default: true },
  { id: 'marketing', label: 'Pazarlama', default: false },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  const { colors } = useTheme()
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? colors.accent : colors.border,
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
      aria-pressed={checked}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: 3,
          left: checked ? 23 : 3,
          transition: 'left 0.2s',
        }}
      />
    </button>
  )
}

type SaveState = 'idle' | 'loading' | 'saved'

export function SettingsTab() {
  const { colors } = useTheme()
  const [name, setName] = useState('Ahmet Yılmaz')
  const [email, setEmail] = useState('admin@datawise.io')
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.default])),
  )
  const [isVisible, setIsVisible] = useState(false)
  const [apiKey, setApiKey] = useState('sk-dw-demo-key-2024-secure')
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')

  const maskedKey = 'sk-dw-••••••••••••••••DEMO'

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true)
      triggerToast('Başarıyla kopyalandı', 'success')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleRegenerate = () => {
    if (isRegenerating) return
    setIsRegenerating(true)
    setTimeout(() => {
      const newKey = `sk-dw-${Math.random().toString(36).slice(2, 10)}-demo`
      setApiKey(newKey)
      setIsRegenerating(false)
      triggerToast('API anahtarı yenilendi', 'info')
    }, 800)
  }

  const handleSave = () => {
    if (saveState === 'loading') return
    setSaveState('loading')
    setTimeout(() => {
      setSaveState('saved')
      triggerToast('Profil kaydedildi', 'success')
      setTimeout(() => setSaveState('idle'), 2000)
    }, 1000)
  }

  const cardStyle = {
    background: colors.bgCard,
    border: '1px solid ' + colors.border,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    transition: 'background 0.3s ease, border-color 0.3s ease',
  }

  const inputStyle = {
    width: '100%',
    background: colors.bgCard,
    border: '1px solid ' + colors.border,
    borderRadius: 8,
    padding: '8px 12px',
    color: colors.textPrimary,
    fontSize: 13,
    outline: 'none' as const,
    boxSizing: 'border-box' as const,
    marginBottom: 12,
    transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary, margin: '0 0 24px' }}>Ayarlar</h1>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px' }}>Profil</h2>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: colors.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            AY
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 12, color: colors.textMuted, marginBottom: 6 }}>İsim</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
            <label style={{ display: 'block', fontSize: 12, color: colors.textMuted, marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                style={{
                  background: 'transparent',
                  color: colors.textSecondary,
                  border: '1px solid ' + colors.borderHover,
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Avatar Değiştir
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saveState === 'loading'}
                style={{
                  background: saveState === 'saved' ? colors.success : colors.accent,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: saveState === 'loading' ? 'wait' : 'pointer',
                  opacity: saveState === 'loading' ? 0.7 : 1,
                }}
              >
                {saveState === 'loading' ? 'Kaydediliyor...' : saveState === 'saved' ? 'Kaydedildi ✓' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px' }}>Bildirimler</h2>
        {NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid ' + colors.border,
            }}
          >
            <span style={{ fontSize: 14, color: colors.textPrimary }}>{n.label}</span>
            <Toggle
              checked={toggles[n.id] ?? false}
              onChange={(v) => setToggles((prev) => ({ ...prev, [n.id]: v }))}
            />
          </div>
        ))}
      </div>

      <div style={{ ...cardStyle, marginBottom: 0 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px' }}>API Anahtarı</h2>
        <div
          style={{
            background: colors.bgSecondary,
            border: '1px solid ' + colors.border,
            borderRadius: 8,
            padding: '12px 16px',
            fontFamily: 'monospace',
            fontSize: 13,
            color: colors.textSecondary,
            marginBottom: 12,
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
        >
          {isVisible ? apiKey : maskedKey}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            style={{
              background: 'transparent',
              color: colors.textSecondary,
              border: '1px solid ' + colors.borderHover,
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {isVisible ? 'Gizle' : 'Göster'}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              background: 'transparent',
              color: colors.textSecondary,
              border: '1px solid ' + colors.borderHover,
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {copied ? 'Kopyalandı ✓' : 'Kopyala'}
          </button>
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            style={{
              background: colors.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: isRegenerating ? 'wait' : 'pointer',
              opacity: isRegenerating ? 0.7 : 1,
            }}
          >
            {isRegenerating ? 'Yenileniyor...' : 'Yenile'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
