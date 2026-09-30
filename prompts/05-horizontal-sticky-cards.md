# 05 · Horizontal sticky cards (vertical scroll -> sideways story)

**Level:** Intermediate · **Stack:** GSAP ScrollTrigger
**In the vault:** `9 · horizontal sticky cards`

```
Pinned 100vh section containing a flex track (gap 8vw, padding-left 6vw) of 5 cards, each 72vw wide:
left a tall image (30vw); right: small label "Principle 0X", a script word + caps word title,
a short paragraph, and a mini image with a caption.
dist = track.scrollWidth - innerWidth + 6vw.
Timeline with ScrollTrigger { pin, scrub:1, end: () => '+=' + dist*1.2, invalidateOnRefresh:true }:
track x -> -dist; a bottom progress line width 0 -> 100%; card images scale 1.25 -> 1.
Update a counter "01 / 05" from the trigger's progress in onUpdate.
```
