/**
 * Tek bir işletmeyi tarif eden şema.
 * Yeni müşteri = bu dosyanın bir kopyası + fotoğrafların değişmesi. Kod hiç değişmez.
 */

export type Theme = {
  /** Sayfa zemini (kırık beyaz / kum) */
  bg: string;
  /** Ana metin ve dolu butonlar */
  ink: string;
  /** Koyu bölümlerin zemini */
  dark: string;
  /** Koyu bölümlerde metin */
  onDark: string;
  /** Vurgu — hover altı çizgileri, küçük işaretler */
  accent: string;
  /** Grid çizgileri ve ince ayraçlar */
  rule: string;
  /** Başlık font yığını */
  display: string;
  /** Eyebrow / serif aksan */
  serif: string;
  /** Gövde metni */
  body: string;
  /** Başlıkların genişlik ekseni (Archivo variable: 62–125) */
  displayWidth: number;
  /** Görsellerin köşe yarıçapı — 0 = brutalist, 12px = yumuşak */
  radius: string;
};

export type Service = {
  name: string;
  price: string;
  /** Örn. "45 dk" */
  duration?: string;
};

export type ServiceGroup = {
  /** Örn. "SAÇ", "KIDEMLİ STİLİST" */
  title: string;
  note?: string;
  items: Service[];
};

export type Location = {
  name: string;
  address: string[];
  mapsUrl: string;
  phone: string;
  hours: { days: string; time: string }[];
  image: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  source?: string;
};

export type SiteContent = {
  key: string;
  brand: string;
  /** Tarayıcı sekmesi + SEO */
  meta: { title: string; description: string };
  theme: Theme;

  nav: { label: string; href: string }[];
  bookingUrl: string;
  bookingLabel: string;

  hero: {
    /** Satır satır — her satır ayrı animasyonla gelir */
    headline: string[];
    image: string;
    /** Video varsa poster yerine bu oynar */
    video?: string;
    scrollHint: string;
  };

  story: {
    eyebrow: string;
    since: string;
    headline: string[];
    body: string;
    image: string;
    stats: { value: string; label: string }[];
  };

  /** Yatay kayan şerit galerisi */
  strip: { images: string[]; caption: string };

  services: {
    eyebrow: string;
    headline: string[];
    note: string;
    groups: ServiceGroup[];
  };

  work: {
    eyebrow: string;
    headline: string[];
    images: { src: string; label: string }[];
  };

  testimonials: {
    eyebrow: string;
    items: Testimonial[];
    /** Google puanı — sosyal kanıt */
    rating: { score: string; count: string };
  };

  feature: {
    eyebrow: string;
    headline: string[];
    body: string;
    cta: { label: string; href: string };
    image: string;
  };

  locations: {
    eyebrow: string;
    headline: string[];
    items: Location[];
  };

  shout: {
    headlineTop: string;
    headlineBottom: string;
    images: string[];
  };

  footer: {
    /** Dev wordmark — genelde marka adı */
    wordmark: string;
    social: { label: string; href: string }[];
    legal: string;
  };
};
