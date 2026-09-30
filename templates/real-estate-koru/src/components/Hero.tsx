import { useEffect, useLayoutEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, reduceMotion } from '../lib/anim';

/**
 * Sol 1/3 siyah panel + sağ 2/3 bina fotoğrafı; kesilmiş model paneli
 * fotoğrafa taşıyor; altta ekranı boydan boya kaplayan bronz wordmark.
 * Bölüm sticky: bir sonraki bölüm bunun üstüne kayarak geliyor.
 */
export function Hero({ site, ready }: { site: SiteContent; ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  /* Wordmark'ı ekran genişliğine tam oturt: 100px'te ölç, oranla. */
  useLayoutEffect(() => {
    const el = mark.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = '100px';
      const w = el.scrollWidth;
      const avail = el.parentElement!.clientWidth;
      el.style.fontSize = `${Math.floor((100 * avail) / w * 0.985)}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement!);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || !root.current) return;
    const scope = root.current;

    const ctx = gsap.context(() => {
      if (reduceMotion()) {
        gsap.set('[data-hero-line] > span, [data-hero-model], [data-hero-mark] > *, [data-hero-arrow]', { opacity: 1, yPercent: 0, xPercent: 0 });
        return;
      }
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('[data-hero-img] img', { scale: 1.25 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
        .fromTo('[data-hero-line] > span', { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09 }, 0.2)
        .fromTo('[data-hero-arrow]', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0.8)
        .fromTo('[data-hero-model]', { opacity: 0, xPercent: -6, yPercent: 4 }, { opacity: 1, xPercent: 0, yPercent: 0, duration: 1.6, ease: 'expo.out' }, 0.45)
        .fromTo('[data-hero-mark] > *', { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4, ease: 'expo.out', stagger: 0.06 }, 0.55);

      /* Üstüne bölüm kayarken hafif geri çekilme */
      gsap.timeline({ scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: 0.5 } })
        .to('[data-hero-img] img', { scale: 1.12, ease: 'none' }, 0)
        .to('[data-hero-model]', { yPercent: 10, ease: 'none' }, 0)
        .to('[data-hero-mark]', { yPercent: -30, opacity: 0.4, ease: 'none' }, 0)
        .to('[data-hero-copy]', { yPercent: -40, opacity: 0, ease: 'none' }, 0);
    }, scope);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero section section--under" id="top" ref={root} data-ui="dark">
      <div className="hero__panel">
        <div className="hero__copy" data-hero-copy>
          <h1 className="hero__tagline h2">
            {site.hero.tagline.map((l) => (
              <span className="reveal-line" data-hero-line key={l}>
                <span>{l}</span>
              </span>
            ))}
          </h1>
          <a className="hero__arrow" href="#about" aria-label="Aşağı kaydır" data-hero-arrow>
            <svg viewBox="0 0 12 48" width="12" height="48" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 0v46M1 41l5 6 5-6" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero__img img" data-hero-img>
        <img src={site.hero.image} alt="" fetchPriority="high" />
      </div>

      {site.hero.model && (
        <div className="hero__model" data-hero-model>
          <img src={site.hero.model} alt="" />
        </div>
      )}

      <div className="hero__mark-wrap">
        <div className="hero__mark wordmark" ref={mark} data-hero-mark>
          <span>{site.brand.name}</span>
          <span className="wordmark__num">{site.brand.number}</span>
        </div>
      </div>
    </section>
  );
}
