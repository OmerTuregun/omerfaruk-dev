export type Service = {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  price: string
  duration: string
  popular: boolean
}

export const services: Service[] = [
  {
    id: 'birebir',
    title: '1\'e 1 Antrenman',
    subtitle: 'Elite Performance',
    description: 'Tamamen sana özel program. Her seans analiz, düzeltme ve ilerleme takibi.',
    features: [
      'Haftalık 3 veya 5 seans seçeneği',
      'Kişisel program tasarımı',
      'Beslenme planı dahil',
      'WhatsApp ile 7/24 destek',
      'Aylık vücut analizi',
      'Video teknik analizi'
    ],
    price: '₺4.800',
    duration: 'aylık',
    popular: true
  },
  {
    id: 'online',
    title: 'Online Koçluk',
    subtitle: 'Remote Training',
    description: 'Nerede olursan ol, aynı kalite. Uygulama üzerinden program takibi ve haftalık check-in.',
    features: [
      'Özel program uygulaması',
      'Haftalık video check-in',
      'Beslenme takibi',
      'Form videosu analizi',
      'Sınırsız mesajlaşma',
      '4 haftalık program döngüsü'
    ],
    price: '₺2.200',
    duration: 'aylık',
    popular: false
  },
  {
    id: 'beslenme',
    title: 'Beslenme Danışmanlığı',
    subtitle: 'Nutrition Coaching',
    description: 'Antrenman olmadan sadece beslenme optimizasyonu. Kan değerleri ve hedefine göre kişisel plan.',
    features: [
      'Detaylı beslenme analizi',
      'Kişisel makro hesaplama',
      'Takviye protokolü',
      '2 haftada bir revizyon',
      'Tarif ve yemek planı',
      'Kan tahlili yorumlama'
    ],
    price: '₺1.500',
    duration: 'aylık',
    popular: false
  },
  {
    id: 'grup',
    title: 'Grup Antrenmanı',
    subtitle: 'Squad Training',
    description: 'Maksimum 6 kişilik küçük grup. Rekabetçi ortam, yüksek motivasyon.',
    features: [
      'Haftada 3 seans',
      'Maksimum 6 kişi',
      'Program rotasyonu',
      'Grup beslenme rehberi',
      'Aylık challenge',
      'Özel WhatsApp grubu'
    ],
    price: '₺1.800',
    duration: 'aylık',
    popular: false
  }
]

export type Transformation = {
  id: string
  name: string
  duration: string
  weightLost?: string
  muscleGained?: string
  beforeImage: string
  afterImage: string
  quote: string
  program: string
}

export const transformations: Transformation[] = [
  {
    id: 't1',
    name: 'Ahmet K.',
    duration: '6 Ay',
    weightLost: '24 kg',
    beforeImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    quote: 'Hayatımda ilk defa sporu sevdim. Mert sadece antrenör değil, bir yaşam koçu.',
    program: '1\'e 1 Antrenman'
  },
  {
    id: 't2',
    name: 'Selin Y.',
    duration: '4 Ay',
    muscleGained: '8 kg kas',
    beforeImage: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&q=80',
    quote: 'Online koçluk bu kadar etkili olur diye düşünmezdim. Sonuçlar inanılmaz.',
    program: 'Online Koçluk'
  },
  {
    id: 't3',
    name: 'Burak M.',
    duration: '8 Ay',
    weightLost: '18 kg',
    muscleGained: '12 kg kas',
    beforeImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
    quote: 'Rekomp hedefime 8 ayda ulaştım. Program ve beslenme mükemmel dengelenmişti.',
    program: '1\'e 1 + Beslenme'
  }
]

export type Stat = {
  value: string
  label: string
  suffix?: string
}

export const stats: Stat[] = [
  { value: '8', label: 'Yıllık Deneyim', suffix: '+' },
  { value: '340', label: 'Dönüşüm Hikayesi', suffix: '+' },
  { value: '94', label: 'Hedefine Ulaşma Oranı', suffix: '%' },
  { value: '12', label: 'Uluslararası Sertifika' }
]

export const certifications: string[] = [
  'NASM Certified Personal Trainer',
  'CrossFit Level 2 Trainer',
  'Precision Nutrition Level 1',
  'FMS Functional Movement Screen',
  'NSCA Strength & Conditioning',
  'TRX Suspension Training'
]

export const testimonials: { name: string; text: string; program: string; rating: number }[] = [
  { name: 'Zeynep A.', text: 'Daha önce 3 farklı antrenörle çalıştım. Mert\'in yaklaşımı tamamen farklı — bilimsel, sistematik ve çok motive edici.', program: 'Online Koçluk', rating: 5 },
  { name: 'Can D.', text: 'Beslenme danışmanlığıyla 3 ayda kan değerlerim normale döndü, 9 kilo verdim. Takviye protokolü çok doğru kurulmuş.', program: 'Beslenme Danışmanlığı', rating: 5 },
  { name: 'Elif T.', text: 'Grup antrenmanı bu kadar yoğun ve eğlenceli olabilir diye bilmiyordum. Her seans farklı, hiç sıkılmıyorum.', program: 'Grup Antrenmanı', rating: 5 },
  { name: 'Oğuz K.', text: '6 ayda squat 1RM\'im 80\'den 140 kg\'a çıktı. Teknik analiz videoları çok değerliydi.', program: '1\'e 1 Antrenman', rating: 5 }
]
