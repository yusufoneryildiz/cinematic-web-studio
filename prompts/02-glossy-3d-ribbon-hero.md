# 02 · Glossy black 3D ribbon hero

**Goal:** a black hero with slowly turning, lacquered black ribbons behind an elegant two-line title.
**Level:** Advanced · **Stack:** Three.js (no model files — the ribbons are generated in code)
**In the vault:** `mavera-cinematic-real-estate/index.html` → `3D ribbons (Three.js)` + `1 · hero`

```
Create a full-screen hero: black background, a <canvas> behind centred text.
In Three.js, generate 3 flat ribbons procedurally: for each, a closed CatmullRomCurve3 through 5-6
points spread across the frame; build a strip mesh along it (400 segments), width 0.45-0.75, twisting
with sin(t*2*PI)*0.9 around the tangent. One shared MeshPhysicalMaterial: color #020202, metalness 0.6,
roughness 0.22, clearcoat 1, DoubleSide. Lighting: RoomEnvironment through PMREM with
scene.environmentIntensity 0.28, ACES tone mapping at exposure 0.75, one key and one rim light.
Rotate the group slowly (y += 0.09 rad/s, x and z drifting on slow sines). Pause rendering when the
canvas is off screen (IntersectionObserver).
Title: line 1 in a script font (Pinyon Script, 5.4vw), line 2 in light serif caps (Cormorant 300,
4.7vw). Entrance: script fades in, caps fade in while letter-spacing tightens from .18em to .01em.
```

**Tuning:** too grey/white -> lower exposure and environmentIntensity; too flat -> raise clearcoat and the rim light.
