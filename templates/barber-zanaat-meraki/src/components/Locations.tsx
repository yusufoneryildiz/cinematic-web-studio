import { useEffect, useRef, useState } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, ScrollTrigger, revealLines } from '../lib/anim';

export function Locations({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const ctx = gsap.context(() => {
      revealLines(scope, '[data-loc-line] > span');
    }, scope);
    return () => ctx.revert();
  }, [site.key]);

  /* Panel açılıp kapandıkça sayfa yüksekliği değişiyor — ScrollTrigger'a haber ver. */
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <section className="section locations" id="subeler" ref={root}>
      <div className="gridlines" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="shell locations__head">
        <h2 className="display locations__title">
          {site.locations.headline.map((line) => (
            <span className="reveal-line" data-loc-line key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
        <p className="eyebrow locations__eyebrow">{site.locations.eyebrow}</p>
      </div>

      <div className="shell locations__list">
        {site.locations.items.map((loc, i) => {
          const isOpen = open === i;
          return (
            <div className={`loc ${isOpen ? 'is-open' : ''}`} key={loc.name}>
              <button
                className="loc__trigger"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`loc-panel-${i}`}
              >
                <span className="display loc__name">{loc.name}</span>
                <span className="loc__chev" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor">
                    <path d="M5 9l7 7 7-7" strokeWidth="2" />
                  </svg>
                </span>
              </button>

              <div className="loc__panel" id={`loc-panel-${i}`} hidden={!isOpen}>
                <div className="loc__panel-inner">
                  <div className="loc__col">
                    <h3 className="label loc__col-title">Adres</h3>
                    <a className="loc__address" href={loc.mapsUrl} target="_blank" rel="noreferrer">
                      {loc.address.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </a>
                    <a className="loc__phone" href={`tel:${loc.phone.replace(/\s/g, '')}`}>
                      {loc.phone}
                    </a>
                    <a
                      className="btn loc__cta"
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {site.bookingLabel}
                    </a>
                  </div>

                  <div className="loc__col">
                    <h3 className="label loc__col-title">Çalışma Saatleri</h3>
                    <dl className="loc__hours">
                      {loc.hours.map((h) => (
                        <div key={h.days}>
                          <dt>{h.days}</dt>
                          <dd>{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <figure className="loc__media img-mask">
                    <img src={loc.image} alt={`${loc.name} şubesi`} loading="lazy" />
                  </figure>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
