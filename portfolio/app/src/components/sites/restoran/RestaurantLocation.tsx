'use client'

import { useRef, useState, type CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

function scrollToReservation() {
  document.getElementById('rezervasyon')?.scrollIntoView({ behavior: 'smooth' })
}

const hours = [
  { day: 'Pazartesi – Perşembe', time: '12:00 – 22:30' },
  { day: 'Cuma – Cumartesi', time: '12:00 – 23:30' },
  { day: 'Pazar', time: '12:00 – 22:00' },
] as const

export function RestaurantLocation() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const leftInView = useInView(leftRef, { once: true, amount: 0.2 })
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 })
  const [btnHover, setBtnHover] = useState(false)
  const [mapBtnHover, setMapBtnHover] = useState(false)

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: 10,
    color: '#c8a96e',
    letterSpacing: '2px',
    marginBottom: 10,
  }

  return (
    <section
      id="konum"
      style={{
        background: '#faf7f2',
        padding: '100px 80px',
        scrollMarginTop: 96,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -30 }}
          animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              marginBottom: 40,
              alignItems: 'start',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 11,
                  color: '#c8a96e',
                  letterSpacing: '3px',
                  marginBottom: 20,
                }}
              >
                KONUM & SAATLER
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 44,
                  fontWeight: 400,
                  color: '#1a1208',
                  margin: '0 0 24px',
                }}
              >
                Bizi bulun.
              </h2>

              <div>
                <div style={labelStyle}>ADRES</div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 16,
                    color: '#1a1208',
                  }}
                >
                  Via della Cucina, No:12
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 16,
                    color: '#8b6914',
                  }}
                >
                  Beyoğlu, İstanbul 34430
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 14,
                    color: '#8b6914',
                    marginTop: 4,
                  }}
                >
                  Türkiye
                </div>
              </div>
            </div>

            <div
              style={{
                border: '1px solid rgba(200,169,110,0.2)',
                borderRadius: 8,
                padding: 24,
                background: 'rgba(200,169,110,0.04)',
              }}
            >
              <div style={{ ...labelStyle, marginBottom: 14 }}>İLETİŞİM</div>
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 16,
                  color: '#1a1208',
                  display: 'block',
                  marginBottom: 10,
                }}
              >
                +90 212 555 0 555
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 14,
                  color: '#8b6914',
                }}
              >
                rezervasyon@marcellos.com.tr
              </div>

              <button
                type="button"
                onClick={scrollToReservation}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  background: btnHover ? '#2a1f0e' : '#1a1208',
                  color: '#c8a96e',
                  border: 'none',
                  padding: '14px 32px',
                  fontSize: 12,
                  letterSpacing: '2px',
                  borderRadius: 2,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  marginTop: 20,
                  transition: 'background 0.2s ease',
                  width: '100%',
                }}
              >
                REZERVASYON
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 0 }}>
            <div style={labelStyle}>ÇALIŞMA SAATLERİ</div>
            {hours.map((row) => (
              <div
                key={row.day}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(200,169,110,0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 14,
                    color: '#8b6914',
                  }}
                >
                  {row.day}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 14,
                    color: '#1a1208',
                  }}
                >
                  {row.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 30 }}
          animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.5!2d28.97280!3d41.03720!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9bd1af4a2cb%3A0x9eda73de52e08d11!2sBeyoglu%2C%20Istanbul%2034430!5e0!3m2!1str!2str!4v1"
            width="100%"
            height="460"
            style={{
              border: 'none',
              borderRadius: '4px',
              filter: 'sepia(20%) contrast(90%) brightness(90%)',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <button
            type="button"
            onClick={() => window.open('https://maps.google.com/?q=Beyoglu+34430+Istanbul+Turkey', '_blank')}
            onMouseEnter={() => setMapBtnHover(true)}
            onMouseLeave={() => setMapBtnHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 12,
              padding: 12,
              border: '1px solid rgba(200,169,110,0.2)',
              borderRadius: 4,
              background: mapBtnHover ? 'rgba(200,169,110,0.05)' : 'transparent',
              cursor: 'pointer',
              fontSize: 12,
              color: '#c8a96e',
              letterSpacing: '1px',
              fontFamily: 'var(--font-inter), sans-serif',
              transition: 'background 0.2s ease',
              width: '100%',
            }}
          >
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c8a96e"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            GOOGLE MAPS&apos;TE AÇ
          </button>
        </motion.div>
      </div>
    </section>
  )
}
