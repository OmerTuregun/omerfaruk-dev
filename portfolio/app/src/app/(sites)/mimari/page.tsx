'use client'

import { useState } from 'react'
import { MimariNav } from '@/components/sites/mimari/MimariNav'
import { HeroSection } from '@/components/sites/mimari/HeroSection'
import { ManifestoSection } from '@/components/sites/mimari/ManifestoSection'
import { ProjectsSection } from '@/components/sites/mimari/ProjectsSection'
import { StatsSection } from '@/components/sites/mimari/StatsSection'
import { ServicesSection } from '@/components/sites/mimari/ServicesSection'
import { TeamSection } from '@/components/sites/mimari/TeamSection'
import { AwardsSection } from '@/components/sites/mimari/AwardsSection'
import { ContactSection } from '@/components/sites/mimari/ContactSection'
import { MimariFooter } from '@/components/sites/mimari/MimariFooter'
import { ProjectModal } from '@/components/sites/mimari/ProjectModal'
import { projects as mimariProjects, type Project as MimariProject } from '@/lib/mimari-data'

export default function MimariPage() {
  const [selectedProject, setSelectedProject] = useState<MimariProject | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <MimariNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <ManifestoSection />
      <ProjectsSection
        projects={mimariProjects}
        setSelectedProject={setSelectedProject}
      />
      <StatsSection />
      <ServicesSection />
      <TeamSection />
      <AwardsSection />
      <ContactSection />
      <MimariFooter />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
