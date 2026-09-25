'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export type ServiceItem = {
  num: string
  name: string
  price: string
  desc: string
  includes: string[]
  duration: string
  note: string
}

interface ServiceDetailModalProps {
  service: ServiceItem | null
  onClose: () => void
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  useEffect(() => {
    document.body.style.overflow = service ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [service])

  if (!service) return null

  const handleReserve = () => {
    onClose()
    setTimeout(() => {
      document.getElementById('iletisim')?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
        background: 'rgba(250,250,248,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`service-modal-${service.num}`}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 560,
          background: '#fff',
          borderRadius: 4,
          border: '1px solid #e8e8e4',
          padding: 56,
          zIndex: 301,
          boxSizing: 'border-box',
        }}
      >
        <button
          type="button"
          aria-label="Kapat"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 24,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 18,
            color: '#bbb',
            padding: 4,
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#e8b4b8'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#bbb'
          }}
        >
          ✕
        </button>

        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            color: '#e8b4b8',
            letterSpacing: 3,
            marginBottom: 12,
          }}
        >
          {service.num}
        </div>
        <h2
          id={`service-modal-${service.num}`}
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 36,
            fontWeight: 400,
            color: '#111',
            margin: 0,
          }}
        >
          {service.name}
        </h2>
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 18,
            color: '#c4848a',
            fontWeight: 500,
            marginTop: 8,
            marginBottom: 28,
          }}
        >
          {service.price}
        </div>
        <div style={{ width: 40, height: 1, background: '#e8b4b8', marginBottom: 28 }} />
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 15,
            color: '#666',
            lineHeight: 1.8,
            margin: '0 0 32px',
          }}
        >
          {service.desc}
        </p>
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 10,
            color: '#bbb',
            letterSpacing: 3,
            marginBottom: 16,
          }}
        >
          PAKETE DAHİL
        </div>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {service.includes.map((item) => (
            <li
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 14,
                color: '#555',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#f5e8ea',
                  border: '1px solid #e8b4b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    background: '#c4848a',
                    borderRadius: 1,
                    transform: 'rotate(45deg)',
                  }}
                />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginTop: 28,
          }}
        >
          <div
            style={{
              background: '#fdfcfc',
              border: '1px solid #f5e8ea',
              borderRadius: 2,
              padding: 16,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 9,
                color: '#e8b4b8',
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              SÜRE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: '#555',
              }}
            >
              {service.duration}
            </div>
          </div>
          <div
            style={{
              background: '#fdfcfc',
              border: '1px solid #f5e8ea',
              borderRadius: 2,
              padding: 16,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 9,
                color: '#e8b4b8',
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              NOT
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 13,
                color: '#555',
              }}
            >
              {service.note}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleReserve}
          style={{
            width: '100%',
            marginTop: 32,
            padding: 14,
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: 2,
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 11,
            letterSpacing: 2,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#c4848a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#111'
          }}
        >
          Rezervasyon Yap
        </button>
      </motion.div>
    </motion.div>
  )
}
