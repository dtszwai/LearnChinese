const Dictionary = { "type": "heading", "depth": 2, "children": [{ "type": "text", "value": '📜 字詞釋義' }] }
const Challenges = { "type": "heading", "depth": 2, "children": [{ "type": "text", "value": '🎯 鞏固練習' }] }

const plugin = (options) => {
  const transformer = async (ast) => {
    for (let i = 0; i < ast.children.length; i++) {
      switch (ast.children[i].value) {
        case '<Dictionary>':
          ast.children.splice(i, 0, Dictionary);
          i++;
          break;
        case '<Challenges>':
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
