import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, reduceMotion } from '../lib/anim';

/**
 * Koyu kapanış bölümü. Referanstaki "GIVE US / A SHOUT" düzeninin
 * üstüne, ortadaki foto ızgarası scroll ile açılıp kapanıyor.
 */
export function Shout({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      if (reduceMotion()) {
        gsap.set('[data-shout-line] > span', { yPercent: 0 });
        return;
      }

      gsap.fromTo(
        '[data-shout-line] > span',
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: scope, start: 'top 62%', once: true },
        }
      );

      /* Izgara scroll ile açılır: kareler merkezden dağılır */
      gsap.fromTo(
        '[data-shout-tile]',
        { scale: 0.3, opacity: 0, filter: 'blur(8px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.15,
          ease: 'expo.out',
          stagger: { each: 0.06, from: 'center' },
          scrollTrigger: { trigger: '[data-shout-grid]', start: 'top 85%', once: true },
        }
      );

      gsap.to('[data-shout-grid]', {
        yPercent: -9,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, scope);

    return () => ctx.revert();
  }, [site.key]);

  return (
    <section className="section shout on-dark" id="iletisim" ref={root} data-nav-dark>
      <div className="shout__stack">
        <h2 className="display shout__line">
          <span className="reveal-line" data-shout-line>
            <span>{site.shout.headlineTop}</span>
          </span>
        </h2>

        <div className="shout__grid" data-shout-grid>
          {site.shout.images.map((src) => (
            <div className="shout__tile" key={src} data-shout-tile>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        <h2 className="display shout__line">
          <span className="reveal-line" data-shout-line>
            <span>{site.shout.headlineBottom}</span>
          </span>
        </h2>

        <a className="btn btn--light shout__cta" href={site.bookingUrl} target="_blank" rel="noreferrer">
          {site.bookingLabel}
        </a>
      </div>
    </section>
  );
}
