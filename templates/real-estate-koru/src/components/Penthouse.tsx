import type { SiteContent } from '../content/types';
import { gsap, useGsap, revealLines, veilImages, fadeUps, parallaxImage, reduceMotion } from '../lib/anim';

/**
 * Cam çatılı penthouse: tam ekran gece fotoğrafı, sol altta başlık,
 * ardından kaydırılmış portre + metin; sonda 4.2 M / 3.6 M ölçü kareleri (sayaçlı).
 */
export function Penthouse({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span');
    veilImages(scope);
    fadeUps(scope);
    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => parallaxImage(el, 8));
    if (reduceMotion()) return;
    gsap.fromTo('[data-pent-bg] img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '[data-pent-bg]', start: 'top bottom', end: 'bottom top', scrub: true } });

    /* Ölçü sayaçları */
    scope.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count);
      const o = { n: 0 };
      gsap.to(o, {
        n: target,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => (el.textContent = o.n.toFixed(1)),
      });
    });
  });

  const p = site.penthouse;
  return (
    <section className="pent section section--dark section--over" ref={ref as never} data-ui="dark">
      <div className="pent__hero">
        <div className="pent__bg img" data-pent-bg>
          <img src={p.images[0]} alt="" loading="lazy" />
        </div>
        <div className="pent__scrim" />
        <h2 className="h1 pent__heading">
          {p.heading.map((l) => (
            <span className="reveal-line" data-line key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="grid pad pent__body">
        <figure className="img img--3x4 img--veil pent__portrait" data-parallax>
          <img src={p.images[1]} alt="" loading="lazy" />
        </figure>
        <p className="copy copy--big pent__text" data-fade>
          {p.text}
        </p>
      </div>

      <div className="specs pad">
        {site.specs.map((s) => (
          <figure className="specs__item img img--veil" key={s.label} data-parallax>
            <img src={s.image} alt="" loading="lazy" />
            <figcaption>
              <span className="num">
                <b data-count={s.value}>0.0</b> {s.unit}
              </span>
              <span className="label">{s.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
