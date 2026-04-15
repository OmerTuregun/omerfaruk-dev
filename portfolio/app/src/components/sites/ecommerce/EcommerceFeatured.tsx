'use client'

import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import { products, type Product } from '@/lib/ecommerce-products'

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

function ProductCard({
  product,
  hoveredId,
  setHoveredId,
}: {
  product: Product
  hoveredId: string | null
  setHoveredId: (v: string | null) => void
}) {
  const isHovered = hoveredId === product.id
  const imgSrc =
    product.id === 'kase-001'
      ? 'https://images.unsplash.com/photo-1536936812504-0e77dc3f0b40?w=700&q=80'
      : product.id === 'vazo-001'
        ? 'https://images.unsplash.com/photo-1631125916276-69bcd14e3980?w=700&q=80'
        : product.id === 'kupa-001'
          ? 'https://images.unsplash.com/photo-1721109890030-00faaa68981f?w=700&q=80'
          : product.id === 'dekor-001'
            ? 'https://images.unsplash.com/photo-1721328004336-c19ee38adcd1?w=700&q=80'
            : null

  return (
    <div
      onMouseEnter={() => setHoveredId(product.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`${product.name} ürününü incele`}
    >
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, marginBottom: 16 }}>
        <div style={{ height: 320, background: product.color }} />
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
              transition: 'transform 0.6s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
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
      </div>
    </div>
  )
}

export function EcommerceFeatured() {
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
              <ProductCard product={p} hoveredId={hoveredId} setHoveredId={setHoveredId} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

