'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

import { productImages } from '@/lib/ecommerce-images'
import type { CartItem } from '@/types/ecommerce'

export interface CheckoutModalProps {
  isOpen: boolean
  cartItems: CartItem[]
  onClose: () => void
  onSuccess: () => void
}

function formatMoney(n: number) {
  return `₺${n.toLocaleString('tr-TR')}`
}

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

export function CheckoutModal({ isOpen, cartItems, onClose, onSuccess }: CheckoutModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const orderNumber = useRef(Math.random().toString().slice(2, 8))

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [loading, setLoading] = useState(false)
  const [focusField, setFocusField] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [zipCode, setZipCode] = useState('')

  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const subtotal = useMemo(
    () => cartItems.reduce((a, b) => a + b.product.price * b.quantity, 0),
    [cartItems],
  )

  const cardDigits = cardNumber.replace(/\s/g, '')
  const cardBrand =
    cardDigits.startsWith('4') ? 'Visa' : cardDigits.startsWith('5') ? 'Mastercard' : null

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [step])

  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setLoading(false)
      setName('')
      setPhone('')
      setAddress('')
      setCity('')
      setDistrict('')
      setZipCode('')
      setCardNumber('')
      setCardName('')
      setExpiry('')
      setCvv('')
    }
  }, [isOpen])

  const inputBorder = (field: string) =>
    focusField === field ? '1px solid #c4a882' : '1px solid #e8e0d8'

  const disabled = loading

  const handleOrder = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 2000)
  }

  const fieldLabel = (text: string) => (
    <span
      style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 10,
        color: '#8c7b6e',
        letterSpacing: 2,
        marginBottom: 6,
        display: 'block',
      }}
    >
      {text}
    </span>
  )

  const textInputStyle = (field: string): CSSProperties => ({
    width: '100%',
    padding: '11px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: inputBorder(field),
    color: '#2c1810',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'var(--font-inter), sans-serif',
    marginBottom: 24,
  })

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="checkout-overlay"
          role="presentation"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(44,24,16,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            ref={scrollRef}
            role="dialog"
            aria-modal
            aria-labelledby="checkout-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: 960,
              background: '#faf8f5',
              borderRadius: 4,
              overflow: 'hidden',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              <div
                style={{
                  background: '#f5f0eb',
                  padding: 48,
                  borderRight: '1px solid #e8e0d8',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 11,
                    color: '#c4a882',
                    letterSpacing: 3,
                    marginBottom: 32,
                  }}
                >
                  SİPARİŞ ÖZETİ
                </div>
                <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 32 }}>
                  {cartItems.map((item) => {
                    const img = productImages[item.product.id]
                    return (
                      <div
                        key={item.product.id}
                        style={{ display: 'flex', gap: 12, marginBottom: 16 }}
                      >
                        <div
                          style={{
                            width: 60,
                            height: 70,
                            borderRadius: 4,
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: item.product.color,
                          }}
                        >
                          {img ? (
                            <img
                              src={img}
                              alt={item.product.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : null}
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-cormorant), serif',
                              fontStyle: 'italic',
                              fontSize: 16,
                              color: '#2c1810',
                            }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-inter), sans-serif',
                              fontSize: 12,
                              color: '#8c7b6e',
                            }}
                          >
                            Adet: {item.quantity}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-inter), sans-serif',
                              fontSize: 14,
                              fontWeight: 500,
                              color: '#2c1810',
                            }}
                          >
                            {formatMoney(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div
                  style={{ width: '100%', height: 1, background: '#e8e0d8', margin: '16px 0' }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 13,
                    color: '#8c7b6e',
                  }}
                >
                  <span>Ara Toplam</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: '#8c7b6e' }}>Kargo</span>
                  <span style={{ color: '#22c55e' }}>Ücretsiz</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 13,
                    color: '#8c7b6e',
                  }}
                >
                  <span>İndirim</span>
                  <span>-₺0</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: 16,
                    borderTop: '1px solid #e8e0d8',
                    marginTop: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#2c1810',
                      letterSpacing: 1,
                    }}
                  >
                    TOPLAM
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 24,
                      color: '#2c1810',
                      fontWeight: 600,
                    }}
                  >
                    {formatMoney(subtotal)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c4a882"
                      strokeWidth={1.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 11,
                        color: '#8c7b6e',
                      }}
                    >
                      Güvenli Ödeme
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c4a882"
                      strokeWidth={1.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.5a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 11,
                        color: '#8c7b6e',
                      }}
                    >
                      Ücretsiz Kargo
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c4a882"
                      strokeWidth={1.5}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12.75A2.25 2.25 0 0118 11.25v7.5"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 11,
                        color: '#8c7b6e',
                      }}
                    >
                      14 Gün İade
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ padding: 48 }}>
                {step < 3 ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: 40,
                      width: '100%',
                    }}
                  >
                    {(['Adres', 'Ödeme', 'Onay'] as const).map((label, idx) => {
                      const n = (idx + 1) as 1 | 2 | 3
                      const done = step > n
                      const active = step === n
                      return (
                        <div
                          key={label}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flex: idx < 2 ? 1 : undefined,
                            minWidth: 0,
                          }}
                        >
                          <div style={{ textAlign: 'center', width: 28, flexShrink: 0 }}>
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                background: done || active ? '#2c1810' : '#e8e0d8',
                                color: done || active ? '#fff' : '#8c7b6e',
                                fontFamily: 'var(--font-inter), sans-serif',
                                fontSize: 12,
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {n}
                            </div>
                            <div
                              style={{
                                fontFamily: 'var(--font-inter), sans-serif',
                                fontSize: 11,
                                color: active ? '#2c1810' : '#8c7b6e',
                                marginTop: 4,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {label}
                            </div>
                          </div>
                          {idx < 2 ? (
                            <div
                              style={{
                                flex: 1,
                                height: 1,
                                background: '#e8e0d8',
                                margin: '14px 8px 0',
                                minWidth: 8,
                              }}
                            />
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                ) : null}

                {step === 1 ? (
                  <>
                    <h2
                      id="checkout-title"
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontStyle: 'italic',
                        fontSize: 28,
                        color: '#2c1810',
                        marginBottom: 32,
                        fontWeight: 400,
                      }}
                    >
                      Teslimat Adresi
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      <label>
                        {fieldLabel('AD SOYAD')}
                        <input
                          disabled={disabled}
                          type="text"
                          placeholder="Ömer Faruk Türegün"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setFocusField('name')}
                          onBlur={() => setFocusField(null)}
                          style={textInputStyle('name')}
                        />
                      </label>
                      <label>
                        {fieldLabel('TELEFON')}
                        <input
                          disabled={disabled}
                          type="tel"
                          placeholder="+90 5XX XXX XX XX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onFocus={() => setFocusField('phone')}
                          onBlur={() => setFocusField(null)}
                          style={textInputStyle('phone')}
                        />
                      </label>
                      <label>
                        {fieldLabel('ADRES')}
                        <input
                          disabled={disabled}
                          type="text"
                          placeholder="Mahalle, Sokak, No"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          onFocus={() => setFocusField('address')}
                          onBlur={() => setFocusField(null)}
                          style={textInputStyle('address')}
                        />
                      </label>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: 16,
                        }}
                      >
                        <label>
                          {fieldLabel('ŞEHİR')}
                          <input
                            disabled={disabled}
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onFocus={() => setFocusField('city')}
                            onBlur={() => setFocusField(null)}
                            style={textInputStyle('city')}
                          />
                        </label>
                        <label>
                          {fieldLabel('İLÇE')}
                          <input
                            disabled={disabled}
                            type="text"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            onFocus={() => setFocusField('district')}
                            onBlur={() => setFocusField(null)}
                            style={textInputStyle('district')}
                          />
                        </label>
                      </div>
                      <label style={{ maxWidth: 140 }}>
                        {fieldLabel('POSTA KODU')}
                        <input
                          disabled={disabled}
                          type="text"
                          placeholder="34XXX"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          onFocus={() => setFocusField('zip')}
                          onBlur={() => setFocusField(null)}
                          style={textInputStyle('zip')}
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => setStep(2)}
                      style={{
                        width: '100%',
                        padding: 14,
                        background: '#2c1810',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 2,
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 12,
                        letterSpacing: 2,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        marginTop: 8,
                        opacity: disabled ? 0.6 : 1,
                      }}
                    >
                      Devam Et
                    </button>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <h2
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontStyle: 'italic',
                        fontSize: 28,
                        color: '#2c1810',
                        marginBottom: 32,
                        fontWeight: 400,
                      }}
                    >
                      Ödeme Bilgileri
                    </h2>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 24,
                        padding: 12,
                        background: '#f0ebe4',
                        borderRadius: 2,
                      }}
                    >
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c4a882"
                        strokeWidth={1.5}
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <span
                        style={{
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: 12,
                          color: '#8c7b6e',
                        }}
                      >
                        Bilgileriniz 256-bit SSL ile şifrelenir.
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label>
                        {fieldLabel('KART NUMARASI')}
                        <input
                          disabled={disabled}
                          type="text"
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          onFocus={() => setFocusField('card')}
                          onBlur={() => setFocusField(null)}
                          style={textInputStyle('card')}
                        />
                      </label>
                      {cardBrand ? (
                        <div
                          style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: 11,
                            color: '#c4a882',
                            marginTop: -16,
                            marginBottom: 16,
                          }}
                        >
                          {cardBrand}
                        </div>
                      ) : null}
                      <label>
                        {fieldLabel('KART ÜZERİNDEKİ İSİM')}
                        <input
                          disabled={disabled}
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          onFocus={() => setFocusField('cardName')}
                          onBlur={() => setFocusField(null)}
                          style={textInputStyle('cardName')}
                        />
                      </label>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 100px',
                          gap: 16,
                        }}
                      >
                        <label>
                          {fieldLabel('SON KULLANMA')}
                          <input
                            disabled={disabled}
                            type="text"
                            placeholder="AA/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            onFocus={() => setFocusField('exp')}
                            onBlur={() => setFocusField(null)}
                            style={textInputStyle('exp')}
                          />
                        </label>
                        <label>
                          {fieldLabel('CVV')}
                          <input
                            disabled={disabled}
                            type="password"
                            placeholder="•••"
                            value={cvv}
                            maxLength={4}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                            onFocus={() => setFocusField('cvv')}
                            onBlur={() => setFocusField(null)}
                            style={textInputStyle('cvv')}
                          />
                        </label>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => setStep(1)}
                        style={{
                          background: 'transparent',
                          border: '1px solid #e8e0d8',
                          color: '#8c7b6e',
                          padding: '13px 24px',
                          borderRadius: 2,
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: 12,
                          cursor: disabled ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Geri
                      </button>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={handleOrder}
                        style={{
                          background: '#2c1810',
                          color: '#fff',
                          flex: 1,
                          padding: 13,
                          border: 'none',
                          borderRadius: 2,
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: 12,
                          letterSpacing: 1,
                          cursor: disabled ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {loading ? 'İşleniyor...' : 'Siparişi Tamamla →'}
                      </button>
                    </div>
                  </>
                ) : null}

                {step === 3 ? (
                  <div style={{ textAlign: 'center', paddingTop: 20 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: '#f0ebe4',
                        margin: '0 auto 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width={36}
                        height={36}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2c1810"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <div
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontStyle: 'italic',
                        fontSize: 36,
                        color: '#2c1810',
                        marginBottom: 12,
                      }}
                    >
                      Siparişiniz Alındı!
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 13,
                        color: '#8c7b6e',
                        marginBottom: 8,
                      }}
                    >
                      Sipariş No: #TPS{orderNumber.current}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 13,
                        color: '#8c7b6e',
                        lineHeight: 1.6,
                        marginBottom: 32,
                      }}
                    >
                      Kargo takip bilgileri e-posta adresinize gönderildi.
                    </div>
                    <button
                      type="button"
                      onClick={onSuccess}
                      style={{
                        background: '#2c1810',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 2,
                        padding: '13px 32px',
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 12,
                        letterSpacing: 2,
                        cursor: 'pointer',
                      }}
                    >
                      Alışverişe Devam Et
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
