---
name: studio-rebuild-reference
description: Use when the user gives a reference website URL (Awwwards, SiteInspire, a competitor) and wants the same look and motion for their own or a client's brand ("make it like this site", "bu siteyi kendi markamla yap", /rebuild <url>). Captures the reference, maps every section, writes original copy and rebuilds the design language — never its text, images or logo.
---

# Rebuild a reference site as your own brand

This is how `templates/mavera-cinematic-real-estate` was made from an award-winning real-estate site.

## 1. Capture (reference-analyst)
```
python .claude/skills/studio-rebuild-reference/scripts/capture_reference.py <URL> --out sites/<slug>/reference
```
- Long award sites need `--steps 250` or more; the script stops early at the page end on normal sites.
- It moves the mouse to the window edge (carousels in the middle capture the wheel) and, when frames
  stop changing, tries PageDown and native scroll before giving up. If `summary.json` reports
  `stuck_at_frame`, read the remaining sections from `outline.json` — component class names
  (`sticky-slider`, `map-pin`, `webgl`, `cursor`) identify what they are.
- **Sites behind a bot check** (Cloudflare "Just a moment…", CAPTCHA): the script detects it and stops —
  never try to bypass it. Ask the user to screen-record the site in their own browser (1080p, fullscreen,
  slow scroll top to bottom, 1–2 min; OBS or Win+Alt+R) and run
  `python …/capture_reference.py --video <recording.mp4> --out sites/<slug>/reference` (`--every 0.5`
  for fast sites). Read motion by comparing consecutive frames.
- Look at every `contact-*.jpg`. Write `docs/reference-map.md` (one row per section: height, light/dark,
  layout, type, motion, images).

## 2. Section map for the new brand (creative-director + copywriter)
Same number of sections, same light/dark rhythm, same motion per section — new brand, new copy.
Every headline written from scratch; check none is a paraphrase of the reference.
Name every image slot by what it must show.

## 3. Design tokens (premium-ui-designer)
Match the *feel* of the reference's type with free fonts (see the designer agent), take colour from the
new brand.

## 4. Build (cinematic-motion-engineer + frontend-builder)
Start from `templates/mavera-cinematic-real-estate/index.html` (it already contains lenis + GSAP wiring,
filming mode and 14 section patterns) and replace sections to match the map. Effects not in Mavera:
build them following `studio-effects-library` rules.

## 5. Images (studio-images)
Generate or source one image per slot. Never download the reference's images.

## 6. QA (studio-quality-check) and a side-by-side
Run the scroll test. Show the user a contact sheet of the reference next to ours and list the sections
where ours differs on purpose.

## Legal line (tell the user once)
Layout ideas and animation techniques are free to reuse; the reference's copy, photos, logo, brand
name and distinctive trademarks are not. Present the result as "inspired by", never as the reference.
