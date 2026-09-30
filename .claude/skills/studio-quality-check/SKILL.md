---
name: studio-quality-check
description: Use before saying any site, section or effect is done, and whenever the user says "check it", "test it", "/qa". Runs the studio scroll test at desktop and mobile, captures every pinned section, collects console errors and overflow, and reviews the screenshots for overlap, clipping, centring, gaps, contrast and copy/image mismatches.
---

# Quality check

```
python .claude/skills/studio-quality-check/scripts/scroll_test.py sites/<slug>/index.html --out sites/<slug>/qa
# or a dev server:  python … scroll_test.py http://localhost:5173 --out sites/<slug>/qa
```
Outputs `desktop-scroll.jpg`, `pinned-sections.jpg`, `mobile.jpg`, `report.json`.

## Review (visual-qa-reviewer) — look at every sheet
Must-fix:
- any entry in `console_errors` / `page_errors`
- `mobile_horizontal_overflow_px` > 0 on a production site
- text overlapping text/images; descenders clipped; an element that should be centred and isn't
- a pinned section that shows nothing at 20% or 55%
- image content contradicting the copy
Should-fix:
- empty gaps > half a viewport, weak contrast over images, inconsistent spacing

Showcase pages (sized in `vw`) are judged at 1440×900; their mobile sheet is informational.
Fix, re-run, and show the user the final sheets — never claim "done" without them.
