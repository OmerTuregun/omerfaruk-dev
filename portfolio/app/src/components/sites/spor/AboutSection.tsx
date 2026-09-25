'use client'

import { motion } from 'framer-motion'
import { certifications } from '@/lib/spor-data'

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: '120px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'center',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80"
          alt="Mert Kaya antrenman"
          style={{
            width: '70%',
            aspectRatio: '3 / 4',
            objectFit: 'cover',
            border: '2px solid #1f1f1f',
            display: 'block',
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80"
          alt="Mert Kaya gym"
          style={{
            position: 'absolute',
            bottom: -40,
            right: 0,
            width: '55%',
            aspectRatio: '1',
            objectFit: 'cover',
            border: '2px solid #1f1f1f',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: -20,
            background: '#39ff14',
            color: '#080808',
            padding: '12px 16px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
          }}
        >
          <span style={{ display: 'block' }}>NASM CERTIFIED</span>
          <span style={{ display: 'block', fontSize: 9, marginTop: 2 }}>CPT &amp; CES</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
            fontSize: 10,
            letterSpacing: 4,
            color: '#39ff14',
            marginBottom: 16,
            marginTop: 0,
          }}
        >
          BEN KİMİM
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: 0.9,
            color: '#ffffff',
            marginBottom: 24,
            marginTop: 0,
          }}
        >
          MERT KAYA
          <br />
          STRENGTH COACH
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
            fontSize: 14,
            lineHeight: 1.8,
            color: '#666666',
            marginBottom: 16,
            marginTop: 0,
          }}
        >
          İstanbul&apos;da doğdum, sporu 15 yaşında keşfettim. NASM ve CrossFit sertifikalarımla
          başladığım bu yolda 8 yıl içinde 340&apos;tan fazla kişinin hayatını dönüştürdüm.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
            fontSize: 14,
            lineHeight: 1.8,
            color: '#666666',
            marginBottom: 32,
            marginTop: 0,
          }}
        >
          Benim için fitness sadece estetik değil. Güç, dayanıklılık ve zihinsel sağlamlık —
          üçünü birden geliştiriyoruz. Her müşterime özel, bilimsel temelli program tasarlıyorum.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {certifications.map((cert) => (
            <p
              key={cert}
              style={{
                fontFamily: 'var(--font-inter-spor), Inter, sans-serif',
                fontSize: 13,
                color: '#ffffff',
                margin: 0,
              }}
            >
              <span style={{ color: '#39ff14' }}>→ </span>
              {cert}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
