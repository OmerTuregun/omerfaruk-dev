const TICKER_ITEMS = [
  'DÜĞÜN FOTOĞRAFÇILIĞI',
  'PORTRE',
  'DOĞA',
  'KOMERSİYEL',
  'EDİTORYAL',
  'MARKA',
  'PORTRAITURE',
  'NATURE',
] as const

export function PhotographerTicker() {
  const rows = [0, 1] as const

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`,
        }}
      />
      <div
        style={{
          borderTop: '1px solid #e8e8e4',
          borderBottom: '1px solid #e8e8e4',
          overflow: 'hidden',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          background: '#fdfcfc',
        }}
      >
        <div
          className="ticker-track"
          style={{
            display: 'flex',
            animation: 'ticker 22s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {rows.map((i) =>
            TICKER_ITEMS.map((text, idx) => (
              <span
                key={`${i}-${idx}`}
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 10,
                  color: '#ccc',
                  letterSpacing: 3,
                  padding: '0 36px',
                  borderRight: '1px solid #f5e8ea',
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 48,
                }}
              >
                {text}
              </span>
            )),
          )}
        </div>
      </div>
    </>
  )
}
