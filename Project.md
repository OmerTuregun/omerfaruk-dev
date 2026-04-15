# Portfolio Projesi — Geliştirici Dokümantasyonu

## Proje Özeti

Bu proje, bir freelance web geliştiricisinin kendi işlerini sergileyebileceği kapsamlı bir portfolyo platformudur. Tek bir Next.js uygulaması içinde hem ana portfolyo sitesi hem de birbirinden görsel ve işlevsel olarak tamamen farklı alt siteler barındırılır. Her alt site, gerçek bir müşteriye teslim edilebilecek kalitede, kendi tasarım dili ve kullanıcı deneyimiyle bağımsız bir web ürünüdür.

---

## Amaç ve Vizyon

### Neden Bu Proje?

Freelance iş almak için sadece bir CV yeterli değil — potansiyel müşterilerin "işte tam olarak böyle bir site istiyorum" diyebileceği, canlı ve gezinebilir örnekler görmesi gerekiyor. Bu portfolyo tam bunu sağlar: farklı sektörlerden, farklı tasarım dillerinden, farklı kullanım amaçlarından web siteleri bir arada sergilenir.

### Ne Göstermek İstiyoruz?

- Tek bir teknoloji stack'iyle (Next.js) birbirinden çok farklı görsel çıktılar üretilebileceğini
- Her sektörün kendine özgü UX ihtiyaçlarını anlayıp karşılayabildiğimizi
- Animasyon, etkileşim ve detay konusundaki ustalığımızı
- Kod kalitesi ve mimari kararlar konusundaki olgunluğumuzu

---

## Teknik Mimari

### Tek Uygulama, Çoklu Site

Tüm siteler tek bir Next.js 14 (App Router) uygulaması içinde yaşar. Birden fazla deployment veya repo yoktur. Subdomain routing, Next.js `middleware.ts` dosyası aracılığıyla yapılır.

```
localhost                  → Ana portfolyo sayfası
restoran.localhost         → Restoran alt sitesi
saas.localhost             → SaaS dashboard alt sitesi
ecommerce.localhost        → E-ticaret alt sitesi
ajans.localhost            → Ajans/kreatif alt sitesi
blog.localhost             → Kişisel blog alt sitesi
```

Production ortamında bu yapı aşağıdaki gibi olur:

```
omerfaruk.dev              → Ana portfolyo sayfası
restoran.omerfaruk.dev     → Restoran alt sitesi
saas.omerfaruk.dev         → SaaS dashboard alt sitesi
```

### Middleware Routing Mantığı

`middleware.ts` her gelen isteğin `host` header'ını okur:

1. `host: localhost` → portfolyo sayfasına devam et
2. `host: restoran.localhost` → isteği `/sites/restoran` path'ine rewrite et
3. `host: saas.localhost` → isteği `/sites/saas` path'ine rewrite et

Bu sayede kullanıcı URL'de `restoran.localhost` görürken Next.js arka planda `/sites/restoran/page.tsx` dosyasını render eder.

### Altyapı Stack'i

| Katman | Teknoloji | Açıklama |
|---|---|---|
| Framework | Next.js 14 (App Router) | Tüm siteler burada |
| Styling | Tailwind CSS | Utility-first, hızlı geliştirme |
| Animasyon | Framer Motion | Smooth UI geçişleri ve sayfa animasyonları |
| İleri Animasyon | GSAP (gerekirse) | Karmaşık scroll ve timeline animasyonları |
| Container | Docker + Docker Compose | Geliştirme ortamı yönetimi |
| Proxy | Nginx | Subdomain yönlendirme, reverse proxy |
| Deploy | Vercel (production) | Subdomain yapısı Vercel'de de çalışır |

---

## Klasör Yapısı

```
portfolio/
├── docker-compose.yml          # Servis tanımları
├── .env.local                  # Ortam değişkenleri
├── nginx/
│   └── nginx.conf              # Subdomain routing kuralları
└── app/                        # Next.js uygulaması
    ├── Dockerfile
    ├── package.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── middleware.ts            # ★ Subdomain routing mantığı burada
    └── src/
        ├── app/
        │   ├── (portfolio)/    # Ana portfolyo sitesi route grubu
        │   │   ├── layout.tsx
        │   │   └── page.tsx
        │   └── (sites)/        # Alt siteler route grubu
        │       ├── restoran/
        │       │   ├── layout.tsx
        │       │   └── page.tsx
        │       ├── saas/
        │       ├── ecommerce/
        │       ├── ajans/
        │       └── blog/
        ├── components/
        │   ├── portfolio/      # Sadece ana siteye ait component'lar
        │   │   ├── Navbar.tsx
        │   │   ├── Hero.tsx
        │   │   ├── ProjectCard.tsx
        │   │   └── FilterBar.tsx
        │   └── sites/          # Alt sitelere ait component'lar
        │       ├── restoran/
        │       ├── saas/
        │       └── ecommerce/
        ├── lib/
        │   └── projects.ts     # Proje veritabanı (statik data)
        └── styles/
            └── globals.css
```

