'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface SaasModalProps {
  type: 'signup' | 'demo' | null
  onClose: () => void
}

type FocusField =
  | 'signup-name'
  | 'signup-email'
  | 'signup-password'
  | 'demo-name'
  | 'demo-company'
  | 'demo-email'
  | 'demo-size'
  | null

export function SaasModal({ type, onClose }: SaasModalProps) {
  const [focusedField, setFocusedField] = useState<FocusField>(null)

  // signup state
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupSubmitted, setSignupSubmitted] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)

  // demo state
  const [demoName, setDemoName] = useState('')
  const [demoCompany, setDemoCompany] = useState('')
  const [demoEmail, setDemoEmail] = useState('')
  const [demoSize, setDemoSize] = useState('')
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = type ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [type])

  useEffect(() => {
    if (!type) {
      setFocusedField(null)

      setSignupSubmitted(false)
      setSignupLoading(false)
      setDemoSubmitted(false)
      setDemoLoading(false)
    }
  }, [type])

  useEffect(() => {
    if (type !== 'signup' || !signupSubmitted) return
    const t = window.setTimeout(() => onClose(), 3000)
    return () => window.clearTimeout(t)
  }, [type, signupSubmitted, onClose])

  useEffect(() => {
    if (type !== 'demo' || !demoSubmitted) return
    const t = window.setTimeout(() => onClose(), 4000)
    return () => window.clearTimeout(t)
  }, [type, demoSubmitted, onClose])

  const inputBorder = (field: FocusField) => (focusedField === field ? '#4f46e5' : '#e2e8f0')

  const checkIcon = useMemo(() => {
    return (
      <svg width={48} height={48} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" />
        <path
          d="M8 12l3 3 5-5"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }, [])

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (signupLoading) return
    setSignupLoading(true)
    window.setTimeout(() => {
      setSignupLoading(false)
      setSignupSubmitted(true)
    }, 1500)
  }

  function handleDemo(e: React.FormEvent) {
    e.preventDefault()
    if (demoLoading) return
    setDemoLoading(true)
    window.setTimeout(() => {
      setDemoLoading(false)
      setDemoSubmitted(true)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {type !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(15,23,42,0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: 48,
              width: '100%',
              maxWidth: 480,
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: '#f8fafc',
                border: 'none',
                borderRadius: 8,
                width: 32,
                height: 32,
                cursor: 'pointer',
                fontSize: 16,
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Kapat"
            >
              ✕
            </button>

            {type === 'signup' ? (
              <>
                <div style={{ marginBottom: 32 }}>
                  <span
                    style={{
                      background: '#eff6ff',
                      color: '#4f46e5',
                      border: '1px solid #c7d2fe',
                      borderRadius: 20,
                      padding: '4px 14px',
                      fontSize: 12,
                      display: 'inline-block',
                      marginBottom: 16,
                    }}
                  >
                    14 gün ücretsiz · Kredi kartı gerekmez
                  </span>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#0f172a',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Hesabınızı oluşturun
                  </div>
                  <div style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>
                    30 saniyede başlayın.
                  </div>
                </div>

                {signupSubmitted ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>{checkIcon}</div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#0f172a',
                        marginTop: 16,
                      }}
                    >
                      Hesabınız oluşturuldu!
                    </div>
                    <div style={{ fontSize: 14, color: '#64748b', marginTop: 8 }}>
                      Demo ortamı hazırlanıyor, yönlendiriliyorsunuz...
                    </div>
                  </div>
                ) : (
                  <>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={handleSignup}>
                      <div>
                        <label
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: '#374151',
                            display: 'block',
                            marginBottom: 6,
                          }}
                        >
                          Ad Soyad
                        </label>
                        <input
                          type="text"
                          placeholder="Ömer Faruk Türegün"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          onFocus={() => setFocusedField('signup-name')}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            border: `1px solid ${inputBorder('signup-name')}`,
                            borderRadius: 8,
                            fontSize: 14,
                            color: '#0f172a',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: '#374151',
                            display: 'block',
                            marginBottom: 6,
                          }}
                        >
                          E-posta
                        </label>
                        <input
                          type="email"
                          placeholder="ornek@mail.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          onFocus={() => setFocusedField('signup-email')}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            border: `1px solid ${inputBorder('signup-email')}`,
                            borderRadius: 8,
                            fontSize: 14,
                            color: '#0f172a',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: '#374151',
                            display: 'block',
                            marginBottom: 6,
                          }}
                        >
                          Şifre
                        </label>
                        <input
                          type="password"
                          placeholder="En az 8 karakter"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          onFocus={() => setFocusedField('signup-password')}
                          onBlur={() => setFocusedField(null)}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            border: `1px solid ${inputBorder('signup-password')}`,
                            borderRadius: 8,
                            fontSize: 14,
                            color: '#0f172a',
                            outline: 'none',
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={signupLoading}
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: signupLoading ? '#818cf8' : '#4f46e5',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: 'pointer',
                          marginTop: 8,
                        }}
                      >
                        {signupLoading ? 'Hesap oluşturuluyor...' : 'Ücretsiz Hesap Oluştur →'}
                      </button>
                    </form>

                    <div
                      style={{
                        fontSize: 13,
                        color: '#64748b',
                        textAlign: 'center',
                        marginTop: 16,
                      }}
                    >
                      Zaten hesabınız var mı?{' '}
                      <span style={{ color: '#4f46e5', cursor: 'pointer' }}>Giriş yapın</span>
                    </div>
                  </>
                )}
              </>
            ) : null}

            {type === 'demo' ? (
              <>
                <div style={{ marginBottom: 32 }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#0f172a',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Demo talep edin
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: '#64748b',
                      marginTop: 6,
                      lineHeight: 1.6,
                    }}
                  >
                    Size özel bir demo ayarlayalım. Genellikle 24 saat içinde dönüş yapıyoruz.
                  </div>
                </div>

                {demoSubmitted ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>{checkIcon}</div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#0f172a',
                        marginTop: 16,
                      }}
                    >
                      Talebiniz alındı!
                    </div>
                    <div style={{ fontSize: 14, color: '#64748b', marginTop: 8 }}>
                      Ekibimiz en kısa sürede sizinle iletişime geçecek.
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 16 }}>
                      Ortalama yanıt süresi: 4 saat içinde
                    </div>
                  </div>
                ) : (
                  <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={handleDemo}>
                    <div>
                      <label
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#374151',
                          display: 'block',
                          marginBottom: 6,
                        }}
                      >
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        placeholder="Ömer Faruk Türegün"
                        value={demoName}
                        onChange={(e) => setDemoName(e.target.value)}
                        onFocus={() => setFocusedField('demo-name')}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: `1px solid ${inputBorder('demo-name')}`,
                          borderRadius: 8,
                          fontSize: 14,
                          color: '#0f172a',
                          outline: 'none',
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#374151',
                          display: 'block',
                          marginBottom: 6,
                        }}
                      >
                        Şirket Adı
                      </label>
                      <input
                        type="text"
                        placeholder="Şirket A.Ş."
                        value={demoCompany}
                        onChange={(e) => setDemoCompany(e.target.value)}
                        onFocus={() => setFocusedField('demo-company')}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: `1px solid ${inputBorder('demo-company')}`,
                          borderRadius: 8,
                          fontSize: 14,
                          color: '#0f172a',
                          outline: 'none',
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#374151',
                          display: 'block',
                          marginBottom: 6,
                        }}
                      >
                        İş E-postası
                      </label>
                      <input
                        type="email"
                        placeholder="ornek@sirket.com"
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        onFocus={() => setFocusedField('demo-email')}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: `1px solid ${inputBorder('demo-email')}`,
                          borderRadius: 8,
                          fontSize: 14,
                          color: '#0f172a',
                          outline: 'none',
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: '#374151',
                          display: 'block',
                          marginBottom: 6,
                        }}
                      >
                        Şirket Büyüklüğü
                      </label>
                      <select
                        value={demoSize}
                        onChange={(e) => setDemoSize(e.target.value)}
                        onFocus={() => setFocusedField('demo-size')}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: `1px solid ${inputBorder('demo-size')}`,
                          borderRadius: 8,
                          fontSize: 14,
                          color: '#0f172a',
                          outline: 'none',
                          fontFamily: 'inherit',
                          boxSizing: 'border-box',
                          background: '#fff',
                        }}
                      >
                        <option value="">Seçin...</option>
                        <option value="1-10 kişi">1-10 kişi</option>
                        <option value="11-50 kişi">11-50 kişi</option>
                        <option value="51-200 kişi">51-200 kişi</option>
                        <option value="201-500 kişi">201-500 kişi</option>
                        <option value="500+ kişi">500+ kişi</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={demoLoading}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#0f172a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: 8,
                        opacity: demoLoading ? 0.85 : 1,
                      }}
                    >
                      {demoLoading ? 'Gönderiliyor...' : 'Demo Talep Et →'}
                    </button>
                  </form>
                )}
              </>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

