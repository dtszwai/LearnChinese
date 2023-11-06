const sectionMap = {
  MainText: "📖 正文",
  Translation: "📝 語譯",
  Dictionary: "📜 字詞釋義",
  Media: "📺 影片導讀",
  Appreciation: "🌈 課文賞析",
  Biography: "🦹 名人小傳",
  Challenges: "🎯 鞏固練習",
  Extension: "📚 延伸閱讀",
};

const createHeadingNode = (section) => ({
  type: "heading",
  depth: 2,
  children: [{ type: "text", value: sectionMap[section] }],
});

const Section = () => {
  const transformer = (ast) => {
    for (let i = 0; i < ast.children.length; i++) {
      const name = ast.children[i].name ?? "";
      if (name in sectionMap) {
        ast.children.splice(i++, 0, createHeadingNode(name));
      }
    }
  };
  return transformer;
};
export default Section;
