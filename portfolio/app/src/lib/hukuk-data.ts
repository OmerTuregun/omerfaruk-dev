export type PracticeArea = {
  id: string
  title: string
  shortDesc: string
  details: string[]
  icon: string // SVG path d değeri
}

export const practiceAreas: PracticeArea[] = [
  {
    id: 'ticaret',
    title: 'Ticaret Hukuku',
    shortDesc: 'Şirket kuruluşundan birleşme ve devralmalara kadar ticari hayatın her aşamasında hukuki danışmanlık.',
    details: [
      'Şirket kuruluşu ve yapılandırması',
      'Birleşme, devralma ve bölünme işlemleri',
      'Ticari sözleşmeler ve müzakereler',
      'Ortaklık anlaşmazlıkları',
      'Rekabet hukuku danışmanlığı',
      'Ticari uyuşmazlık çözümü'
    ],
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    id: 'gayrimenkul',
    title: 'Gayrimenkul Hukuku',
    shortDesc: 'Taşınmaz edinimi, kira anlaşmazlıkları ve inşaat projelerinde kapsamlı hukuki destek.',
    details: [
      'Taşınmaz alım satım işlemleri',
      'Kira sözleşmeleri ve anlaşmazlıkları',
      'İnşaat ve müteahhitlik sözleşmeleri',
      'Kat mülkiyeti ve kat irtifakı',
      'Kamulaştırma ve bedel tespiti',
      'Tapu iptali ve tescil davaları'
    ],
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    id: 'is',
    title: 'İş Hukuku',
    shortDesc: 'İşveren ve çalışan haklarının korunması, toplu iş sözleşmeleri ve iş davalarında uzman temsil.',
    details: [
      'İş sözleşmeleri hazırlanması',
      'İşe iade ve tazminat davaları',
      'Toplu iş sözleşmesi müzakereleri',
      'İş kazası ve meslek hastalığı',
      'Mobbing ve ayrımcılık davaları',
      'SGK uyuşmazlıkları'
    ],
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
  },
  {
    id: 'ceza',
    title: 'Ceza Hukuku',
    shortDesc: 'Soruşturma ve kovuşturma aşamalarında güçlü savunma, mağdur hakları ve uyuşmazlık çözümü.',
    details: [
      'Ceza soruşturması savunuculuğu',
      'Ağır ceza davaları',
      'Ekonomik suçlar ve dolandırıcılık',
      'Mağdur hakları ve temsili',
      'Uzlaşma ve arabuluculuk',
      'İnfaz hukuku danışmanlığı'
    ],
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
  },
  {
    id: 'aile',
    title: 'Aile Hukuku',
    shortDesc: 'Boşanma, velayet, nafaka ve miras uyuşmazlıklarında hassas ve etkili hukuki danışmanlık.',
    details: [
      'Anlaşmalı ve çekişmeli boşanma',
      'Velayet ve kişisel ilişki davaları',
      'Nafaka belirlenmesi ve icrası',
      'Mal paylaşımı ve tasfiye',
      'Miras ve vasiyetname işlemleri',
      'Evlat edinme süreçleri'
    ],
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    id: 'idare',
    title: 'İdare Hukuku',
    shortDesc: 'Kamu kurumlarıyla yaşanan uyuşmazlıklarda idari yargı süreçlerinde uzman temsil.',
    details: [
      'İptal ve tam yargı davaları',
      'İdari para cezalarına itiraz',
      'Kamu ihalesi uyuşmazlıkları',
      'Ruhsat ve lisans işlemleri',
      'Disiplin davaları',
      'Kamulaştırma itirazları'
    ],
    icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
  }
]

export type Attorney = {
  id: string
  name: string
  title: string
  specializations: string[]
  education: string[]
  barMembership: string
  image: string
  bio: string
  email: string
}

