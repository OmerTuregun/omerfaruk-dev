'use client'

import { useState } from 'react'

export function EcommerceNewsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <section
      id="bulten"
      style={{
        background: '#2c1810',
        padding: '80px 60px',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ width: 32, height: 1, background: '#c4a882', opacity: 0.4, marginBottom: 24 }} />
          <div
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 44,
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.15,
              marginBottom: 16,
              whiteSpace: 'pre-line',
            }}
          >
            İlk siparişinizde{'\n'}%10 indirim.
          </div>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 14,
              color: 'rgba(196,168,130,0.6)',
              lineHeight: 1.7,
            }}
          >
            Yeni koleksiyonlar, özel teklifler ve atölye hikayeleri için bültenimize katılın.
          </div>
        </div>

        <div>
          {!submitted ? (
            <form onSubmit={handleSubscribe}>
              <div style={{ display: 'flex', gap: 0 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  style={{
                    flex: 1,
                    padding: '14px 20px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(196,168,130,0.2)',
                    borderRight: 'none',
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none',
                    fontFamily: 'var(--font-inter), sans-serif',
                    borderRadius: '2px 0 0 2px',
                    transition: 'border 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(196,168,130,0.5)'
                    e.currentTarget.style.borderRight = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(196,168,130,0.2)'
                    e.currentTarget.style.borderRight = 'none'
                  }}
                  required
                  aria-label="E-posta"
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '14px 28px',
                    background: '#c4a882',
                    color: '#2c1810',
                    border: '1px solid #c4a882',
                    borderRadius: '0 2px 2px 0',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: 600,
                    cursor: 'pointer',
                    opacity: loading ? 0.7 : 1,
                  }}
                  aria-label="Abone ol"
                >
                  {loading ? '...' : 'ABONE OL'}
                </button>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 11,
                  color: 'rgba(196,168,130,0.3)',
                  marginTop: 12,
                }}
              >
                Spam göndermiyoruz. İstediğiniz zaman çıkabilirsiniz.
              </div>

              <style jsx>{`
                input::placeholder {
                  color: rgba(196, 168, 130, 0.3);
                }
              `}</style>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4a882" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
              </svg>
              <div
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontStyle: 'italic',
                  fontSize: 28,
                  color: '#fff',
                }}
              >
                Abone oldunuz!
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 13,
                  color: 'rgba(196,168,130,0.6)',
                }}
              >
                İndirim kodunuz e-postanıza gönderildi.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

