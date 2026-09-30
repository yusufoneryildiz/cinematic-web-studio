import { useEffect, useState } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, useGsap, fadeUps, reduceMotion } from '../lib/anim';

/**
 * Siyah, tam ekran mozaik: 6 fotoğraf farklı hızlarda süzülür,
 * ortada "GALERİ /11 fotoğraf · İNCELE". İncele → basit lightbox.
 */
export function Gallery({ site }: { site: SiteContent }) {
  const [open, setOpen] = useState<number | null>(null);

  const ref = useGsap(({ scope }) => {
    fadeUps(scope);
    if (reduceMotion()) return;
    gsap.utils.toArray<HTMLElement>('[data-gal]').forEach((el) => {
      const speed = Number(el.dataset.gal);
      gsap.fromTo(el, { yPercent: 18 * speed }, { yPercent: -18 * speed, ease: 'none', scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.fromTo('[data-gal]', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: scope, start: 'top 60%', once: true } });
  });

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => ((o ?? 0) + 1) % site.gallery.images.length);
      if (e.key === 'ArrowLeft') setOpen((o) => ((o ?? 0) - 1 + site.gallery.images.length) % site.gallery.images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, site.gallery.images.length]);

  const g = site.gallery;
  /* Her karenin konumu / boyutu / hızı (yüzde) */
  const slots = [
    { l: 3, t: 16, w: 18, s: 1.2 },
    { l: 26, t: 52, w: 16, s: 0.7 },
    { l: 34, t: 10, w: 30, s: 0.4 },
    { l: 60, t: 58, w: 20, s: 1 },
    { l: 78, t: 18, w: 18, s: 0.9 },
    { l: 8, t: 60, w: 14, s: 1.5 },
  ];

  return (
    <section className="gallery section section--dark section--over" id="gallery" ref={ref as never} data-ui="dark">
      {g.images.map((src, i) => (
        <button
          key={src}
          className="gallery__tile img"
          style={{ left: `${slots[i].l}%`, top: `${slots[i].t}%`, width: `${slots[i].w}%` }}
          data-gal={slots[i].s}
          data-cursor="Aç"
          onClick={() => setOpen(i)}
          aria-label={`Fotoğraf ${i + 1}`}
        >
          <img src={src} alt="" loading="lazy" />
        </button>
      ))}

      <div className="gallery__center" data-fade>
        <h2 className="h1">{g.heading}</h2>
        <p className="label gallery__count">{g.count}</p>
        <button className="label link" onClick={() => setOpen(0)}>
          {g.action}
        </button>
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <img src={g.images[open]} alt="" />
          <div className="lightbox__bar label">
            <button onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + g.images.length) % g.images.length); }}>← Önceki</button>
            <span>
              {String(open + 1).padStart(2, '0')} / {String(g.images.length).padStart(2, '0')}
            </span>
            <button onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % g.images.length); }}>Sonraki →</button>
          </div>
          <button className="lightbox__close label" aria-label="Kapat">Kapat</button>
        </div>
      )}
    </section>
  );
}
