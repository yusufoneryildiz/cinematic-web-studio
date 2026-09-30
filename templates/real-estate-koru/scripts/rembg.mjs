import fs from 'node:fs/promises';
const KEY = (await fs.readFile('.env', 'utf8')).match(/FAL_KEY=(.+)/)[1].trim();
const src = process.argv[2], out = process.argv[3];
const b64 = (await fs.readFile(src)).toString('base64');
const r = await fetch('https://fal.run/fal-ai/birefnet/v2', {
  method: 'POST',
  headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ image_url: `data:image/jpeg;base64,${b64}`, model: 'General Use (Heavy)', output_format: 'png' }),
});
const j = await r.json();
const url = j?.image?.url;
if (!url) throw new Error(JSON.stringify(j).slice(0, 300));
await fs.writeFile(out, Buffer.from(await (await fetch(url)).arrayBuffer()));
console.log('ok', out);
