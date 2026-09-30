import { useState } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, ScrollTrigger, useGsap, fadeUps, reduceMotion } from '../lib/anim';

/**
 * "GÜNLÜK RİTİM" — pinlenmiş bölüm. Kaydırdıkça saat ilerler:
 * solda saat listesi, ortada fotoğraf çapraz geçişi, altta büyük harf metin.
 */
export function Daily({ site }: { site: SiteContent }) {
  const [active, setActive] = useState(0);
  const slots = site.daily.slots;

  const ref = useGsap(({ scope }) => {
    fadeUps(scope);
    if (reduceMotion()) return;
    const n = slots.length;
    ScrollTrigger.create({
      trigger: scope,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const i = Math.min(n - 1, Math.floor(self.progress * n * 0.999));
        setActive((cur) => (cur === i ? cur : i));
      },
    });
    /* İlerleme çizgisi */
    gsap.fromTo('[data-daily-bar]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom bottom', scrub: true } });
  });

  return (
    <section className="daily section section--dark section--over" ref={ref as never} data-ui="dark" style={{ height: `${slots.length * 100}vh` }}>
      <div className="daily__sticky">
        <h2 className="h2 daily__heading pad" data-fade>
          {site.daily.heading}
        </h2>

        <ol className="daily__times">
          <i className="daily__track">
            <b data-daily-bar />
          </i>
          {slots.map((s, i) => (
            <li key={s.time} className={`num ${i === active ? 'is-active' : ''}`}>
              {s.time}
            </li>
          ))}
        </ol>

        <div className="daily__stage">
          {slots.map((s, i) => (
            <figure key={s.time} className={`daily__img img ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
              <img src={s.image} alt="" loading="lazy" />
            </figure>
          ))}
        </div>

        <div className="daily__texts">
          {slots.map((s, i) => (
            <p key={s.time} className={`copy daily__text ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
              {s.text}
            </p>
          ))}
        </div>

        <span className="label daily__counter">
          {String(active + 1).padStart(2, '0')} — {String(slots.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
