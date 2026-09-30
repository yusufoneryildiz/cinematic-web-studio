import type { SiteContent } from '../content/types';
import { gsap, useGsap, revealLines, veilImages, fadeUps, reduceMotion } from '../lib/anim';

/** Beyaz: eyebrow + büyük harf paragraf + 5 konum kartı. Ardından siyah stilize harita. */
export function Location({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span');
    veilImages(scope);
    fadeUps(scope);
    if (reduceMotion()) return;

    /* Kartlar sırayla, hafif farklı hızlarda yukarı süzülür */
    gsap.utils.toArray<HTMLElement>('[data-loc-card]').forEach((el, i) => {
      gsap.fromTo(el, { y: 40 + i * 18 }, { y: -20 - i * 10, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* Harita: yollar çizilir, pinler belirir */
    const roads = scope.querySelectorAll<SVGPathElement>('[data-road]');
    roads.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.timeline({ scrollTrigger: { trigger: '[data-map]', start: 'top 70%', once: true } })
      .to(roads, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', stagger: 0.08 })
      .fromTo('[data-pin]', { scale: 0, opacity: 0, transformOrigin: 'center' }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.08 }, '-=1.4');
  });

  const l = site.location;
  return (
    <>
      <section className="location section section--light section--over" id="location" ref={ref as never} data-ui="light">
        <div className="location__top grid pad">
          <p className="label location__eyebrow" data-fade>
            {l.eyebrow}
          </p>
          <p className="copy copy--big location__text">
            {l.text.split(' ').reduce<string[][]>((acc, w) => {
              const last = acc[acc.length - 1];
              if (!last || last.join(' ').length + w.length > 34) acc.push([w]);
              else last.push(w);
              return acc;
            }, []).map((line, i) => (
              <span className="reveal-line" data-line key={i}>
                <span>{line.join(' ')}</span>
              </span>
            ))}
          </p>
          <h2 className="h1 location__heading">
            <span className="reveal-line" data-line>
              <span>{l.heading}</span>
            </span>
          </h2>
        </div>

        <hr className="rule" />

        <ul className="location__cards pad">
          {l.cards.map((c, i) => (
            <li key={c.label} data-loc-card style={{ '--i': i } as never}>
              <figure className="img img--3x4 img--veil">
                <img src={c.image} alt="" loading="lazy" />
              </figure>
              <span className="label">{c.label}</span>
            </li>
          ))}
        </ul>

        <div className="map section--dark" data-map>
          <h2 className="h2 map__heading pad" data-fade>
            {l.map.heading}
          </h2>
          <Map pins={l.map.pins} />
        </div>
      </section>
    </>
  );
}

/** Stilize, koyu bölge haritası. Koordinatlar yüzde (0–100). */
function Map({ pins }: { pins: SiteContent['location']['map']['pins'] }) {
  return (
    <div className="map__canvas">
      <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {/* Deniz / körfez */}
        <path d="M0 400 C120 380 180 470 300 460 C380 452 420 520 520 560 L0 560 Z" fill="#0f1720" />
        {/* Park alanı */}
        <path d="M230 150 L390 130 L420 250 L260 275 Z" fill="#0e1912" stroke="#243428" strokeWidth="1" />
        {/* Yollar */}
        <g fill="none" stroke="#585858" strokeWidth="1.4">
          <path data-road d="M0 120 C200 100 350 160 520 140 C700 120 820 60 1000 80" />
          <path data-road d="M0 300 C180 280 300 340 500 300 C680 265 820 320 1000 290" />
          <path data-road d="M140 0 C150 150 120 300 180 560" />
          <path data-road d="M500 0 C480 120 540 260 500 380 C470 460 520 520 560 560" />
          <path data-road d="M800 0 C760 140 830 280 780 420 C760 480 800 520 840 560" />
          <path data-road d="M300 0 C330 100 290 180 340 270 C380 340 360 420 420 560" strokeWidth="0.9" stroke="#3a3a3a" />
          <path data-road d="M640 0 C620 120 680 200 660 330 C650 400 700 470 680 560" strokeWidth="0.9" stroke="#3a3a3a" />
          <path data-road d="M0 200 C240 220 300 190 640 230 C800 250 900 200 1000 220" strokeWidth="0.9" stroke="#3a3a3a" />
          <path data-road d="M0 480 C200 460 400 500 620 440 C800 400 900 470 1000 450" strokeWidth="0.9" stroke="#3a3a3a" />
        </g>
        {/* Metro hattı */}
        <path data-road d="M60 520 C260 420 420 470 600 380 C760 300 880 330 980 260" fill="none" stroke="#7a5a44" strokeWidth="2" strokeDasharray="6 8" />

        {pins.map((p) => {
          const x = p.x * 10;
          const y = p.y * 5.6;
          return (
            <g key={p.label} data-pin transform={`translate(${x} ${y})`}>
              {p.main ? (
                <>
                  <circle r="34" fill="var(--accent)" />
                  <circle r="46" fill="none" stroke="var(--accent)" strokeOpacity="0.5">
                    <animate attributeName="r" values="40;60" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.5;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <text y="6" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" letterSpacing="1">
                    {p.label}
                  </text>
                </>
              ) : (
                <>
                  <circle r="5" fill="#fff" />
                  <circle r="11" fill="none" stroke="#fff" strokeOpacity="0.35" />
                  <text x="18" y="5" fill="#bbb" fontSize="13" fontWeight="600" letterSpacing="1.2">
                    {p.label.toUpperCase()}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
