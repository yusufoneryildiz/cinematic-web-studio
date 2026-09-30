# 03 · Pinned full-screen gallery with clip-path reveals

**Goal:** the page stops, and full-screen photos wipe in from the bottom one after another while a
title stays centred.
**Level:** Intermediate · **Stack:** GSAP ScrollTrigger
**In the vault:** `4 · pinned gallery`

```
Section height 100vh, overflow hidden. Stack 4 full-bleed images absolutely (inset:0).
Every frame except the first starts at clip-path: inset(100% 0 0 0); every image starts at scale 1.18.
One timeline, ScrollTrigger { pin: true, scrub: 1, end: '+=' + frames*90 + '%' }:
- at position i: image i scales 1.18 -> 1 over 1 unit (ease none)
- at position i - 0.3: frame i clip-path -> inset(0% 0 0 0) over 0.6 (power2.inOut)
Above the images: a radial + bottom gradient shade and a centred caps title with a small label under it.
```
