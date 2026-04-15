'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { colors } from '@/components/sites/restoran/colors'

const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function RestaurantHero() {
  const [btnHover, setBtnHover] = useState(false)
  const [socialHover, setSocialHover] = useState<'instagram' | 'facebook' | 'tripadvisor' | null>(
    null,
  )

  const scrollToReservation = () => {
    document.getElementById('rezervasyon')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        height: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.dark,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(5px); opacity: 0.2; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `repeating-linear-gradient(
            0deg, transparent, transparent 40px,
            rgba(200,169,110,0.03) 40px, rgba(200,169,110,0.03) 41px
          )`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          paddingLeft: 16,
        }}
      >
        <div style={{ width: 1, height: 48, background: 'rgba(200,169,110,0.2)' }} />
        <div
          onMouseEnter={() => setSocialHover('instagram')}
          onMouseLeave={() => setSocialHover(null)}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            fontSize: 9,
            color:
              socialHover === 'instagram'
                ? 'rgba(200,169,110,0.9)'
                : 'rgba(200,169,110,0.5)',
            letterSpacing: 2,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            transition: 'color 0.2s ease',
            userSelect: 'none',
          }}
        >
          INSTAGRAM
        </div>
        <div style={{ width: 1, height: 8, background: 'rgba(200,169,110,0.15)' }} />
        <div
          onMouseEnter={() => setSocialHover('facebook')}
          onMouseLeave={() => setSocialHover(null)}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            fontSize: 9,
            color:
              socialHover === 'facebook'
                ? 'rgba(200,169,110,0.9)'
                : 'rgba(200,169,110,0.5)',
            letterSpacing: 2,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            transition: 'color 0.2s ease',
            userSelect: 'none',
          }}
        >
          FACEBOOK
        </div>
        <div style={{ width: 1, height: 8, background: 'rgba(200,169,110,0.15)' }} />
        <div
          onMouseEnter={() => setSocialHover('tripadvisor')}
          onMouseLeave={() => setSocialHover(null)}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            fontSize: 9,
            color:
              socialHover === 'tripadvisor'
                ? 'rgba(200,169,110,0.9)'
                : 'rgba(200,169,110,0.5)',
            letterSpacing: 2,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            transition: 'color 0.2s ease',
            userSelect: 'none',
          }}
        >
          TRIPADVISOR
        </div>
        <div style={{ width: 1, height: 48, background: 'rgba(200,169,110,0.2)' }} />
      </div>

      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          paddingRight: 16,
        }}
      >
        <div style={{ width: 1, height: 48, background: 'rgba(200,169,110,0.2)' }} />
        <div
          style={{
            writingMode: 'vertical-rl',
            fontSize: 10,
            color: 'rgba(200,169,110,0.4)',
            letterSpacing: 3,
            fontFamily: 'var(--font-inter), sans-serif',
            userSelect: 'none',
          }}
        >
          KEŞFEDİN
        </div>
        <div style={{ width: 1, height: 24, background: 'rgba(200,169,110,0.15)' }} />
        <svg
          width={12}
          height={18}
          viewBox="0 0 12 18"
          aria-hidden
          style={{ animation: 'scrollBounce 1.8s ease-in-out infinite' }}
        >
          <path
            d="M6 0 L6 14 M1 9 L6 14 L11 9"
            stroke="#c8a96e"
            strokeWidth={1.2}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div style={{ width: 1, height: 48, background: 'rgba(200,169,110,0.2)' }} />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 56,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: 'rgba(200,169,110,0.4)',
            letterSpacing: 1.5,
            fontFamily: 'var(--font-inter), sans-serif',
            marginBottom: 5,
          }}
        >
          ADRES
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'rgba(200,169,110,0.6)',
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          Via della Cucina, No:12 — Beyoğlu, İstanbul
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 56,
          zIndex: 10,
          textAlign: 'right',
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: 'rgba(200,169,110,0.4)',
            letterSpacing: 1.5,
            fontFamily: 'var(--font-inter), sans-serif',
            marginBottom: 5,
          }}
        >
          REZERVASYON
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'rgba(200,169,110,0.6)',
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          +90 212 555 0 555
        </div>
      </div>

      <div style={{ position: 'absolute', top: 72, left: 20, zIndex: 10 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 20,
            height: 1,
            background: 'rgba(200,169,110,0.25)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1,
            height: 20,
            background: 'rgba(200,169,110,0.25)',
          }}
        />
      </div>
      <div style={{ position: 'absolute', top: 72, right: 20, zIndex: 10 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 20,
            height: 1,
            background: 'rgba(200,169,110,0.25)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 1,
            height: 20,
            background: 'rgba(200,169,110,0.25)',
          }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: 72, left: 20, zIndex: 10 }}>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 20,
            height: 1,
            background: 'rgba(200,169,110,0.25)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 1,
            height: 20,
            background: 'rgba(200,169,110,0.25)',
          }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: 72, right: 20, zIndex: 10 }}>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 20,
            height: 1,
            background: 'rgba(200,169,110,0.25)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 1,
            height: 20,
            background: 'rgba(200,169,110,0.25)',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 80,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              maxWidth: 560,
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: heroEase, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: colors.gold,
                letterSpacing: '4px',
                marginBottom: 28,
                marginTop: 0,
              }}
            >
              EST. 2009
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: heroEase, delay: 0.5 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 68,
                  color: colors.white,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  display: 'block',
                  marginBottom: 8,
                  lineHeight: 1.1,
                }}
              >
                L&apos;Arte della
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 68,
                  color: colors.gold,
                  fontWeight: 700,
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                Cucina Italiana
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: heroEase, delay: 0.8 }}
              style={{
                width: 72,
                height: 1,
                background: colors.gold,
                opacity: 0.6,
                margin: '28px 0',
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: heroEase, delay: 1.1 }}
            >
              <button
                type="button"
                onClick={scrollToReservation}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  border: `1px solid ${colors.gold}`,
                  color: btnHover ? colors.dark : colors.gold,
                  background: btnHover ? colors.gold : 'transparent',
                  padding: '16px 44px',
                  fontSize: 13,
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  transition: 'background 0.3s ease, color 0.3s ease',
                }}
              >
                Rezervasyon Yap
              </button>
            </motion.div>
          </div>

          <div style={{ position: 'relative', width: 220, height: 220 }}>
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              style={{ animation: 'rotateSlow 30s linear infinite', opacity: 0.35 }}
            >
              <defs>
                <path
                  id="circle-text-path"
                  d="M 110,110 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                />
              </defs>
              <text fontSize="10" fill="#c8a96e" fontFamily="sans-serif" letterSpacing="6">
                <textPath href="#circle-text-path">
                  RISTORANTE ITALIANO · BEYOĞLU · İSTANBUL · EST. 2009 ·
                </textPath>
              </text>
            </svg>

            <div
              style={{
                position: 'absolute',
                width: 160,
                height: 160,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: '1px solid rgba(200,169,110,0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 24,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: 'rgba(200,169,110,0.5)',
                  letterSpacing: 3,
                  fontFamily: 'var(--font-inter), sans-serif',
                  marginBottom: 10,
                }}
              >
                MARCELLO&apos;S
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 48,
                  color: '#c8a96e',
                  fontStyle: 'italic',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                M
              </div>
              <div
                style={{
                  width: 28,
                  height: 1,
                  background: 'rgba(200,169,110,0.3)',
                  margin: '0 auto 10px',
                }}
              />
              <div
                style={{
                  fontSize: 8,
                  color: 'rgba(200,169,110,0.4)',
                  letterSpacing: 3,
                  fontFamily: 'var(--font-inter), sans-serif',
                  marginBottom: 3,
                }}
              >
                CUCINA
              </div>
              <div
                style={{
                  fontSize: 8,
                  color: 'rgba(200,169,110,0.4)',
                  letterSpacing: 3,
                  fontFamily: 'var(--font-inter), sans-serif',
                }}
              >
                ITALIANA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
