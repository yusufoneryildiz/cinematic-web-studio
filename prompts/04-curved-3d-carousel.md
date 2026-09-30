# 04 · Curved 3D carousel (the "inside a cylinder" gallery)

**Goal:** images arranged on the inside of a cylinder that rotates as you scroll — no WebGL needed.
**Level:** Advanced · **Stack:** CSS 3D transforms + GSAP
**In the vault:** `7 · three horizons`

```
Pinned section (end '+=260%'). A .stage with perspective:1100px; inside, .cyl with
transform-style:preserve-3d, positioned at 50% / 58%.
Place N figures (30vw x 19vw, backface-visibility hidden). For figure i:
  transform: rotateY((i-1)*STEP deg) translateZ(-R px)   with STEP = 360/11, R = innerWidth*0.52
Push the cylinder toward the camera: gsap.set(cyl, { z: R*0.62 }) so the viewer is inside the curve.
Scroll timeline: rotationY from 30 to -(N-2)*STEP; a thin progress bar fills in parallel.
Recalculate R on resize. Keep the title above the carousel and a "Scroll to explore" label below.
```

**Tip:** put the ribbon canvas from prompt 02 behind it at 80% opacity — that is the award-site look.
