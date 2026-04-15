'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import { colors } from '@/components/sites/restoran/colors'

export interface AboutStatProps {
  value: string
  label: string
}

function AboutStat({ value, label }: AboutStatProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 28,
          fontWeight: 700,
          color: colors.dark,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: 12,
          color: colors.goldMid,
          opacity: 0.85,
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function RestaurantAbout() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <section
      id="hakkimizda"
      style={{
        padding: '120px 80px',
        background: colors.bg,
        scrollMarginTop: 96,
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            color: colors.gold,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Hakkımızda
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 42,
            fontWeight: 400,
            color: colors.dark,
            lineHeight: 1.2,
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          Gelenekten gelen{'\n'}bir lezzet hikayesi.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 15,
            color: colors.goldMid,
            lineHeight: 1.8,
            margin: '24px 0',
          }}
        >
          2009&apos;dan bu yana İstanbul&apos;un kalbinde, nesilden nesile
          aktarılan İtalyan tariflerini modern bir dokunuşla sunuyoruz. Her
          tabak, bir hikayenin parçası.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 40,
          }}
        >
          <AboutStat value="15+" label="Yıl deneyim" />
          <AboutStat value="200+" label="Özgün tarif" />
          <AboutStat value="4.9" label="Ortalama puan" />
        </div>

        <div
          style={{
            width: '100%',
            height: 1,
            background: 'rgba(200,169,110,0.15)',
            margin: '40px 0 24px',
          }}
        />

        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 10,
              color: colors.gold,
              letterSpacing: '2px',
              marginBottom: 16,
            }}
          >
            SOSYAL MEDYA
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            {[
              {
                id: 'instagram',
                platform: 'Instagram',
                username: '@marcellos.istanbul',
                icon: (
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c8a96e"
                    strokeWidth={1.5}
                    aria-hidden
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="#c8a96e" stroke="none" />
                  </svg>
                ),
              },
              {
                id: 'facebook',
                platform: 'Facebook',
                username: "Marcello's Ristorante",
                icon: (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="#c8a96e" aria-hidden>
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                ),
              },
              {
                id: 'tripadvisor',
                platform: 'TripAdvisor',
                username: "Marcello's — #12 İstanbul",
                icon: (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#c8a96e',
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}
                  >
                    TA
                  </span>
                ),
              },
            ].map((row) => {
              const isHovered = hoveredSocial === row.id

              return (
                <div
                  key={row.id}
                  onMouseEnter={() => setHoveredSocial(row.id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    cursor: 'pointer',
                    padding: '10px 12px',
                    border: '1px solid rgba(200,169,110,0.12)',
                    borderRadius: 10,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: `1px solid ${
                        isHovered ? 'rgba(200,169,110,0.6)' : 'rgba(200,169,110,0.2)'
                      }`,
                      background: isHovered ? 'rgba(200,169,110,0.05)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: '0.2s',
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#c8a96e' }}>
                      {row.platform}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'rgba(139,105,20,0.7)',
                        marginTop: 1,
                      }}
                    >
                      {row.username}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: isHovered ? 'rgba(200,169,110,0.8)' : 'rgba(200,169,110,0.3)',
                      transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                      transition: '0.2s',
                      flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    →
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
