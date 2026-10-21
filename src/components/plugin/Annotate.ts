import type { Root } from 'mdast';

// Transform only Markdown text nodes: code, front matter and JSX attributes
// remain untouched. MDX serializes attribute values, including quotes, safely.
const Annotate = () => {
  const visit = (node: unknown) => {
    if (!node || typeof node !== 'object' || !('children' in node) || !Array.isArray(node.children)) return;
    for (let index = 0; index < node.children.length; index++) {
      const child: unknown = node.children[index];
      if (
        !child ||
        typeof child !== 'object' ||
        !('type' in child) ||
        child.type !== 'text' ||
        !('value' in child) ||
        typeof child.value !== 'string'
      ) {
        visit(child);
        continue;
      }
      const parts = [];
      let end = 0;
      for (const match of child.value.matchAll(/\(\((.+?)\|\|(.+?)\)\)/g)) {
        if (match.index > end) parts.push({ type: 'text', value: child.value.slice(end, match.index) });
        parts.push({
          type: 'mdxJsxTextElement',
          name: 'Annotate',
          attributes: [{ type: 'mdxJsxAttribute', name: 'title', value: match[2] }],
          children: [{ type: 'text', value: match[1] }],
        });
        end = match.index + match[0].length;
      }
      if (!end) continue;
      if (end < child.value.length) parts.push({ type: 'text', value: child.value.slice(end) });
      node.children.splice(index, 1, ...parts);
      index += parts.length - 1;
    }
  };
  return (tree: Root) => visit(tree);
};

export default Annotate;
