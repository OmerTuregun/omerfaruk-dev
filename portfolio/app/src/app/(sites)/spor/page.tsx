'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SporNav } from '@/components/sites/spor/SporNav'
import { HeroSection } from '@/components/sites/spor/HeroSection'
import { StatsSection } from '@/components/sites/spor/StatsSection'
import { AboutSection } from '@/components/sites/spor/AboutSection'
import { ServicesSection } from '@/components/sites/spor/ServicesSection'
import { TransformationsSection } from '@/components/sites/spor/TransformationsSection'
import { TestimonialsSection } from '@/components/sites/spor/TestimonialsSection'
import { CertificationsSection } from '@/components/sites/spor/CertificationsSection'
import { ContactSection } from '@/components/sites/spor/ContactSection'
import { SporFooter } from '@/components/sites/spor/SporFooter'
import { ContactModal } from '@/components/sites/spor/ContactModal'
import { type Service } from '@/lib/spor-data'

export default function SporPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    document.body.style.overflow = contactOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [contactOpen])

  return (
    <>
      <SporNav setContactOpen={setContactOpen} />
      <HeroSection setContactOpen={setContactOpen} />
      <StatsSection />
      <AboutSection />
      <ServicesSection setContactOpen={setContactOpen} />
      <TransformationsSection />
      <TestimonialsSection />
      <CertificationsSection />
      <ContactSection setContactOpen={setContactOpen} />
      <SporFooter />

      <AnimatePresence>
        {contactOpen && (
          <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
