'use client'

const TICKER_TEXT =
  'FILM · BRAND IDENTITY · MOTION DESIGN · DIGITAL CAMPAIGNS · OOH · STRATEGY · PRODUCTION · '

export function TickerSection() {
  return (
    <div
      style={{
        height: 52,
        background: '#ff3b00',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style>{`
        @keyframes ajans-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'ajans-ticker 20s linear infinite',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            color: '#050505',
            paddingRight: 0,
          }}
        >
          {TICKER_TEXT}
          {TICKER_TEXT}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            color: '#050505',
          }}
        >
          {TICKER_TEXT}
          {TICKER_TEXT}
        </span>
      </div>
    </div>
  )
}
