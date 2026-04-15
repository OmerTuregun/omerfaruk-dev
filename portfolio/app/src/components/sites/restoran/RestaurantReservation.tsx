'use client'

import type { CSSProperties, FormEvent } from 'react'
import { useState } from 'react'

import { colors } from '@/components/sites/restoran/colors'

const mutedInputColor = 'rgba(200,169,110,0.4)'
const focusBorder = `1px solid ${colors.gold}`
const blurBorder = '1px solid rgba(200,169,110,0.3)'

export interface ReservationFormState {
  fullName: string
  date: string
  time: string
  party: string
  note: string
}

const timeOptions = [
  '12:00',
  '13:00',
  '14:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
] as const

const partyOptions = ['1-2', '3-4', '5-6', '7+'] as const

export function RestaurantReservation() {
  const [form, setForm] = useState<ReservationFormState>({
    fullName: '',
    date: '',
    time: '',
    party: '',
    note: '',
  })
  const [focusKey, setFocusKey] = useState<keyof ReservationFormState | null>(
    null
  )
  const [submitHover, setSubmitHover] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Rezervasyon gönderildi:', form)
  }

  const inputColor = (key: keyof ReservationFormState) => {
    const hasValue = form[key].length > 0
    const focused = focusKey === key
    if (focused || hasValue) return colors.white
    return mutedInputColor
  }

  const borderFor = (key: keyof ReservationFormState) =>
    focusKey === key ? focusBorder : blurBorder

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: 10,
    color: colors.gold,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 8,
  }

  const fieldShellStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <section
      id="rezervasyon"
      style={{
        background: colors.dark,
        padding: '100px 80px',
        scrollMarginTop: 96,
      }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 42,
            color: colors.white,
            margin: 0,
            fontWeight: 400,
          }}
        >
          Rezervasyon
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 14,
            color: colors.goldMid,
            marginTop: 12,
            marginBottom: 56,
          }}
        >
          Size özel bir masa için lütfen formu doldurun.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            textAlign: 'left',
          }}
        >
          <div style={{ ...fieldShellStyle, gridColumn: 'span 2' }}>
            <label htmlFor="rez-fullname" style={labelStyle}>
              İsim Soyisim
            </label>
            <input
              id="rez-fullname"
              value={form.fullName}
              onChange={(e) =>
                setForm((s) => ({ ...s, fullName: e.target.value }))
              }
              onFocus={() => setFocusKey('fullName')}
              onBlur={() => setFocusKey(null)}
              placeholder="Adınız ve soyadınız"
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: borderFor('fullName'),
                color: inputColor('fullName'),
                fontSize: 14,
                padding: '12px 0',
                width: '100%',
                outline: 'none',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            />
          </div>

          <div style={fieldShellStyle}>
            <label htmlFor="rez-date" style={labelStyle}>
              Tarih seçin
            </label>
            <input
              id="rez-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
              onFocus={() => setFocusKey('date')}
              onBlur={() => setFocusKey(null)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: borderFor('date'),
                color: inputColor('date'),
                fontSize: 14,
                padding: '12px 0',
                width: '100%',
                outline: 'none',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            />
          </div>

          <div style={fieldShellStyle}>
            <label htmlFor="rez-time" style={labelStyle}>
              Saat seçin
            </label>
            <select
              id="rez-time"
              value={form.time}
              onChange={(e) =>
                setForm((s) => ({ ...s, time: e.target.value }))
              }
              onFocus={() => setFocusKey('time')}
              onBlur={() => setFocusKey(null)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: borderFor('time'),
                color: inputColor('time'),
                fontSize: 14,
                padding: '12px 0',
                width: '100%',
                outline: 'none',
                fontFamily: 'var(--font-inter), sans-serif',
                cursor: 'pointer',
              }}
            >
              <option value="">Saat</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div style={fieldShellStyle}>
            <label htmlFor="rez-party" style={labelStyle}>
              Kişi sayısı
            </label>
            <select
              id="rez-party"
              value={form.party}
              onChange={(e) =>
                setForm((s) => ({ ...s, party: e.target.value }))
              }
              onFocus={() => setFocusKey('party')}
              onBlur={() => setFocusKey(null)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: borderFor('party'),
                color: inputColor('party'),
                fontSize: 14,
                padding: '12px 0',
                width: '100%',
                outline: 'none',
                fontFamily: 'var(--font-inter), sans-serif',
                cursor: 'pointer',
              }}
            >
              <option value="">Kişi sayısı</option>
              {partyOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div style={{ ...fieldShellStyle, gridColumn: 'span 2' }}>
            <label htmlFor="rez-note" style={labelStyle}>
              Özel notunuz
            </label>
            <textarea
              id="rez-note"
              rows={3}
              value={form.note}
              onChange={(e) => setForm((s) => ({ ...s, note: e.target.value }))}
              onFocus={() => setFocusKey('note')}
              onBlur={() => setFocusKey(null)}
              placeholder="Alerji, kutlama vb."
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: borderFor('note'),
                color: inputColor('note'),
                fontSize: 14,
                padding: '12px 0',
                width: '100%',
                outline: 'none',
                fontFamily: 'var(--font-inter), sans-serif',
                resize: 'vertical',
              }}
            />
          </div>

          <div
            style={{
              gridColumn: 'span 2',
              marginTop: 16,
              textAlign: 'center',
            }}
          >
            <button
              type="submit"
              onMouseEnter={() => setSubmitHover(true)}
              onMouseLeave={() => setSubmitHover(false)}
              style={{
                background: submitHover ? '#b8956a' : colors.gold,
                color: colors.dark,
                border: 'none',
                padding: '16px 48px',
                fontSize: 12,
                letterSpacing: '2px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
                transition: 'background 0.2s ease',
              }}
            >
              GÖNDER
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
