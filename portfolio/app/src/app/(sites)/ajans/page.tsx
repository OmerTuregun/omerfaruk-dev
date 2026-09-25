'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AjansNav } from '@/components/sites/ajans/AjansNav'
import { HeroSection } from '@/components/sites/ajans/HeroSection'
import { TickerSection } from '@/components/sites/ajans/TickerSection'
import { WorksSection, type WorkFilter } from '@/components/sites/ajans/WorksSection'
import { ServicesSection } from '@/components/sites/ajans/ServicesSection'
import { ProcessSection } from '@/components/sites/ajans/ProcessSection'
import { ClientsSection } from '@/components/sites/ajans/ClientsSection'
import { TeamSection } from '@/components/sites/ajans/TeamSection'
import { ContactSection } from '@/components/sites/ajans/ContactSection'
import { AjansFooter } from '@/components/sites/ajans/AjansFooter'
import { ProjectModal } from '@/components/sites/ajans/ProjectModal'
import { projects as ajansProjects, type Project as AjansProject } from '@/lib/ajans-data'

export default function AjansPage() {
  const [selectedProject, setSelectedProject] = useState<AjansProject | null>(null)
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('All')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showreel, setShowreel] = useState(false)

  useEffect(() => {
    if (!showreel) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowreel(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showreel])

  useEffect(() => {
    document.body.style.overflow = showreel ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showreel])

  return (
    <>
      <AjansNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection setShowreel={setShowreel} />
      <TickerSection />
      <WorksSection
        projects={ajansProjects}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setSelectedProject={setSelectedProject}
      />
      <ServicesSection />
      <ProcessSection />
      <ClientsSection />
      <TeamSection />
      <ContactSection />
      <AjansFooter />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <AnimatePresence>
        {showreel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <button
              type="button"
              aria-label="Close showreel"
              onClick={() => setShowreel(false)}
              style={{
                position: 'absolute',
                top: 32,
                right: 32,
                background: 'none',
                border: 'none',
                color: '#f0f0f0',
                fontSize: 28,
                cursor: 'pointer',
                zIndex: 1,
              }}
            >
              ×
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                width: 'min(900px, 90vw)',
                aspectRatio: '16/9',
                background: '#111',
              }}
            >
              <iframe
                title="Void Studio Showreel"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
