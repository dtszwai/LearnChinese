const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '書目引得',
  tagline: '中文科閱讀篇章',
  url: 'https://rccttwd.github.io',
  baseUrl: '/library/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'rccttwd',
  projectName: 'library',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',
  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/rccttwd/library/edit/main/',
          routeBasePath: '/',
          showLastUpdateTime: true,
        },
        blog: false,
        googleAnalytics: { trackingID: 'G-W84JMV3F51', },
        theme: { customCss: [require.resolve('./src/css/custom.scss')], },
      },
    ],
  ],

  themeConfig:
    ({
      algolia: {
        appId: '5AG76IYUZG',
        apiKey: "c21515238217c0c405f9806f059b7cbe",
        indexName: "ChineseTextbook",
      },
      hideableSidebar: true,
      navbar: {
        title: '書目引得',
        hideOnScroll: true,
        logo: { alt: '', src: 'img/logo.png', },
        items: [
          { type: 'doc', docId: 'S1', label: "中一級", position: "left" },
          { type: 'doc', docId: 'S2', label: "中二級", position: "left" },
          { type: 'doc', docId: 'S3', label: "中三級", position: "left" },
          // { to: '/blog', label: '博客', position: 'right' },
          { href: 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/', label: '粵音', position: 'right' },
          { href: 'https://www.moedict.tw/', label: '萌典', position: 'right' },
          {
            href: 'https://github.com/rccttwd/library/tree/main',
            'aria-label': 'GitHub repository',
            className: 'header-github-link',
            position: 'right',
          },
        ],
      },
      footer: {
        copyright: `This Site is built with <a href="https://docusaurus.io/">Docusaurus</a> @ ${new Date().getFullYear()}.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
