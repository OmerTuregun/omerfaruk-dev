// KPI Metrikleri
export type KPIMetric = {
  id: string
  label: string
  value: number
  unit: 'currency' | 'percent' | 'count'
  prefix?: string
  change: number
  trend: 'up' | 'down' | 'flat'
  sparkline: number[]
}

export const kpiMetrics: KPIMetric[] = [
  { id: 'revenue', label: 'Aylık Gelir', value: 284750, unit: 'currency', prefix: '₺', change: 12.4, trend: 'up', sparkline: [180, 195, 210, 198, 220, 235, 218, 242, 258, 248, 271, 285] },
  { id: 'users', label: 'Aktif Kullanıcı', value: 12847, unit: 'count', change: 8.1, trend: 'up', sparkline: [9200, 9800, 10100, 10400, 10900, 11200, 11600, 11900, 12100, 12400, 12600, 12847] },
  { id: 'churn', label: 'Churn Oranı', value: 2.3, unit: 'percent', change: -0.4, trend: 'down', sparkline: [3.1, 3.0, 2.9, 2.8, 2.7, 2.8, 2.6, 2.5, 2.4, 2.5, 2.3, 2.3] },
  { id: 'mrr_growth', label: 'MRR Büyüme', value: 18.7, unit: 'percent', change: 3.2, trend: 'up', sparkline: [12, 13, 14, 13.5, 15, 15.5, 16, 16.8, 17.2, 17.9, 18.2, 18.7] },
]

// Chart Verisi — 4 dönem
export type ChartPoint = {
  label: string
  revenue: number
  users: number
  expenses: number
}

export const chartData: Record<'7d' | '30d' | '90d' | '1y', ChartPoint[]> = {
  '7d': [
    { label: 'Pzt', revenue: 38200, users: 890, expenses: 22000 },
    { label: 'Sal', revenue: 42100, users: 920, expenses: 21500 },
    { label: 'Çar', revenue: 39800, users: 905, expenses: 23000 },
    { label: 'Per', revenue: 45300, users: 960, expenses: 21800 },
    { label: 'Cum', revenue: 51200, users: 1050, expenses: 24500 },
    { label: 'Cmt', revenue: 34500, users: 780, expenses: 19200 },
    { label: 'Paz', revenue: 33650, users: 756, expenses: 18900 },
  ],
  '30d': [
    { label: '1 Ara', revenue: 210000, users: 7200, expenses: 145000 },
    { label: '8 Ara', revenue: 228000, users: 8100, expenses: 148000 },
    { label: '15 Ara', revenue: 245000, users: 9400, expenses: 152000 },
    { label: '22 Ara', revenue: 261000, users: 10800, expenses: 155000 },
    { label: '29 Ara', revenue: 284750, users: 12847, expenses: 158000 },
  ],
  '90d': [
    { label: 'Ekim', revenue: 198000, users: 6800, expenses: 138000 },
    { label: 'Kasım', revenue: 241000, users: 9200, expenses: 149000 },
    { label: 'Aralık', revenue: 284750, users: 12847, expenses: 158000 },
  ],
  '1y': [
    { label: 'Oca', revenue: 98000, users: 2100, expenses: 82000 },
    { label: 'Şub', revenue: 112000, users: 2800, expenses: 85000 },
    { label: 'Mar', revenue: 128000, users: 3600, expenses: 88000 },
    { label: 'Nis', revenue: 145000, users: 4500, expenses: 92000 },
    { label: 'May', revenue: 162000, users: 5400, expenses: 96000 },
    { label: 'Haz', revenue: 178000, users: 6800, expenses: 101000 },
    { label: 'Tem', revenue: 195000, users: 7900, expenses: 108000 },
    { label: 'Ağu', revenue: 208000, users: 8800, expenses: 112000 },
    { label: 'Eyl', revenue: 221000, users: 9700, expenses: 118000 },
    { label: 'Eki', revenue: 241000, users: 10600, expenses: 128000 },
    { label: 'Kas', revenue: 263000, users: 11800, expenses: 142000 },
    { label: 'Ara', revenue: 284750, users: 12847, expenses: 158000 },
  ],
}

