const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { transformSync } = require('@babel/core');

// Exercise the actual source with Node's test runner; only CSS and supplied UI
// boundaries are stubbed. No second implementation of the lesson algorithms.
module.exports = function loadSource(file, mocks = {}) {
  const filename = path.resolve(file);
  const exports = {};
  const nativeRequire = createRequire(filename);
  const source = transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    babelrc: false,
    configFile: false,
    presets: [
      ['@babel/preset-typescript', { onlyRemoveTypeImports: false }],
      ['@babel/preset-react', { runtime: 'classic' }],
    ],
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  }).code;
  vm.runInNewContext(
    source,
    {
      exports,
      require(name) {
        if (Object.hasOwn(mocks, name)) return mocks[name];
        if (name.endsWith('.scss'))
          return new Proxy({}, { get: (_, key) => (key === '__esModule' ? false : String(key)) });
        return nativeRequire(name);
      },
    },
    { filename },
  );
  return exports;
};
