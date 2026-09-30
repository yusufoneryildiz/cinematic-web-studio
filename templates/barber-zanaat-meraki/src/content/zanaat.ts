import type { SiteContent } from './types';

const BOOK = 'https://wa.me/905000000000?text=Merhaba%2C%20randevu%20almak%20istiyorum.';

export const zanaat: SiteContent = {
  key: 'zanaat',
  brand: 'ZANAAT',
  meta: {
    title: 'ZANAAT — Premium Erkek Kuaförü | İstanbul',
    description:
      'Keskin fade, klasik ustura traşı ve modern erkek saç tasarımı. Nişantaşı ve Kadıköy’de. Randevunuzu saniyeler içinde alın.',
  },

  theme: {
    bg: '#F4F2ED',
    ink: '#0A090C',
    dark: '#0A0A0A',
    onDark: '#F4F2ED',
    accent: '#C84B2A',
    rule: 'rgba(10, 9, 12, 0.13)',
    display: '"Archivo", "Helvetica Neue", Arial, sans-serif',
    serif: '"Instrument Serif", Georgia, serif',
    body: '"Inter", "Helvetica Neue", Arial, sans-serif',
    displayWidth: 112,
    radius: '0px',
  },

  nav: [
    { label: 'HİKÂYE', href: '#hikaye' },
    { label: 'HİZMETLER', href: '#hizmetler' },
    { label: 'İŞLERİMİZ', href: '#isler' },
    { label: 'ŞUBELER', href: '#subeler' },
    { label: 'İLETİŞİM', href: '#iletisim' },
  ],
  bookingUrl: BOOK,
  bookingLabel: 'RANDEVU AL',

  hero: {
    headline: ['SADECE BİR', 'BERBER', 'DEĞİL'],
    image: '/img/zanaat/hero.jpg',
    scrollHint: 'KAYDIR',
  },

  story: {
    eyebrow: 'Hikâyemiz',
    since: 'Est. 2016',
    headline: ['9 YIL', 'ZANAAT.'],
    body: 'ZANAAT, geleneksel berberliğin ustalığını çağdaş erkek saç tasarımıyla birleştiren bir atölyedir. 2016’dan bu yana İstanbul’da erkek bakımının standardını yeniden tanımlıyoruz. Nişantaşı ve Kadıköy’deki iki şubemizde bugüne kadar 40.000’den fazla misafiri ağırladık — ve her birini aynı özenle uğurladık.',
    image: '/img/zanaat/story.jpg',
    /* Üç adet: 6 kolonluk grid çizgileriyle tam hizalanıyor. */
    stats: [
      { value: '40K+', label: 'Mutlu misafir' },
      { value: '4.9', label: 'Google puanı' },
      { value: '12', label: 'Usta berber' },
    ],
  },

  strip: {
    images: [
      '/img/zanaat/work-1.jpg',
      '/img/zanaat/interior.jpg',
      '/img/zanaat/work-2.jpg',
      '/img/zanaat/academy.jpg',
      '/img/zanaat/work-3.jpg',
      '/img/zanaat/story.jpg',
    ],
    caption: 'İSTANBUL’DAN, SEVGİYLE',
  },

  services: {
    eyebrow: 'Hizmetlerimiz',
    headline: ['FİYAT', 'LİSTEMİZ.'],
    note: 'Fiyatlar başlangıç fiyatlarıdır ve stiliste göre değişebilir. Tüm fiyatlara KDV dahildir.',
    groups: [
      {
        title: 'KIDEMLİ STİLİST',
        note: 'Başlangıç fiyatı',
        items: [
          { name: 'Saç Kesimi', price: '900₺', duration: '45 dk' },
          { name: 'Makas Kesim', price: '1.100₺', duration: '60 dk' },
          { name: 'Sakal Tasarımı', price: '550₺', duration: '30 dk' },
          { name: 'Saç + Sakal', price: '1.200₺', duration: '70 dk' },
          { name: 'Çocuk Kesimi', price: '650₺', duration: '30 dk' },
        ],
      },
      {
        title: 'STİLİST',
        note: 'Müsaitliğe göre',
        items: [
          { name: 'Saç Kesimi', price: '700₺', duration: '45 dk' },
          { name: 'Makas Kesim', price: '850₺', duration: '60 dk' },
          { name: 'Sakal Tasarımı', price: '400₺', duration: '30 dk' },
          { name: 'Saç + Sakal', price: '950₺', duration: '70 dk' },
          { name: 'Çocuk Kesimi', price: '500₺', duration: '30 dk' },
        ],
      },
      {
        title: 'BAKIM & RİTÜEL',
        note: 'Tüm stilistlerde',
        items: [
          { name: 'Sıcak Havlu Ustura Traşı', price: '750₺', duration: '40 dk' },
          { name: 'Saç Boyası / Beyaz Kapatma', price: '1.400₺', duration: '75 dk' },
          { name: 'Keratin Bakım', price: '1.800₺', duration: '90 dk' },
          { name: 'Yüz Bakımı', price: '900₺', duration: '45 dk' },
          { name: 'Kaş & Detay', price: '250₺', duration: '15 dk' },
        ],
      },
    ],
  },

  work: {
    eyebrow: 'Portfolyo',
    headline: ['EN İYİ', 'YAPTIĞIMIZ.'],
    images: [
      { src: '/img/zanaat/work-1.jpg', label: 'Dokulu Crop' },
      { src: '/img/zanaat/work-2.jpg', label: 'Modern Mullet' },
      { src: '/img/zanaat/work-3.jpg', label: 'Skin Fade' },
    ],
  },

  testimonials: {
    eyebrow: 'Misafirlerimiz',
    rating: { score: '4.9', count: '1.240 Google değerlendirmesi' },
    items: [
      {
        quote:
          'İstanbul’da yıllardır aradığım yeri buldum. Fade konusunda gerçekten usta işi — ve randevu sistemi dakikası dakikasına işliyor.',
        author: 'Mert K.',
        source: 'Google',
      },
      {
        quote:
          'Sadece saç kesimi değil, baştan sona bir deneyim. Sıcak havlu traşını herkesin en az bir kez denemesi lazım.',
        author: 'Emre A.',
        source: 'Google',
      },
      {
        quote:
          'Üç yıldır başka yere gitmiyorum. Ne istediğimi anlatmama gerek kalmıyor, oturduğum an biliyorlar.',
        author: 'Can Y.',
        source: 'Google',
      },
    ],
  },

  feature: {
    eyebrow: 'ZANAAT Akademi',
    headline: ['MESLEĞİ', 'USTASINDAN', 'ÖĞREN'],
    body: 'Berberlik bir meslekten fazlası. 8 haftalık atölye programımızda fade, makas tekniği, sakal tasarımı ve müşteri iletişimini sahada öğrenin.',
    cta: { label: 'DETAYLI BİLGİ', href: '#iletisim' },
    image: '/img/zanaat/academy.jpg',
  },

  locations: {
    eyebrow: 'İstanbul’dan, sevgiyle',
    headline: ['2 ŞUBE,', 'AYNI USTALIK.'],
    items: [
      {
        name: 'NİŞANTAŞI',
        address: ['Teşvikiye Cad. No:42', 'Şişli, İstanbul', '34365'],
        mapsUrl: 'https://maps.google.com/?q=Te%C5%9Fvikiye+Caddesi+%C5%9Ei%C5%9Fli+%C4%B0stanbul',
        phone: '+90 212 000 00 00',
        hours: [
          { days: 'Pazartesi — Cuma', time: '10:00 — 21:00' },
          { days: 'Cumartesi', time: '10:00 — 20:00' },
          { days: 'Pazar', time: '12:00 — 18:00' },
        ],
        image: '/img/zanaat/interior.jpg',
      },
      {
        name: 'KADIKÖY',
        address: ['Moda Cad. No:118', 'Kadıköy, İstanbul', '34710'],
        mapsUrl: 'https://maps.google.com/?q=Moda+Caddesi+Kad%C4%B1k%C3%B6y+%C4%B0stanbul',
        phone: '+90 216 000 00 00',
        hours: [
          { days: 'Pazartesi — Cuma', time: '10:00 — 21:00' },
          { days: 'Cumartesi', time: '10:00 — 20:00' },
          { days: 'Pazar', time: 'Kapalı' },
        ],
        image: '/img/zanaat/academy.jpg',
      },
    ],
  },

  shout: {
    headlineTop: 'BİZE',
    headlineBottom: 'SESLEN',
    images: [
      '/img/zanaat/grid-1.jpg',
      '/img/zanaat/grid-2.jpg',
      '/img/zanaat/grid-3.jpg',
      '/img/zanaat/grid-4.jpg',
      '/img/zanaat/grid-5.jpg',
      '/img/zanaat/grid-6.jpg',
    ],
  },

  footer: {
    wordmark: 'ZANAAT',
    social: [
      { label: 'INSTAGRAM', href: 'https://instagram.com' },
      { label: 'TIKTOK', href: 'https://tiktok.com' },
      { label: 'WHATSAPP', href: BOOK },
    ],
    legal: '© ZANAAT Barber Co. 2026',
  },
};
