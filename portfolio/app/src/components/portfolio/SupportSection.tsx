'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const CARDS = [
  {
    icon: '🔒',
    iconBg: '#f0fdf4',
    title: 'SSL Sertifikası',
    hoverDesc:
      'Siteniz şifreli bağlantıyla çalışır. Ziyaretçileriniz güvende, Google da sizi ödüllendirir.',
  },
  {
    icon: '🌐',
    iconBg: '#eff6ff',
    title: 'İlk Yıl Ücretsiz Domain',
    hoverDesc:
      'Alan adı seçimi ve kaydı bizden. İlk yıl için herhangi bir ek ücret ödemezsiniz.',
  },
  {
    icon: '⚡',
    iconBg: '#fefce8',
    title: 'Hızlı Hosting Kurulumu',
    hoverDesc:
      'Siteniz hızlı ve güvenilir sunucularda çalışır. Kurulum ve yapılandırma tamamen bize aittir.',
  },
  {
    icon: '🛠',
    iconBg: '#fff7ed',
    title: '4 Ay Ücretsiz Teknik Destek',
    hoverDesc:
      'Yayına alındıktan sonra 4 ay boyunca her sorunuzda yanınızdayım. Ek ücret yok.',
  },
  {
    icon: '📱',
    iconBg: '#fdf4ff',
    title: 'Mobil Uyumluluk Garantisi',
    hoverDesc:
      'Telefon, tablet, bilgisayar — siteniz her cihazda kusursuz çalışır, garanti.',
  },
  {
    icon: '📊',
    iconBg: '#f0fdf4',
    title: 'Google Analytics Kurulumu',
    hoverDesc:
      'Sitenizi kaç kişinin ziyaret ettiğini, nereden geldiğini anlık olarak takip edebilirsiniz.',
  },
] as const

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const fn = () => setCoarse(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return coarse
}

function SupportHoverCard({
  card,
  index,
  gridInView,
  coarse,
  hoveredId,
  setHoveredId,
}: {
  card: (typeof CARDS)[number]
  index: number
  gridInView: boolean
  coarse: boolean
  hoveredId: number | null
  setHoveredId: (id: number | null) => void
}) {
  const iconBox = (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        background: card.iconBg,
      }}
    >
      {card.icon}
    </div>
  )

  const titleEl = (
    <div
      style={{
        fontSize: 16,
        fontWeight: 500,
        color: '#111',
        marginTop: 16,
      }}
    >
      {card.title}
    </div>
  )

  if (coarse) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid #f0f0f0',
          borderRadius: 16,
          padding: 32,
          background: '#fff',
          cursor: 'default',
          minHeight: 160,
        }}
      >
        {iconBox}
        {titleEl}
        <div
          style={{
            fontSize: 13,
            color: 'rgba(0,0,0,0.55)',
            lineHeight: 1.65,
            marginTop: 12,
          }}
        >
          {card.hoverDesc}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHoveredId(index)}
      onMouseLeave={() => setHoveredId(null)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
        borderRadius: 16,
        padding: 32,
        background: '#fff',
        cursor: 'default',
        height: 160,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        {iconBox}
        {titleEl}
      </div>
      <div
        style={{
          opacity: hoveredId === index ? 1 : 0,
          transform:
            hoveredId === index ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          position: 'absolute',
          inset: 0,
          background: '#111',
          borderRadius: '16px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: '#ffffff',
            marginBottom: '10px',
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.65,
          }}
        >
          {card.hoverDesc}
        </div>
      </div>
    </motion.div>
  )
}

export function SupportSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 })
  const bannerInView = useInView(bannerRef, { once: true, amount: 0.2 })
  const coarse = useCoarsePointer()

  return (
    <section
      id="destek"
      style={{
        padding: '100px 60px',
        maxWidth: 1200,
        margin: '0 auto',
        scrollMarginTop: 96,
        background: '#ffffff',
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: '#bbb',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        DESTEK
      </div>
      <h2
        style={{
          fontSize: 42,
          fontWeight: 500,
          letterSpacing: '-1px',
          color: '#111',
          lineHeight: 1.2,
          margin: '0 0 16px',
          whiteSpace: 'pre-line',
        }}
      >
        Proje bitmez,{'\n'}destek devam eder.
      </h2>
      <p
        style={{
          fontSize: 16,
          color: '#999',
          margin: '0 0 72px',
          lineHeight: 1.5,
        }}
      >
        Her projede standart olarak sunduğum paket.
      </p>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 60,
        }}
      >
        {CARDS.map((card, i) => (
          <SupportHoverCard
            key={card.title}
            card={card}
            index={i}
            gridInView={gridInView}
            coarse={coarse}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>

      <motion.div
        ref={bannerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={
          bannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          marginTop: 0,
          background: '#111',
          borderRadius: 16,
          padding: '48px 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#fff',
              letterSpacing: '-0.5px',
            }}
          >
            Hazır mısın?
          </div>
          <div
            style={{
              fontSize: 15,
              color: '#666',
              marginTop: 8,
            }}
          >
            Ücretsiz bir görüşme ile başlayalım.
          </div>
        </div>
        <button
          type="button"
          onClick={() => scrollToId('iletisim')}
          style={{
            background: '#fff',
            color: '#111',
            border: 'none',
            borderRadius: 8,
            padding: '14px 28px',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          görüşme ayarla
        </button>
      </motion.div>
    </section>
  )
}
