export type Product = {
  id: string
  name: string
  price: number
  category: 'kase' | 'vazo' | 'kupa' | 'dekor'
  description: string
  material: string
  dimensions: string
  stock: number
  featured: boolean
  color: string
}

export const products: Product[] = [
  {
    id: 'kase-001',
    name: 'Doğa Kasesi',
    price: 380,
    category: 'kase',
    description: 'El yapımı, organik formlu servis kasesi.',
    material: 'Şamot kil, mat sır',
    dimensions: '18cm çap, 8cm yükseklik',
    stock: 4,
    featured: true,
    color: '#c4a882',
  },
  {
    id: 'vazo-001',
    name: 'Wabi Vazo',
    price: 520,
    category: 'vazo',
    description: 'Asimetrik formlu, çiçek aranjmanı için ideal.',
    material: 'Porselen, saten sır',
    dimensions: '12cm çap, 24cm yükseklik',
    stock: 2,
    featured: true,
    color: '#d4c4b0',
  },
  {
    id: 'kupa-001',
    name: 'Sabah Kupası',
    price: 220,
    category: 'kupa',
    description: 'Her sabah ritüelinize eşlik eden el yapımı kupa.',
    material: 'Stoneware kil, renkli sır',
    dimensions: '8cm çap, 9cm yükseklik',
    stock: 8,
    featured: true,
    color: '#b8a898',
  },
  {
    id: 'dekor-001',
    name: 'Toprak Mumluk',
    price: 290,
    category: 'dekor',
    description: 'Ev ortamına sıcaklık katan el yapımı mumluk.',
    material: 'Şamot kil, doğal sır',
    dimensions: '10cm çap, 6cm yükseklik',
    stock: 6,
    featured: true,
    color: '#c8b4a0',
  },
  {
    id: 'kase-002',
    name: 'Meze Kasesi',
    price: 280,
    category: 'kase',
    description: 'Küçük porsiyonlar için şık sunum kasesi.',
    material: 'Porselen, parlak sır',
    dimensions: '12cm çap, 6cm yükseklik',
    stock: 5,
    featured: false,
    color: '#d8cfc4',
  },
  {
    id: 'vazo-002',
    name: 'Tomurcuk Vazo',
    price: 320,
    category: 'vazo',
    description: 'Tek çiçek için minimal vazo.',
    material: 'Porselen, mat sır',
    dimensions: '6cm çap, 15cm yükseklik',
    stock: 3,
    featured: false,
    color: '#c0b4a8',
  },
  {
    id: 'kupa-002',
    name: 'Çay Kupası',
    price: 180,
    category: 'kupa',
    description: 'İnce cidarlı, çay keyfi için tasarlanmış.',
    material: 'Porselen, şeffaf sır',
    dimensions: '7cm çap, 8cm yükseklik',
    stock: 10,
    featured: false,
    color: '#d4c8bc',
  },
  {
    id: 'dekor-002',
    name: 'Taş Kâse',
    price: 420,
    category: 'dekor',
    description: 'Dekoratif veya meyvelik olarak kullanılabilir.',
    material: 'Şamot kil, taş efektli sır',
    dimensions: '22cm çap, 10cm yükseklik',
    stock: 3,
    featured: false,
    color: '#b4a898',
  },
]

