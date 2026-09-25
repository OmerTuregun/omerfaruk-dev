'use client'

import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import { products, type Product } from '@/lib/ecommerce-products'
import { productImages } from '@/lib/ecommerce-images'

const colors = {
  bg: '#faf8f5',
  bgAlt: '#f5f0eb',
  bgDark: '#f0ebe4',
  dark: '#2c1810',
  brown: '#5c3d2e',
  gold: '#c4a882',
  goldLight: '#e8ddd0',
  muted: '#8c7b6e',
  border: '#e8e0d8',
  white: '#ffffff',
} as const

function formatPrice(price: number) {
  return `₺${price.toLocaleString('tr-TR')}`
}

export interface EcommerceFeaturedProps {
  onProductClick: (product: Product) => void
  onAddToCart: (product: Product) => void
}

function ProductCard({
  product,
  hoveredId,
  setHoveredId,
  onProductClick,
  onAddToCart,
}: {
  product: Product
  hoveredId: string | null
  setHoveredId: (v: string | null) => void
  onProductClick: (product: Product) => void
  onAddToCart: (product: Product) => void
}) {
  const isHovered = hoveredId === product.id
  const imgSrc = productImages[product.id] ?? null

  return (
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
          height: 320,
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
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            top: -40,
            right: -40,
            zIndex: 1,
          }}
        />

        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(44,24,16,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
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
              padding: '10px 24px',
              fontSize: 12,
              letterSpacing: 1,
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            Hızlı İncele
          </button>
        </div>

        {product.stock <= 3 ? (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: 'rgba(44,24,16,0.8)',
              color: colors.gold,
              fontSize: 10,
              padding: '4px 10px',
              borderRadius: 2,
              letterSpacing: 1,
              fontFamily: 'var(--font-inter), sans-serif',
              zIndex: 2,
            }}
          >
            SON {product.stock} ADET
          </div>
        ) : null}
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
            fontSize: 20,
            color: colors.dark,
            fontWeight: 400,
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
            color: colors.dark,
            fontWeight: 500,
            marginTop: 8,
          }}
        >
          {formatPrice(product.price)}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product)
          }}
          style={{
            marginTop: 12,
            background: 'transparent',
            color: colors.dark,
            border: `1px solid ${colors.border}`,
            borderRadius: 2,
            padding: '10px 14px',
            fontSize: 11,
            letterSpacing: 2,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            textTransform: 'uppercase',
          }}
          aria-label={`${product.name} ürününü sepete ekle`}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  )
}

export function EcommerceFeatured({ onProductClick, onAddToCart }: EcommerceFeaturedProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  const featured = useMemo(() => products.filter((p) => p.featured), [])

  return (
    <section
      ref={ref}
      id="urunler"
      style={{
        background: colors.bgAlt,
        borderTop: `1px solid ${colors.border}`,
        padding: '80px 60px',
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
              ÖNE ÇIKANLAR
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontStyle: 'italic',
                fontSize: 40,
                color: colors.dark,
              }}
            >
              Seçilmiş parçalar.
            </div>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 13,
              color: colors.muted,
              cursor: 'pointer',
            }}
          >
            Tümünü Gör →
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <ProductCard
                product={p}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

