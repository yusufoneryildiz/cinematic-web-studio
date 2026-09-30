import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Lenis'i kurar ve ScrollTrigger'ı ona bağlar.
 * ScrollTrigger'ın scroll pozisyonunu Lenis'ten okuması şart,
 * yoksa pin'lenen bölümler bir kare geriden gelir.
 */
export function initSmoothScroll(): () => void {
  if (reduceMotion()) return () => {};

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);

  /* Tanıtım videosunu çekerken Playwright sayfayı buradan sürüyor:
     lenis.scrollTo(hedef, { duration }) tek çağrıda pürüzsüz iniyor. */
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && typeof value === 'number') lenis.scrollTo(value, { immediate: true });
      return lenis.scroll;
    },
  });

  // Hash bağlantıları Lenis üzerinden aksın
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}

/** gsap.context ile kapsamlanmış layout effect — unmount'ta her şeyi temizler. */
export function useGsap(
  setup: (ctx: { scope: HTMLElement }) => void,
  deps: unknown[] = []
) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const scope = ref.current;
    const ctx = gsap.context(() => setup({ scope }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Bir metni satır satır maskeleyip yukarı kaydırarak açar.
 * `.reveal-line > span` yapısındaki elemanları hedefler.
 */
export function revealLines(
  scope: HTMLElement | null,
  selector = '.reveal-line > span',
  opts: { trigger?: Element; start?: string; stagger?: number; delay?: number } = {}
) {
  if (!scope) return;
  const targets = scope.querySelectorAll(selector);
  if (!targets.length) return;

  if (reduceMotion()) {
    gsap.set(targets, { yPercent: 0, opacity: 1 });
    return;
  }

  gsap.fromTo(
    targets,
    { yPercent: 108, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.05,
      ease: 'expo.out',
      stagger: opts.stagger ?? 0.075,
      delay: opts.delay ?? 0,
      scrollTrigger: {
        trigger: opts.trigger ?? scope,
        start: opts.start ?? 'top 82%',
        once: true,
      },
    }
  );
}

/** Görselin içindeki <img>'i scroll boyunca yavaşça kaydırır (parallax). */
export function parallaxImage(el: HTMLElement | null, amount = 14) {
  if (!el || reduceMotion()) return;
  const img = el.querySelector('img');
  if (!img) return;

  gsap.fromTo(
    img,
    { yPercent: -amount, scale: 1.16 },
    {
      yPercent: amount,
      scale: 1.16,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    }
  );
}

/** Aşağıdan yükselerek + clip açılarak gelen blok. */
export function revealBlock(
  el: Element | Element[] | NodeListOf<Element> | null,
  opts: { y?: number; stagger?: number; start?: string; trigger?: Element } = {}
) {
  if (!el) return;
  if (reduceMotion()) {
    gsap.set(el, { opacity: 1, y: 0 });
    return;
  }
  gsap.fromTo(
    el,
    { opacity: 0, y: opts.y ?? 42 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: opts.stagger ?? 0.09,
      scrollTrigger: {
        trigger: opts.trigger ?? (Array.isArray(el) ? el[0] : (el as Element)),
        start: opts.start ?? 'top 86%',
        once: true,
      },
    }
  );
}

/** `.img--veil` perdelerini bölüm görünür olunca yukarı doğru açar, görseli de hafif yaklaştırır. */
export function veilImages(scope: HTMLElement | null, selector = '.img--veil') {
  if (!scope) return;
  const items = scope.querySelectorAll<HTMLElement>(selector);
  items.forEach((el) => {
    if (reduceMotion()) return;
    const img = el.querySelector('img');
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 100%', once: true } })
      .fromTo(el, { '--veil-scale': 1 }, { '--veil-scale': 0, duration: 0.9, ease: 'expo.inOut' }, 0)
      .fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.3, ease: 'expo.out' }, 0.05);
  });
}

/** Sayfaya giren her `[data-fade]` elemanını yumuşakça yukarı kaydırarak gösterir. */
export function fadeUps(scope: HTMLElement | null) {
  if (!scope) return;
  const items = scope.querySelectorAll<HTMLElement>('[data-fade]');
  items.forEach((el) => revealBlock(el, { y: Number(el.dataset.fade) || 36 }));
}
