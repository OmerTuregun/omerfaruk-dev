'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SEO_ITEMS = [
  "Siteniz Google'da üst sıralarda görünür",
  'Doğru kitleye organik olarak ulaşırsınız',
  "Rakiplerinizin önüne geçersiniz",
  'Ekstra reklam harcaması yapmadan büyürsünüz',
] as const

const RESPONSIVE_ITEMS = [
  'Telefon kullanıcıları hiçbir şeyi kaçırmaz',
  'Dokunmatik ekranlar için özel tasarım',
  'Hızlı yüklenir, bekleme yok',
  'Her tarayıcıda aynı mükemmel görünüm',
] as const

const LIGHTHOUSE_METRICS = [
  { name: 'Performance', score: 96 },
  { name: 'Accessibility', score: 98 },
  { name: 'Best Practices', score: 100 },
  { name: 'SEO', score: 100 },
] as const

function useWideLayout(breakpoint = 900) {
  const [wide, setWide] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`)
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])
  return wide
}

export function WhyMeSection() {
  const wide = useWideLayout()
  const seoRef = useRef<HTMLDivElement>(null)
  const responsiveRef = useRef<HTMLDivElement>(null)
  const seoInView = useInView(seoRef, { once: true, amount: 0.2 })
  const responsiveInView = useInView(responsiveRef, { once: true, amount: 0.2 })

  const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section
      id="neden-ben"
      style={{
        background: '#fafafa',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
        width: '100%',
        scrollMarginTop: 96,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '100px 60px',
          background: 'transparent',
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: '#bbb',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: 48,
          }}
        >
          KALİTELİ WEB
        </div>
        <div
          ref={seoRef}
        style={{
          display: 'grid',
          gridTemplateColumns: wide ? '1fr 1fr' : '1fr',
          gap: wide ? 80 : 48,
          alignItems: 'center',
          marginBottom: 100,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={
            seoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
          }
          transition={transition}
        >
          <span
            style={{
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
              borderRadius: 20,
              padding: '4px 14px',
              fontSize: 12,
              display: 'inline-block',
              marginBottom: 20,
            }}
          >
            SEO uyumlu
          </span>
          <h3
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#111',
              margin: '0 0 16px',
            }}
          >
            Google seni bulsun.
          </h3>
          <p
            style={{
              fontSize: 15,
              color: '#666',
              lineHeight: 1.8,
              margin: '0 0 32px',
            }}
          >
            Siteniz Google&apos;da kolayca bulunabilir olsun istiyorsanız, teknik
            detaylar değil sonuçlar önemlidir. Yaptığım her sitede arama motorları
            sitenizi hızlıca fark eder, doğru kitleye ulaşırsınız ve rakiplerinizin
            önüne geçersiniz.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {SEO_ITEMS.map((text) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: '#4ade80',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 14, color: '#555' }}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={seoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={transition}
          style={{
            border: '1px solid #f0f0f0',
            borderRadius: 16,
            padding: 32,
            background: '#fafafa',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginBottom: 20,
            }}
          >
            {(['#ff5f57', '#febc2e', '#28c840'] as const).map((c) => (
              <span
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: c,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: 12,
              color: '#999',
              marginBottom: 20,
            }}
          >
            Performans Skoru
          </div>
          {LIGHTHOUSE_METRICS.map((row, i) => (
            <div
              key={row.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom:
                  i < LIGHTHOUSE_METRICS.length - 1
                    ? '1px solid #f0f0f0'
                    : 'none',
              }}
            >
              <span style={{ fontSize: 13, color: '#555' }}>{row.name}</span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  color: '#16a34a',
                }}
              >
                {row.score}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        ref={responsiveRef}
        style={{
          display: 'grid',
          gridTemplateColumns: wide ? '1fr 1fr' : '1fr',
          gap: wide ? 80 : 48,
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={
            responsiveInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
          }
          transition={transition}
          style={{
            position: 'relative',
            height: 320,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 40,
              border: '1.5px solid #e0e0e0',
              borderRadius: 8,
              background: '#fff',
              padding: 8,
            }}
          >
            <div
              style={{
                height: 20,
                background: '#f5f5f5',
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 8,
                gap: 4,
                margin: '-8px -8px 8px -8px',
                width: 'calc(100% + 16px)',
              }}
            >
              {[0, 1, 2].map((k) => (
                <span
                  key={k}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#ddd',
                  }}
                />
              ))}
            </div>
            <div
              style={{
                height: 120,
                background: '#f8f8f8',
                borderRadius: 4,
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: 6,
                padding: 8,
              }}
            >
              <div
                style={{ background: '#e8e8e8', borderRadius: 3, minHeight: 1 }}
              />
              <div>
                {[0, 1, 2].map((k) => (
                  <div
                    key={k}
                    style={{
                      height: 8,
                      background: '#e8e8e8',
                      borderRadius: 2,
                      marginBottom: 6,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 60,
              width: 140,
              border: '1.5px solid #e0e0e0',
              borderRadius: 8,
              background: '#fff',
              padding: 6,
            }}
          >
            <div
              style={{
                height: 14,
                background: '#f5f5f5',
                borderRadius: '3px 3px 0 0',
                margin: '-6px -6px 6px -6px',
                width: 'calc(100% + 12px)',
              }}
            />
            <div
              style={{
                height: 90,
                background: '#f8f8f8',
                borderRadius: 3,
                padding: 6,
              }}
            >
              {[0, 1, 2].map((k) => (
                <div
                  key={k}
                  style={{
                    background: '#e8e8e8',
                    height: 7,
                    borderRadius: 2,
                    marginBottom: k < 2 ? 6 : 0,
                  }}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 20,
              right: 0,
              width: 70,
              border: '1.5px solid #e0e0e0',
              borderRadius: 12,
              background: '#fff',
              padding: 5,
            }}
          >
            <div
              style={{
                width: 24,
                height: 4,
                background: '#e0e0e0',
                borderRadius: 2,
                margin: '0 auto 6px',
              }}
            />
            <div
              style={{
                height: 80,
                background: '#f8f8f8',
                borderRadius: 8,
                padding: 5,
              }}
            >
              {[0, 1, 2].map((k) => (
                <div
                  key={k}
                  style={{
                    background: '#e8e8e8',
                    height: 6,
                    borderRadius: 2,
                    marginBottom: k < 2 ? 6 : 0,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={
            responsiveInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }
          }
          transition={transition}
        >
          <span
            style={{
              background: '#eff6ff',
              color: '#1d4ed8',
              border: '1px solid #bfdbfe',
              borderRadius: 20,
              padding: '4px 14px',
              fontSize: 12,
              display: 'inline-block',
              marginBottom: 20,
            }}
          >
            responsive tasarım
          </span>
          <h3
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#111',
              margin: '0 0 16px',
            }}
          >
            Her ekranda mükemmel görünür.
          </h3>
          <p
            style={{
              fontSize: 15,
              color: '#666',
              lineHeight: 1.8,
              margin: '0 0 32px',
            }}
          >
            Sitenizi ziyaret eden kişilerin büyük çoğunluğu telefon kullanıyor.
            Telefondan bozuk görünen bir site, potansiyel müşteriyi kaçırır.
            Yaptığım her site telefon, tablet ve bilgisayarda kusursuz çalışır —
            hiçbir detay atlanmaz.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {RESPONSIVE_ITEMS.map((text) => (
              <div
                key={text}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: '#60a5fa',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 14, color: '#555' }}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
