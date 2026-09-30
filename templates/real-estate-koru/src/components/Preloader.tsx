import { useEffect, useRef, useState } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, reduceMotion } from '../lib/anim';

/**
 * Wordmark harf aralığı çok açıktan normale toplanırken ince bir çizgi
 * soldan sağa dolar; sonra siyah perde yukarı kalkar.
 * onDone perde kalkmaya başladığı anda tetiklenir (hero animasyonu perdeyle birlikte).
 */
export function Preloader({ site, onDone }: { site: SiteContent; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduceMotion()) {
      setGone(true);
      onDone();
      return;
    }
    document.documentElement.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(
      '[data-pl-mark]',
      { letterSpacing: '1.1em', opacity: 0 },
      { letterSpacing: '0.34em', opacity: 1, duration: 1.6, ease: 'expo.out' }
    )
      .fromTo('[data-pl-bar]', { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.2)
      .to('[data-pl-inner]', { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' }, '+=0.15')
      .add(() => {
        document.documentElement.style.overflow = '';
        onDone();
      })
      .to('[data-pl-panel]', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' })
      .add(() => setGone(true));

    return () => {
      tl.kill();
      document.documentElement.style.overflow = '';
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__panel" data-pl-panel />
      <div className="preloader__inner" data-pl-inner>
        <div className="wordmark preloader__mark" data-pl-mark>
          {site.brand.name}
          <span className="wordmark__num">{site.brand.number}</span>
        </div>
        <div className="preloader__bar">
          <i data-pl-bar />
        </div>
      </div>
    </div>
  );
}
