---
name: studio-new-site
description: Use when the user wants a new website for a business or brand from a description ("build a site for my barbershop", "kuaförüm için site yap", /new-site) — runs the studio pipeline brief → copy → design system → build from the nearest template → images → QA. Not for rebuilding a specific reference URL (use studio-rebuild-reference).
---

# New site from a brief

## 1. Brief (creative-director)
Collect or ask for: business, what they sell, city/market, audience, price segment, 3 tone adjectives,
language, pages needed, must-have contact actions (WhatsApp, booking, phone, map), the client's own
photos (yes/no). Write `sites/<slug>/docs/brief.md`. Ask only what you can't reasonably infer.

## 2. Pick the starting template

| Sector / need | Template | Why |
|---|---|---|
| Real estate, hotel, luxury, "wow" one-pager | `templates/mavera-cinematic-real-estate` | 14 cinematic sections, 3D hero |
| Barber, salon, beauty, craft | `templates/barber-zanaat-meraki` (two brands in one codebase) | Multi-page React, booking-first |
| Real estate project, multi-page | `templates/real-estate-koru` | Project/apartment pages, gallery, map |
| Restaurant, café, shop, anything to film for Reels | `templates/showcase-screen` | Config-driven one screen |

Copy it to `sites/<slug>/`. For React templates: `npm install && npm run dev`; all copy lives in
`src/content/*.ts` — change content there first, components second.

## 3. Copy (copywriter)
Section-by-section copy table in the brief's language. Short headlines, one CTA verb per section.

## 4. Design system (premium-ui-designer)
Colours from the brand, 3 font roles, spacing scale → `docs/design-system.md`, then apply to the
template's CSS variables / theme file.

## 5. Images (studio-images)
Client photos first. Otherwise write a manifest for every image slot and generate with FLUX.
Reuse the prompt style of `templates/*/scripts/images.manifest.json` — they are proven.

## 6. Motion (cinematic-motion-engineer)
Keep the template's motion; add at most 2 signature effects from `studio-effects-library` that the brief
justifies.

## 7. QA (studio-quality-check) — mandatory
Fix everything the QA reviewer reports as must-fix, re-run, then show the user the contact sheets.

## Sector presets (starting points, not rules)

| Sector | Palette | Type | Signature motion |
|---|---|---|---|
| Luxury real estate | black / warm white / brass | Cormorant caps + Pinyon Script | 3D ribbons, pinned gallery, map pins |
| Barber / grooming | charcoal / bone / gold | condensed grotesk + serif italic | hard cuts, image masks, marquee |
| Beauty / salon | ivory / blush / deep plum | high-contrast serif | soft parallax, circular reveals |
| Restaurant / grill | near-black / ember orange | serif display + sans | sparks particles, steam, Ken Burns |
| Café | cream / espresso / sage | rounded serif | slow zooms, horizontal menu cards |
| Clinic / dental | white / deep teal | clean sans | calm fades, trust numbers counting |
| Car wash / detailing | graphite / electric blue | wide grotesk | before/after slider, water particles |
