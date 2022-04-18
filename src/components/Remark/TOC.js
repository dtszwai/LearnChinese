const Translation = { "type": "heading", "depth": 2, "children": [{ "type": "text", "value": '📝 語譯' }] }
const Dictionary = { "type": "heading", "depth": 2, "children": [{ "type": "text", "value": '📜 字詞釋義' }] }
const Challenges = { "type": "heading", "depth": 2, "children": [{ "type": "text", "value": '🎯 鞏固練習' }] }

const plugin = (options) => {
  const transformer = async (ast) => {
    for (let i = 0; i < ast.children.length; i++) {
      const jsx = ast.children[i].value ?? '';
      switch (jsx) {
        case jsx.match(/^<Translation/)?.input:
          ast.children.splice(i, 0, Translation);
          i++;
          break;
        case jsx.match(/^<Dictionary/)?.input:
          ast.children.splice(i, 0, Dictionary);
          i++;
          break;
        case jsx.match(/^<Challenges/)?.input:
          ast.children.splice(i, 0, Challenges);
          i++;
          break;
        default:
          break;
      }
    }
  };
  return transformer;
};

module.exports = plugin;
