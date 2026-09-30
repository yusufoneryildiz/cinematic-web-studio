import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, reduceMotion } from '../lib/anim';

export function Footer({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope || reduceMotion()) return;

    const ctx = gsap.context(() => {
      /* Dev wordmark alttan yükselir */
      gsap.fromTo(
        '[data-wordmark] > span',
        { yPercent: 55, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.035,
          scrollTrigger: { trigger: '[data-wordmark]', start: 'top 95%', once: true },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, [site.key]);

  return (
    <footer className="footer on-dark" ref={root} data-nav-dark>
      <div className="shell footer__top">
        {site.locations.items.map((l) => (
          <div className="footer__loc" key={l.name}>
            <p className="eyebrow">{l.name}</p>
            <a href={l.mapsUrl} target="_blank" rel="noreferrer" className="footer__addr">
              {l.address.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </a>
            <a className="footer__phone" href={`tel:${l.phone.replace(/\s/g, '')}`}>
              {l.phone}
            </a>
            <div className="footer__hours">
              {l.hours.map((h) => (
                <p key={h.days}>
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </p>
              ))}
            </div>
          </div>
        ))}

        <nav className="footer__nav" aria-label="Alt menü">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} className="label">
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      <div
        className="footer__wordmark display"
        data-wordmark
        aria-hidden="true"
        style={{ ['--wm-letters' as string]: site.footer.wordmark.length }}
      >
        {site.footer.wordmark.split('').map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>

      <div className="shell footer__bottom">
        <p className="label">{site.footer.legal}</p>
        <div className="footer__social">
          {site.footer.social.map((s) => (
            <a key={s.label} className="label" href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
