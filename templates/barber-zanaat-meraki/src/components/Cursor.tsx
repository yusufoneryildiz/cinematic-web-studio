import { useEffect, useRef } from 'react';
import { gsap, reduceMotion } from '../lib/anim';

/**
 * Takip eden özel imleç. `data-cursor="Metin"` taşıyan bir elemanın
 * üstüne gelindiğinde büyüyüp o metni gösterir.
 * Dokunmatik cihazlarda ve reduced-motion'da hiç render edilmez.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || reduceMotion()) return;

    const el = dot.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });

    const x = gsap.quickTo(el, 'x', { duration: 0.42, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.42, ease: 'power3' });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
      x(e.clientX);
      y(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.('[data-cursor]') as HTMLElement | null;
      const link = (e.target as HTMLElement | null)?.closest?.('a, button');
      if (t) {
        label.current!.textContent = t.dataset.cursor || '';
        el.dataset.state = 'label';
      } else if (link) {
        label.current!.textContent = '';
        el.dataset.state = 'link';
      } else {
        label.current!.textContent = '';
        el.dataset.state = '';
      }
    };

    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.25 });

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="cursor" ref={dot} aria-hidden="true">
      <span className="cursor__label" ref={label} />
    </div>
  );
}
