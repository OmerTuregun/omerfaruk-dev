'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { transactions, type Transaction } from '@/lib/dashboard-data'
import { useTheme } from '@/components/sites/dashboard/shared/ThemeContext'

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function UserDetailPanel({ user, onClose }: { user: Transaction; onClose: () => void }) {
  const { colors, isDark } = useTheme()
  const related = transactions.filter((t) => t.email === user.email).slice(0, 5)
  const avatarBg = isDark ? '#1a1a38' : '#ededff'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49 }}
      />
      <motion.div
        initial={{ x: 380 }}
        animate={{ x: 0 }}
        exit={{ x: 380 }}
        transition={{ type: 'spring', damping: 25 }}
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100vh',
          width: 380,
          background: colors.bgSecondary,
          borderLeft: '1px solid ' + colors.border,
          zIndex: 50,
          padding: 24,
          overflowY: 'auto',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer', marginBottom: 20, fontSize: 13 }}
        >
          ✕ Kapat
        </button>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: avatarBg,
            color: colors.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          {getInitials(user.user)}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: colors.textPrimary, margin: '0 0 4px' }}>{user.user}</h2>
        <p style={{ fontSize: 13, color: colors.textMuted, margin: '0 0 12px' }}>{user.email}</p>
        <span
          style={{
            background: 'rgba(79, 70, 229, 0.2)',
            color: colors.accentHover,
            padding: '4px 10px',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {user.plan}
        </span>
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 4 }}>MRR</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: colors.textPrimary }}>₺{user.amount.toLocaleString('tr-TR')}</div>
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, margin: '0 0 12px' }}>Son Aktiviteler</h3>
        {related.map((t) => (
          <div
            key={t.id}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid ' + colors.border,
              fontSize: 13,
            }}
          >
            <div style={{ color: colors.textPrimary }}>{t.id} — ₺{t.amount.toLocaleString('tr-TR')}</div>
            <div style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>{t.date} · {t.status}</div>
          </div>
        ))}
        <button
          type="button"
          style={{
            marginTop: 20,
            width: '100%',
            background: colors.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 0',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Plan Yükselt
        </button>
      </motion.div>
    </>
  )
}

export function UsersTab() {
  const { colors, isDark } = useTheme()
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState<Transaction | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteSent, setInviteSent] = useState(false)

  const users = useMemo(() => transactions.slice(0, 8), [])
  const avatarBg = isDark ? '#1a1a38' : '#ededff'

  const filtered = users.filter((u) => {
    const matchSearch =
      u.user.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchPlan = planFilter === 'All' || u.plan === planFilter
    const matchStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && u.status === 'success') ||
      (statusFilter === 'Churned' && u.status === 'failed')
    return matchSearch && matchPlan && matchStatus
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 700, color: colors.textPrimary, margin: '0 0 24px' }}>Kullanıcılar</h1>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx={7} cy={7} r={5} stroke={colors.textMuted} strokeWidth={1.5} />
            <path d="M11 11l3 3" stroke={colors.textMuted} strokeWidth={1.5} strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Kullanıcı ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: colors.bgCard,
              border: '1px solid ' + colors.border,
              borderRadius: 8,
              padding: '8px 12px 8px 36px',
              color: colors.textPrimary,
              fontSize: 13,
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
            }}
          />
        </div>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          style={{
            background: colors.bgCard,
            border: '1px solid ' + colors.border,
            borderRadius: 8,
            padding: '8px 12px',
            color: colors.textPrimary,
            fontSize: 13,
            outline: 'none',
          }}
        >
          <option value="All">Plan: Tümü</option>
          <option value="Starter">Starter</option>
          <option value="Pro">Pro</option>
          <option value="Enterprise">Enterprise</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            background: colors.bgCard,
            border: '1px solid ' + colors.border,
            borderRadius: 8,
            padding: '8px 12px',
            color: colors.textPrimary,
            fontSize: 13,
            outline: 'none',
          }}
        >
          <option value="All">Durum: Tümü</option>
          <option value="Active">Active</option>
          <option value="Churned">Churned</option>
        </select>
        <button
          type="button"
          onClick={() => {
            setShowAddUser(true)
            setInviteSent(false)
            setInviteEmail('')
          }}
          style={{
            background: colors.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Kullanıcı Ekle
        </button>
      </div>

      <div
        style={{
          background: colors.bgCard,
          border: '1px solid ' + colors.border,
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr 90px 90px 90px 100px 80px',
            padding: '10px 16px',
            background: colors.bgSecondary,
            fontSize: 11,
            color: colors.textMuted,
            textTransform: 'uppercase',
          }}
        >
          <span>☐</span>
          <span>Kullanıcı</span>
          <span>Plan</span>
          <span>Gelir</span>
          <span>Durum</span>
          <span>Kayıt Tarihi</span>
          <span>İşlemler</span>
        </div>
        {filtered.map((u) => (
          <div
            key={u.id}
            onClick={() => setSelectedUser(u)}
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr 90px 90px 90px 100px 80px',
              padding: '12px 16px',
              borderBottom: '1px solid ' + colors.border,
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: 13,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgCardHover }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ color: colors.textMuted }}>☐</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: avatarBg,
                  color: colors.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {getInitials(u.user)}
              </div>
              <div>
                <div style={{ color: colors.textPrimary }}>{u.user}</div>
                <div style={{ color: colors.textMuted, fontSize: 11 }}>{u.email}</div>
              </div>
            </div>
            <span style={{ color: colors.accentHover }}>{u.plan}</span>
            <span style={{ color: colors.textPrimary }}>₺{u.amount.toLocaleString('tr-TR')}</span>
            <span style={{ color: u.status === 'success' ? colors.success : u.status === 'failed' ? colors.danger : colors.warning }}>
              {u.status === 'success' ? 'Active' : u.status === 'failed' ? 'Churned' : 'Pending'}
            </span>
            <span style={{ color: colors.textMuted }}>{u.date}</span>
            <span style={{ color: colors.accent, fontSize: 12 }}>Detay →</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <UserDetailPanel user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddUser(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 60 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 61,
                background: colors.bgCard,
                border: '1px solid ' + colors.border,
                borderRadius: 12,
                padding: 24,
                width: 'min(400px, 90vw)',
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary, margin: '0 0 16px' }}>
                Kullanıcı Davet Et
              </h2>
              <label style={{ display: 'block', fontSize: 12, color: colors.textMuted, marginBottom: 6 }}>
                E-posta
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="ornek@sirket.com"
                style={{
                  width: '100%',
                  background: colors.bgSecondary,
                  border: '1px solid ' + colors.borderHover,
                  borderRadius: 8,
                  padding: '8px 12px',
                  color: colors.textPrimary,
                  fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
                  marginBottom: 16,
                }}
              />
              <motion.div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  style={{
                    background: 'transparent',
                    color: colors.textSecondary,
                    border: '1px solid ' + colors.borderHover,
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 13,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!inviteEmail.trim()) return
                    setInviteSent(true)
                    setTimeout(() => setShowAddUser(false), 1500)
                  }}
                  disabled={inviteSent}
                  style={{
                    background: inviteSent ? colors.success : colors.accent,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: inviteSent ? 'default' : 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {inviteSent ? 'Davet Gönderildi ✓' : 'Davet Gönder'}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
