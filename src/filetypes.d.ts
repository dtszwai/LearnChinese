declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { MDXProps } from 'mdx/types';
  const MDXContent: ComponentType<MDXProps>;
  export default MDXContent;
}
