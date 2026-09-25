'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useTheme } from './ThemeContext'

type ToastType = 'success' | 'error' | 'info'

type ToastItem = {
  id: number
  message: string
  type: ToastType
}

export function triggerToast(message: string, type: ToastType = 'success') {
  window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type } }))
}

export function ToastContainer() {
  const { colors } = useTheme()
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const borderColors: Record<ToastType, string> = {
    success: colors.success,
    error: colors.danger,
    info: colors.accent,
  }

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, type } = (e as CustomEvent<{ message: string; type: ToastType }>).detail
      const id = Date.now()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), 3000)
    }
    window.addEventListener('showToast', handler)
    return () => window.removeEventListener('showToast', handler)
  }, [removeToast])

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              background: colors.bgCard,
              border: `1px solid ${borderColors[toast.type]}`,
              padding: '12px 16px',
              borderRadius: 8,
              fontSize: 13,
              color: colors.textPrimary,
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
