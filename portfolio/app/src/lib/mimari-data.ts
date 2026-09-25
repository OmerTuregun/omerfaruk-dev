export type Project = {
  id: string
  title: string
  location: string
  year: number
  category: 'Konut' | 'Ticari' | 'İç Mimari' | 'Karma'
  area: number
  status: 'Tamamlandı' | 'Devam Ediyor' | 'Konsept'
  heroImage: string
  gallery: string[]
  description: string
  awards?: string[]
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'pr01',
    title: 'Villa Taş',
    location: 'Bodrum, Türkiye',
    year: 2024,
    category: 'Konut',
    area: 820,
    status: 'Tamamlandı',
    heroImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    ],
    description:
      'Ege kıyısında doğal taş ve ahşabın buluştuğu 820 m² özel konut. Sonsuzluk havuzu deniz ile bütünleşiyor.',
    awards: ['Arkitera Yılın Projesi 2024'],
    featured: true,
  },
  {
    id: 'pr02',
    title: 'Obsidian Residence',
    location: 'İstanbul, Türkiye',
    year: 2024,
    category: 'Konut',
    area: 450,
    status: 'Tamamlandı',
    heroImage:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210491892-03d54f1a3cb?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80',
    ],
    description:
      'Boğaz manzaralı tek katlı konut. Siyah çelik, cam ve beton malzemelerin minimalist yorumu.',
    featured: true,
  },
  {
    id: 'pr03',
    title: 'Merkez Tower',
    location: 'İstanbul, Türkiye',
    year: 2023,
    category: 'Ticari',
    area: 12400,
    status: 'Tamamlandı',
    heroImage:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
    description:
      '38 katlı karma kullanım kulesi. Ofis, rezidans ve ticaret alanlarını tek bir dikey mahallede birleştiriyor.',
    awards: ['WAN Awards Finalist 2023', 'Emporis Skyscraper Award'],
    featured: true,
  },
  {
    id: 'pr04',
    title: 'Zeytinlik Evi',
    location: 'İzmir, Türkiye',
    year: 2023,
    category: 'Konut',
    area: 340,
    status: 'Tamamlandı',
    heroImage:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    ],
    description:
      'Yüz yıllık zeytin bahçesine gömülü tek katlı konut. Toprak tonları ve ham beton malzeme paleti.',
    featured: false,
  },
  {
    id: 'pr05',
    title: 'Atölye İstanbul',
    location: 'Karaköy, İstanbul',
    year: 2023,
    category: 'İç Mimari',
    area: 680,
    status: 'Tamamlandı',
    heroImage:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    ],
    description:
      'Tarihi Karaköy hanında teknoloji şirketi ofisi. Endüstriyel miras ile çağdaş iş kültürünün sentezi.',
    featured: false,
  },
  {
    id: 'pr06',
    title: 'Kaya Retreat',
    location: 'Kapadokya, Türkiye',
    year: 2022,
    category: 'Karma',
    area: 2800,
    status: 'Tamamlandı',
    heroImage:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
    ],
    description:
      '18 suite butik otel. Kapadokya volkanik kayasına oyulmuş mekânlar ile çağdaş konfor bir arada.',
    awards: ['Condé Nast Traveller Design Award 2023'],
    featured: true,
  },
  {
    id: 'pr07',
    title: 'Plaj Evi',
    location: 'Çeşme, Türkiye',
    year: 2022,
    category: 'Konut',
    area: 290,
    status: 'Tamamlandı',
    heroImage:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505873242700-f289a29e1724?w=800&q=80',
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
    ],
    description:
      'Sahile sıfır yazlık konut. Beyaz sıva, ahşap güneşlik ve cam cephe ile Ege mimarisinin çağdaş yorumu.',
    featured: false,
  },
  {
    id: 'pr08',
    title: 'Galata Ofis',
    location: 'Galata, İstanbul',
    year: 2021,
    category: 'İç Mimari',
    area: 420,
    status: 'Tamamlandı',
    heroImage:
      'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
    ],
    description:
      "Galata Kulesi'ne bakan tarihi yapıda butik hukuk bürosu. Orijinal Osmanlı tavan detayları korundu.",
    featured: false,
  },
]

export type TeamMember = {
  name: string
  title: string
  image: string
  bio: string
  education: string
}

export const team: TeamMember[] = [
  {
    name: 'Emre Aydın',
    title: 'Kurucu Ortak & Baş Mimar',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: "ETH Zürich mezunu. 20 yıllık kariyer boyunca 3 kıtada 60'tan fazla proje.",
    education: 'ETH Zürich, Mimarlık Doktora',
  },
  {
    name: 'Selin Çelik',
    title: 'Kurucu Ortak & İç Mimar',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'Pratt Institute New York mezunu. Sürdürülebilir iç mimari alanında uluslararası tanınırlık.',
    education: 'Pratt Institute, İç Mimari MFA',
  },
  {
    name: 'Can Yıldız',
    title: 'Proje Direktörü',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'ODTÜ Mimarlık mezunu. Büyük ölçekli karma kullanım projelerinde 15 yıl deneyim.',
    education: 'ODTÜ Mimarlık',
  },
  {
    name: 'Lara Demir',
    title: 'Tasarım Mimarı',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'AA Londra mezunu. Parametrik tasarım ve dijital üretim odaklı.',
    education: 'Architectural Association, Londra',
  },
]

export const stats: { value: string; label: string }[] = [
  { value: '60+', label: 'Tamamlanan Proje' },
  { value: '20', label: 'Yıllık Deneyim' },
  { value: '12', label: 'Uluslararası Ödül' },
  { value: '3', label: 'Kıta' },
]

export const awards: { title: string; org: string; year: number }[] = [
  { title: 'Yılın Mimarı', org: 'Arkitera', year: 2024 },
  { title: 'WAN Awards Finalist', org: 'World Architecture News', year: 2023 },
  { title: 'Design Award', org: 'Condé Nast Traveller', year: 2023 },
  { title: 'Emporis Skyscraper Award', org: 'Emporis', year: 2023 },
  { title: 'Sürdürülebilir Mimarlık Ödülü', org: 'Yapı Dergisi', year: 2022 },
  { title: 'Konut Projesi Ödülü', org: 'Arkitera', year: 2021 },
]
