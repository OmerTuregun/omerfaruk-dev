'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { OverviewTab } from '@/components/sites/dashboard/tabs/OverviewTab'
import { AnalyticsTab } from '@/components/sites/dashboard/tabs/AnalyticsTab'
import { InsightsTab } from '@/components/sites/dashboard/tabs/InsightsTab'
import { UsersTab } from '@/components/sites/dashboard/tabs/UsersTab'
import { ReportsTab } from '@/components/sites/dashboard/tabs/ReportsTab'
import { SettingsTab } from '@/components/sites/dashboard/tabs/SettingsTab'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const handler = (e: Event) => {
      setActiveTab((e as CustomEvent<string>).detail)
    }
    window.addEventListener('dashboardTabChange', handler)
    return () => window.removeEventListener('dashboardTabChange', handler)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {activeTab === 'overview' && <OverviewTab key="overview" />}
      {activeTab === 'analytics' && <AnalyticsTab key="analytics" />}
      {activeTab === 'insights' && <InsightsTab key="insights" />}
      {activeTab === 'users' && <UsersTab key="users" />}
      {activeTab === 'reports' && <ReportsTab key="reports" />}
      {activeTab === 'settings' && <SettingsTab key="settings" />}
    </AnimatePresence>
  )
}
