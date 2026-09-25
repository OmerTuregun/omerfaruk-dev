export type Project = {
  id: string
  client: string
  title: string
  category: 'Film' | 'Brand' | 'Motion' | 'Digital' | 'Campaign'
  year: number
  thumbnail: string
  tags: string[]
  accentColor: string
  brief: string
  result: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'p01',
    client: 'Meridian Bank',
    title: 'The Future is Liquid',
    category: 'Campaign',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
    tags: ['Campaign', 'Film', 'OOH'],
    accentColor: '#7b2ff7',
    brief: 'Reposition a 40-year-old bank as the digital-first choice for Gen Z.',
    result: '3.2M organic reach, +41% mobile app downloads in 60 days.',
    featured: true,
  },
  {
    id: 'p02',
    client: 'Arca Sportswear',
    title: 'Move Without Limits',
    category: 'Film',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
    tags: ['Film', 'Motion', 'Social'],
    accentColor: '#ff3b00',
    brief: 'Launch campaign for a new performance line targeting ultra-runners.',
    result: '18M views across platforms, featured in AdWeek.',
    featured: true,
  },
  {
    id: 'p03',
    client: 'Lune Cosmetics',
    title: 'Skin Deep',
    category: 'Brand',
    year: 2024,
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    tags: ['Brand', 'Identity', 'Packaging'],
    accentColor: '#e8c4b8',
    brief: 'Full brand identity for a clean beauty startup entering 12 markets.',
    result: 'Stocked in Sephora EU within 6 months of launch.',
    featured: true,
  },
  {
    id: 'p04',
    client: 'Vertex AI',
    title: 'Intelligence, Visualized',
    category: 'Motion',
    year: 2023,
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    tags: ['Motion', 'Digital', '3D'],
    accentColor: '#00d4ff',
    brief: 'Explainer motion series for a B2B AI product launch.',
    result: 'Used in 200+ enterprise sales decks globally.',
    featured: false,
  },
  {
    id: 'p05',
    client: 'Nomad Hotels',
    title: 'Stay Strange',
    category: 'Campaign',
    year: 2023,
    thumbnail: 'https://images.unsplash.com/photo-1551882547-ff40c63fe2fa?w=800&q=80',
    tags: ['Campaign', 'Film', 'Brand'],
    accentColor: '#c8a96e',
    brief: 'Global brand campaign positioning boutique hotels against Airbnb.',
    result: '92% brand recall uplift in target demographic.',
    featured: true,
  },
  {
    id: 'p06',
    client: 'Flux Energy',
    title: 'Power the Grid',
    category: 'Digital',
    year: 2023,
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    tags: ['Digital', 'Campaign', 'Social'],
    accentColor: '#10b981',
    brief: 'Digital-first awareness campaign for a renewable energy IPO.',
    result: 'Oversubscribed IPO by 3x. Campaign shortlisted at Cannes.',
    featured: false,
  },
  {
    id: 'p07',
    client: 'Obsidian Watches',
    title: 'Precision is a Feeling',
    category: 'Film',
    year: 2023,
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    tags: ['Film', 'Brand', 'Luxury'],
    accentColor: '#b8a98a',
    brief: 'Hero film for a Swiss watchmaker entering the Asian market.',
    result: '780K pre-orders in Japan and South Korea combined.',
    featured: false,
  },
  {
    id: 'p08',
    client: 'Forma Architecture',
    title: 'Space as Narrative',
    category: 'Brand',
    year: 2022,
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    tags: ['Brand', 'Identity', 'Print'],
    accentColor: '#94a3b8',
    brief: 'Complete rebrand for a Pritzker-nominated architecture studio.',
    result: 'Won D&AD Wood Pencil, featured in Wallpaper* magazine.',
    featured: false,
  },
  {
    id: 'p09',
    client: 'Drift Records',
    title: 'Sound Unseen',
    category: 'Motion',
    year: 2022,
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    tags: ['Motion', 'Digital', 'Music'],
    accentColor: '#a855f7',
    brief: 'Generative visual identity system for an indie record label.',
    result: 'Identity system adopted by 14 artists on the roster.',
    featured: false,
  },
  {
    id: 'p10',
    client: 'Terra Foods',
    title: 'Grown Here',
    category: 'Campaign',
    year: 2022,
    thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    tags: ['Campaign', 'Film', 'Social'],
    accentColor: '#65a30d',
    brief: 'Farm-to-table brand story told across film, OOH and social.',
    result: '+220% social following in 90 days, TikTok viral moment.',
    featured: false,
  },
  {
    id: 'p11',
    client: 'Cipher Security',
    title: 'Trust Nothing',
    category: 'Digital',
    year: 2022,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['Digital', 'Brand', 'Motion'],
    accentColor: '#ef4444',
    brief: 'Brand and digital presence for a zero-trust cybersecurity firm.',
    result: 'Series B closed at $40M within 3 months of launch.',
    featured: false,
  },
  {
    id: 'p12',
    client: 'Solstice Festival',
    title: 'Where Sound Meets Sky',
    category: 'Campaign',
    year: 2021,
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    tags: ['Campaign', 'Film', 'Brand'],
    accentColor: '#f59e0b',
    brief: 'Full identity and campaign for a new music festival in Ibiza.',
    result: 'Sold out in 48 hours. Festival now in its 3rd year.',
    featured: false,
  },
]

