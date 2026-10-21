import babelParser from '@babel/eslint-parser';
import hooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: [
      'node_modules/**',
      'build/**',
      '.docusaurus/**',
      '.validation/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx}'],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { 'react-hooks': hooks },
    rules: {
      'no-debugger': 'error',
      'no-constant-condition': 'error',
      'no-duplicate-imports': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-restricted-syntax': [
        'error',
        { selector: 'TSAnyKeyword', message: 'Use a concrete type or unknown instead of any.' },
      ],
      'no-warning-comments': [
        'error',
        { terms: ['@ts-ignore', '@ts-nocheck', '@ts-expect-error'], location: 'anywhere' },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          parserOpts: { plugins: ['typescript', 'jsx'] },
        },
      },
    },
  },
];
