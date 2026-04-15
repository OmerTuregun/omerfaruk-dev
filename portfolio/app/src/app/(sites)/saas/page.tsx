import { SaasCTA } from '@/components/sites/saas/SaasCTA'
import SaasDemo from '@/components/sites/saas/SaasDemo'
import { SaasFeatures } from '@/components/sites/saas/SaasFeatures'
import { SaasFooter } from '@/components/sites/saas/SaasFooter'
import { SaasFAQ } from '@/components/sites/saas/SaasFAQ'
import { SaasHero } from '@/components/sites/saas/SaasHero'
import { SaasHowItWorks } from '@/components/sites/saas/SaasHowItWorks'
import { SaasIntegrations } from '@/components/sites/saas/SaasIntegrations'
import { SaasLogos } from '@/components/sites/saas/SaasLogos'
import { SaasNav } from '@/components/sites/saas/SaasNav'
import { SaasPricing } from '@/components/sites/saas/SaasPricing'
import { SaasReviews } from '@/components/sites/saas/SaasReviews'

export default function SaasPage() {
  return (
    <>
      <SaasNav />
      <div style={{ height: 64 }} />
      <SaasHero />
      <SaasLogos />
      <SaasFeatures />
      <SaasDemo />
      <SaasIntegrations />
      <SaasHowItWorks />
      <SaasPricing />
      <SaasReviews />
      <SaasFAQ />
      <SaasCTA />
      <SaasFooter />
    </>
  )
}
