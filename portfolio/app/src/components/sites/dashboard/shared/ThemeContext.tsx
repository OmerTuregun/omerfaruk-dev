'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
  colors: typeof darkColors
}

const darkColors = {
  bgPrimary: '#0d0d0f',
  bgSecondary: '#0f0f13',
  bgCard: '#141418',
  bgCardHover: '#1a1a24',
  border: '#1e1e28',
  borderHover: '#2a2a35',
  textPrimary: '#f8f8fc',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',
  accent: '#6366f1',
  accentHover: '#818cf8',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  sidebarBg: '#0f0f13',
  topbarBg: '#0f0f13',
}

const lightColors = {
  bgPrimary: '#f8f8fc',
  bgSecondary: '#f0f0f6',
  bgCard: '#ffffff',
  bgCardHover: '#f8f8fc',
  border: '#e2e2ea',
  borderHover: '#c8c8d8',
  textPrimary: '#1a1a2e',
  textSecondary: '#4b5563',
  textMuted: '#9ca3af',
  accent: '#4f46e5',
  accentHover: '#6366f1',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
  sidebarBg: '#ffffff',
  topbarBg: '#ffffff',
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
  colors: darkColors,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-theme') as Theme | null
    if (saved) setTheme(saved)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('dashboard-theme', next)
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      isDark: theme === 'dark',
      colors: theme === 'dark' ? darkColors : lightColors,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
export { darkColors, lightColors }
