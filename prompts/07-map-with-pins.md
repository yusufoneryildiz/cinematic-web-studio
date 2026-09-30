# 07 · Stylised map with pins and swapping project cards

**Level:** Intermediate · **Stack:** inline SVG + GSAP
**In the vault:** `11 · location map`

```
Pinned dark section. Draw an abstract map as inline SVG (1600x1000, preserveAspectRatio slice):
a faint 40px grid pattern, one hand-drawn path for the water body, a few faint road curves and
one rotated, letter-spaced label. Wrap it in .map (inset -6%) and scale it 1.35 -> 1 over the pin.
Pins: absolutely positioned (% coordinates) white dots with two soft rings and a caps label,
starting at scale 0. For pin i at time 0.3+i: pop in (back.out(3)) and fade in project card i
in the bottom-left; fade card i out at 1.1+i (except the last).
Card = small image + label "01 · Waterfront" + two-line caps name + one sentence.
```
