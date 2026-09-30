import type { SiteContent } from './types';

const BOOK = 'https://wa.me/905000000000?text=Merhaba%2C%20randevu%20almak%20istiyorum.';

export const meraki: SiteContent = {
  key: 'meraki',
  brand: 'MERAKİ',
  meta: {
    title: 'MERAKİ — Kuaför & Güzellik Atölyesi | İzmir',
    description:
      'Saç tasarımı, balyaj, keratin bakım ve cilt ritüelleri. Alsancak ve Bornova’da. Randevunuzu saniyeler içinde alın.',
  },

  theme: {
    bg: '#F6F1E9',
    ink: '#1C1613',
    dark: '#231B16',
    onDark: '#F6F1E9',
    accent: '#B07D46',
    rule: 'rgba(28, 22, 19, 0.14)',
    display: '"Archivo", "Helvetica Neue", Arial, sans-serif',
    serif: '"Instrument Serif", Georgia, serif',
    body: '"Inter", "Helvetica Neue", Arial, sans-serif',
    displayWidth: 100,
    radius: '2px',
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
    headline: ['SAÇINIZ', 'BİR İMZA', 'OLSUN'],
    image: '/img/meraki/hero.jpg',
    scrollHint: 'KAYDIR',
  },

  story: {
    eyebrow: 'Hikâyemiz',
    since: 'Est. 2014',
    headline: ['11 YIL', 'MERAKİ.'],
    body: 'MERAKİ, Yunanca’da “yaptığın işe ruhunu koymak” demektir. 2014’ten bu yana İzmir’de saç ve güzellik hizmetini bir zanaat olarak ele alıyoruz: doğru teşhis, doğru teknik ve acele etmeyen bir ritüel. Alsancak ve Bornova’daki atölyelerimizde her misafire ortalama 75 dakika ayırıyoruz — çünkü iyi saç zaman ister.',
    image: '/img/meraki/story.jpg',
    /* Üç adet: 6 kolonluk grid çizgileriyle tam hizalanıyor. */
    stats: [
      { value: '55K+', label: 'Mutlu misafir' },
      { value: '4.9', label: 'Google puanı' },
      { value: '18', label: 'Stilist' },
    ],
  },

  strip: {
    images: [
      '/img/meraki/work-1.jpg',
      '/img/meraki/interior.jpg',
      '/img/meraki/work-2.jpg',
      '/img/meraki/academy.jpg',
      '/img/meraki/work-3.jpg',
      '/img/meraki/story.jpg',
    ],
    caption: 'İZMİR’DEN, SEVGİYLE',
  },

  services: {
    eyebrow: 'Hizmetlerimiz',
    headline: ['FİYAT', 'LİSTEMİZ.'],
    note: 'Fiyatlar saç boyu ve yoğunluğuna göre değişir. Ücretsiz ön görüşmede net fiyatı birlikte belirliyoruz.',
    groups: [
      {
        title: 'SAÇ TASARIMI',
        note: 'Kesim & şekillendirme',
        items: [
          { name: 'Kadın Saç Kesimi', price: '1.200₺', duration: '60 dk' },
          { name: 'Erkek Saç Kesimi', price: '800₺', duration: '45 dk' },
          { name: 'Fön & Şekillendirme', price: '600₺', duration: '40 dk' },
          { name: 'Özel Gün Topuzu', price: '2.500₺', duration: '90 dk' },
          { name: 'Çocuk Kesimi', price: '500₺', duration: '30 dk' },
        ],
      },
      {
        title: 'RENK',
        note: 'Ücretsiz ön görüşme',
        items: [
          { name: 'Balyaj', price: '4.500₺', duration: '180 dk' },
          { name: 'Ombre / Airtouch', price: '5.200₺', duration: '210 dk' },
          { name: 'Tek Renk Boya', price: '2.200₺', duration: '90 dk' },
          { name: 'Dip Boya', price: '1.400₺', duration: '60 dk' },
          { name: 'Röfle', price: '3.200₺', duration: '150 dk' },
        ],
      },
      {
        title: 'BAKIM & GÜZELLİK',
        note: 'Ritüeller',
        items: [
          { name: 'Keratin Bakım', price: '3.800₺', duration: '120 dk' },
          { name: 'Botoks Bakım', price: '3.200₺', duration: '100 dk' },
          { name: 'Saç Botoksu + Fön', price: '3.600₺', duration: '120 dk' },
          { name: 'Cilt Bakımı', price: '1.500₺', duration: '60 dk' },
          { name: 'Manikür & Pedikür', price: '1.100₺', duration: '75 dk' },
        ],
      },
    ],
  },

  work: {
    eyebrow: 'Portfolyo',
    headline: ['EN İYİ', 'YAPTIĞIMIZ.'],
    images: [
      { src: '/img/meraki/work-1.jpg', label: 'Karamel Balyaj' },
      { src: '/img/meraki/work-2.jpg', label: 'Keskin Bob' },
      { src: '/img/meraki/work-3.jpg', label: 'Bakır Bukle' },
    ],
  },

  testimonials: {
    eyebrow: 'Misafirlerimiz',
    rating: { score: '4.9', count: '2.180 Google değerlendirmesi' },
    items: [
      {
        quote:
          'Balyaj için üç farklı yerde hayal kırıklığına uğradıktan sonra buradayım. İlk kez saçımın rengi istediğim gibi çıktı — ve altı ay sonra hâlâ güzel duruyor.',
        author: 'Zeynep D.',
        source: 'Google',
      },
      {
        quote:
          'Acele ettirilmediğiniz bir yer. Önce saçınızı dinliyorlar, sonra ne yapacaklarını anlatıyorlar. Fiyat da baştan net söyleniyor.',
        author: 'Elif T.',
        source: 'Google',
      },
      {
        quote:
          'Eşimle birlikte gidiyoruz, ikimiz de aynı gün halloluyoruz. Mekân da insanı rahatlatıyor, kahve ikramı ayrı güzel.',
        author: 'Burak S.',
        source: 'Google',
      },
    ],
  },

  feature: {
    eyebrow: 'MERAKİ Akademi',
    headline: ['ZANAATI', 'BİRLİKTE', 'BÜYÜTELİM'],
    body: 'Renk teorisi, balyaj tekniği ve saç teşhisi üzerine 6 haftalık uygulamalı program. Kontenjan her dönem 12 kişiyle sınırlıdır.',
    cta: { label: 'DETAYLI BİLGİ', href: '#iletisim' },
    image: '/img/meraki/academy.jpg',
  },

  locations: {
    eyebrow: 'İzmir’den, sevgiyle',
    headline: ['2 ATÖLYE,', 'AYNI ÖZEN.'],
    items: [
      {
        name: 'ALSANCAK',
        address: ['Kıbrıs Şehitleri Cad. No:78', 'Konak, İzmir', '35220'],
        mapsUrl: 'https://maps.google.com/?q=K%C4%B1br%C4%B1s+%C5%9Eehitleri+Caddesi+Alsancak+%C4%B0zmir',
        phone: '+90 232 000 00 00',
        hours: [
          { days: 'Pazartesi — Cuma', time: '09:30 — 20:00' },
          { days: 'Cumartesi', time: '09:30 — 19:00' },
          { days: 'Pazar', time: '11:00 — 17:00' },
        ],
        image: '/img/meraki/interior.jpg',
      },
      {
        name: 'BORNOVA',
        address: ['Mustafa Kemal Cad. No:15', 'Bornova, İzmir', '35040'],
        mapsUrl: 'https://maps.google.com/?q=Mustafa+Kemal+Caddesi+Bornova+%C4%B0zmir',
        phone: '+90 232 000 00 01',
        hours: [
          { days: 'Pazartesi — Cuma', time: '09:30 — 20:00' },
          { days: 'Cumartesi', time: '09:30 — 19:00' },
          { days: 'Pazar', time: 'Kapalı' },
        ],
        image: '/img/meraki/academy.jpg',
      },
    ],
  },

  shout: {
    headlineTop: 'BİZE',
    headlineBottom: 'YAZIN',
    images: [
      '/img/meraki/grid-1.jpg',
      '/img/meraki/grid-2.jpg',
      '/img/meraki/grid-3.jpg',
      '/img/meraki/grid-4.jpg',
      '/img/meraki/grid-5.jpg',
      '/img/meraki/grid-6.jpg',
    ],
  },

  footer: {
    wordmark: 'MERAKİ',
    social: [
      { label: 'INSTAGRAM', href: 'https://instagram.com' },
      { label: 'TIKTOK', href: 'https://tiktok.com' },
      { label: 'WHATSAPP', href: BOOK },
    ],
    legal: '© MERAKİ Kuaför & Güzellik 2026',
  },
};
