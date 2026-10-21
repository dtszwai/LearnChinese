import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import * as prettier from 'prettier';

const baseline = JSON.parse(await readFile(new URL('./format-baseline.json', import.meta.url), 'utf8'));
// Also works in deployment source archives without Git metadata.
const files = (await readdir('.', { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);
for (const directory of ['src', 'scripts', 'tests', '.github']) {
  for (const entry of await readdir(directory, { recursive: true, withFileTypes: true })) {
    if (entry.isFile()) files.push(path.relative('.', path.join(entry.parentPath, entry.name)).replaceAll('\\', '/'));
  }
}
let retained = 0;
const failures = [];
for (const file of files.filter((file) => /\.(?:[cm]?[jt]sx?|json|s?css|ya?ml)$/.test(file))) {
  const info = await prettier.getFileInfo(file, { ignorePath: '.prettierignore' });
  if (info.ignored) continue;
  let source;
  try {
    source = (await readFile(file, 'utf8')).replace(/\r\n/g, '\n');
  } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  // Vercel rewrites its build-time config; check the authored file locally and in CI.
  if (file === 'vercel.json' && process.env.VERCEL === '1') {
    JSON.parse(source);
    console.log('Formatting: vercel.json syntax validated; build-time formatting is managed by Vercel.');
    continue;
  }
  const options = { ...(await prettier.resolveConfig(file)), filepath: file };
  if (await prettier.check(source, options)) continue;
  const hash = createHash('sha256').update(source).digest('hex');
  if (baseline[file] === hash) retained++;
  else failures.push(file);
}
console.log(
  `Formatting: ${retained} unchanged legacy files retain their recorded formatting; no whole-repository rewrite.`,
);
if (failures.length) {
  console.error('Run prettier --write on these changed/new code files:\n' + failures.join('\n'));
  process.exitCode = 1;
}
