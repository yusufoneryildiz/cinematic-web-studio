---
name: studio-effects-library
description: Use when adding or fixing a specific cinematic web effect — 3D ribbon hero, intro curtain, pinned clip-path gallery, circular portrait reveal, curved 3D carousel, horizontal sticky cards, word-by-word reveal, SVG map with pins, quote carousel with custom cursor, register reveal, marquee, filming/auto-scroll mode. Points to a working implementation of each and the rules that make it work.
---

# Effects library

Every effect below has a working, tested implementation in
`templates/mavera-cinematic-real-estate/index.html`. Search the file for the section comment, copy the
HTML + CSS + the matching GSAP block, then adapt. Detailed rebuild prompts: `prompts/02…08`.

| Effect | Search for | Prompt |
|---|---|---|
| Intro curtain (logo reveal, page slides up) | `intro curtain` | — |
| Glossy black 3D ribbons (Three.js, procedural) | `3D ribbons (Three.js)` | `prompts/02` |
| Script + caps hero title with letter-spacing entrance | `1 · hero` | `prompts/02` |
| Triptych: centre image grows, sides parallax | `2 · triptych` | — |
| Line-by-line mask reveal + staggered parallax images | `3 · big editorial text` | — |
| Pinned full-screen clip-path gallery | `4 · pinned gallery` | `prompts/03` |
| Word-by-word light-up statement | `5 · dark statement` / `10 · process` | `prompts/06` |
| Circular clip-path portrait opening to full screen | `6 · portrait` | — |
| Curved CSS-3D carousel over the ribbons | `7 · three horizons` | `prompts/04` |
| Giant word with mix-blend-mode + splitting images | `8 · principles intro` | — |
| Horizontal sticky cards with counter | `9 · horizontal` | `prompts/05` |
| SVG map zoom with pins + swapping cards | `11 · location` | `prompts/07` |
| Pinned quote carousel, "1 — 3" counter, custom cursor | `12 · quotes` | — |
| Card image grows to full screen, form fades in | `13 · register` | — |
| Infinite marquee footer | `footer marquee` | — |
| Filming mode: Space auto-scroll, R top, F fullscreen | `FILMING MODE` | `guides/01` |
| Always-moving showcase screen with particles | `templates/showcase-screen` | `prompts/08` |

## Rules that make them work
1. Lenis → `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(t => lenis.raf(t*1000))`.
2. Pins: `pin:true, scrub:1`, end length proportional to the content; one timeline per pin.
3. Centred elements animated by GSAP: centre with `xPercent/yPercent`, not CSS translate.
4. Line masks: `overflow:hidden` + `padding-bottom:.1em; margin-bottom:-.1em` so descenders survive.
5. Three.js: pause off-screen, exposure ~0.75, environmentIntensity ~0.28 for "black lacquer".
6. Showcase pages in `vw`; production sites mobile-first — Mavera itself is a laptop showcase and
   scales down, it is not a mobile layout (use the React templates for mobile-first client sites).
7. After adding any effect run `studio-quality-check` and look at `pinned-sections.jpg`.
