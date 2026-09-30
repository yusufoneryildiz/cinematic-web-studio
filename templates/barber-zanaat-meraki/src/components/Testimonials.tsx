import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, revealBlock, reduceMotion } from '../lib/anim';

/**
 * Sosyal kanıt bölümü — referans sitede yok.
 * Satışta en çok işe yarayan bölüm bu: Google puanı + gerçek yorumlar.
 */
export function Testimonials({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const ctx = gsap.context(() => {
      revealBlock(scope.querySelectorAll('[data-quote]'), { y: 40, stagger: 0.12 });

      if (reduceMotion()) return;
      gsap.fromTo(
        scope.querySelector('[data-rating]'),
        { scale: 0.86, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: scope, start: 'top 78%', once: true },
        }
      );
    }, scope);
    return () => ctx.revert();
  }, [site.key]);

  return (
    <section className="section testimonials" ref={root} aria-label="Misafir yorumları">
      <div className="shell testimonials__head">
        <p className="eyebrow">{site.testimonials.eyebrow}</p>
        <div className="testimonials__rating" data-rating>
          <span className="display testimonials__score">{site.testimonials.rating.score}</span>
          <span className="testimonials__stars" aria-hidden="true">
            ★★★★★
          </span>
          <span className="label testimonials__count">{site.testimonials.rating.count}</span>
        </div>
      </div>

      <div className="shell testimonials__grid">
        {site.testimonials.items.map((t) => (
          <blockquote className="quote" key={t.author} data-quote>
            <p className="quote__text">“{t.quote}”</p>
            <footer className="quote__by label">
              {t.author}
              {t.source && <span className="quote__src"> · {t.source}</span>}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
