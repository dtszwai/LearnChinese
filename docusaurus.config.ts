import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import Annotation from "./src/components/plugin/Annotation";
import Heading from "./src/components/plugin/heading";
import redirect from "./src/components/plugin/redirect";

const title = "書目引得";
const keywords =
  "書目引得, 中文科, 中國語文, 閱讀篇章, 初中, 高中, 新高中, 中學, 文憑試, DSE, Chinese, 語文基礎, 語基, 指定文言, 文言語譯, 文言文, 白話文, 語譯, 練習, 答案, 課文";

const config: Config = {
  title: title,
  tagline: "中文科閱讀篇章",
  url: "http://learnchinese.vercel.app/",
  titleDelimiter: "-",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/logo.png",
  trailingSlash: false,
  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant"],
  },
  plugins: [
    "docusaurus-plugin-sass",
    "./src/components/plugin/dynamicRoutes.js",
    redirect,
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
          beforeDefaultRemarkPlugins: [Heading, Annotation],
        },

        blog: false,
        theme: {
          customCss: ["./src/css/custom.scss"],
        },
        googleAnalytics: { trackingID: "G-Y6KYGQ0T4T", anonymizeIP: true },
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
    announcementBar: {
      id: "questionnaire",
      content: `📢 我們想聽聽你的聲音！讓我們知道你的意見；或者只是告訴我們一個笑話，我們都聽。感謝你的支持！<a href="https://forms.gle/FzYfySqYG7nrzgYU8" target="_blank" rel="noopener">📝 填寫問卷</a>`,
    },
    navbar: {
      title: title,
      hideOnScroll: true,
      logo: { src: "img/logo.png" },
      items: [
        { type: "docSidebar", sidebarId: "text", label: "文章", position: "left" },
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
};

export default config;
