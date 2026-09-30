import type { SiteContent } from '../content/types';
import { gsap, useGsap, revealLines, reduceMotion } from '../lib/anim';

/** "DENEYİMİN LÜKSÜ" — tam ekran lobi fotoğrafı, sağ altta başlık + paragraf. */
export function Lobby({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span', { start: 'top 55%' });
    if (reduceMotion()) return;
    gsap.fromTo('[data-lobby-img] img', { scale: 1.12, yPercent: -5 }, { scale: 1, yPercent: 5, ease: 'none', scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  const l = site.lobby;
  return (
    <section className="lobby section section--dark section--under" ref={ref as never} data-ui="dark">
      <div className="lobby__img img" data-lobby-img>
        <img src={l.image} alt="" loading="lazy" />
      </div>
      <div className="lobby__scrim" />
      <div className="lobby__copy">
        <p className="copy lobby__text">
          <span className="reveal-line" data-line>
            <span>{l.text}</span>
          </span>
        </p>
        <h2 className="h1">
          {l.heading.map((x) => (
            <span className="reveal-line" data-line key={x}>
              <span>{x}</span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
