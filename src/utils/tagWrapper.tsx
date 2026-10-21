type TagWrapper = {
  value: string;
  regex: RegExp | null;
  tagName?: string;
  attributes?: Record<string, string>;
};

export default ({ value, regex, tagName = 'span', attributes = {} }: TagWrapper): string => {
  if (!regex) return value;

  const setAttributes = (attrs: Record<string, string>) =>
    Object.entries(attrs)
      .map(([key, val]) => `${key === 'className' ? 'class' : key}="${val}"`)
      .join(' ');

  return value.replace(regex, `<${tagName} ${setAttributes(attributes)}>$1</${tagName}>`);
};
