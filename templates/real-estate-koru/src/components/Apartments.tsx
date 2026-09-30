import { useEffect, useRef, useState } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, useGsap, revealLines, fadeUps, reduceMotion } from '../lib/anim';
import { FloorPlan } from './FloorPlan';

/**
 * "GÖRKEMLİ DAİRELER" — koyu; arka planda loş salon fotoğrafı,
 * daire tipi sekmeleri, m² aralığı ve şematik kat planı.
 */
export function Apartments({ site }: { site: SiteContent }) {
  const [active, setActive] = useState(0);
  const planBox = useRef<HTMLDivElement>(null);
  const a = site.apartments;

  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span');
    fadeUps(scope);
    if (reduceMotion()) return;
    gsap.fromTo('[data-apt-bg] img', { scale: 1.15, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* Sekme değişince plan yumuşakça yenilenir */
  useEffect(() => {
    if (!planBox.current || reduceMotion()) return;
    gsap.fromTo(planBox.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
  }, [active]);

  return (
    <section className="apt section section--dark section--over" id="apartments" ref={ref as never} data-ui="dark">
      <div className="apt__bg img" data-apt-bg>
        <img src={a.background} alt="" loading="lazy" />
      </div>

      <div className="apt__inner grid pad">
        <h2 className="h1 apt__heading">
          {a.heading.map((l) => (
            <span className="reveal-line" data-line key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h2>
        <p className="copy apt__text" data-fade>
          {a.text}
        </p>

        <div className="apt__tabs" role="tablist" data-fade>
          {a.types.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              aria-selected={i === active}
              className={`apt__tab label ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="apt__plan" ref={planBox} data-plan>
          <FloorPlan type={a.types[active].plan} />
        </div>

        <div className="apt__meta" data-fade>
          <span className="num apt__area">{a.types[active].area}</span>
          <span className="label apt__type">{a.types[active].label}</span>
          <p className="copy apt__terms">{a.terms}</p>
          <a className="btn apt__cta" href={site.ctaUrl} target="_blank" rel="noreferrer" style={{ '--btn-hover': '#000' } as never}>
            {site.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
