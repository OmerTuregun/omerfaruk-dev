import { EcommerceBrandStory } from '@/components/sites/ecommerce/EcommerceBrandStory'
import { EcommerceCategories } from '@/components/sites/ecommerce/EcommerceCategories'
import { EcommerceFeatured } from '@/components/sites/ecommerce/EcommerceFeatured'
import { EcommerceFooter } from '@/components/sites/ecommerce/EcommerceFooter'
import { EcommerceHero } from '@/components/sites/ecommerce/EcommerceHero'
import { EcommerceInstagram } from '@/components/sites/ecommerce/EcommerceInstagram'
import { EcommerceNav } from '@/components/sites/ecommerce/EcommerceNav'
import { EcommerceProcess } from '@/components/sites/ecommerce/EcommerceProcess'
import { EcommerceReviews } from '@/components/sites/ecommerce/EcommerceReviews'

export default function EcommercePage() {
  return (
    <>
      <EcommerceNav />
      <div style={{ height: 64 }} />
      <EcommerceHero />
      <EcommerceCategories />
      <EcommerceFeatured />
      <EcommerceBrandStory />
      <EcommerceProcess />
      <EcommerceReviews />
      <EcommerceInstagram />
      <EcommerceFooter />
    </>
  )
}

