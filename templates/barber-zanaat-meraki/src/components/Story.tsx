import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, revealLines, revealBlock, parallaxImage, reduceMotion } from '../lib/anim';

export function Story({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      revealLines(scope, '[data-story-line] > span', { stagger: 0.09 });
      revealBlock(scope.querySelectorAll('[data-story-body], [data-story-cta]'), { y: 30 });
      parallaxImage(scope.querySelector('[data-story-img]'), 12);

      /* İstatistikler: sayılar sıfırdan hedefe sayılsın */
      scope.querySelectorAll<HTMLElement>('[data-stat]').forEach((el) => {
        const raw = el.dataset.stat!;
        const num = parseFloat(raw.replace(/[^\d.]/g, ''));
        if (!isFinite(num) || reduceMotion()) return;
        const suffix = raw.replace(/[\d.]/g, '');
        const decimals = (raw.split('.')[1] || '').replace(/\D/g, '').length;
        const state = { n: 0 };

        gsap.to(state, {
          n: num,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = state.n.toFixed(decimals) + suffix;
          },
        });
      });

      revealBlock(scope.querySelectorAll('[data-stat-item]'), { y: 24, stagger: 0.07 });
    }, scope);

    return () => ctx.revert();
  }, [site.key]);

  return (
    <section className="section story" id="hikaye" ref={root}>
      <div className="gridlines" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="shell story__head">
        <p className="eyebrow">{site.story.eyebrow}</p>
        <p className="eyebrow">{site.story.since}</p>
      </div>

      <div className="shell story__grid">
        <figure className="story__media img-mask" data-story-img>
          <img src={site.story.image} alt="" loading="lazy" />
        </figure>

        <div className="story__copy">
          <h2 className="display story__title">
            {site.story.headline.map((line) => (
              <span className="reveal-line" data-story-line key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <a
            className="btn story__cta"
            data-story-cta
            href={site.bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            {site.bookingLabel}
          </a>
        </div>

        <div className="story__body lede" data-story-body>
          <p>{site.story.body}</p>
        </div>
      </div>

      <div className="shell story__stats">
        {site.story.stats.map((s) => (
          <div className="story__stat" key={s.label} data-stat-item>
            <span className="display story__stat-value" data-stat={s.value}>
              {s.value}
            </span>
            <span className="label story__stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
