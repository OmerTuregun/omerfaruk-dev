'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { ProjectCard } from '@/components/portfolio/ProjectCard'
import type { Project } from '@/lib/projects'

export interface ProjectsSectionProps {
  projects: Project[]
}

const categories = [
  'Tümü',
  'Restoran',
  'E-ticaret',
  'SaaS',
  'Ajans',
  'Blog',
] as const

type CategoryFilter = (typeof categories)[number]

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('Tümü')

  const filtered = useMemo(() => {
    return selectedCategory === 'Tümü'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <section
      id="projeler"
      style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '120px 60px 80px',
        background: '#ffffff',
      }}
    >
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontSize: 13,
            color: '#bbb',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          PROJELER
        </div>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: '-1px',
            color: '#111',
            margin: '0 0 12px',
            whiteSpace: 'pre-line',
          }}
        >
          Farklı dünyalar,{'\n'}farklı tasarımlar.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: '#999',
            margin: 0,
          }}
        >
          Her site kendi sektörünün dilini konuşur.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 40,
        }}
      >
        {categories.map((category) => {
          const isSelected = category === selectedCategory
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              style={{
                borderRadius: 20,
                padding: '5px 16px',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'inherit',
                border: isSelected ? '1px solid #111' : '1px solid #eee',
                background: isSelected ? '#111' : '#fff',
                color: isSelected ? '#fff' : '#999',
                outline: 'none',
              }}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 28,
          alignItems: 'stretch',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
