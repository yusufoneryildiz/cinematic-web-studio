# Mavera — cinematic luxury real-estate site

A 14-section, ~33,000px scroll story for a fictional Istanbul luxury brand. One `index.html`, no build step.

**Open:** double-click `index.html` (needs internet for fonts and CDN libraries).
**Filming mode:** `F` fullscreen + hidden cursor · `Space` auto-scroll · `R` back to top · `index.html?speed=45`

| # | Section | Technique |
|---|---|---|
| 0 | Intro curtain | GSAP timeline, letter reveal + progress bar |
| 1 | Hero | Procedural glossy 3D ribbons (Three.js), script + caps title |
| 2 | Triptych | Centre image grows, side images parallax at different speeds |
| 3 | Big editorial text | Line-by-line mask reveal, staggered parallax images |
| 4 | Pinned gallery | clip-path wipes + Ken Burns inside a pin |
| 5 | Dark statement | Word-by-word light-up, rising image |
| 6 | Portrait | Circular clip-path opening to full screen |
| 7 | Three horizons | Curved CSS-3D carousel over the ribbons |
| 8 | Principles intro | Giant word with mix-blend-mode difference, splitting images |
| 9 | Horizontal cards | Pinned sideways track, counter + progress line |
| 10 | Process | Pinned word-by-word statement |
| 11 | Location | SVG map zoom, pins + swapping project cards |
| 12 | Quotes | Pinned quote carousel, "1 — 3" counter, custom cursor |
| 13 | Register | Card image grows to full screen, form fades in |
| 14 | Footer | Infinite marquee |

**Stack:** GSAP 3.12 + ScrollTrigger · Lenis · Three.js 0.170 · Google Fonts (Cormorant Garamond, Pinyon Script, Manrope)

## Make it yours
- Copy: edit the HTML sections; cards / carousel items are arrays at the top of the main `<script>`
  (`HOR`, `CARDS`).
- Images: replace files in `img/` keeping the names, or change the `src`s. 16:9 or 4:5, ~2000px.
- Colours & fonts: `:root` variables and the three font families at the top.
- Map: pins are `%` positions on the `.pin` elements; the water body is one SVG path.
- Speed of the auto-scroll: `?speed=` in seconds.

All images in this folder were AI-generated for this project; you may use them in your own and client work.
