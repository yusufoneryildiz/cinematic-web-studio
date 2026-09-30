import type { SiteContent } from '../content/types';
import { gsap, useGsap, revealLines, veilImages, fadeUps, parallaxImage, reduceMotion } from '../lib/anim';

/**
 * Beyaz, uzun bölüm: Mimari → Aydınlatma → Premium malzemeler.
 * Fotoğraflar asimetrik, büyük boşluklu; zorge'daki gibi kolon kaydırmalı.
 */
export function Architecture({ site }: { site: SiteContent }) {
  const ref = useGsap(({ scope }) => {
    revealLines(scope, '[data-line] > span');
    veilImages(scope);
    fadeUps(scope);
    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => parallaxImage(el, 10));
    if (reduceMotion()) return;

    /* Malzeme şeridi: scroll ile yatay kayar, kareler sırayla açılır */
    gsap.fromTo('[data-swatches]', { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: '[data-swatches]', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('[data-swatch]', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: '[data-swatches]', start: 'top 80%', once: true } });
  });

  const a = site.architecture;
  return (
    <section className="arch section section--light section--over" id="architecture" ref={ref as never} data-ui="light">
      {/* A — Mimari */}
      <div className="arch__a grid pad">
        <p className="label arch__eyebrow" data-fade>
          {a.heading}
        </p>
        <p className="copy copy--big arch__text">
          <span className="reveal-line" data-line>
            <span>{a.text}</span>
          </span>
        </p>
        <figure className="img img--16x9 img--veil arch__wide" data-parallax>
          <img src={a.wide} alt="" loading="lazy" />
        </figure>
      </div>

      {/* B — Aydınlatma */}
      <div className="arch__b grid pad">
        <p className="label arch__eyebrow" data-fade>
          {a.lightingEyebrow}
        </p>
        <figure className="img img--1x1 img--veil arch__detail" data-parallax>
          <img src={a.detail} alt="" loading="lazy" />
        </figure>
        <p className="copy arch__lighting" data-fade>
          {a.lightingText}
        </p>
        <figure className="img img--3x4 img--veil arch__tall" data-parallax>
          <img src={a.tall} alt="" loading="lazy" />
        </figure>
        <h2 className="h1 arch__materials-heading">
          {a.materialsHeading.map((l) => (
            <span className="reveal-line" data-line key={l}>
              <span>{l}</span>
            </span>
          ))}
        </h2>
      </div>

      {/* C — Malzemeler */}
      <div className="arch__swatches" data-swatches>
        {a.swatches.map((s) => (
          <figure className="img img--1x1" key={s} data-swatch data-cursor="Doku">
            <img src={s} alt="" loading="lazy" />
          </figure>
        ))}
      </div>

      <div className="arch__c grid pad">
        <p className="copy arch__mat-text" data-fade>
          {a.materialsText}
        </p>
        <figure className="img img--3x4 img--veil arch__mat-1" data-parallax>
          <img src={a.materialImages[0]} alt="" loading="lazy" />
        </figure>
        <figure className="img img--3x4 img--veil arch__mat-2" data-parallax>
          <img src={a.materialImages[1]} alt="" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
