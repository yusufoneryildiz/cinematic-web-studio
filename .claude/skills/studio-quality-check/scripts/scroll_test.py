"""Visual QA pass for a studio site.

    python scroll_test.py <index.html | http://localhost:5173> --out sites/<slug>/qa

Desktop 1440x900: wheel-scrolls the whole page and screenshots every ~1.5 viewports; if the page uses GSAP
ScrollTrigger, every pinned section is also captured at 20% and 55% of its pin.
Mobile 390x844: one screenshot per viewport, checks horizontal overflow.
Writes contact sheets + report.json (console errors, page errors, overflow, heights).
"""
import argparse, json, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw
sys.stdout.reconfigure(encoding='utf-8', errors='replace')  # Windows konsolu (cp1254) Türkçe/özel karakterde çökmesin

def sheet(files, path, W, H, cols):
    if not files: return
    s = Image.new('RGB', (W * cols, H * ((len(files) + cols - 1) // cols)), (40, 40, 40)); d = ImageDraw.Draw(s)
    for j, f in enumerate(files):
        x, y = (j % cols) * W, (j // cols) * H
        s.paste(Image.open(f).resize((W, H)), (x, y)); d.rectangle([x, y, x + 120, y + 18], fill=(0, 0, 0))
        d.text((x + 4, y + 3), os.path.basename(f)[:-4][:18], fill=(255, 255, 255))
    s.save(path, quality=82)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('target'); ap.add_argument('--out', required=True)
    a = ap.parse_args()
    url = a.target if '://' in a.target else 'file:///' + os.path.abspath(a.target).replace('\\', '/')
    os.makedirs(a.out, exist_ok=True); rep = {'target': a.target, 'console_errors': [], 'page_errors': []}
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--use-gl=angle', '--ignore-gpu-blocklist'])
        # ---- desktop
        pg = b.new_page(viewport={'width': 1440, 'height': 900})
        pg.on('console', lambda m: m.type == 'error' and rep['console_errors'].append(m.text[:300]))
        pg.on('pageerror', lambda e: rep['page_errors'].append(str(e)[:300]))
        pg.goto(url, wait_until='load', timeout=90000); pg.wait_for_timeout(6000)
        H = pg.evaluate('document.documentElement.scrollHeight'); rep['desktop_height'] = H
        shots = []; f = os.path.join(a.out, 'd-000.jpg'); pg.screenshot(path=f, type='jpeg', quality=65); shots.append(f)
        i = 0
        while pg.evaluate('scrollY + innerHeight') < H - 4 and i < 400:
            i += 1; pg.mouse.wheel(0, 450); pg.wait_for_timeout(380)
            if i % 3 == 0:
                f = os.path.join(a.out, f'd-{i:03d}.jpg'); pg.screenshot(path=f, type='jpeg', quality=65); shots.append(f)
        sheet(shots, os.path.join(a.out, 'desktop-scroll.jpg'), 384, 240, 5)
        pins = pg.evaluate("window.ScrollTrigger ? ScrollTrigger.getAll().filter(t => t.pin).map(t => [t.trigger.id || t.trigger.className.toString().split(' ')[0], t.start, t.end]) : []")
        rep['pinned_sections'] = [x[0] for x in pins]; pshots = []
        for n, (name, st, en) in enumerate(pins):
            for k, fr in enumerate((.2, .55)):
                pg.evaluate(f'window.scrollTo(0,{int(st + (en - st) * fr)})'); pg.wait_for_timeout(1600)
                f = os.path.join(a.out, f'pin-{n:02d}-{name[:10]}-{k}.jpg'); pg.screenshot(path=f, type='jpeg', quality=70); pshots.append(f)
        sheet(pshots, os.path.join(a.out, 'pinned-sections.jpg'), 640, 400, 2)
        pg.close()
        # ---- mobile
        m = b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        m.on('pageerror', lambda e: rep['page_errors'].append('mobile: ' + str(e)[:300]))
        m.goto(url, wait_until='load', timeout=90000); m.wait_for_timeout(5000)
        rep['mobile_horizontal_overflow_px'] = m.evaluate('document.documentElement.scrollWidth - innerWidth')
        MH = m.evaluate('document.documentElement.scrollHeight'); rep['mobile_height'] = MH; ms = []
        for k in range(0, min(MH, 844 * 24), 844):
            m.evaluate(f'window.scrollTo(0,{k})'); m.wait_for_timeout(700)
            f = os.path.join(a.out, f'm-{k // 844:02d}.jpg'); m.screenshot(path=f, type='jpeg', quality=65); ms.append(f)
        sheet(ms, os.path.join(a.out, 'mobile.jpg'), 195, 422, 8)
        b.close()
    json.dump(rep, open(os.path.join(a.out, 'report.json'), 'w', encoding='utf8'), indent=1, ensure_ascii=False)
    print(json.dumps(rep, ensure_ascii=False, indent=1))
    print('\nLook at: desktop-scroll.jpg, pinned-sections.jpg, mobile.jpg')

if __name__ == '__main__':
    sys.exit(main())
