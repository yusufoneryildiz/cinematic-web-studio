/**
 * Bir lüks konut projesinin tüm içeriği. Yeni müşteri = yeni içerik dosyası;
 * bileşenler hiç değişmez. Her alanın yanında ne işe yaradığı yazıyor.
 */
export type SiteContent = {
  /** URL anahtarı: /?proje=koru */
  key: string;
  /** Wordmark'ın iki parçası: "KORU" + "№9". İkisi ayrı yazılıyor ki № farklı ağırlıkta çizilsin. */
  brand: { name: string; number: string };
  meta: { title: string; description: string };
  theme: {
    /** Marka rengi — zorge'da bronz. Sadece logo ve nadir vurgularda kullanılır. */
    accent: string;
  };
  /** Satış ekibinin WhatsApp/telefon bağlantısı */
  ctaUrl: string;
  ctaLabel: string;
  phone: string;
  nav: { label: string; href: string }[];

  hero: {
    tagline: string[];
    image: string;
    /** Şeffaf arka planlı model/kişi fotoğrafı (opsiyonel) */
    model?: string;
  };

  about: {
    heading: string[];
    image: string;
    cardPrimary: string;
    cardSecondary: { eyebrow: string; title: string; action: string };
  };

  location: {
    eyebrow: string;
    text: string;
    heading: string;
    cards: { image: string; label: string }[];
    map: {
      heading: string;
      /** Harita üstündeki noktalar — yüzde koordinat (0–100) */
      pins: { x: number; y: number; label: string; main?: boolean }[];
    };
  };

  panorama: { heading: string[]; text: string; image: string };

  architecture: {
    heading: string;
    text: string;
    wide: string;
    lightingEyebrow: string;
    lightingText: string;
    detail: string;
    tall: string;
    materialsHeading: string[];
    materialsText: string;
    swatches: string[];
    materialImages: [string, string];
  };

  gallery: { heading: string; count: string; action: string; images: string[] };

  daily: {
    heading: string;
    slots: { time: string; image: string; text: string }[];
  };

  lobby: { heading: string[]; text: string; image: string };

  advantages: {
    heading: string;
    items: { title: string[]; text: string; image: string }[];
  };

  fitness: {
    heading: string[];
    pool: { image: string; text: string };
    items: { image: string; text: string }[];
    yoga: { image: string; text: string };
  };

  infrastructure: {
    heading: string;
    background: string;
    items: { title: string[]; text: string; image: string }[];
  };

  park: { heading: string[]; text: string; images: [string, string] };

  apartments: {
    heading: string[];
    text: string;
    background: string;
    types: { label: string; area: string; plan: 'studio' | 'one' | 'two' | 'three' | 'terrace' | 'penthouse' }[];
    terms: string;
  };

  services: {
    heading: string[];
    items: { title: string; text: string; image?: string }[];
  };

  penthouse: { heading: string[]; text: string; images: [string, string] };

  specs: { value: string; unit: string; label: string; image: string }[];

  closing: { heading: string[]; text: string; image: string };

  footer: { rights: string; credit: string; social: { label: string; href: string }[] };
};
