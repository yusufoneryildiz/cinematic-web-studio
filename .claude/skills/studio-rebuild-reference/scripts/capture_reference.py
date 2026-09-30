"""Capture a reference website for rebuilding.

    python capture_reference.py <url> --out sites/<slug>/reference [--steps 220] [--step-px 500]

Scrolls the page at 1440x900 with the mouse wheel, saves a screenshot per step, detects when the page
stops moving (custom/virtual scroll, carousels that capture the wheel), tries to unstick it, and writes:
  frames/NNN.jpg        every step
  contact-N.jpg         20 frames per sheet, numbered
  outline.json          every section: position, height, classes, headings, images/videos/canvases
  summary.json          fonts, colours, frames, where scrolling got stuck
"""
import argparse, json, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image, ImageChops, ImageDraw, ImageStat
sys.stdout.reconfigure(encoding='utf-8', errors='replace')  # Windows konsolu (cp1254) Türkçe/özel karakterde çökmesin

OUTLINE_JS = r"""() => {
  const pick = [...document.querySelectorAll('main section, body > section, main > div > section, footer, [class*="section"]')]
    .filter((s, i, a) => s.offsetHeight > 150 && !a.some(o => o !== s && o.contains(s) && o.offsetHeight > 150 && o.matches('section')));
  const seen = new Set();
  return pick.filter(s => !seen.has(s) && seen.add(s)).map((s, i) => ({
    i, tag: s.tagName, id: s.id || null,
    cls: (s.className || '').toString().replace(/\s+/g, ' ').slice(0, 160),
    top: Math.round(s.getBoundingClientRect().top + scrollY), h: s.offsetHeight,
    bg: getComputedStyle(s).backgroundColor,
    heads: [...s.querySelectorAll('h1,h2,h3,h4')].map(e => e.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 8),
    imgs: s.querySelectorAll('img,picture').length, videos: s.querySelectorAll('video').length,
    canvases: s.querySelectorAll('canvas').length,
    components: [...new Set([...s.querySelectorAll('[class]')].map(e => e.className.toString().split(' ')[0]).filter(c => c.length > 3))].slice(0, 25),
  }));
}"""

STYLE_JS = r"""() => {
  const fam = e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim();
  const fonts = {};
  document.querySelectorAll('h1,h2,h3,p,a,span,button').forEach(e => { if (e.innerText && e.innerText.trim()) { const f = fam(e); fonts[f] = (fonts[f] || 0) + 1; } });
  const colours = {};
  document.querySelectorAll('body,section,div,footer').forEach(e => { const c = getComputedStyle(e).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)') colours[c] = (colours[c] || 0) + 1; });
  const top = o => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 8);
  return { fonts: top(fonts), backgrounds: top(colours),
           nativeScroll: getComputedStyle(document.documentElement).overflow !== 'hidden' && getComputedStyle(document.body).overflow !== 'hidden',
           height: document.documentElement.scrollHeight, title: document.title };
}"""

def diff(a, b):
    a = Image.open(a).convert('L').resize((96, 60)); b = Image.open(b).convert('L').resize((96, 60))
    return ImageStat.Stat(ImageChops.difference(a, b)).mean[0]

