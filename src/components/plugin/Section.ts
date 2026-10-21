import type { Heading, Root } from 'mdast';

const sectionMap: Record<string, string> = {
  MainText: '📖 正文',
  Translation: '📝 語譯',
  Dictionary: '📜 字詞釋義',
  Media: '📺 影片導讀',
  Appreciation: '🌈 課文賞析',
  Biography: '🦹 名人小傳',
  Challenges: '🎯 鞏固練習',
  Extension: '📚 延伸閱讀',
};

const createHeadingNode = (section: string): Heading => ({
  type: 'heading',
  depth: 2,
  children: [{ type: 'text', value: sectionMap[section] }],
});

const Section = () => {
  const transformer = (ast: Root) => {
    for (let i = 0; i < ast.children.length; i++) {
      const node = ast.children[i];
      const name = 'name' in node ? node.name : undefined;
      if (typeof name === 'string' && Object.hasOwn(sectionMap, name)) {
        ast.children.splice(i++, 0, createHeadingNode(name));
      }
    }
  };
  return transformer;
};
export default Section;
