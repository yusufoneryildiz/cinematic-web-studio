import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, revealLines, reduceMotion } from '../lib/anim';
import { DistortImage } from './DistortImage';

export function Work({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      revealLines(scope, '[data-work-line] > span');

      if (reduceMotion()) return;

      /* Kartlar alttan clip açılarak, hafif kademeli gelir */
      gsap.fromTo(
        scope.querySelectorAll('[data-work-card]'),
        { clipPath: 'inset(100% 0% 0% 0%)', y: 60 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.25,
          ease: 'expo.out',
          stagger: 0.11,
          scrollTrigger: { trigger: scope.querySelector('[data-work-grid]'), start: 'top 80%', once: true },
        }
      );

      /* Ortadaki kart scroll'da diğerlerinden biraz farklı hızda kayar */
      gsap.to(scope.querySelectorAll('[data-work-card]:nth-child(even)'), {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.querySelector('[data-work-grid]'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, scope);

    return () => ctx.revert();
  }, [site.key]);

  return (
    <section className="section work" id="isler" ref={root}>
      <div className="gridlines" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="shell work__head">
        <div>
          <p className="eyebrow">{site.work.eyebrow}</p>
          <h2 className="display work__title">
            {site.work.headline.map((line) => (
              <span className="reveal-line" data-work-line key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </div>
        <a className="btn btn--ghost" href={site.footer.social[0].href} target="_blank" rel="noreferrer">
          TÜMÜNÜ GÖR
        </a>
      </div>

      <div className="work__grid" data-work-grid>
        {site.work.images.map((im) => (
          <figure className="work__card" key={im.src} data-work-card data-cursor="İNCELE">
            <DistortImage src={im.src} alt={im.label} className="work__media" />
            <figcaption className="work__cap label">{im.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
