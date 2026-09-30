import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, reduceMotion } from '../lib/anim';

/**
 * Referanstaki tam ekran hero'nun üstüne iki şey ekliyoruz:
 *  1) Başlık satırları maskeden yukarı kayarak geliyor (crisp'te sadece fade var).
 *  2) Scroll ilerledikçe görsel hafifçe uzaklaşıp yatay paylardan içeri çekiliyor —
 *     bir sonraki bölüme "kart kapanıyor" hissiyle bağlanıyor.
 */
export function Hero({ site, ready }: { site: SiteContent; ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready || !root.current) return;
    const scope = root.current;

    const ctx = gsap.context(() => {
      if (reduceMotion()) {
        gsap.set('[data-hero-line] > span, [data-hero-cta], [data-hero-hint]', {
          yPercent: 0,
          opacity: 1,
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        '[data-hero-media] img',
        { scale: 1.35, filter: 'blur(14px)' },
        { scale: 1.08, filter: 'blur(0px)', duration: 2, ease: 'expo.out' }
      )
        .fromTo(
          '[data-hero-line] > span',
          { yPercent: 118 },
          { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.085 },
          0.25
        )
        .fromTo(
          '[data-hero-cta], [data-hero-hint], [data-hero-meta]',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 },
          0.85
        );

      /* Scroll'a bağlı kapanma */
      gsap.timeline({
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
        .to('[data-hero-media]', { scale: 0.88, borderRadius: '2px', ease: 'none' }, 0)
        .to('[data-hero-media] img', { yPercent: 12, ease: 'none' }, 0)
        .to('[data-hero-copy]', { yPercent: -35, opacity: 0, ease: 'none' }, 0);
    }, scope);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={root} data-nav-dark>
      <div className="hero__media" data-hero-media>
        <img src={site.hero.image} alt="" fetchPriority="high" />
        <div className="hero__scrim" />
      </div>

      <div className="hero__copy shell" data-hero-copy>
        <h1 className="hero__title display">
          {site.hero.headline.map((line) => (
            <span className="reveal-line" data-hero-line key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <div className="hero__actions" data-hero-cta>
          <a className="btn btn--light" href={site.bookingUrl} target="_blank" rel="noreferrer">
            {site.bookingLabel}
          </a>
          <a className="hero__tel label" href={`tel:${site.locations.items[0].phone.replace(/\s/g, '')}`}>
            {site.locations.items[0].phone}
          </a>
        </div>
      </div>

      <div className="hero__meta label" data-hero-meta>
        <span>{site.story.since}</span>
        <span>
          ★ {site.testimonials.rating.score} · {site.testimonials.rating.count}
        </span>
      </div>

      <div className="hero__hint label" data-hero-hint>
        <span>{site.hero.scrollHint}</span>
        <i />
      </div>
    </section>
  );
}