// İşlemler Tablosu
export type Transaction = {
  id: string
  user: string
  email: string
  amount: number
  status: 'success' | 'pending' | 'failed'
  plan: 'Starter' | 'Pro' | 'Enterprise'
  date: string
  country: string
}

export const transactions: Transaction[] = [
  { id: 'TXN-8821', user: 'Ayşe Kaya', email: 'ayse@startupco.com', amount: 2490, status: 'success', plan: 'Pro', date: '2024-12-29', country: 'TR' },
  { id: 'TXN-8820', user: 'Mehmet Demir', email: 'mehmet@techfirm.io', amount: 8970, status: 'success', plan: 'Enterprise', date: '2024-12-29', country: 'TR' },
  { id: 'TXN-8819', user: 'Sara Johnson', email: 'sara@growthco.com', amount: 990, status: 'pending', plan: 'Starter', date: '2024-12-28', country: 'US' },
  { id: 'TXN-8818', user: 'Carlos Ruiz', email: 'carlos@ventures.mx', amount: 2490, status: 'success', plan: 'Pro', date: '2024-12-28', country: 'MX' },
  { id: 'TXN-8817', user: 'Fatma Yılmaz', email: 'fatma@ecom.tr', amount: 8970, status: 'failed', plan: 'Enterprise', date: '2024-12-27', country: 'TR' },
  { id: 'TXN-8816', user: 'James Park', email: 'james@saasify.co', amount: 990, status: 'success', plan: 'Starter', date: '2024-12-27', country: 'KR' },
  { id: 'TXN-8815', user: 'Lena Müller', email: 'lena@digital.de', amount: 2490, status: 'success', plan: 'Pro', date: '2024-12-26', country: 'DE' },
  { id: 'TXN-8814', user: 'Burak Arslan', email: 'burak@mediahouse.tr', amount: 8970, status: 'success', plan: 'Enterprise', date: '2024-12-26', country: 'TR' },
]

// AI Insights
export type AIInsight = {
  id: string
  type: 'anomaly' | 'opportunity' | 'warning' | 'info'
  title: string
  body: string
  metric?: string
  confidence: number
  timestamp: string
}

export const aiInsights: AIInsight[] = [
  { id: 'ai-1', type: 'opportunity', title: 'Enterprise Dönüşüm Fırsatı', body: 'Pro planındaki 23 kullanıcı son 14 günde API limitine 5+ kez ulaştı. Proaktif upgrade teklifi %34 dönüşüm getirebilir.', metric: 'revenue', confidence: 87, timestamp: '2 saat önce' },
  { id: 'ai-2', type: 'anomaly', title: 'Anormal İptal Artışı', body: 'Türkiye segmentinde son 48 saatte iptal talebi normal seviyenin 2.3x üzerine çıktı. Ödeme altyapısında sorun olabilir.', metric: 'churn', confidence: 91, timestamp: '5 saat önce' },
  { id: 'ai-3', type: 'warning', title: 'Cuma Trafik Düşüşü', body: 'Son 4 Cuma günü aktif kullanıcı ortalaması %18 düşüyor. Kullanım alışkanlıklarına göre zamanlı bildirim stratejisi önerilebilir.', metric: 'users', confidence: 76, timestamp: '1 gün önce' },
  { id: 'ai-4', type: 'info', title: 'Aralık MRR Rekoru', body: "₺284,750 ile yılın en yüksek MRR değerine ulaşıldı. Enterprise segment bu büyümenin %61'ini oluşturuyor.", metric: 'mrr_growth', confidence: 99, timestamp: '2 gün önce' },
]

// Sidebar Nav Menü
export type NavItem = {
  id: string
  label: string
  icon: string
  badge?: number
}

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Genel Bakış', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'analytics', label: 'Analitik', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'insights', label: 'AI Insights', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', badge: 4 },
  { id: 'users', label: 'Kullanıcılar', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { id: 'reports', label: 'Raporlar', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'settings', label: 'Ayarlar', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]
