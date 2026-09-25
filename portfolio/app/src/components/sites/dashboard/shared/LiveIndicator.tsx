'use client'

export function LiveIndicator() {
  return (
    <>
      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#ef4444',
            animation: 'livePulse 1.5s infinite',
          }}
        />
        <span style={{ fontSize: 10, color: '#ef4444', fontWeight: 600, letterSpacing: 0.5 }}>
          CANLI
        </span>
      </div>
    </>
  )
}
