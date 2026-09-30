"""Turn a phone video of your laptop into a finished 1080x1920 Reel.

    python make_reel.py --video in.mp4 --top "Still using an *ordinary* website?" \
        --bottom "DM us for a site like this" --music bed.mp3 --out reel.mp4 [--top-style dark|light|box]

- Wrap one word in *stars* to highlight it in the accent colour.
- --top-style: dark = dark text straight on a light wall (default) · light = white text with shadow for dark
  rooms · box = white text in a dark rounded box.
- Replaces the room sound with the music (fade in/out, loudness normalised to -14 LUFS).
- Picks the sharpest frame as cover.jpg (plus cover-candidates.jpg to choose another).
Needs: ffmpeg/ffprobe on PATH, python playwright + pillow.
"""
import argparse, html, json, os, re, subprocess, sys, tempfile
from playwright.sync_api import sync_playwright
from PIL import Image, ImageFilter, ImageStat
sys.stdout.reconfigure(encoding='utf-8', errors='replace')  # Windows konsolu (cp1254) Türkçe/özel karakterde çökmesin

CSS = """*{margin:0;box-sizing:border-box}html,body{width:1080px;height:1920px;background:transparent;font-family:Inter,sans-serif}
.k{position:absolute;left:50%;transform:translateX(-50%);text-align:center}
#top{top:170px;width:960px;padding:30px 40px;font-weight:800;font-size:70px;line-height:1.14;letter-spacing:-.01em}
#top em{font-family:'Playfair Display',serif;font-style:italic;font-weight:600}
.dark{color:#141414}.dark em{color:#8a6420}
.light{color:#fff;text-shadow:0 4px 24px rgba(0,0,0,.55)}.light em{color:#e7c27d}
.box{color:#fff;background:rgba(10,10,12,.78);border-radius:34px}.box em{color:#e7c27d}
#bottom{top:1360px;padding:26px 40px;font-weight:600;font-size:42px;white-space:nowrap;display:flex;align-items:center;gap:18px;color:#fff;border-radius:34px;background:rgba(10,10,12,.78)}
#bottom b{background:#e7c27d;color:#111;padding:8px 20px;border-radius:14px;font-weight:800}"""

def fmt(t):  # *word* -> <em>word</em>, last "[...]" -> highlighted pill
    t = html.escape(t)
    return re.sub(r'\*(.+?)\*', r'<em>\1</em>', t)

def run(*cmd):
    subprocess.run(cmd, check=True)

def probe(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', path], capture_output=True, text=True, check=True).stdout
    return float(json.loads(out)['format']['duration'])

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--video', required=True); ap.add_argument('--out', required=True)
    ap.add_argument('--top', default=''); ap.add_argument('--bottom', default='')
    ap.add_argument('--bottom-cta', default='', help='highlighted part at the end of the bottom line, e.g. "DM us"')
    ap.add_argument('--music'); ap.add_argument('--top-style', default='dark', choices=['dark', 'light', 'box'])
    ap.add_argument('--keep-sound', action='store_true', help='keep the original sound under the music')
    a = ap.parse_args()
    D = probe(a.video); tmp = tempfile.mkdtemp()
    page = f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;800&family=Playfair+Display:ital,wght@1,600&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
<div class="k {a.top_style}" id="top">{fmt(a.top)}</div>
<div class="k" id="bottom">{fmt(a.bottom)} {('<b>' + html.escape(a.bottom_cta) + '</b>') if a.bottom_cta else ''}</div></body></html>"""
    hp = os.path.join(tmp, 'o.html'); open(hp, 'w', encoding='utf8').write(page)
    top_png, bot_png = os.path.join(tmp, 'top.png'), os.path.join(tmp, 'bottom.png')
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1920})
        pg.goto('file:///' + hp.replace('\\', '/'), wait_until='networkidle'); pg.wait_for_timeout(600)
        pg.evaluate("document.getElementById('bottom').style.display='none'"); pg.screenshot(path=top_png, omit_background=True)
        pg.evaluate("document.getElementById('bottom').style.display='';document.getElementById('top').style.display='none'")
        if not (a.bottom or a.bottom_cta): pg.evaluate("document.getElementById('bottom').style.display='none'")
        pg.screenshot(path=bot_png, omit_background=True); b.close()
    fo = max(0.0, D - 1.8)
    v = ("[0:v]scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,unsharp=5:5:0.6,fps=30,format=yuv420p[v];"
         "[1:v]format=rgba,fade=in:st=0.3:d=0.6:alpha=1[u];[2:v]format=rgba,fade=in:st=1.5:d=0.6:alpha=1[w];"
         "[v][u]overlay=0:0:shortest=1[v1];[v1][w]overlay=0:0:shortest=1,format=yuv420p[vo]")
    cmd = ['ffmpeg', '-v', 'error', '-y', '-i', a.video, '-loop', '1', '-i', top_png, '-loop', '1', '-i', bot_png]
    if a.music:
        cmd += ['-stream_loop', '-1', '-i', a.music]
        mix = f"[3:a]atrim=0:{D},afade=in:st=0:d=0.2,afade=out:st={fo}:d=1.8[m]"
        mix += (f";[0:a]volume=0.25[s];[m][s]amix=inputs=2:duration=first[mx];[mx]" if a.keep_sound else ";[m]")
        a_f = mix + "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[ao]"
        cmd += ['-filter_complex', v + ';' + a_f, '-map', '[vo]', '-map', '[ao]']
    else:
        cmd += ['-filter_complex', v, '-map', '[vo]', '-map', '0:a?']
    cmd += ['-t', str(D), '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
            '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', a.out]
    run(*cmd)
    # cover: sharpest of 10 frames (edges in the middle band)
    outdir = os.path.dirname(os.path.abspath(a.out)); cands = []
    for n in range(10):
        t = 1.0 + n * (D - 2.0) / 9; f = os.path.join(tmp, f'c{n}.jpg')
        run('ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.2f}', '-i', a.out, '-frames:v', '1', '-q:v', '2', f)
        im = Image.open(f); score = ImageStat.Stat(im.convert('L').crop((0, 540, 1080, 1300)).filter(ImageFilter.FIND_EDGES)).var[0]
        cands.append((score, t, f))
    cands.sort(reverse=True); Image.open(cands[0][2]).save(os.path.join(outdir, 'cover.jpg'), quality=92)
    s = Image.new('RGB', (216 * 5, 384 * 2))
    for j, (_, t, f) in enumerate(sorted(cands, key=lambda c: c[1])): s.paste(Image.open(f).resize((216, 384)), ((j % 5) * 216, (j // 5) * 384))
    s.save(os.path.join(outdir, 'cover-candidates.jpg'), quality=80)
    print(f'ok  {a.out}  ({D:.1f}s)  cover.jpg = frame at {cands[0][1]:.1f}s')

if __name__ == '__main__':
    sys.exit(main())
