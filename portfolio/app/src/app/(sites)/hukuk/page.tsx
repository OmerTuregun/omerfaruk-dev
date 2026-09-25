'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HukukNav } from '@/components/sites/hukuk/HukukNav'
import { HeroSection } from '@/components/sites/hukuk/HeroSection'
import { TrustBandSection } from '@/components/sites/hukuk/TrustBandSection'
import { PracticeAreasSection } from '@/components/sites/hukuk/PracticeAreasSection'
import { StatsSection } from '@/components/sites/hukuk/StatsSection'
import { ProcessSection } from '@/components/sites/hukuk/ProcessSection'
import { AttorneysSection } from '@/components/sites/hukuk/AttorneysSection'
import { CaseStudiesSection } from '@/components/sites/hukuk/CaseStudiesSection'
import { ContactSection } from '@/components/sites/hukuk/ContactSection'
import { HukukFooter } from '@/components/sites/hukuk/HukukFooter'
import { AttorneyModal } from '@/components/sites/hukuk/AttorneyModal'
import { AppointmentModal } from '@/components/sites/hukuk/AppointmentModal'
import { attorneys, type Attorney } from '@/lib/hukuk-data'

export default function HukukPage() {
  const [selectedAttorney, setSelectedAttorney] = useState<Attorney | null>(null)
  const [openArea, setOpenArea] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [appointmentOpen, setAppointmentOpen] = useState(false)

  useEffect(() => {
    const shouldLock = selectedAttorney !== null || appointmentOpen
    document.body.style.overflow = shouldLock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedAttorney, appointmentOpen])

  return (
    <>
      <HukukNav
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setAppointmentOpen={setAppointmentOpen}
      />
      <HeroSection setAppointmentOpen={setAppointmentOpen} />
      <TrustBandSection />
      <PracticeAreasSection openArea={openArea} setOpenArea={setOpenArea} />
      <StatsSection />
      <ProcessSection />
      <AttorneysSection attorneys={attorneys} setSelectedAttorney={setSelectedAttorney} />
      <CaseStudiesSection />
      <ContactSection />
      <HukukFooter />

      <AnimatePresence>
        {selectedAttorney && (
          <AttorneyModal
            attorney={selectedAttorney}
            onClose={() => setSelectedAttorney(null)}
            setAppointmentOpen={setAppointmentOpen}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appointmentOpen && (
          <AppointmentModal
            isOpen={appointmentOpen}
            onClose={() => setAppointmentOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
