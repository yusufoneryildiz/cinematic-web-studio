# 06 · Word-by-word light-up statement

**Level:** Beginner · **Stack:** GSAP ScrollTrigger
**In the vault:** `5 · dark statement`, `10 · process statement`

```
Split the statement into <span class="w"> per word (keep the spaces). CSS: .w { opacity:.18 }.
Pinned version: timeline { pin:true, scrub:1, end:'+=150%' } -> to('.w', { opacity:1, stagger:.1 }).
Unpinned version: scrollTrigger { start:'top 70%', end:'top 5%', scrub:true }.
Big light serif caps (3-4.4vw), line-height 1.02-1.12, on black.
```
