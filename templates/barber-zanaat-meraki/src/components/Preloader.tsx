import { useEffect, useRef, useState } from 'react';
import { gsap, reduceMotion } from '../lib/anim';

/**
 * Sayaç + marka + perde açılışı.
 * onDone, perde kalkmaya başladığı anda tetiklenir; hero animasyonu
 * perdenin arkasında değil, perde kalkarken başlasın diye.
 */
export function Preloader({ brand, onDone }: { brand: string; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduceMotion()) {
      setGone(true);
      onDone();
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    const state = { n: 0 };
    const tl = gsap.timeline();

    tl.from('[data-pl-brand] > span', {
      yPercent: 110,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.04,
    })
      .to(
        state,
        {
          n: 100,
          duration: 1.9,
          ease: 'power2.inOut',
          onUpdate: () => setCount(Math.round(state.n)),
        },
        0.1
      )
      .to('[data-pl-inner]', { opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.1')
      .add(() => {
        document.documentElement.style.overflow = '';
        onDone();
      })
      .to('[data-pl-panel]', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.1,
        ease: 'expo.inOut',
        stagger: 0.06,
      })
      .add(() => setGone(true));

    return () => {
      tl.kill();
      document.documentElement.style.overflow = '';
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__panels">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} data-pl-panel />
        ))}
      </div>
      <div className="preloader__inner" data-pl-inner>
        <div className="preloader__brand display" data-pl-brand>
          {brand.split('').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <div className="preloader__count label">{String(count).padStart(3, '0')}</div>
      </div>
    </div>
  );
}
