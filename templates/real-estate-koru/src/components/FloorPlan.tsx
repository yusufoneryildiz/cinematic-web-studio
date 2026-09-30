/**
 * Şematik kat planları — ince beyaz çizgi, oda etiketleri.
 * Gerçek müşteride mimarın DWG/PDF'inden çevrilmiş SVG konur.
 */
type Room = { x: number; y: number; w: number; h: number; label: string; m2?: string };

const PLANS: Record<string, { rooms: Room[]; w: number; h: number }> = {
  studio: {
    w: 320, h: 240,
    rooms: [
      { x: 10, y: 10, w: 200, h: 220, label: 'Yaşam + Yatak', m2: '19.5' },
      { x: 210, y: 10, w: 100, h: 110, label: 'Mutfak', m2: '5.2' },
      { x: 210, y: 120, w: 100, h: 110, label: 'Banyo', m2: '4.1' },
    ],
  },
  one: {
    w: 360, h: 260,
    rooms: [
      { x: 10, y: 10, w: 190, h: 160, label: 'Salon', m2: '24' },
      { x: 200, y: 10, w: 150, h: 130, label: 'Yatak odası', m2: '14' },
      { x: 10, y: 170, w: 120, h: 80, label: 'Mutfak', m2: '8' },
      { x: 130, y: 170, w: 70, h: 80, label: 'Banyo', m2: '4.5' },
      { x: 200, y: 140, w: 150, h: 110, label: 'Hol + Giyinme', m2: '9' },
    ],
  },
  two: {
    w: 400, h: 280,
    rooms: [
      { x: 10, y: 10, w: 200, h: 170, label: 'Salon', m2: '28' },
      { x: 210, y: 10, w: 180, h: 120, label: 'Ebeveyn', m2: '16' },
      { x: 210, y: 130, w: 100, h: 140, label: 'Yatak odası', m2: '12' },
      { x: 310, y: 130, w: 80, h: 140, label: 'Banyo', m2: '6' },
      { x: 10, y: 180, w: 120, h: 90, label: 'Mutfak', m2: '9' },
      { x: 130, y: 180, w: 80, h: 90, label: 'WC', m2: '3' },
    ],
  },
  three: {
    w: 440, h: 300,
    rooms: [
      { x: 10, y: 10, w: 220, h: 170, label: 'Salon', m2: '32' },
      { x: 230, y: 10, w: 200, h: 120, label: 'Ebeveyn', m2: '18' },
      { x: 230, y: 130, w: 110, h: 160, label: 'Yatak 2', m2: '13' },
      { x: 340, y: 130, w: 90, h: 80, label: 'Banyo', m2: '6' },
      { x: 340, y: 210, w: 90, h: 80, label: 'Giyinme', m2: '5' },
      { x: 10, y: 180, w: 120, h: 110, label: 'Mutfak', m2: '11' },
      { x: 130, y: 180, w: 100, h: 110, label: 'Yatak 3', m2: '11' },
    ],
  },
  terrace: {
    w: 460, h: 300,
    rooms: [
      { x: 10, y: 10, w: 160, h: 280, label: 'Teras', m2: '22' },
      { x: 170, y: 10, w: 180, h: 170, label: 'Salon', m2: '30' },
      { x: 350, y: 10, w: 100, h: 170, label: 'Ebeveyn', m2: '15' },
      { x: 170, y: 180, w: 100, h: 110, label: 'Mutfak', m2: '10' },
      { x: 270, y: 180, w: 90, h: 110, label: 'Yatak 2', m2: '11' },
      { x: 360, y: 180, w: 90, h: 110, label: 'Banyo', m2: '6' },
    ],
  },
  penthouse: {
    w: 520, h: 320,
    rooms: [
      { x: 10, y: 10, w: 300, h: 200, label: 'Salon + Cam çatı', m2: '58' },
      { x: 310, y: 10, w: 200, h: 130, label: 'Ebeveyn süiti', m2: '24' },
      { x: 310, y: 140, w: 100, h: 170, label: 'Yatak 2', m2: '14' },
      { x: 410, y: 140, w: 100, h: 170, label: 'Yatak 3', m2: '14' },
      { x: 10, y: 210, w: 150, h: 100, label: 'Mutfak', m2: '16' },
      { x: 160, y: 210, w: 150, h: 100, label: 'Hamam + Spa', m2: '12' },
    ],
  },
};

export function FloorPlan({ type }: { type: string }) {
  const plan = PLANS[type] ?? PLANS.studio;
  return (
    <svg className="plan" viewBox={`-6 -6 ${plan.w + 12} ${plan.h + 12}`} aria-label="Kat planı">
      <rect x="0" y="0" width={plan.w} height={plan.h} fill="none" stroke="currentColor" strokeWidth="2.2" />
      {plan.rooms.map((r) => (
        <g key={r.label + r.x + r.y}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* kapı */}
          <path d={`M${r.x + 8} ${r.y + r.h} a14 14 0 0 1 14 -14`} fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
          <text x={r.x + 8} y={r.y + 16} fontSize="8.5" fontWeight="600" letterSpacing="0.6" fill="currentColor" style={{ textTransform: 'uppercase' }}>
            {r.label.toUpperCase()}
          </text>
          {r.m2 && (
            <text x={r.x + 8} y={r.y + 27} fontSize="7.5" fill="currentColor" opacity="0.6">
              {r.m2} m²
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
