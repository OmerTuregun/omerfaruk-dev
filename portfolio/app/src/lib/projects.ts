export type Project = {
  id: string;
  title: string;
  description: string;
  subdomain: string; // restoran, saas, ecommerce vb.
  category: "Restoran" | "SaaS" | "E-ticaret" | "Blog" | "Ajans" | "Kurumsal" | "Kişisel";
  tags: string[]; // ["Next.js", "Framer Motion", "Tailwind"]
  color: string; // Kart önizleme rengi için hex
  available: boolean;
  /** public/previews/{preview}.png — yoksa id kullanılır */
  preview?: string;
};

export const projects: Project[] = [
  {
    id: "restoran",
    title: "Restoran Sitesi",
    description: "Rezervasyon, menü ve atmosfer odaklı lüks restoran deneyimi.",
    subdomain: "restoran",
    category: "Restoran",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    color: "#f5ede4",
    available: true,
  },
  {
    id: "saas",
    title: "SaaS Dashboard",
    description:
      "Analitik ve metrik odaklı modern SaaS ürün arayüzü. Kullanıcı yönetimi, gelir takibi ve raporlama.",
    subdomain: "saas",
    category: "SaaS",
    tags: ["Next.js", "Recharts", "Tailwind"],
    color: "#e4eaf5",
    available: true,
  },
  {
    id: "ecommerce",
    title: "El Yapımı Seramik",
    description:
      "Wabi-sabi estetiğiyle tasarlanmış butik seramik ve ev dekor mağazası.",
    subdomain: "ecommerce",
    category: "E-ticaret",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    color: "#f0ebe4",
    available: true,
  },
  {
    id: "elif",
    title: "Fotoğrafçı Portfolyosu",
    description: "Editorial tarzda tasarlanmış profesyonel fotoğrafçı portfolyo sitesi.",
    subdomain: "elif",
    category: "Blog",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    color: "#f4f3ef",
    available: true,
    preview: "photographer",
  },
  {
    id: "dashboard",
    title: "Datawise Dashboard",
    description:
      "Fin-tech odaklı dark mode SaaS uygulama arayüzü. Gerçek zamanlı metrikler, AI insights ve interaktif veri görselleştirme.",
    subdomain: "dashboard",
    category: "SaaS",
    tags: ["Dark Mode", "Dashboard", "Fin-tech", "AI", "Real-time"],
    color: "#0d0d0f",
    available: true,
  },
  {
    id: "ajans",
    title: "Void Studio",
    description:
      "Uluslararası kreatif ajans. Film prodüksiyon, marka kimliği ve motion design portföyü.",
    subdomain: "ajans",
    category: "Ajans",
    tags: ["Kreatif", "Film", "Branding", "Motion", "Dark"],
    color: "#050505",
    available: true,
    preview: "ajans",
  },
  {
    id: "mimari",
    title: "Forma Mimarlık",
    description:
      "Lüks konut ve ticari projeler. Yatay scroll galeri, proje detay modali ve parallax video hero.",
    subdomain: "mimari",
    category: "Ajans",
    tags: ["Mimarlık", "Lüks", "Gayrimenkul", "Dark", "Parallax"],
    color: "#0a0a0a",
    available: true,
  },
  {
    id: "hukuk",
    title: "Çelik & Doğan",
    description:
      "Tam servis hukuk bürosu. Ticaret, gayrimenkul, iş ve ceza hukuku alanlarında kurumsal danışmanlık.",
    subdomain: "hukuk",
    category: "Kurumsal",
    tags: ["Hukuk", "Kurumsal", "Danışmanlık", "Beyaz", "Tipografi"],
    color: "#fafaf8",
    available: true,
  },
  {
    id: "spor",
    title: "Mert Kaya Performance",
    description:
      "Kişisel fitness koçu. Strength training, online koçluk ve beslenme danışmanlığı.",
    subdomain: "spor",
    category: "Kişisel",
    tags: ["Fitness", "Koçluk", "Spor", "Dark", "Neon"],
    color: "#080808",
    available: true,
  },
];

