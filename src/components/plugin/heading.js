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

const createHeadingNode = (section) => {
  return {
    type: "heading",
    depth: 2,
    children: [{ type: "text", value: sectionMap[section] }],
  };
};

const processAstWithHeadings = (ast) => {
  for (let i = 0; i < ast.children.length; i++) {
    const jsx = ast.children[i].value ?? "";
    const match = jsx.match(/^<(\w+)/);
    if (match) {
      const section = match[1];
      if (sectionMap[section]) {
        ast.children.splice(i++, 0, createHeadingNode(section));
      }
    }
  }
};

const plugin = (options) => {
  const transformer = async (ast) => {
    processAstWithHeadings(ast);
  };
  return transformer;
};

module.exports = plugin;