export const attorneys: Attorney[] = [
  {
    id: 'celik',
    name: 'Av. Kemal Çelik',
    title: 'Kurucu Ortak',
    specializations: ['Ticaret Hukuku', 'Birleşme & Devralma', 'Rekabet Hukuku'],
    education: ['İstanbul Üniversitesi Hukuk Fakültesi', 'Heidelberg Üniversitesi, LL.M.'],
    barMembership: 'İstanbul Barosu, Sicil No: 12847',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: '25 yıllık deneyimiyle Türkiye\'nin önde gelen ticaret hukuku avukatlarından. 200\'den fazla M&A işleminde danışmanlık yaptı.',
    email: 'k.celik@celikdogan.av.tr'
  },
  {
    id: 'dogan',
    name: 'Av. Sema Doğan',
    title: 'Kurucu Ortak',
    specializations: ['Gayrimenkul Hukuku', 'İnşaat Hukuku', 'İdare Hukuku'],
    education: ['Ankara Üniversitesi Hukuk Fakültesi', 'Galatasaray Üniversitesi, Yüksek Lisans'],
    barMembership: 'İstanbul Barosu, Sicil No: 15392',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Gayrimenkul ve idare hukuku alanında 22 yıllık tecrübe. Büyük ölçekli kentsel dönüşüm projelerinde hukuki danışmanlık.',
    email: 's.dogan@celikdogan.av.tr'
  },
  {
    id: 'arslan',
    name: 'Av. Tarık Arslan',
    title: 'Kıdemli Ortak',
    specializations: ['Ceza Hukuku', 'Ekonomik Suçlar', 'Ağır Ceza'],
    education: ['Marmara Üniversitesi Hukuk Fakültesi', 'İstanbul Barosu CMK Eğitimi'],
    barMembership: 'İstanbul Barosu, Sicil No: 22104',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Ceza hukuku alanında 18 yıllık deneyim. Yüksek profilli ekonomik suç davalarında başarılı savunma sicili.',
    email: 't.arslan@celikdogan.av.tr'
  },
  {
    id: 'yilmaz',
    name: 'Av. Deniz Yılmaz',
    title: 'Ortak',
    specializations: ['İş Hukuku', 'Aile Hukuku', 'Arabuluculuk'],
    education: ['Bilkent Üniversitesi Hukuk Fakültesi', 'Arabuluculuk Sicili'],
    barMembership: 'İstanbul Barosu, Sicil No: 31856',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'İş ve aile hukuku alanında uzman. Arabuluculuk sicilinde kayıtlı. Dava öncesi uzlaşı süreçlerinde yüksek başarı oranı.',
    email: 'd.yilmaz@celikdogan.av.tr'
  }
]

export type CaseStudy = {
  sector: string
  subject: string
  outcome: string
  duration: string
}

export const caseStudies: CaseStudy[] = [
  { sector: 'İnşaat & Gayrimenkul', subject: 'Kentsel dönüşüm arsa anlaşmazlığı', outcome: 'Tam tazminat kararı', duration: '14 ay' },
  { sector: 'Finans & Bankacılık', subject: 'Banka ile kredi uyuşmazlığı', outcome: 'Borç yapılandırması sağlandı', duration: '8 ay' },
  { sector: 'Teknoloji', subject: 'Yazılım şirketi ortaklık çözülmesi', outcome: 'Lehte karar, hisse devri', duration: '6 ay' },
  { sector: 'Üretim & Sanayi', subject: 'İş kazası tazminat davası', outcome: 'Tam tazminat + manevi tazminat', duration: '18 ay' },
  { sector: 'Perakende', subject: 'Franchise sözleşmesi ihlali', outcome: 'Sözleşme feshi + tazminat', duration: '10 ay' },
  { sector: 'Medya & Eğlence', subject: 'Fikri mülkiyet ihlali', outcome: 'İhtiyati tedbir + tazminat', duration: '5 ay' }
]

export const stats: { value: string; label: string }[] = [
  { value: '25+', label: 'Yıllık Deneyim' },
  { value: '2.400+', label: 'Tamamlanan Dava' },
  { value: '%94', label: 'Başarı Oranı' },
  { value: '6', label: 'Uzmanlık Alanı' }
]

export const processSteps: { title: string; desc: string }[] = [
  { title: 'Ücretsiz Ön Görüşme', desc: 'Davanızı dinliyor, hukuki durumunuzu değerlendiriyor ve size dürüst bir ön analiz sunuyoruz.' },
  { title: 'Strateji Geliştirme', desc: 'Güçlü ve zayıf yönleri belirleyerek davanıza özel hukuki strateji oluşturuyoruz.' },
  { title: 'Aktif Takip', desc: 'Dava süresince her gelişmeden sizi haberdar ediyor, tüm işlemleri titizlikle yürütüyoruz.' },
  { title: 'Sonuç & Raporlama', desc: 'Davanın sonucunu şeffaf biçimde raporluyor, gerekirse itiraz ve üst yargı süreçlerini başlatıyoruz.' }
]