export type Service = {
  id: string
  title: string
  description: string
  deliverables: string[]
  accent: string
}

export const services: Service[] = [
  {
    id: 'film',
    title: 'Film & Production',
    description:
      'From 15-second social films to full-length brand documentaries. We handle concept, production, post.',
    deliverables: [
      'TV & Cinema Spots',
      'Social Content Series',
      'Brand Documentaries',
      'Product Films',
      'Event Coverage',
    ],
    accent: '#ff3b00',
  },
  {
    id: 'brand',
    title: 'Brand Identity',
    description:
      'Strategy-led visual systems built to last. Logo, typography, color, guidelines and everything in between.',
    deliverables: [
      'Logo Systems',
      'Brand Guidelines',
      'Packaging Design',
      'Tone of Voice',
      'Visual Language',
    ],
    accent: '#7b2ff7',
  },
  {
    id: 'motion',
    title: 'Motion & 3D',
    description:
      'Animation, motion graphics and 3D visualization for brands that refuse to sit still.',
    deliverables: [
      'Explainer Animation',
      'UI Motion Systems',
      '3D Product Renders',
      'Title Sequences',
      'AR Filters',
    ],
    accent: '#00d4ff',
  },
  {
    id: 'digital',
    title: 'Digital & Campaigns',
    description:
      'Integrated campaigns that connect across every touchpoint — digital, print, OOH and beyond.',
    deliverables: [
      'Social Campaigns',
      'OOH & Print',
      'Digital Strategy',
      'Influencer Direction',
      'Performance Creative',
    ],
    accent: '#10b981',
  },
]

export type TeamMember = {
  name: string
  title: string
  image: string
  bio: string
}

export const team: TeamMember[] = [
  {
    name: 'Mara Voss',
    title: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Former ECD at Wieden+Kennedy. 18 years shaping brands that shape culture.',
  },
  {
    name: 'Ren Takahashi',
    title: 'Head of Film',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Directed spots for Nike, Apple and Google. Cannes Lions jury member 2022.',
  },
  {
    name: 'Sofia Andrade',
    title: 'Brand Strategy Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'MBA from INSEAD. Built brand frameworks for 3 Fortune 500 companies.',
  },
  {
    name: 'Kai Oduya',
    title: 'Motion & 3D Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'BAFTA-nominated animator. His work has aired in 40 countries.',
  },
]

export const clients: string[] = [
  'Nike',
  'Spotify',
  'Airbnb',
  'LVMH',
  'Stripe',
  'Figma',
  'Notion',
  'Porsche',
]

export const awards: { title: string; org: string; year: number }[] = [
  { title: 'Grand Prix', org: 'Cannes Lions', year: 2024 },
  { title: 'Black Pencil', org: 'D&AD', year: 2023 },
  { title: 'Agency of the Year', org: 'The One Show', year: 2023 },
  { title: 'Gold Pencil', org: 'D&AD', year: 2022 },
  { title: 'Grand Clio', org: 'Clio Awards', year: 2022 },
  { title: 'Best in Show', org: 'Communication Arts', year: 2021 },
]
