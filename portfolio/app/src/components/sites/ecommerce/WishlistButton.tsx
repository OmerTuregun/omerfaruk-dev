'use client'

import { useState } from 'react'

import type { Product } from '@/lib/ecommerce-products'

export interface WishlistButtonProps {
  product: Product
  wishlistItems: Product[]
  onToggle: (product: Product) => void
}

export function WishlistButton({ product, wishlistItems, onToggle }: WishlistButtonProps) {
  const [hovered, setHovered] = useState(false)
  const isWishlisted = wishlistItems.some((p) => p.id === product.id)

  return (
    <button
      type="button"
      aria-label={isWishlisted ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 3,
        background: 'rgba(255,255,255,0.9)',
        border: 'none',
        borderRadius: '50%',
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.15s',
      }}
      onClick={(e) => {
        e.stopPropagation()
        onToggle(product)
      }}
    >
      <svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#2c1810"
        fill={isWishlisted ? '#2c1810' : 'none'}
        style={{ transition: 'fill 0.2s' }}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  )
}
