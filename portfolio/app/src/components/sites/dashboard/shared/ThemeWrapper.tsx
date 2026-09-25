'use client'

import { useTheme } from './ThemeContext'
import { ReactNode } from 'react'

export function ThemeWrapper({ children }: { children: ReactNode }) {
  const { colors } = useTheme()
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: colors.bgPrimary,
      color: colors.textPrimary,
      fontFamily: 'Inter, sans-serif',
      transition: 'background 0.3s ease, color 0.3s ease',
      width: '100%',
    }}>
      {children}
    </div>
  )
}
