import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// Plugin
import Annotate from "./src/components/plugin/Annotate";
import redirect from "./src/components/plugin/redirect";
import Section from "./src/components/plugin/Section";

const title = "書目引得";
const keywords =
  "書目引得, 中文科, 中國語文, 閱讀篇章, 初中, 高中, 新高中, 中學, 文憑試, DSE, Chinese, 語文基礎, 語基, 指定文言, 文言語譯, 文言文, 白話文, 語譯, 練習, 答案, 課文";

const config: Config = {
  title: title,
  tagline: "中文科閱讀篇章",
  url: "https://learnchinese.vercel.app",
  titleDelimiter: "-",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  favicon: "img/logo.png",
  trailingSlash: false,
  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant"],
  },
  plugins: ["docusaurus-plugin-sass", require.resolve("./src/components/plugin/dynamicRoutes.ts"), redirect],
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: "zh",
        docsRouteBasePath: "/",
        indexBlog: false,
        indexPages: true,
      },
    ],
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarCollapsed: false,
          sidebarPath: "sidebars.ts",
          routeBasePath: "/",
          beforeDefaultRemarkPlugins: [Section, Annotate],
        },

        blog: false,
        pages: { beforeDefaultRemarkPlugins: [Annotate] },
        theme: {
          customCss: ["./src/css/custom.scss"],
        },
        gtag: { trackingID: "G-Y6KYGQ0T4T", anonymizeIP: true },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    metadata: [
      {
        name: "keywords",
        content: keywords,
      },
    ],
    docs: {
      sidebar: { hideable: true },
    },
    navbar: {
      title: title,
      hideOnScroll: true,
      logo: { src: "img/logo.png" },
      items: [
        { type: "doc", docId: "contents/S1/index", label: "中一級", position: "left" },
        { type: "doc", docId: "contents/S2/index", label: "中二級", position: "left" },
        { type: "doc", docId: "contents/S3/index", label: "中三級", position: "left" },
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
  } satisfies Preset.ThemeConfig,
  markdown: {
    hooks: { onBrokenMarkdownLinks: "throw" },
    format: "mdx",
  },
};

export default config;
