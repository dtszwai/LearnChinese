// @ts-check

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "書目引得",
  tagline: "中文科閱讀篇章",
  url: "http://learnchinese.vercel.app/",
  titleDelimiter: "-",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/logo.png",
  organizationName: "dtszwai",
  projectName: "dtszwai.github.io",
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
    "./src/components/plugin/dynamicRoutes.js",
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
          beforeDefaultRemarkPlugins: [
            require("./src/components/plugin/heading"),
            require("./src/components/plugin/Annotation"),
          ],
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/css/custom.scss"),
            require.resolve("./src/css/typography.scss"),
          ],
        },
        googleAnalytics: { trackingID: "G-Y6KYGQ0T4T", anonymizeIP: true },
        gtag: { trackingID: "G-Y6KYGQ0T4T", anonymizeIP: true },
      },
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: "keywords",
        content:
          "書目引得, 中文科, 中國語文, 閱讀篇章, 初中, 高中, 新高中, 中學, 文憑試, DSE, Chinese, 語文基礎, 語基, 指定文言, 文言語譯, 文言文, 白話文, 語譯, 練習, 答案, 課文",
      },
    ],
    docs: {
      sidebar: { hideable: true },
    },
    announcementBar: {
      id: "questionnaire",
      content: `📢 我們想聽聽你的聲音！讓我們知道你的意見；或者只是告訴我們一個笑話，我們都聽。感謝你的支持！<a href="https://forms.gle/FzYfySqYG7nrzgYU8" target="_blank" rel="noopener">📝 填寫問卷</a>`,
      isCloseable: false,
    },
    navbar: {
      title: "書目引得",
      hideOnScroll: true,
      logo: { src: "img/logo.png" },
      items: [
        { type: "doc", docId: "S1/index", label: "中一級", position: "left" },
        { type: "doc", docId: "S3/index", label: "中三級", position: "left" },
        { type: "docSidebar", sidebarId: "settext", label: "指定文言", position: "left" },
        { type: "docSidebar", sidebarId: "dse", label: "歷屆文憑篇章", position: "left" },
        { to: "learn", label: "學習", position: "right" },
        { to: "cheatsheet", label: "語基知識表", position: "right" },
        {
          type: "dropdown",
          label: "更多",
          position: "right",
          items: [
            { to: "about", label: "關於本站" },
            { href: "https://www.moedict.tw/", label: "萌典" },
            { href: "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/", label: "粵音" },
            { href: "https://www.edbchinese.hk/lexlist_ch/index.jsp", label: "學習字詞表" },
          ],
        },
      ],
    },
  },
};
