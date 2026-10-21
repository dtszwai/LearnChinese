const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const index = require('../src/data/Learn/index.json');
const globals = JSON.parse(fs.readFileSync('.docusaurus/globalData.json', 'utf8'));
const published = Object.values(index).filter((lesson) => lesson.published !== false);
assert.deepEqual(
  globals['plugin-dynamic-routes'].default.lessons.map((lesson) => lesson.slug),
  published.map((lesson) => lesson.slug),
);
const files = fs
  .readdirSync('build', { recursive: true })
  .filter((file) => fs.statSync(path.join('build', file)).isFile());
const scripts = files
  .filter((file) => file.endsWith('.js'))
  .map((file) => fs.readFileSync(path.join('build', file), 'utf8'));
for (const lesson of Object.values(index)) {
  const output = path.join('build', 'learn', lesson.slug + '.html');
  assert.equal(fs.existsSync(output), lesson.published !== false, lesson.slug + ': publication route');
  if (lesson.published === false) {
    const data = require('../src/data/Learn/' + lesson.slug + '.json');
    for (const step of data) {
      if (step.id)
        assert(!scripts.some((source) => source.includes(step.id)), `Unpublished step in bundle: ${step.id}`);
    }
  }
}
assert(
  !files.some((file) => file.replaceAll('\\', '/').startsWith('teaching/')),
  'Private teaching files must not be deployed',
);

const missing = new Set();
for (const file of files.filter((file) => file.endsWith('.html'))) {
  const html = fs.readFileSync(path.join('build', file), 'utf8');
  for (const [, src] of html.matchAll(/<(?:img|script|audio|source)\b[^>]*\bsrc="([^"]+)"/g)) {
    if (!src.startsWith('/') || src.startsWith('//') || src.startsWith('/_vercel/')) continue;
    const asset = decodeURIComponent(src.split(/[?#]/)[0]).slice(1);
    if (!fs.existsSync(path.join('build', asset))) missing.add(`${file}: ${src}`);
  }
}
assert.equal(missing.size, 0, 'Missing local assets:\n' + [...missing].join('\n'));
const jsBytes = scripts.reduce((total, source) => total + Buffer.byteLength(source), 0);
const gzipBytes = scripts.reduce((total, source) => total + zlib.gzipSync(source).length, 0);
console.log(
  `Build: ${files.filter((file) => file.endsWith('.html')).length} HTML pages, ${published.length} published lesson, no hidden lesson steps or missing local assets.`,
);
console.log(
  `All emitted JS chunks: ${(jsBytes / 1024).toFixed(0)} KiB raw / ${(gzipBytes / 1024).toFixed(0)} KiB gzip (not a single-page download).`,
);
