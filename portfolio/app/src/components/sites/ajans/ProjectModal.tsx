'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/lib/ajans-data'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 400 }}
        >
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Close modal"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClose()
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.9)',
            }}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 'min(640px, 100vw)',
              background: '#0f0f0f',
              borderLeft: '1px solid rgba(240,240,240,0.08)',
              overflowY: 'auto',
              padding: 48,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                position: 'sticky',
                top: 16,
                float: 'right',
                background: 'none',
                border: 'none',
                color: '#f0f0f0',
                fontSize: 24,
                cursor: 'pointer',
                zIndex: 1,
              }}
            >
              ×
            </button>

            <img
              src={project.thumbnail}
              alt={project.title}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                objectFit: 'cover',
                borderRadius: 4,
                marginBottom: 32,
                clear: 'both',
              }}
            />

            <p
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: 'rgba(240,240,240,0.4)',
                margin: '0 0 8px',
                textTransform: 'uppercase',
              }}
            >
              {project.client}
            </p>
            <h2 style={{ fontSize: 32, fontWeight: 600, margin: '0 0 24px', color: '#f0f0f0' }}>
              {project.title}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: '1px solid rgba(240,240,240,0.15)',
                    padding: '4px 12px',
                    fontSize: 11,
                    letterSpacing: 1,
                    color: 'rgba(240,240,240,0.7)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(240,240,240,0.08)', margin: '24px 0' }} />

            <p
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: 'rgba(240,240,240,0.4)',
                margin: '0 0 12px',
              }}
            >
              The Brief
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(240,240,240,0.7)', margin: '0 0 24px' }}>
              {project.brief}
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(240,240,240,0.08)', margin: '24px 0' }} />

            <p
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: 'rgba(240,240,240,0.4)',
                margin: '0 0 12px',
              }}
            >
              The Result
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(240,240,240,0.7)', margin: '0 0 32px' }}>
              <span style={{ fontSize: 48, color: project.accentColor, lineHeight: 0.5, marginRight: 8 }}>
                &ldquo;
              </span>
              {project.result}
            </p>

            <motion.div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: 'rgba(240,240,240,0.5)' }}>{project.year}</span>
              <span
                style={{
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
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
