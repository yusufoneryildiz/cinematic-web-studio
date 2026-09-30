import type { SiteContent } from '../content/types';
import { gsap, useGsap, revealLines, reduceMotion } from '../lib/anim';

/** Tam ekran çift fotoğrafı; sağ üstte küçük başlık, sağda büyük harf paragraf. */
export function Panorama({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span', { start: 'top 60%' });
    if (reduceMotion()) return;
    gsap.fromTo('[data-pan-img] img', { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: scope, start: 'top bottom', end: 'top top', scrub: true } });
  });
  const p = site.panorama;
  return (
    <section className="panorama section section--dark section--under" ref={ref as never} data-ui="dark">
      <div className="panorama__img img" data-pan-img>
        <img src={p.image} alt="" loading="lazy" />
      </div>
      <div className="panorama__scrim" />
      <div className="panorama__copy">
        <p className="label panorama__eyebrow">
          {p.heading.map((l) => (
            <span className="reveal-line" data-line key={l}>
              <span>{l}</span>
            </span>
          ))}
        </p>
        <p className="copy copy--big">
          {p.text.split(/(?<=\.)\s/).map((s) => (
            <span className="reveal-line" data-line key={s}>
              <span>{s}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
