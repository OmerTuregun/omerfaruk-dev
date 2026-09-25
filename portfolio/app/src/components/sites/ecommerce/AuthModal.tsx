'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export interface AuthModalProps {
  mode: 'login' | 'register' | null
  onClose: () => void
  onSwitchMode: (mode: 'login' | 'register') => void
}

export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')

  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    document.body.style.overflow = mode ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mode])

  useEffect(() => {
    setSubmitted(false)
    setLoading(false)
    timeoutsRef.current.forEach((t) => window.clearTimeout(t))
    timeoutsRef.current = []
  }, [mode])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t))
      timeoutsRef.current = []
    }
  }, [])

  const handleLogin = () => {
    if (loading) return
    setLoading(true)
    const t1 = window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      const t2 = window.setTimeout(() => {
        onClose()
      }, 2000)
      timeoutsRef.current.push(t2)
    }, 1500)
    timeoutsRef.current.push(t1)
  }

  const handleRegister = () => {
    if (loading) return
    setLoading(true)
    const t1 = window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      const t2 = window.setTimeout(() => {
        onClose()
      }, 2000)
      timeoutsRef.current.push(t2)
    }, 1500)
    timeoutsRef.current.push(t1)
  }

  return (
    <AnimatePresence>
      {mode ? (
        <motion.div
          key="auth-overlay"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            background: 'rgba(44,24,16,0.3)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            key={mode}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: 480,
              borderRadius: 4,
              overflow: 'hidden',
              padding: 56,
              background: mode === 'login' ? '#2c1810' : '#faf8f5',
              position: 'relative',
            }}
          >
            {mode === 'login' ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    background: 'transparent',
                    border: 'none',
                    fontSize: 18,
                    color: 'rgba(196,168,130,0.4)',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#c4a882'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(196,168,130,0.4)'
                  }}
                  aria-label="Kapat"
                >
                  ✕
                </button>

                <div style={{ width: 32, height: 1, background: '#c4a882', opacity: 0.5, marginBottom: 32 }} />
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 10,
                    color: '#c4a882',
                    letterSpacing: 4,
                    marginBottom: 12,
                  }}
                >
                  HOŞ GELDİNİZ
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontStyle: 'italic',
                    fontSize: 40,
                    color: '#fff',
                    fontWeight: 400,
                    marginBottom: 8,
                  }}
                >
                  Tekrar merhaba.
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 14,
                    color: 'rgba(196,168,130,0.6)',
                    marginBottom: 40,
                  }}
                >
                  Hesabınıza giriş yapın.
                </div>

                {submitted ? (
                  <div style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 8 }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c4a882" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                    </svg>
                    <div
                      style={{
                        marginTop: 16,
                        fontFamily: 'var(--font-cormorant), serif',
                        fontStyle: 'italic',
                        fontSize: 28,
                        color: '#fff',
                      }}
                    >
                      Giriş başarılı!
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 13,
                        color: 'rgba(196,168,130,0.6)',
                      }}
                    >
                      Yönlendiriliyorsunuz...
                    </div>
                  </div>
                ) : (
                  <>
                    <label
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 10,
                        color: '#c4a882',
                        letterSpacing: 2,
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      E-POSTA
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="ornek@mail.com"
                      style={{
                        width: '100%',
                        padding: '12px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(196,168,130,0.2)',
                        color: '#fff',
                        fontSize: 15,
                        outline: 'none',
                        fontFamily: 'var(--font-inter), sans-serif',
                        transition: 'border-bottom 0.2s ease',
                        marginBottom: 28,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid rgba(196,168,130,0.6)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid rgba(196,168,130,0.2)'
                      }}
                    />

                    <label
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 10,
                        color: '#c4a882',
                        letterSpacing: 2,
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      ŞİFRE
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '12px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(196,168,130,0.2)',
                        color: '#fff',
                        fontSize: 15,
                        outline: 'none',
                        fontFamily: 'var(--font-inter), sans-serif',
                        transition: 'border-bottom 0.2s ease',
                        marginBottom: 28,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid rgba(196,168,130,0.6)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid rgba(196,168,130,0.2)'
                      }}
                    />

                    <div
                      style={{
                        textAlign: 'right',
                        marginTop: -20,
                        marginBottom: 32,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 12,
                        color: 'rgba(196,168,130,0.5)',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLDivElement).style.color = '#c4a882'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLDivElement).style.color = 'rgba(196,168,130,0.5)'
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label="Şifremi unuttum"
                    >
                      Şifremi Unuttum
                    </div>

                    <button
                      type="button"
                      onClick={handleLogin}
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#c4a882',
                        color: '#2c1810',
                        border: 'none',
                        borderRadius: 2,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: 600,
                        cursor: 'pointer',
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>

                    <div
                      style={{
                        borderTop: '1px solid rgba(196,168,130,0.1)',
                        paddingTop: 24,
                        marginTop: 32,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 13,
                        color: 'rgba(196,168,130,0.5)',
                      }}
                    >
                      Hesabınız yok mu?
                      <span
                        style={{ color: '#c4a882', cursor: 'pointer', fontWeight: 500 }}
                        onClick={() => onSwitchMode('register')}
                        role="button"
                        tabIndex={0}
                        aria-label="Kayıt ol"
                      >
                        {' '}
                        Kayıt olun →
                      </span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    background: 'transparent',
                    border: 'none',
                    fontSize: 18,
                    color: '#c4a882',
                    cursor: 'pointer',
                  }}
                  aria-label="Kapat"
                >
                  ✕
                </button>

                <div style={{ width: 32, height: 1, background: '#c4a882', opacity: 0.5, marginBottom: 32 }} />
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 10,
                    color: '#c4a882',
                    letterSpacing: 4,
                    marginBottom: 12,
                  }}
                >
                  YENİ HESAP
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontStyle: 'italic',
                    fontSize: 40,
                    color: '#2c1810',
                    fontWeight: 400,
                    marginBottom: 8,
                  }}
                >
                  Aramıza katılın.
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 14,
                    color: '#8c7b6e',
                    marginBottom: 40,
                  }}
                >
                  Her parçanın hikayesini keşfedin.
                </div>

                {submitted ? (
                  <div style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 8 }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c1810" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
                    </svg>
                    <div
                      style={{
                        marginTop: 16,
                        fontFamily: 'var(--font-cormorant), serif',
                        fontStyle: 'italic',
                        fontSize: 28,
                        color: '#2c1810',
                      }}
                    >
                      Hesabınız oluşturuldu!
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 13,
                        color: '#8c7b6e',
                      }}
                    >
                      Hoş geldiniz.
                    </div>
                  </div>
                ) : (
                  <>
                    <label
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 10,
                        color: '#8c7b6e',
                        letterSpacing: 2,
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      AD SOYAD
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ömer Faruk"
                      style={{
                        width: '100%',
                        padding: '12px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #e8e0d8',
                        color: '#2c1810',
                        fontSize: 15,
                        outline: 'none',
                        fontFamily: 'var(--font-inter), sans-serif',
                        transition: 'border-bottom 0.2s ease',
                        marginBottom: 24,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid #c4a882'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid #e8e0d8'
                      }}
                    />

                    <label
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 10,
                        color: '#8c7b6e',
                        letterSpacing: 2,
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      E-POSTA
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="ornek@mail.com"
                      style={{
                        width: '100%',
                        padding: '12px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #e8e0d8',
                        color: '#2c1810',
                        fontSize: 15,
                        outline: 'none',
                        fontFamily: 'var(--font-inter), sans-serif',
                        transition: 'border-bottom 0.2s ease',
                        marginBottom: 24,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid #c4a882'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid #e8e0d8'
                      }}
                    />

                    <label
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 10,
                        color: '#8c7b6e',
                        letterSpacing: 2,
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      ŞİFRE
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="En az 8 karakter"
                      style={{
                        width: '100%',
                        padding: '12px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #e8e0d8',
                        color: '#2c1810',
                        fontSize: 15,
                        outline: 'none',
                        fontFamily: 'var(--font-inter), sans-serif',
                        transition: 'border-bottom 0.2s ease',
                        marginBottom: 24,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid #c4a882'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid #e8e0d8'
                      }}
                    />

                    <label
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 10,
                        color: '#8c7b6e',
                        letterSpacing: 2,
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      ŞİFRE TEKRAR
                    </label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Şifrenizi tekrar girin"
                      style={{
                        width: '100%',
                        padding: '12px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #e8e0d8',
                        color: '#2c1810',
                        fontSize: 15,
                        outline: 'none',
                        fontFamily: 'var(--font-inter), sans-serif',
                        transition: 'border-bottom 0.2s ease',
                        marginBottom: 24,
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid #c4a882'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderBottom = '1px solid #e8e0d8'
                      }}
                    />

                    <button
                      type="button"
                      onClick={handleRegister}
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#2c1810',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 2,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 12,
                        letterSpacing: 2,
                        fontWeight: 600,
                        cursor: 'pointer',
                        opacity: loading ? 0.7 : 1,
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLButtonElement).style.background = '#3d2518'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLButtonElement).style.background = '#2c1810'
                      }}
                    >
                      {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                    </button>

                    <div
                      style={{
                        borderTop: '1px solid #e8e0d8',
                        paddingTop: 24,
                        marginTop: 32,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 13,
                        color: '#8c7b6e',
                      }}
                    >
                      Zaten hesabınız var mı?
                      <span
                        style={{ color: '#2c1810', cursor: 'pointer', fontWeight: 500 }}
                        onClick={() => onSwitchMode('login')}
                        role="button"
                        tabIndex={0}
                        aria-label="Giriş yap"
                      >
                        {' '}
                        Giriş yapın →
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

