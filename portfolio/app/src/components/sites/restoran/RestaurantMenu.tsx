'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { colors } from '@/components/sites/restoran/colors'

export interface MenuDish {
  name: string
  price: string
  desc: string
  imageUrl: string
}

export type MenuTabId = 'baslangiclar' | 'anaYemekler' | 'tatlilar'

export interface MenuTabConfig {
  id: MenuTabId
  label: string
  items: MenuDish[]
}

const menuTabs: MenuTabConfig[] = [
  {
    id: 'baslangiclar',
    label: 'Başlangıçlar',
    items: [
      {
        name: 'Burrata e Pomodori',
        price: '₺420',
        desc: 'Taze burrata, mevsim domatesleri, fesleğen yağı',
        imageUrl:
          'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80',
      },
      {
        name: 'Carpaccio di Manzo',
        price: '₺380',
        desc: 'İnce dilim dana eti, roka, parmesan, limon',
        imageUrl:
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
      },
      {
        name: 'Zuppa di Pesce',
        price: '₺340',
        desc: 'Geleneksel İtalyan deniz mahsulleri çorbası',
        imageUrl:
          'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
      },
      {
        name: 'Bruschetta Classica',
        price: '₺180',
        desc: 'Sızma zeytinyağlı ekmek, domates, sarımsak',
        imageUrl:
          'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80',
      },
    ],
  },
  {
    id: 'anaYemekler',
    label: 'Ana Yemekler',
    items: [
      {
        name: 'Osso Buco alla Milanese',
        price: '₺780',
        desc: 'Safran risotto ile servis edilen dana inciği',
        imageUrl:
          'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80',
      },
      {
        name: 'Risotto ai Funghi Porcini',
        price: '₺520',
        desc: 'Porcini mantarlı kremsi risotto, parmesan',
        imageUrl:
          'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
      },
      {
        name: 'Branzino al Forno',
        price: '₺680',
        desc: 'Fırında levrek, kapari sosu, cherry domates',
        imageUrl:
          'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
      },
      {
        name: 'Tagliatelle al Ragù',
        price: '₺460',
        desc: 'El yapımı makarna, yavaş pişirilmiş et sosu',
        imageUrl:
          'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80',
      },
    ],
  },
  {
    id: 'tatlilar',
    label: 'Tatlılar',
    items: [
      {
        name: 'Tiramisù della Casa',
        price: '₺220',
        desc: 'Ev yapımı tiramisu, kakao, mascarpone',
        imageUrl:
          'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
      },
      {
        name: 'Panna Cotta',
        price: '₺180',
        desc: 'Vanilya panna cotta, kırmızı meyveler',
        imageUrl:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
      },
      {
        name: 'Cannoli Siciliani',
        price: '₺200',
        desc: 'Ricotta dolgulu, Sicilya usulü cannoli',
        imageUrl:
          'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80',
      },
      {
        name: 'Gelato Artigianale',
        price: '₺160',
        desc: '3 top ev yapımı dondurma, mevsim meyvesi',
        imageUrl:
          'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&q=80',
      },
    ],
  },
]

function useFinePointer(): boolean {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => setFine(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return fine
}

export interface MenuDishCardProps {
  dish: MenuDish
  finePointer: boolean
}

function MenuDishCard({ dish, finePointer }: MenuDishCardProps) {
  const [hovered, setHovered] = useState(false)
  const showOverlay = finePointer && hovered

  return (
    <article
      onMouseEnter={() => finePointer && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: 320,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        background: colors.bg,
      }}
    >
      <div
        style={{
          height: '65%',
          position: 'relative',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={dish.imageUrl}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {finePointer ? (
          <motion.div
            aria-hidden={!showOverlay}
            initial={false}
            animate={{ opacity: showOverlay ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(26,18,8,0.88)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 24,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 18,
                fontStyle: 'italic',
                color: colors.white,
              }}
            >
              {dish.name}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: colors.gold,
                margin: '8px 0',
              }}
            >
              {dish.price}
            </div>
            <div
              style={{
                width: 30,
                height: 1,
                background: colors.gold,
                opacity: 0.5,
                margin: '12px 0',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {dish.desc}
            </p>
          </motion.div>
        ) : null}
      </div>

      <div
        style={{
          height: '35%',
          flexShrink: 0,
          background: '#faf7f2',
          padding: 16,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 16,
            fontStyle: 'italic',
            color: colors.dark,
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.25,
          }}
        >
          {dish.name}
        </h3>
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 13,
            color: colors.gold,
            marginTop: 4,
            fontWeight: 500,
          }}
        >
          {dish.price}
        </div>
        {!finePointer ? (
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 12,
              color: colors.goldMid,
              lineHeight: 1.55,
              margin: '8px 0 0',
            }}
          >
            {dish.desc}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export function RestaurantMenu() {
  const [activeTab, setActiveTab] = useState<MenuTabId>('baslangiclar')
  const finePointer = useFinePointer()
  const active: MenuTabConfig =
    menuTabs.find((t) => t.id === activeTab) ?? menuTabs[0]!

  return (
    <section
      id="menu"
      style={{
        background: colors.section,
        padding: '100px 80px',
        scrollMarginTop: 96,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 42,
            textAlign: 'center',
            color: colors.dark,
            margin: 0,
            fontWeight: 400,
          }}
        >
          Menümüz
        </h2>
        <div
          style={{
            width: 40,
            height: 1,
            background: colors.gold,
            margin: '16px auto 48px',
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: 48,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 48,
          }}
        >
          {menuTabs.map((tab) => {
            const isSelected = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 13,
                  letterSpacing: '1px',
                  padding: '8px 0',
                  cursor: 'pointer',
                  border: 'none',
                  borderBottom: isSelected
                    ? `2px solid ${colors.gold}`
                    : '2px solid transparent',
                  background: 'transparent',
                  color: isSelected ? colors.dark : colors.goldMid,
                  opacity: isSelected ? 1 : 0.6,
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
            }}
          >
            {active.items.map((dish) => (
              <MenuDishCard
                key={dish.name}
                dish={dish}
                finePointer={finePointer}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
