import type { SiteContent } from '../content/types';
import { useGsap, revealLines, veilImages, fadeUps, parallaxImage } from '../lib/anim';

/**
 * "TEKNOLOJİ VE HİZMETLER" — koyu; sağ üstte başlık, çerçeveli metin
 * kutuları (referanstaki beyaz konturlu kutular) ve iki portre fotoğraf.
 */
export function Services({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span');
    veilImages(scope);
    fadeUps(scope);
    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => parallaxImage(el, 8));
  });
  const s = site.services;
  const withImg = s.items.filter((i) => i.image);
  const textOnly = s.items.filter((i) => !i.image);

  return (
    <section className="svc section section--dark section--over" ref={ref as never} data-ui="dark">
      <div className="grid pad svc__grid">
        <h2 className="h2 svc__heading">
          {s.heading.map((l) => (
            <span className="reveal-line" data-line key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h2>

        {withImg.map((it, i) => (
          <article className={`svc__item svc__item--${i}`} key={it.title}>
            <figure className="img img--3x4 img--veil" data-parallax>
              <img src={it.image} alt="" loading="lazy" />
            </figure>
            <div className="svc__box" data-fade>
              <span className="label">{it.title}</span>
              <p className="copy">{it.text}</p>
            </div>
          </article>
        ))}

        <div className="svc__list">
          {textOnly.map((it, i) => (
            <div className="svc__box svc__box--line" key={it.title} data-fade>
              <span className="label svc__idx">{String(i + withImg.length + 1).padStart(2, '0')}</span>
              <span className="label">{it.title}</span>
              <p className="copy">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
