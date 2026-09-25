'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/lib/ajans-data'

const FILTERS = ['All', 'Film', 'Brand', 'Motion', 'Digital', 'Campaign'] as const

export type WorkFilter = (typeof FILTERS)[number]

type WorksSectionProps = {
  projects: Project[]
  activeFilter: WorkFilter
  setActiveFilter: (f: WorkFilter) => void
  setSelectedProject: (p: Project) => void
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project
  onSelect: (p: Project) => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onClick={() => onSelect(project)}
      style={{
        breakInside: 'avoid',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: project.featured ? '4/3' : '1/1',
      }}
    >
      <motion.img
        src={project.thumbnail}
        alt={project.title}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 24,
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: 2,
            color: 'rgba(240,240,240,0.5)',
            margin: '0 0 8px',
            textTransform: 'uppercase',
          }}
        >
          {project.client}
        </p>
        <p style={{ fontSize: 22, fontWeight: 600, margin: '0 0 12px', color: '#f0f0f0' }}>
          {project.title}
        </p>
        <span
          style={{
            alignSelf: 'flex-start',
            fontSize: 11,
            letterSpacing: 1,
            padding: '4px 12px',
            background: project.accentColor,
            color: '#050505',
            fontWeight: 600,
          }}
        >
          {project.category}
        </span>
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(240,240,240,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f0f0f0',
            fontSize: 18,
          }}
        >
          →
        </div>
      </motion.div>
    </motion.div>
  )
}

export function WorksSection({
  projects,
  activeFilter,
  setActiveFilter,
  setSelectedProject,
}: WorksSectionProps) {
  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="works">
      <motion.div
        style={{
          padding: '120px 48px 48px',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <motion.div>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: 'rgba(240,240,240,0.4)',
              margin: '0 0 16px',
            }}
          >
            Selected Works
          </p>
          <p
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: 'rgba(240,240,240,0.06)',
              lineHeight: 1,
              margin: 0,
            }}
          >
            01
          </p>
        </motion.div>
        <p
          style={{
            marginLeft: 'auto',
            fontSize: 13,
            color: 'rgba(240,240,240,0.4)',
          }}
        >
          (12 Projects)
        </p>
      </motion.div>

      <motion.div
        style={{
          padding: '0 48px 48px',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        {FILTERS.map((filter) => {
          const active = activeFilter === filter
          return (
            <motion.button
              key={filter}
              type="button"
              layout
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '8px 20px',
                border: `1px solid ${active ? '#f0f0f0' : 'rgba(240,240,240,0.15)'}`,
                borderRadius: 2,
                fontSize: 12,
                letterSpacing: 1,
                cursor: 'pointer',
                color: active ? '#050505' : 'rgba(240,240,240,0.5)',
                background: active ? '#f0f0f0' : 'transparent',
                fontFamily: 'inherit',
              }}
            >
              {filter}
            </motion.button>
          )
        })}
      </motion.div>

      <motion.div
        style={{
          padding: '0 48px 120px',
          columnCount: 2,
          columnGap: 16,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
