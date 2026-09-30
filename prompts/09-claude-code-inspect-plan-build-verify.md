# 09 · Claude Code: inspect -> plan -> build -> verify

Use this before touching any existing client project.

```
Before we change anything, inspect this project and build a mental model. Don't write code yet.
1. Framework, language, package manager, how it is run and deployed.
2. Where pages, shared components, styles and assets live.
3. Conventions: naming, animation library in use, how images are loaded, breakpoints.
4. Anything fragile: global CSS that would fight new sections, scroll libraries already installed.
Summarise in under 250 words (Stack / Structure / Conventions / Risks).
When I confirm, plan the new section against these conventions, build it, then open the page in a
browser at 1440x900 and 390x844, screenshot it, and list anything that overlaps, clips or breaks.
```
