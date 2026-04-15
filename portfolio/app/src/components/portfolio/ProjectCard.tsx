'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'

export interface ProjectCardProps {
  project: Project
}

interface ScrollVars extends CSSProperties {
  ['--scroll-offset']?: string
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollOffset, setScrollOffset] = useState('0px')

  const scrollVars: ScrollVars = {
    '--scroll-offset': scrollOffset,
  }

  const computeScrollOffset = () => {
    if (imgRef.current && containerRef.current) {
      const imgHeight = imgRef.current.scrollHeight
      const containerHeight = containerRef.current.clientHeight
      const offset = -(imgHeight - containerHeight)
      setScrollOffset(`${offset}px`)
    }
  }

  useEffect(() => {
    computeScrollOffset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01, borderColor: '#ddd' }}
      transition={{ duration: 0.2 }}
      style={{
        border: '1px solid #f0f0f0',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => {
        window.open(`http://${project.subdomain}.localhost`, '_blank')
      }}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          window.open(`http://${project.subdomain}.localhost`, '_blank')
        }
      }}
      aria-label={`${project.title} sitesini aç`}
    >
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          height: 280,
          background: project.color,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {project.available === false || imgError ? (
          <MiniMockup category={project.category} />
        ) : (
          <div
            ref={imgRef}
            style={{
              ...scrollVars,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              transform: isHovered ? 'translateY(var(--scroll-offset))' : 'translateY(0)',
              transition: isHovered ? 'transform 10s linear' : 'transform 1.2s ease',
              zIndex: 1,
            }}
          >
            <img
              src={`/previews/${project.id}.png`}
              alt={project.title}
              onError={() => setImgError(true)}
              onLoad={computeScrollOffset}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <div
            style={{
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: 20,
              padding: '10px 22px',
              fontSize: 14,
              background: 'transparent',
            }}
          >
            siteyi gez →
          </div>
        </motion.div>
      </div>

      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: '#111' }}>
          {project.title}
        </div>
        <div
          style={{
            fontSize: 15,
            color: '#777',
            lineHeight: 1.55,
            margin: '8px 0 14px',
            flex: 1,
          }}
        >
          {project.description}
        </div>
      </div>
    </motion.article>
  )
}

export interface MiniMockupProps {
  category: Project['category']
}

function MiniMockup({ category }: MiniMockupProps) {
  if (category === 'Restoran') {
    return (
      <div style={{ padding: 28 }}>
        <div
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: '#6b4226',
            letterSpacing: 2,
            marginBottom: 10,
          }}
        >
          MARCELLO&apos;S
        </div>
        <div style={{ display: 'grid', gap: 7, marginBottom: 14 }}>
          <div style={{ height: 2, background: '#c8a06a', opacity: 0.5 }} />
          <div style={{ height: 2, background: '#c8a06a', opacity: 0.5 }} />
          <div style={{ height: 2, background: '#c8a06a', opacity: 0.5 }} />
        </div>
        <div
          style={{
            height: 72,
            background: 'rgba(180,120,70,0.2)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: '#8b5a30',
              textAlign: 'center',
              letterSpacing: 1,
            }}
          >
            MENÜ · REZERVASYON
          </div>
        </div>
      </div>
    )
  }

  if (category === 'SaaS') {
    return (
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            aria-hidden
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#378ADD',
            }}
          />
          <div style={{ fontSize: 13, color: '#185FA5', fontWeight: 500 }}>
            DataFlow
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <StatBox value="12.4k" label="users" />
          <StatBox value="98%" label="uptime" />
          <StatBox value="$4.2k" label="MRR" />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 4,
            height: 56,
            marginTop: 16,
          }}
        >
          {[40, 65, 50, 80, 60, 90, 75].map((h, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: `${h}%`,
                background: 'rgba(55,138,221,0.35)',
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (category === 'E-ticaret') {
    const items = [
      { name: 'Monstera', price: '₺299' },
      { name: 'Fiddle Leaf', price: '₺449' },
      { name: 'Pothos', price: '₺199' },
      { name: 'Ficus', price: '₺349' },
    ] as const

    return (
      <div style={{ padding: 18 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: '#2d5a2d',
            letterSpacing: 1,
            marginBottom: 10,
          }}
        >
          BOTANICA SHOP
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 8,
          }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              style={{
                background: 'rgba(99,153,34,0.12)',
                borderRadius: 6,
                padding: 10,
              }}
            >
              <div
                style={{
                  height: 36,
                  background: 'rgba(99,153,34,0.2)',
                  borderRadius: 4,
                  marginBottom: 6,
                }}
              />
              <div style={{ fontSize: 10, color: '#3B6D11', fontWeight: 500 }}>
                {item.name}
              </div>
              <div style={{ fontSize: 11, color: '#639922' }}>{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        color: '#999',
      }}
    >
      {category}
    </div>
  )
}

export interface StatBoxProps {
  value: string
  label: string
}

function StatBox({ value, label }: StatBoxProps) {
  return (
    <div
      style={{
        flex: 1,
        background: 'rgba(55,138,221,0.12)',
        borderRadius: 6,
        padding: 8,
      }}
    >
      <div style={{ fontSize: 14, color: '#185FA5', fontWeight: 500 }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: '#378ADD' }}>{label}</div>
    </div>
  )
}