### Route Grupları Neden Parantezli?

`(portfolio)` ve `(sites)` klasörleri Next.js App Router'ın "route group" özelliğini kullanır. Parantezli klasörler URL'e yansımaz — sadece dosyaları organize etmek ve her grup için ayrı `layout.tsx` tanımlamak için kullanılır. Bu sayede ana site ve alt siteler birbirinden tamamen bağımsız layout'lara sahip olur.

---

## Docker Yapısı

### Servisler

**nginx**
- Port 80 üzerinden tüm istekleri karşılar
- `*.localhost` ve `localhost` subdomain'lerini next-app servisine yönlendirir
- `Host` header'ını koruyarak iletir (middleware'in subdomain'i okuyabilmesi için kritik)

**next-app**
- Port 3000, sadece nginx üzerinden erişilir
- Development modunda çalışır, hot reload açık
- `WATCHPACK_POLLING=true` ile Docker volume içinde dosya değişikliklerini algılar

### Kullanılan Portlar

Bu projede yalnızca aşağıdaki portlar kullanılır:

- `:80` → nginx
- `:3000` → next-app (sadece container içi)

Sistemde halihazırda kullanımda olan ve **kesinlikle çakışılmaması gereken** portlar:

```
1433, 3001, 3003, 3014, 3016, 3018, 3022,
5000, 5001, 5051, 5173, 6380, 8000, 8001,
8081, 8086, 11434
```

---

## Proje Veri Modeli

Her alt site, `src/lib/projects.ts` dosyasında tanımlıdır:

```typescript
type Project = {
  id: string           // "restoran"
  title: string        // "Restoran Sitesi"
  description: string  // Kısa açıklama
  subdomain: string    // "restoran" → restoran.localhost
  category: string     // Filtre kategorisi
  tags: string[]       // Teknoloji etiketleri
  color: string        // Kart önizleme arka plan rengi
  available: boolean   // false ise "yakında" görünür
}
```

---

## Ana Portfolyo Sitesi

### Tasarım Dili

