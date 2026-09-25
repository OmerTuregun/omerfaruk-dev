'use client'

import { useState } from 'react'

import { EcommerceBrandStory } from '@/components/sites/ecommerce/EcommerceBrandStory'
import { EcommerceCategories } from '@/components/sites/ecommerce/EcommerceCategories'
import { EcommerceFeatured } from '@/components/sites/ecommerce/EcommerceFeatured'
import { EcommerceAllProducts } from '@/components/sites/ecommerce/EcommerceAllProducts'
import { EcommerceFooter } from '@/components/sites/ecommerce/EcommerceFooter'
import { EcommerceHero } from '@/components/sites/ecommerce/EcommerceHero'
import { EcommerceInstagram } from '@/components/sites/ecommerce/EcommerceInstagram'
import { EcommerceNav } from '@/components/sites/ecommerce/EcommerceNav'
import { EcommerceProcess } from '@/components/sites/ecommerce/EcommerceProcess'
import { EcommerceReviews } from '@/components/sites/ecommerce/EcommerceReviews'
import { EcommerceNewsletter } from '@/components/sites/ecommerce/EcommerceNewsletter'
import { AuthModal } from '@/components/sites/ecommerce/AuthModal'
import { CartPanel } from '@/components/sites/ecommerce/CartPanel'
import { ProductModal } from '@/components/sites/ecommerce/ProductModal'

import { products, type Product } from '@/lib/ecommerce-products'
import type { CartItem } from '@/types/ecommerce'

export default function EcommercePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null)

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId))
    } else {
      setCartItems((prev) => prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)))
    }
  }

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  return (
    <>
      <EcommerceNav
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setAuthMode('login')}
        onRegisterClick={() => setAuthMode('register')}
      />
      <div style={{ height: 64 }} />
      <EcommerceHero />
      <EcommerceCategories />
      <EcommerceFeatured onProductClick={setSelectedProduct} onAddToCart={addToCart} />
      <EcommerceAllProducts onProductClick={setSelectedProduct} onAddToCart={addToCart} />
      <EcommerceBrandStory />
      <EcommerceProcess />
      <EcommerceReviews />
      <EcommerceInstagram />
      <EcommerceNewsletter />
      <EcommerceFooter />
      <ProductModal
        product={selectedProduct}
        products={products}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onProductClick={(p) => {
          setSelectedProduct(null)
          setTimeout(() => setSelectedProduct(p), 150)
        }}
      />
      <CartPanel
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
      <AuthModal
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />
    </>
  )
}

