import type { SiteContent } from './types';

const img = (n: string) => `/img/koru/${n}.jpg`;

/**
 * KORU №9 — kurgusal bir İstanbul lüks konut projesi. Demo içeriği.
 * Gerçek müşteride: gerçek proje adı, gerçek m² ve gerçek fotoğraflar.
 */
export const koru: SiteContent = {
  key: 'koru',
  brand: { name: 'KORU', number: '№9' },
  meta: {
    title: 'KORU №9 — Ayrıcalıkların Evi | Lüks Rezidans',
    description:
      'Boğaz manzaralı, New York tarzı üç kule. Beş yıldızlı otel servisi, özel park, 25 metrelik havuz. Statünüzün vücut bulmuş hâli.',
  },
  theme: { accent: '#A0725B' },
  ctaUrl: 'https://wa.me/905000000000?text=Merhaba%2C%20KORU%20%E2%84%969%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
  ctaLabel: 'Daire Seçin',
  phone: '+90 212 000 00 09',
  nav: [
    { label: 'Proje', href: '#about' },
    { label: 'Konum', href: '#location' },
    { label: 'Mimari', href: '#architecture' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'Ayrıcalıklar', href: '#advantages' },
    { label: 'Daireler', href: '#apartments' },
    { label: 'İletişim', href: '#contact' },
  ],

  hero: {
    tagline: ['Premium rezidans —', 'statünüzün', 'vücut bulmuş hâli'],
    image: img('hero'),
    model: '/img/koru/hero-model.png',
  },

  about: {
    heading: ['Hayat, sizin', 'şartlarınızla'],
    image: img('about'),
    cardPrimary: 'Proje hakkında',
    cardSecondary: { eyebrow: 'Taksit ve konut kredisi', title: 'Özel teklifler', action: 'İncele' },
  },

  location: {
    eyebrow: 'Konum ayrıcalığı',
    text:
      'Şehrin gökdelenleri ve ikonik silueti ayaklarınızın altında. İstanbul, önünüzde sonsuz fırsatlardan örülü bir buket gibi açılıyor.',
    heading: 'Konum',
    cards: [
      { image: img('loc-park'), label: 'Yürüyüş parkı' },
      { image: img('loc-school'), label: 'Okul' },
      { image: img('loc-sport'), label: 'Spor merkezi' },
      { image: img('loc-sea'), label: 'Sahil' },
      { image: img('loc-rest'), label: 'Restoranlar' },
    ],
    map: {
      heading: 'Bölge haritası',
      pins: [
        { x: 50, y: 52, label: 'KORU №9', main: true },
        { x: 30, y: 36, label: 'Koru parkı' },
        { x: 66, y: 28, label: 'Özel okul' },
        { x: 20, y: 66, label: 'Marina' },
        { x: 74, y: 62, label: 'Spor kulübü' },
        { x: 58, y: 80, label: 'Metro' },
        { x: 84, y: 44, label: 'Alışveriş' },
      ],
    },
  },

  panorama: {
    heading: ['Size uyum', 'sağlayan bir dünya'],
    text:
      'Bu yalnızca üç lüks bina ve bir grand otelin premium servisi değil. Gerçekliğin sizin kurallarınızla oynadığı, arzularınızı takip ettiği bir ev.',
    image: img('panorama'),
  },

  architecture: {
    heading: 'Mimari',
    text:
      'Zarif New York gökdelenleri tarzında üç bina; inceliğin ve modern yaşam yaklaşımının kusursuz birleşimini yansıtıyor.',
    wide: img('arch-1'),
    lightingEyebrow: 'Aydınlatma',
    lightingText: 'Panoramik pencereler ve mimari aydınlatma',
    detail: img('arch-2'),
    tall: img('arch-3'),
    materialsHeading: ['Premium', 'malzemeler'],
    materialsText:
      'Lüks, kaplama malzemelerinin her detayında vücut buluyor. Porselen taşın zarif deseninde, çerçevelerin altınında ve avizelerin kristal şelalesinde saklı.',
    swatches: [1, 2, 3, 4, 5, 6, 7].map((n) => img(`swatch-${n}`)),
    materialImages: [img('mat-1'), img('mat-2')],
  },

  gallery: {
    heading: 'Galeri',
    count: '/11 fotoğraf',
    action: 'İncele',
    images: [1, 2, 3, 4, 5, 6].map((n) => img(`gal-${n}`)),
  },

  daily: {
    heading: 'Günlük ritim',
    slots: [
      {
        time: '07:00',
        image: img('day-1'),
        text: 'Şehir panoramik pencerelerde önünüzde açılırken şafağın ilk ışıklarının tadını çıkarın; evinizi ışık ve dinginlik doldursun.',
      },
      {
        time: '08:00',
        image: img('day-2'),
        text: 'Sabahınıza açık havada yogayla başlayın. Temiz hava, yumuşak güneş ve ritimle akan hareketler. Burada telaş yok — yalnızca siz ve mükemmel bir başlangıç.',
      },
      {
        time: '11:00',
        image: img('day-3'),
        text: 'İlk adımdan itibaren ilgiyi hissedin. Lobide ekip; ulaşım organizasyonundan rezervasyonlara, günlük küçük işlere kadar her şeyi sizin için çözüyor.',
      },
      {
        time: '14:00',
        image: img('day-4'),
        text: 'Özel co-working alanında çalışmak için kusursuz anı yaratın. Odaklanın, müşterinizle görüşün ya da ekibinizle stratejiyi konuşun.',
      },
      {
        time: '21:00',
        image: img('day-5'),
        text: 'Günü büyük lobideki çay salonunda bitirin. Her jest bir ritüelin parçası: aceleye yer olmayan, bilinçli, sessizlikle dolu bir akşam seremonisi.',
      },
    ],
  },

  lobby: {
    heading: ['Deneyimin', 'lüksü'],
    text:
      'Lobinin sofistike tasarımı ünlü grand otellerin iç mekânlarından ilham alıyor: iki metrelik aynalar, koyu parlak taş duvarlar, kristal şelale avizeler.',
    image: img('lobby'),
  },

  advantages: {
    heading: 'Ayrıcalıklar',
    items: [
      {
        title: ['Lobi'],
        text: 'Ferah ve zarif lobiler, kusursuz iç mekânları ve samimi lounge alanıyla sakinleri karşılıyor. Dünyanın en iyi otellerinden aşina olduğunuz rafine konfor atmosferine dalın.',
        image: img('adv-1'),
      },
      {
        title: ['Konsiyerj', 'servisi'],
        text: 'Zamanınızı ve konforunuzu düşünen kişisel bir asistan. Ulaşım düzenlemeleri, bilet rezervasyonları ya da günlük işler — hepsi özen ve profesyonellikle halledilir.',
        image: img('adv-2'),
      },
      {
        title: ['Çocuk', 'kulübü'],
        text: 'Oyun oynamak, her şeyi unutmak, arkadaşlarla sır paylaşmak, çizgi film kahramanları çizmek — çocuk odası bambaşka bir dünyanın kapısını aralıyor.',
        image: img('adv-3'),
      },
      {
        title: ['Co-working', 'alanı'],
        text: 'Parlak bir iş fikriniz varsa evden çıkmadan tartışın. Yüksek panoramik pencereli ferah toplantı odaları projenizi en iyi ışıkta sunmanıza yardım eder.',
        image: img('adv-4'),
      },
      {
        title: ['Şömineli ve fıskiyeli', 'avlu lounge'],
        text: 'Kompleksin tam kalbinde saklı bir köşe. Yeşillik, şık tasarım çözümleri ve samimi dinlenme alanları huzur ve uyum atmosferi yaratıyor.',
        image: img('adv-5'),
      },
    ],
  },

  fitness: {
    heading: ['25 metrelik', 'havuzlu', 'fitness kulübü'],
    pool: {
      image: img('fit-1'),
      text: 'Spor ve lüks, 3 kulvarlı 25 metrelik ferah havuzun tasarımında buluşuyor. Kristal berraklığında su, yumuşak şezlonglar, kontürleri eriten ışık. Sportif şıklıkta aktif bir antrenman, detoks kokteyliyle rahat bir dinlenme ya da dalgaların sesiyle meditasyon — bugün hangisi?',
    },
    items: [
      {
        image: img('fit-2'),
        text: 'Saunada ahşabın dingin kokusu ve sıcak taşların çıtırtısı gücünüzü geri veriyor; istediğiniz her gün bir tatil köyü atmosferi.',
      },
      {
        image: img('fit-3'),
        text: 'Yapay zekâlı akıllı aletler güzelliğinizi, gücünüzü ve esnekliğinizi korumanıza yardım ediyor. Barfiksli crossover, güç kafesleri, butterfly — burada fitness premium oluyor.',
      },
      {
        image: img('fit-4'),
        text: 'Demir gibi bir özgüven hissedin. Gereken tek şey boks salonuna inmek: dengeli deri kum torbaları, Thai boks torbaları, koordinasyon ve çeviklik için modern ekipman.',
      },
    ],
    yoga: {
      image: img('fit-5'),
      text: 'Yoga stüdyosu gevşemeye yumuşak bir geçiş sunuyor; zihin ve beden uyuma kavuşuyor. Loş ışık, eğitmenin dingin sesi ve hareketlerin sakin ritmi dengenizi bulmanıza yardım ediyor.',
    },
  },

  infrastructure: {
    heading: 'Altyapı',
    background: img('infra-bg'),
    items: [
      {
        title: ['Restoran', 've bar'],
        text: 'Büyüleyici güzellikteki restoran imza lezzetleri ve özenle seçilmiş şarap koleksiyonuyla sizi fethedecek. Burada zaman durur; duyularınıza tamamen kapılırsınız.',
        image: img('infra-1'),
      },
      {
        title: ['Güzellik', 'salonu'],
        text: 'Parlak güzellik trendleri ve yeni klasikler, Hollywood dalgaları ve yaratıcı renklendirme, profesyonel cilt bakımı — salonun ustaları hepsini ve fazlasını yapabiliyor.',
        image: img('infra-2'),
      },
      {
        title: ['Spa &', 'pet grooming'],
        text: 'Tüylü dostunuza yaratıcı bir kesim ya da spa mı istiyorsunuz? Profesyonel grooming ile bakım çok kolay. Dostunuzun konforu için her şey yürüme mesafesinde.',
        image: img('infra-3'),
      },
    ],
  },

  park: {
    heading: ['Özel', '8 dönümlük park'],
    text:
      'Temiz hava ve kuş sesleri sizi kendi parkınıza götürüyor. Burada gür akçaağaçlar rüzgârda hışırdıyor, huş dalları usulca sallanıyor. Boş zamanın doğası, planlarınızın özgürlüğünde vücut buluyor.',
    images: [img('park-1'), img('park-2')],
  },

  apartments: {
    heading: ['Görkemli', 'daireler'],
    text:
      'Rafine kaplamalar, neoklasik mobilyalar ve her detaya işlenmiş güzellik — bu dairelerin atmosferi size tekrar tekrar içine dalma isteği veriyor. Salonunuzun duvarında bir suluboya manzaraya dönüşen, şehrin görkemli silüetine nefes kesen bakışlar.',
    background: img('apt-hero'),
    types: [
      { label: 'Stüdyo', area: '26–30 m²', plan: 'studio' },
      { label: '1+1', area: '36–65 m²', plan: 'one' },
      { label: '2+1', area: '56–67 m²', plan: 'two' },
      { label: '3+1', area: '64–80 m²', plan: 'three' },
      { label: 'Teraslı', area: '67–81 m²', plan: 'terrace' },
      { label: 'Penthouse', area: '60–150 m²', plan: 'penthouse' },
    ],
    terms: 'Satın alma koşulları: konut kredisi, %0 taksit, takas',
  },

  services: {
    heading: ['Teknoloji', 've hizmetler'],
    items: [
      {
        title: 'Akıllı asansör',
        text: 'Akıllı sistem sakinin eve döndüğünü bağımsız olarak algılar ve asansörü doğru kata çağırır.',
        image: img('svc-2'),
      },
      {
        title: 'Ev kontrol merkezi',
        text: 'Aydınlatma, iklim, perdeler ve güvenlik tek panelden; sesle ya da telefondan yönetilir.',
        image: img('svc-1'),
      },
      {
        title: 'Güvenlik merkezi',
        text: 'Kompleksteki kameralar verileri tek bir kontrol odasına iletir; yazılım mühendislik iletişimini toplar ve işler.',
      },
      {
        title: 'Beş yıldızlı servis',
        text: 'Kuru temizleme, ev temizliği, araç yıkama ve valet park — hepsi tek bir çağrıyla, lobiden.',
      },
    ],
  },

  penthouse: {
    heading: ['Cam çatılı', "penthouse'lar"],
    text:
      'En tepeye tırmanın; çok daha yakınlaşan gökyüzüne bakın ve yıldızların arasında yerinizi alın. Penthouse sahipleri tüm ölçülere erişiyor: ufkun yüksekliğine, panoramanın genişliğine ve hayranlığın uzunluğuna.',
    images: [img('pent-1'), img('pent-2')],
  },

  specs: [
    { value: '4.2', unit: 'M', label: 'Tavan yüksekliği', image: img('spec-1') },
    { value: '3.6', unit: 'M', label: 'Pencere yüksekliği', image: img('spec-2') },
  ],

  closing: {
    heading: ['Dairenizi', 'seçin'],
    text: 'Satış ofisimiz her gün 10:00 – 20:00 arası açık. Özel sunum için randevu alın.',
    image: img('closing'),
  },

  footer: {
    rights: '© 2026 KORU №9. Tüm hakları saklıdır.',
    credit: 'Demo — gerçek bir proje değildir.',
    social: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'YouTube', href: 'https://youtube.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
};
