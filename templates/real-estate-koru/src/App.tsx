import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { resolveSite } from './content';
import { initSmoothScroll, ScrollTrigger } from './lib/anim';

import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Location } from './components/Location';
import { Panorama } from './components/Panorama';
import { Architecture } from './components/Architecture';
import { Gallery } from './components/Gallery';
import { Daily } from './components/Daily';
import { Lobby } from './components/Lobby';
import { Advantages } from './components/Advantages';
import { Fitness } from './components/Fitness';
import { Infrastructure } from './components/Infrastructure';
import { Park } from './components/Park';
import { Apartments } from './components/Apartments';
import { Services } from './components/Services';
import { Penthouse } from './components/Penthouse';
import { Closing } from './components/Closing';

const site = resolveSite();

export default function App() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--accent', site.theme.accent);
    document.title = site.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', site.meta.description);
    document.documentElement.dataset.site = site.key;
  }, []);

  useEffect(() => initSmoothScroll(), []);

  /* Görseller yüklendikçe pin ölçüleri kayar; yeniden hesapla. */
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 500);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      clearTimeout(id);
      window.removeEventListener('load', onLoad);
    };
  }, [ready]);

  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader site={site} onDone={onDone} />
      <Cursor />
      <Nav site={site} ready={ready} />

      <main>
        <Hero site={site} ready={ready} />
        <About site={site} />
        <Location site={site} />
        <Panorama site={site} />
        <Architecture site={site} />
        <Gallery site={site} />
        <Daily site={site} />
        <Lobby site={site} />
        <Advantages site={site} />
        <Fitness site={site} />
        <Infrastructure site={site} />
        <Park site={site} />
        <Apartments site={site} />
        <Services site={site} />
        <Penthouse site={site} />
        <Closing site={site} />
      </main>
    </>
  );
}
