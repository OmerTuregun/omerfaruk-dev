'use client'

import { CTASection } from '@/components/portfolio/CTASection'
import { Footer } from '@/components/portfolio/Footer'
import { Hero } from '@/components/portfolio/Hero'
import { Navbar } from '@/components/portfolio/Navbar'
import { ProcessSection } from '@/components/portfolio/ProcessSection'
import { ProjectsSection } from '@/components/portfolio/ProjectsSection'
import { ReviewsSection } from '@/components/portfolio/ReviewsSection'
import { SupportSection } from '@/components/portfolio/SupportSection'
import { WhyMeSection } from '@/components/portfolio/WhyMeSection'
import { projects } from '@/lib/projects'

export default function PortfolioPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <WhyMeSection />
        <ProjectsSection projects={projects} />
        <ProcessSection />
        <SupportSection />
        <ReviewsSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  )
}
