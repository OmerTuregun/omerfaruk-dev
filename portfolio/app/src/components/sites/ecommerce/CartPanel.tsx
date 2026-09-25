'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'

import { productImages } from '@/lib/ecommerce-images'
import type { CartItem } from '@/types/ecommerce'

export interface CartPanelProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CartPanel({ isOpen, items, onClose, onUpdateQuantity, onRemove }: CartPanelProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const subtotal = useMemo(
    () => items.reduce((a, b) => a + b.product.price * b.quantity, 0),
    [items],
  )

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="cart-overlay"
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'rgba(44,24,16,0.4)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 420,
              zIndex: 301,
              background: '#faf8f5',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 32px',
                borderBottom: '1px solid #e8e0d8',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 11,
                    color: '#c4a882',
                    letterSpacing: 3,
                  }}
                >
                  SEPETİNİZ
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 13,
                    color: '#8c7b6e',
                    marginTop: 4,
                  }}
                >
                  {items.length} ürün
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: 20,
                  color: '#8c7b6e',
                  cursor: 'pointer',
                }}
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', paddingTop: 80 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontStyle: 'italic',
                      fontSize: 24,
                      color: '#2c1810',
                    }}
                  >
                    Sepetiniz boş.
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 13,
                      color: '#8c7b6e',
                      marginTop: 12,
                    }}
                  >
                    Koleksiyonumuzu keşfedin.
                  </div>
                </div>
              ) : (
                items.map((item) => {
                  const imgSrc = productImages[item.product.id]
                  return (
                    <div
                      key={item.product.id}
                      style={{
                        display: 'flex',
                        gap: 16,
                        paddingBottom: 24,
                        marginBottom: 24,
                        borderBottom: '1px solid #e8e0d8',
                      }}
                    >
                      <div style={{ width: 80, height: 80, flexShrink: 0, borderRadius: 4, overflow: 'hidden' }}>
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={item.product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: item.product.color }} />
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-cormorant), serif',
                            fontStyle: 'italic',
                            fontSize: 18,
                            color: '#2c1810',
                          }}
                        >
                          {item.product.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: 13,
                            color: '#8c7b6e',
                            marginTop: 4,
                          }}
                        >
                          ₺{item.product.price}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: 14,
                            fontWeight: 500,
                            color: '#2c1810',
                          }}
                        >
                          ₺{item.product.price * item.quantity}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button
                            type="button"
                            onClick={() => {
                              const next = item.quantity - 1
                              if (next <= 0) onRemove(item.product.id)
                              else onUpdateQuantity(item.product.id, next)
                            }}
                            style={{
                              background: 'transparent',
                              border: '1px solid #e8e0d8',
                              borderRadius: 2,
                              width: 24,
                              height: 24,
                              cursor: 'pointer',
                              color: '#2c1810',
                            }}
                            aria-label="Azalt"
                          >
                            −
                          </button>

                          <div
                            style={{
                              fontFamily: 'var(--font-inter), sans-serif',
                              fontSize: 13,
                              color: '#2c1810',
                              minWidth: 18,
                              textAlign: 'center',
                            }}
                            aria-label="Miktar"
                          >
                            {item.quantity}
                          </div>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            style={{
                              background: 'transparent',
                              border: '1px solid #e8e0d8',
                              borderRadius: 2,
                              width: 24,
                              height: 24,
                              cursor: 'pointer',
                              color: '#2c1810',
                            }}
                            aria-label="Artır"
                          >
                            +
                          </button>

                          <button
                            type="button"
                            onClick={() => onRemove(item.product.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              fontSize: 16,
                              color: '#c4a882',
                              cursor: 'pointer',
                              lineHeight: 1,
                            }}
                            aria-label="Kaldır"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div style={{ padding: '24px 32px', borderTop: '1px solid #e8e0d8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 13,
                    color: '#8c7b6e',
                  }}
                >
                  Ara Toplam
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#2c1810',
                  }}
                >
                  ₺{subtotal}
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 11,
                  color: '#c4a882',
                  marginBottom: 20,
                }}
              >
                Ücretsiz kargo · 2-3 iş günü
              </div>

              <button
                type="button"
                onClick={() => alert('Ödeme sistemi yakında aktif olacak!')}
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
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = '#3d2518'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = '#2c1810'
                }}
              >
                Ödemeye Geç
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: 8,
                  background: 'transparent',
                  color: '#8c7b6e',
                  border: '1px solid #e8e0d8',
                  borderRadius: 2,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 12,
                  letterSpacing: 1,
                  cursor: 'pointer',
                }}
              >
                Alışverişe Devam
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

