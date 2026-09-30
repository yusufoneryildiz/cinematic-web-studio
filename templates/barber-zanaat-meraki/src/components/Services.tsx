import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, revealLines, revealBlock } from '../lib/anim';

export function Services({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const ctx = gsap.context(() => {
      revealLines(scope, '[data-svc-line] > span');
      scope.querySelectorAll<HTMLElement>('[data-svc-group]').forEach((g) => {
        revealBlock(g.querySelectorAll('[data-svc-row]'), { y: 22, stagger: 0.045, trigger: g });
      });
    }, scope);
    return () => ctx.revert();
  }, [site.key]);

  return (
    <section className="section services" id="hizmetler" ref={root}>
      <div className="gridlines" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="shell services__head">
        <div>
          <p className="eyebrow">{site.services.eyebrow}</p>
          <h2 className="display services__title">
            {site.services.headline.map((line) => (
              <span className="reveal-line" data-svc-line key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </div>
        <a className="btn btn--ghost" href={site.bookingUrl} target="_blank" rel="noreferrer">
          {site.bookingLabel}
        </a>
      </div>

      <div className="shell services__grid">
        {site.services.groups.map((g) => (
          <div className="services__group" key={g.title} data-svc-group>
            <div className="services__group-head">
              <h3 className="services__group-title">{g.title}</h3>
              {g.note && <p className="services__group-note">{g.note}</p>}
            </div>

            <ul className="services__list">
              {g.items.map((it) => (
                <li className="services__row" key={it.name} data-svc-row>
                  <span className="services__name">{it.name}</span>
                  {it.duration && <span className="services__dur">{it.duration}</span>}
                  <span className="services__price">{it.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="shell services__note">{site.services.note}</p>
    </section>
  );
}
