'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { team } from '@/lib/ajans-data'

export function TeamSection() {
  return (
    <section id="team" style={{ background: '#080808', padding: '120px 48px' }}>
      <p
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(240,240,240,0.4)',
          margin: '0 0 48px',
        }}
      >
        05 — The Team
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
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

function TeamCard({ member }: { member: (typeof team)[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
      }}
    >
      <motion.img
        src={member.image}
        alt={member.name}
        animate={{ filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(5,5,5,0.9) 30%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
        <p style={{ fontSize: 20, fontWeight: 600, margin: 0, color: '#f0f0f0' }}>{member.name}</p>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(240,240,240,0.5)',
            marginTop: 4,
            marginBottom: 0,
          }}
        >
          {member.title}
        </p>
        <motion.p
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: 12,
            color: 'rgba(240,240,240,0.6)',
            marginTop: 8,
            marginBottom: 0,
            maxWidth: 220,
            lineHeight: 1.5,
          }}
        >
          {member.bio}
        </motion.p>
      </div>
    </div>
  )
}
