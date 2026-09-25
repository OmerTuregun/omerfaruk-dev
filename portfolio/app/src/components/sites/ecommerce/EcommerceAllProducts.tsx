'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { products } from '@/lib/ecommerce-products'
import { type Product } from '@/lib/ecommerce-products'
import { productImages } from '@/lib/ecommerce-images'

const colors = {
  bg: '#faf8f5',
  bgAlt: '#f5f0eb',
  dark: '#2c1810',
  gold: '#c4a882',
  muted: '#8c7b6e',
  border: '#e8e0d8',
} as const

export interface EcommerceAllProductsProps {
  onProductClick: (product: Product) => void
  onAddToCart: (product: Product) => void
}

type Category = 'tumu' | 'kase' | 'vazo' | 'kupa' | 'dekor'
type SortBy = 'varsayilan' | 'artan' | 'azalan'

function formatPrice(price: number) {
  return `₺${price.toLocaleString('tr-TR')}`
}

export function EcommerceAllProducts({ onProductClick, onAddToCart }: EcommerceAllProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('tumu')
  const [sortBy, setSortBy] = useState<SortBy>('varsayilan')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => selectedCategory === 'tumu' || p.category === selectedCategory)
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'artan') return a.price - b.price
      if (sortBy === 'azalan') return b.price - a.price
      return 0
    })
    return sorted
  }, [selectedCategory, sortBy])

  const categories: Array<{ label: string; value: Category }> = [
    { label: 'TÜMÜ', value: 'tumu' },
    { label: 'KASELER', value: 'kase' },
    { label: 'VAZOLAR', value: 'vazo' },
    { label: 'KUPALAR', value: 'kupa' },
    { label: 'EV DEKOR', value: 'dekor' },
  ]

  return (
    <section
      id="tum-urunler"
      style={{
        background: colors.bg,
        borderTop: `1px solid ${colors.border}`,
        padding: '100px 60px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 48,
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 11,
                color: colors.gold,
                letterSpacing: 3,
                marginBottom: 12,
              }}
            >
              TÜM ÜRÜNLER
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontStyle: 'italic',
                fontSize: 40,
                color: colors.dark,
              }}
            >
              Koleksiyonumuz.
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: colors.muted,
                marginTop: 6,
              }}
            >
              {filteredProducts.length} ürün
            </div>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              style={{
                padding: '8px 16px',
                background: '#fff',
                border: `1px solid ${colors.border}`,
                borderRadius: 2,
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: colors.dark,
                outline: 'none',
                cursor: 'pointer',
              }}
              aria-label="Sıralama"
            >
              <option value="varsayilan">Varsayılan</option>
              <option value="artan">Fiyat: Düşükten Yükseğe</option>
              <option value="azalan">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
          {categories.map((c) => {
            const isSelected = selectedCategory === c.value
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setSelectedCategory(c.value)}
                style={{
                  background: isSelected ? colors.dark : '#fff',
                  color: isSelected ? '#fff' : colors.muted,
                  border: `1px solid ${isSelected ? colors.dark : colors.border}`,
                  borderRadius: 2,
                  padding: '8px 20px',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 12,
                  letterSpacing: 1,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (isSelected) return
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = colors.gold
                  el.style.color = colors.dark
                }}
                onMouseLeave={(e) => {
                  if (isSelected) return
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = colors.border
                  el.style.color = colors.muted
                }}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 0',
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 24,
              color: colors.muted,
            }}
          >
            Bu kategoride ürün bulunamadı.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isHovered = hoveredId === product.id
                const imgSrc = productImages[product.id] ?? null
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      onClick={() => onProductClick(product)}
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      aria-label={`${product.name} ürününü incele`}
                    >
                      <div
                        style={{
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: 4,
                          marginBottom: 16,
                          height: 280,
                          background: product.color,
                        }}
                      >
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={product.name}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center',
                              transform: hoveredId === product.id ? 'scale(1.05)' : 'scale(1)',
                              transition: 'transform 0.6s ease',
                              zIndex: 0,
                            }}
                          />
                        ) : null}

                        {product.stock <= 3 ? (
                          <div
                            style={{
                              position: 'absolute',
                              top: 12,
                              left: 12,
                              background: 'rgba(44,24,16,0.85)',
                              color: '#c4a882',
                              fontSize: 10,
                              padding: '4px 10px',
                              letterSpacing: 1.5,
                              fontFamily: 'var(--font-inter), sans-serif',
                              zIndex: 2,
                            }}
                          >
                            SON {product.stock} ADET
                          </div>
                        ) : null}

                        <div
                          aria-hidden
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(44,24,16,0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.2s ease',
                            zIndex: 1,
                          }}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onProductClick(product)
                            }}
                            style={{
                              background: '#fff',
                              color: colors.dark,
                              border: 'none',
                              borderRadius: 2,
                              padding: '9px 18px',
                              fontSize: 11,
                              letterSpacing: 1,
                              cursor: 'pointer',
                              fontFamily: 'var(--font-inter), sans-serif',
                            }}
                          >
                            İncele
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onAddToCart(product)
                            }}
                            style={{
                              background: colors.dark,
                              color: '#fff',
                              border: 'none',
                              borderRadius: 2,
                              padding: '9px 18px',
                              fontSize: 11,
                              letterSpacing: 1,
                              cursor: 'pointer',
                              fontFamily: 'var(--font-inter), sans-serif',
                            }}
                          >
                            Sepete Ekle
                          </button>
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: 10,
                            color: colors.gold,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            marginBottom: 6,
                          }}
                        >
                          {product.category}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-cormorant), serif',
                            fontStyle: 'italic',
                            fontSize: 20,
                            color: colors.dark,
                          }}
                        >
                          {product.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: 12,
                            color: colors.muted,
                            marginTop: 4,
                          }}
                        >
                          {product.material}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: 16,
                            fontWeight: 500,
                            color: colors.dark,
                            marginTop: 8,
                          }}
                        >
                          {formatPrice(product.price)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}

