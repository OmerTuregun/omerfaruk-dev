'use client'

import { DashboardSidebar } from '@/components/sites/dashboard/DashboardSidebar'
import { DashboardTopbar } from '@/components/sites/dashboard/DashboardTopbar'
import { ThemeProvider } from '@/components/sites/dashboard/shared/ThemeContext'
import { ThemeWrapper } from '@/components/sites/dashboard/shared/ThemeWrapper'
import { ToastContainer } from '@/components/sites/dashboard/shared/Toast'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <ThemeWrapper>
        <DashboardSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <DashboardTopbar />
          <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            {children}
          </main>
        </div>
      </ThemeWrapper>
      <ToastContainer />
    </ThemeProvider>
  )
}
