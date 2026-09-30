import type { SiteContent } from '../content/types';
import { useGsap, revealLines, veilImages, fadeUps, parallaxImage } from '../lib/anim';

/**
 * Beyaz, uzun: havuz (geniş), ardından sauna / salon / boks üçlüsü
 * dönüşümlü hizada, sonda geniş yoga fotoğrafı.
 */
export function Fitness({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span');
    veilImages(scope);
    fadeUps(scope);
    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => parallaxImage(el, 9));
  });

  const f = site.fitness;
  return (
    <section className="fit section section--light section--over" ref={ref as never} data-ui="light">
      <div className="fit__top grid pad">
        <h2 className="h1 fit__heading">
          {f.heading.map((l) => (
            <span className="reveal-line" data-line key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h2>
        <figure className="img img--16x9 img--veil fit__pool" data-parallax>
          <img src={f.pool.image} alt="" loading="lazy" />
        </figure>
        <p className="copy fit__pool-text" data-fade>
          {f.pool.text}
        </p>
      </div>

      <div className="fit__rows pad">
        {f.items.map((it, i) => (
          <div className={`fit__row grid ${i % 2 ? 'fit__row--alt' : ''}`} key={it.image}>
            <figure className="img img--3x4 img--veil fit__row-img" data-parallax>
              <img src={it.image} alt="" loading="lazy" />
            </figure>
            <p className="copy fit__row-text" data-fade>
              {it.text}
            </p>
          </div>
        ))}
      </div>

      <div className="fit__yoga grid pad">
        <figure className="img img--16x9 img--veil fit__yoga-img" data-parallax>
          <img src={f.yoga.image} alt="" loading="lazy" />
        </figure>
        <p className="copy copy--big fit__yoga-text" data-fade>
          {f.yoga.text}
        </p>
      </div>
    </section>
  );
}
