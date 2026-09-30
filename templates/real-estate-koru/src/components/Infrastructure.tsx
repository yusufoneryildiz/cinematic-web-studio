import type { SiteContent } from '../content/types';
import { gsap, useGsap, veilImages, fadeUps, reduceMotion } from '../lib/anim';

/**
 * Siyah: önce tam ekran sokak fotoğrafı üstünde "ALTYAPI" (sticky),
 * sonra üç kart (restoran / güzellik salonu / pet spa) üstüne kayar.
 */
export function Infrastructure({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    veilImages(scope);
    fadeUps(scope);
    if (reduceMotion()) return;
    gsap.fromTo('[data-infra-bg] img', { scale: 1.1 }, { scale: 1.22, ease: 'none', scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.fromTo('[data-infra-title]', { letterSpacing: '0.4em', opacity: 0 }, { letterSpacing: '0.08em', opacity: 1, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: scope, start: 'top 50%', once: true } });
  });

  const n = site.infrastructure;
  return (
    <section className="infra section section--dark section--over" ref={ref as never} data-ui="dark">
      <div className="infra__hero">
        <div className="infra__bg img" data-infra-bg>
          <img src={n.background} alt="" loading="lazy" />
        </div>
        <h2 className="h1 infra__title" data-infra-title>
          {n.heading}
        </h2>
      </div>

      <div className="infra__cards pad">
        {n.items.map((it, i) => (
          <article className="infra__card" key={it.image} data-fade>
            <figure className="img img--3x4 img--veil">
              <img src={it.image} alt="" loading="lazy" />
            </figure>
            <div className="infra__card-body">
              <span className="label infra__idx">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h2">
                {it.title.map((l) => (
                  <span key={l}>
                    {l}
                    <br />
                  </span>
                ))}
              </h3>
              <p className="copy">{it.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
