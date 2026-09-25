'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Project as MimariProject } from '@/lib/mimari-data'

type ProjectsSectionProps = {
  projects: MimariProject[]
  setSelectedProject: (p: MimariProject) => void
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: MimariProject
  onSelect: (p: MimariProject) => void
}) {
  const [arrowHover, setArrowHover] = useState(false)

  return (
    <motion.div
      onClick={() => onSelect(project)}
      whileHover={{ cursor: 'pointer' }}
      style={{
        width: project.featured ? 560 : 380,
        height: 520,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        borderRadius: 2,
      }}
    >
      <motion.img
        src={project.heroImage}
        alt={project.title}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      {project.awards && project.awards.length > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            background: 'rgba(184,169,138,0.15)',
            border: '1px solid rgba(184,169,138,0.3)',
            padding: '6px 10px',
            fontSize: 9,
            letterSpacing: 1.5,
            color: '#b8a98a',
          }}
        >
          ★ ÖDÜLLÜ
        </span>
      )}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 32,
        }}
      >
        <span
          style={{
            border: '1px solid rgba(245,240,232,0.2)',
            padding: '4px 12px',
            fontSize: 10,
            letterSpacing: 2,
            color: 'rgba(245,240,232,0.6)',
            marginBottom: 12,
            display: 'inline-block',
          }}
        >
          {project.category}
        </span>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 26,
            fontWeight: 400,
            color: '#f5f0e8',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {project.title}
        </p>
        <p
          style={{
            fontSize: 11,
            color: 'rgba(245,240,232,0.4)',
            marginTop: 6,
            letterSpacing: 1,
          }}
        >
          {project.location} · {project.year}
        </p>
      </motion.div>
      <motion.div
        onMouseEnter={() => setArrowHover(true)}
        onMouseLeave={() => setArrowHover(false)}
        style={{
          position: 'absolute',
          bottom: 32,
          right: 32,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: `1px solid ${arrowHover ? '#b8a98a' : 'rgba(245,240,232,0.3)'}`,
          background: arrowHover ? '#b8a98a' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          color: arrowHover ? '#0a0a0a' : '#f5f0e8',
          transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
        }}
      >
        →
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection({ projects, setSelectedProject }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62%'])

  return (
    <section id="projects">
      <div
        style={{
          padding: '120px 48px 48px',
          position: 'relative',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 120,
            fontWeight: 300,
            color: 'rgba(245,240,232,0.04)',
            lineHeight: 1,
            position: 'absolute',
            top: 80,
            left: 48,
            margin: 0,
          }}
        >
          01
        </p>
        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            color: 'rgba(245,240,232,0.4)',
            position: 'relative',
            zIndex: 1,
            margin: '0 0 8px',
          }}
        >
          Seçilmiş Projeler
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f5f0e8',
            position: 'relative',
            zIndex: 1,
            margin: 0,
          }}
        >
          İşlerimiz
        </h2>
      </div>

      <div ref={containerRef} style={{ position: 'relative', height: '400vh' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <motion.div
            style={{
              x,
              display: 'flex',
              gap: 24,
              width: 'max-content',
              padding: '0 48px',
            }}
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <p
        style={{
          padding: '48px 48px 120px',
          textAlign: 'right',
          fontSize: 11,
          color: 'rgba(245,240,232,0.3)',
          letterSpacing: 2,
          margin: 0,
        }}
      >
        8 proje · 2021—2024
      </p>
    </section>
  )
}
