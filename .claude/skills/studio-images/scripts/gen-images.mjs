/* Generate a site's images with fal.ai FLUX 1.1 Ultra from a manifest.
     node gen-images.mjs <manifest.json> <out-dir>
   Manifest: [{ "id": "hero", "ar": "16:9", "p": "<prompt>" }, …]   (ids may contain folders: "koru/hero")
   Key: FAL_KEY from the environment or a .env file in the current folder.
   Skips files that already exist — delete one to regenerate it. Cost: ~$0.06 per image. */
import fs from 'node:fs/promises';
import path from 'node:path';

const [manifestPath, outDir] = process.argv.slice(2);
if (!manifestPath || !outDir) { console.log('usage: node gen-images.mjs <manifest.json> <out-dir>'); process.exit(1); }
let KEY = process.env.FAL_KEY;
if (!KEY) { try { KEY = (await fs.readFile('.env', 'utf8')).match(/FAL_KEY=(.+)/)[1].trim(); } catch {} }
if (!KEY) { console.log('FAL_KEY missing: add FAL_KEY=... to .env (https://fal.ai/dashboard/keys)'); process.exit(1); }

const MODEL = 'https://fal.run/fal-ai/flux-pro/v1.1-ultra';
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));

async function one(item) {
  const out = path.join(outDir, item.id + '.jpg');
  try { await fs.access(out); console.log('skip  ', item.id); return; } catch {}
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(MODEL, {
        method: 'POST',
        headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: item.p, aspect_ratio: item.ar || '16:9', output_format: 'jpeg', num_images: 1, safety_tolerance: '5', raw: false }),
      });
      if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 200)}`);
      const url = (await r.json())?.images?.[0]?.url;
      if (!url) throw new Error('no image url');
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      await fs.mkdir(path.dirname(out), { recursive: true });
      await fs.writeFile(out, buf);
      console.log('ok    ', item.id, (buf.length / 1024 | 0) + 'kb');
      return;
    } catch (e) {
      console.log(`retry ${attempt}`, item.id, String(e.message).slice(0, 160));
      await new Promise(r => setTimeout(r, 2500 * attempt));
    }
  }
  console.log('FAIL  ', item.id);
}

const queue = [...manifest];
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await one(queue.shift()); }));
console.log('done');
