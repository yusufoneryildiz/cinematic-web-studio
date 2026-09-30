import { useEffect, useRef } from 'react';
import type { SiteContent } from '../content/types';
import { gsap, ScrollTrigger, reduceMotion } from '../lib/anim';

/**
 * Dikey scroll'u yatay harekete çeviren pinlenmiş galeri.
 * Referans sitede bu yok — sadece pasif kayan bir şerit var.
 * Pinlemek, videoda en çok "vay" dedirten bölüm oluyor.
 */
export function Strip({ site }: { site: SiteContent }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    const rail = track.current;
    if (!scope || !rail) return;

    if (reduceMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 861px)', () => {
        const gut = parseFloat(getComputedStyle(rail).paddingLeft) || 0;
        const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + gut);

        /* Kayma hızına göre hafif eğilme — hareketi "ağır" hissettirir.
           onUpdate ScrollTrigger oluşturulurken verilmek zorunda;
           sonradan st.vars'a atanırsa hiç çağrılmaz. */
        let last = 0;
        const onUpdate = (self: ScrollTrigger) => {
          const v = gsap.utils.clamp(-3.5, 3.5, (self.getVelocity() / 480) * -1);
          if (Math.abs(v - last) < 0.08) return;
          last = v;
          gsap.to(rail.children, {
            skewX: v,
            duration: 0.55,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        };

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate,
          },
        });

        return () => tween.kill();
      });

      /* Mobilde: parmakla kaydırılan normal şerit */
      mm.add('(max-width: 860px)', () => {
        gsap.set(rail, { x: 0 });
      });

      ScrollTrigger.refresh();
    }, scope);

    return () => ctx.revert();
  }, [site.key]);

  return (
    <section className="strip" ref={root} aria-label={site.strip.caption}>
      <div className="strip__caption display">{site.strip.caption}</div>
      <div className="strip__track" ref={track}>
        {site.strip.images.map((src, i) => (
          <figure className="strip__item img-mask" key={src + i} data-cursor="GÖRÜNTÜLE">
            <img src={src} alt="" loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}
