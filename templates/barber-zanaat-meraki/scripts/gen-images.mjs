import fs from 'node:fs/promises';
import path from 'node:path';

const KEY = (await fs.readFile('.env', 'utf8')).match(/FAL_KEY=(.+)/)[1].trim();
const MODEL = 'https://fal.run/fal-ai/flux-pro/v1.1-ultra';
const manifest = JSON.parse(await fs.readFile('scripts/images.manifest.json', 'utf8'));
const CONCURRENCY = 4;

async function one(item) {
  const out = path.join('public/img', item.id + '.jpg');
  try { await fs.access(out); console.log('skip  ', item.id); return; } catch {}
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(MODEL, {
        method: 'POST',
        headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: item.p,
          aspect_ratio: item.ar,
          output_format: 'jpeg',
          num_images: 1,
          safety_tolerance: '5',
          enable_safety_checker: false,
          raw: false,
        }),
      });
      if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 200)}`);
      const j = await r.json();
      const url = j?.images?.[0]?.url;
      if (!url) throw new Error('no image url: ' + JSON.stringify(j).slice(0, 200));
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
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) await one(queue.shift());
}));
console.log('done');
