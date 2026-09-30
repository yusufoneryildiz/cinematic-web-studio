# Install — 15 minutes, once

The studio is a folder you open with **Claude Code**. Everything the studio knows — agents, skills,
slash commands, rules — lives in `CLAUDE.md` and `.claude/` and loads automatically.

## 1. Required

| What | Why | How |
|---|---|---|
| Claude Code | runs the studio | https://claude.com/claude-code (any paid Claude plan) |
| Node.js 18+ | React templates, image script | https://nodejs.org |
| Python 3.10+ | capture, QA, reel scripts | https://python.org |
| Playwright + Pillow | headless browser + contact sheets | `pip install playwright pillow` then `python -m playwright install chromium` |
| ffmpeg | `/reel` | Windows `winget install Gyan.FFmpeg` · macOS `brew install ffmpeg` · Linux `apt install ffmpeg` |

## 2. Recommended

Run these once in a terminal (not inside Claude):

```
claude mcp add playwright -- npx @playwright/mcp@latest
```
Playwright MCP lets Claude click around a live site interactively (the studio scripts work without it).

Inside Claude Code:
```
/plugin install context7@claude-plugins-official      # up-to-date GSAP / Three.js / React docs
/plugin install firecrawl@claude-plugins-official     # faster web research (needs a free Firecrawl key)
```

## 3. Optional — image generation

Create `.env` in this folder:
```
FAL_KEY=your-key-from-fal.ai
```
(~$0.06 per image with FLUX 1.1 Ultra.) Without a key the studio uses the bundled image library and
the client's photos.

## 4. Check the install

```
cd Cinematic-Web-Studio
python .claude/skills/studio-quality-check/scripts/scroll_test.py templates/showcase-screen/index.html --out sites/_install-check
```
You should get `desktop-scroll.jpg`, `pinned-sections.jpg`, `mobile.jpg` in `sites/_install-check` and
`"page_errors": []`.

## 5. First run

```
cd Cinematic-Web-Studio
claude
```
Then try one of:
```
/new-site A premium barbershop in Kadıköy, Istanbul — Turkish, booking via WhatsApp
/rebuild https://<an-awwwards-site-you-like> for "Olea", a boutique olive-oil brand in Ayvalık
/reel C:\videos\laptop-take-1.mp4
/qa sites/olea/index.html
```
You can write in any language; Claude answers in yours.

## Troubleshooting
- **`capture_reference.py` stops early** — some award sites use custom scrolling. The script says where in
  `summary.json`; add `--steps 300`, or let Claude finish the map from `outline.json`.
- **3D hero shows nothing** — the demo needs a WebGL-capable browser and internet (libraries load from CDN).
- **`ffmpeg` not found** — reopen the terminal after installing so PATH updates.
