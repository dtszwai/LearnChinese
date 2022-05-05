// @ts-check
const TOC = require('./src/components/Remark/TOC');

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "書目引得",
  tagline: "中文科閱讀篇章",
  url: "https://rccttwd.github.io",
  titleDelimiter: '📖',
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/logo.png",
  organizationName: "rccttwd",
  projectName: "rccttwd.github.io",
  deploymentBranch: "gh-pages",
  trailingSlash: false,
  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant"],
  },
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["zh"],
        docsRouteBasePath: "/",
        indexBlog: false,
        translations: {
          search_placeholder: "搜尋",
          see_all_results: "查看所有結果",
          no_results: "沒有任何結果符合您的搜尋。",
          search_results_for: "您輸入的關鍵字：{{ keyword }}",
          search_the_documentation: "搜尋",
          count_documents_found: "{{ count }} 項搜尋結果",
          count_documents_found_plural: "{{ count }} 項搜尋結果",
          no_documents_were_found: "沒有任何結果符合您的搜尋。",
        },
      },
    ],
    "docusaurus-plugin-sass",
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarCollapsed: false,
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          beforeDefaultRemarkPlugins: [TOC],
        },
        blog: false,
        theme: { customCss: [require.resolve("./src/css/custom.scss"), require.resolve("./src/css/typography.scss")] },
        googleAnalytics: { trackingID: 'G-CLSVXB7Y6X', anonymizeIP: true, },
        gtag: { trackingID: "G-CLSVXB7Y6X", anonymizeIP: true },
      },
    ],
  ],

  themeConfig: {
    metadata: [{ name: 'keywords', content: '書目引得, 中文科, 中國語文, 閱讀篇章, 初中, 高中, 中學, 文憑試, DSE, Chinese, 語文基礎, 語基, 指定文言, 文言文, 白話文, 語譯, 練習, 答案' }],
    docs: {
      sidebar: { hideable: true }
    },
    navbar: {
      title: "書目引得",
      hideOnScroll: true,
      logo: { src: "img/logo.png" },
      items: [
        { type: "doc", docId: "S1/index", label: "中一級", position: "left" },
        // { type: "doc", docId: "S2/index", label: "中二級", position: "left" },
        { type: "doc", docId: "S3/index", label: "中三級", position: "left" },
        { type: "docSidebar", sidebarId: "settext", label: "指定文言", position: "left" },
        { to: "cheatsheet", label: "語基知識表", position: "right", className: "navbarCheatsheet" },
        { href: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/", label: "粵音", position: "right", },
        { href: "https://www.moedict.tw/", label: "萌典", position: "right", },
      ],
    },
  },
};
