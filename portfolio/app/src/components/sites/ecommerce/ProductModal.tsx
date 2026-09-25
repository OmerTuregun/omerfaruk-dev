'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import type { Product } from '@/lib/ecommerce-products'
import { productImages } from '@/lib/ecommerce-images'

export interface ProductModalProps {
  product: Product | null
  products: Product[]
  onClose: () => void
  onAddToCart: (product: Product) => void
  onProductClick: (product: Product) => void
}

export function ProductModal({ product, products, onClose, onAddToCart, onProductClick }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [hoveredSimilar, setHoveredSimilar] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [product])

  useEffect(() => {
    // Reset quantity when opening / switching product.
    setQuantity(1)
    setHoveredSimilar(null)
  }, [product?.id])

  const imgSrc = product ? (productImages[product.id] ?? null) : null
  const maxQty = product?.stock ?? 1
  const clampedQty = Math.max(1, Math.min(quantity, maxQty))

  const stockLabel = useMemo(() => {
    if (!product) return ''
    return product.stock > 3 ? 'Mevcut' : `Son ${product.stock} adet`
  }, [product])

  const similarProducts = useMemo(() => {
    if (!product) return []
    const byCategory = products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 3)
    if (byCategory.length === 3) return byCategory
    return products.filter((p) => p.id !== product.id).slice(0, 3)
  }, [product, products])

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          key="overlay"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(44,24,16,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#faf8f5',
              borderRadius: '4px',
              width: '100%',
              maxWidth: '960px',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              maxHeight: '90vh',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ position: 'relative', minHeight: 500, overflow: 'hidden' }}>
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: product.color }} />
                )}

                {product.stock <= 3 ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      background: 'rgba(44,24,16,0.85)',
                      color: '#c4a882',
                      fontSize: 10,
                      padding: '5px 12px',
                      letterSpacing: 1.5,
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}
                  >
                    SON {product.stock} ADET
                  </div>
                ) : null}
              </div>

              <div
                style={{
                  padding: 48,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
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

                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 10,
                    color: '#c4a882',
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  {product.category}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 36,
                    fontWeight: 400,
                    color: '#2c1810',
                    fontStyle: 'italic',
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  {product.name}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 22,
                    color: '#2c1810',
                    fontWeight: 500,
                    marginBottom: 24,
                  }}
                >
                  ₺{product.price}
                </div>

                <div style={{ width: 40, height: 1, background: '#c4a882', opacity: 0.4, marginBottom: 24 }} />

                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 14,
                    color: '#8c7b6e',
                    lineHeight: 1.8,
                    marginBottom: 32,
                  }}
                >
                  {product.description}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginBottom: 32,
                  }}
                >
                  <div>
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
                      MALZEME
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 13, color: '#2c1810' }}>
                      {product.material}
                    </div>
                  </div>

                  <div>
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
                      BOYUT
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 13, color: '#2c1810' }}>
                      {product.dimensions}
                    </div>
                  </div>

                  <div>
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
                      STOK
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 13, color: '#2c1810' }}>
                      {stockLabel}
                    </div>
                  </div>

                  <div>
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
                      KATEGORİ
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: 13, color: '#2c1810' }}>
                      {product.category}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 10,
                      color: '#c4a882',
                      letterSpacing: 2,
                    }}
                  >
                    MİKTAR
                  </div>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: 32,
                      height: 32,
                      border: '1px solid #e8e0d8',
                      borderRadius: 2,
                      background: 'transparent',
                      fontSize: 16,
                      color: '#2c1810',
                      cursor: 'pointer',
                    }}
                    aria-label="Azalt"
                  >
                    −
                  </button>

                  <div
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 16,
                      color: '#2c1810',
                      minWidth: 32,
                      textAlign: 'center',
                    }}
                  >
                    {clampedQty}
                  </div>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    style={{
                      width: 32,
                      height: 32,
                      border: '1px solid #e8e0d8',
                      borderRadius: 2,
                      background: 'transparent',
                      fontSize: 16,
                      color: '#2c1810',
                      cursor: 'pointer',
                    }}
                    aria-label="Artır"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    for (let i = 0; i < clampedQty; i += 1) onAddToCart(product)
                    onClose()
                  }}
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
                  Sepete Ekle
                </button>

                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 11,
                    color: '#c4a882',
                    textAlign: 'center',
                    marginTop: 16,
                  }}
                >
                  El yapımı · Her parça benzersiz · Ücretsiz kargo
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid #e8e0d8',
                padding: '32px 48px',
                background: '#f5f0eb',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 10,
                  color: '#c4a882',
                  letterSpacing: 3,
                  marginBottom: 24,
                }}
              >
                BUNLARI DA BEĞENEBİLİRSİNİZ
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {similarProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onProductClick(p)}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      transform: hoveredSimilar === p.id ? 'translateY(-4px)' : 'translateY(0px)',
                    }}
                    onMouseEnter={() => setHoveredSimilar(p.id)}
                    onMouseLeave={() => setHoveredSimilar(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name} ürününü aç`}
                  >
                    <div style={{ height: 200, borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
                      <img
                        src={productImages[p.id]}
                        alt={p.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          transform: hoveredSimilar === p.id ? 'scale(1.05)' : 'scale(1)',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-cormorant), serif',
                        fontStyle: 'italic',
                        fontSize: 16,
                        color: '#2c1810',
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: 13,
                        color: '#8c7b6e',
                        marginTop: 4,
                      }}
                    >
                      ₺{p.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

