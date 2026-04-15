export type Project = {
  id: string;
  title: string;
  description: string;
  subdomain: string; // restoran, saas, ecommerce vb.
  category: "Restoran" | "SaaS" | "E-ticaret" | "Ajans" | "Blog";
  tags: string[]; // ["Next.js", "Framer Motion", "Tailwind"]
  color: string; // Kart önizleme rengi için hex
  available: boolean;
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
];

