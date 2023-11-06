const pathMappings = {
  "/S1/單元二：敘事寫人/": "/passages/",
  "/S1/單元三：借事抒情/": "/passages/",
  "/S1/單元四：詩歌欣賞/": "/passages/",
  "/S1/單元六：景物描寫（一）/": "/passages/",
  "/S1/單元七：說明的方法和順序/": "/passages/",
  "/S3/單元一：說明的語言/": "/passages/",
  "/S3/單元二：記敘的方法和詳略/": "/passages/",
  "/S3/單元四：詞曲欣賞/": "/passages/",
  "/S3/單元六：小說與戲劇欣賞/": "/passages/",
  "/S3/單元七：論證的方法/": "/passages/",
  "/S3/單元九：文言選讀（三）/": "/passages/",
  "/S3/作品選讀/": "/passages/",
};

const redirect = [
  "@docusaurus/plugin-client-redirects",
  {
    createRedirects(existingPath) {
      for (const [key, value] of Object.entries(pathMappings)) {
        if (existingPath.includes(value)) {
          const newPath = existingPath.replace(value, key);
          return newPath;
        }
      }
      return undefined;
    },
  },
];

export default redirect;
