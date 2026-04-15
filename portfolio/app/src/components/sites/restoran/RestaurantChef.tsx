'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const ROTATE_MS = 6500

const chefs = [
  {
    id: 'marco',
    name: 'Marco Rossi',
    role: 'Baş Şef',
    imageSrc:
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    imageAlt: 'Baş Şef Marco Rossi mutfakta',
    title: 'Her tabakta bir\nhikaye var.',
    p1: "Marco Rossi, 20 yılı aşkın mutfak deneyimini Roma'dan İstanbul'a taşıdı. Bologna'da başladığı yolculuk onu Michelin yıldızlı mutfaklara, oradan da Marcello's'a getirdi.",
    p2: 'Her sabah pazardan seçilen taze malzemeler, akşam misafirlerimizin tabağına dönüşür. Marco için yemek yapmak bir sanat — her detay, her lezzet kasıtlı ve özenli.',
    stat1: { value: '20+', label: 'Yıl deneyim' },
    stat2: { value: '3', label: 'Michelin deneyimi' },
  },
  {
    id: 'elena',
    name: 'Elena Bianchi',
    role: 'Pastane Şefi',
    imageSrc:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    imageAlt: 'Pastane Şefi Elena Bianchi',
    title: 'Tatlılar,\nbir zarafet işi.',
    p1: "Elena, Milano'da klasik İtalyan pastacılığını öğrendi; Marcello's'ta her tatlı menüye aynı titizlikle eşlik ediyor. Hamur, çikolata ve mevsim meyveleri onun tuvali.",
    p2: "Misafirlerimiz için her akşam taze pişen tatlılar ve özel günlerde sürpriz koleksiyonlar hazırlıyor. Elena'ya göre tatlı, yemeğin sessiz finali olmalı.",
    stat1: { value: '12+', label: 'Yıl pastacılık' },
    stat2: { value: '40+', label: 'Özel reçete' },
  },
  {
    id: 'luca',
    name: 'Luca Ferretti',
    role: 'Sous Şef',
    imageSrc:
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    imageAlt: 'Sous Şef Luca Ferretti',
    title: 'Ateş ve zaman,\nlezzetin sırrı.',
    p1: "Luca, deniz ürünleri ve ızgara istasyonunda uzmanlaştı. Sicilya kıyılarından öğrendiği teknikleri İstanbul'un malzemeleriyle harmanlıyor.",
    p2: 'Mutfakta Marco ile omuz omuza çalışarak her servisin aynı ritimde ilerlemesini sağlıyor. Luca için disiplin ve sezgisel dokunuş bir arada olmalı.',
    stat1: { value: '15+', label: 'Yıl mutfak' },
    stat2: { value: '2', label: 'Uzmanlık alanı' },
  },
] as const

export function RestaurantChef() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % chefs.length)
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [paused])

  const chef = chefs.at(active) ?? chefs[0]

  return (
    <section
      ref={sectionRef}
      id="sefimiz"
      style={{
        background: '#faf7f2',
        padding: '120px 80px',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 100,
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.7, ease }}
          style={{ position: 'relative', height: 560 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.55, ease }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Image
                src={chef.imageSrc}
                alt={chef.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`badge-${chef.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              style={{
                position: 'absolute',
                bottom: 32,
                left: -32,
                background: '#1a1208',
                padding: '20px 24px',
                borderRadius: 4,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 9,
                  color: '#c8a96e',
                  letterSpacing: '3px',
                  marginBottom: 6,
                }}
              >
                ŞEF
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 18,
                  color: '#ffffff',
                }}
              >
                {chef.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 11,
                  color: '#8b6914',
                  marginTop: 4,
                }}
              >
                {chef.role}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease, delay: 0 }}
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              color: '#c8a96e',
              letterSpacing: '3px',
              marginBottom: 20,
            }}
          >
            ŞEFİMİZ
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`copy-${chef.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 44,
                  fontWeight: 400,
                  color: '#1a1208',
                  lineHeight: 1.15,
                  margin: '0 0 28px',
                  whiteSpace: 'pre-line',
                }}
              >
                {chef.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 15,
                  color: '#8b6914',
                  lineHeight: 1.8,
                  margin: '0 0 20px',
                }}
              >
                {chef.p1}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 15,
                  color: '#8b6914',
                  lineHeight: 1.8,
                  margin: '0 0 40px',
                }}
              >
                {chef.p2}
              </p>
              <div style={{ display: 'flex', gap: 48 }}>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontSize: 36,
                      color: '#1a1208',
                      fontWeight: 400,
                    }}
                  >
                    {chef.stat1.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 12,
                      color: '#c8a96e',
                      letterSpacing: '1px',
                      marginTop: 4,
                    }}
                  >
                    {chef.stat1.label}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontSize: 36,
                      color: '#1a1208',
                      fontWeight: 400,
                    }}
                  >
                    {chef.stat2.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: 12,
                      color: '#c8a96e',
                      letterSpacing: '1px',
                      marginTop: 4,
                    }}
                  >
                    {chef.stat2.label}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease, delay: 0.6 }}
            style={{
              marginTop: 40,
              width: 40,
              height: 1,
              background: '#c8a96e',
              opacity: 0.5,
            }}
          />

          <div
            role="tablist"
            aria-label="Şef seçimi"
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 28,
              alignItems: 'center',
            }}
          >
            {chefs.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === active ? '#1a1208' : 'rgba(26,18,8,0.2)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
                aria-label={`${c.name} — ${c.role}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
