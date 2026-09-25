'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import { productImages } from '@/lib/ecommerce-images'
import type { Product } from '@/lib/ecommerce-products'

export interface WishlistPanelProps {
  isOpen: boolean
  items: Product[]
  onClose: () => void
  onRemove: (productId: string) => void
  onAddToCart: (product: Product) => void
}

function formatPrice(price: number) {
  return `₺${price.toLocaleString('tr-TR')}`
}

export function WishlistPanel({ isOpen, items, onClose, onRemove, onAddToCart }: WishlistPanelProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="wishlist-overlay"
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              background: 'rgba(44,24,16,0.3)',
              backdropFilter: 'blur(2px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            key="wishlist-panel"
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
                padding: '24px 32px',
                borderBottom: '1px solid #e8e0d8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
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
                  FAVORİLERİM
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
                aria-label="Kapat"
                style={{
                  color: '#8c7b6e',
                  background: 'none',
                  border: 'none',
                  fontSize: 18,
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', paddingTop: 80 }}>
                  <svg
                    width={48}
                    height={48}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e8e0d8"
                    strokeWidth={1}
                    aria-hidden
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontStyle: 'italic',
                      fontSize: 24,
                      color: '#2c1810',
                      marginTop: 16,
                    }}
                  >
                    Favorileriniz boş.
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 13,
                      color: '#8c7b6e',
                      marginTop: 8,
                      lineHeight: 1.6,
                    }}
                  >
                    Beğendiğiniz ürünleri kalp ikonuna tıklayarak ekleyin.
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: 16,
                      paddingBottom: 24,
                      marginBottom: 24,
                      borderBottom: '1px solid #e8e0d8',
                    }}
                  >
                    <div
                      style={{
                        width: 80,
                        height: 90,
                        flexShrink: 0,
                        borderRadius: 4,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={productImages[item.id]}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: 10,
                          color: '#c4a882',
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          marginBottom: 4,
                        }}
                      >
                        {item.category}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-cormorant), serif',
                          fontStyle: 'italic',
                          fontSize: 18,
                          color: '#2c1810',
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: 12,
                          color: '#8c7b6e',
                          marginTop: 2,
                        }}
                      >
                        {item.material}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#2c1810',
                          marginTop: 6,
                        }}
                      >
                        {formatPrice(item.price)}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        aria-label="Kaldır"
                        style={{
                          fontSize: 16,
                          color: '#c4a882',
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                      <button
                        type="button"
                        style={{
                          background: '#2c1810',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 2,
                          padding: '8px 14px',
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: 11,
                          letterSpacing: 1,
                          cursor: 'pointer',
                          marginTop: 'auto',
                        }}
                        onClick={() => {
                          onAddToCart(item)
                          onRemove(item.id)
                        }}
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 ? (
              <div style={{ padding: '20px 32px', borderTop: '1px solid #e8e0d8' }}>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: 13,
                    background: '#2c1810',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 2,
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 12,
                    letterSpacing: 2,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    items.forEach((item) => onAddToCart(item))
                    items.forEach((item) => onRemove(item.id))
                  }}
                >
                  Tümünü Sepete Ekle
                </button>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 11,
                    color: '#c4a882',
                    textAlign: 'center',
                    marginTop: 8,
                  }}
                >
                  Sepete eklenince favorilerden çıkar.
                </div>
              </div>
            ) : null}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
