'use client'

import {
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from 'react'

import { photographerInfo } from '@/lib/photographer-data'

const labelStyle = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: 10,
  color: '#bbb',
  letterSpacing: 2,
  display: 'block' as const,
  marginBottom: 10,
}

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #e8e8e4',
  color: '#111',
  fontSize: 15,
  padding: '10px 0',
  outline: 'none',
  fontFamily: 'var(--font-inter), sans-serif',
  marginBottom: 32,
}

export function PhotographerContact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [igHover, setIgHover] = useState(false)
  const [beHover, setBeHover] = useState(false)
  const [vscoHover, setVscoHover] = useState(false)
  const [submitHovered, setSubmitHovered] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  const linkBase = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: 12,
    letterSpacing: 1.5,
    cursor: 'pointer' as const,
    textDecoration: 'none' as const,
    borderBottom: '1px solid #e8e8e4',
    paddingBottom: 2,
    transition: 'color 0.2s',
  }

  return (
    <section
      id="iletisim"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderTop: '1px solid #e8e8e4',
      }}
    >
      <div
        style={{
          padding: '100px 60px',
          borderRight: '1px solid #e8e8e4',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 10,
            color: '#e8b4b8',
            letterSpacing: 3,
            marginBottom: 24,
          }}
        >
          04 — İLETİŞİM
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontSize: 52,
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#111',
            margin: 0,
            marginBottom: 48,
          }}
        >
          Birlikte güzel{' '}
          <span style={{ fontStyle: 'italic', color: '#e8b4b8' }}>şeyler</span>{' '}
          yapalım.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 10,
                color: '#bbb',
                letterSpacing: 3,
                marginBottom: 6,
              }}
            >
              KONUM
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 15,
                color: '#333',
              }}
            >
              {photographerInfo.location}
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 10,
                color: '#bbb',
                letterSpacing: 3,
                marginBottom: 6,
              }}
            >
              E-POSTA
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 15,
                color: '#333',
              }}
            >
              {photographerInfo.email}
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 10,
                color: '#bbb',
                letterSpacing: 3,
                marginBottom: 6,
              }}
            >
              TELEFON
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 15,
                color: '#333',
              }}
            >
              {photographerInfo.phone}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 10,
              color: '#bbb',
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            SOSYAL
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              onMouseEnter={() => setIgHover(true)}
              onMouseLeave={() => setIgHover(false)}
              style={{
                ...linkBase,
                color: igHover ? '#c4848a' : '#888',
              }}
            >
              Instagram
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              onMouseEnter={() => setBeHover(true)}
              onMouseLeave={() => setBeHover(false)}
              style={{
                ...linkBase,
                color: beHover ? '#c4848a' : '#888',
              }}
            >
              Behance
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              onMouseEnter={() => setVscoHover(true)}
              onMouseLeave={() => setVscoHover(false)}
              style={{
                ...linkBase,
                color: vscoHover ? '#c4848a' : '#888',
              }}
            >
              VSCO
            </a>
          </div>
        </div>
      </div>

      <div style={{ padding: '100px 60px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', paddingTop: 40 }}>
            <div
              style={{
                fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                fontSize: 32,
                fontStyle: 'italic',
                color: '#e8b4b8',
              }}
            >
              Mesajınız alındı.
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 14,
                color: '#888',
                marginTop: 12,
              }}
            >
              En kısa sürede size dönüş yapacağız.
            </div>
            <div
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 12,
                color: '#bbb',
                marginTop: 8,
              }}
            >
              Ortalama yanıt: 24 saat içinde
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label htmlFor="contact-name" style={labelStyle}>
              ADINIZ
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder=""
              required
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderBottom = '1px solid #e8b4b8'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottom = '1px solid #e8e8e4'
              }}
            />

            <label htmlFor="contact-email" style={labelStyle}>
              E-POSTA
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderBottom = '1px solid #e8b4b8'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottom = '1px solid #e8e8e4'
              }}
            />

            <label htmlFor="contact-type" style={labelStyle}>
              ÇEKİM TÜRÜ
            </label>
            <select
              id="contact-type"
              value={type}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottom = '1px solid #e8b4b8'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottom = '1px solid #e8e8e4'
              }}
            >
              <option value="">Seçin...</option>
              <option value="dugun">Düğün</option>
              <option value="portre">Portre & Aile</option>
              <option value="ticari">Ticari & Marka</option>
              <option value="editoryal">Editöryal</option>
            </select>

            <label htmlFor="contact-message" style={labelStyle}>
              MESAJINIZ
            </label>
            <textarea
              id="contact-message"
              rows={3}
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(e.target.value)
              }
              style={{
                ...inputStyle,
                resize: 'vertical',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottom = '1px solid #e8b4b8'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottom = '1px solid #e8e8e4'
              }}
            />

            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setSubmitHovered(true)}
              onMouseLeave={() => setSubmitHovered(false)}
              style={{
                background:
                  loading || !submitHovered ? '#111' : '#c4848a',
                color: '#fff',
                border: 'none',
                padding: '14px 40px',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 11,
                letterSpacing: 2,
                cursor: loading ? 'wait' : 'pointer',
                marginTop: 8,
                alignSelf: 'flex-start',
                opacity: loading ? 0.6 : 1,
                transition: 'opacity 0.2s, background 0.2s',
              }}
            >
              {loading ? 'GÖNDERİLİYOR...' : 'GÖNDER'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
