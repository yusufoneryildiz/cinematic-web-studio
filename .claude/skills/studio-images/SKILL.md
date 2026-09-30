---
name: studio-images
description: Use when a site needs images and the client has none (or too few) — writes a consistent image manifest per site and generates it with fal.ai FLUX 1.1 Ultra, or picks from the studio image library in templates/. Also for removing backgrounds and keeping one "photo shoot" look across all images.
---

# Images

## Order of preference
1. The client's own photos (best for trust — even phone photos, cropped and graded).
2. The studio library: every template ships its images (`templates/*/public/img`, `templates/*/img`) and
   `START-HERE.html` shows them all. Real estate, barber/beauty, interiors, lifestyle, textures.
3. Generate new ones.

## Generate
1. Write `sites/<slug>/images.manifest.json`:
   `[{ "id": "hero", "ar": "16:9", "p": "<prompt>" }, …]` — one entry per image slot in the section map.
2. Put `FAL_KEY=...` in `.env` at the studio root (https://fal.ai → Dashboard → Keys). ~$0.06 per image.
3. `node .claude/skills/studio-images/scripts/gen-images.mjs sites/<slug>/images.manifest.json sites/<slug>/img`
   (existing files are skipped — delete one to regenerate it).

## Prompt rules (what made the template images look like one shoot)
- Start with the genre: "Editorial architectural photograph…", "Editorial fashion photograph…".
- Same light words in every prompt of a site (e.g. "warm soft window light, muted desaturated grade,
  subtle 35mm film grain").
- End with "no text, no logos".
- Proven prompts to copy from: `templates/barber-zanaat-meraki/scripts/images.manifest.json`,
  `templates/real-estate-koru/scripts/images.manifest.json`, `prompts/10-luxury-image-prompts.md`.
- Check every result against its copy (a New York skyline under a line about Istanbul is a bug).
