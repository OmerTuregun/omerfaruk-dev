import type { Product } from '@/lib/ecommerce-products'

export type CartItem = {
  product: Product
  quantity: number
}

