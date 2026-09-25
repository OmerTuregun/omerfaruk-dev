'use client'

import { PhotographerNav } from '@/components/sites/elif/PhotographerNav'
import { PhotographerHero } from '@/components/sites/elif/PhotographerHero'
import { PhotographerTicker } from '@/components/sites/elif/PhotographerTicker'
import { PhotographerWorks } from '@/components/sites/elif/PhotographerWorks'
import { PhotographerTestimonials } from '@/components/sites/elif/PhotographerTestimonials'
import { PhotographerAbout } from '@/components/sites/elif/PhotographerAbout'
import { PhotographerServices } from '@/components/sites/elif/PhotographerServices'
import { PhotographerInstagram } from '@/components/sites/elif/PhotographerInstagram'
import { PhotographerContact } from '@/components/sites/elif/PhotographerContact'
import { PhotographerFooter } from '@/components/sites/elif/PhotographerFooter'
import { PhotographerCursor } from '@/components/sites/elif/PhotographerCursor'

export default function ElifPage() {
  return (
    <>
      <PhotographerCursor />
      <div style={{ cursor: 'none' }}>
        <PhotographerNav />
        <div style={{ height: 72 }} />
        <PhotographerHero />
        <PhotographerTicker />
        <PhotographerWorks />
        <PhotographerTestimonials />
        <PhotographerAbout />
        <PhotographerServices />
        <PhotographerInstagram />
        <PhotographerContact />
        <PhotographerFooter />
      </div>
    </>
  )
}
