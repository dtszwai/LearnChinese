const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "書目引得",
  tagline: "中文科閱讀篇章",
  url: "https://rccttwd.github.io",
  baseUrl: "/library/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/logo.png",
  organizationName: "rccttwd",
  projectName: "library",
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
          search_the_documentation: "眾裏尋他千百度",
          count_documents_found: "{{ count }} 項搜尋結果",
          count_documents_found_plural: "{{ count }} 項搜尋結果",
          no_documents_were_found: "沒有任何結果符合您的搜尋。",
        },
      },
    ],
    "docusaurus-plugin-sass",
    "plugin-image-zoom",
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/rccttwd/library/blob/master/",
          routeBasePath: "/",
          showLastUpdateTime: true,
        },
        blog:{
          blogTitle: '日誌',
        },
        googleAnalytics: { trackingID: "G-W84JMV3F51" },
        theme: { customCss: [require.resolve("./src/css/custom.scss")] },
      },
    ],
  ],

  themeConfig: {
    hideableSidebar: true,
    navbar: {
      title: "書目引得",
      hideOnScroll: true,
      logo: { alt: "", src: "img/logo.png" },
      items: [
        { type: "doc", docId: "S1", label: "中一級", position: "left" },
        { type: "doc", docId: "S2", label: "中二級", position: "left" },
        { type: "doc", docId: "S3", label: "中三級", position: "left" },
        {
          href: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/",
          label: "粵音",
          position: "right",
        },
        {
          href: "https://www.moedict.tw/",
          label: "萌典",
          position: "right",
        },
        { to: "blog", label: "日誌", position: "right" },
        {
          href: "https://github.com/rccttwd/library/tree/master",
          "aria-label": "GitHub repository",
          className: "header-github-link",
          position: "right",
        },
      ],
    },
    zoomSelector: ".markdown :not(em) > img",
    footer: {
      copyright: `Built with <a href="https://docusaurus.io/">Docusaurus</a>, 2021 - ${new Date().getFullYear()}.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    colorMode: {
      switchConfig: {
        darkIcon: "🌙",
        darkIconStyle: {
          transform: "scaleX(-1)",
        },
        lightIcon: "☀️",
      },
    },
  },
};
