import { useEffect, useRef, useState } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, ScrollTrigger, reduceMotion } from '../lib/anim';

/**
 * Zorge'un imzası: hero'dan sonra her ekranda sol üstte DEV logo.
 * Hero görünürken logo gizli (hero'nun kendi dev wordmark'ı var); about
 * bölümü hero'nun üstüne kaymaya başlayınca beliriyor.
 * Renk, altındaki bölümün data-ui değerine göre ters dönüyor.
 */
export function Nav({ site, ready }: { site: SiteContent; ready: boolean }) {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  /* Sağ taraf (CTA + menü) hemen, logo hero geçilince */
  useEffect(() => {
    if (!ready || !bar.current) return;
    const el = bar.current;

    if (!reduceMotion()) {
      gsap.fromTo('[data-nav-right] > *', { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08, delay: 0.5 });
    }

    const st = ScrollTrigger.create({
      start: () => window.innerHeight * 0.55,
      end: 99999,
      onToggle: (self) => el.classList.toggle('nav--logo', self.isActive),
    });
    return () => st.kill();
  }, [ready]);

  /* Bölüm rengine göre nav rengi */
  useEffect(() => {
    if (!ready || !bar.current) return;
    const el = bar.current;
    const sections = document.querySelectorAll<HTMLElement>('[data-ui]');
    const triggers = Array.from(sections).map((sec) =>
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 60px',
        end: 'bottom 60px',
        onToggle: (self) => {
          if (self.isActive) el.dataset.ui = sec.dataset.ui;
        },
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [ready]);

  /* Menü açılışı */
  useEffect(() => {
    if (!open) return;
    const tl = gsap.timeline();
    tl.fromTo('[data-menu]', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
      .fromTo('[data-menu-item] > span', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 }, '-=0.4')
      .fromTo('[data-menu-foot]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      tl.kill();
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${open ? 'nav--open' : ''}`} ref={bar} data-ui="dark">
        <a className="nav__logo wordmark" href="#top" aria-label={`${site.brand.name} ${site.brand.number}`}>
          {site.brand.name}
          <span className="wordmark__num">{site.brand.number}</span>
        </a>

        <div className="nav__right" data-nav-right>
          <a className="nav__cta label" href={site.ctaUrl} target="_blank" rel="noreferrer">
            {site.ctaLabel}
          </a>
          <button
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      {open && (
        <nav className="menu" data-menu>
          <ul className="menu__list">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} className="menu__item h1 reveal-line" data-menu-item onClick={() => setOpen(false)}>
                  <span>
                    <small className="label">0{i + 1}</small>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot" data-menu-foot>
            <a className="label link" href={`tel:${site.phone.replace(/\s/g, '')}`}>
              {site.phone}
            </a>
            <div className="menu__social">
              {site.footer.social.map((s) => (
                <a key={s.label} className="label link" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Mobilde hero geçilince beliren yapışkan CTA */}
      <a className="sticky-cta label" href={site.ctaUrl} target="_blank" rel="noreferrer">
        {site.ctaLabel}
      </a>
    </>
  );
}
