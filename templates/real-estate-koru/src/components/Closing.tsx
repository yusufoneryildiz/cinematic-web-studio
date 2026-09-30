import type { SiteContent } from '../content/types';
import { gsap, useGsap, revealLines, fadeUps, reduceMotion } from '../lib/anim';

/** Kapanış: gece hava fotoğrafı, "DAİRENİZİ SEÇİN", iletişim ve dev wordmark footer. */
export function Closing({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span');
    fadeUps(scope);
    if (reduceMotion()) return;
    gsap.fromTo('[data-close-bg] img', { scale: 1.15, yPercent: -6 }, { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    gsap.fromTo('[data-foot-mark] > *', { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '[data-foot-mark]', start: 'top 95%', once: true } });
  });

  const c = site.closing;
  return (
    <section className="close section section--dark section--over" id="contact" ref={ref as never} data-ui="dark">
      <div className="close__bg img" data-close-bg>
        <img src={c.image} alt="" loading="lazy" />
      </div>
      <div className="close__scrim" />

      <div className="close__inner pad">
        <h2 className="h1 close__heading">
          {c.heading.map((l) => (
            <span className="reveal-line" data-line key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h2>
        <p className="copy close__text" data-fade>
          {c.text}
        </p>
        <div className="close__actions" data-fade>
          <a className="btn" href={site.ctaUrl} target="_blank" rel="noreferrer" style={{ '--btn-hover': '#000' } as never}>
            {site.ctaLabel}
          </a>
          <a className="label link" href={`tel:${site.phone.replace(/\s/g, '')}`}>
            {site.phone}
          </a>
        </div>
      </div>

      <footer className="foot pad">
        <div className="foot__mark wordmark" data-foot-mark>
          <span>{site.brand.name}</span>
          <span className="wordmark__num">{site.brand.number}</span>
        </div>
        <div className="foot__row label">
          <span>{site.footer.rights}</span>
          <div className="foot__social">
            {site.footer.social.map((s) => (
              <a key={s.label} className="link" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <span className="foot__credit">{site.footer.credit}</span>
        </div>
      </footer>
    </section>
  );
}
