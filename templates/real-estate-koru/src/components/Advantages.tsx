import type { SiteContent } from '../content/types';
import { gsap, useGsap, reduceMotion } from '../lib/anim';

/**
 * "AYRICALIKLAR" — pinlenmiş yatay kaydırma. Her slayt: numara, başlık,
 * metin ve sağda 3:4 fotoğraf. Fotoğraflar hareket yönünün tersine hafif kayar.
 */
export function Advantages({ site }: { site: SiteContent }) {
  const items = site.advantages.items;

  const ref = useGsap(({ scope }) => {
    const track = scope.querySelector<HTMLElement>('[data-track]')!;
    if (reduceMotion()) return;

    const total = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -total(),
      ease: 'none',
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end: () => `+=${total()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const i = Math.min(items.length - 1, Math.round(self.progress * (items.length - 1)));
          scope.querySelector('[data-adv-counter]')!.textContent = String(i + 1).padStart(2, '0');
        },
      },
    });

    gsap.utils.toArray<HTMLElement>('[data-slide-img] img').forEach((img) => {
      gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: scope, start: 'top top', end: () => `+=${total()}`, scrub: true } });
    });
  });

  return (
    <section className="adv section section--dark section--over" id="advantages" ref={ref as never} data-ui="dark">
      <header className="adv__head pad">
        <h2 className="h2">{site.advantages.heading}</h2>
        <span className="label adv__counter">
          <b data-adv-counter>01</b> / {String(items.length).padStart(2, '0')}
        </span>
      </header>

      <div className="adv__track" data-track>
        {items.map((it, i) => (
          <article className="adv__slide" key={it.title.join()}>
            <div className="adv__copy">
              <span className="num adv__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h1">
                {it.title.map((l) => (
                  <span key={l}>
                    {l}
                    <br />
                  </span>
                ))}
              </h3>
              <p className="copy">{it.text}</p>
            </div>
            <figure className="adv__img img" data-slide-img>
              <img src={it.image} alt="" loading="lazy" />
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
