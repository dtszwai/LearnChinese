const Heading = (section) => {
  const title = {
    MainText: "📖 正文",
    Translation: "📝 語譯",
    Dictionary: "📜 字詞釋義",
    Media: "📺 影片導讀",
    Appreciation: "🌈 課文賞析",
    Biography: "🦹 名人小傳",
    Challenges: "🎯 鞏固練習",
    Extension: "📚 延伸閱讀",
  }
  return { "type": "heading", "depth": 2, "children": [{ "type": "text", "value": title[section] }] }
}

const plugin = (options) => {
  const transformer = async (ast) => {
    for (let i = 0; i < ast.children.length; i++) {
      const jsx = ast.children[i].value ?? '';
      switch (jsx) {
        case jsx.match(/^<MainText/)?.input:
          ast.children.splice(i++, 0, Heading('MainText'));
          break;
        case jsx.match(/^<Translation/)?.input:
          ast.children.splice(i++, 0, Heading('Translation'));
          break;
        case jsx.match(/^<Dictionary/)?.input:
          ast.children.splice(i++, 0, Heading('Dictionary'));
          break;
        case jsx.match(/^<Challenges/)?.input:
          ast.children.splice(i++, 0, Heading('Challenges'));
          break;
        case jsx.match(/^<Media/)?.input:
          ast.children.splice(i++, 0, Heading('Media'));
          break;
        case jsx.match(/^<Appreciation/)?.input:
          ast.children.splice(i++, 0, Heading('Appreciation'));
          break;
        case jsx.match(/^<Biography/)?.input:
          ast.children.splice(i++, 0, Heading('Biography'));
          break;
        case jsx.match(/^<Extension/)?.input:
          ast.children.splice(i++, 0, Heading('Extension'));
          break;
        default:
          break;
      }
    }
  };
  return transformer;
};

module.exports = plugin;
