const visit = require("unist-util-visit");

module.exports = function customRemarkPlugin() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      // Regular expression to match {{ABC|XYZ}}
      const regex = /\{\{(.+?)\|(.+?)\}\}/g;
      const content = node.value;

      let match;
      let lastIndex = 0;
      const newChildren = [];

      while ((match = regex.exec(content))) {
        const fullMatch = match[0];
        const text = match[1];
        const title = match[2];

        // Add the content before the match
        if (match.index > lastIndex) {
          newChildren.push({ type: "text", value: content.slice(lastIndex, match.index) });
        }

        // Create the <Annotate> element
        // {{ABC|XYZ}} -> <Annotate title="XYZ">ABC</Annotate>
        newChildren.push({
          type: "jsx",
          value: `<Annotate title="${title}">${text}</Annotate>`,
        });

        lastIndex = match.index + fullMatch.length;
      }

      // Add the remaining content after the last match
      if (lastIndex < content.length) {
        newChildren.push({ type: "text", value: content.slice(lastIndex) });
      }

      // Replace the current text node with the new children
      parent.children.splice(index, 1, ...newChildren);
    });
  };
};
