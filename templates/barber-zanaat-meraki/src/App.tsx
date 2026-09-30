import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { resolveSite } from './content';
import { initSmoothScroll, ScrollTrigger } from './lib/anim';

import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Strip } from './components/Strip';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { Testimonials } from './components/Testimonials';
import { Feature } from './components/Feature';
import { Locations } from './components/Locations';
import { Shout } from './components/Shout';
import { Footer } from './components/Footer';

const site = resolveSite();

export default function App() {
  const [ready, setReady] = useState(false);

  /* İçerik dosyasındaki tema tokenlarını CSS değişkenlerine bas. */
  useLayoutEffect(() => {
    const t = site.theme;
    const r = document.documentElement.style;
    r.setProperty('--bg', t.bg);
    r.setProperty('--ink', t.ink);
    r.setProperty('--dark', t.dark);
    r.setProperty('--on-dark', t.onDark);
    r.setProperty('--accent', t.accent);
    r.setProperty('--rule', t.rule);
    r.setProperty('--display', t.display);
    r.setProperty('--serif', t.serif);
    r.setProperty('--body', t.body);
    r.setProperty('--disp-wdth', String(t.displayWidth));
    r.setProperty('--radius', t.radius);

    document.title = site.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', site.meta.description);
    document.documentElement.dataset.theme = site.key;
  }, []);

  useEffect(() => initSmoothScroll(), []);

  /* Görseller yüklendikçe pin ölçüleri kayar; yeniden hesapla. */
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 400);
    window.addEventListener('load', () => ScrollTrigger.refresh());
    return () => clearTimeout(id);
  }, [ready]);

  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader brand={site.brand} onDone={onDone} />
      <Cursor />
      <Nav site={site} ready={ready} />

      <main>
        <Hero site={site} ready={ready} />
        <Story site={site} />
        <Strip site={site} />
        <Services site={site} />
        <Work site={site} />
        <Testimonials site={site} />
        <Feature site={site} />
        <Locations site={site} />
        <Shout site={site} />
      </main>

      <Footer site={site} />
    </>
  );
}