def sheets(frames, out):
    W, H = 360, 225
    for k in range(0, len(frames), 20):
        g = frames[k:k + 20]
        s = Image.new('RGB', (W * 5, H * ((len(g) + 4) // 5)), (40, 40, 40)); d = ImageDraw.Draw(s)
        for j, f in enumerate(g):
            x, y = (j % 5) * W, (j // 5) * H
            s.paste(Image.open(f).resize((W, H)), (x, y))
            d.rectangle([x, y, x + 44, y + 18], fill=(0, 0, 0)); d.text((x + 4, y + 3), os.path.basename(f)[:3], fill=(255, 255, 255))
        s.save(os.path.join(out, f'contact-{k // 20}.jpg'), quality=80)

BLOCKED = ('just a moment', 'attention required', 'access denied', 'verify you are human', 'captcha')

def from_video(video, out, every):
    """Reference = the user's own screen recording (for sites that block automated browsers)."""
    import subprocess
    fr = os.path.join(out, 'frames'); os.makedirs(fr, exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', video, '-vf', f'fps=1/{every},scale=1440:-2', '-q:v', '4',
                    os.path.join(fr, '%03d.jpg')], check=True)
    frames = sorted(os.path.join(fr, f) for f in os.listdir(fr))
    sheets(frames, out)
    summary = {'source': 'screen recording', 'video': video, 'frames': len(frames), 'seconds_per_frame': every,
               'note': 'No DOM outline from a recording: read sections, type and motion from the contact sheets; '
                       'compare consecutive frames to see what moves.'}
    json.dump(summary, open(os.path.join(out, 'summary.json'), 'w', encoding='utf8'), indent=1, ensure_ascii=False)
    print(json.dumps(summary, ensure_ascii=False, indent=1))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('url', nargs='?'); ap.add_argument('--out', required=True)
    ap.add_argument('--video', help='use a screen recording of the reference instead of a live URL')
    ap.add_argument('--every', type=float, default=1.0, help='seconds between frames when using --video')
    ap.add_argument('--steps', type=int, default=220); ap.add_argument('--step-px', type=int, default=500)
    ap.add_argument('--width', type=int, default=1440); ap.add_argument('--height', type=int, default=900)
    a = ap.parse_args()
    if a.video:
        return from_video(a.video, a.out, a.every)
    if not a.url:
        ap.error('give a URL or --video <recording.mp4>')
    url = a.url if '://' in a.url else 'file:///' + os.path.abspath(a.url).replace('\\', '/')
    fr = os.path.join(a.out, 'frames'); os.makedirs(fr, exist_ok=True)
    frames, stuck_at, still = [], None, 0
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--use-gl=angle', '--ignore-gpu-blocklist'])
        pg = b.new_page(viewport={'width': a.width, 'height': a.height})
        pg.goto(url, wait_until='load', timeout=90000); pg.wait_for_timeout(5000)
        title = pg.title()
        if any(k in (title + ' ' + pg.inner_text('body')[:400]).lower() for k in BLOCKED):
            b.close()
            msg = {'blocked': True, 'url': a.url, 'title': title,
                   'note': 'This site shows a bot/CAPTCHA check to automated browsers. Do not try to bypass it. '
                           'Ask the user to screen-record the site in their own browser (1080p, fullscreen, slow scroll '
                           'top to bottom) and rerun with --video <file.mp4>.'}
            json.dump(msg, open(os.path.join(a.out, 'summary.json'), 'w', encoding='utf8'), indent=1)
            print(json.dumps(msg, indent=1)); return 2
        for label in ['Accept', 'Accept all', 'Allow all', 'I agree', 'OK', 'Kabul et', 'Tümünü kabul et']:
            try: pg.get_by_role('button', name=label, exact=False).first.click(timeout=800); break
            except Exception: pass
        outline = pg.evaluate(OUTLINE_JS); style = pg.evaluate(STYLE_JS)
        pg.mouse.move(8, a.height - 20)   # the edge: carousels in the middle often capture the wheel
        for i in range(a.steps):
            f = os.path.join(fr, f'{i:03d}.jpg'); pg.screenshot(path=f, type='jpeg', quality=60); frames.append(f)
            if i and diff(frames[-2], f) < 0.6:
                still += 1
                if still in (4, 8):       # try to unstick: keyboard, then native scroll
                    for _ in range(3): pg.keyboard.press('PageDown'); pg.wait_for_timeout(300)
                    pg.evaluate(f'window.scrollBy(0,{a.step_px * 2})')
                if still >= 12:
                    stuck_at = i - 12; break
            else:
                still = 0
            pg.mouse.wheel(0, a.step_px); pg.wait_for_timeout(700)
            if style['nativeScroll'] and pg.evaluate('scrollY + innerHeight >= document.documentElement.scrollHeight - 4'):
                f = os.path.join(fr, f'{i + 1:03d}.jpg'); pg.wait_for_timeout(900); pg.screenshot(path=f, type='jpeg', quality=60); frames.append(f); break
        b.close()
    sheets(frames, a.out)
    json.dump(outline, open(os.path.join(a.out, 'outline.json'), 'w', encoding='utf8'), indent=1, ensure_ascii=False)
    summary = {'url': a.url, **style, 'frames': len(frames), 'sections': len(outline), 'stuck_at_frame': stuck_at,
               'note': ('Scrolling stopped moving at frame %d — sections after it must be read from outline.json.' % stuck_at) if stuck_at is not None else 'Captured to the end.'}
    json.dump(summary, open(os.path.join(a.out, 'summary.json'), 'w', encoding='utf8'), indent=1, ensure_ascii=False)
    print(json.dumps(summary, ensure_ascii=False, indent=1))

if __name__ == '__main__':
    sys.exit(main())
