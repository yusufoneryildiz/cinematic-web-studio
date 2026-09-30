import type { SiteContent } from '../content/types';
import { gsap, useGsap, revealLines, reduceMotion } from '../lib/anim';

/** Tam ekran bina fotoğrafı (yavaş yaklaşma), sol altta başlık, sağ altta kart çifti. */
export function About({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span', { start: 'top 70%' });
    if (reduceMotion()) return;
    gsap.fromTo(
      '[data-about-img] img',
      { scale: 1.18, yPercent: -6 },
      { scale: 1, yPercent: 6, ease: 'none', scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
    gsap.fromTo(
      '[data-card]',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: scope, start: 'top 55%', once: true } }
    );
  });

  const a = site.about;
  return (
    <section className="about section section--dark section--over" id="about" ref={ref as never} data-ui="dark">
      <div className="about__img img" data-about-img>
        <img src={a.image} alt="" loading="lazy" />
      </div>
      <div className="about__scrim" />

      <h2 className="about__heading h1">
        {a.heading.map((l) => (
          <span className="reveal-line" data-line key={l}>
            <span>{l}</span>
          </span>
        ))}
      </h2>

      <div className="about__cards">
        <a className="card card--dark" href={site.ctaUrl} target="_blank" rel="noreferrer" data-card data-cursor="İzle">
          <span className="label">{a.cardPrimary}</span>
          <svg className="card__play" viewBox="0 0 16 20" width="16" height="20" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M1 1l14 9-14 9z" />
          </svg>
        </a>
        <a className="card card--light" href={site.ctaUrl} target="_blank" rel="noreferrer" data-card>
          <span className="label card__eyebrow">{a.cardSecondary.eyebrow}</span>
          <span className="card__title h2">{a.cardSecondary.title}</span>
          <span className="label link card__action">{a.cardSecondary.action}</span>
        </a>
      </div>
    </section>
  );
}
