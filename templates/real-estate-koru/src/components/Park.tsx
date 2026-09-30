import type { SiteContent } from '../content/types';
import { useGsap, revealLines, veilImages, fadeUps, parallaxImage } from '../lib/anim';

/** Beyaz: "ÖZEL 8 DÖNÜMLÜK PARK" — geniş fotoğraf + kaydırılmış portre + metin. */
export function Park({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span');
    veilImages(scope);
    fadeUps(scope);
    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => parallaxImage(el, 10));
  });
  const p = site.park;
  return (
    <section className="park section section--light section--over" ref={ref as never} data-ui="light">
      <div className="grid pad park__grid">
        <h2 className="h1 park__heading">
          {p.heading.map((l) => (
            <span className="reveal-line" data-line key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h2>
        <figure className="img img--16x9 img--veil park__wide" data-parallax>
          <img src={p.images[0]} alt="" loading="lazy" />
        </figure>
        <figure className="img img--3x4 img--veil park__tall" data-parallax>
          <img src={p.images[1]} alt="" loading="lazy" />
        </figure>
        <p className="copy copy--big park__text" data-fade>
          {p.text}
        </p>
      </div>
    </section>
  );
}
