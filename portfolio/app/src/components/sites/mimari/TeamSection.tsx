'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { team } from '@/lib/mimari-data'

function TeamCard({
  member,
}: {
  member: (typeof team)[number]
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
        cursor: 'pointer',
      }}
    >
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
          transition: 'filter 0.8s ease',
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 24,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 20,
            fontWeight: 400,
            color: '#f5f0e8',
            margin: 0,
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontSize: 11,
            color: 'rgba(245,240,232,0.5)',
            letterSpacing: 1,
            marginTop: 4,
          }}
        >
          {member.title}
        </p>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: '#b8a98a',
                  marginTop: 8,
                  letterSpacing: 0.5,
                }}
              >
                {member.education}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: 'rgba(245,240,232,0.6)',
                  marginTop: 6,
                  lineHeight: 1.5,
                }}
              >
                {member.bio}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function TeamSection() {
  return (
    <section
      id="team"
      style={{
        background: '#0f0d0a',
        padding: '120px 48px',
      }}
    >
      <motion.div style={{ position: 'relative', marginBottom: 64 }}>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 120,
            fontWeight: 300,
            color: 'rgba(245,240,232,0.04)',
            lineHeight: 1,
            position: 'absolute',
            top: -40,
            left: 0,
            margin: 0,
          }}
        >
          03
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
          Ekip
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
          Ekibimiz
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
        }}
      >
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  )
}
