'use client'

import { motion } from 'framer-motion'
import { transformations } from '@/lib/spor-data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function TransformationsSection() {
  return (
    <section
      id="transformations"
      style={{
        padding: '120px 48px',
        background: '#080808',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
              fontSize: 10,
              letterSpacing: '4px',
              color: '#39ff14',
              margin: '0 0 12px',
              textTransform: 'uppercase',
            }}
          >
            DÖNÜŞÜMLER
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: 0.9,
              color: '#ffffff',
              margin: 0,
            }}
          >
            GERÇEK SONUÇLAR
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {transformations.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              style={{
                background: '#111111',
                border: '1px solid #1f1f1f',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  height: 240,
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      zIndex: 2,
                      background: 'rgba(0,0,0,0.8)',
                      color: '#666666',
                      fontSize: 9,
                      letterSpacing: '2px',
                      padding: '4px 8px',
                      fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                    }}
                  >
                    ÖNCE
                  </span>
                  <img
                    src={item.beforeImage}
                    alt={`${item.name} — önce`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 2,
                      background: 'rgba(57,255,20,0.9)',
                      color: '#080808',
                      fontSize: 9,
                      letterSpacing: '2px',
                      padding: '4px 8px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                    }}
                  >
                    SONRA
                  </span>
                  <img
                    src={item.afterImage}
                    alt={`${item.name} — sonra`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: '#39ff14',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                  }}
                />
              </div>

              <div style={{ padding: 20 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#ffffff',
                      fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: '#666666',
                      fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                    }}
                  >
                    {item.program}
                  </span>
                </div>

                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(57,255,20,0.1)',
                    border: '1px solid rgba(57,255,20,0.2)',
                    color: '#39ff14',
                    fontSize: 10,
                    padding: '3px 10px',
                    marginBottom: 12,
                    fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                  }}
                >
                  {item.duration}
                </span>

                <div
                  style={{
                    display: 'flex',
                    gap: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  {item.weightLost && (
                    <span
                      style={{
                        fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                        fontSize: 24,
                        color: '#39ff14',
                        lineHeight: 1,
                      }}
                    >
                      {item.weightLost}
                    </span>
                  )}
                  {item.muscleGained && (
                    <span
                      style={{
                        fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                        fontSize: 24,
                        color: '#39ff14',
                        lineHeight: 1,
                      }}
                    >
                      {item.muscleGained}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontSize: 12,
                    color: '#666666',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    marginTop: 12,
                    marginBottom: 0,
                    borderLeft: '2px solid #1f1f1f',
                    paddingLeft: 12,
                    fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                  }}
                >
                  {item.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
