'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { services } from '@/lib/photographer-data'

import { ServiceDetailModal, type ServiceItem } from './ServiceDetailModal'

const SERVICE_EXTRAS: Pick<ServiceItem, 'includes' | 'duration' | 'note'>[] = [
  {
    includes: [
      'Tam gün çekim (8-10 saat)',
      '350+ düzenlenmiş fotoğraf',
      'Online galeri',
      'Baskıya hazır dosyalar',
      '1 yıl arşiv',
    ],
    duration: '8-10 Saat',
    note: '3 ay önceden rezervasyon önerilir',
  },
  {
    includes: ['2 saat stüdyo/dış mekan', '80+ düzenlenmiş fotoğraf', 'Online galeri', 'Dijital dosyalar'],
    duration: '2 Saat',
    note: 'Hafta içi ve sonu müsait',
  },
  {
    includes: ['Yarım/tam gün seçeneği', 'Ürün ve mekan çekimi', 'Lisanssız kullanım hakkı', 'RAW dosyalar'],
    duration: '4-8 Saat',
    note: 'Brief gereklidir',
  },
  {
    includes: ['Konsept geliştirme', 'Ekip koordinasyonu', 'Yüksek çözünürlüklü dosyalar', 'Yayın hakları'],
    duration: 'Projeye göre',
    note: 'Teklif için iletişime geçin',
  },
]

const serviceDetails: ServiceItem[] = services.map((service, index): ServiceItem => {
  const extra = SERVICE_EXTRAS[index]
  if (!extra) {
    throw new Error('SERVICE_EXTRAS length must match services')
  }
  return { ...service, ...extra }
})

export function PhotographerServices() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
  const [ctaHover, setCtaHover] = useState(false)

  return (
    <section
      id="hizmetler"
      style={{
        background: '#fdfcfc',
        padding: '100px 60px',
        borderTop: '1px solid #e8e8e4',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 64,
          paddingBottom: 32,
          borderBottom: '1px solid #e8e8e4',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 10,
              color: '#e8b4b8',
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            03 — HİZMETLER
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontSize: 44,
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#111',
              margin: 0,
            }}
          >
            Ne sunuyorum?
          </h2>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 13,
            color: '#888',
            maxWidth: 260,
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          Her proje için özel paketler. İhtiyacınıza göre kişiselleştirilmiş çözümler.
        </p>
      </div>

      {serviceDetails.map((service, i) => (
        <div
          key={`${service.num}-${service.name}`}
          onMouseEnter={() => setHoveredService(i)}
          onMouseLeave={() => setHoveredService(null)}
          onClick={() => setSelectedService(service)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setSelectedService(service)
            }
          }}
          role="button"
          tabIndex={0}
          style={{ borderBottom: '1px solid #e8e8e4', cursor: 'pointer' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 200px 40px',
              alignItems: 'center',
              padding: '28px 0',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 11,
                color: '#bbb',
                letterSpacing: 2,
              }}
            >
              {service.num} —
            </span>
            <div
              style={{
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                fontSize: 32,
                fontWeight: 400,
                color: hoveredService === i ? '#c4848a' : '#111',
                paddingLeft: hoveredService === i ? 16 : 0,
                transition: 'padding-left 0.25s, color 0.2s',
              }}
            >
              {service.name}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: '#c4848a',
                textAlign: 'right',
              }}
            >
              {service.price}
            </div>
            <div
              style={{
                fontSize: 20,
                color: hoveredService === i ? '#e8b4b8' : '#ddd',
                transition: 'color 0.2s',
                textAlign: 'right',
              }}
            >
              ↗
            </div>
          </div>
          <div
            style={{
              maxHeight: hoveredService === i ? 80 : 0,
              transition: 'max-height 0.3s ease',
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: '#888',
                lineHeight: 1.7,
                paddingTop: hoveredService === i ? 8 : 0,
                paddingBottom: hoveredService === i ? 24 : 0,
                paddingLeft: hoveredService === i ? 16 : 0,
                margin: 0,
                borderLeft: hoveredService === i ? '2px solid #f5e8ea' : '2px solid transparent',
                transition: 'padding 0.25s, border-color 0.25s',
              }}
            >
              {service.desc}
            </p>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontSize: 24,
            fontStyle: 'italic',
            color: '#888',
            marginBottom: 20,
          }}
        >
          Paketinizi birlikte oluşturalım.
        </div>
        <button
          type="button"
          onClick={() => document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            background: ctaHover ? '#c4848a' : '#111',
            color: '#fff',
            border: 'none',
            padding: '13px 36px',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            letterSpacing: 2,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Teklif Al
        </button>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal
            key={selectedService.num}
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
