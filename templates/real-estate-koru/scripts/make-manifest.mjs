/**
 * fal.ai görsel manifestini üretir: node scripts/make-manifest.mjs
 * Sonra: node scripts/gen-images.mjs
 */
import fs from 'node:fs';

const S =
  ', cinematic editorial real estate photography, warm bronze and deep navy color grade, soft film grain, ultra detailed, no text, no logos, no watermark';
const EXT =
  'elegant dark-brick New York style residential tower with warm bronze LED cornice lighting along the roofline, Istanbul';
const INT =
  'neoclassical luxury interior, dark glossy stone walls, brass details, crystal chandelier, warm ambient light';

const items = [
  ['koru/hero-model', '3:4', 'Editorial fashion portrait of an elegant woman in a black satin strapless evening gown, dark hair in a sleek low bun, statement earrings, red lips, looking over her shoulder, standing against a pure solid black background, studio lighting from the side, full upper body, luxury advertising campaign' + S],
  ['koru/about', '16:9', 'Close-up architectural photograph at dusk of the upper floors of an ' + EXT + ', golden reflections of sunset in the tall windows, city lights below, drone perspective' + S],
  ['koru/loc-park', '3:4', 'Photograph of a couple walking on a tree-lined path in a manicured park at golden hour, Istanbul, autumn maples, soft backlight' + S],
  ['koru/loc-school', '3:4', 'Photograph of a modern private school building facade with glass and warm wood, children walking in with parents, morning light' + S],
  ['koru/loc-sport', '3:4', 'Photograph of a premium indoor tennis court with a woman serving, glass roof, morning light' + S],
  ['koru/loc-sea', '3:4', 'Photograph of the Bosphorus waterfront promenade at sunset, a person jogging, boats, warm light on water' + S],
  ['koru/loc-rest', '3:4', 'Photograph of an elegant restaurant terrace at night with candles, waiter pouring wine, city lights bokeh' + S],
  ['koru/panorama', '16:9', 'Photograph of a stylish couple in evening wear embracing on a rooftop terrace at dusk, panoramic Istanbul skyline and Bosphorus behind them, wide shot, romantic cinematic' + S],
  ['koru/arch-1', '16:9', 'Wide architectural photograph at sunset of three ' + EXT + ' towers rising above a low-rise neighbourhood, dramatic sky' + S],
  ['koru/arch-2', '1:1', 'Detail photograph of a ' + EXT + ' rooftop corner, warm LED strip glowing along the cornice, twilight sky, string lights below' + S],
  ['koru/arch-3', '3:4', 'Low angle photograph looking straight up at a ' + EXT + ', twilight sky, glowing warm windows' + S],
  ['koru/mat-1', '3:4', 'Photograph of a luxury lobby detail: white orchids on a black marble console, brass framed mirror, ' + INT + S],
  ['koru/mat-2', '3:4', 'Photograph of a row of tall brushed brass cylinder pendant lamps glowing against a dark marble wall, ' + INT + S],
  ['koru/swatch-1', '1:1', 'Macro photograph of polished black marble with gold veins, luxury material texture' + S],
  ['koru/swatch-2', '1:1', 'Macro photograph of brushed brass metal surface with fine grain, warm reflections' + S],
  ['koru/swatch-3', '1:1', 'Macro photograph of dark walnut wood veneer with fine grain, satin finish' + S],
  ['koru/swatch-4', '1:1', 'Macro photograph of white calacatta porcelain stoneware with soft grey veins' + S],
  ['koru/swatch-5', '1:1', 'Macro photograph of faceted crystal chandelier drops catching warm light' + S],
  ['koru/swatch-6', '1:1', 'Macro photograph of bronze woven metal mesh panel with warm backlight' + S],
  ['koru/swatch-7', '1:1', 'Macro photograph of cognac full-grain leather upholstery with stitching' + S],
  ['koru/gal-1', '3:4', 'Photograph of a grand hotel style residential lobby, ' + INT + ', tall mirrors, reception desk' + S],
  ['koru/gal-2', '1:1', 'Photograph of a luxury living room with floor to ceiling windows overlooking the Bosphorus at dusk, neoclassical furniture, fireplace' + S],
  ['koru/gal-3', '16:9', 'Photograph of the ' + EXT + ' courtyard at night with a sculptural fountain, lit landscaping, benches' + S],
  ['koru/gal-4', '3:4', 'Photograph of a marble bathroom with freestanding bathtub, brass fixtures, city view window at night' + S],
  ['koru/gal-5', '1:1', 'Photograph of a children playroom with wooden slide and soft play area, warm pastel palette, premium finishes' + S],
  ['koru/gal-6', '3:4', 'Photograph of a family with two children laughing in an elegant living room, golden hour window light' + S],
  ['koru/day-1', '16:9', 'Photograph of dawn light entering a luxury bedroom through panoramic windows with a view of Istanbul and the Bosphorus, silk bedding, soft pink sky' + S],
  ['koru/day-2', '16:9', 'Photograph of a woman doing yoga at sunrise on a rooftop terrace with wooden deck, city skyline behind, soft warm light' + S],
  ['koru/day-3', '16:9', 'Photograph of a concierge in a dark suit greeting a resident in a grand hotel style lobby, ' + INT + S],
  ['koru/day-4', '16:9', 'Photograph of a private co-working lounge with tall panoramic windows, walnut tables, a businessman on a call, warm afternoon light' + S],
  ['koru/day-5', '16:9', 'Photograph of an intimate tea room at night, brass tea set on black marble, low warm lamps, velvet armchairs, ' + INT + S],
  ['koru/lobby', '16:9', 'Wide photograph of a grand residential lobby inspired by classic grand hotels, two-meter mirrors, dark glossy stone walls, cascading crystal chandeliers, a woman in a black dress walking through, ' + INT + S],
  ['koru/adv-1', '3:4', 'Photograph of a woman in a white silk blouse reading a tablet in a luxurious lobby lounge, coffee on a marble table, ' + INT + S],
  ['koru/adv-2', '3:4', 'Photograph of a smiling concierge woman handing keys to a resident in a lobby with white orchids, ' + INT + S],
  ['koru/adv-3', '3:4', 'Photograph of a bright children room with bookshelves, a wooden slide and a small tent, two children playing, premium finishes' + S],
  ['koru/adv-4', '3:4', 'Photograph of a man in a blue blazer on a phone in a leather armchair in a library-style meeting room, walnut shelves, warm lamp' + S],
  ['koru/adv-5', '3:4', 'Photograph of four friends laughing at an outdoor courtyard lounge at night beside a fire pit, string lights, greenery' + S],
  ['koru/fit-1', '16:9', 'Photograph of a woman floating in a 25 meter indoor swimming pool with dark stone walls and warm underwater lighting, luxury residential spa' + S],
  ['koru/fit-2', '3:4', 'Photograph of a woman in a black swimsuit sitting in a warm wooden sauna, soft light through cedar slats' + S],
  ['koru/fit-3', '3:4', 'Photograph of a woman in black sportswear training on a cable machine in a premium gym with dark walls and warm lighting, tall windows' + S],
  ['koru/fit-4', '3:4', 'Photograph of a man in boxing gloves hitting a leather heavy bag in a dark premium boxing gym, dramatic warm rim light' + S],
  ['koru/fit-5', '16:9', 'Photograph of a woman in a yoga pose on a mat in a serene yoga studio with walnut slat walls and soft daylight' + S],
  ['koru/infra-bg', '16:9', 'Photograph at night of the ground floor of an ' + EXT + ', boutique shopfronts with warm light, trees with string lights, people strolling' + S],
  ['koru/infra-1', '3:4', 'Photograph of an elegant restaurant interior with a wine wall, red velvet chairs, brass lamps, ' + INT + S],
  ['koru/infra-2', '3:4', 'Photograph of a luxury beauty salon interior with gold mirrors, marble stations, a stylist working' + S],
  ['koru/infra-3', '3:4', 'Photograph of a small white poodle being groomed in a premium pet spa with marble counters and warm light' + S],
  ['koru/park-1', '16:9', 'Photograph of a private residential park with a sculptural fountain, maple and birch trees, evening lit paths, ' + EXT + ' in background' + S],
  ['koru/park-2', '3:4', 'Photograph of a woman with a golden retriever walking under birch trees on a stone path, golden hour, lush greenery' + S],
  ['koru/apt-hero', '16:9', 'Photograph of a refined neoclassical living room with marble fireplace, velvet sofas, floor to ceiling windows framing Istanbul skyline at dusk, ' + INT + S],
  ['koru/svc-1', '3:4', 'Photograph of a hand pressing a brass smart home panel on a dark marble wall, warm backlight, close-up' + S],
  ['koru/svc-2', '3:4', 'Photograph of a luxury elevator interior with bronze mirror walls, a woman in a black coat, warm light' + S],
  ['koru/pent-1', '16:9', 'Photograph at night of a penthouse living room with a glass roof showing the night sky, suspended black fireplace, cream armchairs, city lights through tall windows' + S],
  ['koru/pent-2', '3:4', 'Photograph of a woman in a black evening dress standing at a floor to ceiling window at night, city lights, penthouse interior' + S],
  ['koru/spec-1', '1:1', 'Photograph of a luxury bedroom with 4 meter high ceilings, tall curtains, upholstered headboard, morning light' + S],
  ['koru/spec-2', '1:1', 'Photograph of a living room with 3.6 meter tall windows, sheer curtains, suspended fireplace, cream sofas, city view' + S],
  ['koru/closing', '16:9', 'Aerial photograph at night of three ' + EXT + ' towers, Bosphorus bridge lights in the distance, moody blue and bronze' + S],
];

fs.writeFileSync(
  'scripts/images.manifest.json',
  JSON.stringify(items.map(([id, ar, p]) => ({ id, ar, p })), null, 1)
);
console.log(items.length, 'items');