- **His:** Soft, minimal, profesyonel
- **Arkaplan:** Saf beyaz (#ffffff)
- **Tipografi:** Inter — ince ağırlıklar, negatif letter-spacing
- **Renkler:** Sadece siyah, beyaz ve gri tonları. Renk yalnızca kart önizlemelerinde gelir.
- **Animasyon:** Framer Motion — fadeInUp, stagger, layoutId geçişleri

### Sayfalar ve Bölümler

**Anasayfa (`/`)**
1. Sticky navbar — logo + 3 navigasyon linki
2. Hero — pill badge, büyük başlık, kısa açıklama (Framer Motion stagger)
3. Filtre barı — kategori filtreleme (Framer Motion layoutId ile smooth geçiş)
4. Proje grid'i — 3 kolonlu, her kart hover'da overlay + "siteyi gez" butonu
5. Footer — minimal

**Kart Davranışı**
- Normal: önizleme görseli + başlık + açıklama + teknoloji etiketleri
- Hover: `scale(1.01)` + koyu overlay + "siteyi gez →" butonu
- Tıklama: `window.open("http://{subdomain}.localhost", "_blank")`
- Kategori filtresi: Framer Motion `AnimatePresence` ile smooth ekleme/çıkarma

---

## Alt Siteler

Her alt site kendi içinde bağımsız bir ürün gibi tasarlanır. Birbirinden görsel olarak tamamen ayrışmalıdır. Aynı framework (Next.js + Tailwind + Framer Motion) kullanılsa da tasarım dili, font seçimi, renk paleti ve layout anlayışı her site için sıfırdan belirlenir.

### Planlanan Alt Siteler

---

#### 1. Restoran Sitesi (`restoran.localhost`)

**Konsept:** Lüks İtalyan restoranı "Marcello's"

**Tasarım Dili:**
- Font: Playfair Display (başlıklar) + Inter (gövde)
- Renkler: Krem (#faf7f2), koyu kahve (#1a1208), altın (#c8a96e)
- His: Sinematik, atmosferik, sıcak

**Bölümler:**
1. Scroll'da renk değiştiren navbar
2. Full-screen hero (büyük serif başlık, CTA butonu)
3. Hakkımızda (iki kolon: metin + görsel, istatistikler)
4. Menü (sekme geçişli: Başlangıçlar / Ana Yemekler / Tatlılar)
5. Rezervasyon formu (koyu section, sadeleştirilmiş form elemanları)
6. Footer

**Hedef Müşteri:** Orta-üst segment restoranlar, kafeler, bistro'lar

---

#### 2. SaaS Dashboard (`saas.localhost`)

**Konsept:** Analitik SaaS ürünü "DataFlow"

**Tasarım Dili:**
- Font: Inter
- Renkler: Beyaz, açık gri, mavi aksan (#378ADD)
- His: Temiz, verimli, güven veren

**Bölümler:**
1. Sidebar navigasyon (sabit, ikonlu)
2. Dashboard — metrik kartları, grafik, tablo
3. Landing sayfası — hero, özellikler, fiyatlandırma, CTA

**Hedef Müşteri:** Startup'lar, SaaS girişimcileri, yazılım şirketleri

---

#### 3. E-ticaret (`ecommerce.localhost`)

**Konsept:** Bitki/doğal ürün mağazası "Botanica"

**Tasarım Dili:**
- Font: Inter + DM Serif Display (başlıklar)
- Renkler: Beyaz, açık yeşil tonları, koyu yeşil
- His: Organik, temiz, güven veren

**Bölümler:**
1. Navbar (arama + sepet ikonu)
2. Hero banner
3. Ürün grid'i (filtreleme ile)
4. Ürün detay sayfası
5. Sepet (slide-in panel)

**Hedef Müşteri:** Küçük ölçekli e-ticaret işletmeleri, el yapımı ürün satıcıları

---

#### 4. Ajans / Kreatif (`ajans.localhost`)

**Konsept:** Dijital kreatif ajans "Forma Studio"

**Tasarım Dili:**
- Font: Syne (bold, geometric) + Inter
- Renkler: Siyah, beyaz, tek bir keskin aksan rengi
- His: Bold, deneysel, çarpıcı

**Bölümler:**
1. Büyük tipografi ile hero
2. Çalışmalar (büyük görsel grid)
3. Hizmetler (akordeon veya hover grid)
4. Hakkında
5. İletişim

**Hedef Müşteri:** Markalar, ajanslar, kreatif direktörler

---

#### 5. Kişisel Blog (`blog.localhost`)

**Konsept:** Geliştirici blogu

**Tasarım Dili:**
- Font: Merriweather (içerik) + Inter (UI)
- Renkler: Krem/off-white arkaplan, koyu metin, minimal aksan
- His: Odaklanmış, içerik önce, hızlı

**Bölümler:**
1. Yazı listesi (tarih, başlık, özet, okuma süresi)
2. Yazı detay sayfası (tam ekran typography)
3. Kategoriler / etiketler
4. Hakkımda sayfası

**Hedef Müşteri:** Yazarlar, geliştiriciler, düşünce liderleri

---

## Geliştirme Sırası

1. ✅ Mimari kararlar ve planlama
2. 🔄 Docker + Nginx + Next.js iskelet kurulumu
3. 🔄 `middleware.ts` — subdomain routing
4. 🔄 Ana portfolyo sayfası (Navbar, Hero, FilterBar, ProjectCard)
5. ⬜ Restoran alt sitesi
6. ⬜ SaaS alt sitesi
7. ⬜ E-ticaret alt sitesi
8. ⬜ Ajans alt sitesi
9. ⬜ Blog alt sitesi
10. ⬜ Production deploy (Vercel + domain ayarları)

---

## Geliştirme Ortamı Kurulumu

```bash
# Repoyu klonla
git clone <repo-url>
cd portfolio

# Ortam değişkenlerini ayarla
cp .env.example .env.local

# Docker ile başlat
docker compose up -d

# Logları izle
docker compose logs -f next-app
```

Tarayıcıda aç:
- `http://localhost` → Ana portfolyo
- `http://restoran.localhost` → Restoran sitesi

> **Not:** Chrome ve Edge, `.localhost` subdomain'lerini otomatik olarak destekler. Firefox'ta `about:config` üzerinden `network.dns.localDomains` ayarı gerekebilir.

---

## Önemli Kararlar ve Gerekçeleri

| Karar | Gerekçe |
|---|---|
| Tek Next.js uygulaması | Tek repo, tek deployment, kolay yönetim |
| Subdomain routing (middleware) | Her site bağımsız URL'e sahip, profesyonel görünüm |
| Framer Motion | React ekosistemine entegre, smooth animasyonlar, iyi DX |
| Tailwind CSS | Hızlı geliştirme, her siteye özel tasarım kolayca override edilebilir |
| Docker Compose | Mevcut sistemle port çakışması olmadan izole geliştirme ortamı |
| Statik proje verisi (lib/projects.ts) | CMS gereksiz, veriler az ve nadiren değişir |