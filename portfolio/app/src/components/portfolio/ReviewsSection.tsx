'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export interface ReviewItem {
  id: string
  quote: string
  name: string
  role: string
  initials: string
}

export interface ReviewCardProps {
  review: ReviewItem
}

function ReviewCard({ review }: ReviewCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: [0, 0, 0.2, 1] }}
      style={{
        border: '1px solid #f0f0f0',
        borderRadius: 12,
        padding: 24,
        background: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 3,
          marginBottom: 16,
        }}
        aria-label="5 üzerinden 5 yıldız"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              width: 10,
              height: 10,
              background: '#fbbf24',
              borderRadius: 2,
              display: 'block',
            }}
          />
        ))}
      </div>
      <p
        style={{
          fontSize: 13,
          color: '#555',
          lineHeight: 1.65,
          margin: '0 0 16px',
        }}
      >
        {review.quote}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: '#f0f0f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 600,
            color: '#666',
          }}
        >
          {review.initials}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>
            {review.name}
          </div>
          <div style={{ fontSize: 12, color: '#888' }}>{review.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

const reviews: ReviewItem[] = [
  {
    id: '1',
    quote:
      'Restoranımız için harika bir site yaptı. Tasarım tam istediğimiz gibiydi, rezervasyonlarımız %40 arttı.',
    name: 'Ahmet Kaya',
    role: "Marcello's Restaurant",
    initials: 'AK',
  },
  {
    id: '2',
    quote:
      "SaaS ürünümüzün dashboard'ını sıfırdan tasarladı. Hem hızlı hem çok kaliteli bir iş çıkardı.",
    name: 'Zeynep Demir',
    role: 'DataFlow CEO',
    initials: 'ZD',
  },
  {
    id: '3',
    quote:
      'E-ticaret sitemizi kurdu, Stripe entegrasyonunu da halletti. Sorunsuz ve detaylara dikkat eden biri.',
    name: 'Mert Çelik',
    role: 'Botanica Shop',
    initials: 'MÇ',
  },
]

export function ReviewsSection() {
  return (
    <section
      style={{
        background: '#fafafa',
        borderTop: '1px solid #f0f0f0',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 60px',
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            fontSize: 13,
            color: '#bbb',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          YORUMLAR
        </div>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: '-1px',
            color: '#111',
            margin: '0 0 12px',
          }}
        >
          Müşteriler ne diyor?
        </h2>
        <p style={{ fontSize: 15, color: '#999', margin: 0 }}>
          Birlikte çalıştığım kişilerin geri bildirimleri.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
