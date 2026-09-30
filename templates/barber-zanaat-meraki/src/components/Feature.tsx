import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, reduceMotion } from '../lib/anim';

/**
 * Tam genişlikte, scroll ile açılan görsel + ortada beyaz başlık.
 * Referanstaki "Academy" bölümünün karşılığı; oradaki statik görsele
 * karşılık burada görsel scroll boyunca dar bir şeritten tam ekrana açılıyor.
 */
export function Feature({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      if (reduceMotion()) {
        gsap.set('[data-feat-line] > span', { yPercent: 0 });
        return;
      }

      gsap.fromTo(
        '[data-feat-media]',
        { clipPath: 'inset(22% 12% 22% 12%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'top top', scrub: 0.5 },
        }
      );

      gsap.to('[data-feat-media] img', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.fromTo(
        '[data-feat-line] > span',
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: scope, start: 'top 55%', once: true },
        }
      );

      gsap.fromTo(
        '[data-feat-copy]',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: scope, start: 'top 48%', once: true },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, [site.key]);

  return (
    <section className="feature" ref={root} data-nav-dark>
      <div className="feature__media" data-feat-media>
        <img src={site.feature.image} alt="" loading="lazy" />
        <div className="feature__scrim" />
      </div>

      <div className="feature__inner shell">
        <p className="eyebrow feature__eyebrow">{site.feature.eyebrow}</p>
        <h2 className="display feature__title">
          {site.feature.headline.map((line) => (
            <span className="reveal-line" data-feat-line key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
        <div className="feature__copy" data-feat-copy>
          <p className="lede">{site.feature.body}</p>
          <a className="btn btn--light" href={site.feature.cta.href}>
            {site.feature.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
