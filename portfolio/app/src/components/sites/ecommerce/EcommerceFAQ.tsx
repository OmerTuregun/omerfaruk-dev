'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Kargo süresi ne kadar?',
    a: 'Siparişleriniz 2-3 iş günü içinde kargoya verilir. Standart teslimat süresi 3-5 iş günüdür. Tüm siparişlerde ücretsiz kargo uygulanır.',
  },
  {
    q: 'Ürünler gerçekten el yapımı mı?',
    a: 'Evet, tüm ürünlerimiz atölyemizde el ile şekillendirilmektedir. Her parça benzersizdir ve küçük farklılıklar el yapımı olmanın doğal bir sonucudur.',
  },
  {
    q: 'İade ve değişim yapabilir miyim?',
    a: 'Ürünü teslim aldıktan sonra 14 gün içinde iade talebinde bulunabilirsiniz. Kırık veya hasarlı ürünler için fotoğraflı bildirim yeterlidir, anında yenisini göndeririz.',
  },
  {
    q: 'Özel sipariş verebilir miyim?',
    a: 'Evet, özel boyut, renk veya kişiselleştirilmiş ürünler için bize ulaşabilirsiniz. Özel siparişler genellikle 2-3 hafta sürmektedir.',
  },
  {
    q: 'Ürünler mikrodalga ve bulaşık makinesinde kullanılabilir mi?',
    a: 'Kupalar ve kaseler mikrodalga güvenlidir. Ancak el yapımı sırların uzun ömürlü kalması için bulaşık makinesinde değil, elle yıkama önerilir.',
  },
  {
    q: 'Hediye paketi seçeneği var mı?',
    a: 'Tüm siparişler özel kraft kutu ve doku kağıdı ile gönderilir. Hediye notu eklemek isterseniz sipariş notuna yazabilirsiniz.',
  },
  {
    q: 'Stokta olmayan ürünü nasıl takip edebilirim?',
    a: "Tükenen ürün sayfasında 'Stok Gelince Haber Ver' seçeneğini kullanabilirsiniz. Ürün stoğa girdiğinde e-posta ile bilgilendirilirsiniz.",
  },
  {
    q: 'Toplu sipariş indirimi var mı?',
    a: '10 adet ve üzeri siparişlerde %15 indirim uygulanır. Kurumsal siparişler için lütfen bizimle iletişime geçin.',
  },
  {
    q: 'Ürünlerin bakımı nasıl yapılmalı?',
    a: 'Seramik ürünlerinizi nemli bez ile silin. Sert kimyasallardan kaçının. Kuru bir ortamda saklayın. Düzenli kullanım seramiğin patinasını güzelleştirir.',
  },
  {
    q: 'Uluslararası kargo yapıyor musunuz?',
    a: "Şu an yalnızca Türkiye'ye kargo yapıyoruz. Uluslararası kargo seçeneği yakında aktif olacak.",
  },
]

export function EcommerceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="sss"
      style={{
        background: '#f5f0eb',
        borderTop: '1px solid #e8e0d8',
        padding: '100px 60px',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              color: '#c4a882',
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            SIKÇA SORULAN SORULAR
          </div>
          <div
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 44,
              color: '#2c1810',
              fontWeight: 400,
            }}
          >
            Merak ettikleriniz.
          </div>
          <div
            aria-hidden
            style={{
              width: 32,
              height: 1,
              background: '#c4a882',
              opacity: 0.4,
              margin: '20px auto 0',
            }}
          />
        </div>

        {faqs.map((item, i) => (
          <div
            key={item.q}
            style={{
              borderBottom: '1px solid #e8e0d8',
            }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => (openIndex === i ? setOpenIndex(null) : setOpenIndex(i))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (openIndex === i) setOpenIndex(null)
                  else setOpenIndex(i)
                }
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 18,
                  fontWeight: 400,
                  color: openIndex === i ? '#2c1810' : '#5c3d2e',
                  transition: 'color 0.15s',
                  textAlign: 'left',
                }}
              >
                {item.q}
              </span>
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c4a882"
                strokeWidth={1.5}
                aria-hidden
                style={{
                  flexShrink: 0,
                  marginLeft: 16,
                  transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
              style={{
                maxHeight: openIndex === i ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
            >
              <div
                style={{
                  paddingBottom: 20,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: 14,
                  color: '#8c7b6e',
                  lineHeight: 1.8,
                }}
              >
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
