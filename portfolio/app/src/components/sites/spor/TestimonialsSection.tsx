'use client'

import { motion } from 'framer-motion'
import { testimonials } from '@/lib/spor-data'

const TICKER_SEGMENT = '★ MERT KAYA PERFORMANCE · '
const TICKER_TEXT = TICKER_SEGMENT.repeat(4)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      style={{
        color: '#39ff14',
        fontSize: 14,
        marginBottom: 12,
        letterSpacing: 2,
      }}
    >
      {'★'.repeat(rating)}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section
      style={{
        background: '#111111',
        padding: '100px 48px',
      }}
    >
      <style>{`
        @keyframes spor-testimonial-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div
        style={{
          background: '#080808',
          overflow: 'hidden',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          margin: '-100px -48px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: 'spor-testimonial-ticker 15s linear infinite',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: 14,
              letterSpacing: '3px',
              color: '#39ff14',
            }}
          >
            {TICKER_TEXT}
            {TICKER_TEXT}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            marginTop: 48,
          }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              variants={cardVariants}
              style={{
                background: '#080808',
                border: '1px solid #1f1f1f',
                padding: '28px 24px',
              }}
            >
              <StarRating rating={item.rating} />

              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                    fontSize: 48,
                    color: 'rgba(57,255,20,0.2)',
                    lineHeight: 0.5,
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#ffffff',
                    fontStyle: 'italic',
                    margin: '0 0 20px',
                    fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                  }}
                >
                  {item.text}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#ffffff',
                    fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    background: 'rgba(57,255,20,0.1)',
                    color: '#39ff14',
                    fontSize: 10,
                    padding: '3px 10px',
                    letterSpacing: '1px',
                    fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                  }}
                >
                  {item.program}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
