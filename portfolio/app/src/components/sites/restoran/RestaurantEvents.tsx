'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

function scrollToReservation() {
  document.getElementById('rezervasyon')?.scrollIntoView({ behavior: 'smooth' })
}

function IconBirthday() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c8a96e"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6l3-3m0 0l3 3m-3-3v10"
      />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c8a96e"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  )
}

function IconStar() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c8a96e"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  )
}

const events = [
  {
    icon: 'birthday' as const,
    title: 'Doğum Günleri',
    description:
      'Sevdiklerinizin özel gününü unutulmaz kılın. Pasta servisi, özel masa düzenlemesi ve kişisel dokunuşlarla hazırlanan bir deneyim.',
  },
  {
    icon: 'briefcase' as const,
    title: 'İş Yemekleri',
    description:
      'Müşterilerinize veya ekibinize özel, şık ve sessiz bir ortamda iş yemeği düzenleyin. Özel menü seçenekleri mevcuttur.',
  },
  {
    icon: 'star' as const,
    title: 'Özel Geceler',
    description:
      'Yıl dönümü, evlilik teklifi veya kutlama — salon süslemesinden özel menüye kadar her detayı sizin için planlıyoruz.',
  },
] as const

function EventIcon({ name }: { name: (typeof events)[number]['icon'] }) {
  if (name === 'birthday') return <IconBirthday />
  if (name === 'briefcase') return <IconBriefcase />
  return <IconStar />
}

export function RestaurantEvents() {
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, amount: 0.2 })
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.15 })
  const [phoneHover, setPhoneHover] = useState(false)

  return (
    <section
      id="etkinlikler"
      style={{
        background: '#1a1208',
        padding: '100px 80px',
        scrollMarginTop: 96,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: 64 }}
        >
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              color: '#c8a96e',
              letterSpacing: '3px',
              marginBottom: 16,
            }}
          >
            ÖZEL GÜNLER
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 48,
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              whiteSpace: 'pre-line',
            }}
          >
            Her özel an için{'\n'}buradayız.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 16,
              color: '#8b6914',
              marginTop: 16,
              lineHeight: 1.7,
              marginBottom: 0,
              maxWidth: 640,
            }}
          >
            Doğum günü, yıl dönümü, iş yemeği veya özel bir kutlama — Marcello&apos;s
            sizin için hazır.
          </p>
        </motion.div>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'rgba(200,169,110,0.1)',
          }}
        >
          {events.map((ev, index) => (
            <motion.article
              key={ev.title}
              initial={{ opacity: 0, y: 30 }}
              animate={
                cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{
                duration: 0.55,
                delay: index * 0.15,
                ease,
              }}
              style={{
                background: '#1a1208',
                padding: '48px 40px',
                border: 'none',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '1px solid rgba(200,169,110,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <EventIcon name={ev.icon} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 22,
                  color: '#ffffff',
                  margin: '0 0 12px',
                  fontWeight: 400,
                }}
              >
                {ev.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 14,
                  color: '#8b6914',
                  lineHeight: 1.7,
                  margin: '0 0 28px',
                }}
              >
                {ev.description}
              </p>
              <button
                type="button"
                onClick={scrollToReservation}
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 12,
                  color: '#c8a96e',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                Rezervasyon →
              </button>
            </motion.article>
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24,
            padding: '40px 48px',
            border: '1px solid rgba(200,169,110,0.2)',
            borderRadius: 4,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 24,
                fontStyle: 'italic',
                color: '#ffffff',
              }}
            >
              Özel etkinlik mi planlıyorsunuz?
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 14,
                color: '#8b6914',
                marginTop: 8,
              }}
            >
              Detaylar için bizi arayın, birlikte planlayalım.
            </div>
          </div>
          <button
            type="button"
            onMouseEnter={() => setPhoneHover(true)}
            onMouseLeave={() => setPhoneHover(false)}
            style={{
              border: '1px solid rgba(200,169,110,0.4)',
              color: '#c8a96e',
              background: phoneHover ? 'rgba(200,169,110,0.1)' : 'transparent',
              padding: '14px 32px',
              fontSize: 13,
              letterSpacing: '1px',
              borderRadius: 2,
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
              transition: 'background 0.2s ease',
            }}
          >
            +90 212 555 0 555
          </button>
        </div>
      </div>
    </section>
  )
}
