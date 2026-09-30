---
name: studio-reels
description: Use when the user wants an Instagram Reel / TikTok / Short that shows a website — preparing the page for filming, turning their phone video of the laptop into a finished 1080x1920 reel with hook text, CTA and music, choosing the cover, and writing the caption + hashtags. Triggers on "reel", "video for Instagram", "/reel".
---

# Website Reels

Premium website reels are phone videos of a real laptop, not screen recordings. Full guide: `guides/01`.

## 1. Prepare the page
Any studio page has filming mode: open it, press F (fullscreen, hidden cursor), then Space
(constant-speed auto-scroll; `?speed=45` = whole page in 45 s), R to restart.
For a short, always-moving shot use `templates/showcase-screen` (`?c=<concept>`).

## 2. The user films (tell them)
Dim warm room, screen at 100%, phone 1080p/4K vertical, exposure locked on the screen, wall above the
laptop (space for the hook), keyboard below (space for the CTA), 25–35 s.

## 3. Music
Ask the user for a track they have the rights to, or generate one (e.g. fal.ai Stable Audio 2.5,
~30 s, "epic motivational cinematic, drums, rising strings, big drop at 3 seconds, no vocals").
Prefer a track that is loud from the first 2 seconds.

## 4. Finish
```
python .claude/skills/studio-reels/scripts/make_reel.py --video in.mp4 --out sites/<slug>/reel/reel.mp4 \
  --top "Still using an *ordinary* website?" --bottom "Want a site like this?" --bottom-cta "DM us" \
  --music bed.wav --top-style dark
```
- `--top-style dark` on a light wall, `light` in a dark room, `box` if the wall is busy.
- Output: 1080×1920, -14 LUFS, room sound removed (`--keep-sound` to mix it in), `cover.jpg`
  (sharpest frame) and `cover-candidates.jpg` — look at the candidates; the sharpest frame is not always
  the most striking one.
- Grab a frame at 3 s and check the texts don't cover the laptop screen before handing it over.

## 5. Caption
Formula in `guides/02`: "What if a <sector> website felt like <unexpected>?" → 3 short lines → why it
matters → `Comment "<KEYWORD>"` → 10–15 hashtags. Write it in the audience's language. If the site is a
concept for a fictional brand, say so in the caption.
