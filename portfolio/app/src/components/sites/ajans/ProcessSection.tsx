'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Discovery',
    body: 'We listen before we create. Every project starts with immersive research into your category, competitors and culture.',
  },
  {
    num: '02',
    title: 'Strategy',
    body: 'Data and intuition combined. We define the creative territory, messaging hierarchy and channel plan before a single pixel moves.',
  },
  {
    num: '03',
    title: 'Creation',
    body: 'Ideas that work in the real world. Our multidisciplinary teams move fast, iterate hard and never settle for the expected.',
  },
  {
    num: '04',
    title: 'Launch',
    body: 'We ship and we measure. Post-launch tracking, optimization and reporting are built into every engagement.',
  },
] as const

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="process"
      ref={ref}
      style={{ background: '#080808', padding: '120px 48px' }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: 'rgba(240,240,240,0.4)',
          margin: '0 0 64px',
        }}
      >
        03 — How We Work
      </p>

      <div style={{ display: 'flex', gap: 0 }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              padding: '0 24px',
            }}
          >
            <p
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: 'rgba(240,240,240,0.06)',
                margin: 0,
                alignSelf: 'flex-start',
              }}
            >
              {step.num}
            </p>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginTop: 16,
                marginBottom: 12,
                color: '#f0f0f0',
                alignSelf: 'flex-start',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(240,240,240,0.5)',
                lineHeight: 1.7,
                margin: 0,
                alignSelf: 'flex-start',
              }}
            >
              {step.body}
            </p>
            {i < steps.length - 1 && (
              <motion.div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 1,
                  height: 80,
                  background: 'rgba(240,240,240,0.08)',
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
