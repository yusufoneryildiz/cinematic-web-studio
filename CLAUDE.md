# Cinematic Web Studio — operating manual

This project is a website studio. You (Claude) run it with the agents in `.claude/agents/`, the skills
in `.claude/skills/` and the templates in `templates/`. Reply in the language the user writes in;
write site copy in the language the user asks for (default: the brand's market language).

## What the user can ask for — and where it routes

| Request | Route |
|---|---|
| "Build a site for <business>" / `/new-site` | skill `studio-new-site` |
| "Make a site like <URL>" / `/rebuild <URL>` | skill `studio-rebuild-reference` |
| "Add a <effect> section" (3D hero, curved carousel, pinned gallery…) | skill `studio-effects-library` |
| "Generate images for the site" | skill `studio-images` |
| "Make an Instagram Reel of this site" / `/reel` | skill `studio-reels` |
| "Check it" / `/qa` — and ALWAYS before saying a site is done | skill `studio-quality-check` |

Design taste and scroll storytelling come from the bundled `frontend-design` and `scroll-experience`
skills; use them alongside the studio skills.

## The team (subagents)

| Agent | Owns |
|---|---|
| `creative-director` | brand brief, creative direction, final "does this feel premium" review |
| `reference-analyst` | capturing and dissecting a reference site into a section/motion table |
| `copywriter` | all site copy — original, never a paraphrase of a reference |
| `premium-ui-designer` | design tokens: colour, type, spacing, component visuals |
| `cinematic-motion-engineer` | GSAP/ScrollTrigger/Lenis/Three.js motion, pinned stories, 3D |
| `frontend-builder` | production code in the chosen stack |
| `visual-qa-reviewer` | screenshots at real viewports, overlap/clipping/contrast/console checks |
| `performance-engineer` | image weight, lazy loading, Core Web Vitals |

Delegate when a phase is big enough to benefit; for a small edit just do it yourself.

## Hard rules

1. **Original copy and assets only.** When rebuilding a reference, copy its *structure and motion*,
   never its text, photos, logos, brand name or trademarks. Headlines are written from scratch.
2. **Look before you claim.** A site is not "done" until `studio-quality-check` has produced
   screenshots at 1440×900 and 390×844 and you have looked at them.
3. **Size in `vw`** for showcase/demo pages so they look identical on any laptop that films them.
   Production sites follow normal responsive practice (mobile-first, `clamp()` type).
4. **Copy the nearest template first** (`templates/`), then adapt. Don't start from an empty file
   when a template already solves 70% of the page.
5. Images: the client's own photos first; otherwise generate them (`studio-images`). Never hot-link
   or reuse a reference site's images.
6. Keep every site in its own folder: `sites/<slug>/`.

## Stack choice

| Case | Stack | Start from |
|---|---|---|
| Showcase page to film for Reels, one-off demo, reference rebuild | one `index.html` + GSAP + Lenis (+ Three.js) from CDN | `templates/mavera-cinematic-real-estate`, `templates/showcase-screen` |
| Real client site (several pages, SEO, deploy) | Vite + React + TypeScript + GSAP + Lenis | `templates/barber-zanaat-meraki`, `templates/real-estate-koru` |

## Tools this studio expects (see INSTALL.md)

- Python 3 + `playwright` + `pillow` (capture, screenshots, contact sheets) — required
- ffmpeg — required for `/reel`
- Playwright MCP — recommended (interactive browsing)
- `FAL_KEY` in `.env` — optional (image generation)
- Firecrawl plugin — optional (faster reference research)
