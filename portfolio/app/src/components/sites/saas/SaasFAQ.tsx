'use client'

import { useState } from 'react'

const colors = {
  primary: '#4f46e5',
  dark: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  surface: '#f8fafc',
} as const

const faqs = [
  {
    q: 'Kredi kartı olmadan deneyebilir miyim?',
    a: 'Evet, 14 günlük ücretsiz deneme için kredi kartı bilgisi gerekmez. Deneme süreniz dolduğunda ödeme bilgilerinizi girmeniz istenecektir.',
  },
  {
    q: 'Deneme süresi bittikten sonra ne olur?',
    a: 'Deneme süreniz bittiğinde hesabınız otomatik olarak askıya alınır. Verileriniz 30 gün boyunca saklanır. Bu süre içinde ödeme yaparsanız tüm verilerinize erişmeye devam edersiniz.',
  },
  {
    q: 'İstediğim zaman iptal edebilir miyim?',
    a: 'Evet, istediğiniz zaman iptal edebilirsiniz. İptal işlemi anında gerçekleşir ve bir sonraki fatura döneminde ücretlendirilmezsiniz. Mevcut dönem sonuna kadar kullanmaya devam edebilirsiniz.',
  },
  {
    q: 'Planımı yükseltmek veya düşürmek mümkün mü?',
    a: 'Evet, plan değişikliği istediğiniz zaman yapılabilir. Yükseltme anında aktif olur, düşürme ise bir sonraki fatura döneminde geçerli olur. Fark tutarlar orantılı olarak hesaplanır.',
  },
  {
    q: 'Verilerim güvende mi?',
    a: 'Tüm verileriniz AES-256 şifreleme ile korunur. Sunucularımız ISO 27001 sertifikalıdır. Verileriniz hiçbir şekilde üçüncü taraflarla paylaşılmaz.',
  },
  {
    q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    a: 'Visa, Mastercard, American Express kredi/banka kartları ve havale ile ödeme yapabilirsiniz. Kurumsal müşteriler için fatura ile ödeme seçeneği de mevcuttur.',
  },
  {
    q: 'Mevcut araçlarımı entegre edebilir miyim?',
    a: "Stripe, Shopify, Google Analytics, HubSpot dahil 50'den fazla popüler araçla entegrasyon destekliyoruz. Listede olmayan bir araç için özel entegrasyon talebinde bulunabilirsiniz.",
  },
  {
    q: 'Teknik destek nasıl çalışıyor?',
    a: 'Starter planda e-posta desteği, Pro planda öncelikli destek (4 saat yanıt süresi), Enterprise planda 7/24 telefon ve özel hesap yöneticisi desteği sunulmaktadır.',
  },
  {
    q: 'Kaç kullanıcı ekleyebilirim?',
    a: 'Starter planda 5, Pro planda 25 kullanıcı ekleyebilirsiniz. Enterprise planda kullanıcı sayısı sınırsızdır. Her kullanıcı için farklı yetki seviyeleri tanımlayabilirsiniz.',
  },
  {
    q: 'API erişimi var mı?',
    a: "Pro ve Enterprise planlarda tam REST API erişimi mevcuttur. API dokümantasyonu, SDK'lar ve webhook desteği ile kendi uygulamalarınıza entegre edebilirsiniz.",
  },
] as const

export function SaasFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="sss"
      style={{
        background: colors.surface,
        borderTop: `1px solid ${colors.border}`,
        padding: '100px 60px',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span
            style={{
              background: '#eff6ff',
              color: colors.primary,
              border: '1px solid #c7d2fe',
              borderRadius: 20,
              padding: '4px 14px',
              fontSize: 12,
              display: 'inline-block',
              marginBottom: 16,
            }}
          >
            SSS
          </span>
          <h2
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: colors.dark,
              letterSpacing: '-1px',
              margin: 0,
            }}
          >
            Sıkça sorulan sorular.
          </h2>
          <div style={{ fontSize: 17, color: colors.muted, marginTop: 16 }}>
            Aklınızdaki soruların cevabı burada.
          </div>
        </div>

        <div>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i

            return (
              <div key={item.q} style={{ marginBottom: 0, borderBottom: `1px solid ${colors.border}` }}>
                <div
                  onClick={() => setOpenIndex((v) => (v === i ? null : i))}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 0',
                    cursor: 'pointer',
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setOpenIndex((v) => (v === i ? null : i))
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: isOpen ? colors.primary : colors.dark,
                      transition: 'color 0.15s ease',
                      paddingRight: 16,
                    }}
                  >
                    {item.q}
                  </div>
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    aria-hidden
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div
                  style={{
                    maxHeight: isOpen ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      paddingBottom: 20,
                      fontSize: 15,
                      color: colors.muted,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

