'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function ManifestoSection() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const leftInView = useInView(leftRef, { once: true, amount: 0.3 })
  const rightInView = useInView(rightRef, { once: true, amount: 0.3 })

  return (
    <section
      id="manifesto"
      style={{
        padding: '140px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'center',
      }}
    >
      <motion.div
        ref={leftRef}
        initial={{ opacity: 0, x: -32 }}
        animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          style={{
            width: 48,
            height: 1,
            background: '#b8a98a',
            marginBottom: 32,
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", serif',
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: '#f5f0e8',
            margin: 0,
          }}
        >
          &ldquo;Mimarlık dondurulmuş müziktir. Her proje, içinde yaşanacak hayatın
          partisyonudur.&rdquo;
        </p>
        <p
          style={{
            fontSize: 12,
            letterSpacing: 2,
            color: 'rgba(245,240,232,0.4)',
            marginTop: 24,
          }}
        >
          — Emre Aydın, Kurucu
        </p>
      </motion.div>

      <motion.div
        ref={rightRef}
        initial={{ opacity: 0, x: 32 }}
        animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <p
          style={{
            fontSize: 14,
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.8,
            margin: '0 0 24px',
          }}
        >
          Forma Mimarlık, 2004&apos;ten bu yana İstanbul merkezli olarak konut, ticari
          ve karma kullanım projelerinde tasarım mükemmelliği arıyor. Her proje, yerin
          ruhunu ve kullanıcının yaşam biçimini merkeze alır.
        </p>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          Malzemenin dürüstlüğüne, ışığın gücüne ve mekânın insan üzerindeki
          dönüştürücü etkisine inanıyoruz. Tasarım, bir çözüm değil; bir sorgulamadır.
        </p>
      </motion.div>
    </section>
  )
}
