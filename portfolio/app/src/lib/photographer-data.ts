export const photographerInfo = {
  name: 'Elif Şahin',
  title: 'Fotoğrafçı',
  location: 'İstanbul, Türkiye',
  email: 'elif@elifsahin.com',
  phone: '+90 530 000 00 00',
  since: '2016',
  projectCount: '340+',
  experience: '8 Yıl',
  awards: '12+',
  satisfaction: '98%',
}

export type Work = {
  id: string
  title: string
  category: string
  year: string
  color: string
  size: 'large' | 'small'
}

export const works: Work[] = [
  { id: 'w1', title: 'Ayşe & Mert Düğünü', category: 'DÜĞÜN', year: '2024', color: '#e0dbd2', size: 'large' },
  { id: 'w2', title: 'Zeynep Portreleri', category: 'PORTRE', year: '2024', color: '#dce0db', size: 'small' },
  { id: 'w3', title: 'Kapadokya Serisi', category: 'DOĞA', year: '2024', color: '#e0dcd6', size: 'small' },
  { id: 'w4', title: 'Marka Çekimi', category: 'KOMERSİYEL', year: '2023', color: '#dbd8d2', size: 'small' },
  { id: 'w5', title: 'Boğaz Düğünü', category: 'DÜĞÜN', year: '2023', color: '#e0dbd4', size: 'small' },
  { id: 'w6', title: 'Bosphorus Editorial', category: 'EDİTORYAL', year: '2023', color: '#d8dce0', size: 'small' },
]

export type Service = {
  num: string
  name: string
  price: string
  desc: string
}

export const services: Service[] = [
  { num: '01', name: 'Düğün Fotoğrafçılığı', price: '₺15.000\'den başlıyor', desc: 'Özel gününüzün her anını, duygunuzu ve hikayenizi sonsuza taşıyorum.' },
  { num: '02', name: 'Portre & Aile', price: '₺3.500\'den başlıyor', desc: 'Bireysel ya da aile portreleri için doğal ışık ve otantik ifadeler.' },
  { num: '03', name: 'Ticari & Marka', price: '₺8.000\'den başlıyor', desc: 'Markanız için ürün, mekan ve kurumsal fotoğrafçılık hizmetleri.' },
  { num: '04', name: 'Editöryal', price: 'Teklif alın', desc: 'Dergi ve yayın projeleri için profesyonel editöryal çekimler.' },
]

export type Testimonial = {
  quote: string
  author: string
  role: string
}

export const testimonials: Testimonial[] = [
  { quote: 'Düğün fotoğraflarımız tam hayal ettiğimiz gibiydi. Her kare bir duygu taşıyor.', author: 'Ayşe K.', role: 'Gelin' },
  { quote: 'Portre çekiminde kendimizi hiç zorlanmadan ifade edebildik. Sonuç muhteşem.', author: 'Mert D.', role: 'Model' },
  { quote: 'Ticari çekimimiz için en doğru tercihti. Markamızı mükemmel yansıttı.', author: 'Zeynep A.', role: 'Marka Direktörü' },
]
