# 01 · Reference → your own brand (the full prompt chain)

**Goal:** take a website you admire (e.g. an Awwwards Site of the Day) and rebuild its *design language
and motion* as an original site for your own or your client's brand — without copying its text,
photos or logo.
**Level:** Intermediate · **Works with:** Claude Code (recommended), Cursor, any agent that can browse and write files
**Stack it produces:** single `index.html` · GSAP + ScrollTrigger · Lenis · Three.js (optional)

Run the four prompts in order, in the same session. Don't skip step 2 — the section map is what makes
the result feel like the reference instead of "a generic landing page with parallax".

---

## Step 1 — Study the reference

```
Open <REFERENCE URL> at 1440×900. Scroll the full page slowly and take a screenshot every ~600px.
Some award sites hijack scrolling (custom virtual scroll); if the page stops moving, move the mouse
to the edge of the window and keep going, or read the DOM section by section instead.

Report, per section, in a table:
- order + approximate height (in viewport heights)
- background (light/dark) and layout (centered, split, full-bleed, grid)
- typography: families (serif/sans/script), size relative to viewport, case, weight
- the motion: what moves, what triggers it (load, scroll-scrub, pinned), direction, easing feel
- how many images and how they enter

Do not copy any text yet. I only want the structure and the motion vocabulary.
```

## Step 2 — Write the section map for the new brand

```
Brand: <NAME>, <WHAT THEY DO>, <CITY>. Audience: <WHO>. Tone: <3 adjectives>.

Using the table from step 1, write a section map for this brand with the SAME number of sections,
the SAME order of light/dark rhythm and the SAME motion per section — but entirely original copy.
Rules:
- Every headline must be written from scratch. Nothing may be a paraphrase of the reference's lines.
- Keep headlines short (2–6 words); use a script accent word where the reference does.
- Name each image slot with what it should show, so I can generate or pick photos for it.
Output: a numbered list — section name, headline, subline, image slots, motion.
```

## Step 3 — Build it

```
Build the section map as ONE self-contained index.html (inline CSS/JS, fonts from Google Fonts,
libraries from cdnjs/jsdelivr: gsap 3.12 + ScrollTrigger, lenis, three 0.170 via importmap if 3D is needed).

Engineering rules:
- Size everything in vw so the page looks identical on any laptop screen.
- Lenis for smooth scroll, wired into ScrollTrigger.update and gsap.ticker.
- Pinned sections use ScrollTrigger pin + scrub:1; never animate layout properties inside a pin
  except width/height on a single hero image.
- When GSAP animates an element that is centred with translate(-50%,-50%), set xPercent/yPercent
  in GSAP instead of CSS, or the centring breaks.
- Images from ./img/ with the slot names from step 2.
- Add a filming mode: Space = constant-speed auto-scroll to the bottom (duration from ?speed=),
  R = jump to top, F = fullscreen + hide cursor.
```

## Step 4 — Verify like a reviewer

```
Open the page at 1440×900 in a headless browser. Scroll top to bottom with the mouse wheel and
screenshot every ~1.5 viewports, plus each pinned section at 20% and 55% of its pin.
Check and fix:
- console errors
- text overlapping text or images, text clipped by overflow:hidden (descenders!)
- elements that should be centred but are not
- empty white/black gaps longer than half a viewport
- images whose content contradicts the copy (e.g. a New York skyline under a line about Istanbul)
Show me a contact sheet of the final screenshots.
```

---

**Notes**
- Photos: use your own, the client's, or generated ones (FLUX, Midjourney…). Never ship the reference's images.
- Fonts that get you 90% of the "award site" look: Cormorant Garamond 300 (caps), Pinyon Script (accents), Manrope (UI).
- This vault's `mavera-cinematic-real-estate` was built with exactly this chain — open it next to the prompts.
