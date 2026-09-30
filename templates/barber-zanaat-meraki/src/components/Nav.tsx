import { useEffect, useRef, useState } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, ScrollTrigger, reduceMotion } from '../lib/anim';

export function Nav({ site, ready }: { site: SiteContent; ready: boolean }) {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  /* Aşağı kaydırırken gizlen, yukarı kaydırırken geri gel. */
  useEffect(() => {
    if (!ready || !bar.current || reduceMotion()) return;
    const el = bar.current;

    gsap.fromTo(
      el,
      { yPercent: -110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.35 }
    );

    const st = ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        if (open) return;
        gsap.to(el, {
          yPercent: self.direction === 1 && self.scroll() > 400 ? -110 : 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      },
    });

    return () => st.kill();
  }, [ready, open]);

  /* Nav rengini altındaki bölüme göre çevir.
     mix-blend-mode denendi ama fotoğraf üzerinde markayı camgöbeğine
     çeviriyordu; bölüm bazlı sınıf her zaman doğru rengi veriyor. */
  useEffect(() => {
    if (!ready || !bar.current) return;
    const el = bar.current;
    const darkSections = document.querySelectorAll<HTMLElement>('[data-nav-dark]');
    let depth = 0;

    const apply = () => el.classList.toggle('nav--light', depth > 0);

    const triggers = Array.from(darkSections).map((sec) =>
      ScrollTrigger.create({
        trigger: sec,
        start: 'top top+=34px',
        end: 'bottom top+=34px',
        onToggle: (self) => {
          depth += self.isActive ? 1 : -1;
          depth = Math.max(0, depth);
          apply();
        },
      })
    );

    apply();
    return () => triggers.forEach((t) => t.kill());
  }, [ready]);

  /* Mobil yapışkan buton hero'daki butonun üstüne binmesin:
     hero'yu geçtikten sonra görünsün. */
  useEffect(() => {
    if (!ready) return;
    const st = ScrollTrigger.create({
      start: () => window.innerHeight * 0.85,
      end: 99999,
      onToggle: (self) =>
        document.querySelector('.sticky-cta')?.classList.toggle('is-visible', self.isActive),
    });
    return () => st.kill();
  }, [ready]);

  /* Menü açılış animasyonu */
  useEffect(() => {
    if (!open) return;
    const tl = gsap.timeline();
    tl.fromTo(
      '[data-menu]',
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'expo.inOut' }
    ).fromTo(
      '[data-menu-item] > span',
      { yPercent: 115 },
      { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.055 },
      '-=0.45'
    );

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      tl.kill();
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="nav" ref={bar}>
        <button
          className="nav__burger label"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
        >
          <span className={`nav__burger-icon ${open ? 'is-open' : ''}`}>
            <i />
            <i />
          </span>
          <span className="nav__burger-text">{open ? 'KAPAT' : 'MENÜ'}</span>
        </button>

        <a className="nav__brand display" href="#top" aria-label={site.brand}>
          {site.brand}
        </a>

        <a className="btn nav__cta" href={site.bookingUrl} target="_blank" rel="noreferrer">
          {site.bookingLabel}
        </a>
      </header>

      {open && (
        <nav className="menu on-dark" data-menu>
          <div className="menu__list">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="menu__item display reveal-line"
                data-menu-item
                onClick={() => setOpen(false)}
              >
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="menu__foot shell">
            <div>
              {site.locations.items.map((l) => (
                <p key={l.name} className="menu__loc">
                  <span className="label">{l.name}</span>
                  <br />
                  {l.address[0]}
                  <br />
                  <a href={`tel:${l.phone.replace(/\s/g, '')}`}>{l.phone}</a>
                </p>
              ))}
            </div>
            <div className="menu__social">
              {site.footer.social.map((s) => (
                <a key={s.label} className="label" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Mobilde sürekli görünen yapışkan randevu butonu */}
      <a className="sticky-cta btn" href={site.bookingUrl} target="_blank" rel="noreferrer">
        {site.bookingLabel}
      </a>
    </>
  );
}
